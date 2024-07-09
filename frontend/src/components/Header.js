import React, { useContext, useState } from "react";
import Logo from "./Logo";
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";
import ROLE from "../common/role";
import Context from "../context";
import img from "../assest/champions.png";
const Header = () => {
  const user = useSelector((state) => state?.user?.user);

  const dispatch = useDispatch();
  const [menu, showMenu] = useState(false);
  const context = useContext(Context);
  const nav = useNavigate();
  const searchInput = useLocation();
  const [search, setSearch] = useState(searchInput?.search?.split("=")[1]);

  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: "include",
    });

    const data = await fetchData.json();

    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
      nav("/login");
    }

    if (data.error) {
      toast.error(data.error);
    }
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value);
    if (value) {
      nav(`/search?q=${value}`);
    } else {
      nav("/");
    }
  };

  return (
    <header className="h-16 shadow-md bg-white fixed w-full z-40">
      <div className="h-full container mx-auto flex items-center px-4 justify-between">
        <div className="">
          <Link to={"/"}>
            <img src={img} alt="Champions Logo" className="h-12" />
          </Link>
        </div>
        <div className="hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2">
          <input
            type="text"
            placeholder="search product here..."
            className="w-full outline-none "
            onChange={handleSearch}
            value={search}
          />
          <div className="text-lg min-w-[50px] bg-red-600 h-8 flex items-center justify-center rounded-r-full text-white">
            <GrSearch />
          </div>
        </div>

        <div className="flex items-center gap-7">
          <div className="relative flex justify-center">
            {user?._id && (
              <div
                className="text-3xl cursor-pointer relative flex justify-center"
                onClick={() => showMenu((prev) => !prev)}
              >
                {user?.profilePic ? (
                  <img
                    src={user.profilePic}
                    className="w-10 h-10 rounded-full"
                    alt={user?.name}
                  />
                ) : (
                  <FaRegCircleUser />
                )}
              </div>
            )}

            {menu && (
              <div className="absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded">
                <nav>
                  {user?.role === ROLE.ADMIN && (
                    <Link
                      to={"/admin-panel/all-products"}
                      className="whitespace-nowrap hidden md:block hover:bg-slate-100 p-2 "
                      onClick={() => showMenu((prev) => !prev)}
                    >
                      Admin Panel
                    </Link>
                  )}
                  <Link
                    to={"/order"}
                    className="whitespace-nowrap hidden md:block hover:bg-slate-100 p-2 "
                    onClick={() => showMenu((prev) => !prev)}
                  >
                    Order
                  </Link>
                </nav>
              </div>
            )}
          </div>
          {user?._id && (
            <Link to={"/cart"} className="text-2xl relative">
              <span>
                <FaShoppingCart />
              </span>

              <div className="bg-red-600 text-white h-5 w-5 p-1 flex items-center justify-center rounded-full absolute -top-2 -right-3">
                <p className="text-sm">{context?.cartProductCount}</p>
              </div>
            </Link>
          )}

          {user?._id ? (
            <button
              onClick={handleLogout}
              className="px-3 py-1 rounded-full text-white hover:bg-red-700 bg-red-600"
            >
              Logout
            </button>
          ) : (
            <Link
              to={"/login"}
              className="px-3 py-1 rounded-full text-white hover:bg-red-700 bg-red-600"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
