const router = require("express").Router();
const cloudinary = require("cloudinary");
const fs = require("fs");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Uplad image only admin can use   (19:18)  20:30  (23:07) (24:32)
router.post("/upload", auth, authAdmin, (req, res) => {
  //router.post("/upload", (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0)
      return res.status(400).send("No files were uploaded.");

    const file = req.files.file;
    if (file.size > 1024 * 1024) return res.status(400).json({ msg: "Size too large" });

    if (file.mimetype !== "image/png" && file.mimetype !== "image/jpeg")
      return res.status(400).json({ msg: "File format is incorrect" });

    cloudinary.v2.uploader.upload(
      file.tempFilePath,
      { folder: "ecommerce" },
      async (err, result) => {
        if (err) throw err;

        fs.unlink(file.tempFilePath, (err) => {
          if (err) throw err;
        });

        res.json({ public_id: result.public_id, url: result.secure_url });
      }
    );
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});

// Delete image only admin can use   (20:30)  20:30
router.post("/destroy", auth, authAdmin, (req, res) => {
  //router.post("/destroy", (req, res) => {
  try {
    const { public_id } = req.body;
    if (!public_id) return res.status(400).json({ msg: "No Images Selected" });

    cloudinary.v2.uploader.destroy(public_id, async (err, result) => {
      if (err) throw err;
      res.json({ msg: "Deleted Image" });
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});

module.exports = router;
// Film 06   24:20   24:40
