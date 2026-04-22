const episodesController = {
  createEpisode: (req, res) => {
    res.json({ id: 1, ...req.body });
  },

  getEpisodes: (req, res) => {
    res.json([
      {
        id: 1,
        date: "2026-03-21",
        title: "오늘 회고",
        emotion: "happy",
        emotionIntensity: 7,
      },
    ]);
  },

  getEpisodeById: (req, res) => {
    res.json({
      id: req.params.id,
      date: "2026-03-21",
      title: "상세",
      content: "내용",
      emotion: "sad",
      emotionIntensity: 5,
      questions: [
        { id: 1, question: "왜?", answer: "몰라" },
      ],
    });
  },

  updateEpisode: (req, res) => {
    res.json({ id: req.params.id, ...req.body });
  },

  deleteEpisode: (req, res) => {
    res.json({ message: "삭제 완료" });
  },

  createQuestion: (req, res) => {
    res.json({ id: 1, ...req.body });
  },

  updateQuestion: (req, res) => {
    res.json({ id: req.params.questionId, ...req.body });
  },

  deleteQuestion: (req, res) => {
    res.json({ message: "삭제 완료" });
  },

  updateAnswer : (req, res) => {
    res.json({ message: "삭제 완료" });
  },

  createEpisodeComplete : (req, res) => {
    res.json({ message: "삭제 완료" });
  },
};

export default episodesController;