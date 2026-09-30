"use client";
import processStyles from "./ProcessVisual.module.css";

import { useRef, useState } from "react";
import { Target, Layers3, ShoppingBag, Search, Workflow, ChartNoAxesCombined } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform, useMotionValue, useSpring, useInView } from "framer-motion";
import styles from "./RefinedHome.module.css";

export function HeroStudio() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const rotate = useTransform(scrollYProgress, [0, 1], [-12, 24]);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const tiltX = useSpring(pointerY, { stiffness: 100, damping: 25 });
  const tiltY = useSpring(pointerX, { stiffness: 100, damping: 25 });
  return <motion.div ref={ref} className={styles.studio} style={{ rotateX: reduce ? 0 : tiltX, rotateY: reduce ? 0 : tiltY, transformPerspective: 1200 }} onPointerMove={event => { if (reduce || event.pointerType !== "mouse") return; const r = event.currentTarget.getBoundingClientRect(); pointerX.set(((event.clientX-r.left)/r.width-.5)*6); pointerY.set(-((event.clientY-r.top)/r.height-.5)*6); }} onPointerLeave={()=>{pointerX.set(0);pointerY.set(0);}} role="img" aria-label="Creative, commerce and performance connected in one growth system">
    <div className={styles.studioTop}><span>THE PIXELCLIQ WAY</span><span>CREATIVE × COMMERCE</span></div>
    <svg className={styles.orbits} viewBox="0 0 600 580" aria-hidden="true"><ellipse cx="300" cy="290" rx="240" ry="180" transform="rotate(-35 300 290)"/><ellipse cx="300" cy="290" rx="240" ry="180" transform="rotate(35 300 290)"/><circle cx="300" cy="290" r="150"/></svg>
    <motion.div className={styles.studioStar} style={{ rotate: reduce ? -12 : rotate }} aria-hidden="true">✳</motion.div>
    <motion.div className={styles.creativeTile} initial={false} animate={reduce ? {} : { y: [16, -6, 0], rotate: [-12, -7, -9] }} transition={{ duration: 1.5, ease: "easeOut" }}>
      <span>01 / CREATIVE</span><strong>STOP.<br/>LOOK.<br/><i>WANT.</i></strong><div className={styles.tileBottom}>Ideas that earn attention.<span>↗</span></div>
    </motion.div>
    <motion.div className={styles.storeTile} initial={false} animate={reduce ? {} : { y: [30, -8, 0], rotate: [12, 5, 7] }} transition={{ duration: 1.7, ease: "easeOut" }}>
      <div className={styles.browserDots}>● ● ● <span>02 / COMMERCE</span></div><div className={styles.productObject}><div/><span>your<br/><b>next</b><br/>favourite.</span></div><div className={styles.storeButton}>Discover. Add. Love. <span>↗</span></div>
    </motion.div>
    <motion.div className={styles.signalTile} initial={false} animate={reduce ? {} : { x: [-20, 0], opacity: [.4, 1] }} transition={{ duration: 1, delay: .3 }}><span>03 / PERFORMANCE</span><svg viewBox="0 0 180 48" aria-hidden="true"><path d="M2 43 L30 37 L55 40 L85 23 L110 29 L143 12 L178 3"/></svg><strong>Turn attention<br/>into action.</strong></motion.div>
    <div className={styles.studioBottom}><span>ONE CONNECTED GROWTH SYSTEM</span><span>↗</span></div>
  </motion.div>;
}

const serviceVisuals = [
 {Icon:Target,label:"REACH THE RIGHT PEOPLE",word:"Demand",detail:"Audience → Offer → Acquisition"},
 {Icon:Layers3,label:"GIVE THEM A REASON TO CARE",word:"Desire",detail:"Strategy → Story → Creative"},
 {Icon:ShoppingBag,label:"MAKE THE NEXT STEP EASY",word:"Conversion",detail:"Experience → Trust → Purchase"},
 {Icon:Search,label:"SHOW UP WHERE IT MATTERS",word:"Discovery",detail:"Search → Content → Relevance"},
 {Icon:Workflow,label:"KEEP THE CONNECTION GOING",word:"Retention",detail:"Welcome → Nurture → Return"},
 {Icon:ChartNoAxesCombined,label:"KNOW YOUR NEXT MOVE",word:"Clarity",detail:"Measure → Learn → Improve"},
];
export function ServiceArt({index}:{index:number}) {
 const {Icon,label,word,detail}=serviceVisuals[index%6]!;
 return <div className={`${styles.poster} ${styles[`poster${index%6}`]}`} aria-hidden="true"><span className={styles.posterMeta}>{label}</span><Icon className={styles.serviceIcon} strokeWidth={1}/><div><strong>{word}</strong><small>{detail}</small></div></div>;
}

const steps = [
  { title: "Discover", detail: "Find the real opportunity.", copy: "We audit your offer, audience, creative and customer journey before deciding where to focus.", output: "Brand audit · Growth priorities", word: "CLARITY", nodes: ["Audience", "Offer", "Opportunity"] },
  { title: "Strategise", detail: "Give every move a purpose.", copy: "Positioning, channel choices and a testing roadmap come together in one practical growth plan.", output: "Channel strategy · Testing roadmap", word: "DIRECTION", nodes: ["Insight", "Strategy", "Roadmap"] },
  { title: "Create", detail: "Build the whole experience.", copy: "We connect ad creative, landing pages and follow-up flows so every touchpoint tells the same story.", output: "Campaign creative · Conversion journey", word: "CONNECTION", nodes: ["Creative", "Storefront", "Follow-up"] },
  { title: "Launch", detail: "Put the plan into motion.", copy: "Tracking, campaign setup and quality checks give each launch a clear starting point.", output: "Campaign launch · Measurement setup", word: "MOMENTUM", nodes: ["Check", "Launch", "Measure"] },
  { title: "Refine", detail: "Make the next move smarter.", copy: "We review the signals, share the learning and turn it into the next creative and conversion tests.", output: "Performance review · Next experiments", word: "PROGRESS", nodes: ["Learn", "Improve", "Repeat"] },
];

function ProcessVisual({stage,title}:{stage:number;title:string}) {
  const ref = useRef<HTMLElement>(null);
  const visible = useInView(ref, {amount:.2});
  const reduce = useReducedMotion();
  const [paused,setPaused] = useState(false);
  const running = visible && !reduce && !paused;
  return <figure ref={ref} className={processStyles.figure} data-running={running} aria-label={`${title} workflow illustration`}>
    <div className={processStyles.top}><span>0{stage+1} / {title.toUpperCase()}</span><span>THE PIXELCLIQ METHOD</span></div>
    <svg viewBox="0 0 640 360" className={processStyles.canvas} aria-hidden="true">
      {stage===0 && <>
        <g className={processStyles.grid}>{[100,160,220,280].map(y=><path key={y} d={`M50 ${y}H590`}/>)}{[100,200,300,400,500].map(x=><path key={x} d={`M${x} 55V310`}/>)}</g>
        <circle cx="325" cy="185" r="110" className={processStyles.ring}/><circle cx="325" cy="185" r="68" className={processStyles.ring}/>
        <g className={processStyles.scanner}><path d="M325 185L432 163A110 110 0 0 0 374 87Z" fill="#284bff" opacity=".4"/><path d="M325 185L432 163" stroke="#7694ff" strokeWidth="2"/></g>
        <circle cx="285" cy="150" r="7" fill="#fff"/><circle cx="380" cy="235" r="7" fill="#fff"/><circle cx="360" cy="118" r="9" className={processStyles.signal}/>
        <g className={processStyles.label}><rect x="48" y="82" width="154" height="50" rx="9"/><text x="68" y="113">Audience signals</text><rect x="413" y="238" width="174" height="50" rx="9"/><text x="433" y="269">The opportunity ↗</text></g>
      </>}
      {stage===1 && <>
        <path d="M96 257H240V181H399V104H549" className={processStyles.route}/>
        <path d="M96 257H240V181H399V104H549" className={processStyles.traveller}/>
        {[{x:64,y:220,n:'01',t:'Position'},{x:225,y:141,n:'02',t:'Prioritise'},{x:390,y:64,n:'03',t:'Plan'}].map(v=><g key={v.n} className={processStyles.label}><rect x={v.x} y={v.y} width="150" height="77" rx="10"/><text x={v.x+17} y={v.y+27} className={processStyles.small}>{v.n}</text><text x={v.x+17} y={v.y+54}>{v.t}</text></g>)}
        <text x="380" y="302" className={processStyles.note}>ONE SHARED ROADMAP</text>
      </>}
      {stage===2 && <>
        <g className={processStyles.cardA}><rect x="95" y="61" width="160" height="225" rx="12" fill="#e9eeff"/><rect x="111" y="77" width="128" height="116" rx="6" fill="#284bff"/><path d="M151 110L201 139L151 168Z" fill="#e4ff83"/><path d="M113 216H216M113 232H184" stroke="#101b38" strokeWidth="7"/><text x="113" y="265" fill="#284bff" fontSize="11">THE CREATIVE</text></g>
        <g className={processStyles.cardB}><rect x="267" y="91" width="167" height="214" rx="12" fill="#284bff"/><rect x="284" y="109" width="133" height="112" rx="6" fill="#7891ff"/><circle cx="350" cy="163" r="35" fill="#e4ff83"/><path d="M287 244H405M287 261H371" stroke="#fff" strokeWidth="6"/><text x="287" y="288" fill="#fff" fontSize="11">THE EXPERIENCE</text></g>
        <g className={processStyles.cardC}><rect x="449" y="117" width="94" height="136" rx="15" fill="#fff"/><rect x="459" y="139" width="74" height="55" rx="6" fill="#dce5ff"/><path d="M466 211H526M466 225H509" stroke="#284bff" strokeWidth="5"/></g>
      </>}
      {stage===3 && <>
        <g className={processStyles.label}><rect x="49" y="70" width="203" height="220" rx="12"/>{['Tracking ready','Creative checked','Journey connected'].map((t,i)=><g key={t}><circle cx="75" cy={118+i*61} r="10" fill="#284bff"/><path d={`M70 ${118+i*61}l4 4 7-8`} stroke="#fff" strokeWidth="2" fill="none"/><text x="96" y={123+i*61} fontSize="12">{t}</text></g>)}</g>
        <path d="M288 278Q440 278 535 87" className={processStyles.route}/><path d="M288 278Q440 278 535 87" className={processStyles.traveller}/>
        <g className={processStyles.launch}><path d="M474 151L535 74L528 174L509 155L486 183L468 169L492 141Z" fill="#e4ff83"/></g>
        <text x="331" y="327" className={processStyles.note}>READY. SET. IN MARKET.</text>
      </>}
      {stage===4 && <>
        <path d="M64 70V290H575" className={processStyles.route}/>
        {[82,130,172,209,252,285].map((h,i)=><rect key={h} x={100+i*73} y={290-h*.65} width="42" height={h*.65} rx="5" fill={i===5?'#e4ff83':'#284bff'} className={processStyles.bar} style={{animationDelay:`${i*.14}s`}}/>)}
        <path d="M120 213L194 202L266 169L341 149L412 112L486 72" className={processStyles.trend}/>
        <g className={processStyles.label}><rect x="74" y="35" width="220" height="47" rx="9"/><text x="92" y="64">Learn → Test → Improve</text></g>
        <text x="333" y="330" className={processStyles.note}>EVERY TEST INFORMS THE NEXT</text>
      </>}
    </svg>
    <figcaption><span>{['Read the signals. Find your opening.','Turn insight into a sequence of moves.','One idea, across every touchpoint.','A coordinated launch, built to learn.','Keep what works. Build on the learning.'][stage]}</span><button type="button" onClick={()=>setPaused(!paused)} aria-label={`${paused?'Play':'Pause'} ${title} animation`} aria-pressed={paused}>{paused?'▶':'Ⅱ'}</button></figcaption>
  </figure>;
}

export function GrowthProcess() {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start .85", "end .4"] });
  const step = steps[active]!;
  return <div ref={ref} className={styles.process}>
    <div className={styles.processTabs} role="tablist" aria-label="Our process">{steps.map((item, i) => <button key={item.title} role="tab" id={`process-tab-${i}`} aria-selected={active === i} aria-controls="process-panel" tabIndex={active === i ? 0 : -1} onClick={() => setActive(i)} onKeyDown={event => { let next = active; if(event.key === "ArrowRight") next = (active + 1) % steps.length; else if(event.key === "ArrowLeft") next = (active + steps.length - 1) % steps.length; else if(event.key === "Home") next = 0; else if(event.key === "End") next = steps.length - 1; else return; event.preventDefault(); setActive(next); document.getElementById(`process-tab-${next}`)?.focus(); }}><span>0{i+1}</span>{item.title}<span aria-hidden="true">↗</span></button>)}</div>
    <div className={styles.processTrack} aria-hidden="true"><motion.div style={{ scaleX: reduce ? 1 : scrollYProgress }}/></div>
    <div id="process-panel" role="tabpanel" aria-labelledby={`process-tab-${active}`} className={styles.processPanel}>
      <div className={styles.processCopy}><span className={styles.eyebrow}>STEP 0{active+1} / THE COMPOUND LOOP</span><h3>{step.detail}</h3><p>{step.copy}</p><div className={styles.processOutput}>{step.output}</div></div>
      <ProcessVisual key={active} stage={active} title={step.title}/>

    </div>
  </div>;
}
