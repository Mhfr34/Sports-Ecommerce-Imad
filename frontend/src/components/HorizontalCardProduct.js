import React, { useContext, useEffect, useRef, useState } from "react";
import fetchCategoryWiseProduct from "../helpers/fetchCategoryWiseProduct";
import displayUSDCurrency from "../helpers/displayCurrency";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import addToCart from "../helpers/addToCart";
import Context from "../context";

const HorizontalCardProduct = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const loadingList = new Array(13).fill(null);

  const [scroll, setScroll] = useState(0);
  const scrollElement = useRef();

  const { fetchUserAddToCart } = useContext(Context);
  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
  };


  const fetchData = async () => {
    setLoading(true);
    const categoryProduct = await fetchCategoryWiseProduct(category);
    setLoading(false);

    setData(categoryProduct.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const scrollRight = () => {
    scrollElement.current.scrollLeft += 300;
  };
  const scrollLeft = () => {
    scrollElement.current.scrollLeft -= 300;
  };
  return (
    <div className="container mx-auto px-4 my-6 relative ">
      <h2 className="text-2xl font-semibold py-4">{heading}</h2>

      <div
        className="flex items-center gap-4 md:gap-6 overflow-scroll scrollbar-none transition-all"
        ref={scrollElement}
      >
        <button
          onClick={scrollLeft}
          className="bg-white shadow-md rounded-full text-black p-1 absolute left-0 text-lg hidden md:block"
        >
          <FaAngleLeft />
        </button>
        <button
          onClick={scrollRight}
          className="bg-white shadow-md rounded-full text-black p-1 absolute right-0 text-lg hidden md:block"
        >
          <FaAngleRight />
        </button>
        {loading
          ? loadingList.map((product, index) => {
              return (
                <div className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white flex rounded-sm shadow">
                  <div className="bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px] animate-pulse  "></div>
                  <div className="p-4 capitalize grid w-full gap-2">
                    <h2 className="font-semibold md:text-lg animate-pulse text-base text-ellipsis line-clamp-1 bg-slate-200 "></h2>
                    <p className="text-slate-500 p-1 bg-slate-200"></p>
                    <div className="flex gap-3 w-full">
                      <p className="text-red-600 w-full font-medium p-1 bg-slate-200"></p>
                      <p className="text-slate-500 line-through p-1 bg-slate-200 w-full "></p>
                    </div>
                    <button className="text-sm w-full text-white px-3 py-0.5 rounded-full bg-slate-200"></button>
                  </div>
                </div>
              );
            })
          : data.map((product, index) => {
              return (
                <Link
                  to={"product/" + product?._id}
                  className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white flex rounded-sm shadow"
                >
                  <div className="bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px]  ">
                    <img
                      src={product.productImage[0]}
                      alt=""
                      className="object-contain h-full hover:scale-125 hover:transition-all cursor-pointer"
                    />
                  </div>
                  <div className="p-4 capitalize grid">
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
    </div>
  );
};

export default HorizontalCardProduct;
