<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Card extends Model
{
    use HasFactory;

    protected $fillable = ['id', 'deck_id', 'card_name', 'card_quantity', 'card_picture'];

    protected $keyType = 'string';

    public $incrementing = false;
}
