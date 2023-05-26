<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Scopes extends Model
{
    protected $table = 'scopes';

    public static function getTree()
    {
        return self::getChildren('root');
    }

    public static function getChildren($route)
    {
        $children = array();
        $select = self::where('scope_parent', '=', $route)
            ->where('scope_enable', '=', 1)
            ->get();
        foreach ($select as $row) {
            $child = array();
            $child['id'] = $row->id;
            $child['name'] = $row->scope_name;
            $child['route'] = $row->scope_route;
            $child['all-route'] = $row->scope_route . ($row->scope_relation == null ? '' : '|' . $row->scope_relation);
            $child['children'] = self::getChildren($row->scope_route);
            $children[] = $child;
        }
        return $children;
    }

    public static function checkAccess($route, $auth)
    {
        $user = DB::table('users')->where('auth_token', $auth)->select(['id', 'auth_token', 'ho_ten', 'email', 'dia_chi', 'dien_thoai', 'trang_thai', 'ma_xac_thuc', 'group_scope'])->first();
        $scopes_query = DB::table('user_group')->where('id', $user->group_scope)->first()->group_roles;
        $scopes = explode('|', $scopes_query);
        return in_array($route, $scopes);
    }
}
