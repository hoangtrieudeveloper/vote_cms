import React, {Component, useEffect, useState} from 'react';
import {
    Box, Typography
} from "@mui/material";
import Footer from "../pages/Footer";

function Home() {
    return (
        <Box className="main-content">
            <Box className="page-content">
                <Box className="container-fluid">
                    <Box className="row">
                        <Box className="col-12">
                            <Box className="page-title-box d-sm-flex align-items-center justify-content-between">
                                <h3 className="mb-sm-0"><b>Đại hội Cổ đông 2023</b></h3>
                                <Box className="page-title-right">
                                    <ol className="breadcrumb m-0">
                                        <li className="breadcrumb-item"><a href="#">Trang chủ</a>
                                        </li>
                                        <li className="breadcrumb-item active">hướng dẫn</li>
                                    </ol>
                                </Box>

                            </Box>
                        </Box>
                    </Box>
                    <Box className="row">
                        <Box className="col-xl-12">
                            <Box className="card">
                                <Box className="card-body">
                                    <iframe width="100%" height="670" src="https://www.youtube.com/embed/jwAGpLb_mrA"
                                            title="YouTube video player" frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            allowFullScreen></iframe>
                                </Box>
                            </Box>
                        </Box>
                        <Box className="col-xl-12">
                            <Box className="card">
                                <Box className="card-header align-items-center d-flex">
                                    <h3 className="card-title mb-0 flex-grow-1"><b>BÁO CÁO KIỂM TRA TƯ CÁCH CỔ ĐÔNG</b>
                                    </h3>
                                    <Box className="flex-shrink-0">
                                        <Box className="dropdown card-header-dropdown">
                                            <a className="text-reset dropdown-btn" href="#" data-bs-toggle="dropdown"
                                               aria-haspopup="true" aria-expanded="false">
                                                <span className="text-muted">02 Nov 2021 to 31 Dec 2021<i
                                                    className="mdi mdi-chevron-down ms-1"></i></span>
                                            </a>
                                            <Box className="dropdown-menu dropdown-menu-end">
                                                <a className="dropdown-item" href="#">Today</a>
                                                <a className="dropdown-item" href="#">Last Week</a>
                                                <a className="dropdown-item" href="#">Last Month</a>
                                                <a className="dropdown-item" href="#">Current Year</a>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>

                                <Box className="card-body">
                                    <Box className="table-responsive table-card">
                                        <table
                                            className="table table-borderless table-hover table-nowrap align-middle mb-0">
                                            <thead className="table-light">
                                            <tr className="text-muted">
                                                <th scope="col">STT</th>
                                                <th scope="col">Nội dung</th>
                                                <th scope="col">Số lượng (Cổ đông)</th>
                                                <th scope="col">Số CP đại diện sở hữu(Cổ phần)</th>
                                                <th scope="col">Tỉ lệ%/tổng CP của công ty</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <td>1</td>
                                                <td>Cổ đông được mời họp</td>
                                                <td><span className="badge badge-soft-success p-2">1.901</span></td>
                                                <td>
                                                    <span className="badge badge-soft-success p-2">67.894.960</span>
                                                </td>
                                                <td>
                                                    <Box className="text-nowrap">100%</Box>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>2</td>
                                                <td>Cổ đông/đại diện ủy quyền tham dự</td>
                                                <td><span className="badge badge-soft-success p-2">4</span></td>
                                                <td>
                                                    <span className="badge badge-soft-success p-2">12.087.270</span>
                                                </td>
                                                <td>
                                                    <Box className="text-nowrap">17,8%</Box>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>3</td>
                                                <td>Cổ đông vắng mặt</td>
                                                <td><span className="badge badge-soft-success p-2">1.897	</span></td>
                                                <td>
                                                    <span className="badge badge-soft-success p-2">55.807.690</span>
                                                </td>
                                                <td>
                                                    <Box className="text-nowrap">82,2%</Box>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                        <Box className="col-xl-12">
                            <Box className="card">
                                <Box className="card-header align-items-center d-flex">
                                    <h4 className="card-title mb-0 flex-grow-1">Ý KIẾN CỔ ĐÔNG</h4>
                                    <Box className="flex-shrink-0">
                                        <Box className="dropdown card-header-dropdown">
                                            <a className="text-reset dropdown-btn" href="#" data-bs-toggle="dropdown"
                                               aria-haspopup="true" aria-expanded="false">
                                                <span className="text-muted">02 Nov 2021 to 31 Dec 2021<i
                                                    className="mdi mdi-chevron-down ms-1"></i></span>
                                            </a>
                                            <Box className="dropdown-menu dropdown-menu-end">
                                                <a className="dropdown-item" href="#">Today</a>
                                                <a className="dropdown-item" href="#">Last Week</a>
                                                <a className="dropdown-item" href="#">Last Month</a>
                                                <a className="dropdown-item" href="#">Current Year</a>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>

                                <Box className="card-body">
                                    <Box className="table-responsive table-card">
                                        <table
                                            className="table table-borderless table-hover table-nowrap align-middle mb-0">
                                            <thead className="table-light">
                                            <tr className="text-muted">
                                                <th scope="col">STT</th>
                                                <th scope="col">Tên Cổ đông</th>
                                                <th scope="col">CMND/CCCD</th>
                                                <th scope="col">Nội dung ý kiến</th>
                                                <th scope="col">Thời gian</th>
                                                <th scope="col">Số cổ phần</th>
                                                <th scope="col">Chức năng</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <td colSpan="9" className="text-center"><Typography
                                                    variant="subtitle1">Không
                                                    có dữ liệu!</Typography>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                        <Box className="col-xl-12">
                            <Box className="card">
                                <Box className="card-header align-items-center d-flex">
                                    <h4 className="mb-0 flex-grow-1"><b>THÔNG QUA THỦ TỤC KHAI MẠC</b></h4>
                                    <Box className="flex-shrink-0">
                                        <Box className="dropdown card-header-dropdown">
                                            <h6><b>KẾT QUẢ BIỂU QUYẾT TẠI ĐẠI HỘI</b></h6>
                                        </Box>
                                    </Box>
                                </Box>
                                <Box className="card-body">
                                    <Box className="table-responsive table-card">
                                        <table
                                            className="table table-borderless table-hover table-nowrap align-middle mb-0">
                                            <thead className="table-light">
                                            <tr className="text-muted">
                                                <th rowSpan="2" className="colSpan2">#</th>
                                                <th rowSpan="2" className="colSpan2">Nội dung biểu quyết</th>
                                                <th colSpan="2" className="textCenter">Tán thành
                                                </th>
                                                <th colSpan="2" className="textCenter">Không tán thành
                                                </th>
                                                <th colSpan="2" className="textCenter">Không ý kiến
                                                </th>

                                            </tr>
                                            <tr className="text-muted">
                                                <th className="textCenter">Số CP biểu quyết</th>
                                                <th className="textCenter">Tỷ lệ %</th>
                                                <th className="textCenter">Số CP biểu quyết</th>
                                                <th className="textCenter">Tỷ lệ %</th>
                                                <th className="textCenter">Số CP biểu quyết</th>
                                                <th className="textCenter">Tỷ lệ %</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <td>1</td>
                                                <td>Thông qua Chương trình Đại hội</td>
                                                <td>1.730</td>
                                                <td>89,6373%</td>
                                                <td>200</td>
                                                <td>10,3627%</td>
                                                <td>0</td>
                                                <td>0%</td>
                                            </tr>
                                            <tr>
                                                <td>2</td>
                                                <td>Thông qua quy chế tổ chức Đại hội</td>
                                                <td>1.730</td>
                                                <td>89,6373%</td>
                                                <td>0</td>
                                                <td>0%</td>
                                                <td>200</td>
                                                <td>10,3627%</td>
                                            </tr>
                                            <tr>
                                                <td>3</td>
                                                <td>Thông qua Chủ tọa đoàn</td>
                                                <td>1.730</td>
                                                <td>89,6373%</td>
                                                <td>200</td>
                                                <td>10,3627%</td>
                                                <td>0</td>
                                                <td>0%</td>
                                            </tr>
                                            <tr>
                                                <td>4</td>
                                                <td>Thông qua Ban thư ký</td>
                                                <td>1.730</td>
                                                <td>89,6373%</td>
                                                <td>0</td>
                                                <td>0%</td>
                                                <td>200</td>
                                                <td>10,3627%</td>
                                            </tr>
                                            <tr>
                                                <td>5</td>
                                                <td>Thông qua Ban kiểm phiếu</td>
                                                <td>1.730</td>
                                                <td>89,6373%</td>
                                                <td>200</td>
                                                <td>10,3627%</td>
                                                <td>0</td>
                                                <td>0%</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                        <Box className="col-xl-12">
                            <Box className="card">
                                <Box className="card-header align-items-center d-flex">
                                    <h4 className="mb-0 flex-grow-1"><b>KẾT QUẢ KIỂM PHIẾU</b></h4>
                                    <Box className="flex-shrink-0">
                                        <Box className="dropdown card-header-dropdown">
                                            <h6><b>KẾT QUẢ BIỂU QUYẾT TẠI ĐẠI HỘI</b></h6>
                                        </Box>
                                    </Box>
                                </Box>

                                <Box className="card-body">
                                    <Box className="table-responsive table-card">
                                        <table
                                            className="table table-borderless table-hover table-nowrap align-middle mb-0">
                                            <thead className="table-light">
                                            <tr className="text-muted">
                                                <th rowSpan="2" className="colSpan2">#</th>
                                                <th rowSpan="2" className="colSpan2">Nội dung biểu quyết</th>
                                                <th colSpan="2" className="textCenter">Tán thành
                                                </th>
                                                <th colSpan="2" className="textCenter">Không tán thành
                                                </th>
                                                <th colSpan="2" className="textCenter">Không ý kiến
                                                </th>

                                            </tr>
                                            <tr className="text-muted">
                                                <th className="textCenter">Số CP biểu quyết</th>
                                                <th className="textCenter">Tỷ lệ %</th>
                                                <th className="textCenter">Số CP biểu quyết</th>
                                                <th className="textCenter">Tỷ lệ %</th>
                                                <th className="textCenter">Số CP biểu quyết</th>
                                                <th className="textCenter">Tỷ lệ %</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <td>1</td>
                                                <td>Tờ trình phân phối lợi nhuận</td>
                                                <td>630</td>
                                                <td>75,9036%</td>
                                                <td>200</td>
                                                <td>24,0964%</td>
                                                <td>0</td>
                                                <td>0%</td>
                                            </tr>
                                            <tr>
                                                <td>2</td>
                                                <td>Báo cáo hoạt động của HĐQT năm 2022 và kế hoạch năm 2023</td>
                                                <td>630</td>
                                                <td>75,9036%</td>
                                                <td>0</td>
                                                <td>0%</td>
                                                <td>200</td>
                                                <td>24,0964%</td>
                                            </tr>
                                            <tr>
                                                <td>3</td>
                                                <td>Báo cáo của Ban điều hành Công ty về tình hình, kết quả hoạt động sản xuất kinh doanh năm 2022 và kế hoạch SXKD năm 2023.</td>
                                                <td>630</td>
                                                <td>75,9036%</td>
                                                <td>200</td>
                                                <td>24,0964%</td>
                                                <td>0</td>
                                                <td>0%</td>
                                            </tr>
                                            <tr>
                                                <td>4</td>
                                                <td>Báo cáo của Ủy ban kiểm toán</td>
                                                <td>630</td>
                                                <td>75,9036%</td>
                                                <td>0</td>
                                                <td>0%</td>
                                                <td>200</td>
                                                <td>10,3627%</td>
                                            </tr>
                                            <tr>
                                                <td>5</td>
                                                <td>Tờ trình thông qua Báo cáo tài chính đã kiểm toán năm 2022</td>
                                                <td>630</td>
                                                <td>75,9036%</td>
                                                <td>200</td>
                                                <td>24,0964%</td>
                                                <td>0</td>
                                                <td>0%</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                        <Box className="col-xl-12">
                            <Box className="card">
                                <Box className="card-header align-items-center d-flex">
                                    <h4 className="mb-0 flex-grow-1"><b>BẦU CỬ</b></h4>
                                </Box>

                                <Box className="card-body">
                                    <Box className="table-responsive table-card">
                                        <table
                                            className="table table-borderless table-hover table-nowrap align-middle mb-0">
                                            <thead className="table-light">
                                            <tr className="text-muted">
                                                <th scope="col">STT</th>
                                                <th scope="col">Họ và tên</th>
                                                <th scope="col">Số phiếu bầu</th>
                                                <th scope="col">Tỷ lệ (%)</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            </tbody>
                                        </table>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                        <Box className="col-xl-12">
                            <Box className="card">
                                <Box className="card-header align-items-center d-flex">
                                    <h4 className="mb-0 flex-grow-1"><b>THỦ TỤC BẾ MẠC</b></h4>
                                    <Box className="flex-shrink-0">
                                        <Box className="dropdown card-header-dropdown">
                                            <h6><b>KẾT QUẢ BIỂU QUYẾT TẠI ĐẠI HỘI</b></h6>
                                        </Box>
                                    </Box>
                                </Box>

                                <Box className="card-body">
                                    <Box className="table-responsive table-card">
                                        <table
                                            className="table table-borderless table-hover table-nowrap align-middle mb-0">
                                            <thead className="table-light">
                                            <tr className="text-muted">
                                                <th rowSpan="2" className="colSpan2">#</th>
                                                <th rowSpan="2" className="colSpan2">Nội dung biểu quyết</th>
                                                <th colSpan="2" className="textCenter">Tán thành
                                                </th>
                                                <th colSpan="2" className="textCenter">Không tán thành
                                                </th>
                                                <th colSpan="2" className="textCenter">Không ý kiến
                                                </th>

                                            </tr>
                                            <tr className="text-muted">
                                                <th className="textCenter">Số CP biểu quyết</th>
                                                <th className="textCenter">Tỷ lệ %</th>
                                                <th className="textCenter">Số CP biểu quyết</th>
                                                <th className="textCenter">Tỷ lệ %</th>
                                                <th className="textCenter">Số CP biểu quyết</th>
                                                <th className="textCenter">Tỷ lệ %</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <td>1</td>
                                                <td>Biên bản Đại hội động cổ đông thường niên 2023</td>
                                                <td>630</td>
                                                <td>36,4162%</td>
                                                <td>0</td>
                                                <td>0%</td>
                                                <td>1.100</td>
                                                <td>63,5838%</td>
                                            </tr>
                                            <tr>
                                                <td>2</td>
                                                <td>Nghị quyết Đại hội động cổ đông thường niên 2023</td>
                                                <td>630</td>
                                                <td>100%</td>
                                                <td>0</td>
                                                <td>0%</td>
                                                <td>0</td>
                                                <td>0%</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Footer></Footer>
        </Box>
    )
}

export default Home;
