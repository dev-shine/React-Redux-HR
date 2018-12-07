import swal from 'sweetalert';

export function notify (title, text, type) {
  swal(title, text, type);
}

export function confirm (title, text, type,cancelText,confirmText) { 
  return new Promise((resolve, reject) => {
    swal({
      title:             title,
      text:              text,
      type:              type,
      showCancelButton:  true,
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
