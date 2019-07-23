const childProcess = require("child_process");
const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question =
  "please input booster and meeting slides you would like to run (i.e. react-beginner/meeting-1)?\n";

rl.question(question, answer => {
  const deckPath = `boosters/${answer}/deck.mdx`;
  const deckExists = fs.existsSync(deckPath);

  if (deckExists) {
    const server = childProcess.spawn("yarn", ["mdx-deck", deckPath]);

    server.stdout.on("data", data => console.log(data.toString()));
    server.stderr.on("data", data => console.log(data.toString()));
    server.on("close", code =>
      console.log(`child process exited with code ${code}`)
    );
  } else {
    console.log(`deck file not found in ${deckPath}`);
  }

  rl.close();
});
