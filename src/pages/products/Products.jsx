import React, { useEffect } from "react";
import { useFetch } from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import vector from "../../assets/vector.png";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toggleWishlist, setWishlist } from "../../redux/features/wishlist.slice";
import { addToCart, removeFromCart, setCart } from "../../redux/features/cart.slice";
import toast from "react-hot-toast";

const Products = () => {
  const { data, error, loading } = useFetch("/products");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const wishlistItems = useSelector((state) => state.wishlist.items);
  const cartItems = useSelector((state) => state.cart.items);

  useEffect(() => {
    const savedWishlist = localStorage.getItem("wishlistItems");
    if (savedWishlist) {
      dispatch(setWishlist(JSON.parse(savedWishlist)));
    }
    const savedCart = localStorage.getItem("cartItems");
    if (savedCart) {
      dispatch(setCart(JSON.parse(savedCart)));
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("wishlistItems", JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const isInWishlist = (productId) =>
    wishlistItems.some((item) => item.id === productId);
  const isInCart = (productId) =>
    cartItems.some((item) => item.id === productId);

  const handleWishlist = (product) => {
    const alreadyInWishlist = isInWishlist(product.id);
    dispatch(toggleWishlist(product));
    if (alreadyInWishlist) {
      toast.error("Wishlistdan o‘chirildi!");
    } else {
      toast.success("Wishlistga qo‘shildi!");
    }
  };

  const handleCartToggle = (product) => {
    if (isInCart(product.id)) {
      dispatch(removeFromCart(product));
      toast.error("Savatdan o‘chirildi!");
    } else {
      dispatch(addToCart(product));
      toast.success("Savatga qo‘shildi!");
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4">
      <h1 className="text-[30px] font-semibold text-center">Products</h1>
      <img src={vector} alt="vectorImg" className="mx-auto mt-3 mb-10" />

      {loading && <p>Loading...</p>}
      {error && (
        <p className="text-red-500 text-2xl text-center my-4">
          Failed to load products. Please try again.
        </p>
      )}

      <div className="grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-4">
        {data?.products?.map((product) => (
          <div
            key={product?.id}
            className="border max-w-[350px] max-sm:mx-auto border-violet-600 rounded-[10px] p-3 shadow-[0px_2px_8px_3px_#9c5ada]"
          >
            <div className="relative overflow-hidden group">
              <img
                src={product?.images[0]}
                alt={product?.title}
                className="hover:scale-105 duration-300 w-full"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-end items-start gap-4 p-3">
                <FaHeart
                  onClick={() => handleWishlist(product)}
                  className={`text-[25px] cursor-pointer transition duration-300 ${
                    isInWishlist(product.id)
                      ? "text-red-500"
                      : "text-white hover:text-red-500"
                  }`}
                />
                <FaShoppingCart
                  onClick={() => handleCartToggle(product)}
                  className={`text-[25px] cursor-pointer transition duration-300 ${
                    isInCart(product.id)
                      ? "text-green-500"
                      : "text-white hover:text-green-500"
                  }`}
                />
              </div>
            </div>
            <h1 className="text-2xl text-center my-4 font-semibold text-gray-900 line-clamp-1">
              {product?.title}
            </h1>
            <button
              className="relative overflow-hidden px-6 h-[40px] w-full rounded-xl text-gray-900 border border-violet-600 font-semibold bg-transparent group transition-colors duration-300 shadow-[0px_2px_8px_3px_#8b3fd1]"
              onClick={() => navigate(`/productDetails/${product?.id}`)}
            >
              <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                See More
              </span>
              <span className="absolute inset-0 w-full h-full translate-y-[100%] group-hover:translate-y-0 transition-transform duration-700 ease-out z-0 pointer-events-none">
                <svg
                  className="absolute inset-0 w-[200%] h-full"
                  viewBox="0 0 1200 100"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0,10 C150,40 350,0 500,20 C650,40 850,0 1200,10 L1200,100 L0,100 Z"
                    fill="#6900cc"
                    style={{ opacity: 0.6, animation: "wave1 12s linear infinite" }}
                  />
                  <path
                    d="M0,20 C250,0 450,40 700,10 C950,40 1050,20 1200,20 L1200,100 L0,100 Z"
                    fill="#6900cc"
                    style={{ opacity: 0.4, animation: "wave2 10s linear infinite" }}
                  />
                  <path
                    d="M0,40 C350,10 450,40 650,30 C850,20 950,50 1200,40 L1200,100 L0,100 Z"
                    fill="#6900cc"
                    style={{ opacity: 0.8, animation: "wave3 8s linear infinite" }}
                  />
                </svg>
              </span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(Products);
