"use client";

/**
 * A cap on how many videos may play at once, shared across every frame.
 *
 * A competitor keeps 47 autoplaying videos in the DOM at the same time, on
 * desktop and on a 400px phone. Six is a deliberate ceiling: enough that a
 * viewport of work is alive, few enough that decode and paint stay affordable.
 */
export const MAX_CONCURRENT_VIDEOS = 6;

const playing = new Set<HTMLVideoElement>();

/** Returns false when the ceiling is reached; the caller stays on its poster. */
export function requestPlay(element: HTMLVideoElement): boolean {
  if (playing.has(element)) return true;
  if (playing.size >= MAX_CONCURRENT_VIDEOS) return false;
  playing.add(element);
  return true;
}

export function releasePlay(element: HTMLVideoElement): void {
  playing.delete(element);
}

export function concurrentCount(): number {
  return playing.size;
}
