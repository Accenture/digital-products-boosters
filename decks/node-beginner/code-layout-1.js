import { ThemeProvider } from 'emotion-theming';
import styled from '@emotion/styled';
import { Slide } from '@mdx-deck/components';

// For meeting 2
const theme = {
  pre: {
    fontSize: '.45em',
  },
  ul: {
    fontSize: '0.9em',
  },
  ol: {
    fontSize: '0.9em',
  },
  noGap: {
    margin: 0,
    padding: 0,
  },
};

const Div = styled.div(props => ({
  height: '100vh',
  width: '100vw',
  display: 'flex',
  padding: '0 20px',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
  ['& pre']: props.theme.pre,
  ['& ul']: props.theme.ul,
  ['& ol']: props.theme.ol,
  ['& h1']: props.theme.noGap,
  ['& h2']: props.theme.noGap,
  ['& p']: props.theme.noGap,
}));

export default ({ children }) => (
  <ThemeProvider theme={theme}>
    <Div>{children}</Div>
  </ThemeProvider>
);
