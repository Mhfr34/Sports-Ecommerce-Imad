import React, { useEffect, useState, useCallback } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom"; // useNavigate for React Router v6
import productCategory from "../helpers/productCategory";
import VerticalCard from "../components/VerticalCard";
import SummaryApi from "../common";

const CategoryProduct = () => {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate(); // useNavigate instead of useHistory in React Router v6
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const urlSearch = new URLSearchParams(location.search);
  const urlCategoryListInArray = urlSearch.getAll("category");
  const urlCategoryListObject = {};

  // Convert array to object for easier state management
  urlCategoryListInArray.forEach((element) => {
    urlCategoryListObject[element] = true;
  });

  const [selectCategory, setSelectCategory] = useState(urlCategoryListObject);
  const [filterCategoryList, setFilterCategoryList] = useState(
    Object.keys(urlCategoryListObject)
  );

  const [sortBy, setSortBy] = useState("");

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(SummaryApi.filterProduct.url, {
        method: SummaryApi.filterProduct.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category: filterCategoryList,
        }),
      });
      const dataResponse = await response.json();
      setData(dataResponse?.data || []);
    } catch (error) {
      console.error("Failed to fetch data", error);
    } finally {
      setLoading(false);
    }
  }, [filterCategoryList]);

  const handleSelectCategory = (e) => {
    const { value, checked } = e.target;
    setSelectCategory((prev) => ({
      ...prev,
      [value]: checked,
    }));
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    const arrayOfCategory = Object.keys(selectCategory).filter(
      (categoryKeyName) => selectCategory[categoryKeyName]
    );
    setFilterCategoryList(arrayOfCategory);

    // Update the URL
    const params = new URLSearchParams();
    arrayOfCategory.forEach((category) => {
      params.append("category", category);
    });
    navigate(`${location.pathname}?${params.toString()}`);
  }, [selectCategory, navigate, location.pathname]);

  useEffect(() => {
    if (sortBy === "asc") {
      setData((prevData) => [...prevData].sort((a, b) => a.sellingPrice - b.sellingPrice));
    } else if (sortBy === "dsc") {
      setData((prevData) => [...prevData].sort((a, b) => b.sellingPrice - a.sellingPrice));
    }
  }, [sortBy]);

  const handleOnChangeSortBy = (e) => {
    setSortBy(e.target.value);
  };

  return (
    <div className="container mx-auto p-4">
      {/* Desktop Version */}
      <div className="hidden lg:grid grid-cols-[200px,1fr]">
        {/* left side */}
        <div className="bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll">
          {/* sort by */}
          <div>
            <h3 className="capitalize text-base font-medium text-slate-500 border-b pb-1 border-slate-300">
              Sort by
            </h3>
            <form className="text-sm flex flex-col gap-2 py-2">
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="sortBy"
                  value="asc"
                  onChange={handleOnChangeSortBy}
                />
                <label>Price - Low to High</label>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="sortBy"
                  value="dsc"
                  onChange={handleOnChangeSortBy}
                />
                <label>Price - High to Low</label>
              </div>
            </form>
          </div>

          {/* filter by */}
          <div>
            <h3 className="capitalize text-base font-medium text-slate-500 border-b pb-1 border-slate-300">
              Category
            </h3>
            <form className="text-sm flex flex-col gap-2 py-2">
              {productCategory.map((categoryName, index) => (
                <div key={index} className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    name={"category"}
                    checked={!!selectCategory[categoryName?.value]}
                    id={categoryName?.value}
                    value={categoryName?.value}
                    onChange={handleSelectCategory}
                  />
                  <label htmlFor={categoryName?.value}>
                    {categoryName?.label}
                  </label>
                </div>
              ))}
            </form>
          </div>
        </div>

        {/* right side (product)*/}
        <div className="px-4">
          <p className="font-medium text-slate-800 text-lg my-2">
            Search Results : {data.length}
          </p>
          <div className="min-h-[calc(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-120px)]">
            {data.length !== 0 && (
              <VerticalCard data={data} loading={loading} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryProduct;
