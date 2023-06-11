import React from "react";
import {Box} from "@mui/material";
import {Link} from "react-router-dom";

export default function Modals({...props}) {
    const {listVotes, user} = props;
    return (
        <Box id="voteDataModals" className="modal fade" tabIndex="-1" aria-hidden="true">
            <Box className="modal-dialog modal-dialog-centered modal-lg">
                <Box className="modal-content border-0 overflow-hidden">
                    <Box className="modal-header p-3">
                        <h4 className="card-title mb-0 mt-3">XEM KẾT QUẢ BIỂU QUYẾT</h4>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </Box>
                    <Box className="modal-body">
                        <Box className="mx-3">
                            <Box className="mb-3">
                                <p>Phiếu biểu quyết của Cổ đông <b>{user?.name}</b></p>
                            </Box>
                            {listVotes && listVotes?.map((value, key) => (
                                <Box className="mb-3 p-3 row"
                                     sx={{backgroundColor: 'rgb(222, 227, 246)', justifyContent: 'center'}} key={key}>
                                    <Box className="col-10">
                                        <p className="m-0">{value?.name_vn}</p>
                                    </Box>
                                    <Box className="col-2" sx={{textAlign:'end'}}>
                                        <span className={`badge badge-pill p-2 ${value?.status?.class}`}>{value?.status?.text}</span>
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

