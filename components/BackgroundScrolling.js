import { useEffect, useState } from "react";

const { Box } = require("./Grid")

export const BackgroundScrolling = ({
  imageUrl,
  height = 350,
  width = 250,
  onChange = () => { },
  pause,
}) => {
  const [position, setPosition] = useState(0);
  useEffect(() => {
    const unbind = setInterval(() => {
      if (pause) return;
      setPosition(position => {
        const ret = position < 100 ? (100 / 2) + position : 0;
        onChange(ret);
        return ret;
      });
    }, 2000);
    return () => {
      clearInterval(unbind);
    }
  }, [pause]);
  return (
    <Box sx={{ height, width, position: "relative" }}>
      <Box
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: "cover",
          transition: "background-position 2000ms ease"
        }}
        style={{
          backgroundPosition: `0 ${position}%`
        }}
      />
    </Box>
  )
}