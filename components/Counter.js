import moment from "moment";
import { useEffect, useState } from "react"

export const Counter = ({
  current,
  target,
  interval = 1000,
  children = () => { /* no-op */ },
}) => {
  const [diff, setDiff] = useState(0);
  useEffect(() => {
    const cur = moment(current);
    const tar = moment(target);
    const diff = tar.diff(cur);
    setDiff(diff);
    setInterval(() => {
      setDiff(diff => diff - interval);
    }, interval);
  }, []);
  return children({ diff });
}