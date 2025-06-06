import { toast, type ToastOptions } from "react-hot-toast";

type ToastType = "default" | "success" | "error";

interface ToastParams {
  text: string;
  duration?: number;
  type?: ToastType;
}

export function Toast({
  text,
  duration = 2000,
  type = "default",
}: ToastParams): void {
  const options: ToastOptions = {
    duration,
    position: "top-left",
    style: {
      border: "none",
      borderRadius: "10px",
      color: "white",
      paddingTop: "4px",
      backgroundColor: "#0f172a",
    },
    className: "customToast",
  };

  switch (type) {
    case "success":
      toast.success(text, options);
      break;
    case "error":
      toast.error(text, options);
      break;
    default:
      toast(text, options);
  }
}
