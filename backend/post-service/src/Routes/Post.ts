import express from "express";
import { PostController } from "../Controllers/Post";

const router = express.Router();
const postController = new PostController();

router.post("/create", (req, res) => postController.createPost(req, res));
router.get("/lists", (req, res) => postController.getAllPosts(req, res));
router.get("/search", (req, res) => postController.searchPosts(req, res));
router.get("/:id", (req, res) => postController.getPostById(req, res));
router.put("/:id", (req, res) => postController.updatePost(req, res));
router.delete("/:id", (req, res) => postController.deletePost(req, res));
router.put("/:id/publish", (req, res) =>
  postController.publishPost(req, res)
);
router.put("/:id/unpublish", (req, res) =>
  postController.unpublishPost(req, res)
);

export default router;
