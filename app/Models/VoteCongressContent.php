<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class VoteCongressContent extends Model
{
    use HasFactory;
    protected $table = 'vote_congress_content';
    protected $fillable = ['id', 'name_vn', 'name_en', 'file_content_vn', 'file_content_en', 'type', 'sort', 'user_id', 'created_by', 'created_at', 'updated_at'];

    public function getCongressById($type){
        return VoteCongressContent::where([['user_id', Auth::user()->id], ['type', $type]])->orderBy('sort','asc')->get();
    }
}
