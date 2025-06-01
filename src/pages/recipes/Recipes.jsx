import React from "react";
import { useFetch } from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import vector from "../../assets/vector.png";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
const Recipes = () => {
  const { data, error, loading } = useFetch("/recipes");
  const navigate = useNavigate();
  return (
    <div className="max-w-[1200px] mx-auto px-4">
      <h1 className="text-[30px] mx-auto font-semibold text-center ">
        Recipes
      </h1>
      <img src={vector} alt="vectorImg" className="mx-auto mt-3 mb-10 " />
      {loading && <p>Loading...</p>}

      {error && (
        <p className="text-red-500 text-2xl text-center my-4">
          Failed to load products. Please try again.
        </p>
      )}
      <div className="grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-4">
        {data?.recipes?.map((recipe) => (
          <div
            key={recipe?.id}
            className="border max-w-[350px] max-sm:mx-auto border-violet-600 rounded-[10px] p-3 shadow-[0px_2px_8px_3px_#9c5ada]"
          >
            <div className="relative max-w-[350px] overflow-hidden group">
              <img
                src={recipe?.image}
                alt={recipe?.name}
                className="hover:scale-105 hover:opacity-80 duration-300 cursor-pointer w-full h-auto"
              />
              <div className="absolute top-0 right-0 flex justify-center gap-5 p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <FaHeart className="text-[25px] text-gray-900 cursor-pointer" />
                <FaShoppingCart className="text-[25px] text-gray-900 cursor-pointer" />
              </div>
            </div>
            <h1 className="text-2xl line-clamp-1 text-center my-4 font-semibold text-gray-900">
              {recipe?.title}
            </h1>
            <button
              className={`relative overflow-hidden px-6 h-[40px] w-full rounded-xl text-gray-900 border border-violet-600 font-semibold bg-transparent group transition-colors duration-300 cursor-pointer shadow-[0px_2px_8px_3px_#8b3fd1]`}
              onClick={() => {
                navigate(`recipesDetails/${recipe?.id}`);
              }}
            >
              <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                See More
              </span>

              <span className="absolute inset-0 w-full h-full translate-y-[100%] group-hover:translate-y-[0] transition-transform duration-700 ease-out z-0 pointer-events-none">
                <svg
                  className="absolute inset-0 w-[200%] h-full"
                  viewBox="0 0 1200 100"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0,10 C150,40 350,0 500,20 C650,40 850,0 1200,10 L1200,100 L0,100 Z"
                    fill="#6900cc"
                    style={{
                      opacity: 0.6,
                      animation: "wave1 12s linear infinite",
                    }}
                  />
                  <path
                    d="M0,20 C250,0 450,40 700,10 C950,40 1050,20 1200,20 L1200,100 L0,100 Z"
                    fill="#6900cc"
                    style={{
                      opacity: 0.4,
                      animation: "wave2 10s linear infinite",
                    }}
                  />
                  <path
                    d="M0,40 C350,10 450,40 650,30 C850,20 950,50 1200,40 L1200,100 L0,100 Z"
                    fill="#6900cc"
                    style={{
                      opacity: 0.8,
                      animation: "wave3 8s linear infinite",
                    }}
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

export default React.memo(Recipes);
