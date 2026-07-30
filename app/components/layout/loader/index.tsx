"use client";

import { useEffect, useState } from "react";
import { BootSequence } from "./BootSequence";

export function Loader({ onDone }: { onDone: () => void }) {
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (!finished) return;
    // Small grace period after the wipe completes before handing off
    const t = setTimeout(() => onDone(), 300);
    return () => clearTimeout(t);
  }, [finished, onDone]);

  return <BootSequence onComplete={() => setFinished(true)} />;
}
