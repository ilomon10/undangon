import { useNode } from "@craftjs/core";
import { StaticMapboxSettings } from "./StaticMapboxSettings";
import { useCallback } from "react";
import { CONSTANTS } from "components/Constants";

export const StaticMapbox = ({
  mapOptions,
  height,
  width,
  objectFit,
  borderRadius,
}) => {
  const {
    connectors: { connect, drag },
  } = useNode();
  return (
    <div
      ref={(ref) => connect(drag(ref))}
      style={{
        height,
        width,
      }}
    >
      <img
        style={{
          display: "block",
          width: "100%",
          height: "100%",
          objectFit,
          borderRadius,
        }}
        src={staticMapUrl(mapOptions)}
      />
    </div>
  );
};

StaticMapbox.craft = {
  name: "Static Mapbox",
  props: {
    mapOptions: {
      pins: [],
      padding: 10,
      height: 1024,
      width: 1024,
    },
    height: "auto",
    width: "auto",
    borderRadius: "",
    objectFit: "fill",
  },
  related: {
    settings: StaticMapboxSettings,
  },
};

export const staticMapUrl = (mapOptions) => {
  const { pins, padding, height, width } = mapOptions;
  const pinsUrl = pins
    .map(
      ({ icon, color, longitude, latitude }) =>
        `pin-s-${icon}+${color.replace("#", "")}(${longitude},${latitude})`
    )
    .join(",");
  return `https://api.mapbox.com/styles/v1/mapbox/light-v10/static/${pinsUrl}/auto/${
    width || 50
  }x${height || 50}@2x?attribution=false&logo=false&padding=${
    padding || 0
  }&access_token=${CONSTANTS.MAPBOX_API_KEY}`;
};
