<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Modules\Congress\Config\constants;

class UserShareholder extends Model
{
    use HasFactory;

    const BLOCK = 1;
    const FOREIGNER = 2;
    const VIETNAM = 1;

    const PERSONAL = 1;
    const ORGANIZATION = 2;
    const CHECKIN = 1;

    protected $table = "user_shareholder";
    protected $fillable = ['id', 'username', 'cccd', 'password','no_hash_password', 'name', 'code_dksh', 'date_range', 'issued_by', 'phone_number', 'address', 'email', 'type', 'organization', 'user_id', 'created_at', 'updated_at', 'created_by', 'remember_token'];

    public static function getListType(): array
    {
        return [
            [
                'value' => self::VIETNAM,
                'label' => 'Trong nước',

            ],
            [
                'value' => self::FOREIGNER,
                'label' => 'Nước ngoài',
            ]
        ];
    }

    public static function getListOrganization(): array
    {
        return [
            [
                'value' => self::PERSONAL,
                'label' => 'Cá nhân',

            ],
            [
                'value' => self::ORGANIZATION,
                'label' => 'Tổ chức',
            ]
        ];
    }

    public static function getTypeImport(): array
    {
        return [
            "Cá nhân" => self::PERSONAL,
            "Tổ chức" => self::ORGANIZATION,
        ];
    }

    public static function getOrganizationImport(): array
    {
        return [
            "Trong nước" => self::VIETNAM,
            "Nước ngoài" => self::FOREIGNER,
        ];
    }

    public static function getListReport($congress_id, $status, $txtName)
    {
        $user_id = Auth::user()->id;
        $query = UserShareholder::query();
        $query = $query->leftJoin('shareholder_shares', 'user_shareholder.id', '=', 'shareholder_shares.user_shares_id')->where('user_shareholder.user_id', $user_id);
        if ($txtName != null) {
            $query = $query->where('user_shareholder.name', 'like', '%' . $txtName . '%');
        }
        if ($status != self::BLOCK) {
            $query = $query->select('user_shareholder.id as id', 'user_shareholder.name as name', 'user_shareholder.cccd as cccd', 'user_shareholder.phone_number',
                'shareholder_shares.total as total')
                ->orderBy('name', 'asc')
                ->paginate(10);
            foreach ($query as $v) {
                $blockVoting = DB::table('user_share_block_voting')->where('id_vote_congress_report', $congress_id)->where('id_user_share', $v->id)->first();
                $v['block'] = $blockVoting != null ? $blockVoting->status : 0;
            }
        } else {
            $query = $query->leftJoin('user_share_block_voting', 'user_shareholder.id', '=', 'user_share_block_voting.id_user_share')
                ->where('id_vote_congress_report', $congress_id)
                ->select('user_shareholder.id as id', 'user_shareholder.name as name', 'user_shareholder.cccd as cccd', 'user_shareholder.phone_number',
                    'user_shares.total as total', 'user_share_block_voting.status as block')
                ->orderBy('name', 'asc')
                ->paginate(10);
        }
        return $query;

    }

    public static function updateStatusBlockVote($data)
    {
        $voteBlock = UserShareBlockVote::where('id_user_share', $data['id_user_share'])
            ->where('id_vote_congress_report', $data['id_vote_congress_report'])
            ->first();
        if ($voteBlock == null) {
            $result = UserShareBlockVote::Create($data);
        } else {
            $result = UserShareBlockVote::where('id_user_share', $data['id_user_share'])
                ->where('id_vote_congress_report', $data['id_vote_congress_report'])->update($data);
        }
        return $result;

    }

    public static function getTitCongress($congress_id)
    {
        $title = DB::table('vote_congress_content')->where('type', constants::TO_TRINH)->where('id', $congress_id)->select('name_vn')->first();
        if ($title != null) {
            return $title->name_vn;
        }
        return null;
    }

    public static function getListCheckin($txtName, $checkin)
    {

        $user_id = Auth::user()->id;
        $query = UserShareholder::query();
        $query = $query->where(function ($query) use ($txtName) {
            $query->where('name', 'like', '%' . $txtName . '%')
                ->orWhere('cccd', 'like', '%' . $txtName . '%')
                ->orWhere('phone_number', 'like', '%' . $txtName . '%')
                ->orWhere('code_dksh', 'like', '%' . $txtName . '%');
        })
            ->orderBy('id', 'desc')
            ->paginate(10);

        foreach ($query as $v) {
            $shareholder_share_total = UserShareCheckin::query();
            if ($checkin != null) {
                $shareholder_share_total = $shareholder_share_total->where('is_check', $checkin);
            }
            $shareholder_share_total = $shareholder_share_total->where('user_shares_id', $v->id)->first();
            $v['checkin'] = $shareholder_share_total != null ? $shareholder_share_total->is_check : 0;
            $shareholder_share_total = DB::table('shareholder_shares')->where('user_id', $user_id)->where('user_shares_id', $v->id)->first();
            $v['total'] = $shareholder_share_total != null ? $shareholder_share_total->total : 0;
        }
        return $query;
    }
}
