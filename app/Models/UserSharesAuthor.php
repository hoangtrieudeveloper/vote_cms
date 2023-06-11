<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserSharesAuthor extends Model
{
    use HasFactory;
    protected $table = 'user_shares_author';
    protected $fillable = ['id', 'id_shareholder', 'id_author', 'status', 'total_authority', 'user_id', 'created_at', 'updated_at'];
}
