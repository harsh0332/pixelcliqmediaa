export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  brand: string;
  /**
   * False until the person has given the quote and approved it in writing.
   * Components must filter on this — never render an unverified testimonial.
   */
  verified: boolean;
}

/**
 * All six are scaffolding. `verifiedTestimonials` is the only export a
 * component should render, and it is currently empty by design.
 */
export const testimonials: Testimonial[] = [
  { id: "testimonial-01", quote: "[TESTIMONIAL_TEXT]", name: "[NAME]", role: "[ROLE]", brand: "[BRAND]", verified: false },
  { id: "testimonial-02", quote: "[TESTIMONIAL_TEXT]", name: "[NAME]", role: "[ROLE]", brand: "[BRAND]", verified: false },
  { id: "testimonial-03", quote: "[TESTIMONIAL_TEXT]", name: "[NAME]", role: "[ROLE]", brand: "[BRAND]", verified: false },
  { id: "testimonial-04", quote: "[TESTIMONIAL_TEXT]", name: "[NAME]", role: "[ROLE]", brand: "[BRAND]", verified: false },
  { id: "testimonial-05", quote: "[TESTIMONIAL_TEXT]", name: "[NAME]", role: "[ROLE]", brand: "[BRAND]", verified: false },
  { id: "testimonial-06", quote: "[TESTIMONIAL_TEXT]", name: "[NAME]", role: "[ROLE]", brand: "[BRAND]", verified: false },
];

export const verifiedTestimonials = testimonials.filter((t) => t.verified);
