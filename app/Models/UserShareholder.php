<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Modules\Congress\Config\constants;

class UserShareholder extends Model
{
    use HasFactory;

//    VOTE STATUS
    const VOTED = 1;
    const NO_VOTED = 2;

//    JOINT TYPE
    const LIVE = 1;
    const ONLINE = 2;
    const AUTHORIZED = 3;
    const NOT_CHECKIN = 4;

//    AUTHORITY STATUS
    const AUTHORITY = 1;
    const NO_AUTHORITY = 2;

//    STATUS
    const STATUS_ACTIVE = 1;
    const STATUS_DEACTIVE = 2;

    const BLOCK = 1;
    const FOREIGNER = 2;
    const VIETNAM = 1;

    const PERSONAL = 1;
    const ORGANIZATION = 2;
    //CHECKIN
    const CHECKIN = 1;
    const URL_QR = "https://chart.apis.google.com/chart?cht=qr&chs=300x300&chl=https://vote.vn";

    protected $table = "user_shareholder";
    public $timestamps = true;
    protected $fillable = ['id', 'username', 'cccd', 'password', 'no_hash_password', 'name', 'code_dksh', 'date_range', 'issued_by', 'phone_number', 'address', 'email', 'cccd', 'type', 'is_auth', 'organization', 'user_id', 'created_at', 'updated_at', 'created_by', 'remember_token'];

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

    public static function getListStatus(): array
    {
        return [
            [
                'value' => self::STATUS_ACTIVE,
                'label' => 'Hoạt động',

            ],
            [
                'value' => self::STATUS_DEACTIVE,
                'label' => 'Không hoạt động',
            ]
        ];
    }

    public static function getListAuthority(): array
    {
        return [
            [
                'value' => self::AUTHORITY,
                'label' => 'Nhận ủy quyền',

            ],
            [
                'value' => self::NO_AUTHORITY,
                'label' => 'Cổ đông',
            ]
        ];
    }

    public static function getListVoteStatus(): array
    {
        return [
            [
                'value' => self::VOTED,
                'label' => 'Đã biểu quyết',

            ],
            [
                'value' => self::NO_VOTED,
                'label' => 'Chưa biết quyết',
            ]
        ];
    }


    public static function getListJointTypes(): array
    {
        return [
            [
                'value' => self::LIVE,
                'label' => 'Trực tiếp',

            ],
            [
                'value' => self::ONLINE,
                'label' => 'Trực tuyến',
            ],
            [
                'value' => self::AUTHORIZED,
                'label' => 'Ủy quyền',
            ],
            [
                'value' => self::NOT_CHECKIN,
                'label' => 'Chưa checkin',
            ],
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
        $query = $query->where('user_shareholder.user_id', $user_id);
        if ($txtName != null) {
            $query = $query->where('user_shareholder.name', 'like', '%' . $txtName . '%');
        }
        if ($status != self::BLOCK) {
            $query = $query->select('user_shareholder.id as id', 'user_shareholder.name as name', 'user_shareholder.cccd as cccd', 'user_shareholder.phone_number')
                ->orderBy('name', 'asc')
                ->paginate(10);
            foreach ($query as $v) {
                $blockVoting = DB::table('user_share_block_voting')->where('id_vote_congress_report', $congress_id)->where('id_user_share', $v->id)->first();
                $shareHolderShares = DB::table('shareholder_shares')->where('user_shares_id', $v->id)->first();
                $v['total'] = $shareHolderShares != null ? $shareHolderShares->total : 0;
                $v['block'] = $blockVoting != null ? $blockVoting->status : 0;
            }
        } else {
            $query = $query->leftJoin('user_share_block_voting', 'user_shareholder.id', '=', 'user_share_block_voting.id_user_share')
                ->leftJoin('shareholder_shares', 'user_shareholder.id', '=', 'shareholder_shares.user_shares_id')
                ->where('id_vote_congress_report', $congress_id)
                ->select('user_shareholder.id as id', 'user_shareholder.name as name', 'user_shareholder.cccd as cccd', 'user_shareholder.phone_number',
                    'shareholder_shares.total as total', 'user_share_block_voting.status as block')
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

    //Checkin User
    public static function getListCheckin($txtName, $checkin)
    {

        $user_id = Auth::user()->id;
        $query = UserShareholder::query();
        if ($checkin != null && $checkin != 0) {
            $query = $query->leftJoin('user_shares_checkin', 'user_shares_checkin.user_shares_id', '=', 'user_shareholder.id')
                ->where('user_shares_checkin.is_check', $checkin);
        }
        $query = $query->where(function ($query) use ($txtName) {
            $query->where('name', 'like', '%' . $txtName . '%')
                ->orWhere('cccd', 'like', '%' . $txtName . '%')
                ->orWhere('phone_number', 'like', '%' . $txtName . '%')
                ->orWhere('code_dksh', 'like', '%' . $txtName . '%');
        })
            ->orderBy('name', 'asc')
            ->paginate(10);

        foreach ($query as $v) {
            $shareholder_share_total = UserShareCheckin::query();
            if ($checkin != null && $checkin != 0) {
                $shareholder_share_total = $shareholder_share_total->where('is_check', $checkin);
            }
            $v['date_range'] = Carbon::parse($v->date_range)->format('d-m-Y');
            $shareholder_share_total = $shareholder_share_total->where('user_shares_id', $v->id)->first();
            $v['checkin'] = $shareholder_share_total != null ? $shareholder_share_total->is_check : 0;
            $v['url_qr'] = $shareholder_share_total != null ? $shareholder_share_total->url_qr : self::URL_QR;
            $shareholder_share_total = DB::table('shareholder_shares')->where('user_id', $user_id)->where('user_shares_id', $v->id)->first();
            $v['total'] = $shareholder_share_total != null ? $shareholder_share_total->total : 0;
        }
        return $query;
    }

    public static function getListById($id)
    {
        $setTotalAuthority = 0;
        $getTotalAuthority = 0;
        $user_id = Auth::user()->id;
        $user_share = UserShareholder::where([['id', $id], ['user_id', $user_id]])->first();
        if ($user_share != null) {
            $user_share['date_range'] = Carbon::parse($user_share->date_range)->format('d-m-Y');
            $user_share['cccd'] = $user_share['cccd'] . "/" . $user_share['code_dksh'];
            $shareholder_share_total = DB::table('shareholder_shares')->where('user_id', $user_id)->where('user_shares_id', $user_share->id)->first();
            $user_share['total'] = $shareholder_share_total != null ? $shareholder_share_total->total : 0;
            //checkin
            $user_share['share_total'] = $shareholder_share_total != null ? $shareholder_share_total->total : 0;
            $checkin = UserShareCheckin::where('user_shares_id', $user_share->id)->first();
            $user_share['check_in'] = $checkin != null ? $checkin->is_check : null;
            $user_share['url_qr'] = $checkin != null ? $checkin->url_qr : self::URL_QR;

            //authority
            if ($user_share->is_auth != self::AUTHORITY) {
                $setTotalAuthority = self::sumShareAuthor('id_shareholder', $user_share->id);
            } else {
                $getTotalAuthority = self::sumShareAuthor('id_author', $user_share->id);
            }
            $user_share['setAuthority'] = $setTotalAuthority;
            $user_share['getAuthority'] = $getTotalAuthority;
            $user_share['totalALL'] = ($user_share['total'] + $user_share['getAuthority']) - $user_share['setAuthority'];
        }
        return $user_share;
    }

    public static function checkIn($id)
    {

        $checkin = UserShareCheckin::where('user_shares_id', $id)->first();
        $qr = null;
        if ($checkin == null) {
            $qr = UserShareholder::where('id', $id)->first();
            $data = [
                'user_shares_id' => $id,
                'is_check' => self::CHECKIN,
                'url_qr' => $qr != null ? self::URL_QR . "?token=" . $qr->token_key : self::URL_QR . "?token="
            ];
            $qr['url_qr'] = $data['url_qr'];
            UserShareCheckin::Create($data);
        }
        return $qr;
    }

    public function getTkLogin($id)
    {
        return UserShareholder::where('id', $id)->first();
    }

    //End checkin user


    //Authority

    public static function getAllShareHolder($nameSearch)
    {
        $user_id = Auth::user()->id;
        $setTotalAuthority = 0;
        $getTotalAuthority = 0;
        $query = UserShareholder::query();
        $query = $query->where('user_id', $user_id);
        if ($nameSearch != null) {
            $query = $query->where(function ($query) use ($nameSearch) {
                $query->where('name', 'like', '%' . $nameSearch . '%')
                    ->orWhere('cccd', 'like', '%' . $nameSearch . '%')
                    ->orWhere('phone_number', 'like', '%' . $nameSearch . '%');
            });
        }
        $query = $query->orderBy('name', 'asc')
            ->paginate(10);
        if ($query != null) {
            foreach ($query as $item) {
                $item['date_range'] = Carbon::parse($item->date_range)->format('d-m-Y');

                $total = ShareholderShare::where([['user_shares_id', $item->id], ['user_id', $user_id]])->first();
                $item['total'] = $total != null ? $total->total : 0;
                if ($item->is_auth != self::AUTHORITY) {
                    $setTotalAuthority = self::sumShareAuthor('id_shareholder', $item->id);
                } else {
                    $getTotalAuthority = self::sumShareAuthor('id_author', $item->id);
                }
                $item['setAuthority'] = $setTotalAuthority;
                $item['getAuthority'] = $getTotalAuthority;
                $item['totalALL'] = ($item['total'] + $item['getAuthority']) - $item['setAuthority'];
            }
        }
        return $query;
    }

    public function sumShareAuthor($column, $id)
    {
        return UserShareAuthor::where($column, $id)->where('status',self::AUTHORITY)->sum('total_authority');
    }

    public static function getAuthority($nameSearch)
    {
        $user_id = Auth::user()->id;
        $query = UserShareholder::query();
        $query = $query->where('user_id', $user_id)
            ->where('is_auth', self::AUTHORITY);
        if ($nameSearch != null) {
            $query = $query->where(function ($query) use ($nameSearch) {
                $query->where('name', 'like', '%' . $nameSearch . '%')
                    ->orWhere('cccd', 'like', '%' . $nameSearch . '%')
                    ->orWhere('phone_number', 'like', '%' . $nameSearch . '%');
            });
        }
        $query = $query->orderBy('updated_at', 'desc')
            ->paginate(10);

        return $query;
    }

    public function add($data)
    {
        $userId = Auth::user()->id;
        $data = [
            'name' => $data['name'],
            'cccd' => $data['cccd'],
            'username' => $data['cccd'],
            'email' => $data['email'],
            'phone_number' => empty($data['phone_number']) ? null : $data['phone_number'],
            'password' => Hash::make($data['password']),
            'no_hash_password' => $data['password'],
            'organization' => empty($data['organization']) ? null : $data['organization'],
            'user_id' => $userId,
            'is_auth' => self::AUTHORITY,
        ];
        $create = UserShareholder::Create($data);
        return $create;
    }

    public function edit($data)
    {
        $data = [
            'id' => $data['id'],
            'name' => $data['name'],
            'cccd' => $data['cccd'],
            'username' => $data['cccd'],
            'email' => $data['email'],
            'phone_number' => empty($data['phone_number']) ? null : $data['phone_number'],
            'password' => Hash::make($data['password']),
            'no_hash_password' => $data['password'],
            'organization' => empty($data['organization']) ? null : $data['organization'],
        ];
        $update = UserShareholder::where('id', $data['id'])->update($data);
        return $update;
    }

    public function getUserAuthorByShareHolder($id){
        return UserShareholder::leftJoin('user_shares_author','user_shares_author.id_author','=','user_shareholder.id')
            ->where('user_shares_author.id_shareholder',$id)
            ->select('user_shareholder.name','user_shareholder.cccd','user_shareholder.phone_number','user_shareholder.email','user_shares_author.total_authority')
            ->orderBy('user_shares_author.id', 'desc')
            ->paginate(10);
    }

    public function getAuthor(){
        return UserShareholder::where([['user_id',Auth::user()->id],['is_auth',self::AUTHORITY]])->orderBy('id', 'desc')->paginate(10);
    }

    public function getUserShareHolderById($id){
        return UserShareholder::where('id',$id)->orderBy('id', 'desc')->first();
    }


    //END Authority
}
