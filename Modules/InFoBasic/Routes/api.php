<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use \Modules\InfoBasic\Http\Controllers\InFoBasicController;

Route::middleware(['auth:sanctum'])->group(function () {
    Route::group(['prefix' => 'info-basic'], function (){
        Route::any('/update', [InFoBasicController::class, 'update'])->name('update'); //
        Route::any('/getById', [InFoBasicController::class, 'getById'])->name('getById'); //
        Route::any('/uploadFile', [InFoBasicController::class, 'uploadFile'])->name('uploadFile'); //
    });
});
