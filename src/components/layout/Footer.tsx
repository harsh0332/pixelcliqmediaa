import { BalancedHeading } from "@/components/ui/BalancedHeading";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ContactDetails } from "@/components/layout/ContactDetails";
import { FooterLink } from "@/components/layout/FooterLink";
import { Wordmark } from "@/components/layout/Wordmark";
import { footerNav, legalNav } from "@/content/navigation";
import { CookieSettingsButton } from "@/components/analytics/CookieSettingsButton";
import { analyticsEnabled } from "@/lib/analytics";
import { HAS_VERIFIED_STATS, site } from "@/content/site";
import { isPlaceholder } from "@/lib/placeholders";
import styles from "./Footer.module.css";

export function Footer() {
  const socials = site.socials.filter((social) => !isPlaceholder(social.href));
  return (
    <footer className={styles.footer}>
      <Section tone="inverse" spacing="tight">
        <Container>
          <div className={styles.cta}>
            <div>
              <p className={styles.kicker}>YOUR NEXT CHAPTER STARTS HERE</p>
              <BalancedHeading level={2} size="h1" emphasis="scaling" className="max-w-[16ch]">
                Let&rsquo;s build something worth scaling.
              </BalancedHeading>
              <p className={styles.description}>Creative, performance and commerce. One team, with your next stage in mind.</p>
            </div>
            <div className={styles.actions}>
              <Button href={site.primaryCta.href} size="lg">{site.primaryCta.label}</Button>
              {!isPlaceholder(site.email) && <a href={`mailto:${site.email}`}>{site.email}</a>}
            </div>
          </div>
        </Container>
      </Section>
      <Container>
        <div className={styles.brandRow}>
          <Wordmark />
          <p>D2C at heart.<br />Full service by design.</p>
        </div>
        <div className={styles.directory}>
          {footerNav.map((column, index) => (
            <nav key={column.title} aria-label={`Footer ${column.title}`} className={index === 0 ? styles.services : styles.company}>
              <h2 className={styles.heading}><span>0{index + 1}</span>{column.title}</h2>
              <ul className={styles.links}>
                {column.links.filter((link) => HAS_VERIFIED_STATS || link.href !== "/numbers").map((link) => (
                  <li key={link.href}><FooterLink href={link.href}>{link.label}</FooterLink></li>
                ))}
              </ul>
            </nav>
          ))}
          <div className={styles.contact}>
            <h2 className={styles.heading}><span>03</span>Let&rsquo;s connect</h2>
            <ContactDetails className={styles.details} />
            {socials.length > 0 && <ul className={styles.socials}>{socials.map((social) => <li key={social.platform}><FooterLink href={social.href}>{social.label} ↗</FooterLink></li>)}</ul>}
          </div>
        </div>
        <div className={styles.legal}>
          <span>&copy; {new Date().getFullYear()} {site.name}</span>
          <ul>{legalNav.map((link) => <li key={link.href}><FooterLink href={link.href}>{link.label}</FooterLink></li>)}{analyticsEnabled && <li><CookieSettingsButton className={styles.cookieButton} /></li>}</ul>
          <span>Independent thinking. Connected growth.</span>
        </div>
      </Container>
    </footer>
  );
}
