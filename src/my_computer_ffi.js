import { GOk, GError, BitString } from "./gleam.mjs";
import * as my_computer from "./my_computer.mjs";

export function read(path) {
  let contents;
  try {
    contents = Deno.readFileSync(path);
  } catch (error) {
    return convertError(error);
  }

  return new GOk(new BitString(contents));
}

function convertError(error) {
  let constructor = my_computer[error.charAt(0).toUpperCase() + error.slice(1)];
  if (constructor) {
    return new GError(new constructor(error));
  } else {
    throw Error(`Unknown error code ${error.code} in ${error}`);
  }
}
