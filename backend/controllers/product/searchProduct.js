import productModel from "../../models/productModel.js";

const searchProduct = async (req, res) => {
  try {
    const query = req.query.q;

    const regex = new RegExp(query, "i", "g");
    const product = await productModel.find({
      $or: [
        {
          category: regex,
        },
        {
          productName: regex,
        },
      ],
    });
    res.json({
      data: product,
      success: true,
      error: false,
      message: "Search Product List",
    });
  } catch (error) {
    res.json({
      message: error.message,
      success: false,
      error: true,
    });
  }
};

export default searchProduct;
