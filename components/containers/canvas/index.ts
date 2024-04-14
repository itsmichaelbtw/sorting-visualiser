import { Store } from "./Store";

interface _Canvas {
  Store: typeof Store;
}

export const Canvas: _Canvas = {
  Store: Store
};
