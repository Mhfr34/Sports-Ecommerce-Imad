import uploadProductPermission from "../../helpers/permission.js";
import productModel from "../../models/productModel.js";

async function updateProductController(req, res) {
  try {
    if (!uploadProductPermission(req.userId)) {
      throw new Error("Permission denied");
    }
    const {_id,...resBody} = req.body
    const updateProduct = await productModel.findByIdAndUpdate(_id,resBody)
    res.json({
        message:"Product Updated Successfully",
        data:updateProduct,
        success:true,
        error:false
    })

  } catch (error) {
    res.json({
      message: error.message,
      success: false,
      error: true,
    });
  }
}

export default updateProductController;
