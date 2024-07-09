import addToCartModel from "../../models/cartProduct.js";

const addToCartController = async (req, res) => {
  try {
    const { productId } = req.body;
    const currentUser = req.userId;

    // Check if the product is already in the cart for the current user
    const isProductAvailable = await addToCartModel.findOne({
      productId,
      userId: currentUser, // Ensure this check includes the userId
    });

    console.log("add to cart     ", isProductAvailable);

    if (isProductAvailable) {
      return res.json({
        message: "Already exists in Add to cart",
        success: false,
        error: true,
      });
    }

    const payload = {
      productId: productId,
      quantity: 1,
      userId: currentUser, // Use the same field name consistently
    };

    const newAddToCart = new addToCartModel(payload);
    const saveProduct = await newAddToCart.save();

    res.json({
      message: "Product Added in cart",
      success: true,
      error: false,
      data: saveProduct,
    });
  } catch (error) {
    res.json({
      message: error.message,
      success: false,
      error: true,
    });
  }
};

export default addToCartController;
