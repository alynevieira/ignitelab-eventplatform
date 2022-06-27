import classNames from "classnames";
import { List, X } from "phosphor-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Logo } from "./Logo";
import { Sidebar } from "./Sidebar";

export function Header() {
  const [toggleSidebar, setToggleSidebar] = useState(false);

  const handleToggle = () => {
    setToggleSidebar(!toggleSidebar);
  }

  return (
    <header className="w-full p-5 flex items-center justify-between md:justify-center bg-gray-700 border-b border-gray-600">
      <Link to={'/'}>
        <Logo />
      </Link>

      <div className="block md:hidden" onClick={handleToggle}>
        {toggleSidebar ? (
          <X size={32} color="#81D8F7" />
        ) : (
          <List size={32} color="#81D8F7" />
        )}
      </div>

      <div className={classNames("z-[100] xl:hidden fixed top-[75px] pb-[75px] overflow-scroll right-0 w-full h-full bg-gray-700 transition-all duration-500 ease-in-out", {
        "translate-x-[60px]": toggleSidebar,
        "translate-x-full": !toggleSidebar
      })}>
        <div className="flex flex-col w-full">
          <Sidebar />
        </div>
      </div>

    </header>
  )
}