import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SummaryApi from "../common";
import { FaStar, FaStarHalf } from "react-icons/fa";
import displayUSDCurrency from "../helpers/displayCurrency";
import VerticalCardProduct from "../components/VerticalCardProduct";
import CategoryWiseProductDisplay from "../components/CategoryWiseProductDisplay";
import addToCart from "../helpers/addToCart";
import Context from "../context";

const ProductDetails = () => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: "",
  });
  const nav = useNavigate()
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const productImageList = new Array(4).fill(null);
  const [activeImage, setActiveImage] = useState("");
  const [zoomImageCoordinates, setZoomImageCoordinate] = useState({
    x: 0,
    y: 0,
  });
  const [zoomImage, setZoomImage] = useState(false);
  console.log("productId", params);
  const { fetchUserAddToCart } = useContext(Context);
  const fetchProductDetails = async () => {
    setLoading(true);

    const productId = encodeURIComponent(params?.id.trim());

    const response = await fetch(SummaryApi.productDetails.url, {
      method: SummaryApi.productDetails.method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        productId: productId,
      }),
    });

    const dataResponse = await response.json();
    setData(dataResponse?.data);
    setActiveImage(dataResponse?.data?.productImage[0]);
    setLoading(false);
  };



  useEffect(() => {
    fetchProductDetails();
  }, [params.id]);

  const handleMouseEnterProduct = (imageURl) => {
    setActiveImage(imageURl);
  };

  const handleZoomImage = useCallback((e) => {
    setZoomImage(true);
    const { left, top, width, height } = e.target.getBoundingClientRect();
    console.log("coordinates", left, top, width, height);
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    setZoomImageCoordinate({
      x,
      y,
    });
  }, []);

  const handleLeaveImageZoom = useCallback(() => {
    setZoomImage(false);
  }, []);

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
  };

  const handleBuyProduct = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
    nav("/cart")
  };
  return (
    <div className="container mx-auto p-4">
      <div className="min-h-[200px] flex flex-col lg:flex-row gap-4">
        {/* product image */}
        <div className="h-96 flex flex-col lg:flex-row-reverse gap-4">
          <div className="h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 relative ">
            <div className="relative h-full w-full">
              <img
                src={activeImage}
                className="h-full w-full object-contain mix-blend-multiply"
                onMouseMove={handleZoomImage}
                onMouseLeave={handleLeaveImageZoom}
                alt=""
              />
              {/* product zoom  */}
              {zoomImage && (
                <div
                  className="hidden lg:block overflow-hidden absolute bg-slate-200 p-1"
                  style={{
                    top: "0",
                    right: "-410px",
                    width: "400px",
                    height: "400px",
                    clipPath: "inset(0 0 0 0)",
                  }}
                >
                  <div
                    className="w-full h-full mix-blend-multiply scale-125"
                    style={{
                      backgroundImage: `url(${activeImage})`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: `${zoomImageCoordinates.x * 100}% ${
                        zoomImageCoordinates.y * 100
                      }%`,
                    }}
                  ></div>
                </div>
              )}
            </div>
          </div>
          <div className="h-full">
            {loading ? (
              <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full ">
                {productImageList.map((el, index) => (
                  <div
                    className="h-20 w-20 bg-slate-200 rounded animate-pulse"
                    key={index}
                  ></div>
                ))}
              </div>
            ) : (
              <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full ">
                {data?.productImage?.map((imageURl) => (
                  <div
                    className="h-20 w-20 bg-slate-200 rounded p-1"
                    key={imageURl}
                  >
                    <img
                      src={imageURl}
                      alt=""
                      className="w-full h-full object-contain mix-blend-multiply cursor-pointer"
                      onMouseEnter={() => handleMouseEnterProduct(imageURl)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* product details */}
        {loading ? (
          <div className="flex flex-col gap-1 w-full">
            <p className="bg-slate-200 animate-pulse rounded-full h-6 w-full"></p>
            <h2 className="text-2xl lg:text-4xl font-medium capitalize h-6 bg-slate-200 animate-pulse rounded-full"></h2>
            <p className="capitalize text-slate-400 bg-slate-200 min-w-[100px]  h-6 rounded-full animate-pulse "></p>
            <div className="flex text-red-600 bg-slate-200 h-6 animate-pulse rounded-full items-center gap-1"></div>
            <div className="flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1 h-6 animate-pulse ">
              <p className="text-red-600 bg-slate-200 w-full h-full"></p>
              <p className="text-slate-400 line-through bg-slate-200 w-full h-full"></p>
            </div>
            <div className="flex items-center gap-3 ">
              <button className="h-6 bg-slate-200 rounded-full animate-pulse w-full"></button>
              <button className="h-6 bg-slate-200 rounded-full animate-pulse w-full"></button>
            </div>
            <div className="flex flex-col gap-3 w-full">
              <p className="h-6 bg-slate-200 rounded-full animate-pulse w-full"></p>
              <p className="h-16 bg-slate-200 rounded-full animate-pulse w-full"></p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-1">
            <p className="bg-red-200 text-red-600 px-2 rounded-full w-fit ">
              {data?.brandName}
            </p>
            <h2 className="text-2xl lg:text-4xl font-medium capitalize">
              {data?.productName}
            </h2>
            <p className="capitalize text-slate-400 ">{data?.category}</p>
            <div className="flex text-red-600 items-center gap-1">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStarHalf />
            </div>
            <div className="flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1  ">
              <p className="text-red-600">
                {displayUSDCurrency(data?.sellingPrice)}
              </p>
              <p className="text-slate-400 line-through">
                {displayUSDCurrency(data?.price)}
              </p>
            </div>
            <div className="flex items-center gap-3 my-2">
              <button onClick={(e) => handleBuyProduct(e, data._id)} className="border-2 border-red-600 rounded px-3 py-1 min-w-[130px] text-red-600 font-medium hover:bg-red-600 hover:text-white">
                Buy
              </button>
              <button
                onClick={(e) => handleAddToCart(e, data._id)}
                className="border-2 border-red-600 rounded px-3 py-1 min-w-[130px] bg-red-600 font-medium text-white hover:text-red-600 hover:bg-white"
              >
                Add To Cart
              </button>
            </div>
            <div>
              <p className="text-slate-600 font-medium my-1">Description : </p>
              <p>{data?.description}</p>
            </div>
          </div>
        )}
      </div>
      {data?.category && (
        <CategoryWiseProductDisplay
          category={data?.category}
          heading={"Recommended Products"}
        />
      )}
    </div>
  );
};

export default ProductDetails;
