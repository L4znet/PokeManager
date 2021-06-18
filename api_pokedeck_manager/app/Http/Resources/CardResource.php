<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CardResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
     return [
         'id' => $this->id,
         'deck_id' => $this->deck_id,
         'card_name' => $this->card_name,
         'card_quantity' => $this->card_quantity
     ];
    }
}
