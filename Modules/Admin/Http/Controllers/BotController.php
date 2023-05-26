<?php

namespace Modules\Admin\Http\Controllers;

use App\Models\Bot;
use App\Utils;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Validator;

class BotController extends Controller
{
    public function deleteBot(Request $request)
    {
        $validate = Validator::make($request->all(), [
            'id' => 'numeric',
        ]);
        if ($validate->fails()) {
            return response()->json(['messager' => $validate->errors(), 'status' => 2, "success" => "alert-danger"]);
        }
        $data = $request->all();
        $query = DB::table('bot')->where(['id' => $data['id']])->delete();
        if ($query) {
            $result = [
                "status" => 1,
                "messager" => "Xóa Bot thành công!",
                "success" => "alert-success",
                "data" => $query
            ];
        } else {
            $result = [
                "status" => 2,
                "messager" => "Bot không tồn tại!",
                "success" => "alert-danger",
                "data" => ''
            ];
        }
        return response()->json($result);
    }

    public function registerBot(Request $request)
    {
        $validate = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'id_user_created' => 'numeric',
        ]);
        if ($validate->fails()) {
            return response()->json(['messager' => $validate->errors(), 'status' => 2, "success" => "alert-danger"]);
        }
        $data = $request->all();
        if (array_key_exists("age", $data)) {
            $data['age'];
        } else $data['age'] = "";
        if (array_key_exists("name", $data)) $data['name']; else $data['name'] = "";
        if (array_key_exists("national", $data)) $data['national']; else $data['national'] = "";
        if (array_key_exists("height", $data)) $data['height']; else $data['height'] = "";
        if (array_key_exists("weight", $data)) $data['weight']; else $data['weight'] = "";
        if (array_key_exists("id_user_created", $data)) $data['id_user_created']; else $data['id_user_created'] = "";
        if (array_key_exists("gender", $data)) $data['gender']; else $data['gender'] = "";
        if (array_key_exists("status", $data)) $data['status']; else $data['status'] = "";
        if (array_key_exists("description", $data)) $data['description']; else $data['description'] = "";
        if (array_key_exists("image", $data)) $data['image']; else $data['image'] = [];
        if (array_key_exists("avatar", $data)) $data['avatar']; else $data['avatar'] = [];
        $data['code'] = Utils::generateRandomCode(6);
        $insert = Bot::CreatedBot($data);
        if ($insert) {
            $result = ['messager' => 'Tạo mới Bot thành công!', 'status' => 1, "success" => "alert-success"];
            return response()->json($result);
        } else {
            $result = ['messager' => 'Tạo mới Bot thất bại', 'status' => 2, "success" => "alert-danger"];
            return response()->json($result);
        }
    }

    public function getByIdBot(Request $request)
    {
        $validate = Validator::make($request->all(), [
            'id' => 'numeric',
        ]);
        if ($validate->fails()) {
            return response()->json(['messager' => $validate->errors(), 'status' => 2, "success" => "alert-danger"]);
        }
        $data = $request->all();
        $query = DB::table('bot')->where('id', $data['id'])->first();
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
                "messager" => "Lỗi không lấy được thông tin Bot!",
                "success" => "alert-danger",
                "data" => ''
            ];
        }
        return response()->json($result);
    }

    public function updateBot(Request $request)
    {
        $validate = Validator::make($request->all(), [
            'id' => 'numeric',
            'name' => 'required|string|max:255',
        ]);
        if ($validate->fails()) {
            return response()->json(['messager' => $validate->errors(), 'status' => 2, "success" => "alert-danger"]);
        }
        $data = $request->all();
        if (array_key_exists("age", $data)) {
            $data['age'];
        } else $data['age'] = "";
        if (array_key_exists("name", $data)) $data['name']; else $data['name'] = "";
        if (array_key_exists("national", $data)) $data['national']; else $data['national'] = "";
        if (array_key_exists("height", $data)) $data['height']; else $data['height'] = "";
        if (array_key_exists("weight", $data)) $data['weight']; else $data['weight'] = "";
        if (array_key_exists("gender", $data)) $data['gender']; else $data['gender'] = "";
        if (array_key_exists("status", $data)) $data['status']; else $data['status'] = "";
        if (array_key_exists("description", $data)) $data['description']; else $data['description'] = "";
        if (array_key_exists("image", $data)) $data['image']; else $data['image'] = "";
        if (array_key_exists("avatar", $data)) $data['avatar']; else $data['avatar'] = "";
        $insert = Bot::updateBot($data);
        if ($insert) {
            $result = [
                "status" => 1,
                "messager" => "Cập nhật Bot thành công!",
                "success" => "alert-success",
                "data" => ''
            ];
        } else {
            $result = [
                "status" => 2,
                "messager" => "Lỗi không cập nhật được Bot!",
                "success" => "alert-danger",
                "data" => ''
            ];
        }
        return response()->json($result);
    }

    public function getListBot(Request $request)
    {
        $data = $request->all();
        $datawhere = [];
        if ($data['name'] != "") {
            $datawhere[] = ['bot.name', "like", "%" . $data['name'] . "%"];
        }
        if ($data['id'] != "") {
            $datawhere[] = ['bot.id_user_created', "=", $data['id']];
        }
        $query = DB::table('bot')
            ->leftJoin('users', 'users.id', '=', 'bot.id_user_created')
            ->where($datawhere)
            ->orderBy('bot.id', 'desc')
            ->select('bot.*', 'users.name as full_name')
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

    public function getListChat(Request $request)
    {
        $data = $request->all();
        $query = DB::connection('mongodb')->collection('conversions')->where(['id_created' => intval($data['id'])])->orderBy('_id', 'desc')->get();
        if ($query) {
            $array = [];
            foreach ($query as $k => $v) {
                $v['_id'] = (string)$v['_id'];
                $v['updatedAt'] = date('d-m-Y H:i:s', (string)$v['updatedAt'] / 1000);
                array_push($array,$v);
            }
            usort($array, function ($a, $b) {
                return strtotime($b['updatedAt']) - strtotime($a['updatedAt']);
            });
            $result = [
                "status" => 1,
                "messager" => "Thành công!",
                "success" => "alert-success",
                "data" => $array,
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

    public function getDetailChat(Request $request)
    {
        $data = $request->all();
        $query = DB::connection('mongodb')->collection('chats')->where(['conversionId' => $data['id']])->get();
        if ($query) {
            $array = [];
            foreach ($query as $k => $v) {
                $v['_id'] = (string)$v['_id'];
                $v['time'] = date('d-m-Y H:i:s', (string)$v['time'] / 1000);
                array_push($array, $v);
            }
            $result = [
                "status" => 1,
                "messager" => "Thành công!",
                "success" => "alert-success",
                "data" => $array,
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

}
