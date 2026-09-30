"use client";
import {useState} from "react";
import styles from "./GrowthRibbon.module.css";
export function CrossedBands(){const [paused,setPaused]=useState(false);return <div className={styles.section}><button className={styles.ribbon} data-paused={paused} onClick={()=>setPaused(!paused)} aria-label={paused?"Resume animated growth ribbon":"Pause animated growth ribbon"} aria-pressed={paused}>{["GOOD IDEAS. REAL MOMENTUM. ↗ ","CREATIVE INSTINCT. COMMERCIAL INTENT. ✳ "].map((text,i)=><span key={text} className={i===0?styles.band:styles.second}><span className={styles.track} aria-hidden="true">{[0,1].map(n=><span className={styles.group} key={n}>{text.repeat(4)}</span>)}</span></span>)}</button></div>}
