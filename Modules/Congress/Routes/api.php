<?php
use Illuminate\Support\Facades\Route;
use \Modules\Congress\Http\Controllers\CongressController;


Route::middleware(['auth:sanctum'])->group(function () {
    //Congress
    Route::group(['prefix' => 'congress'], function (){
        Route::any('/getList', [CongressController::class, 'getList'])->name('getList'); //
        Route::any('/created', [CongressController::class, 'created'])->name('created'); //
        Route::any('/update', [CongressController::class, 'update'])->name('update'); //
        Route::any('/deleteCongress', [CongressController::class, 'deleteCongress'])->name('deleteCongress'); //
        Route::any('/getByIdCongress', [CongressController::class, 'getByIdCongress'])->name('getByIdCongress'); //
    });
});
