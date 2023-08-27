import { ethers } from "ethers";
export const BASE_RPC_URL = "https://developer-access-mainnet.base.org";
export const ETH_RPC_URL =
  "https://eth-mainnet.g.alchemy.com/v2/cWSlNTkuKcpsvyTsLd2zxAZT4tJnLAUt";
export function uint256ToHexString(value: ethers.BigNumber) {
  const hexString = value.toHexString().slice(2); // 去掉 '0x' 前缀
  const paddedHexString = hexString.padStart(64, "0"); // 在前面补零，使其长度为 64 个字符
  // console.log("uint256ToHexString:", "0x" + paddedHexString);
  return paddedHexString;
}
// uint256ToHexString(ethers.utils.parseUnits("25", 18));
// console.log(ethers.utils.parseUnits("25", 18).toString());

export function addressToHexString(value: string) {
  const hexString = value.slice(2); // 去掉 '0x' 前缀
  const paddedHexString = hexString.padStart(64, "0"); // 在前面补零，使其长度为 64 个字符
  // console.log("addressToHexString:", "0x" + paddedHexString);
  return paddedHexString;
}

export function hexStringToAddress(value: string) {
  const address = "0x" + value.slice(24);
  // console.log("hexStringToAddress:", address);
  return address;
}

export function hexStringToUint256(value: string) {
  const uint256 = ethers.BigNumber.from(value);
  // console.log("hexStringToUint256:", uint256.toString());
  return uint256;
}
// addressToHexString("0xFa8C0e8195511960F50d6799F7966D6F3B0Acb2C");

// uint256ToHexString(ethers.utils.parseUnits("25", 18));

export function stringToHexString(value: string) {
  let bytes = ethers.utils.toUtf8Bytes(value);
  let hexString = ethers.utils.hexlify(bytes);
  return hexString;
}

export function hexStringToString(value: string) {
  let bytes = ethers.utils.arrayify(value);
  let string = ethers.utils.toUtf8String(bytes);
  return string;
}

export type EtcH = {
  p: string;
  op: string;
  tick: string;
  id: string;
  amt: string;
};
export function getStr(etch: EtcH) {
  const str = `data:,{"p":"${etch.p}","op":"${etch.op}","tick":"${etch.tick}","id":"${etch.id}","amt":"${etch.amt}"}`;
  return str;
}

export function getData(etch: EtcH) {
  const hex = stringToHexString(
    // `data:,{"p":"base-20","op":"mint","tick":"base","id":"${id}","amt":"1000"}`
    `data:,{"p":"${etch.p}","op":"${etch.op}","tick":"${etch.tick}","id":"${etch.id}","amt":"${etch.amt}"}`
  );
  return hex;
}
