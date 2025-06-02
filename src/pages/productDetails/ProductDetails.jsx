import React, { useEffect, useState } from "react";
import { api } from "../../api";
import { useParams } from "react-router-dom";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toggleWishlist } from "../../redux/features/wishlist.slice";
import { addToCart, removeFromCart } from "../../redux/features/cart.slice";
import toast from "react-hot-toast";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectImg, setSelectImg] = useState(0);

  const wishlistItems = useSelector((state) => state.wishlist.items);
  const cartItems = useSelector((state) => state.cart.items);

  const isInWishlist = (productId) => wishlistItems.some((item) => item.id === productId);
  const isInCart = (productId) => cartItems.some((item) => item.id === productId);

  useEffect(() => {
    setLoading(true);
    api
      .get(`/products/${id}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

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

  if (loading) return <p className="text-center">Loading...🔄</p>;
  if (error) return <p className="text-center text-red-600">Error occurred.❌</p>;

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-10 flex gap-6 justify-center max-sm:flex-col">
      <div className="w-[50%] max-sm:w-[100%]">
        <img
          src={product?.images[selectImg]}
          alt="productImg"
          className="w-full max-h-[450px]"
        />
        <div className="flex gap-6 justify-center mt-5">
          {product?.images?.map((item, inx) => (
            <img
              key={inx}
              src={item}
              onClick={() => setSelectImg(inx)}
              alt="ProductImg"
              className="w-20 cursor-pointer border-2"
              style={{ borderColor: selectImg === inx ? "#9c5ada" : "transparent" }}
            />
          ))}
        </div>
      </div>
      <div className="w-[50%] max-sm:w-[100%] mb-4 border border-violet-600 p-3 rounded-[5px] shadow-[0px_2px_8px_3px_#9c5ada]">
        <h1 className="text-[24px] font-semibold mb-3">
          {product?.brand} {product?.title} from {product?.category}
        </h1>
        <p className="text-[16px] text-gray-600 my-2">{product?.description}</p>
        <p className="text-gray-400 my-2">{product?.warrantyInformation}</p>
        <div className="flex items-center justify-between">
          <p className="text-[20px]">
            Price:{" "}
            <span className="text-green-500 text-2xl font-bold">
              ${product?.price}
            </span>
          </p>
          <div className="flex gap-6">
            <FaHeart
              onClick={() => handleWishlist(product)}
              className={`text-[25px] cursor-pointer transition duration-300 ${
                isInWishlist(product?.id)
                  ? "text-red-500"
                  : "text-gray-400 hover:text-red-500"
              }`}
              title={isInWishlist(product?.id) ? "Remove from Wishlist" : "Add to Wishlist"}
            />
            <FaShoppingCart
              onClick={() => handleCartToggle(product)}
              className={`text-[25px] cursor-pointer transition duration-300 ${
                isInCart(product?.id)
                  ? "text-green-500"
                  : "text-gray-400 hover:text-green-500"
              }`}
              title={isInCart(product?.id) ? "Remove from Cart" : "Add to Cart"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ProductDetails);
