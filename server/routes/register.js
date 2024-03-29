const express = require("express");
const router = express.Router();
const pool = require("../db/db");
const validate = require("../validations/users");
const bcrypt = require('bcrypt');

router.post("/", async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    try {
        const rs = await pool.query("SELECT * FROM users WHERE email = $1", [req.body.email]);
        if (rs.rowCount > 0) return res.status(400).json({ message: "User already registered." });
    
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(req.body.password, salt);
    
        await pool.query("INSERT INTO users (email, password) VALUES($1, $2)", [req.body.email, password]);
    
        res.json({ message: "User registered." });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

module.exports = router;