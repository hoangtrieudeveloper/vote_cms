import React, {Component, useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {
    Box
} from "@mui/material";

function Paginate({...props}) {
    return <Box className="row">
        <Box className="col-sm-12">
            <Box>
                <Box>
                    <Box className="int-blog-pagination">
                        <ul className="pagination">
                            {props.linkPage.map((i, index) => (
                                <li className={i.active === true ? "page-item active" : 'page-item'} key={index}>
                                    <Link
                                        onClick={() => {
                                            props.pageCurentRollBack(index === 0 ? (props.pageCurrent > 1 ? Math.round(parseInt(props.pageCurrent) - 1) : 1) : (props.pageLast === (index - 1) ? (props.pageCurrent < props.pageLast ? Math.round(parseInt(props.pageCurrent) + 1) : props.pageLast) : index))
                                        }}
                                        className={'page-link'}>{index === 0 ?
                                        'Previous' : (index === 14 ?
                                            <i className="fa fa-angle-double-right"
                                               aria-hidden="true"></i> : (i.label === "Next &raquo;" ?
                                                'Next' : i.label))}</Link>
                                </li>
                            ))}
                        </ul>
                    </Box>
                </Box>
            </Box>
        </Box>
    </Box>;
}

export default Paginate;
