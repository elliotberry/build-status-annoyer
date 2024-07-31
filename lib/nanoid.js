import crypto from "node:crypto";

const nanoid = (t = 10) => {
  let e = "";
  const r = crypto.getRandomValues(new Uint8Array(t));
  for (; t--; ) {
    const n = r[t] % 16; // Get a number between 0 and 15
    e += n.toString(16); // Convert to hexadecimal string
  }
  return e;
};

export default nanoid;