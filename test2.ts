import axios from "axios";

const url = "https://www.etch.market/api/ethscriptions/erc20/ethscribe";
const params = {
  p: "erc-20",
  tick: "mfpurrs",
  nonce: "9",
};
const headers = {
  Accept: "application/json, text/plain, */*",
  "Accept-Encoding": "gzip, deflate, br",
  "Accept-Language": "zh-CN,zh-TW;q=0.9,zh;q=0.8,en;q=0.7",
  Authorization:
    "Bearer eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJBZGRyZXNzIjoiMHhGYThDMGU4MTk1NTExOTYwRjUwZDY3OTlGNzk2NkQ2RjNCMEFjYjJDIn0.xWXoN4FSD_OItyZuGilqOhGaptx5tutw5K6_HBVxb6A1l9TBHq7ss0r5ilW-OskCoynhaF_f_WUguK-CGL84yw",
  Baggage:
    "sentry-environment=vercel-production,sentry-release=1e771171c157dfe73e54c69a483fff39153fd6af,sentry-public_key=12488fda0ec264af34c647ffd697696a,sentry-trace_id=eb17ad651bc345248b07f6b14bba88de",
  Cookie: "NEXT_LOCALE=en",
  Referer: "https://www.etch.market/tokens/info?p=erc-20&tick=mfpurrs",
  "Sec-Ch-Ua":
    '"Not/A)Brand";v="99", "Google Chrome";v="115", "Chromium";v="115"',
  "Sec-Ch-Ua-Mobile": "?0",
  "Sec-Ch-Ua-Platform": '"Windows"',
  "Sec-Fetch-Dest": "empty",
  "Sec-Fetch-Mode": "cors",
  "Sec-Fetch-Site": "same-origin",
  "Sentry-Trace": "eb17ad651bc345248b07f6b14bba88de-a2d6d4d15057d61f-1",
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36",
};

axios
  .get(url, { params, headers })
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.error(error);
  });
