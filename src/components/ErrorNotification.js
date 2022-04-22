import React from "react";
import Swal from "sweetalert2";

const ErrorNotification = () => {
  return Swal.fire({
    icon: "error",
    title: "Error",
    text: "Something went wrong",
  });
};

export default ErrorNotification;
