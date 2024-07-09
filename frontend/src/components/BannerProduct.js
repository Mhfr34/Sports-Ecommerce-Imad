import React, { useEffect, useState } from "react";
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";
import image1 from "../assest/banner/img10.jpg";
import image2 from "../assest/banner/img12.jpg";
import image3 from "../assest/banner/img11.jpg";
import image4 from "../assest/banner/img9.jpg";
import image5 from "../assest/banner/img8.png";

import image1Mobile from "../assest/banner/img1_mobile.jpg";
import image2Mobile from "../assest/banner/img2_mobile.webp";
import image3Mobile from "../assest/banner/img3_mobile.jpg";
import image4Mobile from "../assest/banner/img4_mobile.jpg";
import image5Mobile from "../assest/banner/img5_mobile.png";

const BannerProduct = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const desktopImages = [image1, image2, image3, image4, image5];
  const mobileImages = [
    image1Mobile,
    image2Mobile,
    image3Mobile,
    image4Mobile,
    image5Mobile,
  ];
  const nextImage = () => {
    if (desktopImages.length - 1 > currentImage) {
      setCurrentImage((prev) => prev + 1);
    }
  };
  const previousImage = () => {
    if (currentImage != 0) {
        setCurrentImage((prev) => prev - 1);
      }
  };
  useEffect(() => {
const  interval = setInterval(() =>{
    if (desktopImages.length - 1 > currentImage) {
        nextImage()
    }else{
        setCurrentImage(0)
    }
},5000)
return () => clearInterval(interval)
  },[currentImage])
  return (
    <div className="container mx-auto px-4 rounded ">
      <div className="h-56 md:h-72 w-full bg-slate-200 relative">
        <div className="absolute z-10 text-white h-full w-full md:flex items-center hidden ">
          <div className="flex justify-between w-full text-2xl">
            <button
              onClick={previousImage}
              className="bg-white shadow-md rounded-full text-black p-1"
            >
              <FaAngleLeft />
            </button>
            <button
              onClick={nextImage}
              className="bg-white shadow-md rounded-full text-black p-1"
            >
              <FaAngleRight />
            </button>
          </div>
        </div>

{/* desktop and tablet version */}

        <div className="hidden md:flex h-full w-full overflow-hidden">
          {desktopImages.map((imageURl, index) => {
            return (
              <div
                className="w-full h-full min-w-full min-h-full transition-all"
                key={imageURl}
                style={{ transform: `translateX(-${currentImage * 100}%)` }}
              >
                <img src={imageURl} className="w-full h-full" />
              </div>
            );
          })}
        </div>

{/* mobile verion */}

        <div className="flex h-full w-full overflow-hidden md:hidden">
          {mobileImages.map((imageURl, index) => {
            return (
              <div
                className="w-full h-full min-w-full min-h-full transition-all"
                key={imageURl}
                style={{ transform: `translateX(-${currentImage * 100}%)` }}
              >
                <img src={imageURl} className="w-full h-full object-fill" />
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default BannerProduct;
