import React from "react";
import logo from "../../assets/logo.png";
import { Link, NavLink } from "react-router-dom";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { IoMdMenu } from "react-icons/io";
import { useSelector } from "react-redux";
import "./style.css";

const Header = () => {
  // Redux store dan wishlist va cart itemlar sonini olish
  const wishlistCount = useSelector((state) => state.wishlist.items.length);
  const cartCount = useSelector((state) => state.cart.items.length);

  return (
    <div className="max-w-[1200px] min-h-[80px] mx-auto px-4 flex items-center justify-between ">
      <Link to={"/"}>
        <img src={logo} alt="" className="h-[70px] max-sm:h-[60px]" />
      </Link>
      <ul className="flex gap-x-5 text-gray-800 font-semibold text-[20px] max-sm:hidden">
        <li className="relative before:absolute before:left-0 before:bottom-0 before:w-[0%] before:h-[2px] before:bg-[#6900cc] before:duration-300 hover:before:w-[100%]">
          <NavLink to={"/products"} className={"headerLink"}>
            Products
          </NavLink>
        </li>
        <li className="relative before:absolute before:left-0 before:bottom-0 before:w-[0%] before:h-[2px] before:bg-[#6900cc] before:duration-300 hover:before:w-[100%]">
          <NavLink to={"/recipes"} className={"headerLink"}>
            Recipes
          </NavLink>
        </li>
      </ul>
      <div className="flex gap-8 items-center">
        <div className="relative">
          <Link to={"/wishlist"}>
            <FaHeart className="text-[25px] text-gray-600 hover:text-[#6900cc] cursor-pointer duration-300 " />
          </Link>
          {wishlistCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[12px] font-bold rounded-full px-1.5 min-w-[18px] h-[18px] flex items-center justify-center">
              {wishlistCount > 99 ? "99+" : wishlistCount}
            </span>
          )}
        </div>
        <div className="relative">
          <Link to={"/carts"}>
            <FaShoppingCart className="text-[25px] text-gray-600 hover:text-[#6900cc] cursor-pointer duration-300 " />
          </Link>
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-green-600 text-white text-[12px] font-bold rounded-full px-1.5 min-w-[18px] h-[18px] flex items-center justify-center">
              {cartCount > 99 ? "99+" : cartCount}
            </span>
          )}
        </div>
        <IoMdMenu className="hidden max-sm:block text-[30px] text-gray-600 hover:text-[#6900cc] cursor-pointer duration-300 " />
      </div>
    </div>
  );
};

export default React.memo(Header);
