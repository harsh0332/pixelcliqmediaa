"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import styles from "./CreativeGallery.module.css";
const pieces = [
 {id:"interval",brand:"Interval",title:"A better kind of pause",category:"Food & beverage"},
 {id:"forme",brand:"Forme",title:"Carry a little extraordinary",category:"Fashion"},
 {id:"morrow",brand:"Morrow",title:"Less noise. More feeling",category:"Product & interiors"},
 {id:"coffee",brand:"Early Hours",title:"Make mornings yours",category:"Food & beverage"},
 {id:"sneakers",brand:"Pace Club",title:"Find your pace",category:"Fashion"},
 {id:"jewelry",brand:"Sona Form",title:"Small things. Lasting impressions",category:"Beauty & lifestyle"},
 {id:"skincare",brand:"Still Kind",title:"A softer start",category:"Beauty & lifestyle"},
 {id:"fragrance",brand:"Nuit Atelier",title:"Leave a little mystery",category:"Beauty & lifestyle"},
 {id:"soda",brand:"Good Fizz",title:"A brighter kind of break",category:"Food & beverage"},
 {id:"bags",brand:"Dayform",title:"Carry a little character",category:"Fashion"},
 {id:"chocolate",brand:"Small Joy",title:"Good things. Small squares",category:"Food & beverage"},

 {id:"beauty",brand:"Hue Theory",title:"Colour outside the lines",category:"Beauty & lifestyle"},
 {id:"saree",brand:"Tara Threads",title:"Woven to wander",category:"Fashion"},
 {id:"cases",brand:"Carry Co.",title:"A little more you",category:"Product & interiors"},
 {id:"food",brand:"Saanjh",title:"Made for seconds",category:"Food & beverage"},
 {id:"eyewear",brand:"Offgrid",title:"A different outlook",category:"Beauty & lifestyle"},
 {id:"streetwear",brand:"After Hours",title:"Off the clock",category:"Fashion"},
 {id:"interiors",brand:"Form / Room",title:"Take your time",category:"Product & interiors"},
 {id:"tech",brand:"Threshold",title:"Welcome to effortless",category:"Product & interiors"},
 {id:"festive",brand:"Meher Studio",title:"An everyday heirloom",category:"Fashion"},
 {id:"dessert",brand:"Mitha",title:"Save room for sweet",category:"Food & beverage"},
 {id:"craft",brand:"Loom Folk",title:"Rooted. Never still",category:"Fashion"},
 {id:"comfort",brand:"Saanjh",title:"A little warmth",category:"Food & beverage"},
 {id:"pantry",brand:"Saanjh",title:"Home in a spoonful",category:"Food & beverage"},
];
const categories=["All","Fashion","Food & beverage","Beauty & lifestyle","Product & interiors"];
type Piece = (typeof pieces)[number];
function CreativeCard({piece}:{piece:Piece}) {
 return <article className={styles.card}><div className={styles.art}><Image draggable={false} src={`/images/showcase/${piece.id}.webp`} alt={`${piece.brand} concept campaign: ${piece.title}`} width={1024} height={1024} sizes="(max-width:600px) 65vw, 300px"/></div><div className={styles.caption}><span><strong>{piece.brand}</strong><small>{piece.category}</small></span></div></article>;
}
function CreativeRow({items,reverse=false,paused}:{items:Piece[];reverse?:boolean;paused:boolean}) {
 const rail=useRef<HTMLDivElement>(null);const drag=useRef<{x:number;left:number}|null>(null);const reduce=useReducedMotion();const [focused,setFocused]=useState(false);
 useEffect(()=>{const node=rail.current;if(!node)return;let frame=0,last=0,inView=false,position=0,rendered=-1;const observer=new IntersectionObserver(e=>{inView=e[0]?.isIntersecting??false;},{threshold:.05});observer.observe(node);
 const tick=(now:number)=>{const span=node.scrollWidth/3;if(span>0){if(node.scrollLeft!==rendered)position=node.scrollLeft;if(position<1)position+=span;else if(position>=span*2)position-=span;if(last&&inView&&!paused&&!focused&&!drag.current&&reduce===false&&!document.hidden)position+=(reverse?-1:1)*Math.min(now-last,40)*.025;node.scrollLeft=position;rendered=node.scrollLeft;}last=now;frame=requestAnimationFrame(tick);};frame=requestAnimationFrame(tick);return()=>{cancelAnimationFrame(frame);observer.disconnect();};},[paused,focused,reverse,reduce]);
 return <div className={styles.marquee} data-lenis-prevent ref={rail} tabIndex={0} role="region" aria-label={reverse?"Creative showcase, moving right":"Creative showcase, moving left"} onFocus={e=>setFocused(e.currentTarget.matches(":focus-visible"))} onBlur={()=>setFocused(false)} onPointerDown={e=>{if(e.pointerType!=="mouse")return;drag.current={x:e.clientX,left:e.currentTarget.scrollLeft};e.currentTarget.setPointerCapture(e.pointerId);}} onPointerMove={e=>{if(drag.current)e.currentTarget.scrollLeft=drag.current.left-(e.clientX-drag.current.x);}} onPointerUp={()=>{drag.current=null;}} onPointerCancel={()=>{drag.current=null;}} onKeyDown={e=>{if(e.key==="ArrowRight"||e.key==="ArrowLeft"){e.preventDefault();e.currentTarget.scrollBy({left:e.key==="ArrowRight"?300:-300,behavior:reduce?"instant":"smooth"});}}}>
 {[0,1,2].map(copy=><div className={styles.marqueeGroup} key={copy} aria-hidden={copy!==1?true:undefined}>{items.map(piece=><CreativeCard key={piece.id} piece={piece}/>)}</div>)}
 </div>;
}
export function CreativeGallery({compact=false}:{compact?:boolean}){
 const [category,setCategory]=useState("All");const [paused,setPaused]=useState(false);
 const visible=pieces.filter(p=>category==="All"||p.category===category);
 return <div>
 {!compact&&<div className={styles.filters} aria-label="Filter creative showcase">{categories.map(c=><button key={c} onClick={()=>setCategory(c)} aria-pressed={category===c}>{c}</button>)}</div>}
 <div className={styles.galleryBar}><p className={styles.note}>STUDIO EXPLORATIONS / Original concept brands and campaigns.</p>{compact&&<button onClick={()=>setPaused(!paused)} aria-pressed={paused} aria-label={paused?"Resume creative gallery":"Pause creative gallery"}>{paused?"▶":"Ⅱ"}</button>}</div>
 {compact?<div className={styles.rows}><CreativeRow items={pieces.filter((_,i)=>i%2===0)} paused={paused}/><CreativeRow items={pieces.filter((_,i)=>i%2===1)} reverse paused={paused}/></div>:<div className={styles.grid}>{visible.map(piece=><CreativeCard key={piece.id} piece={piece}/>)}</div>}
 </div>;
}
