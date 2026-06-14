const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
    },
    shortDescription: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    keywords: [String],
    category: {
      type: String,
      required: true,
    },
    trending: {
      type: Boolean,
      required: true,
    }
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Blog", blogSchema);
