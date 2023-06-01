<?php
use Illuminate\Support\Facades\Route;
use \Modules\Admin\Http\Controllers\AuthController;
use \Modules\Admin\Http\Controllers\UserController;
use \Modules\Admin\Http\Controllers\BotController;
use \Modules\Admin\Http\Controllers\GroupUserController;


Route::post('/login-api', [AuthController::class, 'login'])->name('login'); // Đăng nhập url
Route::middleware(['auth:sanctum'])->group(function () {
    Route::any('/uploadFile', [UserController::class, 'uploadFile'])->name('upload-file'); // Upload File
    Route::any('/getInfo', [AuthController::class, 'getInfo'])->name('get-info'); // lấy thông tin user
    Route::any('/logout', [AuthController::class, 'logout'])->name('logout'); // Thoat phien dang nhap

    //nhân viên
    Route::any('/getListUser', [UserController::class, 'getListUser'])->name('list-user'); // Danh sách nhân viên
    Route::any('/deleteUser', [UserController::class, 'deleteUser'])->name('delete-user'); // Xóa nhân viên
    Route::any('/registerUser', [UserController::class, 'registerUser'])->name('created-user'); // tạo nhân viên
    Route::any('/getByIdUser', [UserController::class, 'getByIdUser'])->name('get-info-user'); // tạo nhân viên
    Route::any('/updateUser', [UserController::class, 'updateUser'])->name('update-user'); // tạo nhân viên
    Route::any('/isChangeStatus', [UserController::class, 'isChangeStatus'])->name('change-status-user'); // cập nhật trạng thái nhân viên
    Route::any('/change-password', [UserController::class, 'ChangePass'])->name('change-password'); // đổi mật khẩu
    Route::any('/update-profile', [UserController::class, 'updateProfile'])->name('update-profile'); // đổi mật khẩu

    //group role user
    Route::any('/getListGroup', [GroupUserController::class, 'getListGroup'])->name('get-list-group-role'); // Danh sách nhóm quyền
    Route::any('/getListGroupCreated', [GroupUserController::class, 'getListGroupCreated'])->name('get-list-group-create-role'); // Danh sách nhóm quyền-khoi-tao
    Route::any('/deleteGroupUser', [GroupUserController::class, 'deleteGroupUser'])->name('delete-group-role'); // xóa nhóm quyền
    Route::any('/createGroupUser', [GroupUserController::class, 'createGroupUser'])->name('created-group-role'); // khởi tạo nhóm quyền
    Route::any('/getByIdGroupUser', [GroupUserController::class, 'getByIdGroupUser'])->name('get-byid-group-role'); // lấy dữ liệu nhóm quyền
    Route::any('/updateGroupUser', [GroupUserController::class, 'updateGroupUser'])->name('update-group-role'); // cập nhật liệu nhóm quyền
    Route::any('/getListGroupRole', [GroupUserController::class, 'getListGroupRole'])->name('get-list-group-role'); // lấy dữ liệu nhóm quyền
});
