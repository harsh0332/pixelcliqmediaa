"use client";
import Image from "next/image";
import {useEffect,useId,useRef,useState} from "react";
import {useReducedMotion} from "framer-motion";
import {ArrowLeft,ArrowRight,Pause,Play,X} from "lucide-react";
import type {VideoCreative} from "@/content/videoCreatives";
import styles from "./VideoCollection.module.css";

function FilmCard({film,active,onOpen,onClose,enabled,duplicate}:{film:VideoCreative;active:boolean;onOpen:()=>void;onClose:()=>void;enabled:boolean;duplicate:boolean}){
 const preview=useRef<HTMLVideoElement>(null);const reduce=useReducedMotion();
 useEffect(()=>{const node=preview.current;if(!node||!film.preview)return;let visible=false;const update=()=>{if(visible&&enabled&&reduce===false&&!document.hidden){if(!node.getAttribute("src"))node.src=film.preview!;void node.play().catch(()=>{});}else node.pause();};const observer=new IntersectionObserver(entries=>{visible=entries[0]?.isIntersecting??false;update();},{threshold:.35});observer.observe(node);document.addEventListener("visibilitychange",update);return()=>{observer.disconnect();document.removeEventListener("visibilitychange",update);node.pause();};},[film.preview,enabled,reduce,active]);
 return <article className={styles.card}>
 <div className={`${styles.picture} ${film.landscape?styles.landscape:""} ${active?styles.active:""}`}>
 {active?<><video key={film.id} src={film.src} poster={film.poster} controls autoPlay playsInline preload="metadata" aria-label={film.title} onEnded={onClose}/><button className={styles.close} onClick={onClose} aria-label={`Close ${film.title}`}><X size={16}/></button></>:<button className={styles.open} onClick={onOpen} aria-label={`Play ${film.title}`} tabIndex={duplicate?-1:0}>
 <Image src={film.poster} alt={`${film.title} video still`} width={720} height={1280} sizes="(max-width:600px) 62vw, 240px" draggable={false}/>
 {film.preview&&<video ref={preview} muted loop playsInline preload="none" poster={film.poster} aria-hidden="true"/>}
 <span className={styles.duration}>{Math.floor(film.duration/60)}:{String(film.duration%60).padStart(2,"0")}</span><span className={styles.play}><Play size={21} fill="currentColor"/></span>{film.preview&&<span className={styles.featured}>SELECTED FILM</span>}
 </button>}
 </div><div className={styles.caption}><strong>{film.title}</strong><span>{film.category}</span></div>
 {film.credit&&<a className={styles.credit} href={film.creditUrl} target="_blank" rel="noreferrer">Reference · {film.credit} ↗</a>}</article>;
}

export function VideoCollection({items,carousel=false,filters=false}:{items:VideoCreative[];carousel?:boolean;filters?:boolean}){
 const [category,setCategory]=useState("All");const [selected,setSelected]=useState<string|null>(null);const [paused,setPaused]=useState(false);const [focused,setFocused]=useState(false);
 const rail=useRef<HTMLDivElement>(null);const reduce=useReducedMotion();const identity=useId();const manualUntil=useRef(0);const drag=useRef<{x:number;left:number;moved:boolean}|null>(null);const suppressClick=useRef(false);
 const visible=category==="All"?items:items.filter(item=>item.category===category);
 const categories=["All",...new Set(items.map(item=>item.category))];
 const copies=carousel?[0,1,2]:[0];
 useEffect(()=>{const close=(event:Event)=>{if((event as CustomEvent<string>).detail!==identity)setSelected(null);};window.addEventListener("pixelcliq-film-play",close);return()=>window.removeEventListener("pixelcliq-film-play",close);},[identity]);
 useEffect(()=>{const node=rail.current;if(!carousel||!node)return;const group=node.querySelector<HTMLElement>("[data-film-group]");if(!group)return;const observer=new ResizeObserver(()=>{node.scrollLeft=group.getBoundingClientRect().width+20;});observer.observe(group);return()=>observer.disconnect();},[carousel,category]);
 useEffect(()=>{const node=rail.current;if(!carousel||!node)return;let inView=false;let frame=0;let previous=0;let fraction=0;
 const observer=new IntersectionObserver(entries=>{inView=entries[0]?.isIntersecting??false;},{threshold:.1});observer.observe(node);
 const tick=(now:number)=>{const elapsed=previous?Math.min(now-previous,50):0;previous=now;const group=node.querySelector<HTMLElement>("[data-film-group]");const cycle=group?group.getBoundingClientRect().width+20:0;
 if(cycle&&!selected&&!drag.current&&now>manualUntil.current){if(node.scrollLeft<cycle*.5)node.scrollLeft+=cycle;else if(node.scrollLeft>=cycle*1.5)node.scrollLeft-=cycle;
 if(inView&&!document.hidden&&!paused&&!focused&&reduce===false){fraction+=elapsed*.026;const whole=Math.floor(fraction);if(whole){node.scrollLeft+=whole;fraction-=whole;}}}
 frame=requestAnimationFrame(tick);};frame=requestAnimationFrame(tick);return()=>{cancelAnimationFrame(frame);observer.disconnect();};},[carousel,paused,focused,selected,reduce,category]);
 function advance(direction:number){const node=rail.current;if(!node)return;manualUntil.current=performance.now()+1500;const width=(node.querySelector("article")?.getBoundingClientRect().width??240)+20;node.scrollBy({left:direction*width,behavior:reduce?"instant":"smooth"});}
 function choose(key:string){setSelected(key);window.dispatchEvent(new CustomEvent("pixelcliq-film-play",{detail:identity}));}
 return <div className={styles.collection}>
 {filters&&<div className={styles.filters} aria-label="Filter AI videos">{categories.map(c=><button key={c} aria-pressed={c===category} onClick={()=>{setCategory(c);setSelected(null);}}>{c}</button>)}</div>}
 {carousel&&<div className={styles.railBar}><span>SWIPE TO EXPLORE / PLAY IN PLACE</span><div><button onClick={()=>advance(-1)} aria-label="Previous videos"><ArrowLeft size={18}/></button><button onClick={()=>setPaused(!paused)} aria-label={paused?"Resume video previews and carousel":"Pause video previews and carousel"} aria-pressed={paused}>{paused?<Play size={16}/>:<Pause size={16}/>}</button><button onClick={()=>advance(1)} aria-label="Next videos"><ArrowRight size={18}/></button></div></div>}
 <div ref={rail} className={carousel?styles.rail:styles.grid} data-lenis-prevent={carousel||undefined}
 onFocusCapture={e=>setFocused((e.target as HTMLElement).matches(":focus-visible"))} onBlurCapture={e=>{if(!e.currentTarget.contains(e.relatedTarget))setFocused(false);}}
 onWheel={()=>{manualUntil.current=performance.now()+1500;}}
 onPointerDown={e=>{if(!carousel)return;manualUntil.current=performance.now()+2000;if(e.pointerType!=="mouse"||(e.target as HTMLElement).closest("video"))return;drag.current={x:e.clientX,left:e.currentTarget.scrollLeft,moved:false};suppressClick.current=false;}}
 onPointerMove={e=>{const state=drag.current;if(!state)return;const delta=e.clientX-state.x;if(Math.abs(delta)>5){state.moved=true;suppressClick.current=true;e.currentTarget.setPointerCapture(e.pointerId);e.currentTarget.scrollLeft=state.left-delta;}}}
 onPointerUp={e=>{if(e.currentTarget.hasPointerCapture(e.pointerId))e.currentTarget.releasePointerCapture(e.pointerId);drag.current=null;manualUntil.current=performance.now()+1800;}}
 onPointerCancel={()=>{drag.current=null;}} onLostPointerCapture={()=>{drag.current=null;}}
 onClickCapture={e=>{if(suppressClick.current){e.preventDefault();e.stopPropagation();suppressClick.current=false;}}}>
 {carousel?copies.map(copy=><div key={copy} className={styles.group} data-film-group aria-hidden={copy!==1&&!selected?true:undefined}>{visible.map(film=>{const key=`${copy}-${film.id}`;return <FilmCard key={key} film={film} active={selected===key} enabled={!paused&&!selected} duplicate={copy!==1} onOpen={()=>choose(key)} onClose={()=>setSelected(null)}/>;})}</div>):visible.map(film=><FilmCard key={film.id} film={film} active={selected===film.id} enabled={!paused&&!selected} duplicate={false} onOpen={()=>choose(film.id)} onClose={()=>setSelected(null)}/>)}
 </div>{filters&&<p className={styles.count}>Select a film to watch with sound.</p>}
 </div>;
}
