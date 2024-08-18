const express = require("express");
const SocialMedia = require("../models/SocialMedia");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
  const { name, url, description } = req.body;
  const userId = req.user.id;

  try {
    const newSocialMedia = new SocialMedia({ name, url, description, userId });
    await newSocialMedia.save();
    res.status(201).json({
      status: "success",
      message: "Başarılı",
      data: newSocialMedia,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
      data: null,
    });
  }
});

router.get("/", authMiddleware, async (req, res) => {
  const userId = req.user.id;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit);

  try {
    const checkFetchAll = isNaN(limit) || limit <= 0;
    const skip = checkFetchAll ? 0 : (page - 1) * limit;
    const getLimit = checkFetchAll ? Number.MAX_SAFE_INTEGER : limit;

    const socialMedia = await SocialMedia.find({ userId })
      .skip(skip)
      .limit(getLimit);

    const totalItems = await SocialMedia.countDocuments({ userId });
    const totalPages = checkFetchAll ? 1 : Math.ceil(totalItems / limit);

    res.json({
      status: "success",
      message: "",
      data: {
        socialMedia: socialMedia,
        totalPages: totalPages,
        totalItemCount: totalItems,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
      data: null,
    });
  }
});

router.get("/:id", authMiddleware, async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;

  try {
    const socialMedia = await SocialMedia.findOne({ _id: id, userId });
    if (!socialMedia)
      return res.status(404).json({
        status: "error",
        message: "Veri Bulunamadı",
        data: null,
      });
    res.json({
      status: "success",
      message: "Başarılı",
      data: socialMedia,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
      data: null,
    });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;

  try {
    const socialMedia = await SocialMedia.findOneAndDelete({ _id: id, userId });
    if (!socialMedia)
      return res.status(404).json({
        status: "error",
        message: "Veri Bulunamadı",
        data: null,
      });
    res.json({
      status: "success",
      message: "Başarıyla Silindi",
      data: null,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
      data: null,
    });
  }
});

router.put("/:id", authMiddleware, async (req, res) => {
  const { name, url, description } = req.body;
  const userId = req.user.id;
  const { id } = req.params;

  try {
    const updatedSocialMedia = await SocialMedia.findOneAndUpdate(
      { _id: id, userId },
      { name, url, description },
      { new: true, runValidators: true }
    );

    if (!updatedSocialMedia)
      return res.status(404).json({
        status: "error",
        message: "Veri Bulunamadı",
        data: null,
      });

    res.json({
      status: "success",
      message: "Güncellendi",
      data: updatedSocialMedia,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
      data: null,
    });
  }
});

module.exports = router;
