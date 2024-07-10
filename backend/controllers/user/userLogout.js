async function userLogout(req, res) {
  try {
    const tokenOption = {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
    
    };
    res.clearCookie("token",tokenOption);
    console.log("Cookie cleared successfully");
    res.json({
      message: "Logged out successfully",
      error: false,
      success: true,
      data: [],
    });
  } catch (error) {
    res.json({
      message: error.message,
      success: false,
      error: true,
    });
  }
}

export default userLogout;
