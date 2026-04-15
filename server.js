const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

// This is your mock database
const db = [];

app.post('/register', (req, res) => {
    const { name, email, idNumber, role } = req.body;

    // --- DUPLICATE/FRAUD CHECK ---
    const alreadyExists = db.some(u => u.idNumber === idNumber || u.email === email);
    
    if (alreadyExists) {
        return res.status(400).json({ error: "Duplicate ID or Email detected. Please contact admin." });
    }

    db.push(req.body);
    console.log(`Verified: ${name} signed up as ${role}`);
    res.json({ message: "Registration successful!" });
});

app.listen(3000, () => console.log('Backend running on http://localhost:3000'));