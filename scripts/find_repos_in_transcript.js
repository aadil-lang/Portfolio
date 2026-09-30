const fs = require('fs');
const readline = require('readline');

async function findRepoPaths() {
  const fileStream = fs.createReadStream('C:/Users/HP/.gemini/antigravity-ide/brain/11de3970-5f5f-45db-b0a9-5b44ef2df406/.system_generated/logs/transcript.jsonl');
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let count = 0;
  for await (const line of rl) {
    if (line.includes('git clone') || line.includes('github.com/aadil') || line.includes('eval-layer.ts') || line.includes('governance')) {
      const matches = line.match(/(https:\/\/github\.com\/[a-zA-Z0-9_\-\/]+)/g);
      if (matches) {
        console.log(count, Array.from(new Set(matches)));
      }
      const filePaths = line.match(/[a-zA-Z]:\\[a-zA-Z0-9_\-\\]+\.[a-zA-Z0-9]+/g);
      if (filePaths) {
        console.log(count, 'Paths:', Array.from(new Set(filePaths)).slice(0, 3));
      }
    }
    count++;
  }
}

findRepoPaths();
