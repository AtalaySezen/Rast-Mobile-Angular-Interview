const mongoose = require("mongoose");

const SocialMediaSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    url: { type: String, required: true },
    description: { type: String },
  },
  {
    timestamps: { createdAt: "createdDate" },
  }
);

module.exports = mongoose.model("SocialMedia", SocialMediaSchema);
