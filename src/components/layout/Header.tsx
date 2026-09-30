import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { HeaderShell } from "@/components/layout/HeaderShell";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { NavLink } from "@/components/layout/NavLink";
import { ServicesDropdown } from "@/components/layout/ServicesDropdown";
import { Wordmark } from "@/components/layout/Wordmark";
import { headerNav } from "@/content/navigation";
import { site } from "@/content/site";

/**
 * A Server Component wrapping three client islands: the scroll behaviour
 * (HeaderShell), the services disclosure, and the mobile overlay. The nav
 * content itself is rendered on the server from src/content/navigation.ts.
 */
export function Header() {
  return (
    <HeaderShell>
      <Container className="h-[var(--header-height)]">
        {/* This inner box spans the content area rather than the container's
            padding box, so the absolutely positioned mega-panel lines up with
            the wordmark instead of running to the gutter edge. */}
        <div className="relative flex h-full items-center justify-between gap-8">
          <Wordmark />

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {headerNav.map((item) => (
                <li key={item.href}>
                  {item.mega ? (
                    <ServicesDropdown mega={item.mega} />
                  ) : (
                    <NavLink href={item.href} label={item.label} />
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Button
              href={site.primaryCta.href}
              size="sm"
              className="hidden sm:inline-flex"
            >
              {site.primaryCta.label}
            </Button>
            <MobileMenu />
          </div>
        </div>
      </Container>
    </HeaderShell>
  );
}
