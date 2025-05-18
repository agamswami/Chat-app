const logoutUser = (req, res) => {
  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "strict",
    secure: false, // set to true if using HTTPS in production
  });

  res.status(200).json({ message: "Logged out successfully" });
};

export default logoutUser;