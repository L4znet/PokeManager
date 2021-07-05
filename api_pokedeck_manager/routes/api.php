<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DeckController;
use App\Http\Controllers\CardController;

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

Route::patch('/deck/{deck}/completed', [DeckController::class, 'update_completed_state']);
Route::patch('/deck/{deck}/update', [DeckController::class, 'update_deck_value']);
Route::apiResource('deck', DeckController::class);

Route::patch('/card/{card}/decrement', [CardController::class, 'decrement_card_quantity']);
Route::apiResource('card', CardController::class);


