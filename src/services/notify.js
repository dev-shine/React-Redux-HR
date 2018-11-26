
export function notify (title, text, type) {
  sweetAlert(title, text, type);
}

export function confirm (title, text, type,cancelText,confirmText,showCancelButton) {
  
  return new Promise((resolve, reject) => {
    swal({
      title:             title,
      text:              text,
      type:              type,
      showCancelButton:  showCancelButton || true,
      confirmButtonText: confirmText ||'OK',
      closeOnConfirm:    true,
      html:              true,
      cancelButtonText: cancelText || "Cancel"
    },
    (isConfirm) => {
      resolve(isConfirm);
    });
  });
}
