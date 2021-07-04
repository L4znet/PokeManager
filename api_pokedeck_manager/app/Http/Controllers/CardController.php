<?php

namespace App\Http\Controllers;

use App\Http\Resources\CardResource;
use App\Models\Card;
use Illuminate\Http\Request;

class CardController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index()
    {
        return CardResource::collection(Card::paginate(10));
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'id' => 'required',
            'deck_id' => 'required|integer|exists:decks,id',
            'card_name' => 'required',
            'card_picture' => 'required',
            'card_quantity' => 'required',
        ]);

      return response()->json(Card::updateOrCreate(
            ['id' => $data['id'], 'deck_id' => $data['deck_id']],
            ['card_name' => $data['card_name'], 'card_picture' => $data['card_picture'], 'card_quantity' => $data['card_quantity']]));

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }


    /**
     * For decrement the specified card's quantity
     *
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     *
     */
    public function decrement_card_quantity($id)
    {

       return response()->json(Card::where('id', '=', $id)->decrement('card_quantity'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        return response()->json(Card::where('id', '=', $id)->delete());
    }
}
