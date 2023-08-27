import dotenv from "dotenv";
dotenv.config();
import { ethers } from "ethers";
import {
  BASE_RPC_URL,
  ETH_RPC_URL,
  stringToHexString,
  getData,
  EtcH,
  getStr,
} from "./helpers";
import fs from "fs";
import { duplicateCheck } from "./duplicate-check";

async function mint(
  pk: string,
  rpcUrl: string,
  etch: EtcH,
  gasPrice?: number,
  nonce?: number
) {
  const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
  const data = getData(etch);
  const signer = new ethers.Wallet(pk, provider);
  const addr = signer.address;

  // 创建一个交易对象，并只在 gasPrice 和 nonce 定义时添加它们
  const transaction: ethers.providers.TransactionRequest = {
    to: addr,
    data: data,
  };

  if (gasPrice !== undefined) {
    transaction.gasPrice = gasPrice;
  }

  if (nonce !== undefined) {
    transaction.nonce = nonce;
  }

  const res = await signer.sendTransaction(transaction);
  const receipt = await res.wait();
  console.log(receipt.transactionHash);

  return receipt.transactionHash;
}

async function test() {
  const provider = new ethers.providers.JsonRpcProvider(
    "https://endpoints.omniatech.io/v1/matic/mumbai/public"
  );
  const pk = process.env.CB2C_PK!;
  const signer = new ethers.Wallet(pk, provider);
  const addr = signer.address;
  let nonce = await provider.getTransactionCount(addr, "latest");
  const promises: Promise<ethers.providers.TransactionResponse>[] = [];
  const gasPrice = await provider.getGasPrice();
  for (let i = 0; i < 50; i++) {
    const test = {
      p: "erc-20",
      op: "mint",
      tick: "baobaolvcha",
      id: `${i + 3}`,
      amt: "1000",
    };
    const data = getData(test);
    const str = getStr(test);
    const resPromise = signer.sendTransaction({
      to: addr,
      data: data,
      nonce: nonce++,
    });
    promises.push(resPromise);
  }

  try {
    const results = await Promise.all(promises);
    // 处理交易结果
    console.log(results);
  } catch (error) {
    // 处理错误
    console.error(error);
  }
}

test();
// const unusedIds = fs.readFileSync("constants/unusedIds.txt", "utf-8");
// async function main() {
//   const provider = new ethers.providers.JsonRpcProvider(BASE_RPC_URL);
//   const pk = process.env.CB2C_PK!;
//   const signer = new ethers.Wallet(pk, provider);
//   const addr = signer.address;
//   for (let i = 0; i < 100; i++) {
//     const id = unusedIds.split("\n")[i];
//     const data = mint("1711");
//     const res = await signer.sendTransaction({
//       to: addr,
//       data: data,
//       value: 0,
//     });
//     console.log(res);
//   }
// }
// main();
