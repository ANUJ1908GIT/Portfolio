import type { GestureType, NormalizedLandmark } from "@/types/gesture";

const WRIST = 0;
const THUMB_MCP = 2, THUMB_TIP = 4;
const INDEX_MCP = 5, INDEX_TIP = 8;
const MIDDLE_MCP = 9, MIDDLE_TIP = 12;
const RING_MCP = 13, RING_TIP = 16;
const PINKY_MCP = 17, PINKY_TIP = 20;

function dist(a: NormalizedLandmark, b: NormalizedLandmark): number {
  return Math.hypot(a.x - b.x, a.y - b.y, (a.z ?? 0) - (b.z ?? 0));
}

function isExtended(
  lm: NormalizedLandmark[],
  tipIdx: number,
  mcpIdx: number,
  factor = 1.25
): boolean {
  return dist(lm[WRIST], lm[tipIdx]) > dist(lm[WRIST], lm[mcpIdx]) * factor;
}

export function classifyStaticGesture(lm: NormalizedLandmark[]): GestureType {
  const thumbExt = isExtended(lm, THUMB_TIP, THUMB_MCP, 1.15);
  const indexExt = isExtended(lm, INDEX_TIP, INDEX_MCP);
  const middleExt = isExtended(lm, MIDDLE_TIP, MIDDLE_MCP);
  const ringExt = isExtended(lm, RING_TIP, RING_MCP);
  const pinkyExt = isExtended(lm, PINKY_TIP, PINKY_MCP);

  // All five fingers out - open palm
  if (thumbExt && indexExt && middleExt && ringExt && pinkyExt) return "OPEN_PALM";

  // Only thumb out, pointing up - thumbs up (checked before victory/fist so it
  // can't be swallowed by a looser match)
  if (thumbExt && !indexExt && !middleExt && !ringExt && !pinkyExt) {
    const pointingUp = lm[THUMB_TIP].y < lm[WRIST].y - 0.04;
    if (pointingUp) return "THUMBS_UP";
  }

  // Index + middle out, ring/pinky curled - victory
  if (indexExt && middleExt && !ringExt && !pinkyExt) return "VICTORY";

  // Nothing extended at all - closed fist
  if (!thumbExt && !indexExt && !middleExt && !ringExt && !pinkyExt) return "FIST";

  return "NONE";
}