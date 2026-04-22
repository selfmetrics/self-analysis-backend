const usersController = {
    myPage: (req, res) => {
        res.send("구글 로그인 테스트");
    },

    deleteAccount: (req, res) => {
        const { code } = req.query;
        res.json({ code });
    },

    nameChange: (req, res) => {
        res.json({ message: "로그아웃 성공" });
    },
    };

export default usersController;