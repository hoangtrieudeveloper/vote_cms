import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const showToast = (type, message) => {
    if (type === 'success') {
        toast.success(message, {
            theme: "colored",
            position: "bottom-right",
            autoClose: 5000,
        });
    } else {
        toast.error(message, {
            theme: "colored",
            position: "bottom-right",
            autoClose: 5000,
        });
    }
}

const validateExcelFile = (file) => {
    let excelExtension = ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
    if (file != null && excelExtension.includes(file.name)) {
        return true;
    }
    return false;
}

const formatNumber = (number) => {
    let value = parseInt(number);
    return number ? value.toLocaleString('it-IT', {currency: 'VND'}) : 0;
}

export default {
    showToast, formatNumber, validateExcelFile
};
