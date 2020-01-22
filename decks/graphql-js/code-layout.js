import { ThemeProvider } from "emotion-theming";
import styled from "@emotion/styled";
import { Slide } from "@mdx-deck/components";

const theme = {
  pre: {
    fontSize: ".45em"
  }
};

const Div = styled.div(props => ({
  height: "100vh",
  width: "100vw",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
  ["& pre"]: {
    fontSize: props.theme.pre.fontSize
  },
  ["& h2"]: {
    margin: 0
  },
  ["& p"]: {
    margin: 0
  }
}));

export default ({ children }) => (
  <ThemeProvider theme={theme}>
    <Div>{children}</Div>
  </ThemeProvider>
);
