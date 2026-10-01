import { ImageResponse } from 'next/og';

export const alt = 'Webfun — Sites, lojas virtuais e sistemas sob medida';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage(){
  return new ImageResponse(
    <div style={{width:'100%',height:'100%',display:'flex',flexDirection:'column',justifyContent:'space-between',padding:'64px',background:'#ecebea',color:'#202326',fontFamily:'sans-serif'}}>
      <div style={{display:'flex',alignItems:'center',gap:'12px',fontSize:'28px',fontWeight:800}}><span style={{width:'18px',height:'18px',borderRadius:'6px',background:'#2563eb',border:'4px solid #202326'}}/>Webfun</div>
      <div style={{display:'flex',flexDirection:'column',gap:'24px'}}>
        <div style={{fontSize:'74px',lineHeight:.95,letterSpacing:'-4px',fontWeight:650,maxWidth:'970px'}}>Seu negócio merece mais do que um site.</div>
        <div style={{fontSize:'25px',color:'#73797d'}}>Estratégia · UX/UI · Tecnologia · Automação · Performance</div>
      </div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',fontSize:'20px',color:'#666d71'}}><span>webfun.com.br</span><span style={{padding:'12px 20px',borderRadius:'999px',background:'#2563eb',color:'#fff',fontWeight:650}}>Vamos conversar</span></div>
    </div>,
    size,
  );
}
