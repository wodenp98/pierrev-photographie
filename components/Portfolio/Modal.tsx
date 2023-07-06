export const Modal = ({ open, children }: any) => {
  return (
    <div
      className={`fixed z-50 inset-0 flex justify-center items-center transition-colors ${
        open ? "visible bg-black/20" : "invisible"
      }`}
    >
      {open && children}
    </div>
  );
};
