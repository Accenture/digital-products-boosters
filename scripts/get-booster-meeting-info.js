const fs = require("fs");
const readline = require("readline");

const getBoosterMeetingInfo = question =>
  new Promise(resolve => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.question(question, answer => {
      rl.close();
      const deckPath = `boosters/${answer}/deck.mdx`;
      const deckExists = fs.existsSync(deckPath);

      if (deckExists) {
        resolve({ deckPath, name: answer });
      } else {
        console.log(`\ndeck file not found in ${deckPath}`);
        resolve(null);
      }
    });
  });

module.exports = getBoosterMeetingInfo;
