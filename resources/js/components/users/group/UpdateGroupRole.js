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

    return (<Box>
        <Box className="page-wrapper">
            <Box className="main-content">
                <ToastNotifi></ToastNotifi>
                <Loading load={loading}></Loading>
                <Box className="row">
                    <Box className="colxl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <Box className="page-title-wrapper mb-0">
                            <Box className="page-title-box">
                                <Link to="/list-group-role"
                                      className="btn btn-info squer-btn mt-2 mr-2 sm-btn"><i
                                    className={"fas fa-arrow-left"}></i>
                                </Link>
                                <Typography color='#1F2738' variant='h5' sx={{
                                    lineHeight: 2.0,
                                    fontWeight: 700,
                                    pr: 2
                                }} className="page-title bold"> Cập nhật nhóm quyền</Typography>
                            </Box>
                        </Box>
                    </Box>
                    <Box className="col-xl-12">
                        <Box className="card">
                            <Box className="card-content">
                                <Box className="card-body p-1">
                                    <Box className="ad-auth-form">
                                        <Box className="ad-auth-feilds mb-30">
                                            <label htmlFor="member-email" className="col-form-label"><b>Tên nhóm
                                                quyền <Typography variant="span" color="red">*</Typography></b></label>
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
                                    <Box className="ad-auth-form">
                                        <Box className="choose-scope col-md-12">
                                            <label><b>Quyền</b></label>
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
                        </Box>
                    </Box>
                    <Box className={"juscontent-right"}>
                        <LoadingButton
                            onClick={updateGroup}
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
                            {!loading ? 'Cập nhật' : ''}
                        </LoadingButton>
                    </Box>
                </Box>
            </Box>
        </Box>
    </Box>)
}

export default UpdateGroupRole;
