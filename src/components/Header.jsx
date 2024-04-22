import { useState } from "react";
import { Link } from "react-router-dom";
import { IoSearch, IoPersonCircle } from "react-icons/io5";
import { TbCoin } from "react-icons/tb";
import { SearchInput } from "./Input";

function Header({ username, search, searchOnChange }) {
  const [ShowInput, setShowInput] = useState(false);

  return (
    <>
      <header className="flex flex-row items-center p-2 justify-between">
        {/* Link to Dashboard */}
        <Link
          to={"/dashboard"}
          className="w-16 min-w-16 h-16"
          title="Dashboard"
        >
          <picture>
            <img
              src="/logo.svg"
              alt="Ofical Logo of Pixel Art Maker"
              className="drop-shadow-md"
            />
          </picture>
        </Link>
        {/* Search Bar for Medium Size Screen */}
        {search && <SearchInput size={"md"} onChange={searchOnChange} />}
        <div className="flex flex-row items-center gap-5">
          {/* Search Button to activate the mobile search bar */}
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
          {/* Link to Subscription Page */}
          <Link
            to={"/subscription"}
            className={`grid place-items-center rounded-full p-2 hover:scale-105 transition-all rounded-ful`}
            title="Subscription"
          >
            <TbCoin className="w-8 h-8" />
          </Link>
          {/* Link to Users Page */}
          <Link
            to={"/user/profile"}
            className="flex flex-row items-center gap-2 border-2 border-black dark:border-white p-2 rounded-full hover:scale-105 transition-all max-w-52"
            title="Profile"
          >
            <IoPersonCircle className="w-8 h-8" />
            <span>{username}</span>
          </Link>
        </div>
      </header>
      {/* Mobile search bar */}
      <div className="p-2">
        {ShowInput && <SearchInput size={"sm"} onChange={searchOnChange} />}
      </div>
    </>
  );
}

export default Header;
