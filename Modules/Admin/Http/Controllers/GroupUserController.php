<?php

namespace Modules\Admin\Http\Controllers;

use App\Scopes;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Validator;

class GroupUserController extends Controller
{
    public function getListGroup(Request $request)
    {
        $query = DB::table('user_group')->get();
        if ($query) {
            $result = [
                "status" => 1,
                "messager" => "Thành công!",
                "success" => "alert-success",
                "data" => $query
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

    public function getListGroupCreated(Request $request)
    {

        $query = Scopes::getTree();
        if ($query) {
            $result = [
                "status" => 1,
                "messager" => "Thành công!",
                "success" => "alert-success",
                "data" => $query
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

    public function createGroupUser(Request $request)
    {
        $data = $request->all();
        $query = DB::table('user_group')->insert([
            'group_name' => $data['name'],
            'group_roles' => implode('|', $data['scope'])
        ]);
        if ($query) {
            $result = [
                "status" => 1,
                "messager" => "Tạo mới thành công!",
                "success" => "alert-success",
            ];
        } else {
            $result = [
                "status" => 2,
                "messager" => "Tạo mới thất bại!",
                "success" => "alert-danger",
            ];
        }
        return response()->json($result);
    }

    public function getByIdGroupUser(Request $request)
    {
        $res = array();
        $res['scopes'] = Scopes::getTree();
        $res['group'] = DB::table('user_group')->where('id', '=', $request->id)->first();
        $res['curent'] = explode('|', $res['group']->group_roles);
        $result = [
            "status" => 1,
            "messager" => "Tạo mới thành công!",
            "success" => "alert-success",
            "data" => $res
        ];
        return response()->json($result);
    }

    public function updateGroupUser(Request $request){
        $data = $request->all();
        $query = DB::table('user_group')
            ->where('id',  $data['id'])
            ->update([
                'group_name' => $data['name'],
                'group_roles' => implode('|', $data['scope'])
            ]);
        if ($query) {
            $result = [
                "status" => 1,
                "messager" => "Cập nhật thành công!",
                "success" => "alert-success",
            ];
        } else {
            $result = [
                "status" => 2,
                "messager" => "Cập nhật thất bại!",
                "success" => "alert-danger",
            ];
        }
        return response()->json($result);
    }

    public function deleteGroupUser(Request $request)
    {
        $validate = Validator::make($request->all(), [
            'id' => 'numeric',
        ]);
        if ($validate->fails()) {
            return response()->json(['messager' => $validate->errors(), 'status' => 2, "success" => "alert-danger"]);
        }
        $data = $request->all();
        $query = DB::table('user_group')->where(['id' => $data['id']])->delete();
        if ($query) {
            $result = [
                "status" => 1,
                "messager" => "Xóa nhóm quyền thành công!",
                "success" => "alert-success",
                "data" => $query
            ];
        } else {
            $result = [
                "status" => 2,
                "messager" => "Nhóm quyền không tồn tại!",
                "success" => "alert-danger",
                "data" => ''
            ];
        }
        return response()->json($result);
    }

    public function getListGroupRole(Request $request)
    {
        $groupd = DB::table('user_group')->get();
        if ($groupd) {
            $result = [
                "status" => 1,
                "messager" => "Thành công!",
                "success" => "alert-success",
                "data" => $groupd,
            ];
        } else {
            $result = [
                "status" => 2,
                "messager" => "Lỗi!",
                "success" => "alert-danger",
                "data" => '',
                "group_name" => ''
            ];
        }
        return response()->json($result);
    }
}
