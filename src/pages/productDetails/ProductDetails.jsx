import React, { useEffect, useState } from "react";
import { api } from "../../api";
import { useParams } from "react-router-dom";
import { FaHeart, FaShoppingCart } from "react-icons/fa";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectImg, setSelectImg] = useState(0);

  useEffect(() => {
    setLoading(true);
    api
      .get(`/products/${id}`)
      .then((res) => {
        console.log(res);
        setProduct(res.data);
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);
  if (loading) return <p className="text-center">Loading...🔄</p>;
  if (error)
    return <p className="text-center text-red-600">Error occurred.❌</p>;

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
              className="w-20"
            />
          ))}
        </div>
      </div>
      <div className="w-[50%] max-sm:w-[100%] mb-4">
        <h1 className="text-[24px] font-semibold mb-3">
          {product?.brand} {product?.title} from {product?.category}
        </h1>
        <p className="text-[16px] text-gray-600 my-2">{product?.description}</p>
        <p className="text-gray-400 my-2">{product?.warrantyInformation}</p>
        <div className="flex items-center  justify-between">
          <p className="text-[20px]">
            Price:{" "}
            <span className="text-green-500 text-2xl font-bold">
              ${product?.price}
            </span>
          </p>
          <div className="flex gap-6">
            <FaHeart className="text-[25px] text-[#9c5ada] cursor-pointer hover:scale-110 duration-300" />
            <FaShoppingCart className="text-[25px] text-[#9c5ada] cursor-pointer hover:scale-110 duration-300" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ProductDetails);
