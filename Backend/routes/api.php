<?php

use App\Http\Controllers\ProductController;
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


Route::get('/products',[ProductController::class,'index']);
Route::post('/products/create',[ProductController::class,'store']);
Route::put('products/{id}', [ProductController::class, 'update']);
Route::get('products/{id}',[ProductController::class,'show']);
