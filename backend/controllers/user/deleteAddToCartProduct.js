import addToCartModel from "../../models/cartProduct.js";

const deleteAddToCartProduct = async (req, res) => {
  try {
    const addToCartProductId = req.body._id;

    if (!addToCartProductId) {
      return res.status(400).json({
        message: "Product ID is required",
        success: false,
        error: true,
      });
    }

    const deleteProduct = await addToCartModel.deleteOne({ _id: addToCartProductId });

    if (deleteProduct.deletedCount === 0) {
      return res.status(404).json({
        message: "Product not found",
        success: false,
        error: true,
      });
    }

    res.json({
      message: "Product deleted successfully",
      success: true,
      data: deleteProduct,
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
      error: true,
    });
  }
};

export default deleteAddToCartProduct;
