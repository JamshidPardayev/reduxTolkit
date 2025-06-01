import React from "react";
import { useFetch } from "../../hooks/useFetch";

const Products = () => {
  const { data, error, loading } = useFetch("/products");

  return (
    <div>
      <h1 className="text-[30px] mx-auto font-semibold text-center">
        Products
      </h1>
      {loading && <p>Loading...</p>}

      {error && (
        <p className="text-red-500 text-2xl text-center my-4">
          Failed to load products. Please try again.
        </p>
      )}
      <div>
        {data?.products?.map((product) => (
          <div key={product?.id}>
            <h1 className="text-black">{product?.title}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(Products);
