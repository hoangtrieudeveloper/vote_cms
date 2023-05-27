import React, {Component, useEffect, useState} from 'react';
import {
    Box,
    Button,
    Typography,
    TextField,
} from "@mui/material";
import {Link, useHistory} from 'react-router-dom';
import LoadingButton from "@mui/lab/LoadingButton";
import {userService} from "../../../model/userService";
import Checkbox from "@mui/material/Checkbox";
import Loading from "../../pages/Loading";
import Helpers from "../../pages/Helpers";
import ToastNotifi from "../../pages/ToastNotifi";
import MenuItem from "@mui/material/MenuItem";

const label = {inputProps: {'aria-label': 'Checkbox demo'}};

function CreateGroupRole() {
    const [dataList, setDataList] = useState([]);
    const [scopeList, setScopeList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState('');
    const [object, setObject] = useState({
        name: "",
        scope: "",
    });

    const {name, scope} = object;
    const onInputChange = e => {
        setObject({...object, [e.target.name]: e.target.value});
    };
    const handleCheckboxChange = (value, parent, routeParent) => {
        const newList = dataList.map((item, key) => {
            if (parent === 'parent') {
                if (item.route === routeParent) {
                    item.checked = !item.checked;
                    item.children.map((i) => {
                        i.checked = item.checked;
                    })
                }
            } else {
                if (item.route == routeParent) {
                    item.children.map((i) => {
                        if (i.route === value) {
                            i.checked = !i.checked;
                        }
                    })
                }
            }
            return item;
        });
        setDataList(newList);
    };

    async function createGroup() {
        let listScope = [];
        dataList.map((item) => {
            if (item.checked === true) {
                listScope.push(item.route);
                item.children.map((i) => {
                    if (i.checked === true) {
                        listScope.push(i.route);
                    }
                })
            } else {
                item.children.map((i) => {
                    if (i.checked === true) {
                        listScope.push(i.route);
                    }
                })
            }
        });
        setScopeList(listScope);
        if (object.name === '') {
            Helpers.showToast('error', 'Vui lòng nhập tên nhóm quyền!');
        } else if (scopeList.length === 0) {
            Helpers.showToast('error', 'Vui lòng chọn quyền!');
        } else {
            setLoading(true);
            object.scope = scopeList;
            userService.createGroupUser(object)
                .then(
                    data => {
                        setLoading(false);
                        if (data?.status == 1) {
                            Helpers.showToast('success', data?.messager);
                            setObject({name: "", scope: ""});
                            setScopeList([]);
                            setDataList([]);
                            getListGroupCreated();
                            setTimeout(() => {
                                setErrors('');
                            }, 10000)
                        } else {
                            Helpers.showToast('error', data?.messager);
                        }
                    }
                );
        }
    }

    const getListGroupCreated = () => {
        userService.getListTreeGroupRole()
            .then(
                data => {
                    if (data.status == 1) {
                        data.data.map((item) => {
                            item.checked = false;
                            item.children.map((i) => {
                                i.checked = false;
                            })
                        });
                        setDataList(data.data);
                    }
                }
            );
    }
    //useEffect
    useEffect(() => {
        getListGroupCreated();
    }, []);

    return (<Box className="main-content">
        <ToastNotifi></ToastNotifi>
        <Loading load={loading}></Loading>
        <Box className="page-content">
            <Box className="container-fluid">
                <Box className="row">
                    <Box className="col-12">
                        <Box className="page-title-box d-sm-flex align-items-center justify-content-between">
                            <Link to="/list-group-role"
                                  className="btn btn-info squer-btn mt-2 mr-2 sm-btn"><i
                                className={"fas fa-arrow-left"}></i> Quay lại
                            </Link>
                            <Box className="page-title-right">
                                <ol className="breadcrumb m-0">
                                    <li className="breadcrumb-item"><a href="#">Nhóm quyền</a></li>
                                    <li className="breadcrumb-item active">Tạo mới</li>
                                </ol>
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Box className="row">
                    <Box className="col-lg-12">
                        <Box className="card">
                            <Box className="card-header">
                                <h4 className="card-title mb-0">Tạo mới nhóm quyền</h4>
                            </Box>
                            <Box className="card-body">
                                <Box>
                                    <Box className="row">
                                        <Box className="col-xl-6">
                                            <Box className="mb-3">
                                                <label htmlFor="cleave-date" className="form-label"><b>Tên nhóm
                                                    quyền <Typography variant="span"
                                                                      color="red">*</Typography></b></label>
                                                <TextField
                                                    fullWidth
                                                    name="name"
                                                    type='text'
                                                    required
                                                    onChange={e => onInputChange(e)}
                                                    sx={{
                                                        'input': {
                                                            '&::placeholder': {
                                                                fontSize: 16,
                                                            }
                                                        },
                                                    }}
                                                    label="Tên nhóm quyền"
                                                    variant="outlined"
                                                    value={object.name}
                                                />
                                            </Box>
                                        </Box>
                                        <Box className="col-xl-12">
                                            <Box className="mb-3">
                                                <label htmlFor="cleave-date-format" className="form-label"><b>Quyền</b></label>
                                                <Box className="row">
                                                    {dataList.map((i, id) => (
                                                        <Box className="scope-root col-md-3 mb-2" key={id}>
                                                            <Box className="d-flex">
                                                                <Checkbox {...label} value={i['route']}
                                                                          className={"p-0"}
                                                                          checked={i['checked']}
                                                                          onChange={e => handleCheckboxChange(e.target.value, 'parent', i['route'])}/>
                                                                &nbsp;
                                                                <Typography variant={"span"}
                                                                            className="p-1 text-primary"><b>{i['name']}</b></Typography>
                                                            </Box>
                                                            {i.children.map((it, d) => (
                                                                <Box key={d} className="d-flex ml2r">
                                                                    <Checkbox {...label} value={it['route']}
                                                                              className={"p-0"}
                                                                              checked={it['checked']}
                                                                              onChange={e => handleCheckboxChange(e.target.value, '', i['route'])}/>
                                                                    &nbsp;
                                                                    <Typography variant={"span"}
                                                                                className="p-1"
                                                                                sx={{fontSize: 14}}>{it['name']}</Typography>
                                                                </Box>
                                                            ))}
                                                        </Box>
                                                    ))}
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                                <Box className="row">
                                    <Box className="col-xl-6">
                                        <Box className="mb-3 mb-xl-0">
                                            <Box className={"juscontent-right"}>
                                                <LoadingButton
                                                    onClick={createGroup}
                                                    className="ad-btn ad-login-member"
                                                    variant="outlined"
                                                    loading={loading}
                                                    disabled={loading}
                                                    sx={{
                                                        backgroundColor: '#11a1fd',
                                                        color: 'white',
                                                        fontSize: 13,
                                                        fontWeight: 400,
                                                    }}
                                                >
                                                    {!loading ? 'Khởi tạo' : ''}
                                                </LoadingButton>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    </Box>)
}

export default CreateGroupRole;
