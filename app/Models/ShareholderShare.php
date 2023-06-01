<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ShareholderShare extends Model
{
    use HasFactory;

    protected $table = "shareholder_shares";
    protected $fillable = ['id', 'total','user_id', 'user_shares_id', 'created_at', 'updated_at'];
}
