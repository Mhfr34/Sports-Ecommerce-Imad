import React from 'react'
import {Link } from "react-router-dom"
import cancelimg from "../assest/cancel.gif"

const Cancel = () => {
  return (
    <div className="bg-slate-200 w-full max-w-md mx-auto flex justify-center items-center flex-col p-4 m-2">
      <img
        src={cancelimg}
        alt=""
        width={180}
        height={180}
        className="mix-blend-multiply"
      />
      <p className="text-red-600 font-bold text-xl">Payment Canceled</p>
      <Link to={"/cart"} className="p-2 my-2 border-2 border-red-600 mt-5 px-3 font-semibold text-red-600 rounded hover:text-white hover:bg-red-600">
       Go To Cart
      </Link>
    </div>
  );
}

export default Cancel
