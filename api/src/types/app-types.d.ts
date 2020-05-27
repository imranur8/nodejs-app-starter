import {Request} from "express";

interface IRequest extends Request {
  id: Number,
  name : String,
  email : String,
  phone : String,
  address : String
}

declare module "app-types";

