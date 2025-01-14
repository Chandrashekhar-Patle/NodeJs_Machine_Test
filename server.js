const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

// Initialize Express App
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Chandra@123", // Replace with your MySQL root password
  database: "ProductCategoryDB",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the MySQL database.");
});

// Routes

// --- Category Routes ---
// Get all categories
app.get("/api/categories", (req, res) => {
  const query = "SELECT * FROM categories";
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch categories." });
    } else {
      res.json(results);
    }
  });
});

// Create a new category
app.post("/api/categories", (req, res) => {
  const { categoryName } = req.body;
  const query = "INSERT INTO categories (categoryName) VALUES (?)";
  db.query(query, [categoryName], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to create category." });
    } else {
      res.json({
        message: "Category created successfully!",
        id: result.insertId,
      });
    }
  });
});

// Update a category
app.put("/api/categories/:id", (req, res) => {
  const { id } = req.params;
  const { categoryName } = req.body;
  const query = "UPDATE categories SET categoryName = ? WHERE categoryId = ?";
  db.query(query, [categoryName, id], (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to update category." });
    } else {
      res.json({ message: "Category updated successfully!" });
    }
  });
});

// Delete a category
app.delete("/api/categories/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM categories WHERE categoryId = ?";
  db.query(query, [id], (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to delete category." });
    } else {
      res.json({ message: "Category deleted successfully!" });
    }
  });
});

// --- Product Routes ---
// Get paginated products
app.get("/api/products", (req, res) => {
    const query = "SELECT * FROM products";
    db.query(query, (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch categories." });
      } else {
        res.json(results);
      }
    });
  });
// Create a new product
app.post("/api/products", (req, res) => {
  const { productName, categoryId } = req.body;
  const query = "INSERT INTO products (productName, categoryId) VALUES (?, ?)";
  db.query(query, [productName, categoryId], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to create product." });
    } else {
      res.json({
        message: "Product created successfully!",
        id: result.insertId,
      });
    }
  });
});

// Update a product
app.put("/api/products/:id", (req, res) => {
  const { id } = req.params;
  const { productName, categoryId } = req.body;
  const query =
    "UPDATE products SET productName = ?, categoryId = ? WHERE productId = ?";
  db.query(query, [productName, categoryId, id], (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to update product." });
    } else {
      res.json({ message: "Product updated successfully!" });
    }
  });
});

// Delete a product
app.delete("/api/products/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM products WHERE productId = ?";
  db.query(query, [id], (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to delete product." });
    } else {
      res.json({ message: "Product deleted successfully!" });
    }
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
