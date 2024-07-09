import React, {
  useContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import { loadStripe } from "@stripe/stripe-js";
import SummaryApi from "../common";
import Context from "../context";
import displayUSDCurrency from "../helpers/displayCurrency";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";


const Cart = () => {
  const context = useContext(Context);
  const { fetchUserAddToCart } = useContext(Context);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [debouncedIds, setDebouncedIds] = useState({});

  // Memoize the loadingCart array
  const loadingCart = useMemo(
    () => new Array(context.cartProductCount).fill(null),
    [context.cartProductCount]
  );

  const fetchData = async () => {
    try {
      const response = await fetch(SummaryApi.addToCartProductDisplay.url, {
        method: "get",
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
      });
      const responseData = await response.json();
      if (responseData.success) {
        setData(responseData.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchData().finally(() => setLoading(false));
  }, []);

  const totalQty = data.reduce(
    (prevValue, currentValue) => prevValue + currentValue.quantity,
    0
  );

  const updateQuantity = useCallback(
    async (id, quantity) => {
      try {
        const response = await fetch(SummaryApi.updateAddToCartProduct.url, {
          method: SummaryApi.updateAddToCartProduct.method,
          credentials: "include",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            _id: id,
            quantity,
          }),
        });
        const responseData = await response.json();
        if (!responseData.success) {
          // If the request fails, revert the UI change
          fetchData();
        }
      } catch (error) {
        console.error("Error updating quantity:", error);
        // If the request fails, revert the UI change
        fetchData();
      }
    },
    [fetchData]
  );

  const increaseQty = (id, qty, event) => {
    event.preventDefault();
    const newQuantity = qty + 1;
    setData((prevData) =>
      prevData.map((product) =>
        product._id === id ? { ...product, quantity: newQuantity } : product
      )
    );

    if (debouncedIds[id]) {
      clearTimeout(debouncedIds[id]);
    }

    setDebouncedIds((prevDebouncedIds) => ({
      ...prevDebouncedIds,
      [id]: setTimeout(() => updateQuantity(id, newQuantity), 300),
    }));
  };

  const decreaseQty = (id, qty, event) => {
    event.preventDefault();
    if (qty > 1) {
      const newQuantity = qty - 1;
      setData((prevData) =>
        prevData.map((product) =>
          product._id === id ? { ...product, quantity: newQuantity } : product
        )
      );

      if (debouncedIds[id]) {
        clearTimeout(debouncedIds[id]);
      }

      setDebouncedIds((prevDebouncedIds) => ({
        ...prevDebouncedIds,
        [id]: setTimeout(() => updateQuantity(id, newQuantity), 300),
      }));
    }
  };

  const deleteProduct = async (id) => {
    try {
      const response = await fetch(SummaryApi.deleteAddToCartProduct.url, {
        method: SummaryApi.deleteAddToCartProduct.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          _id: id,
        }),
      });
      const responseData = await response.json();
      if (responseData.success) {
        toast.success(responseData.message);
        fetchData();
        fetchUserAddToCart();
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const totalPrice = data.reduce(
    (prev, curr) => prev + curr.quantity * curr?.productId?.sellingPrice,
    0
  );

  const handlePayment = async () => {
    const stripeApiKey = String(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
    const stripePromise = await loadStripe("pk_test_51PP3Z4042BSNdFTlzD0IphX4yCowLmyiMWjLoPrcETZvYwNxbPg2V6LNZmmgVtp0CvT6oGE1uOZhCIXKTqE1xJGQ00eVgfmz3o");
    const response = await fetch(SummaryApi.payment.url, {
      method: SummaryApi.payment.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        cartItems: data,
      }),
    });

    const responseData = await response.json();
    if (responseData?.id) {
      stripePromise.redirectToCheckout({
        sessionId: responseData?.id,
      });
    }
    console.log("payment response", responseData);
  };

  return (
    <div className="container mx-auto">
      <div className="text-center text-lg my-3 ">
        {data.length === 0 && !loading && (
          <p className="bg-white py-5">No Data</p>
        )}
      </div>
      <div className="flex flex-col lg:flex-row gap-10 lg:justify-between p-4">
        {/* View product */}
        <div className="w-full max-w-3xl">
          {loading
            ? loadingCart.map((_, index) => (
                <div
                  key={`loading-${index}`}
                  className="w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded"
                ></div>
              ))
            : data.map((product) => (
                <div
                  key={product?._id}
                  className="w-full bg-white h-32 my-2 border border-slate-300 rounded grid grid-cols-[128px,1fr] capitalize"
                >
                  <div className="w-32 h-32 bg-slate-200">
                    <img
                      src={product?.productId?.productImage[0]}
                      alt=""
                      className="w-full h-full object-contain mix-blend-multiply"
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                  <div className="px-4 py-2 relative">
                    {/* Delete Product */}
                    <div
                      className="absolute right-0 p-2 text-red-600 rounded-full hover:bg-red-600 hover:text-white cursor-pointer"
                      onClick={() => deleteProduct(product?._id)}
                    >
                      <MdDelete />
                    </div>
                    <h2 className="text-lg lg:text-xl text-ellipsis line-clamp-1">
                      {product?.productId?.productName}
                    </h2>
                    <p className="text-slate-500">
                      {product?.productId?.category}
                    </p>
                    <div className="flex justify-between items-center">
                      <p className="text-slate-700 font-medium text-lg">
                        {displayUSDCurrency(product?.productId?.sellingPrice)}
                      </p>
                      <p className="text-red-700 font-medium text-lg">
                        {displayUSDCurrency(
                          product?.productId?.sellingPrice * product?.quantity
                        )}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 mt-1">
                      <button
                        className="flex items-center justify-center p-1 border-red-600 border text-red-600 h-6 w-6 rounded-full hover:bg-red-600 hover:text-white transition duration-300 ease-in-out shadow-md"
                        onClick={(event) =>
                          decreaseQty(product?._id, product?.quantity, event)
                        }
                      >
                        -
                      </button>
                      <span className="mx-2">{product?.quantity}</span>
                      <button
                        onClick={(event) =>
                          increaseQty(product?._id, product?.quantity, event)
                        }
                        className="flex items-center justify-center p-2 border-green-600 border text-green-600 h-6 w-6 rounded-full hover:bg-green-600 hover:text-white transition duration-300 ease-in-out shadow-md"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
        </div>
        {/* Total product summary */}
        {data[0] && (
          <div className="mt-5 lg:mt-0 w-full max-w-sm">
            {loading ? (
              <div className="h-36 bg-slate-200 border border-slate-300 animate-pulse"></div>
            ) : (
              <div className="h-36 bg-white">
                <h2 className="text-white bg-red-600 px-4 py-1">Summary</h2>
                <div className="items-center justify-between flex px-4 font-medium text-lg text-slate-600 gap-2">
                  <p>Quantity</p>
                  <p>{totalQty}</p>
                </div>
                <div className="items-center justify-between flex px-4 font-medium text-lg text-slate-600 gap-2">
                  <p>Total Price</p>
                  <p>{displayUSDCurrency(totalPrice)}</p>
                </div>
                <button
                  onClick={handlePayment}
                  className="bg-blue-600 mt-6 p-2 text-white w-full"
                >
                  Payment
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
