<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Bot extends Model
{
    protected $table = 'bot';
    public static function CreatedBot($data)
    {
        $data['created_at'] = date("Y-m-d H:i:s");
        return self::insertGetId($data);
    }
    public static function updateBot($data)
    {
        return self::where('id', $data['id'])->update($data);
    }
}
