const access_token = "2b92cf28d4be46509554edb63656a133";
const url = "https://api.airdna.co/client/v1/";

import axios from "axios";

export async function rentalizer(address, bedrooms, bathrooms, accomodates) {
  const params = {
    access_token: access_token,
    address: address,
    bedrooms: bedrooms,
    bathrooms: bathrooms,
    accomodates: accomodates,
  };
  const res = await axios.get(url + "rentalizer/estimate", {
    params: params,
  });
  return res.data;
}
