<?php

namespace Modules\Shareholder\Http\Controllers;

use App\Models\ShareholderShare;
use App\Models\UserShareholder;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;
use \Exception;

require("PHPExcel/PHPExcel.php");


class ShareholderController extends Controller
{
    /*
   * Feedback
   */

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
            'file' => 'required'
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
                        "message" => "Lỗi không thể tải file ".pathinfo($inputFileName, PATHINFO_BASENAME).'ERROR: '.$e->getMessage(),
                    ];
                }
                $sheet = $objPHPExcel->getSheet(0);
                $highestRow = $sheet->getHighestRow();
                $user_id = Auth::user()->id;
                $tongSoCP = 0;

                for ($row = 2; $row <= $highestRow; $row++) {
                    $time = date("Y-m-d H:i:s");
                    $username = trim($sheet->getCell('B' . $row)->getValue());
                    if ($username) {
                        $shareHolderShareArray = [
                            'total' => 0,
                            'user_id' => $user_id
                        ];

                        $userShareholder = UserShareholder::where('username', $username)->first();
                        if ($userShareholder) {
                            $shareHolderShare = ShareholderShare::where('user_id', $userShareholder->id)->first();
                        }
                        $shareHolderShareArray['total'] = trim($sheet->getCell('H' . $row)->getValue());
                        $userShareholderArray = [
                            'user_id' => $user_id,
                        ];
                        $coPhan = trim($sheet->getCell('H' . $row)->getValue());
                        $userShareholderArray['name'] = trim($sheet->getCell('A' . $row)->getValue());
                        $userShareholderArray['code_dksh'] = $username;
                        $unixTime = strtotime(trim($sheet->getCell('C' . $row)->getFormattedValue()));
                        $convertDate = date('Y-m-d H:i:s',$unixTime);
                        $userShareholderArray['date_range'] = $convertDate;
                        $userShareholderArray['issued_by'] = trim($sheet->getCell('D' . $row)->getValue());
                        $userShareholderArray['phone_number'] = trim($sheet->getCell('E' . $row)->getValue());
                        $userShareholderArray['address'] = trim($sheet->getCell('F' . $row)->getValue());
                        $userShareholderArray['email'] = trim($sheet->getCell('G' . $row)->getValue());
                        $userShareholderArray['type'] = trim($sheet->getCell('I' . $row)->getValue());
                        $userShareholderArray['organization'] = trim($sheet->getCell('J' . $row)->getValue());
                        $userShareholderArray['username'] = $username;
                        $userShareholderArray['password'] = rand(100000,999999);
                        $shareHolderShareArray['total'] = $coPhan;
                        $tongSoCP += $coPhan;

                        if ($userShareholder) {
                            $userShareholderArray['updated_at'] = $time;
                            $shareHolderShareArray['updated_at'] = $time;
                            $userShareholder->update($userShareholderArray);
                            $shareHolderShare->update($shareHolderShareArray);
                        } else {
                            $userShareholderArray['created_at'] = $time;
                            $shareHolderShareArray['created_at'] = $time;
                            $userShareholderId = UserShareholder::insertGetId($userShareholderArray);
                            if ($userShareholderId) {
                                $shareHolderShareArray['user_shares_id'] = $userShareholderId;
                                ShareholderShare::insert($shareHolderShareArray);
                            }
                        }
                    }
                }
            } else {
                return [
                    "status" => 2,
                    "message" => "Không tìm thấy file dữ liệu cổ đông!",
                ];
            }
        } catch (Exception $e) {
            return [
                "status" => 2,
                "message" => "Đã có lỗi xảy ra!",
                "error" => $e->getMessage()
            ];
        }
        return [
            "status" => 1,
            "message" => "Import Cổ đông thành công!",
        ];
    }


}
