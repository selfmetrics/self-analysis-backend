import fs from "fs";

// 요청 로그
const accessStream = fs.createWriteStream("access.log", { flags: "a" });

// 에러 로그
const errorStream = fs.createWriteStream("error.log", { flags: "a" });

// 요청 로그 미들웨어
export const logger = (req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const log = `${new Date().toISOString()} ${req.method} ${req.url} ${res.statusCode} ${Date.now() - start}ms\n`;
    accessStream.write(log);
  });

  next();
};

// 에러 로그 미들웨어
export const errorMiddleware = (err, req, res, next) => {
  const status = err.status || 500;

  const errorLog = `
    [${new Date().toISOString()}]
    ${req.method} ${req.url}
    message: ${err.message}
    stack: ${err.stack}
    status: ${status}
    -------------------------
  `;

  errorStream.write(errorLog);  
  console.error(err);     

  res.status(status).json({
    success: false,
    message: err.message,
  });
};