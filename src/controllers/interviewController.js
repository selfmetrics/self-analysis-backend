const interviewController = {
    getQuestionById: (req, res) => {
        res.send("구글 로그인 테스트");
    },

    updateQuestion: (req, res) => {
        const { code } = req.query;
        res.json({ code });
    },

    getQuestions: (req, res) => {
        res.json({ message: "로그아웃 성공" });
    },

    deleteQuestion: (req, res) => {
        res.json({ message: "로그아웃 성공" });
    },

    createQuestion: (req, res) => {
        res.json({ message: "로그아웃 성공" });
    },
};

export default interviewController;