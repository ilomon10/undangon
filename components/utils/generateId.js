export function generateId() {
  const rand = Math.random().toString(36);
  return `${rand.substr(2, 4)}_${rand.substr(4, 4)}`;
}
