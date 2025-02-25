
import { toast, ToastContainer, Flip } from "react-toastify";

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
