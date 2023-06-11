<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserSharesVote extends Model
{
    const APPROVED = 1;
    const NO_APPROVED = 2;
    const NO_IDEA = 3;


    use HasFactory;

    protected $table = 'user_shares_vote';
    protected $fillable = ['id', 'id_congress', 'user_id', 'id_user_shares', 'vote', 'created_at', 'updated_at'];

    public static function getBadgeStatus()
    {
        return [
            self::APPROVED => [
                'class' => 'bg-success',
                'text' => 'Tán thành'
            ],
            self::NO_APPROVED => [
                'class' => 'bg-warning',
                'text' => 'Không tán thành'
            ],
            self::NO_IDEA => [
                'class' => 'bg-dark',
                'text' => 'Không ý kiến'
            ],
        ];
    }
}
