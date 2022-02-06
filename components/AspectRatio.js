import React from 'react';

// https://en.wikipedia.org/wiki/Greatest_common_divisor
const GDC = (p, q) => {
  if (q == 0) return p;
  else return GDC(q, p % q);
}

// https://stackoverflow.com/a/49817360/8271526
export const getRatioFromDimension = (w, h) => {
  let gdc = GDC(w, h);
  let isPortrait = w > h;
  let width = w / gdc;
  let height = h / gdc;
  // if (isPortrait) {
  //   height = width;
  //   width = height;
  // }
  return {
    width,
    height,
    isPortrait
  };
}

export const getPercentage = (x, y) => {
  let total = x + y;
  let perc = (x / total) * 100;
  return perc;
}

export const AspectRatio = ({ children, className = "", ratio, portrait = false, style = {} }) => {
  const r = ratio.split(":");
  let w = parseFloat(r[0]);
  let h = parseFloat(r[1]);
  let val = (100 / w) * h;
  
  const styl = {
    position: 'relative',
    ...style
  }

  styl.height = "auto";
  styl.width = "100%";
  styl.paddingLeft = "unset";
  styl.paddingTop = `${val}%`;

  if(portrait) {
    styl.height = "100%";
    styl.width = "auto";
    styl.paddingTop = "unset";
    styl.paddingLeft = `${val}%`;
  }

  return (
    <div className={className} style={styl}>
      <div style={{ position: 'absolute', top: 0, left: 0, height: "100%", width: "100%" }}>{children}</div>
    </div>
  )
};