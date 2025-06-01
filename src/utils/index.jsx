import React from "react";

export const Loading = () => {
  return <div className="text-[50px] text-center pt-4">Loading... <span className="loader"></span></div>;
};
export const Suspense = ({ children }) => {
  return <React.Suspense fallback={<Loading />}>{children}</React.Suspense>;
};
