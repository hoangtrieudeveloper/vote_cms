<?php

namespace Modules\Authority\Http\Controllers;

use App\Models\UserShareAuthor;
use App\Models\UserShareholder;
use App\Utils;
use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;

class AuthorityController extends Controller
{
    private $userShareHolder;

    public function __construct(UserShareholder $userShareholder)
    {
        $this->userShareHolder = $userShareholder;
    }

    public function getAllUserShareHolder(Request $request){
        try {
            $userId = Auth::id();
            $query = $this->userShareHolder->getAllShareHolder($request->nameSearch);
            $result = Utils::messegerAlert(1, "alert-success", 'Thành công!', $query);
        } catch (\Exception $exception) {
            $result = Utils::messegerAlert(2, "alert-danger", 'Lỗi không lấy được thông tin!',);
        }
        return response()->json($result);
   }

   public function getListById(Request $request){
       try {
           $query = $this->userShareHolder->getListById($request->id);
           $result = Utils::messegerAlert(1, "alert-success", 'Thành công!', $query);
       } catch (\Exception $exception) {
           $result = Utils::messegerAlert(2, "alert-danger", 'Lỗi không lấy được thông tin!',);
       }
       return response()->json($result);
   }

   public function getUserAuthorByShareHolder(Request $request){
       try {
           $query = $this->userShareHolder->getUserAuthorByShareHolder($request->id);
           $result = Utils::messegerAlert(1, "alert-success", 'Thành công!', $query);
       } catch (\Exception $exception) {
           $result = Utils::messegerAlert(2, "alert-danger", 'Lỗi không lấy được thông tin!',);
       }
       return response()->json($result);
   }

}
