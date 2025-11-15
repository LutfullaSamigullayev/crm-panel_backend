import type { NextFunction, Request, Response } from "express";

export const getAllMessages = async (req:Request, res:Response, next: NextFunction): Promise<Response | void> => {
    try {
        
    } catch (error: any) {
        next(error)
    }
}
