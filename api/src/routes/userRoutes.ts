import { Router } from "express";
import * as userController from "../controllers/userControllers";
import { isJwtAuthenticated } from "../middlewares/auth";

const userRouter = Router();

userRouter.route("/users")
  .get([isJwtAuthenticated], userController.fetchUsers)
  .post(userController.createUser);
userRouter.route("/users/:id")
  .get([isJwtAuthenticated], userController.fetchUser)
  .put([isJwtAuthenticated], userController.editUser)
  .delete([isJwtAuthenticated], userController.deleteUser);

userRouter.route("/users/auth")
  .post(userController.authenticateUser);
userRouter.route("/users/check-token")
  .post([isJwtAuthenticated], userController.checkToken);

export default userRouter;

