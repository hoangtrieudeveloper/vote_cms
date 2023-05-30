<?php

namespace Modules\Congress\Http\Controllers;

use App\Models\User;
use App\Utils;
use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Modules\Congress\Models\CongressModel;

class CongressController extends Controller
{
    protected $congressModel;

    public function __construct(CongressModel $congressModel)
    {
        $this->congressModel = $congressModel;
    }

    public function getList()
    {
        try {
            $query = $this->congressModel->getList();
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
            $data = [
                'name_vn' => $request->name_vn,
                'name_en' => $request->name_en,
                'file_content_vn' => $request->file_content_vn,
                'file_content_en' => $request->file_content_en,
                'user_id' => $request->user_id,
                'type' => 1,
                'sort' => 1,
            ];

            $insert = $this->congressModel->add($data);
            $result = Utils::messegerAlert(1, "alert-success", 'Tạo thủ tục khai mạc thành công!', $insert);
        } catch (\Exception $exception) {
            $result = Utils::messegerAlert(2, "alert-danger", 'Tạo thủ tục khai mạc thất bại!',);
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
                'type' => 1,
                'sort' => 1,
            ];
            $edit = $this->congressModel->edit($data);
            $result = Utils::messegerAlert(1, "alert-success", 'Cập nhật thủ tục khai mạc thành công!', $edit);
        } catch (\Exception $exception) {
            $result = Utils::messegerAlert(2, "alert-danger", 'Cập nhật thủ tục khai mạc thất bại!',);
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
            $result = Utils::messegerAlert(1, "alert-success", 'Xóa thủ tục khai mạc thành công!', $del);
        } catch (\Exception $exception) {
            $result = Utils::messegerAlert(2, "alert-danger", 'Cập nhật thủ tục khai mạc thất bại!',);
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
