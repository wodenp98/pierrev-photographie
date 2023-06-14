// "use client";
// import { Divide as Hamburger } from "hamburger-react";
// import { useState } from "react";

// type MenuItemProps = {
//   label: string;
//   onClick: () => void;
// };

// const MenuItem = ({ label, onClick }: MenuItemProps) => {
//   return (
//     <button
//       onClick={onClick}
//       className="block py-2 px-4 text-gray-700 hover:bg-gray-100"
//     >
//       {label}
//     </button>
//   );
// };

// export const Menu = () => {
//   const [isOpen, setOpen] = useState(false);

//   const toggleMenu = () => {
//     setOpen(!isOpen);
//   };

//   const handleItemClick = () => {
//     // handle menu item click here
//   };

//   return (
//     <div>
//       <Hamburger
//         toggled={isOpen}
//         toggle={toggleMenu}
//         duration={0.8}
//         size={26}
//         label="Voir menu"
//       />

//       {isOpen && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-3">
//           <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
//             <div className="w-3/4 bg-white shadow-lg p-4">
//               <MenuItem label="Page 1" onClick={handleItemClick} />
//               <MenuItem label="Page 2" onClick={handleItemClick} />
//               <MenuItem label="Page 3" onClick={handleItemClick} />
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

export const Menu = ({ onClick }: any) => {
  return (
    <button
      onClick={onClick}
      className="text-gray-500 hover:text-gray-700 focus:outline-none"
    >
      Menu
    </button>
  );
};
