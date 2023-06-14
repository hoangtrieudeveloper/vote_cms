<?php

use Illuminate\Http\Request;
use Modules\Authority\Http\Controllers\AuthorityController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware(['auth:sanctum'])->group(function () {
    Route::group(['prefix' => 'authority'], function () {
        Route::any('/getList', [AuthorityController::class, 'getList'])->name('getList');
        Route::any('/created', [AuthorityController::class, 'created'])->name('created');
        Route::any('/getListById', [AuthorityController::class, 'getListById'])->name('getListById');
        Route::any('/edit', [AuthorityController::class, 'edit'])->name('edit');
        Route::any('/getUserAuthorByShareHolder', [AuthorityController::class, 'getUserAuthorByShareHolder'])->name('getUserAuthorByShareHolder');
        Route::any('/getAllUserShareHolder', [AuthorityController::class, 'getAllUserShareHolder'])->name('getAllUserShareHolder');
        Route::any('/getListById', [AuthorityController::class, 'getListById'])->name('getListById'); //
        Route::any('/getAuthor', [AuthorityController::class, 'getAuthor'])->name('getAuthor'); //
        Route::any('/getByIdAuthor', [AuthorityController::class, 'getByIdAuthor'])->name('getByIdAuthor'); //
        Route::any('/addShare', [AuthorityController::class, 'addShare'])->name('addShare'); //


        Route::any('/getListAuthor', [AuthorityController::class, 'getListAuthor'])->name('getListAuthor'); //
        Route::any('/downloadUyQuyenDemo', [AuthorityController::class, 'downloadUyQuyenDemo'])->name('downloadUyQuyenDemo'); //
        Route::any('/importAuthorHolder', [AuthorityController::class, 'importAuthorHolder'])->name('importAuthorHolder'); //
        Route::any('/downloadFileExcel', [AuthorityController::class, 'downloadFileExcel'])->name('downloadFileExcel'); //
        Route::any('/changeStatusAuthor', [AuthorityController::class, 'changeStatusAuthor'])->name('changeStatusAuthor'); //
        Route::any('/getAddressById', [AuthorityController::class, 'getAddressById'])->name('getAddressById'); //
        Route::any('/updateAddress', [AuthorityController::class, 'updateAddress'])->name('updateAddress'); //
        Route::any('/getAllUserAuthor', [AuthorityController::class, 'getAllUserAuthor'])->name('getAllUserAuthor'); //
        Route::any('/downloadFilePDF', [AuthorityController::class, 'downloadFilePDF'])->name('downloadFilePDF'); //
    });
});
