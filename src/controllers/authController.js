const authController = {
  googleLogin: (req, res) => {
    res.send("구글 로그인 테스트");
  },

  googleCallback: (req, res) => {
    const { code } = req.query;
    res.json({ code });
  },

  logout: (req, res) => {
    res.json({ message: "로그아웃 성공" });
  },
};

export default authController;