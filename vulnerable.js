const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

// ❌ Vulnerability #1: No Input Validation (Open to Command Injection)
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

// ❌ Vulnerability #2: Hardcoded Credentials (Information Disclosure)
const dbPassword = "SuperSecret123"; // Hardcoded secret key (Sensitive Data Exposure)

// ❌ Vulnerability #3: Reading Files Without Restrictions (Local File Inclusion)
app.get('/read', (req, res) => {
    let filePath = req.query.file;
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            res.send("Error reading file");
        } else {
            res.send(data);
        }
    });
});

// ❌ Vulnerability #4: Running HTTP Instead of HTTPS (Sensitive Data Exposure)
app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
});
