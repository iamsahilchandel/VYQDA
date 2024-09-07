import { useRef } from "react";

export default function Modal({
  closeModal,
  children,
}: {
  closeModal: () => void;
  children: React.ReactNode;
}) {
  const modalRef = useRef(null);

  function handleClose(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === modalRef.current) {
      closeModal();
    }
  }

  return (
    <div
      ref={modalRef}
      onClick={handleClose}
      className="z-50 fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center text-gray-900"
    >
      {children}
    </div>
  );
}
