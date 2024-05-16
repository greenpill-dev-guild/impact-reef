import React from "react";

export interface DialogProps {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

export const Dialog: React.FC<DialogProps> = ({ id, children, onClose }) => {
  const dialog = document.getElementById(id) as HTMLDialogElement;

  dialog.onclose = onClose;

  return (
    <dialog id={id} className="modal">
      <div className="modal-box">{children}</div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};
