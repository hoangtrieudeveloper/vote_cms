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

    public function getList(Request $request)
    {
        $query = DB::table('vote_congress_content')
            ->orderBy('vote_congress_content.id', 'desc')
            ->paginate(20);
        if ($query) {
            $result = [
                "status" => 1,
                "messager" => "Thành công!",
                "success" => "alert-success",
                "data" => $query,
            ];
        } else {
            $result = [
                "status" => 2,
                "messager" => "Thất bại!",
                "success" => "alert-danger",
                "data" => ''
            ];
        }
        return response()->json($result);
    }

    public function created(Request $request)
    {
        $validate = Validator::make($request->all(), [
            'name_vn' => 'required|string',
            'name_en' => 'required|string',
        ]);
        if ($validate->fails()) {
            return response()->json(['messager' => $validate->errors(), 'status' => 2, "success" => "alert-danger"]);
        }
        $data = $request->all();
        if (array_key_exists("name_vn", $data)) $data['name_vn']; else $data['name_vn'] = "";
        if (array_key_exists("name_en", $data)) $data['name_en']; else $data['name_en'] = "";
        $data['type'] = 1;
        $data['sort'] = 1;
        $insert = CongressModel::Create($data);
        if ($insert) {
            $result = ['messager' => 'Tạo thủ tục khai mạc thành công!', 'status' => 1, "success" => "alert-success"];
            return response()->json($result);
        } else {
            $result = ['messager' => 'Tạo thủ tục khai mạc thất bại', 'status' => 2, "success" => "alert-danger"];
            return response()->json($result);
        }
    }

    public function getByIdCongress(Request $request)
    {
        $validate = Validator::make($request->all(), [
            'id' => 'numeric',
        ]);
        if ($validate->fails()) {
            return response()->json(['messager' => $validate->errors(), 'status' => 2, "success" => "alert-danger"]);
        }
        $data = $request->all();
        $query = CongressModel::where('id', $data['id'])->first();
        if ($query) {
            $result = [
                "status" => 1,
                "messager" => "Thành công!",
                "success" => "alert-success",
                "data" => $query,
            ];
        } else {
            $result = [
                "status" => 2,
                "messager" => "Lỗi không lấy được thông tin!",
                "success" => "alert-danger",
                "data" => '',
            ];
        }
        return response()->json($result);
    }

    public function update(Request $request)
    {
        $validate = Validator::make($request->all(), [
            'id' => 'numeric',
            'name_vn' => 'required|string',
            'name_en' => 'required|string',
        ]);
        if ($validate->fails()) {
            return response()->json(['messager' => $validate->errors(), 'status' => 2, "success" => "alert-danger"]);
        }
        $data = $request->all();
        if (array_key_exists("id", $data)) $data['id']; else $data['id'] = "";
        if (array_key_exists("name_vn", $data)) $data['name_vn']; else $data['name_vn'] = "";
        if (array_key_exists("name_en", $data)) $data['name_en']; else $data['name_en'] = "";
        $data['type'] = 1;
        $data['sort'] = 1;

        $insert = DB::table('vote_congress_content')->where('id', $data['id'])->update($data);
        if ($insert) {
            $result = ['messager' => 'Cập nhật thủ tục khai mạc thành công!', 'status' => 1, "success" => "alert-success"];
            return response()->json($result);
        } else {
            $result = ['messager' => 'Cập nhật thủ tục khai mạc thất bại', 'status' => 2, "success" => "alert-danger"];
            return response()->json($result);
        }
    }

    public function deleteCongress(Request $request)
    {
        $validate = Validator::make($request->all(), [
            'id' => 'numeric',
        ]);
        if ($validate->fails()) {
            return response()->json(['messager' => $validate->errors(), 'status' => 2, "success" => "alert-danger"]);
        }
        $data = $request->all();
        $query = DB::table('vote_congress_content')->where(['id' => $data['id']])->delete();
        if ($query) {
            $result = [
                "status" => 1,
                "messager" => "Xóa thủ tục khai mạc thành công!",
                "success" => "alert-success",
                "data" => $query
            ];
        } else {
            $result = [
                "status" => 2,
                "messager" => "Thủ tục khai mạc không tồn tại!",
                "success" => "alert-danger",
                "data" => ''
            ];
        }
        return response()->json($result);
    }
}
