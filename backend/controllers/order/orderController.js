import orderModel from "../../models/orderModel.js";

const orderController = async (req, res) => {
  try {
    const currentUserId = req.userId;
    const orderList = await orderModel.find({ userId: currentUserId }).sort({createdAt : -1});
    res.json({
      data: orderList,
      message: "Order List",
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

export default orderController;
