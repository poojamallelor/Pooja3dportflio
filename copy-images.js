const fs = require('fs');
const path = require('path');

const src1 = "C:\\Users\\pooja\\.gemini\\antigravity-ide\\brain\\612a89da-00fa-4909-8187-2f82b1037cec\\.tempmediaStorage\\media_1788073071375.png";
const dest1 = path.join(__dirname, 'public', 'projects', 'career-pilot-ai.png');
fs.copyFileSync(src1, dest1);

const src2 = "C:\\Users\\pooja\\.gemini\\antigravity-ide\\brain\\612a89da-00fa-4909-8187-2f82b1037cec\\.tempmediaStorage\\media_1788073071427.png";
const dest2 = path.join(__dirname, 'public', 'projects', 'next-hire-ai.png');
fs.copyFileSync(src2, dest2);

const src3 = "C:\\Users\\pooja\\.gemini\\antigravity-ide\\brain\\612a89da-00fa-4909-8187-2f82b1037cec\\.tempmediaStorage\\media_1788073071536.png";
const dest3 = path.join(__dirname, 'public', 'projects', 'learning-disability-ai.png');
fs.copyFileSync(src3, dest3);

console.log("Images copied successfully!");
