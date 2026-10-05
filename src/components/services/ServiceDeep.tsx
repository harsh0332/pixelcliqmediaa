import { CreativeDeep } from "./deep/CreativeDeep";
import { PerformanceDeep } from "./deep/PerformanceDeep";

/** Flagship services get their own deep-dive sections; the rest use the shared template. */
export function hasServiceDeep(service: string) {
  return service === "performance" || service === "creative";
}

export function ServiceDeep({ service }: { service: string }) {
  if (service === "performance") return <PerformanceDeep />;
  if (service === "creative") return <CreativeDeep />;
  return null;
}
