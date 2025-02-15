import { Router } from "express";
import { UserController } from "../Controllers/User";
import { validateDto } from "../Middlewares/validation.middleware";
import { CreateUserDto, UpdateUserDto } from "../Dtos/User.dto";

const router = Router();
const userController = new UserController();

// Define route handlers
router.post("/user", (req, res) => userController.createUser(req, res));

router.get("/users", (req, res) => userController.getAllUsers(req, res));

router.put("/user/:id", (req, res) => userController.updateUser(req, res));

router.delete("/user/:id", (req, res) => userController.deleteUser(req, res));

router.get("/user/:id", (req, res) => userController.getUserById(req, res));

router.get("/users/search", (req, res) => userController.searchUsers(req, res));

router.post("/user/:id/block", (req, res) =>
  userController.blockUser(req, res)
);

router.post("/user/:id/unblock", (req, res) =>
  userController.unblockUser(req, res)
);

router.post("/user/:id/verify", (req, res) =>
  userController.verifyUser(req, res)
);



export default router;
