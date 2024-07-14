"use client";

import React, { forwardRef } from "react";

export interface DialogProps {
  id: string;
  className?: string;
  children?: React.ReactNode;
  style: React.CSSProperties;
}

export const Dialog = forwardRef<HTMLDialogElement, DialogProps>(
  ({ id, className, style, children }, ref) => {
    return (
      <dialog id={id} className="modal" ref={ref}>
        <div style={style} className={`modal-box ${className}`}>
          {children}
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    );
  }
);

Dialog.displayName = "Dialog Component";
