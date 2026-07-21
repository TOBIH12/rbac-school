import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

const validationMiddleware = (schema: z.ZodSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dataToValidate = await schema.safeParseAsync({
        params: req.params,
        query: req.query,
        body: req.body,
      });
      if (!dataToValidate.success) {
        return res.status(400).json({
          status: 'validation error',
          error: dataToValidate.error.issues
            .map((issue) => issue.message)
            .join(', '),
        });
      }

      return next();
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        error: err instanceof Error ? err.message : 'Internal Server Error',
      });
    }
  };
};

export default validationMiddleware;
