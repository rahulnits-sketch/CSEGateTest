const fs = require('fs');
const path = require('path');

const srcMatches = new Set();
function scanDir(dir) {
  for (const f of fs.readdirSync(dir)) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) {
      scanDir(full);
    } else if (f.endsWith('.json')) {
      const content = fs.readFileSync(full, 'utf8');
      const regex = /src=\\"([^"\\]+)\\"|src="([^"]+)"/g;
      let m;
      while ((m = regex.exec(content)) !== null) {
        srcMatches.add(m[1] || m[2]);
      }
    }
  }
}

scanDir('data/gate');
console.log('Total unique src attributes found:', srcMatches.size);
const list = Array.from(srcMatches);
console.log('Sample src attributes:');
list.slice(0, 40).forEach(s => console.log(' -', s));

// Check if each exists in public
let missing = 0;
let present = 0;
list.forEach(src => {
  // Strip leading slash
  let clean = src.replace(/^\/+/, '');
  // test directly or with /question-images or /images
  let direct = path.join('public', clean);
  let inQuestionImages = path.join('public', 'question-images', path.basename(clean));
  let inImages = path.join('public', 'images', path.basename(clean));
  let inGateQA = path.join('public', 'Gate_QA', clean.replace(/^Gate_QA\//, ''));
  
  if (fs.existsSync(direct)) {
    present++;
  } else if (fs.existsSync(inQuestionImages)) {
    present++;
    // console.log(`Found in question-images: ${src} -> ${inQuestionImages}`);
  } else if (fs.existsSync(inImages)) {
    present++;
  } else {
    missing++;
    console.log(`MISSING: ${src}`);
  }
});
console.log(`Present: ${present}, Missing: ${missing}`);
