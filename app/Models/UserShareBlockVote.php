<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserShareBlockVote extends Model
{
    public $timestamps = true;
    protected $table = "user_share_block_voting";
    protected $fillable = ['id', 'id_user_share', 'id_vote_congress_report', 'status', 'created_at', 'updated_at'];
}
