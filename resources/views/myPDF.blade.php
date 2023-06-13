<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>{{ $name }}</title>
    <style>
        body { font-family: DejaVu Sans, sans-serif; }
         table {
             border-collapse: collapse;
             width: 100%;
         }
        td, th {
            border: 1px solid #dddddd;
            text-align: center;
            padding: 8px;

        }

        tr:nth-child(even) {
            background-color: #dddddd;
        }
    </style>
</head>
<body>


<h2 style="text-align: center">ĐẠI HỘI ĐỒNG CỔ ĐÔNG THƯỜNG NIÊN NĂM 2023
CÔNG TY CỔ PHẦN KHOÁNG SẢN VÀ XÂY DỰNG BÌNH
    DƯƠNG</h2>
<h3 style="text-align: center"> TÀI KHOẢN ĐĂNG NHẬP DÀNH CHO CỔ ĐÔNG</h3>
<br/>
<div style="text-align: center;">
    <p>Cổ đông: {{$name}} &nbsp;&nbsp;&nbsp;&nbsp; Số ĐKSH: {{$code}} </p>
</div>
<br/>
<br/>
<br/>
<table>
    <tr>
        <th>Tài khoản</th>
        <th>Mật khẩu</th>
    </tr>
    <tr>
        <td>{{$username}}</td>
        <td>{{$no_hash_password}}</td>
    </tr>
</table>

</body>
</html>
