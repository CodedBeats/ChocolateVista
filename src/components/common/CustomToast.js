import { Bounce, Slide, toast } from 'react-toastify';

let CustomToast = (message, type) => {
    if (type === "success") {
        const notifyToast = () => toast.success(message, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: "dark",
            transition: Slide,
        });
        notifyToast();
    }
    else if (type === "warning") {
        const notifyToast = () => toast.warn(message, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: "dark",
            transition: Slide,
        });
        notifyToast();
    }
}

export default CustomToast;