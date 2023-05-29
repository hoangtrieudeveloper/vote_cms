<?php

namespace Modules\Congress\Models;

use Illuminate\Database\Eloquent\Model;

class CongressModel extends Model
{
    protected $table = 'vote_congress_content';
    public $timestamps = true;
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name_vn',
        'name_en',
        'file_content_vn',
        'file_content_en',
        'type',
        'sort',
        'created_by',
        'created_at',
        'updated_at',
    ];
    public static function created($data){
//        self::created($data);
    }
    public static function updated($data){
//        self::update($data);
    }
    public static function deleted($id){
        //        self::update($data);
    }
}
