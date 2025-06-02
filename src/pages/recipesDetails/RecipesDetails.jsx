import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../api";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import toast from "react-hot-toast";

const RecipesDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Wishlist va Cart holatlari
  const [wishlist, setWishlist] = useState(() => {
    // localStorage'dan o'qish, agar kerak bo'lsa
    const saved = localStorage.getItem("wishlist");
    return saved ? JSON.parse(saved) : [];
  });
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  // Ma'lumotlarni olish
  useEffect(() => {
    setLoading(true);
    api
      .get(`/recipes/${id}`)
      .then((res) => {
        setRecipe(res.data);
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  // Wishlist toggle funksiyasi
  const toggleWishlist = (id) => {
    if (wishlist.includes(id)) {
      setWishlist(wishlist.filter((item) => item !== id));
      toast.info("Removed from Wishlist");
    } else {
      setWishlist([...wishlist, id]);
      toast.success("Added to Wishlist");
    }
  };

  // Cart toggle funksiyasi
  const toggleCart = (id) => {
    if (cart.includes(id)) {
      setCart(cart.filter((item) => item !== id));
      toast.error("Removed from Cart");
    } else {
      setCart([...cart, id]);
      toast.success("Added to Cart");
    }
  };

  // localStorage ga yozish har doim wishlist yoki cart o'zgarganda
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  if (loading) return <p className="text-center">Loading...🔄</p>;
  if (error)
    return <p className="text-center text-red-600">Error occurred.❌</p>;

  return (
    <div className="max-w-[1200px] mx-auto p-4 min-h-[100vh]">
      <h1 className="text-[28px] font-bold text-center my-6">{recipe?.name}</h1>
      <div className="flex gap-5 max-sm:flex-col">
        <div className="relative group sm:max-w-[400px] rounded-lg mb-4 overflow-hidden w-full shadow-[0px_2px_8px_3px_#8b3fd1]">
          <img
            src={recipe?.image}
            alt={recipe?.name}
            className="sm:max-w-[400px] hover:opacity-80 hover:scale-105 duration-300 cursor-pointer rounded-lg mb-4 w-full "
          />
          <div className="absolute top-0 right-0 flex justify-center gap-5 p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <FaHeart
              onClick={() => toggleWishlist(recipe?.id)}
              className={`text-[25px] cursor-pointer ${
                wishlist.includes(recipe?.id) ? "text-red-500" : "text-gray-900"
              }`}
            />
            <FaShoppingCart
              onClick={() => toggleCart(recipe?.id)}
              className={`text-[25px] cursor-pointer ${
                cart.includes(recipe?.id) ? "text-green-500" : "text-gray-900"
              }`}
            />
          </div>
        </div>
        <div className="flex flex-col border rounded-[5px] border-violet-600 p-3 shadow-[0px_2px_8px_3px_#8b3fd1]">
          <p className="text-[20px] mb-2">{recipe?.cuisine} Food</p>
          <p className="mb-2 text-[18px] font-semibold">Ingredients:</p>
          <ul className="list-disc list-inside space-y-1 mb-4">
            {recipe?.ingredients?.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
      <p className="text-[16px] text-gray-600 border rounded-[5px] border-violet-600 p-2 mt-4 shadow-[0px_2px_8px_3px_#8b3fd1]">
        <span className="text-[20px] font-semibold text-black">
          Instructions:{" "}
        </span>{" "}
        {recipe?.instructions}
      </p>
    </div>
  );
};

export default React.memo(RecipesDetails);
