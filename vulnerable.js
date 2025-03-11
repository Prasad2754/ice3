const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

// ❌ No input validation - allows Command Injection!
app.get('/unsafe', (req, res) => {
    let userInput = req.query.cmd;
    require('child_process').exec(userInput, (err, stdout, stderr) => {
        if (err) {
            res.send(`Error: ${err}`);
        } else {
            res.send(`Command Output: ${stdout}`);
        }
    });
});

// ❌ Hardcoded secret (Security Misconfiguration)
const secretKey = "MySuperSecretPassword123";

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
