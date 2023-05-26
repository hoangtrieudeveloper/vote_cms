<?php

namespace Modules\Admin\Http\Controllers;

use App\Models\User;
use App\Utils;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function registerUser(Request $request)
    {
        $validate = Validator::make($request->all(), [
            'email' => 'required|string',
            'password' => 'required|string|max:32',
            'name' => 'required|string|max:255',
            'phone' => 'required|numeric|min:8',
            'id_user_created' => 'numeric',
            'role' => 'numeric',
        ]);
        if ($validate->fails()) {
            return response()->json(['messager' => $validate->errors(), 'status' => 2, "success" => "alert-danger"]);
        }
        $data = $request->all();
        $check = false;
        if (array_key_exists("email", $data)) {
            $data['email'];
            $item = User::where('email',$data['email'])->first();
            if ($item) $check = true; else $check = false;
        } else $data['email'] = "";
        if (array_key_exists("password", $data)) $data['password']; else $data['password'] = "";
        if (array_key_exists("name", $data)) $data['name']; else $data['name'] = "";
        if (array_key_exists("phone", $data)) $data['phone']; else $data['phone'] = "";
        if (array_key_exists("role", $data)) $data['role']; else $data['role'] = "";
        if (array_key_exists("id_user_created", $data)) $data['id_user_created']; else $data['id_user_created'] = "";
        if ($check) {
            $result = ['messager' => 'Tên đăng nhập đã tồn tại!', 'status' => 2, "success" => "alert-danger"];
            return response()->json($result);
        } else {
            $password = Hash::make($data['password']);
            $data['password'] = $password;
            $data['code'] = Utils::generateRandomCode(4);
            $insert = User::Create($data);
            if ($insert) {
                $result = ['messager' => 'Đăng ký tài khoản thành công!', 'status' => 1, "success" => "alert-success"];
                return response()->json($result);
            } else {
                $result = ['messager' => 'Tạo mới thất bại', 'status' => 2, "success" => "alert-danger"];
                return response()->json($result);
            }
        }
    }

    public function getListUser(Request $request)
    {
        $groupd = DB::table('user_group')->get();
        $dict = [];
        foreach ($groupd as $k => $v) {
            $dict[$v->id] = $v->group_name;
        }
        $query = User::getList();
        if ($query) {
            $result = [
                "status" => 1,
                "messager" => "Thành công!",
                "success" => "alert-success",
                "data" => $query,
                'group_name' => array_values($dict)
            ];
        } else {
            $result = [
                "status" => 2,
                "messager" => "Tài khoản không tồn tại!",
                "success" => "alert-danger",
                "data" => '',
                "group_name" => ''
            ];
        }
        return response()->json($result);
    }

    public function deleteUser(Request $request)
    {
        $validate = Validator::make($request->all(), [
            'id' => 'numeric',
        ]);
        if ($validate->fails()) {
            return response()->json(['messager' => $validate->errors(), 'status' => 2, "success" => "alert-danger"]);
        }
        $data = $request->all();
        $query = DB::table('users')->where(['id' => $data['id']])->delete();
        if ($query) {
            $result = [
                "status" => 1,
                "messager" => "Xóa tài khoản thành công!",
                "success" => "alert-success",
                "data" => $query
            ];
        } else {
            $result = [
                "status" => 2,
                "messager" => "Tài khoản không tồn tại!",
                "success" => "alert-danger",
                "data" => ''
            ];
        }
        return response()->json($result);
    }

    public function getByIdUser(Request $request)
    {
        $validate = Validator::make($request->all(), [
            'id' => 'numeric',
        ]);
        if ($validate->fails()) {
            return response()->json(['messager' => $validate->errors(), 'status' => 2, "success" => "alert-danger"]);
        }
        $data = $request->all();
        $groupd = DB::table('user_group')->get();
        $query = User::where('id',$data['id'])->first();
        if ($query) {
            $result = [
                "status" => 1,
                "messager" => "Thành công!",
                "success" => "alert-success",
                "data" => $query,
                "group" => $groupd
            ];
        } else {
            $result = [
                "status" => 2,
                "messager" => "Lỗi không lấy được thông tin!",
                "success" => "alert-danger",
                "data" => '',
                "group" => ''
            ];
        }
        return response()->json($result);
    }

    public function updateUser(Request $request)
    {
        $validate = Validator::make($request->all(), [
            'id' => 'numeric',
            'email' => 'required|string',
            'password' => 'max:32',
            'name' => 'required|string|max:255',
            'phone' => 'required|numeric|min:8',
            'role' => 'numeric'
        ]);
        if ($validate->fails()) {
            return response()->json(['messager' => $validate->errors(), 'status' => 2, "success" => "alert-danger"]);
        }
        $data = $request->all();
        if (array_key_exists("id", $data)) $data['id']; else $data['id'] = "";
        if (array_key_exists("name", $data)) $data['name']; else $data['name'] = "";
        if (array_key_exists("email", $data)) $data['email']; else $data['email'] = "";
        if (array_key_exists("password", $data)) $data['password']; else $data['password'] = "";
        if (array_key_exists("phone", $data)) $data['phone']; else $data['phone'] = "";
        if (array_key_exists("role", $data)) $data['role']; else $data['role'] = "";
        $update = [
            'name' => $data['name'],
            'email' => $data['email'],
            'phone_number' => $data['phone'],
            'group_scope' => $data['role'],
            'updated_at' => date("Y-m-d H:i:s"),
        ];
        if ($data['password']) $update['mat_khau'] = Hash::make($data['password']);
        $result = DB::table('users')->where('id', $data['id'])->update($update);
        if ($result) {
            $result = [
                "status" => 1,
                "messager" => "Cập nhật tài khoản thành công!",
                "success" => "alert-success",
                "data" => ''
            ];
        } else {
            $result = [
                "status" => 2,
                "messager" => "Lỗi không cập nhật được tài khoản!",
                "success" => "alert-danger",
                "data" => ''
            ];
        }
        return response()->json($result);
    }
    public function isChangeStatus(Request $request)
    {
        $validate = Validator::make($request->all(), [
            'id' => 'numeric',
            'trang_thai' => 'numeric',
        ]);
        if ($validate->fails()) {
            return response()->json(['messager' => $validate->errors(), 'status' => 2, "success" => "alert-danger"]);
        }
        $data = $request->all();
        if (array_key_exists("id", $data) && array_key_exists("trang_thai", $data)) {
            $user = DB::table('users')->where('id', $data['id'])
                ->update(['trang_thai' => $data['trang_thai']]);
            if ($user) {
                $result = [
                    "status" => 1,
                    "messager" => "Cập nhật trạng thái thành công!",
                    "success" => "alert-success",
                    "data" => ''
                ];
            } else {
                $result = [
                    "status" => 2,
                    "messager" => "Lỗi không cập nhật được trạng thái!",
                    "success" => "alert-danger",
                    "data" => ''
                ];
            }
        } else {
            $result = [
                "status" => 2,
                "messager" => "Lỗi không tồn tại id hoặc trạng thái!",
                "success" => "alert-success",
                "data" => ''
            ];
        }
        return response()->json($result);
    }

    public function uploadFile(Request $request)
    {
        $url = Utils::post_file_key('file');
        $url = substr($url, 1);
        return response()->json($url);
    }
}
