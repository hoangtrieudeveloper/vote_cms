import React, {Component, useEffect, useState} from 'react';
import {
    Box,
    Button,
    Typography,
    TextField,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import {storageService} from "../../model/storageService";

function RegionOption({...props}) {
    const [listRegion, setListRegion] = useState([]);
    const [region, setRegion] = useState('');
    const getListRegionAction = () => {
        storageService.getListRegion()
            .then(
                data => {
                    if (data.status == 1) {
                        setListRegion(data.data);
                    }
                }
            );
    }
    const isChangeRegion = (e) => {
        localStorage.setItem("region", JSON.stringify({value: e.target.value || ''}));
        setRegion(e.target.value || '');
        storageService.createOwnUser({customerId : props.customerid,region: e.target.value});
        window.location.reload();
    }
    //useEffect
    useEffect(() => {
        const checkRegionExit = JSON.parse(localStorage.getItem('region'));
        setRegion(checkRegionExit?.value);
        getListRegionAction();
    }, []);

    return <TextField
        fullWidth
        id="outlined-select-currency"
        select
        label="Lựa chọn khu vực"
        onChange={e => isChangeRegion(e)}
        value={region}
    >
        {listRegion.map((option) => (
            <MenuItem key={option.region_name} value={option.region_name}
                      disabled={option.is_enabled == 0 ? true : false}>
                {option.display_name}
            </MenuItem>
        ))}
    </TextField>;
}

export default RegionOption;
