async function userLogout(req, res) {
  try {
    res.clearCookie("token");

    res.json({
      message: "Logged out successfully",
      errro: false,
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

export default userLogout