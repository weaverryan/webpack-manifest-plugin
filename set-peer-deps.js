const fs = require('fs');
const path = require('path');

const version = process.argv[2];
if (!version) {
  console.log('Please pass the webpack version - "^4" or "^5" - as an argument.');
}

const packageData = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json')));
packageData.peerDependencies.webpack = version;

fs.writeFileSync(path.join(__dirname, 'package.json'), JSON.stringify(packageData, null, 2));
