<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Modules\Shareholder\Http\Controllers\ShareholderController;

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
    Route::group(['prefix' => 'shareholder'], function () {
        Route::any('/updateBlock', [ShareholderController::class, 'updateBlock'])->name('updateBlock'); //bc-tờ trình
        Route::any('/getListReport', [ShareholderController::class, 'getListReport'])->name('getListReport'); //bc-tờ trình
        Route::any('/getList', [ShareholderController::class, 'getList'])->name('getList'); //get list data
        Route::any('/getListType', [ShareholderController::class, 'getListType'])->name('getListType'); //
        Route::any('/getListOrganization', [ShareholderController::class, 'getListOrganization'])->name('getListOrganization'); //
        Route::any('/importShareHolder', [ShareholderController::class, 'importCoDong'])->name('importShareHolder'); //
    });
});
