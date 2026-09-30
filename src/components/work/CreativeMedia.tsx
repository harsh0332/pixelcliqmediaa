"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import type { ViewableMedia } from "@/types";
import { RATIO_CSS, RATIO_SIZE } from "@/lib/ratio";
import { releasePlay, requestPlay } from "@/lib/videoRegistry";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { cn } from "@/lib/utils";

/**
 * The media box: one asset, in a frame derived from its own declared ratio.
 *
 * Shared by the grid frames and the lightbox on purpose. A competitor opens a
 * lightbox on the homepage but leaves native controls on the portfolio page —
 * two interaction models for the same asset. One component makes that
 * impossible.
 *
 * 1. The box is RATIO_CSS[item.ratio], so `object-cover` cannot crop: the frame
 *    and the asset are the same shape by construction.
 * 2. `controls={false}` always; the affordances below are ours, at 44px.
 * 3. Autoplay requires being in view, a fine pointer, and a slot under the
 *    shared six-video ceiling. Never on mobile.
 * 4. `muted` is forced for any programmatic play. Sound arrives only through
 *    the mute button.
 */
export function CreativeMedia({
  item,
  autoplay = true,
  priority = false,
  sizes = "(min-width: 1024px) 25vw, (min-width: 768px) 40vw, 85vw",
  fit = "cover",
  className,
  overlay,
}: {
  item: ViewableMedia;
  /** Grid frames autoplay in view; the lightbox waits for a deliberate press. */
  autoplay?: boolean;
  priority?: boolean;
  sizes?: string;
  /** `contain` in the lightbox, where the box is sized to the viewport. */
  fit?: "cover" | "contain";
  className?: string;
  /** Rendered above the media — the stretched open button, in grid frames. */
  overlay?: ReactNode;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const finePointer = useMediaQuery("(hover: hover) and (pointer: fine)");
  const reduce = useMediaQuery("(prefers-reduced-motion: reduce)");
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  const poster = item.poster ?? item.src;
  const intrinsic = RATIO_SIZE[item.ratio];
  const autoplayAllowed = Boolean(item.video) && autoplay && finePointer && !reduce;

  useEffect(() => {
    const node = boxRef.current;
    const video = videoRef.current;
    if (!autoplayAllowed || !node || !video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        if (entry.isIntersecting) {
          if (!requestPlay(video)) return;
          video.muted = true;
          void video
            .play()
            .then(() => setPlaying(true))
            .catch(() => releasePlay(video));
        } else {
          video.pause();
          releasePlay(video);
          setPlaying(false);
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      releasePlay(video);
    };
  }, [autoplayAllowed]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      if (!requestPlay(video)) return;
      void video
        .play()
        .then(() => setPlaying(true))
        .catch(() => releasePlay(video));
    } else {
      video.pause();
      releasePlay(video);
      setPlaying(false);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  };

  return (
    <div
      ref={boxRef}
      style={{ aspectRatio: RATIO_CSS[item.ratio] }}
      className={cn(
        "group/media relative isolate overflow-hidden rounded-md border border-line bg-support",
        "transition-colors duration-300 ease-expo hover:border-accent focus-within:border-accent",
        className,
      )}
    >
      {item.video ? (
        <video
          ref={videoRef}
          src={item.video}
          poster={poster}
          preload="none"
          muted
          loop
          playsInline
          controls={false}
          aria-label={item.alt}
          className={cn("size-full", fit === "cover" ? "object-cover" : "object-contain")}
        />
      ) : (
        <Image
          src={item.src}
          alt={item.alt}
          width={intrinsic.width}
          height={intrinsic.height}
          sizes={sizes}
          priority={priority}
          loading={priority ? "eager" : "lazy"}
          className={cn("size-full", fit === "cover" ? "object-cover" : "object-contain")}
        />
      )}

      {overlay}

      {item.video ? (
        <div
          className={cn(
            "absolute right-2 bottom-2 z-20 flex gap-1 transition-opacity duration-300",
            "opacity-0 group-hover/media:opacity-100 group-focus-visible/media:opacity-100 group-focus-within/media:opacity-100",
            // No hover on touch, so the controls stay put there.
            "max-md:opacity-100",
          )}
        >
          <MediaControl
            onClick={togglePlay}
            label={playing ? "Pause" : "Play"}
            icon={playing ? <Pause className="size-4" /> : <Play className="size-4" />}
          />
          <MediaControl
            onClick={toggleMute}
            label={muted ? "Unmute" : "Mute"}
            icon={muted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
          />
        </div>
      ) : null}
    </div>
  );
}

/** 44px target, our tokens, legible over any frame. */
function MediaControl({
  onClick,
  label,
  icon,
}: {
  onClick: () => void;
  label: string;
  icon: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex size-11 cursor-pointer items-center justify-center rounded-pill bg-ink/80 text-bone backdrop-blur-[4px] transition-colors duration-150 hover:bg-ink focus-visible:bg-ink"
    >
      {icon}
    </button>
  );
}
