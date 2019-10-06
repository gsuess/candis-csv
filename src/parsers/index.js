import { Transform } from "stream";
import * as transferwise from "./transferwise";

export const parsers = {
  transferwise
};

export function createParseStreams(format) {
  const { parser, toCandis } = parsers[format];

  return [
    parser(),
    new Transform({
      readableObjectMode: true,
      writableObjectMode: true,
      transform(chunk, encoding, callback) {
        callback(null, toCandis(chunk));
      }
    })
  ];
}
