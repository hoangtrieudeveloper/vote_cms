<?php

namespace Modules\Shareholder\Http\Controllers;

use App\Models\ShareholderShare;
use App\Models\User;
use App\Models\UserShareholder;
use App\Utils;
use Barryvdh\DomPDF\Facade\Pdf;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;
use \Exception;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

require("PHPExcel/PHPExcel.php");


class ShareholderController extends Controller
{
    /*
   * Feedback
   */

    public function getTkLogin(Request $request){
        /*try {*/
            $query = UserShareholder::getTkLogin($request->id);
            $data = ['title' => 'Welcome to Viet Nam'];
                $pdf = Pdf::loadView("myPDF",$data)->save("/myPDF.pdf");
//                $pdf = Pdf::loadHTML('<h1 class="text-dark">123</h1>');
            //Nếu muốn hiển thị file pdf theo chiều ngang
            // $pdf->setPaper('A4', 'landscape');

            //Nếu muốn download file pdf
          /*  return $pdf->download('myPDF.pdf');*/

            //Nếu muốn preview in pdf
//        $headers = [
//            'Content-Type' => 'application/pdf',
//            'Content-Disposition' => 'inline; myPDF.pdf',
//        ];
            return response()->json(mb_convert_encoding($pdf->stream("myPDF.pdf"), 'UTF-8', 'UTF-8'));

       /*     $result = Utils::messegerAlert(1, "alert-success", 'Thành công!',$query);
        } catch (\Exception $exception) {
            $result = Utils::messegerAlert(2, "alert-danger", 'Thất bại!',);
        }
        return response()->json($result);*/
    }

    public function checkIn(Request $request)
    {
        try {
            $query = UserShareholder::checkIn($request->id);
            $result = Utils::messegerAlert(1, "alert-success", 'Check in Thành công!',$query);
        } catch (\Exception $exception) {
            $result = Utils::messegerAlert(2, "alert-danger", 'Check in Thất bại!',);
        }
        return response()->json($result);
    }

    public function getListById(Request $request)
    {
        try {
            $id = $request->id;
            $query = UserShareholder::getListById($id);
            $result = Utils::messegerAlert(1, "alert-success", 'Thành công!', $query);
        } catch (\Exception $exception) {
            $result = Utils::messegerAlert(2, "alert-danger", 'Thất bại!',);
        }
        return response()->json($result);
    }

    public function getListCheckin(Request $request)
    {
        try {
            $txtName = $request->name;
            $checkin = $request->checkin;
            $query = UserShareholder::getListCheckin($txtName, $checkin);
            $result = Utils::messegerAlert(1, "alert-success", 'Thành công!', $query);
        } catch (\Exception $exception) {
            $result = Utils::messegerAlert(2, "alert-danger", 'Thất bại!',);
        }
        return response()->json($result);
    }

    public function updateBlock(Request $request)
    {

        $validate = Validator::make($request->all(), [
            'user_share_id' => 'required|numeric',
            'status' => 'required',
            'congress_id' => 'required',
        ]);
        if ($validate->fails()) {
            return response()->json(Utils::messegerAlert(2, "alert-danger", $validate->errors()));
        }
        try {
            $data = [
                'id_user_share' => $request->user_share_id,
                'status' => $request->status,
                'id_vote_congress_report' => $request->congress_id,
            ];
            $edit = UserShareholder::updateStatusBlockVote($data);
            $result = Utils::messegerAlert(1, "alert-success", 'Thành công!', $edit);
        } catch (\Exception $exception) {
            $result = Utils::messegerAlert(2, "alert-danger", 'Thất bại!',);
        }
        return response()->json($result);
    }

    public function getListReport(Request $request)
    {
        $congress_id = $request->id;
        $status = $request->block;
        $txtName = $request->name;
        $query = UserShareholder::getListReport($congress_id, $status, $txtName);
        $title = UserShareholder::getTitCongress($congress_id);
        if ($query) {
            $result = [
                "status" => 1,
                "message" => "Thành công!",
                "data" => ["data" => $query, "title" => $title]
            ];
        } else {
            $result = [
                "status" => 2,
                "message" => "Lỗi!",
                "data" => '',
            ];
        }
        return response()->json($result);
    }

    public function getList(Request $request)
    {
        $user_id = Auth::user()->id;
        $txtName = $request->name;
        $type = $request->type;
        $organization = $request->organization;
        $query = UserShareholder::query();
        $query = $query->where(function ($query) use ($txtName, $type, $organization) {
            $query->where('name', 'like', '%' . $txtName . '%')
                ->orWhere('cccd', 'like', '%' . $txtName . '%')
                ->orWhere('phone_number', 'like', '%' . $txtName . '%')
                ->orWhere('code_dksh', 'like', '%' . $txtName . '%')
                ->orWhere('type', $type)
                ->orWhere('organization', $organization);
        })
            ->orderBy('id', 'desc')
            ->paginate(10);
        foreach ($query as $v) {
            $v['date_range'] = Carbon::parse($v->date_range)->format('d-m-Y');
            $shareholder_share_total = DB::table('shareholder_shares')->where('user_id', $user_id)->where('user_shares_id', $v->id)->first();
            $v['total'] = $shareholder_share_total != null ? $shareholder_share_total->total : 0;
        }
        if ($query) {
            $result = [
                "status" => 1,
                "message" => "Thành công!",
                "data" => $query,
            ];
        } else {
            $result = [
                "status" => 2,
                "message" => "Lỗi!",
                "data" => '',
                "group_name" => ''
            ];
        }
        return response()->json($result);
    }

    public function getListOrganization()
    {
        return response()->json([
            "status" => 1,
            "message" => "Thành công!",
            "data" => UserShareholder::getListOrganization(),
        ]);
    }

    public function getListType()
    {
        return response()->json([
            "status" => 1,
            "message" => "Thành công!",
            "data" => UserShareholder::getListType(),
        ]);
    }

    public function getListVoteStatus()
    {
        return response()->json([
            "status" => 1,
            "message" => "Thành công!",
            "data" => UserShareholder::getListVoteStatus(),
        ]);
    }

    public function getListStatus()
    {
        return response()->json([
            "status" => 1,
            "message" => "Thành công!",
            "data" => UserShareholder::getListStatus(),
        ]);
    }

    public function getListAuthority()
    {
        return response()->json([
            "status" => 1,
            "message" => "Thành công!",
            "data" => UserShareholder::getListAuthority(),
        ]);
    }

    public function getListJointTypes()
    {
        return response()->json([
            "status" => 1,
            "message" => "Thành công!",
            "data" => UserShareholder::getListJointTypes(),
        ]);
    }

    public function importCoDong(Request $request)
    {
        $request->validate([
            'file' => 'required|mimes:xlsx, xls'
        ]);
        $response = [
            "status" => 1,
            "message" => "Import Cổ đông thành công!",
            "erros" => [],
        ];
        try {
            if ($request->hasFile('file') && $request->file('file')->isValid()) {
                $inputFileName = $request->file('file')->getRealPath();
                try {
                    $inputFileType = \PHPExcel_IOFactory::identify($inputFileName);
                    $objReader = \PHPExcel_IOFactory::createReader($inputFileType);
                    $objPHPExcel = $objReader->load($inputFileName);
                } catch (Exception $e) {
                    $response = [
                        "status" => 2,
                        "message" => "Lỗi không thể tải file " . pathinfo($inputFileName, PATHINFO_BASENAME) . 'ERROR: ' . $e->getMessage(),
                    ];
                }
                $sheet = $objPHPExcel->getSheet(0);
                $highestRow = $sheet->getHighestRow();
                $user_id = Auth::user()->id;
                $tongSoCP = 0;
                $errors = [];

                for ($row = 2; $row <= $highestRow; $row++) {
                    try {
                        $time = date("Y-m-d H:i:s");
                        $username = trim($sheet->getCell('B' . $row)->getValue());
                        if ($username) {
                            $shareHolderShareArray = [
                                'total' => 0,
                                'user_id' => $user_id
                            ];

                            $userShareholder = UserShareholder::where('username', $username)->first();
                            if ($userShareholder) {
                                $shareHolderShare = ShareholderShare::where('user_shares_id', $userShareholder->id)->first();
                            }
                            $shareHolderShareArray['total'] = trim($sheet->getCell('H' . $row)->getValue());
                            $userShareholderArray = [
                                'user_id' => $user_id,
                            ];
                            $coPhan = trim($sheet->getCell('H' . $row)->getValue());
                            $userShareholderArray['name'] = trim($sheet->getCell('A' . $row)->getValue());
                            $userShareholderArray['code_dksh'] = $username;
                            $unixTime = strtotime(trim($sheet->getCell('C' . $row)->getFormattedValue()));
                            $convertDate = date('Y-m-d H:i:s', $unixTime);
                            $userShareholderArray['date_range'] = $convertDate;
                            $userShareholderArray['issued_by'] = trim($sheet->getCell('D' . $row)->getValue());
                            $userShareholderArray['phone_number'] = trim($sheet->getCell('E' . $row)->getValue());
                            $userShareholderArray['address'] = trim($sheet->getCell('F' . $row)->getValue());
                            $userShareholderArray['email'] = trim($sheet->getCell('G' . $row)->getValue());
                            $userShareholderArray['cccd'] = $username;
                            $userShareholderArray['type'] = trim($sheet->getCell('I' . $row)->getValue());
                            $userShareholderArray['organization'] = trim($sheet->getCell('J' . $row)->getValue());
                            $userShareholderArray['username'] = $username;
                            $password = Utils::generateRandomCode(6);
                            $userShareholderArray['password'] = Hash::make($password);
                            $userShareholderArray['no_hash_password'] = $password;
                            $shareHolderShareArray['total'] = $coPhan;
                            $tongSoCP += $coPhan;

                            if ($userShareholder) {
                                $userShareholderArray['updated_at'] = $time;
                                $userShareholder->update($userShareholderArray);
                                if (isset($shareHolderShare)) {
                                    $shareHolderShareArray['updated_at'] = $time;
                                    $shareHolderShare->update($shareHolderShareArray);
                                } else {
                                    $shareHolderShareArray['user_shares_id'] = $userShareholder->id;
                                    $shareHolderShareArray['created_at'] = $time;
                                    ShareholderShare::insert($shareHolderShareArray);
                                }
                            } else {
                                $userShareholderArray['created_at'] = $time;
                                $shareHolderShareArray['created_at'] = $time;
                                $userShareholderId = UserShareholder::insertGetId($userShareholderArray);
                                if (isset($userShareholderId)) {
                                    $shareHolderShareArray['user_shares_id'] = $userShareholderId;
                                    ShareholderShare::insert($shareHolderShareArray);
                                }
                            }
                        }
                    } catch (Exception $e) {
                        $errors[] = [
                            "message" => "Đã có lỗi xảy ra tại dòng " . $row,
                            "error" => $e->getMessage()
                        ];
                    }
                }
            } else {
                $response = [
                    "status" => 2,
                    "message" => "File dữ liệu không hợp lệ!",
                ];
            }
        } catch (Exception $e) {
            $response = [
                "status" => 2,
                "message" => "Đã có lỗi xảy ra!",
                "erros" => $errors,
                "exception" => $e->getMessage()
            ];
        }
        return response()->json($response);
    }

    public function downloadCDDemo(Request $request)
    {
        $file = public_path() . "/files/DanhsachcodongDemo.xlsx";
        // Download file with custom headers
        return response()->withHeaders([
            'Content-Type' => 'application/vnd.ms-excel',
            'Content-Transfer-Encoding' => 'Binary',
            'Content-Length' => filesize($file),
            'Content-Disposition' => 'attachment; filename="' . $file . '"'
        ]);
    }

    public function downloadCDPass(Request $request)
    {
        try {
            $data = UserShareholder::where('user_id', Auth::user()->id)->get();
            $fileType = 'Excel2007';
            $fileName = public_path() . "/files/SchemaMKCD.xlsx";
            $objPHPExcel = \PHPExcel_IOFactory::load($fileName);
            $objPHPExcel->getActiveSheet();
            $startRow = 2;
            if ($data) {
                foreach ($data as $idx => $row) {
                    $objPHPExcel->setActiveSheetIndex(0)
                        ->setCellValue("A" . ($startRow + $idx), $idx + 1)
                        ->setCellValue("B" . ($startRow + $idx), $row->id)
                        ->setCellValue("C" . ($startRow + $idx), $row->name)
                        ->setCellValue("D" . ($startRow + $idx), $row->username)
                        ->setCellValue("E" . ($startRow + $idx), $row->no_hash_password);
                }
                $objWriter = \PHPExcel_IOFactory::createWriter($objPHPExcel, $fileType);
                header('Content-Description: File Transfer');
                header('Content-Type: application/vnd.ms-excel');
                header('Content-Disposition: attachment;filename="report.xlsx"');
                $objWriter->save('php://output');
            } else {
                throw new Exception('Không có dữ liệu!');
            }
        } catch (\PHPExcel_Exception $e) {
            throw new Exception('Error' . $e->getMessage());
        }
    }

    public function exportDSCD(Request $request)
    {
        try {
            $user_id = Auth::user()->id;
            $data = UserShareholder::where('user_id', $user_id)->get();
            $fileType = 'Excel2007';
            $fileName = public_path() . "/files/SchemaCoDong.xlsx";
            $objPHPExcel = \PHPExcel_IOFactory::load($fileName);
            $objPHPExcel->getActiveSheet();
            $startRow = 2;
            if ($data) {
                foreach ($data as $idx => $row) {
                    $shareholder_share_total = DB::table('shareholder_shares')->where('user_id', $user_id)->where('user_shares_id', $row->id)->first();
                    $cp = $shareholder_share_total != null ? $shareholder_share_total->total : 0;
                    $objPHPExcel->setActiveSheetIndex(0)
                        ->setCellValue("A" . ($startRow + $idx), $row->id)
                        ->setCellValue("B" . ($startRow + $idx), $row->name)
                        ->setCellValue("C" . ($startRow + $idx), $row->cccd)
                        ->setCellValue("D" . ($startRow + $idx), $row->phone_number)
                        ->setCellValue("E" . ($startRow + $idx), $cp)
                        ->setCellValue("F" . ($startRow + $idx), 0)
                        ->setCellValue("G" . ($startRow + $idx), $row->email)
                        ->setCellValue("H" . ($startRow + $idx), 'Trực tuyến')
                        ->setCellValue("I" . ($startRow + $idx), 'CĐ')
                        ->setCellValue("J" . ($startRow + $idx), 'Chưa biểu quyết')
                        ->setCellValue("K" . ($startRow + $idx), 'Không hoạt động');
                }
                $objWriter = \PHPExcel_IOFactory::createWriter($objPHPExcel, $fileType);
                header('Content-Description: File Transfer');
                header('Content-Type: application/vnd.ms-excel');
                header('Content-Disposition: attachment;filename="report.xlsx"');
                $objWriter->save('php://output');
            } else {
                throw new Exception('Không có dữ liệu!');
            }
        } catch (\PHPExcel_Exception $e) {
            throw new Exception('Error' . $e->getMessage());
        }
    }

    public function lockChangePassword(Request $request)
    {
        $locked = User::LockShareholderEdit();
        if ($locked) {
            return response()->json([
                "status" => 1,
                "message" => "Khóa việc thay đổi mật khẩu thành công!",
            ]);
        }
        return response()->json([
            "status" => 2,
            "message" => "Khóa việc thay đổi mật khẩu không thành công!",
        ]);
    }

}
