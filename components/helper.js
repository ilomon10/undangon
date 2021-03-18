import moment from "moment";

export const GoogleCalendarLink = ({
  text,
  details,
  location,
  dates: {
    start = moment().toISOString(),
    end = moment().toISOString(),
  },
}) => {
  const url = new URL("https://www.google.com/calendar/render");
  url.searchParams.append("action", "TEMPLATE");
  url.searchParams.append("text", text);
  url.searchParams.append("dates", `${moment(start).format("YYYYMMDDTHHmmssZ")}/${moment(end).format("YYYYMMDDTHHmmssZ")}`);
  url.searchParams.append("details", details);
  url.searchParams.append("location", location);
  return url.toString();
}

export const MapboxImageLink = ({
  height = 1024,
  width = 1024,
  contract,
  reception,
  style = "streets-v11",
  zoom = 13,
  attribution = "false",
}) => {
  const pin = [];
  if (contract) pin.push({
    icon: "pin-s-heart",
    color: "ff0000",
    ...contract
  });
  if (reception) pin.push({
    icon: "pin-s-restaurant",
    color: "00eeff",
    ...reception
  });
  const url = new URL(`https://api.mapbox.com/styles/v1/mapbox/${style}/static${pin ? `/${pin.map((v, i) => `${v.icon}+${v.color}(${v.longitude},${v.latitude})`)}` : ""}/${pin.length > 1 ? "auto" : `${pin[0].longitude},${pin[0].latitude},${zoom},0`}/${width}x${height}@2x`);
  url.searchParams.append("access_token", "pk.eyJ1IjoiaWxvbW9uMTAiLCJhIjoiY2piZjh1cHVwMTRnbjJ3bzI1MWwwN2g3ZCJ9.txWBAfB2D7-vueg7G9FORA");
  url.searchParams.append("attribution", attribution);
  url.searchParams.append("logo", "false");
  if (pin.length > 1) url.searchParams.append("padding", "100");
  return url.toString();
}