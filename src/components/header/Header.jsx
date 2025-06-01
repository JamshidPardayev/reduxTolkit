import React from "react";
import logo from "../../assets/logo.png";
import { Link, NavLink } from "react-router-dom";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { IoMdMenu } from "react-icons/io";
import "./style.css";

const Header = () => {
  return (
    <div className="max-w-[1200px] min-h-[80px] mx-auto px-4 flex items-center justify-between ">
      <Link to={"/"}>
        <img src={logo} alt="" className="h-[70px] max-sm:h-[60px]" />
      </Link>
      <ul className="flex gap-x-5 text-gray-800 font-semibold text-[20px] max-sm:hidden">
        <li className="relative before:absolute before:left-0 before:bottom-0 before:w-[0%] before:h-[2px] before:bg-[#6900cc] before:duration-300 hover:before:w-[100%]">
          <NavLink to={"/products"} className={"headerLink"}>Products</NavLink>
        </li>
        <li className="relative before:absolute before:left-0 before:bottom-0 before:w-[0%] before:h-[2px] before:bg-[#6900cc] before:duration-300 hover:before:w-[100%]">
          <NavLink to={"/recipes"} className={"headerLink"}>Recipes</NavLink>
        </li>
      </ul>
      <div className="flex gap-8 items-center">
        <div>
          <Link to={"/wishlist"}>
            <FaHeart className="text-[25px] text-gray-600 hover:text-[#6900cc] cursor-pointer duration-300 " />
          </Link>
        </div>
        <div>
          <Link to={"/carts"}>
            <FaShoppingCart className="text-[25px] text-gray-600 hover:text-[#6900cc] cursor-pointer duration-300 " />
          </Link>
        </div>
        <IoMdMenu className="hidden max-sm:block text-[30px] text-gray-600 hover:text-[#6900cc] cursor-pointer duration-300 " />
      </div>
    </div>
  );
};

export default React.memo(Header);
