<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserShareholder extends Model
{
    use HasFactory;

    const FOREIGNER = 2;
    const VIETNAM = 1;

    const PERSONAL = 1;
    const ORGANIZATION = 2;

    protected $table = "user_shareholder";
    protected $fillable = ['id', 'username', 'password', 'name', 'code_dksh', 'date_range', 'issued_by', 'phone_number', 'address', 'email', 'type', 'organization', 'user_id', 'created_at', 'updated_at', 'created_by', 'remember_token'];

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
}
