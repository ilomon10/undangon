import { generateId } from "components/utils/generateId";

export const getCloneTree = (query, idToClone) => {
  const tree = query.node(idToClone).toNodeTree();
  const newNodes = {};

  const changeNodeId = (node, newParentId) => {
    const newNodeId = generateId(16);
    const childNodes = node.data.nodes.map((childId) =>
      changeNodeId(tree.nodes[childId], newNodeId)
    );
    const linkedNodes = Object.keys(node.data.linkedNodes).reduce(
      (accum, id) => {
        const newNodeId = changeNodeId(
          tree.nodes[node.data.linkedNodes[id]],
          newNodeId
        );
        return {
          ...accum,
          [id]: newNodeId,
        };
      },
      {}
    );

    let tmpNode = {
      ...node,
      id: newNodeId,
      data: {
        ...node.data,
        parent: newParentId || node.data.parent,
        nodes: childNodes,
        linkedNodes,
      },
    };
    let freshnode = query.parseFreshNode(tmpNode).toNode();
    newNodes[newNodeId] = freshnode;
    return newNodeId;
  };
  const rootNodeId = changeNodeId(tree.nodes[tree.rootNodeId]);
  return {
    rootNodeId,
    nodes: newNodes,
  };
};
