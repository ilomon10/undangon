import { useEditor, useNode } from "@craftjs/core";
import { Menu, Popover } from "@mantine/core";
import { ROOT_NODE } from "@craftjs/utils";
import { Box, Flex } from "components/Grid";
import { useCallback, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { getCloneTree } from "../utils/getCloneTree";

export const RenderNode = ({ render }) => {
  const { id } = useNode();
  const currentRef = useRef();
  const { actions, query, isActive } = useEditor((_, query) => ({
    isActive: query.getEvent("selected").contains(id),
  }));

  const {
    isHover,
    dom,
    name,
    duplicatable,
    moveable,
    deletable,
    connectors: { drag },
    parent,
  } = useNode((node) => ({
    isHover: node.events.hovered,
    dom: node.dom,
    name: node.data.custom.displayName || node.data.displayName,
    duplicatable: query.node(node.id).isDeletable(),
    moveable: query.node(node.id).isDraggable(),
    deletable: query.node(node.id).isDeletable(),
    parent: node.data.parent,
    props: node.data.props,
  }));

  useEffect(() => {
    if (dom) {
      if (isActive || isHover) dom.classList.add("component-selected");
      else dom.classList.remove("component-selected");
    }
  }, [dom, isActive, isHover]);

  const getPos = useCallback((dom) => {
    const { top, left, bottom } = dom
      ? dom.getBoundingClientRect()
      : { top: 0, left: 0, bottom: 0 };
    return {
      top: `${top > 0 ? top : bottom}px`,
      left: `${left}px`,
    };
  }, []);

  const scroll = useCallback(() => {
    const { current: currentDOM } = currentRef;

    if (!currentDOM) return;
    const { top, left } = getPos(dom);
    currentDOM.style.top = top;
    currentDOM.style.left = left;
  }, [dom, getPos]);

  const duplicateNode = useCallback(
    (nodeId) => {
      let freshNode = getCloneTree(query, nodeId);
      actions.addNodeTree(freshNode, parent);
    },
    [parent, query]
  );

  useEffect(() => {
    const dom = document.querySelector(".craftjs-renderer");

    dom.addEventListener("scroll", scroll);

    return () => {
      dom.removeEventListener("scroll", scroll);
    };
  }, [scroll]);

  return (
    <>
      {isHover || isActive
        ? ReactDOM.createPortal(
            <IndicatorDiv
              innerRef={currentRef}
              sx={{
                backgroundColor: "blue.4",
                px: 2,
                py: 1,
              }}
              style={{
                left: getPos(dom).left,
                top: getPos(dom).top,
                zIndex: 9999,
              }}
            >
              <Box>{name}</Box>
              {isActive && (
                <>
                  {id !== ROOT_NODE && (
                    <Box
                      sx={{ ml: 2 }}
                      onClick={() => {
                        actions.selectNode(parent);
                      }}
                      title="Select parent"
                    >
                      <Icon size={10} icon="arrow-up" color="white" />
                    </Box>
                  )}
                  {moveable ? (
                    <Box
                      ref={drag}
                      sx={{
                        ml: 2,
                      }}
                      title="Drag"
                    >
                      <Icon
                        size={10}
                        icon="drag-handle-vertical"
                        color="white"
                      />
                    </Box>
                  ) : null}
                  {duplicatable ? (
                    <Box
                      sx={{
                        ml: 2,
                      }}
                      title="Duplicate node"
                    >
                      <Popover
                        content={
                          <Menu>
                            <Menu.Divider title="Do you want to duplicate?" />
                            <Menu.Item
                              intent="danger"
                              text="Yes"
                              onMouseDown={(e) => {
                                e.stopPropagation();
                                duplicateNode(id);
                              }}
                            />
                            <Menu.Item text="Cancel" />
                          </Menu>
                        }
                      >
                        <Icon size={10} icon="duplicate" color="white" />
                      </Popover>
                    </Box>
                  ) : null}
                  {deletable ? (
                    <Box ml={3} title="Delete node">
                      <Popover
                        content={
                          <Menu>
                            <Menu.Divider title="Are you sure?" />
                            <Menu.Item
                              intent="danger"
                              text="Yes"
                              onMouseDown={(e) => {
                                e.stopPropagation();
                                actions.delete(id);
                              }}
                            />
                            <Menu.Item text="Cancel" />
                          </Menu>
                        }
                      >
                        <Box>
                          <Icon size={10} icon="trash" color="white" />
                        </Box>
                      </Popover>
                    </Box>
                  ) : null}
                </>
              )}
            </IndicatorDiv>,
            document.querySelector(".page-container")
          )
        : null}
      {render}
    </>
  );
};

const IndicatorDiv = styled(Flex)({
  position: "fixed",

  alignItems: "center",
  marginTop: "-20px",
  fontSize: "10px",
  lineHeight: "10px",
  color: "white",
  height: "20px",

  svg: {
    fill: "#fff",
  },
});
