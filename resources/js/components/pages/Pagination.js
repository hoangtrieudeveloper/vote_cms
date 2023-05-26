import React from "react";
import {Box} from "@mui/material";
import {Link} from "react-router-dom";

export default function Pagination({...props}) {
    const {getListData,linkPage,pageCurrent,pageLast} = props;
    return (
        <Box className="row">
            <Box className="col-sm-12">
                <Box className="card">
                    <Box className="card-body juscontent-right d-flex">
                        <Box className="fb-pagination">
                            <ul className="pagination">
                                {linkPage?.map((i, index) => {
                                    return (
                                        <li key={index}
                                            className={i.active === true ? "page-item active" : "page-item"}>
                                            <Link
                                                to="#"
                                                onClick={() => getListData(index === 0 ? (pageCurrent > 1 ? Math.round(parseInt(pageCurrent) - 1) : 1) : (index > 2 ? (pageCurrent < pageLast ? Math.round(parseInt(pageCurrent) + 1) : pageLast) : i.label))}
                                                className={"page-link"}>{index === 0 ?
                                                <i className="fa fa-angle-double-left"></i>
                                                :
                                                (index === 14 ?
                                                    <i className="fa fa-angle-double-right"></i>
                                                    :
                                                    (i.label === "Next &raquo;" ?
                                                        <i className="fa fa-angle-double-right"></i>
                                                        : i.label))}
                                            </Link>
                                        </li>
                                    )
                                })}
                            </ul>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

