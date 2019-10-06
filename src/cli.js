import commander from "commander";

import { version } from "../package";
import { parsers } from "./parsers";
import { convert } from "./convert";
import fs from "fs";

export function createProgram({ stdin, stdout } = process) {
  const program = new commander.Command();
  program.version(version, "-v, --vers", "output the current version");

  program
    .command("list")
    .description("List available parsers")
    .action(() => {
      Object.keys(parsers).forEach(parser => stdout.write(`${parser}\n`));
    });

  program
    .command("parse <format>")
    .description("Parse foreign format into candis-csv format")
    .option("-r, --readFile <path>", "read input from given path")
    .action(async (format, { readFile }) => {
      if (!parsers[format]) {
        console.error(`Unknown format: '${format}'\n`);
      } else {
        const source = readFile ? fs.createReadStream(readFile) : stdin;
        await convert(source, format, stdout);
      }
    });

  return program;
}
