import * as crypto from "crypto";
import axios from "axios";
import { stringToHexString, getData, getStr } from "./helpers";
export async function duplicateCheck(content: string) {
  const sha256Hash = crypto.createHash("sha256").update(content).digest("hex");
  console.log(sha256Hash);
  const url = `https://eth-script-indexer-eca25c4cf43b.herokuapp.com/api/ethscriptions/exists/${sha256Hash}`;

  try {
    const response = await axios.get(url);

    if (response.status !== 200) {
      throw new Error("获取数据失败，请验查你的输入是否正确。");
    }

    const result = response.data;

    if (result["result"]) {
      const owner = result["ethscription"]["current_owner"];
      const creator = result["ethscription"]["creator"];
      const creationTimestamp = result["ethscription"]["creation_timestamp"];
      const creationDate = new Date(creationTimestamp).toISOString();
      console.log(
        `该铭文的创造者为: ${creator} owner 为: ${owner} 创建时间为: ${creationDate}`
      );
      console.log(` ${content}"的络文内容已被铭剂。`);
    } else {
      const hexContent = stringToHexString(content);

      console.log(`"${content}"的路文内容尚未核铭刻。`);
      console.log(`该铭文文本(含data:,) 的16进制输出为: ${hexContent}`);
    }
    return result["result"];
  } catch (e) {
    console.log(`发送请求时遇到错误: ${e}`);
  }
}

async function test() {
  const test = {
    p: "erc-20",
    op: "mint",
    tick: "baobaolvcha",
    id: "1",
    amt: "1000",
  };
  const str = getStr(test);
  const data = getData(test);
  console.log(str);
  const res = await duplicateCheck(str);
  console.log(res);
}
