<?php

namespace Modules\Authority\Http\Controllers;

use App\Models\UserShareAuthor;
use App\Models\UserShareholder;
use App\Utils;
use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthorityController extends Controller
{
    private $userShareHolder;
    private $userShareAuthor;

    public function __construct(UserShareholder $userShareholder,UserShareAuthor $userShareAuthor)
    {
        $this->userShareHolder = $userShareholder;
        $this->userShareAuthor = $userShareAuthor;
    }

    public function addShare(Request $request)
    {
        try {
            $validate = Validator::make($request->all(), [
                'name' => 'required',
                'cccd' => 'required',
                'password' => 'required',
            ]);
            if ($validate->fails()) {
                return response()->json(Utils::messegerAlert(2, "alert-danger", $validate->errors()));
            }
            $data = $request->all();
            $this->userShareAuthor->add($data);
            $result = Utils::messegerAlert(1, "alert-success", 'Thêm mới thành công!');
        } catch (\Exception $exception) {
            $result = Utils::messegerAlert(2, "alert-danger", 'Thêm mới thất bại!',);
        }
        return $result;
    }

    public function getByIdAuthor(Request $request)
    {
        try {
            $query =  $this->userShareHolder->where('id',$request->id)->first();
            $result = Utils::messegerAlert(1, "alert-success", 'Thành công!', $query);
        } catch (\Exception $exception) {
            $result = Utils::messegerAlert(2, "alert-danger", 'Lỗi không lấy được thông tin!',);
        }
        return response()->json($result);
    }

    public function getAuthor()
    {
        try {
            $query = $this->userShareHolder->getAuthor();
            $result = Utils::messegerAlert(1, "alert-success", 'Thành công!', $query);
        } catch (\Exception $exception) {
            $result = Utils::messegerAlert(2, "alert-danger", 'Lỗi không lấy được thông tin!',);
        }
        return response()->json($result);
    }

    public function getAllUserShareHolder(Request $request)
    {
        try {
            $userId = Auth::id();
            $query = $this->userShareHolder->getAllShareHolder($request->nameSearch);
            $result = Utils::messegerAlert(1, "alert-success", 'Thành công!', $query);
        } catch (\Exception $exception) {
            $result = Utils::messegerAlert(2, "alert-danger", 'Lỗi không lấy được thông tin!',);
        }
        return response()->json($result);
    }

    public function getList(Request $request)
    {
        try {
            $nameSearch = $request->nameSearch;
            $data = $this->userShareHolder->getAuthority($nameSearch);
            $result = Utils::messegerAlert(1, "alert-success", 'Thành công!', $data);
        } catch (\Exception $exception) {
            $result = Utils::messegerAlert(2, "alert-danger", 'Thất bại!',);
        }
        return $result;
    }

    public function created(Request $request)
    {
        try {
            $validate = Validator::make($request->all(), [
                'name' => 'required',
                'cccd' => 'required',
                'password' => 'required',
            ]);
            if ($validate->fails()) {
                return response()->json(Utils::messegerAlert(2, "alert-danger", $validate->errors()));
            }
            $data = $request->all();
            $this->userShareHolder->add($data);
            $result = Utils::messegerAlert(1, "alert-success", 'Thêm mới thành công!');
        } catch (\Exception $exception) {
            $result = Utils::messegerAlert(2, "alert-danger", 'Thêm mới thất bại!',);
        }
        return $result;
    }

    public function getListById(Request $request)
    {
        try {
            $query = $this->userShareHolder->getListById($request->id);
            $result = Utils::messegerAlert(1, "alert-success", 'Thành công!', $query);
        } catch (\Exception $exception) {
            $result = Utils::messegerAlert(2, "alert-danger", 'Lỗi không lấy được thông tin!',);
        }
        return response()->json($result);
    }

    public function getUserAuthorByShareHolder(Request $request)
    {
        try {
            $query = $this->userShareHolder->getUserAuthorByShareHolder($request->id);
            $result = Utils::messegerAlert(1, "alert-success", 'Thành công!', $query);
        } catch (\Exception $exception) {
            $result = Utils::messegerAlert(2, "alert-danger", 'Lỗi không lấy được thông tin!',);
        }
        return response()->json($result);
    }

}
