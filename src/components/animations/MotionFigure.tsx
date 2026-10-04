"use client";
import Image from "next/image";
import {useEffect,useRef,useState} from "react";
import {useReducedMotion} from "framer-motion";
import {Pause,Play} from "lucide-react";
import styles from "./MotionSystem.module.css";
/** `priority`: the figure sits in the first screen (a page hero), so it loads eagerly. */
export function MotionFigure({file,title,dark=false,priority=false}:{file:string;title:string;dark?:boolean;priority?:boolean}){
 const ref=useRef<HTMLElement>(null);const [visible,setVisible]=useState(false);const [paused,setPaused]=useState(false);const reduce=useReducedMotion();
 useEffect(()=>{const node=ref.current;if(!node)return;const observer=new IntersectionObserver(([entry])=>setVisible(Boolean(entry?.isIntersecting)),{threshold:.15});observer.observe(node);return()=>observer.disconnect();},[]);
 const moving=visible&&!paused&&reduce===false;
 return <figure ref={ref} className={`${styles.figure} ${dark?styles.dark:""}`}><div className={styles.art}><Image unoptimized src={`/animations/${moving?"files":"stills"}/${file}.svg`} alt={title} width={800} height={file.startsWith("loop-")?400:530} loading={priority?"eager":"lazy"} fetchPriority={priority?"high":undefined}/></div><figcaption><span>ILLUSTRATIVE WORKFLOW</span><button type="button" onClick={()=>setPaused(!paused)} aria-label={`${paused?"Play":"Pause"} ${title}`} aria-pressed={paused}>{paused?<Play size={14}/>:<Pause size={14}/>}</button></figcaption></figure>;
}
