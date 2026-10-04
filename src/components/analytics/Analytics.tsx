"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CONSENT_OPEN_EVENT,
  GA_ID,
  analyticsEnabled,
  readConsent,
  subscribeConsent,
  track,
  writeConsent,
  type Consent,
} from "@/lib/analytics";
import styles from "./Analytics.module.css";

/** Loads gtag once, after consent. Ads storage stays denied: this is measurement only. */
function loadGtag() {
  if (window.gtag) return;
  window.dataLayer = window.dataLayer ?? [];
  window.gtag = function gtag() {
    // gtag reads the arguments object itself, not an array.
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };
  window.gtag("consent", "default", {
    analytics_storage: "granted",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  window.gtag("js", new Date());
  window.gtag("config", GA_ID, { send_page_view: false });
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);
}

/** A "no" after a "yes": stop measuring and clear the GA cookies already set. */
function revoke() {
  window.gtag?.("consent", "update", { analytics_storage: "denied" });
  const host = window.location.hostname.replace(/^www\./, "");
  for (const cookie of document.cookie.split(";")) {
    const name = cookie.split("=")[0]?.trim();
    if (!name?.startsWith("_ga")) continue;
    for (const domain of ["", `; domain=.${host}`, `; domain=${host}`]) {
      document.cookie = `${name}=; Max-Age=0; path=/${domain}`;
    }
  }
}

/**
 * Consent banner + GA4. Renders nothing at all unless a measurement ID is set.
 * Tracks page views on client navigation and the clicks that matter to the
 * business: booking a call, WhatsApp, phone and email.
 */
export function Analytics() {
  const pathname = usePathname();
  // undefined on the server and during hydration: no banner until the stored choice is known.
  const consent = useSyncExternalStore<Consent | null | undefined>(subscribeConsent, readConsent, () => undefined);
  const [reopened, setReopened] = useState(false);

  useEffect(() => {
    const onOpen = () => setReopened(true);
    window.addEventListener(CONSENT_OPEN_EVENT, onOpen);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, onOpen);
  }, []);

  useEffect(() => {
    if (consent === "granted") loadGtag();
    if (consent === "denied") revoke();
  }, [consent]);

  useEffect(() => {
    if (consent !== "granted") return;
    track("page_view", {
      page_path: window.location.pathname + window.location.search,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname, consent]);

  useEffect(() => {
    if (consent !== "granted") return;
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.("a");
      const href = link?.getAttribute("href") ?? "";
      if (!link || !href) return;
      const params = { link_text: link.textContent?.trim().slice(0, 80), page_path: window.location.pathname };
      if (href.startsWith("/contact")) track("cta_click", params);
      else if (href.includes("wa.me")) track("whatsapp_click", params);
      else if (href.startsWith("tel:")) track("phone_click", params);
      else if (href.startsWith("mailto:")) track("email_click", params);
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, [consent]);

  const open = consent === null || reopened;
  if (!analyticsEnabled || consent === undefined || !open) return null;

  const choose = (value: Consent) => {
    writeConsent(value);
    setReopened(false);
  };

  return (
    <section className={styles.banner} role="region" aria-label="Cookie choice">
      <p>
        Can we count visits with Google Analytics? It helps us see which pages are useful. Nothing loads unless you say yes.{" "}
        <Link href="/cookies">Cookie policy</Link>
      </p>
      <div className={styles.actions}>
        <button type="button" className={styles.accept} onClick={() => choose("granted")}>Accept</button>
        <button type="button" className={styles.decline} onClick={() => choose("denied")}>Decline</button>
      </div>
    </section>
  );
}
