'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { faqs } from '../lib/data';

export default function FAQ({items=faqs}){
  const [open,setOpen]=useState(-1);
  const midpoint=Math.ceil(items.length/2);
  const columns=[items.slice(0,midpoint),items.slice(midpoint)];

  const renderItem=(item,localIndex,columnIndex)=>{
    const [q,a]=item;
    const index=columnIndex===0?localIndex:midpoint+localIndex;
    const answerId=`faq-answer-${index}`;
    return <article className={open===index?'is-open':''} key={q}>
      <button type="button" onClick={()=>setOpen(open===index?-1:index)} aria-expanded={open===index} aria-controls={answerId}>
        <span>0{index+1}</span><b>{q}</b><i><Plus size={18}/></i>
      </button>
      <div id={answerId} className="v4-faq-answer" hidden={open!==index}><p>{a}</p></div>
    </article>;
  };

  return <div className="v4-faq-list v790-faq-columns">
    {columns.map((column,columnIndex)=><div className="v790-faq-column" key={columnIndex}>
      {column.map((item,localIndex)=>renderItem(item,localIndex,columnIndex))}
    </div>)}
  </div>;
}
