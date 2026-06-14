const express = require("express");
const router = express.Router();

//fetch all the controllers
const {
  createBlog,
  updateBlog,
  deleteBlog,
  getAllBlogs,
  getBlog,
  getBlogsByCategory,
  getBlogsBySearch,
  trendingBlogs,
  getCategories
} = require("../controllers/blog.controller");

router.post("/createBlog", createBlog);
router.put("/updateBlog/:id", updateBlog);
router.delete("/deleteBlog/:id", deleteBlog);

router.get("/", getAllBlogs);
router.get("/trending", trendingBlogs);
router.get("/search", getBlogsBySearch);

router.get("/category/:category", getBlogsByCategory);
router.get("/slug/:slug", getBlog);

router.get("/category", getCategories)

//export the router
module.exports = router;
