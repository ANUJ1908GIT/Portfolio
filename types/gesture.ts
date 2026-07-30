export type GestureType = "OPEN_PALM" | "FIST" | "VICTORY" | "THUMBS_UP" | "NONE";

export interface NormalizedLandmark {
  x: number;
  y: number;
  z: number;
}

export interface GestureCallbacks {
  onOpenPalm?: () => void;
  onFist?: () => void;
  onVictory?: () => void;
  onThumbsUp?: () => void;
}

export interface GestureConfig {
  /** consecutive matching frames a pose must hold before it fires */
  stabilityFrames?: number;
  /** ms cooldown after any gesture fires before another can fire */
  cooldownMs?: number;
  /** min hand-detection confidence, 0-1 */
  minConfidence?: number;
}

export interface GestureContextValue {
  gesture: GestureType;
  isEnabled: boolean;
  isLoading: boolean;
  error: string | null;
  enableGestureControl: () => Promise<void>;
  disableGestureControl: () => void;
}