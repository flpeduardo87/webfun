(function(global){
  'use strict';

  const STORAGE_KEY='webfun_catalog_core_v1';
  const LEGACY_KEYS=['fornoalto_catalog_v6','fornoalto_catalog_v5'];
  const VERSION=10;

  const BUSINESS_PROFILES={
    food:{
      id:'food',label:'Alimentação',icon:'🍕',documentLabel:'Cardápio Digital',catalogLabel:'Cardápio',catalogKicker:'MENU',highlightsKicker:'MAIS PEDIDOS',highlightsTitle:'Favoritos da casa',highlightsCopy:'Receitas que representam a cozinha e sempre voltam para a mesa.',
      searchPlaceholder:'Buscar pizza, entrada, bebida ou sobremesa...',primaryCta:'Fazer pedido',secondaryCta:'Explorar menu',cartLabel:'Seu pedido',cartTitle:'Pedido',singleAction:'Pedir só este',addAction:'Adicionar',checkoutAction:'Enviar pedido no WhatsApp',modalKicker:'ESCOLHA DO SEU JEITO',pricePrefix:'a partir de',
      conversionMode:'order_whatsapp',features:{cart:true,hours:true,fulfillment:true,delivery:true,addons:true,variants:true,attributes:false,upsell:true}
    },
    retail:{
      id:'retail',label:'Varejo',icon:'👗',documentLabel:'Vitrine Digital',catalogLabel:'Coleção',catalogKicker:'COLEÇÃO',highlightsKicker:'EM DESTAQUE',highlightsTitle:'Escolhas que vestem bem',highlightsCopy:'Novidades, best-sellers e peças selecionadas para você.',
      searchPlaceholder:'Buscar produto, coleção, cor ou tamanho...',primaryCta:'Ver coleção',secondaryCta:'Novidades',cartLabel:'Sua sacola',cartTitle:'Sacola',singleAction:'Comprar este',addAction:'Adicionar',checkoutAction:'Enviar sacola no WhatsApp',modalKicker:'ESCOLHA SUA OPÇÃO',pricePrefix:'',
      conversionMode:'cart_whatsapp',features:{cart:true,hours:false,fulfillment:false,delivery:false,addons:false,variants:true,attributes:true,upsell:true}
    },
    automotive:{
      id:'automotive',label:'Veículos',icon:'🚗',documentLabel:'Estoque Digital',catalogLabel:'Estoque',catalogKicker:'ESTOQUE',highlightsKicker:'SELEÇÃO ESPECIAL',highlightsTitle:'Veículos em destaque',highlightsCopy:'Modelos selecionados e prontos para uma nova história.',
      searchPlaceholder:'Buscar marca, modelo, ano ou câmbio...',primaryCta:'Ver estoque',secondaryCta:'Destaques',cartLabel:'Interesses',cartTitle:'Interesses',singleAction:'Tenho interesse',addAction:'Ver detalhes',checkoutAction:'Falar no WhatsApp',modalKicker:'DETALHES DO VEÍCULO',pricePrefix:'',
      conversionMode:'lead_whatsapp',features:{cart:false,hours:false,fulfillment:false,delivery:false,addons:false,variants:false,attributes:true,upsell:false}
    },
    services:{
      id:'services',label:'Serviços',icon:'🛠️',documentLabel:'Serviços Digitais',catalogLabel:'Serviços',catalogKicker:'SERVIÇOS',highlightsKicker:'MAIS PROCURADOS',highlightsTitle:'Os mais procurados',highlightsCopy:'O que mais movimenta a agenda. Reserve com antecedência para garantir seu horário.',
      searchPlaceholder:'Buscar por serviço, tipo ou necessidade...',primaryCta:'Ver serviços',secondaryCta:'Mais procurados',cartLabel:'Solicitação',cartTitle:'Solicitação',singleAction:'Solicitar orçamento',addAction:'Conhecer serviço',checkoutAction:'Falar com especialista',modalKicker:'DETALHES DO SERVIÇO',pricePrefix:'',
      conversionMode:'service_quote',features:{cart:false,hours:false,fulfillment:false,delivery:false,addons:false,variants:false,attributes:true,upsell:false,serviceLead:true}
    }
  };

  const PIZZA_SIZES=[
    {id:'p',name:'Pequena • 4 fatias',delta:-5},
    {id:'m',name:'Média • 6 fatias',delta:0,default:true},
    {id:'g',name:'Grande • 8 fatias',delta:8}
  ];
  const PIZZA_ADDONS=[
    {id:'borda-catupiry',name:'Borda de Catupiry',price:6},
    {id:'borda-cheddar',name:'Borda de Cheddar',price:6},
    {id:'bacon',name:'Bacon crocante',price:5},
    {id:'queijo',name:'Queijo extra',price:4.5}
  ];

  const SHARED_HOURS={
    mon:{closed:true},tue:{open:'18:00',close:'23:30'},wed:{open:'18:00',close:'23:30'},thu:{open:'18:00',close:'23:30'},fri:{open:'18:00',close:'00:30'},sat:{open:'18:00',close:'00:30'},sun:{open:'18:00',close:'23:00'}
  };

  const TEMPLATES={
    food:{
      version:VERSION,
      config:{
        businessName:'Forno Alto',businessType:'food',businessSubtype:'PIZZARIA',conversionMode:'order_whatsapp',logoImage:'',whatsapp:'5511999999999',timeZone:'America/Sao_Paulo',deliveryFee:7.90,freeDeliveryThreshold:120,
        accent:'#c94f32',accent2:'#f0c19f',heroKicker:'COZINHA ARTESANAL · FORNO ACESO',heroTitle:'Pizza feita com tempo.',heroHighlight:'Sabor que chega inteiro.',heroCopy:'Fermentação longa, ingredientes bem escolhidos e receitas preparadas para transformar um pedido simples em uma boa noite.',heroImage:'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=1800&q=88',openingHours:SHARED_HOURS,
        benefits:[
          {icon:'48h',label:'Fermentação longa',text:'Massa leve, saborosa e feita com tempo'},
          {icon:'🔥',label:'Forno bem quente',text:'Borda marcada e ingredientes no ponto'},
          {icon:'📲',label:'Pedido direto',text:'Escolha, personalize e envie no WhatsApp'}
        ],
        sections:[{id:'pizzas',label:'Pizzas',icon:'🍕',enabled:true},{id:'entradas',label:'Entradas',icon:'🥖',enabled:true},{id:'bebidas',label:'Bebidas',icon:'🥤',enabled:true},{id:'sobremesas',label:'Sobremesas',icon:'🍰',enabled:true},{id:'combos',label:'Combos',icon:'🔥',enabled:true}],
        upsellSections:['bebidas','sobremesas','entradas']
      },
      menu:[
        {id:'margherita',section:'pizzas',name:'Margherita da Casa',description:'Molho de tomate assado, mozzarella fior di latte, manjericão fresco e azeite extravirgem.',price:42,image:'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=1200&q=85',highlight:true,available:true,badges:['mais pedido'],variants:PIZZA_SIZES,addons:PIZZA_ADDONS},
        {id:'pepperoni',section:'pizzas',name:'Pepperoni Picante',description:'Mozzarella derretida, pepperoni tostado nas bordas, tomate e um toque suave de pimenta.',price:47.90,image:'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=1200&q=85',highlight:true,available:true,badges:['mais pedido','promoção'],variants:PIZZA_SIZES,addons:PIZZA_ADDONS},
        {id:'trufa',section:'pizzas',name:'Funghi & Trufa',description:'Cogumelos salteados, mozzarella, parmesão, rúcula e finalização com creme de trufa.',price:54.50,image:'https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=1200&q=85',highlight:true,available:true,badges:['novidade'],variants:PIZZA_SIZES,addons:PIZZA_ADDONS},
        {id:'parma-burrata',section:'pizzas',name:'Parma & Burrata',description:'Molho artesanal, mozzarella, presunto parma, burrata cremosa e folhas de manjericão.',price:58.90,image:'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1200&q=85',highlight:false,available:true,badges:['novidade'],variants:PIZZA_SIZES,addons:PIZZA_ADDONS},
        {id:'burrata',section:'entradas',name:'Burrata Cremosa',description:'Burrata fresca, tomate confit, pesto de manjericão e pão tostado.',price:31.90,image:'https://images.unsplash.com/photo-1625944525533-473f1a3d54e7?auto=format&fit=crop&w=1200&q=85',highlight:true,available:true,badges:['mais pedido'],addons:[{id:'pao-extra',name:'Pão tostado extra',price:5.5},{id:'parma',name:'Presunto parma',price:9}]},
        {id:'coca',section:'bebidas',name:'Coca-Cola',description:'Bem gelada. A parceira clássica de uma pizza saindo do forno.',price:7.50,image:'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=1200&q=85',highlight:false,available:true,badges:[],variants:[{id:'lata',name:'Lata 350 ml',delta:0,default:true},{id:'1l',name:'Garrafa 1 L',delta:5.5}]},
        {id:'limonada',section:'bebidas',name:'Limonada Siciliana',description:'Limão-siciliano, gelo, toque de açúcar e frescor na medida.',price:11.80,image:'https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&w=1200&q=85',highlight:false,available:true,badges:['novidade']},
        {id:'tiramisu',section:'sobremesas',name:'Tiramisù',description:'Camadas cremosas de mascarpone, café intenso, cacau e biscoitos macios.',price:19.90,image:'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=1200&q=85',highlight:false,available:true,badges:['mais pedido']},
        {id:'combo-familia',section:'combos',name:'Combo Família',description:'2 pizzas grandes, Coca-Cola 2 L e focaccia. Feito para uma noite de pizza em família.',price:129.90,image:'https://images.unsplash.com/photo-1565299507177-b0ac66763828?auto=format&fit=crop&w=1200&q=85',highlight:false,available:true,badges:['novidade']}
      ]
    },
    retail:{
      version:VERSION,
      config:{
        businessName:'Áurea Store',businessType:'retail',businessSubtype:'MODA FEMININA',conversionMode:'cart_whatsapp',logoImage:'',whatsapp:'5511999999999',timeZone:'America/Sao_Paulo',deliveryFee:0,freeDeliveryThreshold:0,
        accent:'#876b55',accent2:'#e1cdbb',heroKicker:'NOVA COLEÇÃO',heroTitle:'Essenciais contemporâneos',heroHighlight:'para vestir bem todos os dias.',heroCopy:'Peças versáteis, caimento impecável e uma curadoria pensada para acompanhar sua rotina.',heroImage:'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1800&q=88',openingHours:{},
        sections:[{id:'novidades',label:'Novidades',icon:'✨',enabled:true},{id:'vestidos',label:'Vestidos',icon:'👗',enabled:true},{id:'alfaiataria',label:'Alfaiataria',icon:'🧵',enabled:true},{id:'basicos',label:'Essenciais',icon:'👚',enabled:true}],upsellSections:['novidades','basicos']
      },
      menu:[
        {id:'vestido-serena',section:'novidades',name:'Vestido Midi Serena',description:'Modelagem fluida, alças delicadas e tecido de toque macio para composições elegantes.',price:189.90,image:'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1200&q=85',highlight:true,available:true,badges:['novidade'],variants:[{id:'p',name:'P',delta:0},{id:'m',name:'M',delta:0,default:true},{id:'g',name:'G',delta:0}],attributes:[{label:'Material',value:'Viscose premium'},{label:'Cores',value:'Preto • Areia'}]},
        {id:'blazer-aurora',section:'alfaiataria',name:'Blazer Aurora',description:'Alfaiataria leve com corte estruturado e acabamento minimalista.',price:249.90,image:'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=1200&q=85',highlight:true,available:true,badges:['mais pedido'],variants:[{id:'p',name:'P',delta:0},{id:'m',name:'M',delta:0,default:true},{id:'g',name:'G',delta:0}],attributes:[{label:'Tecido',value:'Alfaiataria soft'},{label:'Cor',value:'Off white'}]},
        {id:'calca-lina',section:'alfaiataria',name:'Calça Lina',description:'Cintura alta, pernas retas e caimento elegante para produções do trabalho ao jantar.',price:179.90,image:'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?auto=format&fit=crop&w=1200&q=85',highlight:true,available:true,badges:[],variants:[{id:'36',name:'36',delta:0},{id:'38',name:'38',delta:0,default:true},{id:'40',name:'40',delta:0},{id:'42',name:'42',delta:0}]},
        {id:'camiseta-essencial',section:'basicos',name:'Camiseta Essencial',description:'Algodão encorpado, gola firme e shape levemente amplo.',price:79.90,image:'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=85',highlight:true,available:true,badges:['promoção'],variants:[{id:'p',name:'P',delta:0},{id:'m',name:'M',delta:0,default:true},{id:'g',name:'G',delta:0}]}
      ]
    },
    automotive:{
      version:VERSION,
      config:{
        businessName:'Nova Motors',businessType:'automotive',businessSubtype:'REVENDA DE VEÍCULOS',conversionMode:'lead_whatsapp',logoImage:'',whatsapp:'5511999999999',timeZone:'America/Sao_Paulo',deliveryFee:0,freeDeliveryThreshold:0,
        accent:'#2f7df6',accent2:'#8bb8ff',heroKicker:'SELEÇÃO, PROCEDÊNCIA E ATENDIMENTO',heroTitle:'Seu próximo veículo',heroHighlight:'começa por uma boa escolha.',heroCopy:'Explore seminovos selecionados, compare os principais dados e fale direto com a equipe para consultar condições.',heroImage:'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1800&q=88',openingHours:{},
        benefits:[
          {icon:'🔍',label:'Seleção criteriosa',text:'Informações claras para comparar'},
          {icon:'🔄',label:'Avalie seu usado',text:'Consulte possibilidades de troca'},
          {icon:'📲',label:'Condições de compra',text:'Fale direto com a equipe'}
        ],
        sections:[{id:'seminovos',label:'Seminovos',icon:'🚘',enabled:true},{id:'suvs',label:'SUVs',icon:'🚙',enabled:true},{id:'sedans',label:'Sedans',icon:'🚗',enabled:true},{id:'utilitarios',label:'Utilitários',icon:'🚐',enabled:true}]
      },
      menu:[
        {id:'corolla-xei-2024',section:'sedans',name:'Toyota Corolla XEi 2.0',description:'Sedan completo, excelente estado de conservação e revisões em dia.',price:139900,image:'https://images.unsplash.com/photo-1623869675781-80aa31012a5a?auto=format&fit=crop&w=1200&q=85',media:['https://images.unsplash.com/photo-1623869675781-80aa31012a5a?auto=format&fit=crop&w=1200&q=85'],highlight:true,available:true,badges:['destaque'],attributes:[{label:'Ano',value:'2023/2024'},{label:'Km',value:'32.400 km'},{label:'Câmbio',value:'Automático'},{label:'Combustível',value:'Flex'}]},
        {id:'compass-limited-2023',section:'suvs',name:'Jeep Compass Limited',description:'SUV premium, interior refinado, ótimo pacote de tecnologia e segurança.',price:158900,image:'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1200&q=85',highlight:true,available:true,badges:['novidade'],attributes:[{label:'Ano',value:'2022/2023'},{label:'Km',value:'41.800 km'},{label:'Câmbio',value:'Automático'},{label:'Combustível',value:'Flex'}]},
        {id:'nivus-highline-2024',section:'suvs',name:'Volkswagen Nivus Highline',description:'Design esportivo, painel digital e excelente equilíbrio entre desempenho e consumo.',price:129900,image:'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1200&q=85',highlight:true,available:true,badges:[],attributes:[{label:'Ano',value:'2023/2024'},{label:'Km',value:'28.100 km'},{label:'Câmbio',value:'Automático'},{label:'Motor',value:'1.0 TSI'}]},
        {id:'strada-volcano-2024',section:'utilitarios',name:'Fiat Strada Volcano',description:'Versátil para trabalho e lazer, cabine dupla e ótima liquidez de mercado.',price:119900,image:'https://images.unsplash.com/photo-1551830820-330a71b99659?auto=format&fit=crop&w=1200&q=85',highlight:true,available:true,badges:['mais pedido'],attributes:[{label:'Ano',value:'2023/2024'},{label:'Km',value:'19.700 km'},{label:'Câmbio',value:'CVT'},{label:'Combustível',value:'Flex'}]}
      ]
    },
    services:{
      version:VERSION,
      config:{
        businessName:'Barbearia Norte',businessType:'services',businessSubtype:'BARBEARIA',conversionMode:'service_quote',logoImage:'',whatsapp:'5511999999999',timeZone:'America/Sao_Paulo',deliveryFee:0,freeDeliveryThreshold:0,
        accent:'#c0854a',accent2:'#e0b78a',heroKicker:'BARBEARIA · CORTE, BARBA E CUIDADO',heroTitle:'Seu corte,',heroHighlight:'do jeito certo.',heroCopy:'Corte, barba e cuidados masculinos com hora marcada. Profissionais experientes e um ambiente onde você quer voltar.',heroImage:'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=1800&q=88',openingHours:{},
        benefits:[
          {icon:'✂️',label:'Profissionais experientes',text:'Cada corte na mão de quem entende do assunto'},
          {icon:'📅',label:'Hora marcada',text:'Escolha o horário e chegue na hora certa'},
          {icon:'📲',label:'Confirmação no WhatsApp',text:'Agendamento rápido, sem precisar ligar'}
        ],
        sections:[{id:'cortes',label:'Cortes',icon:'✂️',enabled:true},{id:'barba',label:'Barba',icon:'🧔',enabled:true},{id:'combos',label:'Combos',icon:'⭐',enabled:true},{id:'cuidados',label:'Cuidados',icon:'🧴',enabled:true}]
      },
      menu:[
        {id:'corte-combo',section:'combos',name:'Corte + Barba',description:'O combo completo: corte na tesoura ou máquina, finalização e barba feita na navalha com toalha quente.',price:90,priceMode:'fixed',image:'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=1200&q=85',highlight:true,available:true,badges:['mais procurado'],metadata:{duration:'1h','leadMode':'schedule'},attributes:[{label:'Duração','value':'1 hora'},{label:'Inclui','value':'Corte + barba + finalização'}]},
        {id:'corte-fade',section:'cortes',name:'Corte Degradê (Fade)',description:'Degradê trabalhado na máquina e tesoura, com transição limpa e acabamento na navalha.',price:65,priceMode:'fixed',image:'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=1200&q=85',highlight:true,available:true,badges:['destaque'],metadata:{duration:'45 min','leadMode':'schedule'},attributes:[{label:'Duração','value':'45 minutos'},{label:'Estilo','value':'Degradê / fade'}]},
        {id:'corte-masculino',section:'cortes',name:'Corte Masculino',description:'Corte clássico ou moderno conforme o seu estilo, com lavagem e finalização.',price:55,priceMode:'fixed',image:'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1200&q=85',highlight:true,available:true,badges:['agendamento'],metadata:{duration:'40 min','leadMode':'schedule'},attributes:[{label:'Duração','value':'40 minutos'},{label:'Inclui','value':'Lavagem + finalização'}]},
        {id:'barba-completa',section:'barba',name:'Barba Completa',description:'Toalha quente, navalha, alinhamento do desenho e hidratação para acabar.',price:45,priceMode:'fixed',image:'https://images.unsplash.com/photo-1621607512214-68297480165e?auto=format&fit=crop&w=1200&q=85',highlight:true,available:true,badges:[],metadata:{duration:'30 min','leadMode':'schedule'},attributes:[{label:'Duração','value':'30 minutos'},{label:'Ritual','value':'Toalha quente + navalha'}]},
        {id:'acabamento',section:'cuidados',name:'Acabamento / Pezinho',description:'Retoque rápido de contorno e pezinho entre um corte e outro.',price:25,priceMode:'fixed',image:'https://images.unsplash.com/photo-1512690459411-b9245aed614b?auto=format&fit=crop&w=1200&q=85',highlight:false,available:true,badges:[],metadata:{duration:'15 min','leadMode':'schedule'},attributes:[{label:'Duração','value':'15 minutos'},{label:'Ideal para','value':'Manter o corte em dia'}]},
        {id:'pigmentacao-barba',section:'cuidados',name:'Pigmentação de Barba',description:'Preenchimento de falhas e uniformização do tom da barba. Valor conforme a avaliação no dia.',price:0,priceMode:'quote',image:'https://images.unsplash.com/photo-1517832606299-7ae9b720a186?auto=format&fit=crop&w=1200&q=85',highlight:false,available:true,badges:['sob avaliação'],metadata:{duration:'Sob avaliação','leadMode':'quote'},attributes:[{label:'Valor','value':'Após avaliação'},{label:'Indicado para','value':'Falhas e uniformização'}]}
      ]
    }
    ,
    reservas:{
      version:VERSION,
      config:{
        businessName:'Arena Nove',businessType:'services',businessSubtype:'BEACH TENNIS & PADEL',conversionMode:'service_quote',bookingSlots:true,logoImage:'',whatsapp:'5511999999999',timeZone:'America/Sao_Paulo',deliveryFee:0,freeDeliveryThreshold:0,
        accent:'#ff5a3c',accent2:'#ffb59e',heroKicker:'BEACH TENNIS & PADEL · QUADRAS PREMIUM',heroTitle:'Sua quadra,',heroHighlight:'no seu horário.',heroCopy:'Reserve beach tennis ou padel em poucos toques. Escolha o dia, o horário e confirme pelo WhatsApp — sem ligar, sem fila.',heroImage:'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&w=1800&q=88',openingHours:{},
        catalogLabel:'Reservas',catalogKicker:'QUADRAS',highlightsKicker:'MAIS RESERVADOS',highlightsTitle:'O que mais lota a agenda',highlightsCopy:'Horários de pico enchem rápido — reserve com antecedência para garantir a quadra.',
        benefits:[
          {icon:'⏱️',label:'Reserva em 1 minuto',text:'Quadra, dia e horário sem precisar ligar'},
          {icon:'🎾',label:'Quadras oficiais',text:'Areia nivelada e iluminação para jogar de dia ou à noite'},
          {icon:'📲',label:'Confirmação no WhatsApp',text:'Você recebe a confirmação e as instruções na hora'}
        ],
        sections:[{id:'beach',label:'Beach Tennis',icon:'🏖️',enabled:true},{id:'padel',label:'Padel',icon:'🎾',enabled:true},{id:'aulas',label:'Aulas',icon:'🏆',enabled:true},{id:'eventos',label:'Eventos',icon:'📅',enabled:true}]
      },
      menu:[
        {id:'beach-1h',section:'beach',name:'Beach Tennis · 1 hora',description:'Aluguel de quadra de beach tennis por 1 hora. Raquetes e bolinhas disponíveis na recepção.',price:80,priceMode:'fixed',image:'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&w=1200&q=85',highlight:true,available:true,badges:['mais reservado'],metadata:{duration:'1 hora','leadMode':'schedule'},attributes:[{label:'Duração','value':'1 hora'},{label:'Capacidade','value':'2 a 4 jogadores'}]},
        {id:'padel-1h',section:'padel',name:'Padel · 1 hora',description:'Quadra de padel fechada, com paredes de vidro e piso profissional. Raquetes para alugar no local.',price:100,priceMode:'fixed',image:'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=1200&q=85',highlight:true,available:true,badges:['destaque'],metadata:{duration:'1 hora','leadMode':'schedule'},attributes:[{label:'Duração','value':'1 hora'},{label:'Capacidade','value':'2 a 4 jogadores'}]},
        {id:'beach-90',section:'beach',name:'Beach Tennis · 1h30',description:'Sessão estendida de 1h30 para quem quer jogar sem pressa ou treinar em grupo.',price:110,priceMode:'fixed',image:'https://images.unsplash.com/photo-1591491634026-77cd4a2f68b2?auto=format&fit=crop&w=1200&q=85',highlight:true,available:true,badges:[],metadata:{duration:'1h30','leadMode':'schedule'},attributes:[{label:'Duração','value':'1 hora e 30 minutos'},{label:'Ideal para','value':'Treino ou grupo'}]},
        {id:'aula-professor',section:'aulas',name:'Aula com professor · 1 hora',description:'Aula individual ou em dupla com professor da casa. Da iniciação ao aperfeiçoamento.',price:120,priceMode:'from',image:'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=1200&q=85',highlight:false,available:true,badges:['a partir de'],metadata:{duration:'1 hora','leadMode':'schedule'},attributes:[{label:'Duração','value':'1 hora'},{label:'Formato','value':'Individual ou dupla'}]},
        {id:'evento-torneio',section:'eventos',name:'Locação para evento / torneio',description:'Reserva de uma ou mais quadras para confraternização, torneio ou day use. Valor conforme o formato.',price:0,priceMode:'quote',image:'https://images.unsplash.com/photo-1544198365-f5d60b6d8190?auto=format&fit=crop&w=1200&q=85',highlight:false,available:true,badges:['sob avaliação'],metadata:{duration:'Sob avaliação','leadMode':'quote'},attributes:[{label:'Valor','value':'Após avaliação'},{label:'Inclui','value':'Quadras + estrutura'}]}
      ]
    }
  };

  function clone(value){return JSON.parse(JSON.stringify(value));}
  function safeParse(value){try{return JSON.parse(value)}catch{return null}}
  function slugify(value){return String(value||'item').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')||`item-${Date.now()}`;}
  function getBusinessProfile(type){return BUSINESS_PROFILES[type]||BUSINESS_PROFILES.food;}
  function getTemplate(type='food'){return clone(TEMPLATES[type]||TEMPLATES.food);}

  function normalizeSnapshot(input){
    const data=clone(input||{});data.version=VERSION;data.config=data.config||{};data.menu=Array.isArray(data.menu)?data.menu:[];
    const c=data.config;
    c.businessName=c.businessName||c.restaurantName||'Meu negócio';
    c.businessType=BUSINESS_PROFILES[c.businessType]?c.businessType:'food';
    c.businessSubtype=c.businessSubtype||c.restaurantType||getBusinessProfile(c.businessType).label.toUpperCase();
    c.conversionMode=c.conversionMode||getBusinessProfile(c.businessType).conversionMode;
    c.restaurantName=c.businessName;c.restaurantType=c.businessSubtype;
    c.sections=Array.isArray(c.sections)?c.sections:[];
    c.openingHours=c.openingHours||{};
    data.menu=data.menu.map((p,i)=>({available:true,highlight:false,badges:[],attributes:[],media:[],metadata:{},priceMode:'fixed',sortOrder:i,...p,attributes:Array.isArray(p.attributes)?p.attributes:[],media:Array.isArray(p.media)?p.media:[],metadata:p.metadata&&typeof p.metadata==='object'?p.metadata:{},priceMode:['fixed','from','quote'].includes(p.priceMode)?p.priceMode:(Number(p.price)>0?'fixed':'quote')}));
    return data;
  }

  function applyBusinessTemplate(current,type,{preserveIdentity=true}={}){
    const base=getTemplate(type);const currentNorm=normalizeSnapshot(current||{});
    if(preserveIdentity){
      base.config.businessName=currentNorm.config.businessName||base.config.businessName;
      base.config.logoImage=currentNorm.config.logoImage||'';
      base.config.whatsapp=currentNorm.config.whatsapp||base.config.whatsapp;
    }
    return normalizeSnapshot(base);
  }

  const DEFAULT_DATA=getTemplate('food');

  function getData(){
    let saved=safeParse(localStorage.getItem(STORAGE_KEY));
    if(!saved){
      for(const key of LEGACY_KEYS){
        const legacy=safeParse(localStorage.getItem(key));
        if(legacy&&legacy.config&&Array.isArray(legacy.menu)){saved=normalizeSnapshot(legacy);localStorage.setItem(STORAGE_KEY,JSON.stringify(saved));break;}
      }
    }
    if(!saved||!saved.config||!Array.isArray(saved.menu))return normalizeSnapshot(DEFAULT_DATA);
    return normalizeSnapshot(saved);
  }
  function saveData(data){const clean=normalizeSnapshot(data);localStorage.setItem(STORAGE_KEY,JSON.stringify(clean));return clean;}
  function resetData(type='food'){localStorage.removeItem(STORAGE_KEY);const clean=getTemplate(type);localStorage.setItem(STORAGE_KEY,JSON.stringify(clean));return clean;}
  function exportData(){return JSON.stringify(getData(),null,2)}
  function importData(text){const parsed=safeParse(text);if(!parsed||!parsed.config||!Array.isArray(parsed.menu))throw new Error('Arquivo de configuração inválido.');return saveData(parsed);}

  global.MenuData={VERSION,STORAGE_KEY,LEGACY_KEYS,BUSINESS_PROFILES,TEMPLATES,DEFAULT_DATA,getBusinessProfile,getTemplate,applyBusinessTemplate,normalizeSnapshot,getData,saveData,resetData,exportData,importData,clone,slugify};
})(typeof window!=='undefined'?window:globalThis);
