const express = require('express');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

//implement the CORS config
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Methods", "GET, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200); // Respond with OK to OPTIONS requests
      }
    next();
  });

//products array
let products = [
    { id: 1, name: 'Product 1', description: 'description 1', price: 100, imageUrl: '' },
    { id: 2, name: 'Product 2', description: 'description 2', price: 200, imageUrl: '' },
    { id: 3, name: 'Product 3', description: 'description 3', price: 300, imageUrl: '' },
    { id: 4, name: 'Product 4', description: 'description 4', price: 150, imageUrl: '' },
    { id: 5, name: 'Product 5', description: 'description 5', price: 500, imageUrl: '' },
    { id: 6, name: 'Product 6', description: 'description 6', price: 50, imageUrl: '' },
];

//function to generate a url for getting a random image from picsum
const fetchImageUrl = () => {
    return `https://picsum.photos/200/200?random=${Math.floor(Math.random() * 1000)}`;
};

const idMap = new Map();

for (var i=0; i<products.length;i++) {
    idMap.set((i+1).toString(), products[i]);
    products[i].imageUrl = fetchImageUrl();
}

//implement the get api for getting products
app.get('/api/products', (req, res) => {
    res.send(products);
});

//implement the delete api for deleting a product by Id
app.delete('/api/products/:id', (req, res) => {
    if (idMap.has(req.params.id)) {
        const outelem = idMap.get(req.params.id);
        products.splice(products.indexOf(outelem), 1);
        idMap.delete(req.params.id);
        res.send(outelem);
    } else {
        throw new Error('id doesn\'t exist');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
