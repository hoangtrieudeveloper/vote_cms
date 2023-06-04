import React from "react";
import {Box} from "@mui/material";
import {Link} from "react-router-dom";

export default function Pagination({...props}) {
    const {getListData,linkPage,pageCurrent,pageLast} = props;
    return (
        <Box className="row">
            <Box className="d-flex justify-content-end">
                <Box className="pagination-wrap hstack gap-2">
                    <ul className="pagination listjs-pagination mb-0">
                        {linkPage?.map((i, index) => {
                            return (
                                <li key={index}
                                    className={i.active === true ? "active" : ""}>
                                    <Link
                                        to="#"
                                        onClick={() => getListData(index === 0 ? (pageCurrent > 1 ? Math.round(parseInt(pageCurrent) - 1) : 1) : (pageLast === (index - 1) ? (pageCurrent < pageLast ? Math.round(parseInt(pageCurrent) + 1) : pageLast) : index))}
                                        className={index === 0 ? "page-item pagination-prev" :(i.label === "Next &raquo;" ? "page-item pagination-next" : "page")}>
                                        {index === 0 ? "Previous" :(i.label === "Next &raquo;" ? "Next" : i.label)}
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </Box>
            </Box>
        </Box>
    );
}

