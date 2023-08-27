import { ethers } from "ethers";
import { hexStringToString, stringToHexString } from "./helpers";
const data1 =
  "0x646174613a2c7b2270223a226572632d3230222c226f70223a226d696e74222c227469636b223a226d667075727273222c226964223a2232333031222c22616d74223a2231303030227d";
const str = hexStringToString(data1);
console.log(str);
const data = stringToHexString(str);
console.log(data1 === data);
