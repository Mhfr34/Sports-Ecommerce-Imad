import productModel from "../../models/productModel.js";

const getProductDetails = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await productModel.findById(productId);
    res.json({
      message: "Fetched",
      data: product,
      success: true,
      error: false,
    });
  } catch (error) {
    res.json({
      message: error.message,
      success: false,
      error: true,
    });
  }
};


export default getProductDetails