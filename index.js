const express = require('express');
const app = express();

app.use(express.json());

const PORT = 3000;

let users = [
    { id: 1, name: 'Aarav', email: 'aarav@example.com' },
    { id: 2, name: 'Diya', email: 'diya@example.com' }
];

// Get all users
app.get('/users', (req, res) => {
    res.json(users);
});

// Get a single user by id
app.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id === Number(req.params.id));
    if (!user) {
        return res.status(404).send('User not found');
    }
    res.json(user);
});

// Create a new user
app.post('/users', (req, res) => {
    const { name, email } = req.body;
    const newUser = {
        id: users.length + 1,
        name,
        email
    };
    users.push(newUser);
    res.status(201).json(newUser);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});