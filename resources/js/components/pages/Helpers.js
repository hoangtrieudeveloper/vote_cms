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

export default {
    showToast
};
