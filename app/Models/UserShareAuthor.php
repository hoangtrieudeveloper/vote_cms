<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class UserShareAuthor extends Model
{
    use HasFactory;

    const DUYET = 1;
    const CHUA_DUYET = 0;
    const TU_CHOI = 2;
    public $timestamps = true;
    protected $table = "user_shares_author";
    protected $fillable = ['id', 'id_shareholder', 'id_author', 'user_id', 'total_authority', 'status', 'created_at', 'updated_at'];

    public function updateStatusAuthor($data)
    {
        $query = UserShareAuthor::where('id', $data['id'])->first();
        if ($query != null && $query['status'] == self::CHUA_DUYET) {
            $query->update(['status' => $data['status']]);
        }
        return $query;
    }

    public function add($data)
    {
        $data = [
            'id_shareholder' => $data['idShareHolder'],
            'id_author' => $data['id'],
            'total_authority' => $data['total'],
            'status' => self::DUYET,
            'user_id' => Auth::user()->id,
        ];

        return UserShareAuthor::Create($data);
    }

    public function getList($cccd, $staus, $author)
    {
        $query = UserShareAuthor::query();
        $query = $query->join('user_shareholder as ag', 'ag.id', '=', 'user_shares_author.id_shareholder')
            ->join('user_shareholder as bg', 'bg.id', '=', 'user_shares_author.id_author');
        if ($cccd != null) {
            $query = $query->where(function ($query) use ($cccd) {
                $query->where('ag.cccd', 'like', '%' . $cccd . '%')
                    ->orWhere('bg.cccd', 'like', '%' . $cccd . '%');
            });
        }
        if ($staus != null) {
            $query = $query->where('status', $staus);
        }
        $query = $query->select(
            DB::raw("ag.name as name_1"),
            DB::raw("ag.cccd as cccd_1"),
            DB::raw("bg.name as name_2"),
            DB::raw("bg.cccd as cccd_2"),
            DB::raw("bg.phone_number as phone_number_2"),
            'total_authority',
            'status',
            'user_shares_author.created_at',
            'user_shares_author.id',
        )->orderByDesc('user_shares_author.id')
            ->paginate(10);
        return $query;
    }
}
