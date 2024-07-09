import userModel from "../../models/userModel.js";

async function allUsers(req, res) {
  try {
    console.log("userid all Users",req.userId)

    const allUsers = await userModel.find()    
    res.json({
        message:"All users",
        data: allUsers,
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

export default allUsers