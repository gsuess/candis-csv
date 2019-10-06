import { pipeline } from "./pipeline";
import { createParseStreams } from "./parsers";
import { StringifyCandisCsv } from "./stringifiers/candis";

export async function convert(source, parser, destination) {
  const streams = [
    source,
    ...createParseStreams(parser),
    new StringifyCandisCsv(),
    destination
  ];

  await pipeline(...streams);
}
