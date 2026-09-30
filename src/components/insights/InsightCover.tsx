import styles from './InsightCover.module.css';

const covers: Record<string, { number: string; label: string; word: string; kind: number }> = {
  'creative-testing-structure': { number: '01', label: 'CREATIVE SYSTEMS', word: 'Find the signal.', kind: 0 },
  'creative-volume-and-cac': { number: '02', label: 'ACQUISITION', word: 'Keep ideas moving.', kind: 1 },
  'healthy-shopify-pdp': { number: '03', label: 'COMMERCE', word: 'Make the next click count.', kind: 2 },
  'attribution-after-ios': { number: '04', label: 'MEASUREMENT', word: 'Connect the evidence.', kind: 3 },
  'retention-math': { number: '05', label: 'CUSTOMER VALUE', word: 'Build the return.', kind: 4 },
  'reading-a-meta-account': { number: '06', label: 'ACCOUNT HEALTH', word: 'Look before you scale.', kind: 5 },
};

/** Editorial illustrations describe each topic without pretending to be client data. */
export function InsightCover({ slug }: { slug: string }) {
  const cover = covers[slug] ?? covers['creative-testing-structure']!;
  return <div className={`${styles.cover} ${styles[`tone${cover.kind}`]}`} aria-hidden="true">
    <div className={styles.meta}><span>{cover.label}</span><span>FIELD NOTE / {cover.number}</span></div>
    <svg className={styles.diagram} viewBox="0 0 480 220" fill="none">
      {cover.kind === 0 && <><path d="M110 108H360" className={styles.line}/>{[0,1,2].map(i=><g key={i} transform={`translate(${75+i*120} ${55-i*10}) rotate(${i*5-5} 50 55)`}><rect width="95" height="115" rx="8" className={i===2?styles.solid:styles.panel}/><circle cx="47" cy="45" r={18+i*3} className={i===2?styles.ring:styles.line}/><path d="M23 84H71M23 94H53" className={styles.line}/></g>)}</>}
      {cover.kind === 1 && <><path d="M60 172H420M60 45V172" className={styles.line}/><path d="M65 155C110 145 118 160 163 123S226 141 264 92S337 90 412 43" className={styles.trace}/>{[0,1,2,3,4,5].map(i=><rect key={i} x={85+i*54} y={145-i*14} width="27" height={27+i*14} rx="3" className={styles.panel}/>)}<circle cx="412" cy="43" r="9" className={styles.solid}/></>}
      {cover.kind === 2 && <><rect x="105" y="20" width="270" height="182" rx="12" className={styles.panel}/><path d="M105 48H375" className={styles.line}/><circle cx="121" cy="34" r="3" className={styles.solid}/><circle cx="133" cy="34" r="3" className={styles.solid}/><rect x="123" y="67" width="97" height="113" rx="5" className={styles.solid}/><path d="M153 142V100H190V142ZM160 100V90H183V100" className={styles.ring}/><path d="M240 79H352M240 95H330M240 119H300" className={styles.line}/><rect x="240" y="145" width="110" height="30" rx="15" className={styles.solid}/></>}
      {cover.kind === 3 && <><path d="M94 63L240 110L390 46M240 110L375 177M240 110L80 173" className={styles.line}/>{[[94,63],[390,46],[375,177],[80,173]].map(([x,y],i)=><g key={i}><circle cx={x} cy={y} r="23" className={styles.panel}/><circle cx={x} cy={y} r="6" className={styles.solid}/></g>)}<circle cx="240" cy="110" r="52" className={styles.panel}/><circle cx="240" cy="110" r="33" className={styles.solid}/><path d="M225 110L236 121L257 99" className={styles.ring}/></>}
      {cover.kind === 4 && <><ellipse cx="240" cy="112" rx="157" ry="70" className={styles.line}/><ellipse cx="240" cy="112" rx="112" ry="47" className={styles.line}/><circle cx="240" cy="112" r="31" className={styles.solid}/><path d="M224 112H256M240 96V128" className={styles.ring}/><circle cx="84" cy="109" r="16" className={styles.solid}/><circle cx="344" cy="65" r="11" className={styles.solid}/><circle cx="305" cy="173" r="19" className={styles.panel}/></>}
      {cover.kind === 5 && <><rect x="106" y="18" width="265" height="187" rx="12" className={styles.panel}/>{[0,1,2,3,4].map(i=><g key={i}><rect x="126" y={37+i*31} width="18" height="18" rx="4" className={styles.solid}/><path d={`M131 ${45+i*31}l4 4 6-7`} className={styles.ring}/><path d={`M163 ${46+i*31}H${321-i*13}`} className={styles.line}/></g>)}</>}
    </svg>
    <strong>{cover.word}</strong><span className={styles.arrow}>↗</span>
  </div>;
}
