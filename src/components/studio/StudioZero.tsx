import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { HeroVideo } from "@/components/home/HeroVideo";
import { studioZero as z } from "@/content/studioZero";
import styles from "./StudioZero.module.css";

const img = (name: string) => `/images/showcase/${name}.webp`;

/** One heading voice across the page: bold sans, then the brand serif. */
function Title({ a, b, id }: { a: string; b: string; id?: string }) {
  return (
    <h2 id={id} className={styles.title}>
      {a} <em>{b}</em>
    </h2>
  );
}

export function StudioZero() {
  return (
    <>
      {/* ---- Hero ---- */}
      <section className={styles.hero} data-dark-hero aria-labelledby="studio-zero-heading">
        <div className={styles.inner}>
          <div className={styles.heroCopy}>
            <p className={styles.kicker}><i aria-hidden="true" />{z.eyebrow}</p>
            <h1 id="studio-zero-heading" className={styles.heroTitle}>
              <span>{z.headline.a}</span>
              <em>{z.headline.b}</em>
            </h1>
            <p className={styles.heroSupport}>{z.support}</p>
            <div className={styles.actions}>
              <Link href="/contact" className={styles.cta}>
                {z.cta}
                <span aria-hidden="true"><ArrowUpRight size={18} /></span>
              </Link>
              <a href="#studio-zero-gallery" className={styles.ghost}>{z.secondary} <ArrowRight size={16} aria-hidden="true" /></a>
            </div>
            <ul className={styles.chips}>
              {z.chips.map((chip) => <li key={chip}><Check size={14} aria-hidden="true" />{chip}</li>)}
            </ul>
          </div>
          <div className={styles.stack} aria-hidden="true">
            {["skincare", "saree", "fragrance"].map((name, i) => (
              <figure key={name} className={styles.card} style={{ ["--i" as string]: i }}>
                <Image src={img(name)} alt="" fill sizes="(max-width: 900px) 70vw, 420px" priority={i === 0} />
              </figure>
            ))}
            <span className={styles.badge}><i />AI-produced · art-directed</span>
          </div>
        </div>
      </section>

      {/* ---- The shift ---- */}
      <section className={styles.section}>
        <div className={styles.inner}>
          <div className={styles.head} data-rise>
            <div>
              <p className={styles.eyebrow}>{z.shift.eyebrow}</p>
              <Title a={z.shift.title} b={z.shift.accent} />
            </div>
            <p className={styles.lead}>{z.shift.intro}</p>
          </div>
          <div className={styles.without}>
            {z.shift.without.map((item, i) => (
              <article key={item.k} data-rise style={{ ["--rise" as string]: i + 1 }}>
                <span className={styles.strike}>{item.k}</span>
                <p>{item.v}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Capabilities ---- */}
      <section className={`${styles.section} ${styles.tint}`}>
        <div className={styles.inner}>
          <div className={styles.head} data-rise>
            <div>
              <p className={styles.eyebrow}>{z.capabilities.eyebrow}</p>
              <Title a={z.capabilities.title} b={z.capabilities.accent} />
            </div>
          </div>
          <div className={styles.caps}>
            {z.capabilities.items.map((item, i) => (
              <article key={item.id} className={styles.cap} data-rise style={{ ["--rise" as string]: (i % 2) + 1 }}>
                <div className={`${styles.capVisual} ${styles[`v_${item.id}`] ?? ""}`} aria-hidden="true">
                  {item.id === "lifestyle" && (
                    <>
                      <Image src={img("coffee")} alt="" fill sizes="(max-width: 900px) 90vw, 560px" />
                      <span className={styles.size}>4:5 · Feed</span>
                    </>
                  )}
                  {item.id === "models" && ["saree", "festive", "streetwear"].map((name) => (
                    <div key={name} className={styles.model}><Image src={img(name)} alt="" fill sizes="200px" /></div>
                  ))}
                  {item.id === "aplus" && (
                    <div className={styles.aplus}>
                      <div className={styles.aplusImg}><Image src={img("skincare")} alt="" fill sizes="240px" /></div>
                      <div className={styles.aplusText}>
                        <small>{z.capabilities.aplusExample.label}</small>
                        <b>{z.capabilities.aplusExample.product}</b>
                        <ul>{z.capabilities.aplusExample.points.map((p) => <li key={p}><Check size={13} />{p}</li>)}</ul>
                      </div>
                    </div>
                  )}
                  {item.id === "detail" && (
                    <>
                      <Image src={img("jewelry")} alt="" fill sizes="(max-width: 900px) 90vw, 560px" className={styles.zoomBase} />
                      <div className={styles.loupe}><Image src={img("jewelry")} alt="" fill sizes="400px" /></div>
                    </>
                  )}
                </div>
                <div className={styles.capCopy}>
                  <span className={styles.capNo}>{item.tags.join(" · ")}</span>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Process ---- */}
      <section className={`${styles.section} ${styles.dark}`}>
        <div className={styles.inner}>
          <div className={styles.head} data-rise>
            <div>
              <p className={styles.eyebrow}>{z.process.eyebrow}</p>
              <Title a={z.process.title} b={z.process.accent} />
            </div>
          </div>
          <ol className={styles.steps}>
            {z.process.steps.map((step, i) => (
              <li key={step.title} data-rise style={{ ["--rise" as string]: i + 1 }}>
                <span className={styles.stepNo}>{String(i + 1).padStart(2, "0")}</span>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---- Gallery ---- */}
      <section id="studio-zero-gallery" className={styles.section}>
        <div className={styles.inner}>
          <div className={styles.head} data-rise>
            <div>
              <p className={styles.eyebrow}>{z.gallery.eyebrow}</p>
              <Title a={z.gallery.title} b={z.gallery.accent} />
            </div>
            <p className={styles.lead}>{z.gallery.note}</p>
          </div>
          <div className={styles.gallery}>
            {z.gallery.images.map((image, i) => (
              <figure key={image.src} className={styles.shot} data-rise style={{ ["--rise" as string]: (i % 4) + 1 }}>
                <Image src={img(image.src)} alt={image.alt} fill sizes="(max-width: 700px) 50vw, 25vw" />
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Films ---- */}
      <section className={`${styles.section} ${styles.tint}`}>
        <div className={styles.inner}>
          <div className={styles.head} data-rise>
            <div>
              <p className={styles.eyebrow}>{z.films.eyebrow}</p>
              <Title a={z.films.title} b={z.films.accent} />
            </div>
            <p className={styles.lead}>{z.films.copy}</p>
          </div>
          <div className={styles.films}>
            {z.films.items.map((film) => (
              <div key={film} className={styles.film}>
                <HeroVideo className={styles.filmVideo} src={`/videos/ai/${film}-preview.mp4`} poster={`/videos/ai/${film}-sm.webp`} />
              </div>
            ))}
          </div>
          <div className={styles.uses}>
            <p className={styles.eyebrow}>{z.uses.eyebrow}</p>
            <ul>{z.uses.items.map((u) => <li key={u}>{u}</li>)}</ul>
          </div>
        </div>
      </section>

      {/* ---- FAQ ---- */}
      <section className={styles.section}>
        <div className={`${styles.inner} ${styles.faqGrid}`}>
          <div data-rise>
            <p className={styles.eyebrow}>Questions</p>
            <Title a="Before you" b="send a brief." />
            <Link href="/contact" className={styles.cta}>
              {z.cta}
              <span aria-hidden="true"><ArrowUpRight size={18} /></span>
            </Link>
          </div>
          <div className={styles.faq}>
            {z.faq.map((item) => (
              <details key={item.q}>
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
