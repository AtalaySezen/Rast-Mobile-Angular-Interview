const express = require("express");
const SocialMedia = require("../models/SocialMedia");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
  const { name, url, description } = req.body;

  try {
    const newSocialMedia = new SocialMedia({ name, url, description });
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

// Veriyi pagination ile almak için
router.get("/", authMiddleware, async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Varsayılan değer
  const limit = parseInt(req.query.limit) || 10; //Frontend tarafından parametre gelmez ise varsayılan değer

  try {
    const skip = (page - 1) * limit;
    const socialMedia = await SocialMedia.find().skip(skip).limit(limit);

    const totalItems = await SocialMedia.countDocuments();

    const totalPages = Math.ceil(totalItems / limit);

    res.json({
      status: "success",
      message: "",
      data: {
        socialMedia,
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
  try {
    const socialMedia = await SocialMedia.findById(req.params.id);
    if (!socialMedia) {
      return res.status(404).json({
        status: "error",
        message: "Veri Bulunamadı",
        data: null,
      });
    }
    res.json({
      status: "success",
      message: "",
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
  try {
    const socialMedia = await SocialMedia.findByIdAndDelete(req.params.id);
    if (!socialMedia) {
      return res.status(404).json({
        status: "error",
        message: "Veri Bulunamadı",
        data: null,
      });
    }
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

  try {
    const updatedSocialMedia = await SocialMedia.findByIdAndUpdate(
      req.params.id,
      { name, url, description },
      { new: true, runValidators: true }
    );

    if (!updatedSocialMedia) {
      return res.status(404).json({
        status: "error",
        message: "Veri Bulunamadı",
        data: null,
      });
    }

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
