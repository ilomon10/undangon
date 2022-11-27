import { Icon } from '@blueprintjs/core';
import { Element, useEditor } from '@craftjs/core';
import { Tooltip2 } from '@blueprintjs/popover2';
import React from 'react';
import styled from 'styled-components';

import { Button } from '../selectors/Button';
import { Container } from '../selectors/Container';
import { Text } from '../selectors/Text';
import { Video } from '../selectors/Video';

const ToolboxDiv = styled.div`
  transition: 0.4s cubic-bezier(0.19, 1, 0.22, 1);
  ${(props) => (!props.enabled ? `width: 0;` : '')}
  ${(props) => (!props.enabled ? `opacity: 0;` : '')}
`;

const Item = styled.a`
  svg {
    width: 22px;
    height: 22px;
    fill: #707070;
  }
  ${(props) =>
    props.move &&
    `
    cursor: move;
  `}
`;

export const Toolbox = () => {
  const {
    enabled,
    connectors: { create },
  } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  return (
    <ToolboxDiv
      enabled={enabled && enabled}
      className="toolbox transition w-12 h-full flex flex-col bg-white"
    >
      <div className="flex flex-1 flex-col items-center pt-3">
        <div
          ref={(ref) =>
            create(
              ref,
              <Element
                canvas
                is={Container}
                background={{ r: 78, g: 78, b: 78, a: 1 }}
                color={{ r: 0, g: 0, b: 0, a: 1 }}
                height="300px"
                width="300px"
              ></Element>
            )
          }
        >
          <Tooltip2 title="Container" placement="right">
            <Item className="m-2 pb-2 cursor-pointer block" move>
              <Icon icon="rectangle" />
            </Item>
          </Tooltip2>
        </div>
        <div
          ref={(ref) =>
            create(ref, <Text fontSize="12" textAlign="left" text="Hi there" />)
          }
        >
          <Tooltip2 title="Text" placement="right">
            <Item className="m-2 pb-2 cursor-pointer block" move>
              <Icon icon="paragraph" />
            </Item>
          </Tooltip2>
        </div>
        <div ref={(ref) => create(ref, <Button />)}>
          <Tooltip2 title="Button" placement="right">
            <Item className="m-2 pb-2 cursor-pointer block" move>
              <Icon icon="stadium-geometry" />
            </Item>
          </Tooltip2>
        </div>
        <div ref={(ref) => create(ref, <Video />)}>
          <Tooltip2 title="Video" placement="right">
            <Item className="m-2 pb-2 cursor-pointer block" move>
              <Icon icon="video" />
            </Item>
          </Tooltip2>
        </div>
      </div>
    </ToolboxDiv>
  );
};
