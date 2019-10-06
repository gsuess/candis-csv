#!/usr/bin/env node
import "source-map-support/register";
import { convert } from "./convert";
import { createProgram } from "./cli";

export default convert;

export * from "./cli";

if (require.main === module) {
  // CLI mode
  createProgram().parse(process.argv);
}
