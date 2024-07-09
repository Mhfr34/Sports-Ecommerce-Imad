import React from "react";
import img from "../assest/success.gif";
import { Link } from "react-router-dom";
const Success = () => {
  return (
    <div className="bg-slate-200 w-full max-w-md mx-auto flex justify-center items-center flex-col p-4 m-2">
      <img
        src={img}
        alt=""
        width={180}
        height={180}
        className="mix-blend-multiply"
      />
      <p className="text-blue-600 font-bold text-xl">Payment Successfully</p>
      <Link to={"/order"} className="p-2 my-2 border-2 border-blue-600 mt-5 px-3 font-semibold text-blue-600 rounded hover:text-white hover:bg-blue-600">
        See Orders
      </Link>
    </div>
  );
};

export default Success;
