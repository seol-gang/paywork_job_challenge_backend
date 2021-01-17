import * as crypto from "crypto";

export const encrypt = (data: any) => {
  const hash = crypto.createHmac("sha256", process.env.CRYPTO_KEY);
  hash.update(data);
  return hash.digest("hex");
};
