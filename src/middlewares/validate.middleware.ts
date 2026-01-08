import { Request, Response, NextFunction } from "express"
import  { z, ZodError } from "zod";

export const validateSchema = (schema: z.ZodTypeAny) => (req: Request, res: Response, next: NextFunction) => {
    try {
        schema.parse(req.body);
        next();
    } catch (error) {
        if (error instanceof ZodError) {
            return next(new Error(error.issues[0].message));
        }
        next(error);
    }
}