<?php

namespace App\Models;

use App\Models\UserShare;
use App\Models\UserShareholder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class SettingCompanyModel extends Model
{
    protected $table = 'settings_company';
    public $timestamps = true;
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'id',
        'logo',
        'banner',
        'name_vn',
        'name_en',
        'phone_number',
        'number_fax',
        'stock_code',
        'code_business',
        'total_shareholder',
        'total_share',
        'header_company',
        'header_company_en',
        'meeting_venue',
        'meeting_venue_en',
        'meeting_time',
        'meeting_time_en',
        'meeting_name',
        'meeting_name_en',
        'meeting_chairman',
        'meeting_chairman_en',
        'vote_time',
        'vote_time_en',
        'vote_time_close',
        'vote_time_close_en',
        'secretary_chairman',
        'secretary_chairman_en',
        'link_livestream',
        'link_livestream_en',
        'Link_hdsd',
        'Link_hdsd_en',
        'link_stated',
        'closing_date',
        'hotline',
    ];

    public function getById($id)
    {
        $data = SettingCompanyModel::where('user_id', $id)->first();
        $data['total_shareholder'] = UserShareholder::where('user_id', $id)->count();
        $total_share = ShareholderShare::where('user_id', $id)->sum('total');
        $data['total_share'] = $total_share ?? 0;
        return $data;
    }

    public function edit(array $data)
    {
        return SettingCompanyModel::where('id', $data['id'])->update($data);
    }

}
