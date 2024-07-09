import React, { useContext } from "react";
import { Link } from "react-router-dom";
import scrollTop from "../helpers/scrollTop";
import displayUSDCurrency from "../helpers/displayCurrency";
import Context from "../context";
import addToCart from "../helpers/addToCart";

const VerticalCard = ({ loading , data = [] }) => {
  const loadingList = new Array(13).fill(null);
  const { fetchUserAddToCart } = useContext(Context);
  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
  };
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,300px))] justify-center md:justify-between md:gap-4 overflow-x-scroll scrollbar-none transition-all">
      {loading
        ? loadingList.map((product, index) => {
            return (
              <div className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px]  bg-white  rounded-sm shadow">
                <div className="bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex animate-pulse  justify-center items-center "></div>
                <div className="p-4 capitalize grid gap-3">
                  <h2 className="font-semibold md:text-lg text-base text-ellipsis py-2 line-clamp-1 p-1 animate-pulse rounded-full bg-slate-200"></h2>
                  <p className="text-slate-500 p-1 animate-pulse rounded-full bg-slate-200 py-2"></p>
                  <div className="flex gap-3">
                    <p className="text-red-600 py-2 font-medium p-1 animate-pulse rounded-full bg-slate-200 w-full"></p>
                    <p className="text-slate-500 line-through p-1 animate-pulse rounded-full bg-slate-200 w-full"></p>
                  </div>
                  <button className="text-sm w-full text-white px-3 py-2 rounded-full bg-slate-200  "></button>
                </div>
              </div>
            );
          })
        : data.map((product, index) => {
            return (
              <Link
                to={"/product/" + product?._id}
                className="w-full min-w-[280px] md:min-w-[300px] max-w-[280px] md:max-w-[300px]  bg-white  rounded-sm shadow "
                onClick={scrollTop}
              >
                <div className="bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex  justify-center items-center ">
                  <img
                    src={product.productImage[0]}
                    alt=""
                    className="object-contain h-full hover:scale-125 hover:transition-all cursor-pointer mix-blend-multiply"
                  />
                </div>
                <div className="p-4 capitalize grid gap-3">
                  <h2 className="font-semibold md:text-lg text-base text-ellipsis line-clamp-1 ">
                    {product?.productName}
                  </h2>
                  <p className="text-slate-500">{product.category}</p>
                  <div className="flex gap-3">
                    <p className="text-red-600 font-medium">
                      {displayUSDCurrency(product?.sellingPrice)}
                    </p>
                    <p className="text-slate-500 line-through">
                      {displayUSDCurrency(product?.price)}
                    </p>
                  </div>
                  <button
                    onClick={(e) => handleAddToCart(e, product?._id)}
                    className="text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-0.5 rounded-full"
                  >
                    Add To Cart
                  </button>
                </div>
              </Link>
            );
          })}
    </div>
  );
};

export default VerticalCard;
