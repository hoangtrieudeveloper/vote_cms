<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SettingAuthor extends Model
{
    use HasFactory;

    public $timestamps = true;
    protected $table = "setting_author";
    protected $fillable = ['id', 'address', 'address_en', 'time_close', 'time_close_en', 'file_content','file_content_en','user_id', 'created_at', 'updated_at'];

}
