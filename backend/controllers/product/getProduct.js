import productModel from "../../models/productModel.js";

const getProductController = async (req, res) => {
  try {
    const allProduct = await productModel.find().sort({
      createdAt: -1,
    });
    res.json({
      message: "All Products",
      success: true,
      error: false,
      data: allProduct,
    });
  } catch (error) {
    res.json({
      message: error.message,
      success: false,
      error: true,
    });
  }
};


export default getProductController