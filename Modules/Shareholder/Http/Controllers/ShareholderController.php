<?php

namespace Modules\Shareholder\Http\Controllers;

use App\Models\ShareholderShare;
use App\Models\UserShareholder;
use App\Utils;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;
use \Exception;
use Illuminate\Support\Facades\Validator;

require("PHPExcel/PHPExcel.php");


class ShareholderController extends Controller
{
    /*
   * Feedback
   */

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
        $txtName = $request->name;
        $type = $request->type;
        $organization = $request->organization;
        $query = UserShareholder::query();
        if ($type) {
            $query = $query->where('type', $type);
        }
        if ($organization) {
            $query = $query->where('organization', $organization);
        }
        $query = $query->where('name', 'like', '%' . $txtName . '%')
            ->where('code_dksh', 'like', '%' . $txtName . '%')
            ->orderBy('id', 'desc')
            ->paginate(10);
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
        return [
            "status" => 1,
            "message" => "Thành công!",
            "data" => UserShareholder::getListOrganization(),
        ];
    }

    public function getListType()
    {
        return [
            "status" => 1,
            "message" => "Thành công!",
            "data" => UserShareholder::getListType(),
        ];
    }

    public function importCoDong(Request $request)
    {
        $request->validate([
            'file' => 'required|mimes:xlsx, xls'
        ]);
        try {
            if ($request->hasFile('file') && $request->file('file')->isValid()) {
                $inputFileName = $request->file('file')->getRealPath();
                try {
                    $inputFileType = \PHPExcel_IOFactory::identify($inputFileName);
                    $objReader = \PHPExcel_IOFactory::createReader($inputFileType);
                    $objPHPExcel = $objReader->load($inputFileName);
                } catch (Exception $e) {
                    return [
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
                            $userShareholderArray['type'] = trim($sheet->getCell('I' . $row)->getValue());
                            $userShareholderArray['organization'] = trim($sheet->getCell('J' . $row)->getValue());
                            $userShareholderArray['username'] = $username;
                            $userShareholderArray['password'] = Utils::generateRandomCode(6);
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
                return [
                    "status" => 2,
                    "message" => "File dữ liệu không hợp lệ!",
                ];
            }
        } catch (Exception $e) {
            return [
                "status" => 2,
                "message" => "Đã có lỗi xảy ra!",
                "erros" => $errors,
                "exception" => $e->getMessage()
            ];
        }
        return [
            "status" => 1,
            "message" => "Import Cổ đông thành công!",
            "erros" => $errors,
        ];
    }


}
