import { Request, Response } from 'express';

// Unsupported (404) routes

const notFound = (req: Request, res: Response) => {
  const error = new Error(`Not Found + ${req.originalUrl}`);
  res.status(404);
  return error;
};

// General error handler
const errorHandler = (
  err: Record<string, unknown>,
  req: Request,
  res: Response
) => {
  if (res.headersSent) {
    res.json(err);
  }

  res.status((err.statusCode as number) || 500);
  res.json({
    message: err.message || 'Unknown error occurred',
  });
};

export { notFound, errorHandler };
