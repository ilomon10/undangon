import { useState } from "react"

export const State = ({ defaultValue, children }) => {
  const [state, setState] = useState(defaultValue);
  return children({ state, setState })
}