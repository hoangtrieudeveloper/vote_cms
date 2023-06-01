<?php
use Illuminate\Support\Facades\Route;
use \Modules\Congress\Http\Controllers\CongressController;
use \Modules\Congress\Http\Controllers\BcReportController;
use \Modules\Congress\Http\Controllers\ProcedureController;
use \Modules\Congress\Http\Controllers\CongressDocumentController;


Route::middleware(['auth:sanctum'])->group(function () {
    //Congress
    Route::group(['prefix' => 'congress'], function (){
        Route::any('/getList', [CongressController::class, 'getList'])->name('getList'); //
        Route::any('/created', [CongressController::class, 'created'])->name('created'); //
        Route::any('/update', [CongressController::class, 'update'])->name('update'); //
        Route::any('/delete', [CongressController::class, 'delete'])->name('delete'); //
        Route::any('/getById', [CongressController::class, 'getById'])->name('getById'); //
        Route::any('/uploadFile', [CongressController::class, 'uploadFile'])->name('uploadFile'); //
    });

    Route::group(['prefix' => 'bc-report'], function (){
        Route::any('/getList', [BcReportController::class, 'getList'])->name('getList'); //
        Route::any('/created', [BcReportController::class, 'created'])->name('created'); //
        Route::any('/update', [BcReportController::class, 'update'])->name('update'); //
        Route::any('/delete', [BcReportController::class, 'delete'])->name('delete'); //
        Route::any('/getById', [BcReportController::class, 'getById'])->name('getById'); //
        Route::any('/uploadFile', [BcReportController::class, 'uploadFile'])->name('uploadFile'); //
    });

    Route::group(['prefix' => 'procedure'], function (){
        Route::any('/getList', [ProcedureController::class, 'getList'])->name('getList'); //
        Route::any('/created', [ProcedureController::class, 'created'])->name('created'); //
        Route::any('/update', [ProcedureController::class, 'update'])->name('update'); //
        Route::any('/delete', [ProcedureController::class, 'delete'])->name('delete'); //
        Route::any('/getById', [ProcedureController::class, 'getById'])->name('getById'); //
        Route::any('/uploadFile', [ProcedureController::class, 'uploadFile'])->name('uploadFile'); //
    });

    Route::group(['prefix' => 'congress-document'], function (){
        Route::any('/getList', [CongressDocumentController::class, 'getList'])->name('getList'); //
        Route::any('/created', [CongressDocumentController::class, 'created'])->name('created'); //
        Route::any('/update', [CongressDocumentController::class, 'update'])->name('update'); //
        Route::any('/delete', [CongressDocumentController::class, 'delete'])->name('delete'); //
        Route::any('/getById', [CongressDocumentController::class, 'getById'])->name('getById'); //
        Route::any('/uploadFile', [CongressDocumentController::class, 'uploadFile'])->name('uploadFile'); //
    });

    Route::group(['prefix' => 'vote-result-docx'], function (){
        Route::any('/downloadDocs', [CongressController::class, 'getListDocs'])->name('downloadDocs'); //
    });
});
