import { ethers } from "ethers";
import dotevn from "dotenv";
import { ETH_RPC_URL } from "./helpers";
import { stringToHexString } from "./helpers";
dotevn.config();
async function deploy() {
  const str =
    'data:,{"p":"erc-20","op":"deploy","tick":"baobaolvcha","max":"21000000","lim":"1000"}';
  const data = stringToHexString(str);
  const provider = new ethers.providers.JsonRpcProvider(ETH_RPC_URL);
  const pk = process.env.CB2C_PK!;
  const signer = new ethers.Wallet(pk, provider);
  const addr = signer.address;
  const transaction: ethers.providers.TransactionRequest = {
    to: addr,
    data: data,
  };
  const res = await signer.sendTransaction(transaction);
  const receipt = await res.wait();
  console.log(receipt.transactionHash);
}
deploy();
