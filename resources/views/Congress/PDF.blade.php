<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>Thực hiện biểu quyết</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        body { font-family: DejaVu Sans, sans-serif; font-size: 12px}
        .row::after {
            content: "";
            clear: both;
            display: table;
        }
        [class*="col-"] {
            float: left;
            padding: 15px;
        }
        .col-sm-1 {width: 8.33%;}
        .col-sm-2 {width: 16.66%;}
        .col-sm-3 {width: 25%;}
        .col-sm-4 {width: 33.33%;}
        .col-sm-5 {width: 41.66%;}
        .col-sm-6 {width: 50%;}
        .col-sm-7 {width: 58.33%;}
        .col-sm-8 {width: 66.66%;}
        .col-sm-9 {width: 75%;}
        .col-sm-10 {width: 83.33%;}
        .col-sm-11 {width: 91.66%;}
        .col-sm-12 {width: 100%;}

        * {
            box-sizing: border-box;
        }
    </style>
</head>
<body>


<div class="container">

    <div class="row">
        <div class="col-sm-6" style="text-align: center">
            <b>CÔNG TY CỔ PHẦN KHOÁNG SẢN VÀ XÂY DỰNG BÌNH DƯƠNG</b><br/>
            <b>MS: {{$code}}</b><br/>
            <b>---o0o---</b><br/>
            <p>Số: 01/2023/PBQN1-ĐHĐCĐ-ksb</p>
        </div>
        <div class="col-sm-6" style="text-align: center">
            <b>CỘNG HOÀ XÃ HỘI CHỦ NGHĨA VIỆT NAM</b><br/>
            <b>Độc lập - Tự do - Hạnh phúc</b><br/>
            <b>---o0o---</b><br/>
            <p>Ngày {{$day}} tháng {{$month}} năm {{$year}}</p>
        </div>
    </div>

    <div class="row">
        <h2 style="text-align: center"><b>PHIẾU BIỂU QUYẾT</b></h2>
        <h2 style="text-align: center"><b>ĐẠI HỘI ĐỒNG CỔ ĐÔNG THƯỜNG NIÊN NĂM 2023</b></h2>
       <div class="col-sm-10" style="margin-left: 20px;font-size: 14px">
           <b style="font-size: 12px">TÊN CỔ ĐÔNG: {{$name}}</b><br/>
           <b style="font-size: 12px">CMTND/CCCD/DKKD:</b> {{$code}}<br/>
            <b style="font-size: 12px">Cổ phiếu biểu quyết:</b> {{$total}}<br/>
           <br/>
           <div>
           <b style="font-size: 13px">I. Biểu quyết thông qua thủ tục khai mạc Đại hội</b><br/>
               @foreach($congress_1 as $key => $value)
            <div>
               <b style="font-size: 12px">{{$key == 0? $key + 1 : $value->sort}}. {{$value->name_vn}}</b><br/>
                <br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  Tán thành &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  Không tán thành &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  Không ý kiến<br/>
                <br/>
            </div>
               @endforeach
           </div>
           <br/
           <div>
               <b style="font-size: 13px">II. Biểu quyết thông qua các Báo cáo/ Tờ trình</b><br/>
               @foreach($congress_2 as $key => $value)
                   <div>
                       <b style="font-size: 12px">{{$key == 0? $key + 1 : $value->sort}}. {{$value->name_vn}}</b><br/>
                       <br/>
                       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Tán thành &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  Không tán thành &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  Không ý kiến<br/>
                       <br/>
                   </div>
               @endforeach
           </div>
           <br/>
           <div>
               <b style="font-size: 13px">III. Biểu quyết thông qua Biên bản và Nghị quyết Đại hội</b><br/>
               @foreach($congress_3 as $key => $value)
                   <div>
                       <b style="font-size: 12px">{{$key == 0? $key + 1 : $value->sort}}. {{$value->name_vn}}</b><br/>
                       <br/>
                       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Tán thành &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  Không tán thành &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  Không ý kiến<br/>
                       <br/>
                   </div>
               @endforeach
           </div>
            <b>Ghi chú:</b><br/>
            - 01 cổ phần phổ thông tương đương với 01 quyền biểu quyết<br/>
            - Tổng số lượng cổ phần sở hữu bằng tổng số lượng quyền biểu quyết (Không ủy quyền)<br/>
            - Tổng số phiếu biểu quyết bằng tổng số lượng cổ phần được ủy quyền (Ủy quyền)<br/>
       </div>
    </div>

</div>


</body>
</html>


