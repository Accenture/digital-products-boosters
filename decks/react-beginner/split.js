import styled from "@emotion/styled";
import React from "react";
import {
  alignItems,
  color,
  flexDirection,
  flexWrap,
  justifyContent,
  space,
  width
} from "styled-system";

const Box = styled.div(
  {
    flex: "none",
    minWidth: 0
  },
  width,
  space,
  color
);

const Flex = styled(Box)(
  {
    display: "flex"
  },
  alignItems,
  justifyContent,
  flexWrap,
  flexDirection
);

Flex.defaultProps = {
  justifyContent: "center",
  flexDirection: "row"
};

const Split = ({ children }) => {
  const [a, ...rest] = React.Children.toArray(children);
  return (
    <Flex
      css={{
        alignItems: "center"
      }}
    >
      <Box width={7 / 16}>{a}</Box>
      <Box width={9 / 16}>{rest}</Box>
    </Flex>
  );
};

export default Split;
