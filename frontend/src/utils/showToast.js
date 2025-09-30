import { toast } from 'react-toastify';
import { translate } from './translate'; 

const showToast = (type, message) => {
  if (message && message !== "") {
    toast[type]?.(translate(message, type), {
      position: "top-right",
      autoClose: 3000,  
    });
  } else {
    if (type === "dismiss") toast.dismiss();
  }
};

export { showToast };
