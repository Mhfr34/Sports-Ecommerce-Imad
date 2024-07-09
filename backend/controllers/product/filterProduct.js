import productModel from "../../models/productModel.js";

const filterProductController = async (req, res) => {
  try {
    const categoryList = req?.body?.category || [];

    const product = await productModel.find({
      category: {
        $in: categoryList,
      },
    });

    res.json({
      data: product,
      message: "product",
      error: false,
      success: true,
    });
  } catch (error) {
    res.json({
      message: error.message,
      success: false,
      error: true,
    });
  }
};

export default filterProductController;
