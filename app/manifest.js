export default function manifest(){
  return {
    name:'Webfun — Sites, sistemas e soluções digitais',
    short_name:'Webfun',
    description:'Sites, lojas virtuais, sistemas, UX/UI, automações e experiências digitais.',
    start_url:'/',
    display:'standalone',
    background_color:'#0d1013',
    theme_color:'#2563eb',
    lang:'pt-BR',
    icons:[
      {src:'/icons/icon-192.png',sizes:'192x192',type:'image/png'},
      {src:'/icons/icon-512.png',sizes:'512x512',type:'image/png'},
    ],
  };
}
