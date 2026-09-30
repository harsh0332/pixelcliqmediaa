"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import styles from "./Wordmark.module.css";
export interface WordmarkProps { className?: string; asText?: boolean; entrance?: boolean }
export function Wordmark({ className, asText = false }: WordmarkProps) {
  const pathname = usePathname();
  const content = <><span className={styles.mark} aria-hidden="true"><i /><i /><i /><i /></span><span className={styles.type}><span className={styles.name}>pixelcliq<span className={styles.dot}>.</span></span><span className={styles.media}>MEDIA / INDEPENDENT GROWTH</span></span></>;
  return asText ? <span className={cn(styles.lockup, className)}>{content}</span> : <Link href="/" onNavigate={(event) => {
    if (pathname !== "/") return;
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "instant" });
    window.dispatchEvent(new Event("pixelcliq:scroll-top"));
    if (window.location.hash) window.history.replaceState(window.history.state, "", window.location.pathname + window.location.search);
    document.querySelector<HTMLElement>("main")?.focus({ preventScroll: true });
  }} aria-label="Pixelcliq Media, home" className={cn(styles.lockup, className)}>{content}</Link>;
}
