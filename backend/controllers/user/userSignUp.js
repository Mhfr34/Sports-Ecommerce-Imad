// backend/controllers/userSignUp.js
import userModel from "../../models/userModel.js";
import bcrypt from "bcryptjs";

async function userSignUpController(req, res) {
  try {
    const { email, password, name } = req.body;
    const user = await userModel.findOne({email})
    if(user){
      throw new Error("Already user exists")
    }
    if (!email) {
      throw new Error("Please provide email");
    }
    if (!password) {
      throw new Error("Please provide password");
    }
    if (!name) {
      throw new Error("Please provide name");
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hash(password, salt);

    if (!hashPassword) {
      throw new Error("Something went wrong");
    }

    const payload = {
      ...req.body,
      role: "GENERAL",
      password: hashPassword,
    };

    const userData = new userModel(payload);
    const saveUser = await userData.save();

    res.status(201).json({
      data: saveUser,
      success: true,
      error: false,
      message: "User created Successfully!",
    });
  } catch (error) {
    res.json({ message: error.message, success: false ,error:true});
    console.log(error);
  }
}

export default userSignUpController;
