import addToCartModel from "../../models/cartProduct.js";

const countAddToCartProduct = async (req, res) => {
  try {
    const userId = req.userId;
    const count = await addToCartModel.countDocuments({
      userId: userId,
    });
    res.json({
      data: {
        count: count,
      },
      message: "Ok",
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

export default countAddToCartProduct
