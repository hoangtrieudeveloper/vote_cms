<?php

namespace Modules\Shareholder\Http\Controllers;

use App\Models\ShareholderShare;
use App\Models\User;
use App\Models\UserShareAuthor;
use App\Models\UserShareCheckin;
use App\Models\UserShareholder;
use App\Models\UserSharesVote;
use App\Models\VoteCongressContent;
use App\Utils;
use Barryvdh\DomPDF\Facade\Pdf;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;
use \Exception;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;

require("PHPExcel/PHPExcel.php");


class ShareholderController extends Controller
{
    /*
   * Feedback
   */

    public function statistical()
    {
        try {
            $userId = Auth::user()->id;
            // cổ đông
            $totalCD1 = UserShareholder::where('user_id', $userId)->count();
            $totalCP1 = ShareholderShare::where('user_id', $userId)->sum('total');
            $ratio = '';

            //online
            $checkIn = UserShareCheckin::where('is_check', 2)->select('user_shares_id')->get()->toArray();
            $totalCD2 = UserSharesVote::whereIn('id_user_shares', $checkIn)->count();
            $totalCP2 = ShareholderShare::whereIn('user_shares_id', $checkIn)->sum('total');
            $ratio2 = '';

            //trực tiếp
            $checkInOff = UserShareCheckin::where('is_check', 1)->select('user_shares_id')->get()->toArray();
            $totalCD3 = UserSharesVote::whereIn('id_user_shares', $checkInOff)->count();
            $totalCP3 = ShareholderShare::whereIn('user_shares_id', $checkInOff)->sum('total');
            $ratio3 = '';

            $totalCD4 = UserShareAuthor::where([['status', 1], ['user_id', $userId]])->get()->unique('id_shareholder')->count();
            $totalCP4 = UserShareAuthor::where([['status', 1], ['user_id', $userId]])->sum('total_authority');
            $ratio4 = '';

            $query = [
                'total1' => [
                    'totalCD1' => $totalCD1,
                    'totalCP1' => $totalCP1,
                    'ratio1' => "0.01786",
                ],
                'total2' => [
                    'totalCD2' => $totalCD2,
                    'totalCP2' => $totalCP2,
                    'ratio2' => "0.01786",
                ],
                'total3' => [
                    'totalCD3' => $totalCD3,
                    'totalCP3' => $totalCP3,
                    'ratio3' => "0.01786",
                ],
                'total4' => [
                    'totalCD4' => $totalCD4,
                    'totalCP4' => $totalCP4,
                    'ratio4' => "0.01786",
                ],
            ];
            $result = Utils::messegerAlert(1, "alert-success", 'Thành công!', $query);
        } catch (\Exception $exception) {
            $result = Utils::messegerAlert(2, "alert-danger", 'Thất bại!',);
        }
        return response()->json($result);
    }

    public function getListExport(Request $request)
    {
        try {
            $query = UserShareholder::getListCheckin(null, null);
            $result = Utils::messegerAlert(1, "alert-success", 'Thành công!', $query);
        } catch (\Exception $exception) {
            $result = Utils::messegerAlert(2, "alert-danger", 'Thất bại!',);
        }
        return response()->json($result);
    }

    public function getTkLogin(Request $request)
    {
        try {
            $query = UserShareholder::getTkLogin($request->id);
            $pdf = Pdf::loadView("myPDF", [
                'name' => $query->name,
                'code' => $query->code_dksh,
                'username' => $query->username,
                'no_hash_password' => $query->no_hash_password,
            ]);
            return $pdf->download('myPDF.pdf');
        } catch (\Exception $exception) {
            $result = Utils::messegerAlert(2, "alert-danger", 'Thất bại!',);
            return response()->json($result);
        }

    }

    public function getCongress(Request $request)
    {
        date_default_timezone_set("Asia/Ho_Chi_Minh");
        try {
            $query = UserShareholder::getTkLogin($request->id);
            $total = ShareholderShare::where('user_shares_id', $query->id)->first();
            $pdf = Pdf::loadView("Congress\PDF", [
                'congress_1' => VoteCongressContent::getCongressById(1),
                'congress_2' => VoteCongressContent::getCongressById(2),
                'congress_3' => VoteCongressContent::getCongressById(3),
                'day' => date('d'),
                'month' => date('m'),
                'year' => date('Y'),
                'name' => $query->name,
                'code' => $query->code_dksh,
                'total' => $total != null ? number_format($total->total , 0, ',', '.') : null,
            ]);
            return $pdf->download('myPDF.pdf');
        } catch (\Exception $exception) {
            $result = Utils::messegerAlert(2, "alert-danger", 'Thất bại!',);
            return response()->json($result);
        }

    }


    public function checkIn(Request $request)
    {
        try {
            $query = UserShareholder::checkIn($request->id);
            $result = Utils::messegerAlert(1, "alert-success", 'Check in Thành công!', $query);
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
            ->orderBy('id', 'asc')
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

    public function getListQLCD(Request $request)
    {
        $user_id = Auth::user()->id;
        $txtName = $request->name;
        $voteStatus = $request->voteStatus;
        $jointType = $request->jointType;
        $authority = $request->authority;
        $query = UserShareholder::query();
        if ($voteStatus) {
            if ($voteStatus == UserShareholder::VOTED) {
                $query = $query->whereHas('userSharesVote');
            } else {
                $query = $query->doesntHave('userSharesVote');
            }
        }
        if (array_key_exists($jointType, UserShareholder::getListJointTypes())) {
            $query = $query->whereHas('userSharesCheckin', function ($query) use ($jointType) {
                $query->where('is_check', $jointType);
            });
        }
        if ($authority) {
            if ($authority == UserShareholder::AUTHORITY) {
                $query = $query->whereHas('userSharesAuthor');
            } else {
                $query = $query->doesntHave('userSharesAuthor');
            }
        }
        $query = $query->where(function ($query) use ($txtName) {
            $query->where('name', 'like', '%' . $txtName . '%')
                ->orWhere('cccd', 'like', '%' . $txtName . '%')
                ->orWhere('phone_number', 'like', '%' . $txtName . '%')
                ->orWhere('code_dksh', 'like', '%' . $txtName . '%');
        })->orderBy('id', 'asc')
            ->paginate(10);
        foreach ($query as $v) {
            $v['date_range'] = Carbon::parse($v->date_range)->format('d-m-Y');
            $shareholder_share_total = DB::table('shareholder_shares')->where('user_id', $user_id)->where('user_shares_id', $v->id)->first();
            $v['total'] = $shareholder_share_total != null ? $shareholder_share_total->total : 0;
            $checkIn = DB::table('user_shares_checkin')->where('user_shares_id', $v->id)->first();
            $v['checkIn'] = $checkIn != null && $checkIn->is_check;
            $voteStatus = DB::table('user_shares_vote')->where('user_id', $user_id)->where('id_user_shares', $v->id)->first();
            $v['voteStatus'] = $voteStatus != null;
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

    public function getListCongressContent(Request $request)
    {
        $user_share_id = $request->id;
        $result = [
            "status" => 2,
            "message" => "Lỗi!",
            "data" => '',
            "group_name" => ''
        ];
        if ($user_share_id) {
            $query = UserShareholder::find($user_share_id)->voteCongressContent()->orderBy('type', 'asc')->orderBy('sort', 'asc')->get();
            foreach ($query as $v) {
                $shareVote = UserSharesVote::where(['id_congress' => $v->id,
                    'id_user_shares' => $user_share_id])->first();
                $v['status'] = UserSharesVote::getBadgeStatus()[$shareVote->vote];
            }
            if ($query) {
                $result = [
                    "status" => 1,
                    "message" => "Thành công!",
                    "data" => $query,
                ];
            }
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

        $header = array([
            'Content-Type' => 'application/vnd.ms-excel',
            'Content-Transfer-Encoding' => 'Binary',
            'Content-Length' => filesize($file),
            'Content-Disposition' => 'attachment; filename="' . $file . '"'
        ]);
        return Response::download($file, 'DanhsachcodongDemo', $header);
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
                    $checkIn = DB::table('user_shares_checkin')->where('user_shares_id', $v->id)->first();
                    $checkIn = $checkIn != null && $checkIn->is_check;
                    $voteStatus = DB::table('user_shares_vote')->where('user_id', $user_id)->where('id_user_shares', $v->id)->first();
                    $voteStatus = $voteStatus != null;
                    $objPHPExcel->setActiveSheetIndex(0)
                        ->setCellValue("A" . ($startRow + $idx), $row->id)
                        ->setCellValue("B" . ($startRow + $idx), $row->name)
                        ->setCellValue("C" . ($startRow + $idx), $row->cccd)
                        ->setCellValue("D" . ($startRow + $idx), $row->phone_number)
                        ->setCellValue("E" . ($startRow + $idx), $cp)
                        ->setCellValue("F" . ($startRow + $idx), 0)
                        ->setCellValue("G" . ($startRow + $idx), $row->email)
                        ->setCellValue("H" . ($startRow + $idx), $checkIn ? 'Trực tiếp' : 'Chưa checkin')
                        ->setCellValue("I" . ($startRow + $idx), $row->is_auth ? 'Ủy quyển' : 'Cổ đông')
                        ->setCellValue("J" . ($startRow + $idx), $voteStatus ? 'Đã biểu quyết' : 'Chưa biểu quyết');
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
