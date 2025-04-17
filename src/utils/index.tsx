
import { toast, Flip, ToastOptions } from "react-toastify";

export const phases = ["Cartographie", "Exploration", "Experimentation"];

export const ShowError = () => {
    return toast.error(
        <p className="text-white tx-16 mb-0">{"Veuillez remplir tous les champs"}</p>,
        {
            autoClose: 5000,
            position: toast.POSITION.TOP_CENTER,
            hideProgressBar: false,
            transition: Flip,
            theme: "colored",
        }
    );
}

/**
 * Affiche un toast avec un message et un type spécifiés.
 *
 * @param message
 * @param type
 * @param options
 */
export const showToast = (message: string, type: "success" | "error" | "warning" | "info" | "default" = "default", options?: ToastOptions) => {
    const defaultOptions: ToastOptions = {
        autoClose: 5000,
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: false,
        transition: Flip,
        theme: "colored",
    };

    const combinedOptions = { ...defaultOptions, ...options };

    switch (type) {
        case "success":
            toast.success(message, combinedOptions);
            break;
        case "error":
            toast.error(message, combinedOptions);
            break;
        case "warning":
            toast.warning(message, combinedOptions);
            break;
        case "info":
            toast.info(message, combinedOptions);
            break;
        default:
            toast(message, combinedOptions);
            break;
    }
};
