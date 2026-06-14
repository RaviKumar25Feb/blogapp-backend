const Blog = require("../models/blog.model");

//create blog
exports.createBlog = async (req, res) => {
  try {
    //fetch data from req.body
    const {
      title,
      description,
      shortDescription,
      slug,
      trending,
      category,
      keywords,
    } = req.body;
    //validate the data
    if (
      !title ||
      !description ||
      !shortDescription ||
      !slug ||
      !trending ||
      !category ||
      !keywords
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    //check blog with slug already exist or not
    const response = await Blog.findOne({ slug });
    if (response) {
      return res.status(400).json({
        success: false,
        message: "Slug already exists",
      });
    }
    //create blogs in db
    const blog = await Blog.create({
      title,
      slug,
      shortDescription,
      description,
      category,
      keywords,
      trending,
    });
    //return response
    return res.status(201).json({
      success: true,
      message: "Blog created successfully",
      data: blog,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Error while creating blog.",
    });
  }
};

//update blog
exports.updateBlog = async (req, res) => {
  try {
    //fetch id
    const { id } = req.params;
    const blog = await Blog.findById(id);
    //check blog exist or not
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }
    // //fetch data from req.body
    // blog.title = req.body.title || blog.title;
    // blog.description = req.body.description || blog.description;
    // blog.shortDescription = req.body.shortDescription || blog.shortDescription;
    // blog.slug = req.body.slug || blog.slug;
    // blog.category = req.body.category || blog.category;
    // blog.keywords = req.body.keywords || blog.keywords;
    // blog.trending = req.body.trending || blog.trending;
    // //now save the document after updating the data
    // await Blog.save();

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      {
        title: req.body.title || blog.title,
        description: req.body.description || blog.description,
        shortDescription: req.body.shortDescription || blog.shortDescription,
        slug: req.body.slug || blog.slug,
        category: req.body.category || blog.category,
        keywords: req.body.keywords || blog.keywords,
        trending: req.body.trending ?? blog.trending,
      },
      { new: true },
    );

    res.status(201).json({
      success: true,
      message: "Blog updated successfully",
      data: updatedBlog,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Error while updating blog",
    });
  }
};

//delete blog
exports.deleteBlog = async (req, res) => {
  try {
    //fetch id
    const { id } = req.params;

    const blog = await Blog.findByIdAndDelete(id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    //send response
    res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Error while deleting the blog",
    });
  }
};

//get all blogs
exports.getAllBlogs = async (req, res) => {
  try {
    //fetch all blogs
    const blogs = await Blog.find().sort({
      createdAt: -1,
    });
    //if blogs not exist
    if (blogs.length == 0) {
      return res.status(200).json({
        success: true,
        message: "Blogs don't exist",
      });
    }
    //send response
    res.status(200).json({
      success: true,
      message: "Blogs fetched successfully",
      data: blogs,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Error while fetching all blogs",
    });
  }
};

//get single blogs
exports.getBlog = async (req, res) => {
  try {
    //get slug from req.params
    const { slug } = req.params;
    //validate
    if (!slug) {
      return res.status(404).json({
        success: false,
        message: "Slug is required",
      });
    }
    //fetch blog
    const blog = await Blog.findOne({ slug });
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    //send res
    res.status(200).json({
      success: true,
      message: "Blog found",
      data: blog,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

//get category wise blogs
exports.getBlogsByCategory = async (req, res) => {
  try {
    //get category from req.params
    const { category } = req.params;
    //validate category
    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Category is required",
      });
    }
    //fetch blogs
    const blogs = await Blog.find({ category });
    if (blogs.length == 0) {
      return res.status(200).json({
        message: "Blogs not found",
        success: true,
      });
    }
    //return res
    res.status(200).json({
      success: true,
      message: "Blogs found",
      data: blogs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//get blog by search
exports.getBlogsBySearch = async (req, res) => {
  try {
    const { search = "" } = req.query;

    const query = {};

    if (search) {
      query.$or = [
        {
          title: {
            $regex: search,
            $options: "i",
          },
        },
        {
          description: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    const blogs = await Blog.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Blogs found",
      data: blogs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//get trending blogs
exports.trendingBlogs = async (req, res) => {
  try {
    //fetch trending data
    const blogs = await Blog.find({ trending: true });
    if (blogs.length == 0) {
      return res.status(200).json({
        success: true,
        message: "Data not avalable",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Trending blogs fetched",
      data: blogs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getCategories = async(req, res) => {
  try{
    const response = await Blog.distinct("category");
    if(!response){
      return res.status(404).json({
        success: false,
        message: "Categories not found",
      })
    }

    res.status(200).json({
      success: true,
      message: "Category found",
      categories: response,
    })
  }catch(error){
    return res.status(500).json({
      success: false,
      message : error.message
    })
  }
}
