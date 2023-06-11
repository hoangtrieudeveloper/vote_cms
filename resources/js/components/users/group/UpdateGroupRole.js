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
import Checkbox from '@mui/material/Checkbox';
import Loading from "../../pages/Loading";
import Helpers from "../../pages/Helpers";
import ToastNotifi from "../../pages/ToastNotifi";

const label = {inputProps: {'aria-label': 'Checkbox demo'}};

function UpdateGroupRole() {
    const params = new URLSearchParams(window.location.search);
    const [idObject, setIdObject] = useState({
        id: params.get('id') || "",
    });
    const [scopesData, setScopesData] = useState([]);
    const [dataList, setDataList] = useState([]);
    const [scopeList, setScopeList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState('');
    const [object, setObject] = useState({
        name: "",
        scope: "",
        id: ""
    });

    const {name, scope} = object;
    const onInputChange = e => {
        setObject({...object, [e.target.name]: e.target.value});
    };
    const handleCheckboxChange = (value, parent, routeParent) => {
        const newList = scopesData.map((item, key) => {
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
        setScopesData(newList);
    };

    async function updateGroup() {
        let listScope = [];
        scopesData.map((item) => {
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
        if (object.name === '') {
            Helpers.showToast('error', 'Vui lòng nhập tên nhóm quyền!');
        } else if (scopeList.length === 0) {
            Helpers.showToast('error', 'Vui lòng chọn quyền!');
        } else {
            setLoading(true);
            object.scope = listScope;
            object.id = idObject.id;
            userService.updateGroupRole(object)
                .then(
                    data => {
                        setLoading(false);
                        if (data?.status == 1) {
                            Helpers.showToast('success', data?.messager);
                            setObject({name: "", scope: "", id: ""});
                            setScopeList([]);
                            setScopesData([]);
                            setDataList([]);
                            getByidGroup(idObject);
                            setTimeout(() => {
                                setErrors('');
                            }, 10000)
                        } else {
                            Helpers.showToast('error', data?.messager);
                            setErrors(data);
                        }
                    }
                );
        }
    }

    const getByidGroup = (id) => {
        userService.getByidGroupRole(id)
            .then(
                data => {
                    if (data.status == 1) {
                        setDataList(data.data);
                        setScopeList(data.data.curent);
                        data.data.scopes.map((item) => {
                            if (data.data.curent.includes(item.route)) {
                                item.checked = true;
                                item.children.map((i) => {
                                    if (data.data.curent.includes(i.route)) i.checked = true; else i.checked = false;
                                })
                            } else {
                                item.checked = false
                                item.children.map((i) => {
                                    if (data.data.curent.includes(i.route)) i.checked = true; else i.checked = false;
                                })
                            }
                        })
                        setScopesData(data.data.scopes);
                        setObject({name: data?.data?.group?.group_name, scope: "", id: ""})
                    }
                }
            );
    }
    //useEffect
    useEffect(() => {
        setIdObject({id: params.get('id')})
        getByidGroup(idObject);
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
                                    <li className="breadcrumb-item active">Cập nhật</li>
                                </ol>
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Box className="row">
                    <Box className="col-lg-12">
                        <Box className="card">
                            <Box className="card-header">
                                <h4 className="card-title mb-0">Cập nhật nhóm quyền</h4>
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
                                                    {scopesData.map((i, id) => (
                                                        <Box className="scope-root col-md-3 mb-2" key={id}>
                                                            <Box className="d-flex">
                                                                <Checkbox {...label}
                                                                          className={"p-0"}
                                                                          value={i['route']}
                                                                          checked={i['checked']}
                                                                          onChange={e => handleCheckboxChange(e.target.value, 'parent', i['route'])}/>
                                                                &nbsp;
                                                                <Typography variant={"span"}
                                                                            className="p-2 text-primary"><b>{i['name']}</b></Typography>
                                                            </Box>
                                                            {i.children.map((it, d) => (
                                                                <Box key={d} className="d-flex ml2r">
                                                                    <Checkbox {...label} className={"p-0"}
                                                                              value={it['route']}
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
                                                <button type="button"
                                                        onClick={updateGroup}
                                                        disabled={loading}
                                                        className="btn btn-primary waves-effect waves-ligh ">
                                                    {!loading ? 'Cập nhật' : ''}
                                                </button>
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

export default UpdateGroupRole;
