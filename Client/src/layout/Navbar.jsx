import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [hide, setHide] = useState(false);

  return (
    <nav
      className="fixed px-4 top-0 left-0 right-0 border-b-black shadow-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
      style={{ zIndex: "100" }}
    >
      <div className="flex justify-between relative flex-wrap md:flex-nowrap md:whitespace-nowrap items-center p-4">
        <div href="#" className="flex items-center gap-2">
          <Link
            to="/dashbopardhome"
            className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
          >
            Post Management <span className="text-[red] text-lg">App</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
