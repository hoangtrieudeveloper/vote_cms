import ReactDOM from "react-dom";
import React from "react";
import Layout from "./components/Layout";

require('./bootstrap');
require('./components/Layout');
if (document.getElementById('layoutApp')) {
    ReactDOM.render(
        <Layout/>,
        document.getElementById('layoutApp'));
}
