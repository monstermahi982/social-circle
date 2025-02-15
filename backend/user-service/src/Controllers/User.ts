import { Request, Response } from "express";
import { UserService } from "../Services/User";
import { CreateUserDtoType, UpdateUserDtoType } from "../Dtos/User.dto";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async createUser(req: Request<{}, {}, CreateUserDtoType>, res: Response) {
    try {
      const user = await this.userService.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: "Failed to create user" });
    }
  }

  async getAllUsers(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const pageSize = parseInt(req.query.pageSize as string) || 5;
      const sortBy = (req.query.sortBy as string) || "id";
      const sortOrder =
        (req.query.sortOrder as string)?.toUpperCase() === "DESC"
          ? "DESC"
          : "ASC";

      const { users, total } = await this.userService.getAllUsers(
        page,
        pageSize,
        sortBy,
        sortOrder
      );

      res.json({
        users,
        total,
        totalPages: Math.ceil(total / pageSize),
        currentPage: page,
        pageSize,
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch users" });
    }
  }

  async updateUser(
    req: Request<{ id: string }, {}, UpdateUserDtoType>,
    res: Response
  ) {
    try {
      const user = await this.userService.updateUser(
        parseInt(req.params.id),
        req.body
      );
      res.json(user);
    } catch (error) {
      if (error instanceof Error && error.message === "User not found") {
        res.status(404).json({ error: "User not found" });
      } else {
        res.status(500).json({ error: "Failed to update user" });
      }
    }
  }

  async getUserById(req: Request<{ id: string }>, res: Response) {
    try {
      const user = await this.userService.getUserById(parseInt(req.params.id));
      if (!user) {
        res.status(404).json({ error: "User not found" });
      } else {
        res.json(user);
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to get user by ID" });
    }
  }

  async searchUsers(req: Request, res: Response) {
    try {
      const query = req.query.q as string;
      if (!query) {
        res.status(400).json({ error: "Query parameter 'q' is required" });
        return;
      }
      const users = await this.userService.searchUsers(query);
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: "Failed to search users" });
    }
  }

  async deleteUser(req: Request<{ id: string }>, res: Response) {
    try {
      const result = await this.userService.deleteUser(parseInt(req.params.id));
      if (result.affected === 0) {
        res.status(404).json({ error: "User not found" });
      } else {
        res.json({ message: "User deleted successfully" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to delete user" });
    }
  }

  async verifyUser(req: Request<{ id: string }>, res: Response) {
    try {
      const user = await this.userService.verifyUser(parseInt(req.params.id));
      res.json(user);
    } catch (error) {
      if (error instanceof Error && error.message === "User not found") {
        res.status(404).json({ error: "User not found" });
      } else {
        res.status(500).json({ error: "Failed to verify user" });
      }
    }
  }

  async blockUser(req: Request<{ id: string }>, res: Response) {
    try {
      const user = await this.userService.blockUser(parseInt(req.params.id));
      res.json(user);
    } catch (error) {
      if (error instanceof Error && error.message === "User not found") {
        res.status(404).json({ error: "User not found" });
      } else {
        res.status(500).json({ error: "Failed to block user" });
      }
    }
  }

  async unblockUser(req: Request<{ id: string }>, res: Response) {
    try {
      const user = await this.userService.unblockUser(parseInt(req.params.id));
      res.json(user);
    } catch (error) {
      if (error instanceof Error && error.message === "User not found") {
        res.status(404).json({ error: "User not found" });
      } else {
        res.status(500).json({ error: "Failed to unblock user" });
      }
    }
  }
}
