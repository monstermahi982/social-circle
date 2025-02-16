import { Post, PostDocument } from "../Models/Post";

export class PostService {
  async createPost(postData: Partial<PostDocument>): Promise<PostDocument> {
    const post = new Post(postData);
    const savedPost = await post.save();
    return savedPost;
  }

  async getAllPosts(
    page: number,
    pageSize: number,
    sortBy: string,
    sortOrder: "asc" | "desc"
  ): Promise<{ posts: PostDocument[]; total: number }> {
    const total = await Post.countDocuments();
    const posts = await Post.find()
      .sort({ [sortBy]: sortOrder })
      .skip((page - 1) * pageSize)
      .limit(pageSize);
    return { posts, total };
  }

  async updatePost(
    id: string,
    postData: Partial<PostDocument>
  ): Promise<PostDocument | null> {
    const updatedPost = await Post.findByIdAndUpdate(id, postData, {
      new: true,
    });
    return updatedPost;
  }

  async deletePost(id: string): Promise<boolean> {
    const result = await Post.findByIdAndDelete(id);
    return !!result;
  }

  async getPostById(id: string): Promise<PostDocument | null> {
    const post = await Post.findById(id);
    return post;
  }

  async searchPosts(query: string): Promise<PostDocument[]> {
    const posts = await Post.find({
      $or: [
        { title: new RegExp(query, "i") },
        { content: new RegExp(query, "i") },
        { author: new RegExp(query, "i") },
      ],
    });
    return posts;
  }

  async publishPost(id: string): Promise<PostDocument | null> {
    const post = await Post.findById(id);
    if (!post) {
      throw new Error("Post not found");
    }

    post.isPublished = true;
    const updatedPost = await post.save();
    return updatedPost;
  }

  async unpublishPost(id: string): Promise<PostDocument | null> {
    const post = await Post.findById(id);
    if (!post) {
      throw new Error("Post not found");
    }

    post.isPublished = false;
    const updatedPost = await post.save();
    return updatedPost;
  }
}
