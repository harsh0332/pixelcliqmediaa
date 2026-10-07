/**
 * Runs the content guard. Wired to `prebuild`, so a violation fails the build.
 *
 * Imports are dynamic because the alias hook has to be registered before any
 * content module is resolved.
 */
import { register } from "node:module";

register(new URL("./resolve-alias.mjs", import.meta.url));

const { refinedHome, homeContent } = await import("@/content/refinedHome");

const [
  { caseStudies },
  { testimonials },
  { stats },
  { clients },
  { insights },
  siteModule,
  { servicePillars },
  { loopStages, loopNote },
  { engagementProcess },
  { comparisonRows },
  { siteFaqs },
  { creatives, creativeTypeLabels },
  { hero, proofStrip, positioning, loopSection, servicesIndex, creativeShowcase, storyBlocks, commerceFlow, performanceEquation, automationSchematic, seoIndex,
    selectedWork, processSection, comparisonSection, testimonialsSection, insightsSection, closingCta, servicesPage, workPage, aboutPage, insightsPage, numbersPage, contactPage, notFoundPage, errorPage },
  { legalDocuments },
  navigationModule,
  { assertContentIntegrity },
] = await Promise.all([
  import("@/content/cases"),
  import("@/content/testimonials"),
  import("@/content/stats"),
  import("@/content/clients"),
  import("@/content/insights"),
  import("@/content/site"),
  import("@/content/services"),
  import("@/content/growthSystem"),
  import("@/content/process"),
  import("@/content/comparison"),
  import("@/content/faq"),
  import("@/content/creatives"),
  import("@/content/home"),
  import("@/content/legal"),
  import("@/content/navigation"),
  import("@/lib/contentGuard"),
]);

const bundle = {
  cases: caseStudies,
  testimonials,
  stats,
  clients,
  insights,
  flags: {
    HAS_CLIENT_LOGOS: siteModule.HAS_CLIENT_LOGOS,
    HAS_PUBLISHED_CASES: siteModule.HAS_PUBLISHED_CASES,
    HAS_TESTIMONIALS: siteModule.HAS_TESTIMONIALS,
    HAS_VERIFIED_STATS: siteModule.HAS_VERIFIED_STATS,
  },
  modules: {
    refinedHome,
    homeContent,
    site: siteModule.site,
    servicePillars,
    loopStages,
    loopNote,
    engagementProcess,
    comparisonRows,
    siteFaqs,
    creatives,
    creativeTypeLabels,
    hero,
    proofStrip,
    positioning,
    loopSection,
    servicesIndex,
    creativeShowcase,
    storyBlocks,
    commerceFlow,
    performanceEquation,
    automationSchematic,
    seoIndex,
    selectedWork,
    processSection,
    comparisonSection,
    testimonialsSection,
    insightsSection,
    closingCta,
    servicesPage,
    workPage,
    aboutPage,
    insightsPage,
    numbersPage,
    contactPage,
    notFoundPage,
    errorPage,
    legalDocuments,
  },
  // Exempt paths where published metrics or budget options are legitimately stated.
  claimExemptPaths: ["contactPage.spendOptions", "cases", "creatives"],
  // Derived from servicePillars rather than authored separately.
  derivedModules: {
    headerNav: navigationModule.headerNav,
    footerNav: navigationModule.footerNav,
    legalNav: navigationModule.legalNav,
  },
};

const counts = {
  pillars: servicePillars.length,
  loopStages: loopStages.length,
  cases: caseStudies.length,
  creatives: creatives.length,
  testimonials: testimonials.length,
  clients: clients.length,
  insights: insights.length,
  faqs: siteFaqs.length,
  stats: stats.length,
  comparisonRows: comparisonRows.length,
  processSteps: engagementProcess.length,
};

try {
  assertContentIntegrity(bundle);
} catch (error) {
  console.error(`\n✗ ${(error as Error).message}\n`);
  process.exit(1);
}

console.log("✓ Content guard passed.");
console.log(
  "  " +
    Object.entries(counts)
      .map(([k, v]) => `${k}: ${v}`)
      .join("  ·  "),
);
console.log(
  `  Publicly renderable right now — cases: ${caseStudies.filter((c) => c.status === "published").length}, ` +
    `testimonials: ${testimonials.filter((t) => t.verified).length}, ` +
    `client logos: ${clients.filter((c) => c.approved).length}, ` +
    `creatives: ${creatives.filter((c) => c.approved).length}, ` +
    `articles: ${insights.filter((i) => i.status === "published").length}.`,
);
