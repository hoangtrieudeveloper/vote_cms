<?php

namespace Modules\Admin\Http\Controllers;

use App\Models\User;
use App\Utils;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $validate = Validator::make($request->all(), [
            'email' => 'required|string',
            'password' => 'required|string|max:32',
        ]);
        if ($validate->fails()) {
            return response()->json(['messager' => $validate->errors(), 'status' => 2, "success" => "alert-danger"]);
        }
        $data = $request->all();
        if (array_key_exists("email", $data)) {
            if ($data['email']) {
                $result = User::where(['email' => $data['email'], 'type' => 1])->first();
                if (!empty($result->id)) {
                    if (Hash::check($data['password'], $result->password)) {
                        $token = $result->createToken('auth_token')->plainTextToken;
                        if (!is_string($token)) response()->json(['success' => false, 'data' => 'Token generation failed'], 201);
                        $numberToken = explode('|', $token);
                        DB::table('personal_access_tokens')->where('id', $numberToken[0])->update(['time_used' => date("Y-m-d H:i:s")]);
                        DB::table('users')->where('id', $result->id)->update(['remember_token' => $token]);
                        $result->remember_token = $token;
                        $scopes_query = DB::table('user_group')->where('id', $result->group_scope)->first()->group_roles;
                        $scopes = explode('|', $scopes_query);
                        $result->scopes = $scopes;
                        $result_object = ['status' => 1, 'data' => $result, 'message' => 'Thành công!', "success" => "alert-success"];
                    } else {
                        $result_object = ['messager' => 'Tài khoản hoặc mật khẩu hiện tại không đúng', 'status' => 2, "success" => "alert-danger"];
                    }
                } else {
                    $result_object = ['messager' => 'Tài khoản hoặc mật khẩu hiện tại không đúng', 'status' => 2, "success" => "alert-danger"];
                }
            }
        }
        return response()->json($result_object);
    }

    public function getInfo(Request $request)
    {
        $auth = $request->bearerToken();
        $numberToken = explode('|', $auth);
        $data = $request->all();
        $query = User::where(['id' => $data['id'], 'remember_token' => $auth])->first();
        $token_access = DB::table('personal_access_tokens')->where('id', $numberToken[0])->first();
        $delta = (strtotime(date("Y-m-d H:i:s")) - strtotime($token_access->time_used)) / 60;
        if ((int)$delta < 120) {
            DB::table('personal_access_tokens')->where('id', $numberToken[0])->update(['time_used' => date("Y-m-d H:i:s")]);
            $scopes_query = DB::table('user_group')->where('id', $query->group_scope)->first()->group_roles;
            $scopes = explode('|', $scopes_query);
            $query->scopes = $scopes;
            if ($query) {
                $result = [
                    "status" => 1,
                    "messager" => "Lấy thông tin thành công!",
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
        } else {
            $result = [
                "status" => 2,
                "messager" => "Tài khoản đã hết phiên làm việc,vui lòng đăng nhập lại!",
                "success" => "alert-danger",
                "data" => ''
            ];
            DB::table('personal_access_tokens')->where('id', $numberToken[0])->delete();
        }
        return response()->json($result);
    }

    public function logout(Request $request)
    {
        $auth = $request->bearerToken();
        $numberToken = explode('|', $auth);
        $query = DB::table('personal_access_tokens')->where('id', $numberToken[0])->delete();
        if ($query) {
            $result = [
                "status" => 1,
                "messager" => "Xóa JWT thành công!",
                "success" => "alert-success",
            ];
        } else {
            $result = [
                "status" => 2,
                "messager" => "Không tồn tại JWT!",
                "success" => "alert-danger",
            ];
        }
        return response()->json($result);
    }
}
