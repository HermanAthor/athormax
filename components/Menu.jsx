import { menuState } from "@/providers/state-providers/RecoilStateProviders/context/RecoilContextStore";
import { IconButton, Select } from "@chakra-ui/react";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import { useRecoilState } from "recoil";

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
  const [openMenu, setOpenMenu] = useRecoilState(menuState);
  const workingOnit = () => {
    setOpenMenu(false);
    alert("Sorry, we are working on this please try again later");
  };
  return (
    <div className="fixed top-6 left-0 md:w-fit w-full  text-black flex flex-col justify-between rounded-xl bg-slate-300 dark:bg-inherit h-screen overflow-auto pl-5 animate__animated animate__fadeInLeft">
      <div className="flex flex-col text-2xl">
        <div className="flex justify-between items-center text-black px-3 pt-2">
          <div></div>
          <IconButton onClick={() => setOpenMenu(false)}>
            <CloseIcon className="text-2xl md:text-4xl hover:text-red-400" />
          </IconButton>
        </div>

        <div className="pr-10 rounded pt-8">
          <Select className="text-3xl  " id="genre" placeholder="Genres">
            {menuData.map((menu) => (
              <option
                className=" cursor-auto hover:underline"
                value={menu.title}
                key={menu.title}
              >
                {menu.title}
              </option>
            ))}
          </Select>
        </div>
        <a onClick={() => workingOnit()} className="pl-3 pt-2 cursor-pointer">
          Movies
        </a>
        <a onClick={() => workingOnit()} className="pl-3 pt-2 cursor-pointer">
          Series
        </a>
        <a onClick={() => workingOnit()} className="pl-3 pt-2 cursor-pointer">
          My Watch list
        </a>
      </div>
      <div className="flex flex-col pb-10 gap-7">
        <div className="flex flex-row items-center gap-3 ">
          <img
            src="/hermandp.jpg"
            alt="herman"
            className=" h-5 w-5 md:h-12 md:w-12 object-cover border-2 border-blue-600 rounded-full"
          />
          <h6>Herman</h6>
        </div>
        <p>
          &copy;
          {`${new Date().getFullYear()} HAGmax. All rights reserved.`}
        </p>
      </div>
    </div>
  );
}

export default Menu;
