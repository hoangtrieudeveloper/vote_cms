<?php

namespace App\helpers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;


class ValidatorHelper
{
    const MIN = 'min';
    const MAX = 'max';
    const REQUIRED = 'required';
    const NUM = 'numeric';
    const STRING = 'string';

    public $ListRulesDemo = [
        ['Mã', 'id' => 'required|numeric'],
        ['Email', 'email','required|string|max:255', ['required' => 'Không được bỏ trống']]
    ];

    /*
     * @ListRules = $ListRulesDemo
     */
    public static function Validate(Request $request,$ListRules = []): bool
    {
        $validate = [];
        $validateMessage = [];
        if (!empty($ListRules)) {
            foreach ($ListRules as $Rules) {
                $transName = $Rules[0];
                $varName = $Rules[1];
                $rule = $Rules[2];
                $validate[$varName] = $rule;
                if (count($Rules) > 2) {
                    $validateMessage = self::makeMessage($validateMessage, null,$Rules[3], $transName, $varName);
                } else {
                    $validateMessage = self::makeMessage($validateMessage, $rule,null , $transName, $varName);
                }
            }
        }
        return Validator::make($request->all(), $validate, $validateMessage)->fails();
    }

    public function makeMessage($validateMessage = [], $rule = null, $replaceMessage = null, $transName = null,$varName)
    {
        if (isset($rule)) {
            $listMessage = [];
            $listDefaultMessage = $this->getListDefaultMessage();
            $strRule = explode("|", $rule);
            foreach ($strRule as $ruleName) {
                if (!empty(preg_replace('/\D/', '', $ruleName))) {
                    $message = $listDefaultMessage[$rule];
                    $message = str_replace(":range:", preg_replace('/\D/', '', $ruleName), $message);
                    $message = str_replace(":name:", $transName, $message);
                    $listMessage[$varName . '.' . $rule] = $message;
                } else {
                    $listMessage[$varName . '.' . $rule] = str_replace(":name:", $transName, $listDefaultMessage[$rule]);
                }
            }
            return $listMessage;
        }
        if (isset($replaceMessage)) {
            foreach ($replaceMessage as $key => $message) {
                if (array_key_exists($varName . $key, $validateMessage)) {
                    $validateMessage[$varName . $key] = $message;
                }
            }
            return $validateMessage;
        }
    }

    public function getListDefaultMessage(): array
    {
        return [
            self::REQUIRED => 'Vui lòng nhập :name:!',
            self::NUM => ':name: phải là số!',
            self::STRING => ':name: phải là một chuỗi ký tự!',
            self::MIN => ':name: không được nhỏ hơn :range: ký tự!',
            self::MAX => ':name: không được quá :range: ký tự!',

        ];
    }
}
