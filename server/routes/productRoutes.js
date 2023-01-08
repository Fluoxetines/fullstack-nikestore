import express from "express";
import Product from "../models/productModel.js";
import cloudinary from "../utils/cloudinary.js";

const productRouter = express.Router();

// get product

productRouter.get("/", async (req, res) => {
  const products = await Product.find();
  res.send(products);
});

// create product

productRouter.post("/", async (req, res) => {
  const { name, description, image, rating, price } = req.body;

  try {
    if (image) {
      const uploadedResponse = await cloudinary.uploader.upload(image, {
        upload_preset: "nike-shop",
      });

      if (uploadedResponse) {
        const product = new Product({
          name,
          description,
          rating,
          price,
          image: uploadedResponse,
        });

        const saveProduct = await product.save();
        res.status(200).send(saveProduct);
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

// update product

productRouter.put("/:id", async (req, res) => {
  const { image } = req.body;
  const productId = req.params.id;
  const product = await Product.findById(productId);
  const uploadedResponse = await cloudinary.uploader.upload(image, {
    upload_preset: "nike-shop",
  });
  if (product) {
    product.name = req.body.name;
    product.description = req.body.description;
    product.rating = req.body.rating;
    product.price = req.body.price;
    product.image = uploadedResponse;

    await product.save();
    res.send({ message: "Product Updated !" });
  } else {
    res.status(404).send({ message: "Product Not Found !" });
  }
});

// delete product

productRouter.delete("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove();
    res.send({ message: "Product Deleted" });
  } else {
    res.status(404).send({ message: "Product Not Found !" });
  }
});

// get product from id

productRouter.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product Not Found !" });
  }
});

export default productRouter;
