import { code, syntaxHighlighterPrism } from "@mdx-deck/themes";

const white = "#ffffff";
const black = "#000000";
const link = "#1a1a1a";

export const theme = syntaxHighlighterPrism({
  ...code,
  a: {
    backgroundColor: "rgba(187,239,253,0.3)",
    borderBottom: "2px solid rgba(0,0,0,0.2)",
    textDecoration: "none",
    "&:hover": {
      backgroundColor: "#bbeffd",
      borderBottomColor: "#1a1a1a"
    }
  },
  pre: {
    fontSize: ".75em"
  },
  code: {
    backgroundColor: "rgba(255, 229, 100, 0.2)"
  },
  font:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
  monospace:
    '"Source Code Pro", Menlo, Monaco, Consolas, "Courier New", monospace',
  googleFont: "https://fonts.googleapis.com/css?family=Source+Code+Pro",
  colors: {
    text: black,
    background: white,
    code: "rgb(26, 26, 26)",
    link,
    pre: white,
    preBackground: black
  },
  Slide: {
    padding: "0 10px"
  }
});
