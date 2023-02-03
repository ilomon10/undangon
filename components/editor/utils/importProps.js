export const importProps = (node, props) => props.reduce((res, key) => {
  res[key] = node.data.props[key] || null;
  return res;
}, {});