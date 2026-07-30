"use client";
import { useContext } from "react";
import { GestureContext } from "@/components/Gesture/GestureProvider";
import type { GestureContextValue } from "@/types/gesture";

export function useGesture(): GestureContextValue {
  const ctx = useContext(GestureContext);
  if (!ctx) {
    throw new Error("useGesture must be used within a <GestureProvider>");
  }
  return ctx;
}