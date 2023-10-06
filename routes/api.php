<?php

use App\Http\Controllers\AuthenticationController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

//Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//    return $request->user();
//});

Route::controller(AuthenticationController::class)->group(function(){
    Route::post('login','loginUser');
    Route::post('register','registerUser');
    Route::group(['middleware' => 'auth:sanctum'],function(){
        Route::get('user','userDetails');
        Route::post('logout','logout');
    });
});

Route::middleware('auth:sanctum')->group(function(){
    Route::apiResource('users', UserController::class);
});


