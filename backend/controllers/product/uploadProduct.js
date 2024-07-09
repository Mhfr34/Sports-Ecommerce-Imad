import uploadProductPermission from "../../helpers/permission.js";
import productModel from "../../models/productModel.js";

async function uploadProductController(req, res) {
  try {
    const sessionUserId = req.userId
    if(!uploadProductPermission(sessionUserId)){
        throw new Error("Permission denied")
    }
    const uploadProduct = new productModel(req.body)
    const saveProduct = await uploadProduct.save()
    res.status(201).json({
        message:"Product upload successfully",
        success:true,
        error:false,
        data: saveProduct
    })
  } catch (error) {
  res.json({
    message: error.message,
    success: false,
    error: true,
  });
}
}

export default uploadProductController