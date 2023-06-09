<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserShareAuthor extends Model
{
    use HasFactory;

    public $timestamps;
    protected $table = "user_shares_author";
    protected $fillable = ['id', 'id_shareholder', 'id_author','total_authority','status', 'created_at', 'updated_at'];
}
