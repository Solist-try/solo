import { useContext } from "react";
import { SafetyContext } from "./safetyContextInstance";

export function useSafety() {
  const context = useContext(SafetyContext);
  if (!context) {
    throw new Error("useSafety must be used within SafetyProvider");
  }
  return context;
}
