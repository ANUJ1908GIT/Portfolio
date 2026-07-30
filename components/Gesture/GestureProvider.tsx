"use client";
import {
  createContext, useCallback, useMemo, useRef, useState, type ReactNode,
} from "react";
import { GestureDetector } from "./GestureDetector";
import type {
  GestureCallbacks, GestureConfig, GestureContextValue, GestureType,
} from "@/types/gesture";

export const GestureContext = createContext<GestureContextValue | null>(null);

interface GestureProviderProps extends GestureCallbacks {
  children: ReactNode;
  config?: GestureConfig;
  showPreview?: boolean;
}

export function GestureProvider({
  children,
  config,
  showPreview = false,
  onOpenPalm,
  onFist,
  onVictory,
  onThumbsUp,
}: GestureProviderProps) {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [gesture, setGesture] = useState<GestureType>("NONE");

  const streamRef = useRef<MediaStream | null>(null);

  const enableGestureControl = useCallback(async () => {
    if (isEnabled || isLoading) return;
    setError(null);
    setIsLoading(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480, facingMode: "user" },
        audio: false,
      });
      streamRef.current = stream;
      setIsEnabled(true);
    } catch (err) {
      setError(err instanceof Error ? `Camera access failed: ${err.message}` : "Camera access failed.");
    } finally {
      setIsLoading(false);
    }
  }, [isEnabled, isLoading]);

  const disableGestureControl = useCallback(() => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    setIsEnabled(false);
    setGesture("NONE");
  }, []);

  const callbacks: GestureCallbacks = useMemo(
    () => ({ onOpenPalm, onFist, onVictory, onThumbsUp }),
    [onOpenPalm, onFist, onVictory, onThumbsUp]
  );

  const value: GestureContextValue = useMemo(
    () => ({ gesture, isEnabled, isLoading, error, enableGestureControl, disableGestureControl }),
    [gesture, isEnabled, isLoading, error, enableGestureControl, disableGestureControl]
  );

  return (
    <GestureContext.Provider value={value}>
      {children}
      {isEnabled && streamRef.current && (
        <GestureDetector
          stream={streamRef.current}
          callbacks={callbacks}
          config={config}
          showPreview={showPreview}
          onGestureChange={setGesture}
          onFatalError={(msg) => {
            setError(msg);
            disableGestureControl();
          }}
        />
      )}
    </GestureContext.Provider>
  );
}