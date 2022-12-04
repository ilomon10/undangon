import { CONSTANTS } from "components/Constants";

export const ParseImageUrl = (id, params) => {
  const query = new URLSearchParams({
    ...params,
    o: 1,
  });
  return `${CONSTANTS.SERVER_URL}/api/assets/image/${id}?${query.toString()}`;
};
