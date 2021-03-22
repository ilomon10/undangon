import { useState, useRef } from "react"

export const State = ({ defaultValue, children }) => {
  const [state, setState] = useState(defaultValue);
  const ref = useRef();
  return children({ state, setState, ref })
}