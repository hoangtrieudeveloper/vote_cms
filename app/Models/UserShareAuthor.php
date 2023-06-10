<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserShareAuthor extends Model
{
    use HasFactory;

    const DUYET = 1;
    const CHUA_DUYET = 0;
    public $timestamps = true;
    protected $table = "user_shares_author";
    protected $fillable = ['id', 'id_shareholder', 'id_author','total_authority','status', 'created_at', 'updated_at'];

    public function add($data){
        $data = [
            'id_shareholder' => $data['idShareHolder'],
            'id_author' => $data['id'],
            'total_authority' => $data['total'],
            'status' => self::DUYET,
        ];

       return UserShareAuthor::Create($data);
    }
}
