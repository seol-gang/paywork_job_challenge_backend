import * as crypto from "crypto";

// dataEncrypt.ts
// 데이터 암호화를 위한 함수
export const encrypt = (data: any): string => {
  const hash = crypto.createHmac("sha256", process.env.CRYPTO_KEY);
  hash.update(data);
  return hash.digest("hex");
};
