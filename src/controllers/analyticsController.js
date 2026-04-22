const analyticsController = {
  getEmotions: (req, res) => {
    res.json({
      happy: 5,
      sad: 2,
      angry: 1,
    });
  },
};

export default analyticsController;