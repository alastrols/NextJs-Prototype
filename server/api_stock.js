const express = require("express");
const router = express.Router();
const product = require("./models/product");
const Sequelize = require("sequelize");
const constants = require("./constant");
const formidable = require("formidable");
const path = require("path");
const fs = require("fs-extra");
const Op = Sequelize.Op;
const jwt = require("./jwt");
const axios = require("axios").default;

// Upload Image
uploadImage = async (files, doc) => {
  if (files.image != null) {
    var fileExtention = files.image.originalFilename.split(".")[1];
    doc.image = `${doc.id}.${fileExtention}`;
    var newpath =
      path.resolve(__dirname + "/uploaded/images/") + "/" + doc.image;
    if (fs.existsSync(newpath)) {
      await fs.remove(newpath);
    }
    await fs.moveSync(files.image.filepath, newpath);

    // Update database
    let result = product.update(
      { image: doc.image },
      { where: { id: doc.id } }
    );
    return result;
  }
};

// Get Products
router.get("/product", async (req, res) => {
  let result = await product.findAll({ order: Sequelize.literal("id DESC") });

  // for (i = 0; i < result.length; i++) {
  //   result[i].image = "http://localhost:8085/images/" + result[i].image;
  //   try {
  //     let axiosResponse = await axios(result[i].image, {
  //       responseType: "arraybuffer",
  //     });
      
  //     result[i].image = Buffer.from(axiosResponse.data, "binary").toString(
  //       "base64"
  //     );
  //     console.log(result[i].image)
  //     // result[i].image = axiosResponse
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  res.json(result);
});

// Add Product
router.post("/product", jwt.verify, async (req, res) => {
  try {
    const form = new formidable.IncomingForm();
    form.parse(req, async (error, fields, files) => {
      let result = await product.create(fields);
      result = await uploadImage(files, result);
      res.json({
        result: constants.kResultOk,
        message: JSON.stringify(result),
      });
    });
  } catch (error) {
    res.json({ result: constants.kResultNok, message: JSON.stringify(error) });
  }
});

// Update Product
router.put("/product", jwt.verify, async (req, res) => {
  try {
    var form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      let result = await product.update(fields, { where: { id: fields.id } });
      result = await uploadImage(files, fields);

      res.json({
        result: constants.kResultOk,
        message: JSON.stringify(result),
      });
    });
  } catch (err) {
    res.json({ result: constants.kResultNok, message: JSON.stringify(err) });
  }
});

// Delete Product
router.delete("/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let result = await product.findOne({ where: { id: id } });
    await fs.remove(
      path.resolve(__dirname + "/uploaded/images/") + "/" + result.image
    );
    result = await product.destroy({ where: { id: id } });
    res.json({ result: constants.kResultOk, message: JSON.stringify(result) });
  } catch (error) {
    res.json({ result: constants.kResultNok, message: "Internal error" });
  }
});

// Get Product by Id
router.get("/product/:id", async (req, res) => {
  let result = await product.findOne({ where: { id: req.params.id } });
  if (result) {
    res.json(result);
  } else {
    res.json({});
  }
});

// Get Products by Keyword
router.get("/product/keyword/:keyword", async (req, res) => {
  const { keyword } = req.params;
  let result = await product.findAll({
    where: { name: { [Op.like]: `%${keyword}%` } },
  });
  res.json(result);
});

module.exports = router;
