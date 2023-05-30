<?php
namespace App;
use Illuminate\Support\Facades\DB;
class Utils
{
    public static function post_file_key($key, $id = null)
    {
        if (!isset($_FILES["$key"])) return null;
        $target_dir = base_path('public');
        $folder = "/";
        $listallow = [
            "jpg",
            "jpeg",
            "png",
            "gif",
            "pdf",
            "csv",
            "docs",
            "xls",
        ];
        $fileParts = strtolower(pathinfo($_FILES[$key]['name'], PATHINFO_EXTENSION));
        $folder_name = '/general/';
        if (in_array($fileParts, [
            'jpg',
            'jpeg',
            'gif',
            'png',
            'pdf',
            'csv',
            'docs',
            'xls',
        ])) {
            $folder_name = 'picture/';
        }
        if (!file_exists($target_dir . $folder . $folder_name)) mkdir($target_dir . $folder . $folder_name, 0777, true);
        $target_file = $folder . $folder_name . Utils::generateRandomString(10) . '-' . Utils::removeTitle($_FILES["$key"]["name"]);
        $imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));
        if (file_exists($target_file)) return null;
        if ($_FILES["$key"]["size"] <= 0) return null;
        if (!in_array($imageFileType, $listallow)) return null;
        move_uploaded_file($_FILES["$key"]['tmp_name'], $target_dir . $target_file);
        $url_file = $target_dir . $target_file;
        chmod($url_file, 0777);
        return $target_file;
    }

    public static function post_file_key_vn($key, $id = null)
    {
        if (!isset($_FILES["$key"])) return null;
        $target_dir = base_path('public');
        $folder = "/";
        $listallow = [
            "jpg",
            "jpeg",
            "png",
            "gif",
            "pdf",
            "csv",
            "docs",
            "xls",
        ];
        $fileParts = strtolower(pathinfo($_FILES[$key]['name'], PATHINFO_EXTENSION));
        $folder_name = '/general/';
        if (in_array($fileParts, [
            'jpg',
            'jpeg',
            'gif',
            'png',
            'pdf',
            'csv',
            'docs',
            'xls',
        ])) {
            $folder_name = 'file_congress/';
        }
        if (!file_exists($target_dir . $folder . $folder_name)) mkdir($target_dir . $folder . $folder_name, 0777, true);
        $target_file = $folder . $folder_name . Utils::generateRandomString(10) . '-' . Utils::removeTitle($_FILES["$key"]["name"]);
        $imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));
        if (file_exists($target_file)) return null;
        if ($_FILES["$key"]["size"] <= 0) return null;
        if (!in_array($imageFileType, $listallow)) return null;
        move_uploaded_file($_FILES["$key"]['tmp_name'], $target_dir . $target_file);
        $url_file = $target_dir . $target_file;
        chmod($url_file, 0777);
        return $target_file;
    }

    public static function removeTitle($string, $keyReplace = '-')
    {
        $string = Utils::RemoveSign($string);
        //neu muon de co dau
        $string = trim(preg_replace("/[^A-Za-z0-9.]/i", " ", $string)); // khong dau
        $string = str_replace(" ", "-", $string);
        $string = str_replace("--", "-", $string);
        $string = str_replace("--", "-", $string);
        $string = str_replace("--", "-", $string);
        $string = str_replace("--", "-", $string);
        $string = str_replace("--", "-", $string);
        $string = str_replace("--", "-", $string);
        $string = str_replace("--", "-", $string);
        $string = str_replace($keyReplace, "-", $string);
        $string = strtolower($string);
        return $string;
    }

    public static function RemoveSign($str)
    {
        $coDau = array("à", "á", "ạ", "ả", "ã", "â", "ầ", "ấ", "ậ", "ẩ", "ẫ", "ă", "ằ", "ắ", "ặ", "ẳ", "ẵ", "è", "é", "ẹ", "ẻ", "ẽ", "ê", "ề", "ế", "ệ", "ể", "ễ", "ì", "í", "ị", "ỉ", "ĩ", "ò", "ó", "ọ", "ỏ", "õ", "ô", "ồ", "ố", "ộ", "ổ", "ỗ", "ơ", "ờ", "ớ", "ợ", "ở", "ỡ", "ù", "ú", "ụ", "ủ", "ũ", "ư", "ừ", "ứ", "ự", "ử", "ữ", "ỳ", "ý", "ỵ", "ỷ", "ỹ", "đ", "À", "Á", "Ạ", "Ả", "Ã", "Â", "Ầ", "Ấ", "Ậ", "Ẩ", "Ẫ", "Ă", "Ằ", "Ắ", "Ặ", "Ẳ", "Ẵ", "È", "É", "Ẹ", "Ẻ", "Ẽ", "Ê", "Ề", "Ế", "Ệ", "Ể", "Ễ", "Ì", "Í", "Ị", "Ỉ", "Ĩ", "Ò", "Ó", "Ọ", "Ỏ", "Õ", "Ô", "Ồ", "Ố", "Ộ", "Ổ", "Ỗ", "Ơ", "Ờ", "Ớ", "Ợ", "Ở", "Ỡ", "Ù", "Ú", "Ụ", "Ủ", "Ũ", "Ư", "Ừ", "Ứ", "Ự", "Ử", "Ữ", "Ỳ", "Ý", "Ỵ", "Ỷ", "Ỹ", "Đ", "ê", "ù", "à");

        $khongDau = array("a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "i", "i", "i", "i", "i", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "u", "u", "u", "u", "u", "u", "u", "u", "u", "u", "u", "y", "y", "y", "y", "y", "d", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "I", "I", "I", "I", "I", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "Y", "Y", "Y", "Y", "Y", "D", "e", "u", "a");
        return str_replace($coDau, $khongDau, $str);
    }
    public static function generateRandomString($length = 10)
    {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $randomString = '';
        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[rand(0, $charactersLength - 1)];
        }
        return $randomString;
    }
    public static function generateRandomCode($length = 10)
    {
        $characters = '0123456789';
        $charactersLength = strlen($characters);
        $randomString = '';
        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[rand(0, $charactersLength - 1)];
        }
        return $randomString;
    }

    public static function messegerAlert(int $status = null,string $alert = null,string $mess = null,$data = null){
        return [
            'status' => $status,
            'alert' => $alert,
            'mess' => $mess,
            'data' => $data
        ];
    }
}
