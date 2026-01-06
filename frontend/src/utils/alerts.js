import Swal from "sweetalert2";

export const errorAlert = (message) =>
  Swal.fire({
    icon: "error",
    title: "Oops!",
    text: message,
  });

export const successAlert = (message) =>
  Swal.fire({
    icon: "success",
    title: "Success",
    text: message,
    timer: 1500,
    showConfirmButton: false,
  });

export const confirmDelete = () =>
  Swal.fire({
    title: "Are you sure?",
    text: "This task will be permanently deleted.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#ef4444",
    confirmButtonText: "Yes, delete it",
  });
