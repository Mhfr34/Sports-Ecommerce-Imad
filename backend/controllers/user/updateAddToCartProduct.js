import addToCartModel from "../../models/cartProduct.js";

const updateAddToCartProduct = async (req, res) => {
  try {
    const currentUserId = req.userId;
    const addToCartProductId = req.body._id;

    const qty = req.body.quantity;

    const updateProduct = await addToCartModel.updateOne({_id : addToCartProductId}, {
      ...(qty && { quantity: qty }),
    });
    res.json({
      message: "Product updated successfully",
      success: true,
      data: updateProduct,
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

export default updateAddToCartProduct;
