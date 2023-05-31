<?php

namespace Modules\InFoBasic\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class UserShareholderModel extends Model
{
    protected $table = 'user_shareholder';
    public $timestamps = true;
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
    ];


}
