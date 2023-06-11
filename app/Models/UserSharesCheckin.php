<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserSharesCheckin extends Model
{
    use HasFactory;
    protected $table = 'user_shares_checkin';
    protected $fillable = ['id', 'user_shares_id', 'is_check', 'url_qr', 'created_by', 'created_at', 'updated_at'];
}
