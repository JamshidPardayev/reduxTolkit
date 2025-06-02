import React, { lazy } from "react";
import { Suspense } from "../utils";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const Layout = lazy(() => import("./layout/Layout"));
const Home = lazy(() => import("./home/Home"));
const Products = lazy(() => import("./products/Products"));
const ProductDetails = lazy(() => import("./productDetails/ProductDetails"));
const NotFound = lazy(() => import("./notFound/NotFound"));
const Wishlist = lazy(() => import("./wishlist/Wishlist"));
const Carts = lazy(() => import("./carts/Carts"));
const Recipes = lazy(() => import("./recipes/Recipes"))
const RecipesDetails = lazy(() => import("./recipesDetails/RecipesDetails"))
const MainRoutes = () => {
 
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />

      <Routes>
        <Route
          path="/"
          element={
            <Suspense>
              <Layout />
            </Suspense>
          }
        >
          <Route
            path="/"
            element={
              <Suspense>
                <Home />
              </Suspense>
            }
          />
          <Route
            path="products"
            element={
              <Suspense>
                <Products />
              </Suspense>
            }
          />
          <Route
            path="productDetails/:id"
            element={
              <Suspense>
                <ProductDetails />
              </Suspense>
            }
          />
          <Route
            path="recipes"
            element={
              <Suspense>
                <Recipes />
              </Suspense>
            }
          />
          <Route
            path="recipesDetails/:id"
            element={
              <Suspense>
                <RecipesDetails />
              </Suspense>
            }
          />

          <Route
            path="wishlist"
            element={
              <Suspense>
                <Wishlist />
              </Suspense>
            }
          />
          <Route
            path="carts"
            element={
              <Suspense>
                <Carts />
              </Suspense>
            }
          />
        </Route>

        <Route
          path="*"
          element={
            <Suspense>
              <NotFound />
            </Suspense>
          }
        />
      </Routes>
    </>
  );
};

export default React.memo(MainRoutes);
