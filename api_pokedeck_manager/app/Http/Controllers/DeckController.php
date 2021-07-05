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

        return response()->json(Deck::create([
            'deck_name' => $data['deck_name'],
            'deck_emoji' => $data['deck_emoji']
        ]));
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        return response()->json(Deck::with('cards')->find($id));
    }

    /**
     * For update isCompleted's deck field
     *
     * @param Request $request
     * @param $id
     *
     */
    public function update_completed_state(Request $request, $id)
    {

        $data = $request->validate([
            'is_complete' => 'required|boolean',
        ]);

        return response()->json(Deck::where('id', '=', $id)->update(['is_complete' => $data['is_complete']]));
    }

    public function update_deck_emoji(Request $request, $id){
        $data = $request->validate([
            'deck_emoji' => 'required',
        ]);

        return response()->json(Deck::where('id', '=', $id)->update(['deck_emoji' => $data['deck_emoji']]));
    }

    public function update_deck_name(Request $request, $id){
        $data = $request->validate([
            'deck_name' => 'required',
        ]);

        return response()->json(Deck::where('id', '=', $id)->update(['deck_name' => $data['deck_name']]));
    }
}
