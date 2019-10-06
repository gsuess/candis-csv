import { pipeline as asyncPipeline } from "stream";
import { promisify } from "util";

export const pipeline = promisify(asyncPipeline);
