import addToCartModel from "../../models/cartProduct.js";

const addToCartDisplayProduct = async (req, res) => {
  try {
    const currentUser = req.userId;
    const allProducts = await addToCartModel.find({
      userId: currentUser,
    }).populate("productId");
    res.json({
      data: allProducts,
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

export default addToCartDisplayProduct;
