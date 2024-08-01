import crypto from "node:crypto";

const nanoid = (length = 10) => {
  const randomValues = crypto.getRandomValues(new Uint8Array(length));
  const hexArray = Array(length);

  for (let i = 0; i < length; i++) {
    hexArray[i] = (randomValues[i] % 16).toString(16);
  }

  return hexArray.join('');
};

export default nanoid;
