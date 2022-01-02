const compression = require("compression");
const express = require("express");
const cors = require("cors");
const products = require("./products.json");
const fs = require("fs");
const path = require("path");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const app = express();

app.use(cors());
app.use(express.json());
app.use(compression());

app.get("/", (req, res) => {
  res.status(200).send({ name: "checkout api", environment: "local" });
});

app.get("/product", async (req, res) => {
  const products = await prisma.products.findMany({
    include: { reviews: true },
  });
  res.status(200).json(products);
});

app.post("/product/review", async (req, res) => {
  const { id, averageRating, totalReviews, ...rest } = req.body;

  console.log(totalReviews);

  await prisma.products.update({
    where: { id },
    data: {
      averageRating,
      totalReviews,
    },
  });

  const addReview = await prisma.reviews.create({
    data: {
      id: `${id}_${totalReviews}`,
      ...rest,
      products: { connect: { id } },
    },
  });

  res.status(200).json(addReview);
});
const port = process.env.PORT || 4500;
app.listen(port, () => console.log(`Starting at localhost:4500`));

/* app.post("/product/review", (req, res) => {
  const { id, averageRating, totalReviews, ...rest } = req.body;
  const product = products.find((product) => product.id === id);
  if (product.reviews) {
    const updatedProduct = {
      ...product,
      averageRating,
      totalReviews,
      reviews: [rest, ...product.reviews],
    };

    const updatedProducts = products.map((product) =>
      product.id === id ? updatedProduct : product
    );
    fs.writeFileSync(
      path.resolve("./products.json"),
      JSON.stringify(updatedProducts),
      "utf-8"
    );
    res.status(200).json(updatedProduct);
  }
}); */
