import { toast } from "react-toastify";
import { translate } from "./translate";

const showToast = (type, message) => {
  if (message && message !== "") {
    toast[type]?.(translate(message, type), {
      position: "top-right",
      autoClose: type === "error" ? 5000 : 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: document.documentElement.classList.contains("dark")
        ? "dark"
        : "light",
    });
  } else {
    if (type === "dismiss") toast.dismiss();
  }
};

export { showToast };
