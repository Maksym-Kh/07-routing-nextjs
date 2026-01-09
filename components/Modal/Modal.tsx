import { useEffect } from "react";
import css from "./Modal.module.css";
import { createPortal } from "react-dom";

interface Props {
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ onClose, children }: Props) {
  const modalRootElem = document.querySelector("#modal-root") as HTMLDivElement;

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const handleEsc = (e: KeyboardEvent) => {
      if (e.code === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  return createPortal(
    <div
      className={css.backdrop}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    modalRootElem
  );
}
