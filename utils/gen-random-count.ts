import { MAX_ARRAY_SIZE, MIN_ARRAY_SIZE } from "config/constants";

export function genRandomCount(): number {
  return Math.floor(Math.random() * (MAX_ARRAY_SIZE - MIN_ARRAY_SIZE + 1)) + MIN_ARRAY_SIZE;
}
