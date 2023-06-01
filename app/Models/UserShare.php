<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserShare extends Model
{
    use HasFactory;

    protected $table = "user_shares";
    protected $fillable = ['id', 'total', 'user_id', 'created_at', 'updated_at'];
}
