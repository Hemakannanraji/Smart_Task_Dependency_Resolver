const ADMIN_EMAILS = ["hema2005kannan@gmail.com"];

module.exports = (req, res, next) => {
  const userEmail = req.user?.email;

  if (!userEmail || !ADMIN_EMAILS.includes(userEmail)) {
    return res.status(403).json({
      error: "Access denied. Admin only."
    });
  }

  next();
};
