import { useState } from "react";
import { Link } from "react-router-dom";
import { IoSearch, IoPersonCircle } from "react-icons/io5";
import { SearchInput } from "./Input";

function Header({ username, search, searchOnChange }) {
  const [ShowInput, setShowInput] = useState(false);

  return (
    <>
      <header className="flex flex-row items-center p-2 justify-between">
        <Link to={"/dashboard"} className="w-16 min-w-16 h-16">
          <picture>
            <img
              src="../logo.svg"
              alt="Ofical Logo of Pixel Art Maker"
              className="drop-shadow-md"
            />
          </picture>
        </Link>
        {search && <SearchInput size={"md"} onChange={searchOnChange} />}
        <div className="flex flex-row items-center gap-5">
          {search && (
            <button
              className={`md:hidden hover:scale-105 transition-all rounded-full ${
                ShowInput && "border-2 border-black dark:border-white p-2"
              }`}
              onClick={() => setShowInput(!ShowInput)}
            >
              <IoSearch className="w-8 h-8" />
            </button>
          )}
          <Link
            to={"/user/profile"}
            className="flex flex-row items-center gap-2 border-2 border-black dark:border-white p-2 rounded-full hover:scale-105 transition-all max-w-52"
          >
            <IoPersonCircle className="w-8 h-8" />
            <span>{username}</span>
          </Link>
        </div>
      </header>
      <div className="p-2">
        {ShowInput && <SearchInput size={"sm"} onChange={searchOnChange} />}
      </div>
    </>
  );
}

export default Header;
