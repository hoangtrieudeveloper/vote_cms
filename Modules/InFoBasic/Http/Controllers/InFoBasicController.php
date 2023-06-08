<?php

namespace Modules\InFoBasic\Http\Controllers;

use App\Models\SettingCompanyModel;
use App\Utils;
use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class InFoBasicController extends Controller
{
    private $settingCompany;

    public function __construct(SettingCompanyModel $settingCompany)
    {
        $this->settingCompany = $settingCompany;
    }

    public function getById(Request $request)
    {
        try {
            $userId = Auth::id();
            $query = $this->settingCompany->getById($userId);
            $result = Utils::messegerAlert(1, "alert-success", 'Thành công!', $query);
        } catch (\Exception $exception) {
            $result = Utils::messegerAlert(2, "alert-danger", 'Lỗi không lấy được thông tin!',);
        }
        return response()->json($result);
    }

    public function update(Request $request)
    {
        try {
            $validate = Validator::make($request->all(), [
                'id' => 'numeric',
                'name_vn' => 'required|string',
                'name_en' => 'required|string',
            ]);
            if ($validate->fails()) {
                return response()->json(Utils::messegerAlert(2, "alert-danger", $validate->errors()));
            }
            $data = [
                'id' => $request->id,
                'logo' => $request->logo,
                'banner' => $request->banner,
                'name_vn' => $request->name_vn,
                'name_en' => $request->name_en,
                'phone_number' => $request->phone_number,
                'number_fax' => $request->number_fax,
                'stock_code' => $request->stock_code,
                'code_business' => $request->code_business,
                'header_company' => $request->header_company,
                'header_company_en' => $request->header_company_en,
                'meeting_venue' => $request->meeting_venue,
                'meeting_venue_en' => $request->meeting_venue_en,
                'meeting_time' => $request->meeting_time,
                'meeting_time_en' => $request->meeting_time_en,
                'meeting_name' => $request->meeting_name,
                'meeting_name_en' => $request->meeting_name_en,
                'meeting_chairman' => $request->meeting_chairman,
                'meeting_chairman_en' => $request->meeting_chairman_en,
                'secretary_chairman' => $request->secretary_chairman,
                'secretary_chairman_en' => $request->secretary_chairman_en,
                'link_livestream' => $request->link_livestream,
                'link_livestream_en' => $request->link_livestream_en,
                'Link_hdsd' => $request->Link_hdsd,
                'Link_hdsd_en' => $request->Link_hdsd_en,
                'link_stated' => $request->link_stated,
                'closing_date' => $request->closing_date,
                'hotline' => $request->hotline,
            ];
            $edit = $this->settingCompany->edit($data);
            $result = Utils::messegerAlert(1, "alert-success", 'Cập nhật thông tin cơ bản thành công!', $edit);
        } catch (\Exception $exception) {
            $result = Utils::messegerAlert(2, "alert-danger", 'Cập nhật thông tin cơ bản thất bại!',);
        }
        return response()->json($result);
    }

    public function uploadFile(Request $request)
    {
        try {
            $url = Utils::post_file_key('file');
            $url = substr($url, 1);
        } catch (\Exception $exception) {
            $url = null;
        }
        return response()->json($url);
    }

}
