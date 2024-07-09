import userModel from "../../models/userModel.js";

async function updateUser(req, res) {
  try {
    const sessionUser = req.userId
    const { userId, role, email, name } = req.body;
    const payload = {
      ...(email && { email: email }),
      ...(name && { name: name }),
      ...(role && { role: role }),
    };
    const user  =await userModel.findById(sessionUser)
    console.log("user role",user.role)

    const updateUser = await userModel.findByIdAndUpdate(userId, payload);
    res.json({
      data: updateUser,
      message: "User Updated",
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
}


export default updateUser