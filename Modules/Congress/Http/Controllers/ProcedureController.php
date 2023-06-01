<?php

namespace Modules\Congress\Http\Controllers;

use App\Utils;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Modules\Congress\Config\constants;
use Modules\Congress\Models\CongressModel;

class ProcedureController extends Controller
{
    protected $congressModel;

    public function __construct(CongressModel $congressModel)
    {
        $this->congressModel = $congressModel;
    }

    public function getList()
    {
        try {
            $query = $this->congressModel->getList(constants::BE_MAC);
            $result = Utils::messegerAlert(1, "alert-success", 'Thành công!', $query);
        } catch (\Exception $exception) {
            $result = Utils::messegerAlert(2, "alert-danger", 'Thất bại!');
        }
        return response()->json($result);
    }

    public function created(Request $request)
    {
        try {
            $validate = Validator::make($request->all(), [
                'name_vn' => 'required|string',
                'name_en' => 'required|string',
                'file_content_vn' => 'required',
                'file_content_en' => 'required',
            ]);
            if ($validate->fails()) {
                return response()->json(Utils::messegerAlert(2, "alert-danger", $validate->errors()));
            }
            $lastData = $this->congressModel->getLastData(constants::BE_MAC);
            $data = [
                'name_vn' => $request->name_vn,
                'name_en' => $request->name_en,
                'file_content_vn' => $request->file_content_vn,
                'file_content_en' => $request->file_content_en,
                'user_id' => Auth::user()->id,
                'created_by' => Auth::user()->id,
                'type' => constants::BE_MAC,
                'sort' => $lastData == null || $lastData['sort'] == 0 ? 1 : (int)$lastData['sort'] + 1
            ];

            $insert = $this->congressModel->add($data);
            $result = Utils::messegerAlert(1, "alert-success", 'Tạo thủ tục bế mạc thành công!', $insert);
        } catch (\Exception $exception) {
            $result = Utils::messegerAlert(2, "alert-danger", 'Tạo thủ tục bế mạc thất bại!',);
        }
        return response()->json($result);
    }

    public function getById(Request $request)
    {
        try {
            $validate = Validator::make($request->all(), [
                'id' => 'numeric',
            ]);
            if ($validate->fails()) {
                return response()->json(Utils::messegerAlert(2, "alert-danger", $validate->errors()));
            }
            $data = $request->all();
            $query = $this->congressModel->getById($data['id']);
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
                'file_content_vn' => 'required',
                'file_content_en' => 'required',
            ]);
            if ($validate->fails()) {
                return response()->json(Utils::messegerAlert(2, "alert-danger", $validate->errors()));
            }
            $data = [
                'id' => $request->id,
                'name_vn' => $request->name_vn,
                'name_en' => $request->name_en,
                'file_content_vn' => $request->file_content_vn,
                'file_content_en' => $request->file_content_en,
            ];
            $edit = $this->congressModel->edit($data);
            $result = Utils::messegerAlert(1, "alert-success", 'Cập nhật thủ tục bế mạc thành công!', $edit);
        } catch (\Exception $exception) {
            $result = Utils::messegerAlert(2, "alert-danger", 'Cập nhật thủ tục bế mạc thất bại!',);
        }
        return response()->json($result);
    }

    public function delete(Request $request)
    {
        try {
            $validate = Validator::make($request->all(), [
                'id' => 'numeric',
            ]);
            if ($validate->fails()) {
                return response()->json(Utils::messegerAlert(2, "alert-danger", $validate->errors()));
            }
            $data = $request->all();
            $del = $this->congressModel->del($data['id']);
            $result = Utils::messegerAlert(1, "alert-success", 'Xóa thủ tục bế mạc thành công!', $del);
        } catch (\Exception $exception) {
            $result = Utils::messegerAlert(2, "alert-danger", 'Cập nhật thủ tục bế mạc thất bại!',);
        }
        return response()->json($result);
    }

    public function uploadFile(Request $request)
    {
        try {
            $url = Utils::post_file_key_vn('file');
            $url = substr($url, 1);
        } catch (\Exception $exception) {
            $url = null;
        }
        return response()->json($url);
    }
}
