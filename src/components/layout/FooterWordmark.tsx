import { site } from "@/content/site";

export function FooterWordmark() {
  return <div aria-hidden="true" className="overflow-hidden select-none"><span className="type-wordmark block text-line-strong lg:whitespace-nowrap">{site.name.toUpperCase()}</span></div>;
}
