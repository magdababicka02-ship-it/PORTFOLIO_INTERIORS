// Run after editing shared assets so browsers request the matching release.
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const root = path.resolve(__dirname, '..');
const versions = Object.fromEntries(['styles.css', 'catalog.js', 'i18n-es.js', 'site.js'].map(name => [
  name, crypto.createHash('sha256').update(fs.readFileSync(path.join(root, name))).digest('hex').slice(0, 12)
]));
let updated = 0;
for (const directory of [root, path.join(root, 'obrazy-na-zamowienie')]) {
  for (const name of fs.readdirSync(directory).filter(name => name.endsWith('.html'))) {
    const file = path.join(directory, name);
    const original = fs.readFileSync(file, 'utf8');
    const prepared = original.includes('i18n-es.js') ? original : original.replace(/<script src="((?:\.\.\/)?)site\.js(?:\?[^"]*)?" defer>/,
      (_, prefix) => '<script src="' + prefix + 'i18n-es.js" defer></script><script src="' + prefix + 'site.js" defer>');
    const versioned = prepared.replace(/((?:src|href)="(?:\.\.\/)?)(styles\.css|catalog\.js|i18n-es\.js|site\.js)(?:\?[^"]*)?"/g,
      (_, prefix, asset) => prefix + asset + '?v=' + versions[asset] + '"');
    if (versioned !== original) {
      fs.writeFileSync(file, versioned);
      updated++;
    }
  }
}
console.log(JSON.stringify({updatedPages: updated, versions}));
