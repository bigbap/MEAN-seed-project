var fs = require('fs')
var resolve = require('path').resolve
var join = require('path').join
var cp = require('child_process')
 
// get library path
var lib = resolve(__dirname, '../');

console.log('installing dependecies in client...');
 
fs.readdirSync(lib)
  .forEach(function (mod) {
    var modPath = join(lib, mod);
 
    // ensure path has package.json
    if (!fs.existsSync(join(modPath, 'package.json'))) return
 
    // install folder
    cp.exec('npm install', { env: process.env, cwd: modPath });
  });