export const Modal = ({ open, onClose, children }: any) => {
  return (
    <div
      onClick={onClose}
      className={`fixed z-50 inset-0 flex justify-center items-center transition-colors ${
        open ? "visible bg-black/20" : "invisible"
      }`}
    >
      {children}
    </div>
  );
};
