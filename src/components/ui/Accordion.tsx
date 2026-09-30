"use client";

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { CollapsePanel } from "@/components/motion/CollapsePanel";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Keyboard — each header is a real <button> with aria-expanded and
 *   aria-controls. Arrow Down / Arrow Up move focus between headers, Home and
 *   End jump to the first and last. Enter and Space toggle, natively.
 * Pointer — click anywhere on the header row, which spans the full width.
 * Touch   — header rows are 64px tall, comfortably above the 44px minimum.
 * Reduced motion — the panel opens and closes instantly, with no height tween.
 *
 * Note: this is the one component that animates height. A panel of text cannot
 * be revealed with transform without distorting the type, and the alternatives
 * (scaleY, clip-path) either squash the content or skip the smooth reflow that
 * makes the control legible. The cost is bounded: one element, on interaction.
 */

export interface AccordionItem {
  id: string;
  question: ReactNode;
  answer: ReactNode;
}

export interface AccordionProps {
  items: AccordionItem[];
  /** Allow several panels open at once. FAQs read better with one. */
  allowMultiple?: boolean;
  /** Id of the panel open on first render. */
  defaultOpenId?: string;
  className?: string;
}

export function Accordion({
  items,
  allowMultiple = false,
  defaultOpenId,
  className,
}: AccordionProps) {
  const baseId = useId();
  const headerRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [openIds, setOpenIds] = useState<string[]>(
    defaultOpenId ? [defaultOpenId] : [],
  );

  const toggle = (id: string) => {
    setOpenIds((current) => {
      const isOpen = current.includes(id);
      if (isOpen) return current.filter((openId) => openId !== id);
      return allowMultiple ? [...current, id] : [id];
    });
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = items.length - 1;
    const targets: Record<string, number> = {
      ArrowDown: index === last ? 0 : index + 1,
      ArrowUp: index === 0 ? last : index - 1,
      Home: 0,
      End: last,
    };
    const next = targets[event.key];
    if (next === undefined) return;
    event.preventDefault();
    headerRefs.current[next]?.focus();
  };

  return (
    <div className={cn("border-t border-line", className)}>
      {items.map((item, index) => {
        const isOpen = openIds.includes(item.id);
        const headerId = `${baseId}-header-${item.id}`;
        const panelId = `${baseId}-panel-${item.id}`;

        return (
          <div key={item.id} className="border-b border-line">
            <h3>
              <button
                ref={(node) => {
                  headerRefs.current[index] = node;
                }}
                type="button"
                id={headerId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
                onKeyDown={(event) => onKeyDown(event, index)}
                className={cn(
                  "type-h3 flex w-full items-center justify-between gap-6 py-6 text-left",
                  "transition-colors duration-150 hover:text-accent-deep focus-visible:text-accent-deep",
                )}
              >
                <span>{item.question}</span>
                <Plus
                  aria-hidden="true"
                  className={cn(
                    "size-5 shrink-0 text-ink-muted transition-transform duration-300 ease-expo",
                    isOpen && "rotate-45",
                  )}
                />
              </button>
            </h3>

            <CollapsePanel
              open={isOpen}
              id={panelId}
              role="region"
              aria-labelledby={headerId}
            >
              <div className="type-body max-w-measure pb-6 text-ink-soft">
                {item.answer}
              </div>
            </CollapsePanel>
          </div>
        );
      })}
    </div>
  );
}
