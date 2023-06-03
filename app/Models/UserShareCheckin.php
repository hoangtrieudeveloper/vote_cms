<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Modules\Congress\Config\constants;

class UserShareCheckin extends Model
{
    public $timestamps = true;
    protected $table = "user_shares_checkin";
    protected $fillable = ['id', 'user_shares_id', 'is_check', 'created_at', 'updated_at'];

}
