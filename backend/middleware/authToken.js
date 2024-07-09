import jwt from "jsonwebtoken";

async function authToken(req, res, next) {
  try {
    const token = req.cookies?.token;

    

    if (!token) {
      return res.status(200).json({
        message: "Please Login... !",
        error: true,
        success: false,
      });
    }

    jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decoded) => {
      if(err){
        console.log("error auth",err)
      }
      req.userId = decoded.tokenData._id
    
      next()
    });

  

  } catch (error) {
    res.status(400).json({
      message: error.message,
      data: [],
      error: true,
      success: false,
    });
  }
}

export default authToken;
