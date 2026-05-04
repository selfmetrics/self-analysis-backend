// google callback API 입력값 검증
export const validateGoogleCallback = (req, res, next) => {
  const { code } = req.query;

  if (!code) {
    const err = new Error("Authorization code가 필요합니다.");
    err.status = 400;
    return next(err);
  }

  next();
};

// nickName change API 입력값 검증
export const validateNickname = (req, res, next) => {
  const { nickname } = req.body;

  if (!nickname) {
    const err = new Error("닉네임이 필요합니다.");
    err.status = 400;
    return next(err);
  }

  if (typeof nickname !== "string") {
    const err = new Error("닉네임은 문자열이어야 합니다.");
    err.status = 400;
    return next(err);
  }

  next();
};

// 숫자 파라미터 검증
export const validateIdParam = (paramName) => {
  return (req, res, next) => {
    const value = req.params[paramName];

    if (!value || isNaN(Number(value))) {
      const err = new Error(`${paramName}는 숫자여야 합니다.`);
      err.status = 400;
      return next(err);
    }

    next();
  };
};

export const validateCreateEpisodeComplete = (req, res, next) => {
  const { date, title, emotion, emotionIntensity, answers } = req.body;

  if (!date || isNaN(Date.parse(date))) {
    const err = new Error("date 형식이 잘못되었습니다.");
    err.status = 400;
    return next(err);
  }

  if (!title) {
    const err = new Error("title이 필요합니다.");
    err.status = 400;
    return next(err);
  }

  if (!["happy", "sad"].includes(emotion)) {
    const err = new Error("emotion 값이 잘못되었습니다.");
    err.status = 400;
    return next(err);
  }

  if (
    typeof emotionIntensity !== "number" ||
    emotionIntensity < 1 ||
    emotionIntensity > 10
  ) {
    const err = new Error("emotionIntensity는 1~10 사이 숫자여야 합니다.");
    err.status = 400;
    return next(err);
  }

  if (!Array.isArray(answers) || answers.length === 0) {
    const err = new Error("answers는 배열이어야 합니다.");
    err.status = 400;
    return next(err);
  }

  for (const item of answers) {
    if (!item.questionId || !item.answer) {
      const err = new Error("answers의 questionId, answer는 필수입니다.");
      err.status = 400;
      return next(err);
    }
  }

  next();
};

// 날짜 쿼리 검증
export const validateDateQuery = (req, res, next) => {
  const { startDate, endDate } = req.query;

  if (startDate && isNaN(Date.parse(startDate))) {
    const err = new Error("startDate 형식이 잘못되었습니다.");
    err.status = 400;
    return next(err);
  }

  if (endDate && isNaN(Date.parse(endDate))) {
    const err = new Error("endDate 형식이 잘못되었습니다.");
    err.status = 400;
    return next(err);
  }

  if (startDate && endDate) {
    if (new Date(startDate) > new Date(endDate)) {
      const err = new Error("startDate는 endDate보다 이전이어야 합니다.");
      err.status = 400;
      return next(err);
    }
  }

  next();
};

// 에피소드 질문 검증
export const validateCreateEpisode = (req, res, next) => {
  const { type } = req.body;

  if (!type) {
    const err = new Error("type이 필요합니다.");
    err.status = 400;
    return next(err);
  }

  if (typeof type !== "string") {
    const err = new Error("type은 문자열이어야 합니다.");
    err.status = 400;
    return next(err);
  }

  if (type !== "default") {
    const err = new Error("현재는 default 타입만 지원합니다.");
    err.status = 400;
    return next(err);
  }

  next();
};

export const validateCreateQuestion = (req, res, next) => {
  const { question } = req.body;

  if (!question || typeof question !== "string") {
    const err = new Error("question은 문자열로 필수입니다.");
    err.status = 400;
    return next(err);
  }

  next();
};

export const validateUpdateEpisode = (req, res, next) => {
  const { date, title, content, emotion, emotionIntensity } = req.body;

  if (date && isNaN(Date.parse(date))) {
    const err = new Error("date 형식이 잘못되었습니다.");
    err.status = 400;
    return next(err);
  }

  if (title && typeof title !== "string") {
    const err = new Error("title은 문자열이어야 합니다.");
    err.status = 400;
    return next(err);
  }

  if (content && typeof content !== "string") {
    const err = new Error("content는 문자열이어야 합니다.");
    err.status = 400;
    return next(err);
  }

  if (emotion && !["happy", "sad"].includes(emotion)) {
    const err = new Error("emotion 값이 잘못되었습니다.");
    err.status = 400;
    return next(err);
  }

  if (
    emotionIntensity !== undefined &&
    (typeof emotionIntensity !== "number" ||
      emotionIntensity < 1 ||
      emotionIntensity > 10)
  ) {
    const err = new Error("emotionIntensity는 1~10 사이 숫자여야 합니다.");
    err.status = 400;
    return next(err);
  }

  next();
};

export const validateUpdateAnswer = (req, res, next) => {
  const { answer } = req.body;

  if (!answer || typeof answer !== "string") {
    const err = new Error("answer는 문자열로 필수입니다.");
    err.status = 400;
    return next(err);
  }

  next();
};

export const validateCreateInterviewQuestion = (req, res, next) => {
  const { question } = req.body;

  if (!question || typeof question !== "string") {
    const err = new Error("question은 문자열로 필수입니다.");
    err.status = 400;
    return next(err);
  }

  next();
};

export const validateUpdateInterviewQuestion = (req, res, next) => {
  const { question, answer } = req.body;

  if (!question && !answer) {
    const err = new Error("question 또는 answer 중 하나는 필요합니다.");
    err.status = 400;
    return next(err);
  }

  if (question && typeof question !== "string") {
    const err = new Error("question은 문자열이어야 합니다.");
    err.status = 400;
    return next(err);
  }

  if (answer && typeof answer !== "string") {
    const err = new Error("answer는 문자열이어야 합니다.");
    err.status = 400;
    return next(err);
  }

  next();
};