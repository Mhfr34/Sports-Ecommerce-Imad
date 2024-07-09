import React, { useState } from "react";
import { MdModeEditOutline } from "react-icons/md";
import AdminEditProduct from "./AdminEditProduct";
import displayUSDCurrency from "../helpers/displayCurrency";

const AdminProductCard = ({ data, fetchData }) => {
  const [editProduct, setEditProdcut] = useState(false);
  return (
    <div className="bg-white p-4 rounded ">
      <div className="w-40">
      <div className="w-32 h-32 flex justify-center items-center">
      <img
          src={data?.productImage[0]}
          width={120}
          height={120}
          className="mx-auto object-contain h-full"
        />
      </div>
        <h1 className="text-ellipsis line-clamp-2">{data.productName}</h1>
        <div>
          <p className="font-semibold">
            {displayUSDCurrency(data.sellingPrice)}
          </p>
          <div
            className="w-fit ml-auto p-2 bg-green-100 cursor-pointer hover:bg-green-600 hover:text-white rounded-full"
            onClick={() => setEditProdcut(true)}
          >
            <MdModeEditOutline />
          </div>
        </div>
      </div>
      {editProduct && (
        <AdminEditProduct
          productData={data}
          onClose={() => setEditProdcut(false)}
          fetchData={fetchData}
        />
      )}
    </div>
  );
};

export default AdminProductCard;
