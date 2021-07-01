<?php

namespace App\Http\Controllers;

use App\Http\Resources\DeckResource;
use App\Models\Card;
use App\Models\Deck;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class DeckController extends Controller
{


    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index()
    {
        return DeckResource::collection(Deck::paginate(10));
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
           'deck_name' => 'required',
            'deck_emoji' => 'required'
        ]);

        return response()->json(Deck::updateOrCreate(
            ['deck_name' => $data['deck_name']],
            ['deck_name' => $data['deck_name'], 'deck_emoji' => $data['deck_emoji']]));
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {

        return response()->json(Deck::find($id)->cards);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
