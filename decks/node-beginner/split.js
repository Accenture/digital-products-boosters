import styled from '@emotion/styled';
import React from 'react';
import {
  alignItems,
  color,
  flexDirection,
  flexWrap,
  justifyContent,
  space,
  width,
} from 'styled-system';

const Box = styled.div(
  {
    flex: 'none',
    minWidth: 0,
  },
  width,
  space,
  color,
);

const Flex = styled(Box)(
  {
    display: 'flex',
  },
  alignItems,
  justifyContent,
  flexWrap,
  flexDirection,
);

Flex.defaultProps = {
  justifyContent: 'center',
  flexDirection: 'row',
};

const Split = ({ children }) => {
  const [a, ...rest] = React.Children.toArray(children);
  return (
    <Flex
      css={{
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '68vw',
      }}
    >
      <Box width={0.48}>{a}</Box>
      <Box width={0.48}>{rest}</Box>
    </Flex>
  );
};

export default Split;
