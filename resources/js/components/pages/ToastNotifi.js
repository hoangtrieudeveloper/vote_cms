import React, {Component, useEffect, useState} from 'react';
import {ToastContainer} from "react-toastify";

function ToastNotifi({...props}) {
    return <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
    />;
}

export default ToastNotifi;
