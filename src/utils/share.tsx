import {
  compressToEncodedURIComponent,
  decompressFromEncodedURIComponent,
} from "lz-string";
import type ModuleModel from "../class/ModuleModel";

export function generateShareUrl(data: ModuleModel[]): string {
  const compressed = compressToEncodedURIComponent(JSON.stringify(data));
  return `${window.location.origin}?data=${compressed}`;
}

export function readSharedData(): string | null {
  const params = new URLSearchParams(window.location.search);
  const compressed = params.get("data");
  if (!compressed) return null;
  try {
    return decompressFromEncodedURIComponent(compressed);
  } catch {
    return null;
  }
}
