<?php

namespace Modules\Authority\Http\Controllers;

use App\Models\ShareholderShare;
use App\Models\UserShareAuthor;
use App\Models\UserShareholder;
use App\Utils;
use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;

require("PHPExcel/PHPExcel.php");

class AuthorityController extends Controller
{
    private $userShareHolder;
    private $userShareAuthor;

    const CHUA_DUYET = 0;
    const USER_AUTHORITY = 1;

    public function __construct(UserShareholder $userShareholder, UserShareAuthor $userShareAuthor)
    {
        $this->userShareHolder = $userShareholder;
        $this->userShareAuthor = $userShareAuthor;
    }

    public function changeStatusAuthor(Request $request){
//        try {
            $data = $request->all();
            $query = $this->userShareAuthor->updateStatusAuthor($data);
            $result = Utils::messegerAlert(1, "alert-success", 'Cập nhật thành công!', $query);
//        } catch (\Exception $exception) {
//            $result = Utils::messegerAlert(2, "alert-danger", 'Cập nhật thất bại!',);
//        }
        return response()->json($result);
    }

    public function downloadFileExcel()
    {
        try {
            $data = $this->userShareAuthor->getList(null, null, null);
            $fileType = 'Excel2007';
            $fileName = public_path() . "/files/SchemaDsUyQuyen.xlsx";
            $objPHPExcel = \PHPExcel_IOFactory::load($fileName);
            $objPHPExcel->getActiveSheet();
            $startRow = 3;
            if ($data) {
                foreach ($data as $idx => $row) {
                    $objPHPExcel->setActiveSheetIndex(0)
                        ->setCellValue("A" . ($startRow + $idx), $idx + 1)
                        ->setCellValue("B" . ($startRow + $idx), $row->name_1)
                        ->setCellValue("C" . ($startRow + $idx), $row->cccd_1)
                        ->setCellValue("D" . ($startRow + $idx), $row->name_2)
                        ->setCellValue("E" . ($startRow + $idx), $row->cccd_2)
                        ->setCellValue("F" . ($startRow + $idx), $row->phone_number_2)
                        ->setCellValue("G" . ($startRow + $idx), $row->total_authority)
                        ->setCellValue("H" . ($startRow + $idx), $row->total_authority)
                        ->setCellValue("I" . ($startRow + $idx),  $row->status == 0 ? "Chờ duyệt" : $row->status == 1 ? "Đã duyệt" : "Thất bại");
                }
                $objWriter = \PHPExcel_IOFactory::createWriter($objPHPExcel, $fileType);
                header('Content-Description: File Transfer');
                header('Content-Type: application/vnd.ms-excel');
                header('Content-Disposition: attachment;filename="report.xlsx"');
                $objWriter->save('php://output');
            } else {
                throw new \Exception('Không có dữ liệu!');
            }
        } catch (\PHPExcel_Exception $e) {
            throw new \Exception('Error' . $e->getMessage());
        }
    }


    public function importAuthorHolder(Request $request)
    {
        $request->validate([
            'file' => 'required|mimes:xlsx, xls'
        ]);
        $response = [
            "status" => 1,
            "mess" => "Import ủy quyền thành công!",
            "erros" => [],
        ];
        try {
            if ($request->hasFile('file') && $request->file('file')->isValid()) {
                $inputFileName = $request->file('file')->getRealPath();
                try {
                    $inputFileType = \PHPExcel_IOFactory::identify($inputFileName);
                    $objReader = \PHPExcel_IOFactory::createReader($inputFileType);
                    $objPHPExcel = $objReader->load($inputFileName);
                } catch (\Exception $e) {
                    $response = [
                        "status" => 2,
                        "mess" => "Lỗi không thể tải file " . pathinfo($inputFileName, PATHINFO_BASENAME) . 'ERROR: ' . $e->getMessage(),
                    ];
                }
                $sheet = $objPHPExcel->getSheet(0);
                $highestRow = $sheet->getHighestRow();
                $user_id = Auth::user()->id;
                $errors = [];

                for ($row = 2; $row <= $highestRow; $row++) {
                    try {
                        $cccdShareholder = trim($sheet->getCell('A' . $row)->getValue());
                        $nameShareholder = trim($sheet->getCell('B' . $row)->getValue());
                        $cccdAuthor = trim($sheet->getCell('C' . $row)->getValue());
                        $userAuthor = trim($sheet->getCell('D' . $row)->getValue());
                        $phoneAuthor = trim($sheet->getCell('E' . $row)->getValue());
                        $emailAuthor = trim($sheet->getCell('F' . $row)->getValue());
                        $totalShare = trim($sheet->getCell('G' . $row)->getValue());

                        $userShareholder = UserShareholder::where('cccd','like',$cccdShareholder)->first();
                        if ($userShareholder != null) {
                            $userAuthority = UserShareholder::where('cccd','like', $cccdAuthor)
                                ->where('is_auth', self::USER_AUTHORITY)->first();

                            if ($userAuthority == null) {
                                $password = Utils::generateRandomCode(6);
                                $dataUserAuth = [
                                    'username' => $cccdAuthor,
                                    'password' => Hash::make($password),
                                    'no_hash_password' => $password,
                                    'name' => $userAuthor,
                                    'code_dksh' => $cccdAuthor,
                                    'phone_number' => $phoneAuthor,
                                    'email' => $emailAuthor,
                                    'cccd' => $cccdAuthor,
                                    'user_id' => $user_id,
                                    'is_auth' => self::USER_AUTHORITY,
                                ];
                                $userAuthorInsert = UserShareholder::Create($dataUserAuth);
                            }
                            $dataAuth = [
                                'id_shareholder' => $userShareholder->id,
                                'id_author' => isset($userAuthorInsert) ? $userAuthorInsert->id : $userAuthority->id,
                                'status' => self::CHUA_DUYET,
                                'total_authority' => $totalShare,
                                'user_id' => $user_id,
                            ];
                            $userAuthoritys = UserShareAuthor::Create($dataAuth);
                        }else{
                            $response = [
                                "status" => 2,
                                "mess" => "Cổ đông ".$nameShareholder. " không tồn tại!",
                                "erros" => [],
                            ];
                        }
                    } catch (\Exception $e) {
                        $errors[] = [
                            "mess" => "Đã có lỗi xảy ra tại dòng " . $row,
                            "error" => $e->getMessage()
                        ];
                    }
                }
            } else {
                $response = [
                    "status" => 2,
                    "mess" => "File dữ liệu không hợp lệ!",
                    "erros" => [],
                ];
            }
        } catch (\Exception $e) {
            $response = [
                "status" => 2,
                "mess" => "Đã có lỗi xảy ra!",
                "erros" => $errors,
                "exception" => $e->getMessage()
            ];
        }
        return response()->json($response);
    }

    public function downloadUyQuyenDemo(Request $request)
    {
        $file = public_path() . "/files/DanhsachUyquyen.xlsx";
        // Download file with custom headers

        $header = array([
            'Content-Type' => 'application/vnd.ms-excel',
            'Content-Transfer-Encoding' => 'Binary',
            'Content-Length' => filesize($file),
            'Content-Disposition' => 'attachment; filename="' . $file . '"'
        ]);
        return Response::download($file, 'DanhsachUyquyen', $header);
    }

    public function getListAuthor(Request $request)
    {
        try {
            $data = $request->all();
            $query = $this->userShareAuthor->getList($data['name'], $data['status'], $data['author']);
            $result = Utils::messegerAlert(1, "alert-success", 'Thành công!', $query);
        } catch (\Exception $exception) {
            $result = Utils::messegerAlert(2, "alert-danger", 'Lỗi không lấy được thông tin!',);
        }
        return response()->json($result);
    }


    public function addShare(Request $request)
    {
        try {
            $validate = Validator::make($request->all(), [
                'name' => 'required',
                'cccd' => 'required',
                'password' => 'required',
            ]);
            if ($validate->fails()) {
                return response()->json(Utils::messegerAlert(2, "alert-danger", $validate->errors()));
            }
            $data = $request->all();
            $this->userShareAuthor->add($data);
            $result = Utils::messegerAlert(1, "alert-success", 'Thêm mới thành công!');
        } catch (\Exception $exception) {
            $result = Utils::messegerAlert(2, "alert-danger", 'Thêm mới thất bại!',);
        }
        return $result;
    }

    public function getByIdAuthor(Request $request)
    {
        try {
            $query = $this->userShareHolder->where('id', $request->id)->first();
            $result = Utils::messegerAlert(1, "alert-success", 'Thành công!', $query);
        } catch (\Exception $exception) {
            $result = Utils::messegerAlert(2, "alert-danger", 'Lỗi không lấy được thông tin!',);
        }
        return response()->json($result);
    }

    public function getAuthor()
    {
        try {
            $query = $this->userShareHolder->getAuthor();
            $result = Utils::messegerAlert(1, "alert-success", 'Thành công!', $query);
        } catch (\Exception $exception) {
            $result = Utils::messegerAlert(2, "alert-danger", 'Lỗi không lấy được thông tin!',);
        }
        return response()->json($result);
    }

    public function getAllUserShareHolder(Request $request)
    {
        try {
            $userId = Auth::id();
            $query = $this->userShareHolder->getAllShareHolder($request->nameSearch);
            $result = Utils::messegerAlert(1, "alert-success", 'Thành công!', $query);
        } catch (\Exception $exception) {
            $result = Utils::messegerAlert(2, "alert-danger", 'Lỗi không lấy được thông tin!',);
        }
        return response()->json($result);
    }

    public function getList(Request $request)
    {
        try {
            $nameSearch = $request->nameSearch;
            $data = $this->userShareHolder->getAuthority($nameSearch);
            $result = Utils::messegerAlert(1, "alert-success", 'Thành công!', $data);
        } catch (\Exception $exception) {
            $result = Utils::messegerAlert(2, "alert-danger", 'Thất bại!',);
        }
        return $result;
    }

    public function created(Request $request)
    {
        try {
            $validate = Validator::make($request->all(), [
                'name' => 'required',
                'cccd' => 'required',
                'password' => 'required',
            ]);
            if ($validate->fails()) {
                return response()->json(Utils::messegerAlert(2, "alert-danger", $validate->errors()));
            }
            $data = $request->all();
            $this->userShareHolder->add($data);
            $result = Utils::messegerAlert(1, "alert-success", 'Thêm mới thành công!');
        } catch (\Exception $exception) {
            $result = Utils::messegerAlert(2, "alert-danger", 'Thêm mới thất bại!',);
        }
        return $result;
    }

    public function getListById(Request $request)
    {
        try {
            $query = $this->userShareHolder->getListById($request->id);
            $result = Utils::messegerAlert(1, "alert-success", 'Thành công!', $query);
        } catch (\Exception $exception) {
            $result = Utils::messegerAlert(2, "alert-danger", 'Lỗi không lấy được thông tin!',);
        }
        return response()->json($result);
    }

    public function getUserAuthorByShareHolder(Request $request)
    {
        try {
            $query = $this->userShareHolder->getUserAuthorByShareHolder($request->id);
            $result = Utils::messegerAlert(1, "alert-success", 'Thành công!', $query);
        } catch (\Exception $exception) {
            $result = Utils::messegerAlert(2, "alert-danger", 'Lỗi không lấy được thông tin!',);
        }
        return response()->json($result);
    }

}
