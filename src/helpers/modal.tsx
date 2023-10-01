import Swal from "sweetalert2";

export const confirmModal = async ({
  msg,
  handler,
}: {
  msg: string;
  handler: any;
}) => {
  return Swal.fire({
    title: "Apakah anda Yakin ?",
    text: msg,
    icon: "warning",
    showCancelButton: true,
    cancelButtonText: "Batal",
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yakin",
  }).then((result) => {
    console.log(result.isConfirmed);
    console.log(result);
    if (result.isConfirmed) {
      handler();
    }
  });
};
