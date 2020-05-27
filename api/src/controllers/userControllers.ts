import { Request, Response } from "express";
import User from "../entity/User";
import { getManager } from "typeorm";
import logger from "../utils/logger";
import { IRequest } from "app-types";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

/**
 * createUser
 * @method post
 * @param  {Request} request The express request object.
 * @param  {Response} response The express response object.
 *
 *
 * @api {post} api/users/ createUser
 * @apiVersion 1.0.0
 * @apiName createUser
 * @apiGroup User
 *
 * @apiParam {String} name User full name
 * @apiParam {String} email User email
 * @apiParam {String} phone User phone number
 * @apiParam {String} address User address
 * @apiParam {String} password User password
 *
 * @apiSuccess {String} id unique id of the User.
 * @apiSuccess {String} name  Name of the User.
 * @apiSuccess {String} email  email of the User.
 * @apiSuccess {String} phone  phone  of the User.
 * @apiSuccess {String} address  address of the User.
 * @apiSuccess {String} password User password
 * @apiSuccess {String} created_at  created_at time of user.
 * @apiSuccess {String} updated_at  updated_at time of user.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
     {
       "name": "Md Imranur rahman",
        "email": "imranur8s5@gmail.com",
        "phone": "01891430692",
        "address": null,
        "id": 10,
        "created_at": "2020-05-24T18:34:05.382Z",
        "updated_at": "2020-05-24T18:34:05.382Z"
      }
 *
 */
export const createUser = async (request: Request, response: Response) => {
  try {
    const userRepository = getManager().getRepository(User);
    const newUser = userRepository.create(request.body);
    const result = await userRepository.save(newUser);
    response.json(result);
  } catch (error) {
    logger.error(`${error.message}, stack trace - ${error.stack}`);
    response.status(400).json(error);
  }
}

/**
 * editUser
 * @method put
 * @param  {Request} request The express request object.
 * @param  {Response} response The express response object.
 *
 *
 * @api {put} api/users/:id editUser
 * @apiVersion 1.0.0
 * @apiName editUser
 * @apiGroup User
 *
 * @apiParam {String} name User full name
 * @apiParam {String} email User email
 * @apiParam {String} phone User phone number
 * @apiParam {String} address User address
 * @apiParam {String} password User password
 * 
 * @apiSuccess {String} id unique id of the User.
 * @apiSuccess {String} name  Name of the User.
 * @apiSuccess {String} email  email of the User.
 * @apiSuccess {String} phone  phone  of the User.
 * @apiSuccess {String} address  address of the User.
 * @apiSuccess {String} password User password
 * @apiSuccess {String} created_at  created_at time of user.
 * @apiSuccess {String} updated_at  updated_at time of user.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
     {
       "name": "Md Imranur rahman",
        "email": "imranur8s5@gmail.com",
        "phone": "01891430692",
        "address": null,
        "id": 10,
        "created_at": "2020-05-24T18:34:05.382Z",
        "updated_at": "2020-05-24T18:34:05.382Z"
      }
 *
 */
export const editUser = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const { name, phone, address, password } = request.body;
    const userRepository = getManager().getRepository(User);
    let user = await userRepository.findOne(id);
    if (!user) {
      response.status(404).json("User not found !!");
    }
    user.name = name;
    user.phone = phone;
    user.address = address;
    if (password) user.password = request.body.password;
    const result = await userRepository.save(user)
    response.json(result);
  } catch (error) {
    logger.error(`${error.message}, stack trace - ${error.stack}`);
    response.status(400).json(error);
  }
}


/**
 * fetchUsers
 * @method get
 * @param  {Request} request The express request object.
 * @param  {Response} response The express response object.
 *
 * @api {get} api/users/ fetchUsers
 * @apiVersion 1.0.0
 * @apiName fetchUsers
 * @apiGroup User
 **/
export const fetchUsers = async (request: Request, response: Response) => {
  try {

    const userRepository = getManager().getRepository(User);
    const users = await userRepository.find();
    response.json({ results: users });
  } catch (error) {
    logger.error(`${error.message}, stack trace - ${error.stack}`);
    response.status(400).json(error);
  }
}

/**
 * fetchUser
 * @method get
 * @param  {Request} request The express request object.
 * @param  {Response} response The express response object.
 *
 * @api {get} api/users/:id fetchUser
 * @apiVersion 1.0.0
 * @apiName fetchUser
 * @apiGroup User
 **/
export const fetchUser = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const userRepository = getManager().getRepository(User);
    const user = await userRepository.findOne(id);
    if (!user) {
      response.status(404).json("User not found !!");
    }
    response.json(user);
  } catch (error) {
    logger.error(`${error.message}, stack trace - ${error.stack}`);
    response.status(400).json(error);
  }
}
/**
 * deleteUser
 * @method delete
 * @param  {Request} request The express request object.
 * @param  {Response} response The express response object.
 *
 * @api {delete} api/users/:id deleteUser
 * @apiVersion 1.0.0
 * @apiName deleteUser
 * @apiGroup User
 **/
export const deleteUser = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const userRepository = getManager().getRepository(User);
    const user = await userRepository.findOne(id);
    if (!user) {
      response.status(404).json("User not found !!");
    }
    const result = await userRepository.remove(user);
    response.json(result);
  } catch (error) {
    logger.error(`${error.message}, stack trace - ${error.stack}`);
    response.status(400).json(error);
  }
}

/**
 * authenticateUser
 * @method post
 * @param  {Request} request The express request object.
 * @param  {Response} response The express response object.
 *
 * @api {post} api/users/auth authenticateUser
 * @apiVersion 1.0.0
 * @apiName authenticateUser
 * @apiGroup User
 **/
export const authenticateUser = async (request: IRequest, response: Response) => {
  const { email, password } = request.body;
  try {
    const userRepository = getManager().getRepository(User);
    const user = await userRepository.findOne({ email: email.toLowerCase() });
    if (!user) {
      return response.status(400).json({ message: `Email ${email} not found.` });
    }
    const isMatch = await bcrypt.compareSync(password, user.password);
    if (isMatch) {
      delete user.password;
      // create JWT token  
      const token = jwt.sign(
        { user },
        process.env.JWT_SECRET,
        { expiresIn: "14d" }
      );
      const data = { token, user };
      return response.json(data)
    }
    return response.status(400).json("Wrong username and password");
  } catch (error) {
    logger.error(`${error.message}, stack trace - ${error.stack}`);
    return response.status(400).json(error);
  }
}

/**
 * checkToken
 * @method post
 * @param  {IRequest} request The express request object.
 * @param  {Response} response The express response object.
 *
 * @api {post} api/users/check-token/ checkToken
 * @apiVersion 1.0.0
 * @apiName checkToken
 * @apiGroup User
 **/
export const checkToken = async (request: IRequest, response: Response) => {
  try {
    const { token } = request.body;
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as IRequest;
    return response.status(200).json(decoded);
  } catch (error) {
    logger.error(`${error.message}, stack trace - ${error.stack}`);
    return response.status(400).json(error);
  }
}