import { Request, Response } from "express";
import { PostService } from "../Services/Post";

export class PostController {
  private postService: PostService;

  constructor() {
    this.postService = new PostService();
  }

  async createPost(req: Request, res: Response) {
    try {
      const post = await this.postService.createPost(req.body);
      res.status(201).json(post);
    } catch (error) {
      res.status(500).json({ error: "Failed to create post" });
    }
  }

  async getAllPosts(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const pageSize = parseInt(req.query.pageSize as string) || 5;
      const sortBy = (req.query.sortBy as string) || "createdAt";
      const sortOrder = (req.query.sortOrder as string) === "desc" ? "desc" : "asc";

      const { posts, total } = await this.postService.getAllPosts(
        page,
        pageSize,
        sortBy,
        sortOrder
      );

      res.json({
        posts,
        total,
        totalPages: Math.ceil(total / pageSize),
        currentPage: page,
        pageSize,
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch posts" });
    }
  }

  async updatePost(req: Request, res: Response) {
    try {
      const post = await this.postService.updatePost(req.params.id, req.body);
      if (!post) {
        res.status(404).json({ error: "Post not found" });
        return 
      }
      res.json(post);
    } catch (error) {
      res.status(500).json({ error: "Failed to update post" });
    }
  }

  async deletePost(req: Request, res: Response) {
    try {
      const success = await this.postService.deletePost(req.params.id);
      if (!success) {
        res.status(404).json({ error: "Post not found" });
        return
      }
      res.json({ message: "Post deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete post" });
    }
  }

  async getPostById(req: Request, res: Response) {
    try {
      const post = await this.postService.getPostById(req.params.id);
      if (!post) {
        res.status(404).json({ error: "Post not found" });
        return 
      }
      res.json(post);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch post" });
    }
  }

  async searchPosts(req: Request, res: Response) {
    try {
      const query = req.query.q as string;
      if (!query) {
        res
          .status(400)
          .json({ error: "Query parameter 'q' is required" });
          return 
        }
      const posts = await this.postService.searchPosts(query);
      res.json(posts);
    } catch (error) {
      console.log(error);
      
      res.status(500).json({ error: "Failed to search posts" });
    }
  }

  async publishPost(req: Request, res: Response) {
    try {
      const post = await this.postService.publishPost(req.params.id);
      res.json(post);
    } catch (error) {
      res.status(500).json({ error: "Failed to publish post" });
    }
  }

  async unpublishPost(req: Request, res: Response) {
    try {
      const post = await this.postService.unpublishPost(req.params.id);
      res.json(post);
    } catch (error) {
      res.status(500).json({ error: "Failed to unpublish post" });
    }
  }
}
