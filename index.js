const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// i) Logging middleware — prints HTTP method and URL for every incoming request
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// In-memory products array (at least 4 objects with id, name, price)
let products = [
  { id: 1, name: 'Wireless Mouse', price: 599 },
  { id: 2, name: 'Mechanical Keyboard', price: 2499 },
  { id: 3, name: 'USB-C Charger', price: 899 },
  { id: 4, name: 'Bluetooth Headphones', price: 1999 }
];

// Helper to generate the next unique id
function getNextId() {
  return products.length > 0
    ? Math.max(...products.map(p => p.id)) + 1
    : 1;
}

// iv) GET /products/search?keyword= — must be defined BEFORE /products/:id
// so that "search" isn't mistakenly treated as an :id value
app.get('/products/search', (req, res) => {
  const { keyword } = req.query;

  if (!keyword) {
    return res.status(400).json({ message: 'Please provide a keyword query parameter, e.g. /products/search?keyword=mouse' });
  }

  const matches = products.filter(p =>
    p.name.toLowerCase().includes(keyword.toLowerCase())
  );

  if (matches.length === 0) {
    return res.status(404).json({ message: `No products found matching keyword "${keyword}"` });
  }

  res.status(200).json(matches);
});

// ii) GET /products — returns all products
app.get('/products', (req, res) => {
  res.status(200).json(products);
});

// iii) GET /products/:id — returns a single product by id, or 404 message
app.get('/products/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    return res.status(400).json({ message: 'Invalid product id. It must be a number.' });
  }

  const product = products.find(p => p.id === id);

  if (!product) {
    return res.status(404).json({ message: `Product with id ${id} not found.` });
  }

  res.status(200).json(product);
});

// v) POST /products — adds a new product using data from req.body
app.post('/products', (req, res) => {
  const { name, price } = req.body;

  if (!name || price === undefined) {
    return res.status(400).json({ message: 'Both "name" and "price" are required in the request body.' });
  }

  if (typeof price !== 'number' || price < 0) {
    return res.status(400).json({ message: '"price" must be a positive number.' });
  }

  const newProduct = {
    id: getNextId(),
    name,
    price
  };

  products.push(newProduct);

  res.status(201).json(newProduct);
});

// Catch-all for undefined routes
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});