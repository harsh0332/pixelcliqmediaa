import { Button, type ButtonVariant } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";

/**
 * Hover and active cannot be triggered without a pointer, so those two columns
 * force the variant's own state classes. Everything else is a live control:
 * tab through the row to check the real focus ring.
 */
const FORCED: Record<ButtonVariant, { hover: string; active: string }> = {
  primary: {
    hover: "bg-accent-deep [&_svg]:translate-x-1",
    active: "bg-accent-deep",
  },
  secondary: { hover: "bg-ink text-bone", active: "bg-ink text-bone" },
  ghost: { hover: "after:scale-x-100", active: "after:scale-x-100 text-accent-deep" },
  link: { hover: "decoration-accent-deep", active: "decoration-accent-deep" },
};

const FOCUS = "outline-2 outline-offset-[3px] outline-accent";

const VARIANTS: { variant: ButtonVariant; label: string; note: string }[] = [
  { variant: "primary", label: "Primary", note: "Accent fill, white text, arrow moves 4px on hover." },
  { variant: "secondary", label: "Secondary", note: "1px ink border, fills to ink with inverted text." },
  { variant: "ghost", label: "Ghost", note: "Underline draws in from the left — scaleX from origin-left." },
  { variant: "link", label: "Link", note: "Inline, accent-deep, 4px underline offset. No 44px block." },
];

export function ButtonMatrix() {
  return (
    <div className="space-y-12">
      {VARIANTS.map(({ variant, label, note }) => (
        <div key={variant}>
          <Eyebrow as="p" tone="ink">
            {label}
          </Eyebrow>
          <p className="type-caption mt-2 max-w-measure">{note}</p>

          <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-4">
            <Button variant={variant}>Default</Button>
            <Button variant={variant} className={FORCED[variant].hover}>
              Hover
            </Button>
            <Button variant={variant} className={FORCED[variant].active}>
              Active
            </Button>
            <Button variant={variant} className={FOCUS}>
              Focus
            </Button>
            <Button variant={variant} disabled>
              Disabled
            </Button>
            <Button variant={variant} loading>
              Loading
            </Button>
          </div>

          {variant !== "link" ? (
            <div className="mt-5 flex flex-wrap items-center gap-6">
              <Button variant={variant} size="sm">
                Small
              </Button>
              <Button variant={variant} size="md">
                Medium
              </Button>
              <Button variant={variant} size="lg">
                Large
              </Button>
              <span className="type-caption">
                40 / 48 / 56px tall — all with a 44px hit area
              </span>
            </div>
          ) : null}
        </div>
      ))}

      <div>
        <Eyebrow as="p" tone="ink">
          As a link
        </Eyebrow>
        <div className="mt-4">
          <Button href="/styleguide#primitives" variant="secondary">
            Renders an anchor
          </Button>
        </div>
      </div>
    </div>
  );
}
