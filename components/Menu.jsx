import { IconButton } from "@chakra-ui/react";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";

const menuData = [
  { title: "Comedy", href: "#" },
  { title: "Drama", href: "#" },
  { title: "Action", href: "#" },
  { title: "Horror", href: "#" },
  { title: "Thriller", href: "#" },
  { title: "Science-Fiction", href: "#" },
  { title: "Crime", href: "#" },
  { title: "Romance", href: "#" },
];

function Menu() {
  return (
    <div className="fixed top-6 left-0 md:w-fit w-full bg-white text-black flex flex-col ">
      <div className="flex justify-between items-center text-black px-3 pt-2">
        <div></div>
        <IconButton>
          <CloseIcon className="text-2xl md:text-4xl hover:text-red-400" />
        </IconButton>
      </div>
      <ul className="text-3xl px-8 py-2 ">
        {menuData.map((menu) => (
          <li className=" cursor-auto hover:underline" key={menu.title}>
            {menu.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Menu;
