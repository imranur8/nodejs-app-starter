import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { IRequest } from 'app-types';

export const isJwtAuthenticated = async (request: IRequest, response: Response, next: NextFunction) => {
  // check JWT token is valid or not
  const token = request.headers.authorization;

  if (!token) {
    return response.status(403).send({
      auth: false, message: "No token provided."
    });
  }

  try {
    let decoded = await jwt.verify(token, process.env.JWT_SECRET) as IRequest;
    request.id = decoded.id;
    request.name = decoded.name;
    request.email = decoded.email;
    request.phone = decoded.phone;
    request.address = decoded.address;
    next();
  } catch (error) {
    let errorCode, errorMessage;
    if(error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
      errorCode = 400;
      errorMessage = error.name;
    }
    return response.status(errorCode).send({
      auth: false,
      message: errorMessage
    });
  }
};