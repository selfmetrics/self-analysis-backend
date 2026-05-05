// 200 성공 응답
export const success = (res, data, message = "성공") => {
  return res.status(200).json({
    success: true,
    message,
    data,
  });
};

// 201 성공 응답
export const created = (res, data, message = "생성됨") => {
  return res.status(201).json({
    success: true,
    message,
    data,
  });
};

// 204 성공 응답
export const noContent = (res) => {
  return res.status(204).send();
};