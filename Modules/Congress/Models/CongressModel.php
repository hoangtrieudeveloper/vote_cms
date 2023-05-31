<?php

namespace Modules\Congress\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Modules\Congress\Config\constants;

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

    public function getList($type){
        return SettingCompanyModel::where('type',$type)
            ->orderBy('vote_congress_content.id', 'desc')
            ->paginate(20);
    }
    public function getById($id){
        return SettingCompanyModel::where('id', $id)->first();
    }
    public function add(array $data){
        return SettingCompanyModel::Create($data);
    }
    public function edit(array $data){
        return SettingCompanyModel::where('id', $data['id'])->update($data);
    }
    public function del($id){
        return SettingCompanyModel::where(['id' => $id])->delete();
    }
    public  function getLastData($type){
        return SettingCompanyModel::where('type',$type)
            ->orderBy('vote_congress_content.sort', 'desc')
            ->first();
    }
}
