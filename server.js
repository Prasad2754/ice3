const express = require('express');
const lodash = require('lodash');

const app = express();
const port = 3000;

// ❌ Vulnerable: Prototype Pollution in lodash
const maliciousPayload = '{"__proto__": {"admin": true}}';
const user = {};
lodash.merge(user, JSON.parse(maliciousPayload));

console.log("User object after malicious payload:", user);

// ❌ Vulnerable: No input sanitization in user input
app.get('/unsafe', (req, res) => {
    let userInput = req.query.input; // No validation!
    res.send(`User input: ${userInput}`);
});

// ❌ Vulnerable: Hardcoded secret key (Security Misconfiguration)
const secretKey = "mySuperSecretKey123"; 

// ❌ Vulnerable: Running on HTTP instead of HTTPS (Sensitive Data Exposure)
app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
});
