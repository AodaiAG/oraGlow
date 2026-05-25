// SaloX — Arabic RTL version
const { useState, useRef, useEffect } = React;

// ─── DATA ────────────────────────────────────────────────
const SALONS = [
  { id:3, name:'نايل آرت',         category:'أظافر',         catColor:'#E05A6B', rating:4.99, reviews:536, address:'ش. الزهراء 8، باقة الغربية',fullAddress:'شارع الزهراء 8، باقة الغربية، إسرائيل',  distance:'42.7كم', img:'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&q=80&fit=crop' },
  { id:1, name:'صالون ريا',        category:'أظافر وشعر',      catColor:'#16A77E', rating:4.99, reviews:536, address:'ش. الجليل 23، الناصرة',      fullAddress:'شارع الجليل 23، الناصرة، إسرائيل',       distance:'42.7كم', img:'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80&fit=crop' },
  { id:2, name:'بيوتي بار',        category:'أظافر ومكياج',    catColor:'#4A8FE7', rating:4.72, reviews:894, address:'ش. الاستقلال 15، أم الفحم', fullAddress:'شارع الاستقلال 15، أم الفحم، إسرائيل',   distance:'42.7كم', img:'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=600&q=80&fit=crop' },
  { id:4, name:'ستايل كورنر',      category:'أظافر وتصفيف',    catColor:'#9C59D9', rating:4.72, reviews:894, address:'ش. التحرير 45، سخنين',      fullAddress:'شارع التحرير 45، سخنين، إسرائيل',        distance:'42.7كم', img:'https://images.unsplash.com/photo-1560869713-7d0a29430803?w=600&q=80&fit=crop' },
  { id:5, name:'لوتس ويلنس',       category:'أظافر وسبا',      catColor:'#E87D3E', rating:4.80, reviews:90,  address:'ش. المقدسي 12، عكا',      fullAddress:'شارع المقدسي 12 \ عكا، إسرائيل',          distance:'42.7كم', img:'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&q=80&fit=crop' },
  { id:6, name:'جلامور لاند',      category:'أظافر',         catColor:'#E05A6B', rating:4.85, reviews:120, address:'ش. السلام 10، حيفا',    fullAddress:'شارع السلام 10، حيفا، إسرائيل',          distance:'42.7كم', img:'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&q=80&fit=crop' },
];

const SERVICES = [
  { id:1, name:'قص الشعر',           price:150, duration:'٣٠ دقيقة', desc:'قص شعر مخصص مع تصفيف احترافي.' },
  { id:2, name:'تمليس الشعر',        price:800, duration:'٦٠ دقيقة', desc:'تمليس بالكيراتين لشعر ناعم ولامع.' },
  { id:3, name:'صباغة الشعر',        price:350, duration:'٩٠ دقيقة', desc:'علاج تلوين كامل بمنتجات فاخرة.' },
  { id:4, name:'علاج فروة الرأس',    price:220, duration:'٤٥ دقيقة', desc:'ترطيب عميق مع تدليك فروة الرأس.' },
];

const NAIL_SERVICES = [
  { id:1, name:'مانيكير كلاسيكي',     price:80,  duration:'٣٠ دقيقة', desc:'تقليم وتنظيف الأظافر مع طلاء كلاسيكي راقٍ.' },
  { id:2, name:'طلاء أظافر جل',       price:100, duration:'٤٥ دقيقة', desc:'طلاء جل يدوم طويلاً بألوان عصرية جذابة.' },
  { id:3, name:'باديكير سبا كامل',    price:120, duration:'٦٠ دقيقة', desc:'عناية فائقة بالقدمين مع تدليك واسترخاء.' },
  { id:4, name:'تصميم أظافر فني',     price:150, duration:'٦٠ دقيقة', desc:'رسم وتزيين الأظافر بتصاميم هندسية وذهبية.' },
];

const PROFESSIONALS = [
  { id:0, special:true, name:'أي مختصة', role:'لأكثر المواعيد المتاحة ...' },
  { id:1, name:'سارة',  role:'مصففة شعر أولى',  rating:4.99, img:'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&q=80&fit=crop&crop=face' },
  { id:2, name:'نور',   role:'أخصائية مكياج',   rating:4.99, img:'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&q=80&fit=crop&crop=face' },
  { id:3, name:'ريم',   role:'مصففة شعر',        rating:4.99, img:'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&q=80&fit=crop&crop=face' },
  { id:4, name:'لينا',  role:'أخصائية أظافر',   rating:4.99, img:'https://images.unsplash.com/photo-1487412947147-5cebf100d293?w=200&h=200&q=80&fit=crop&crop=face' },
  { id:5, name:'هناء',  role:'مصففة أولى',       rating:4.99, img:'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=200&h=200&q=80&fit=crop&crop=face' },
  { id:6, name:'ريم',   role:'مصففة شعر',        rating:4.99, img:'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&q=80&fit=crop&crop=face' },
  { id:7, name:'هناء',  role:'مصففة أولى',       rating:4.99, img:'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=200&h=200&q=80&fit=crop&crop=face' },
];

const STORIES = [
  { id:1, user:'صالون ريا',      img:'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=200&h=280&q=80&fit=crop', avatar:'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&q=80&fit=crop&crop=face' },
  { id:2, user:'بيوتي بار',     img:'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=200&h=280&q=80&fit=crop', avatar:'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&q=80&fit=crop&crop=face' },
  { id:3, user:'نايل آرت',      img:'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=200&h=280&q=80&fit=crop', avatar:'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=80&h=80&q=80&fit=crop&crop=face' },
  { id:4, user:'ستايل كورنر',   img:'https://images.unsplash.com/photo-1560869713-7d0a29430803?w=200&h=280&q=80&fit=crop', avatar:'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&q=80&fit=crop&crop=face' },
];

const PRODUCTS = [
  { id:1, name:'كريم الأساس',  brand:'ستايل ستوديو', price:25.99, img:'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&q=80&fit=crop' },
  { id:2, name:'كونسيلر',      brand:'ستايل ستوديو', price:25.99, img:'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=300&q=80&fit=crop' },
  { id:3, name:'أحمر شفاه',    brand:'ستايل ستوديو', price:18.99, img:'https://images.unsplash.com/photo-1586495777744-4e6232bf8a5d?w=400&h=300&q=80&fit=crop' },
  { id:4, name:'ظلال العيون',  brand:'ستايل ستوديو', price:32.99, img:'https://images.unsplash.com/photo-1512207736890-6ffed8a84e8d?w=400&h=300&q=80&fit=crop' },
];

const LOOKBOOK_POSTS = [
  { id: 1, salonId: 1, salonName: 'صالون ريا', category: 'قص الشعر', catColor: '#16A77E', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=face', img: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=600&h=600&fit=crop&q=80', likes: 142, desc: 'تسريحة مموجة كلاسيكية بألوان خريفية دافئة ولطيفة 🍁✨' },
  { id: 2, salonId: 2, salonName: 'بيوتي بار', category: 'مكياج', catColor: '#4A8FE7', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face', img: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=600&h=600&fit=crop&q=80', likes: 98, desc: 'إطلالة مكياج عيون ساحرة بلمسات ترابية ناعمة لليلة مميزة 💄💫' },
  { id: 3, salonId: 3, salonName: 'نايل آرت', category: 'أظافر', catColor: '#E05A6B', avatar: 'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=80&h=80&fit=crop&crop=face', img: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&h=600&fit=crop&q=80', likes: 215, desc: 'تصميم مانيكير هندسي ناعم مع تفاصيل ذهبية راقية 💅⭐' },
  { id: 4, salonId: 4, salonName: 'ستايل كورنر', category: 'تصفيف', catColor: '#9C59D9', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=face', img: 'https://images.unsplash.com/photo-1560869713-7d0a29430803?w=600&h=600&fit=crop&q=80', likes: 184, desc: 'تمويج خصلات الشعر بأناقة وحيوية تدوم طويلاً 💇‍♀️🔥' },
  { id: 5, salonId: 5, salonName: 'لوتس ويلنس', category: 'عناية بالبشرة', catColor: '#E87D3E', avatar: 'https://images.unsplash.com/photo-1487412947147-5cebf100d293?w=80&h=80&fit=crop&crop=face', img: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&h=600&fit=crop&q=80', likes: 110, desc: 'جلسة تدليك استرخائية وعناية عميقة بالبشرة لترطيب مضاعف 🧖‍♀️🌿' },
  { id: 6, salonId: 1, salonName: 'صالون ريا', category: 'توهج', catColor: '#16A77E', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=face', img: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=600&h=600&fit=crop&q=80', likes: 167, desc: 'إشراقة طبيعية مذهلة وبشرة متوهجة بعناية فائقة 🌸✨' }
];

const DAYS_AR = ['الإثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت','الأحد'];

// ─── RTL WRAPPER ─────────────────────────────────────────
const RTL = ({ children, style={} }) => (
  <div dir="rtl" style={{
    direction:'rtl',
    fontFamily:"'Cairo', -apple-system, sans-serif",
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
    textRendering: 'optimizeLegibility',
    ...style,
    flex:1,
    display:'flex',
    flexDirection:'column',
    overflow:'hidden'
  }}>
    {children}
  </div>
);

// ─── PHONE FRAME ─────────────────────────────────────────
const PhoneFrame = ({ children }) => (
  <div style={{ width:393, height:852, background:'#0C0C0C', borderRadius:56, position:'relative', flexShrink:0,
    boxShadow:'0 0 0 1.5px #2e2e2e, 0 70px 160px rgba(0,0,0,.7), inset 0 1px 0 rgba(255,255,255,.07)' }}>
    <div style={{ position:'absolute', left:-3.5, top:152, width:3, height:28, background:'#1e1e1e', borderRadius:'2px 0 0 2px' }}/>
    <div style={{ position:'absolute', left:-3.5, top:196, width:3, height:52, background:'#1e1e1e', borderRadius:'2px 0 0 2px' }}/>
    <div style={{ position:'absolute', left:-3.5, top:262, width:3, height:52, background:'#1e1e1e', borderRadius:'2px 0 0 2px' }}/>
    <div style={{ position:'absolute', right:-3.5, top:184, width:3, height:78, background:'#1e1e1e', borderRadius:'0 2px 2px 0' }}/>
    <div style={{ position:'absolute', top:8, left:5, right:5, bottom:5, borderRadius:50, overflow:'hidden', background:'#fff', display:'flex', flexDirection:'column' }}>
      <div style={{ position:'absolute', top:13, left:'50%', transform:'translateX(-50%)', width:128, height:35, background:'#0C0C0C', borderRadius:20, zIndex:200, pointerEvents:'none' }}/>
      {children}
    </div>
  </div>
);

// ─── STATUS BAR ──────────────────────────────────────────
const StatusBar = ({ dark=false }) => {
  const c = dark ? '#fff' : '#1A1A1A';
  return (
    <div dir="ltr" style={{ height:56, display:'flex', alignItems:'flex-end', justifyContent:'space-between', padding:'0 30px 10px', flexShrink:0, position:'relative', zIndex:10 }}>
      <span style={{ fontSize:15, fontWeight:700, color:c, letterSpacing:-0.2 }}>٩:٤١</span>
      <div style={{ display:'flex', gap:7, alignItems:'center' }}>
        <svg width="18" height="12" viewBox="0 0 18 12">
          {[0,1,2,3].map(i=><rect key={i} x={i*4.5} y={12-(i+1)*3} width="3.2" height={(i+1)*3} rx=".8" fill={c} opacity={i<3?1:.35}/>)}
        </svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
          <path d="M1 4.8C3.3 2.3 5.6 1 8 1s4.7 1.3 7 3.8" stroke={c} strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M3.5 7.2C4.9 5.8 6.4 5.2 8 5.2s3.1.6 4.5 2" stroke={c} strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="8" cy="10.5" r="1.3" fill={c}/>
        </svg>
        <svg width="27" height="13" viewBox="0 0 27 13">
          <rect x=".5" y=".5" width="22" height="12" rx="3.5" stroke={c} fill="none"/>
          <rect x="23.5" y="3.8" width="3" height="5.4" rx="1.5" fill={c} opacity=".4"/>
          <rect x="2" y="2" width="16" height="9" rx="2" fill={c}/>
        </svg>
      </div>
    </div>
  );
};

// ─── BOTTOM NAV ──────────────────────────────────────────
const NAV = [
  { id:'home',     label:'الرئيسية', d:'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z' },
  { id:'search',   label:'بحث',      d:'M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z' },
  { id:'store',    label:'سوشال ميديا', d:'M12 2.2c-5.4 0-9.8 4.4-9.8 9.8s4.4 9.8 9.8 9.8 9.8-4.4 9.8-9.8-4.4-9.8-9.8-9.8zm0 17.8c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zm0-11.5c-1.9 0-3.5 1.6-3.5 3.5s1.6 3.5 3.5 3.5 3.5-1.6 3.5-3.5-1.6-3.5-3.5-3.5zm0 5.2c-.9 0-1.7-.8-1.7-1.7s.8-1.7 1.7-1.7 1.7.8 1.7 1.7-.8 1.7-1.7 1.7zm5.3-3.2c-.4 0-.8-.3-.8-.8s.3-.8.8-.8.8.3.8.8-.4.8-.8.8z' },
  { id:'calendar', label:'المواعيد', d:'M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z' },
  { id:'profile',  label:'ملفي',     d:'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z' },
];

const BottomNav = ({ active, onNavigate }) => (
  <div dir="rtl" style={{ height:84, borderTop:'1px solid #EBEBEB', display:'flex', alignItems:'flex-start', paddingTop:9, background:'#fff', flexShrink:0 }}>
    {NAV.map(({ id, label, d }) => {
      const on = active === id;
      return (
        <button key={id} onClick={()=>onNavigate(id)}
          style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:3, background:'none', border:'none', cursor:'pointer', padding:0 }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill={on?'#1A1A1A':'#C0C0C0'}><path d={d}/></svg>
          <span style={{ fontSize:13, fontWeight:on?700:500, color:on?'#1A1A1A':'#C0C0C0', fontFamily:"'El Messiri', 'Amiri', serif" }}>{label}</span>
        </button>
      );
    })}
  </div>
);

const HomeIndicator = () => (
  <div style={{ height:20, display:'flex', alignItems:'center', justifyContent:'center', background:'#fff', flexShrink:0 }}>
    <div style={{ width:130, height:5, borderRadius:3, background:'#1A1A1A' }}/>
  </div>
);

// ─── SPLASH ──────────────────────────────────────────────
const SplashScreen = ({ onContinue }) => (
  <RTL style={{ background:'#FAFAFA', overflow:'hidden' }}>
    <StatusBar/>
    <div style={{ display:'flex', justifyContent:'flex-start', padding:'0 20px 8px' }}>
      <div style={{ width:40, height:40, borderRadius:10, background:'#F0F0F0', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="1.6">
          <circle cx="12" cy="12" r="9"/>
          <path d="M12 3a15 15 0 0 1 4 9 15 15 0 0 1-4 9 15 15 0 0 1-4-9 15 15 0 0 1 4-9z"/>
          <path d="M3 12h18"/>
        </svg>
      </div>
    </div>
    <div style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', padding:'10px 24px 0' }}>
      <svg width="320" height="210" viewBox="0 0 320 210" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="160" cy="195" rx="148" ry="12" fill="#EBEBEB"/>
        {[72,148,224].map((x,i)=>(
          <g key={i}>
            <rect x={x} y="55" width="38" height="78" rx="4" fill="#C8DFF5"/>
            <rect x={x-1} y="54" width="40" height="80" rx="5" fill="none" stroke="#A8C8E8" strokeWidth="2"/>
          </g>
        ))}
        {[90,166,242].map((x,i)=>(
          <g key={i}>
            <ellipse cx={x} cy="186" rx="22" ry="8" fill="#E0DAC8"/>
            <rect x={x-14} y="148" width="28" height="40" rx="5" fill="#EDE5CC"/>
            <rect x={x-16} y="162" width="32" height="20" rx="10" fill="#E5DAB8"/>
          </g>
        ))}
        <circle cx="90" cy="115" r="10" fill="#C49B6A"/>
        <ellipse cx="90" cy="109" rx="10" ry="7" fill="#1A1A1A"/>
        <rect x="82" y="125" width="16" height="25" rx="3" fill="#2D2D2D"/>
        <circle cx="166" cy="115" r="10" fill="#D4A878"/>
        <ellipse cx="166" cy="109" rx="10" ry="8" fill="#8B5E35"/>
        <rect x="158" y="125" width="16" height="25" rx="3" fill="#E87D3E"/>
        <circle cx="190" cy="110" r="9" fill="#FDBCB4"/>
        <ellipse cx="190" cy="105" rx="9" ry="6" fill="#2D2D2D"/>
        <rect x="183" y="119" width="14" height="28" rx="3" fill="#374955"/>
        <line x1="183" y1="132" x2="169" y2="118" stroke="#374955" strokeWidth="5" strokeLinecap="round"/>
        <circle cx="242" cy="115" r="10" fill="#FDBCB4"/>
        <ellipse cx="242" cy="109" rx="10" ry="7" fill="#E8C8A0"/>
        <rect x="234" y="125" width="16" height="25" rx="3" fill="#4A7B9D"/>
        <ellipse cx="130" cy="182" rx="19" ry="14" fill="#F5D06A"/>
        <circle cx="130" cy="170" r="15" fill="#F5D06A"/>
        <ellipse cx="204" cy="182" rx="19" ry="14" fill="#F5D06A"/>
        <circle cx="204" cy="170" r="15" fill="#F5D06A"/>
        <circle cx="36" cy="88" r="15" fill="white" stroke="#DDD" strokeWidth="1.5"/>
        <circle cx="36" cy="88" r="2" fill="#888"/>
        <line x1="36" y1="88" x2="36" y2="77" stroke="#666" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="36" y1="88" x2="44" y2="91" stroke="#666" strokeWidth="1.5" strokeLinecap="round"/>
        <rect x="291" y="155" width="7" height="38" rx="2" fill="#8B6844"/>
        <ellipse cx="294" cy="152" rx="13" ry="17" fill="#5A9A4A"/>
        <ellipse cx="286" cy="158" rx="10" ry="14" fill="#6AAA56"/>
        <ellipse cx="302" cy="155" rx="10" ry="14" fill="#4E8A42"/>
      </svg>
    </div>
    <div style={{ padding:'0 28px 36px' }}>
      <p style={{ textAlign:'center', fontSize:15, color:'#5A5A5A', lineHeight:1.8, marginBottom:26 }}>
        ابدأ الاستكشاف كضيف، أو أنشئ حسابك<br/>للاستمتاع بمزيد من المميزات.
      </p>
      <button onClick={onContinue} style={{ width:'100%', height:54, background:'#1A1A1A', color:'#fff', border:'none', borderRadius:30, fontSize:16, fontWeight:700, cursor:'pointer', marginBottom:12, fontFamily:'inherit' }}>
        إنشاء حساب
      </button>
      <button onClick={onContinue} style={{ width:'100%', height:54, background:'#fff', color:'#1A1A1A', border:'1.5px solid #DCDCDC', borderRadius:30, fontSize:16, fontWeight:600, cursor:'pointer', marginBottom:22, fontFamily:'inherit' }}>
        متابعة كضيف
      </button>
      <p style={{ textAlign:'center', fontSize:14, color:'#9B9B9B' }}>
        هل لديك حساب؟ <span style={{ color:'#1A1A1A', fontWeight:700, cursor:'pointer' }}>تسجيل الدخول</span>
      </p>
    </div>
    <HomeIndicator/>
  </RTL>
);

// ─── FEED ────────────────────────────────────────────────
const FeedScreen = ({ onSalonClick, navTab, onNavigate, scrollY }) => {
  const scrollRef = useRef(null);
  useEffect(() => {
    if (scrollRef.current && typeof scrollY === 'number') {
      scrollRef.current.scrollTop = scrollY;
    }
  }, [scrollY]);

  return (
    <RTL>
      <div style={{ background:'#1A1A1A', flexShrink:0 }}>
        <StatusBar dark/>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 20px 18px' }}>
          <div style={{ display:'flex', alignItems:'center', gap:12 }}>
            <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
              <rect width="22" height="2.5" rx="1.5" fill="white"/>
              <rect y="6.75" width="16" height="2.5" rx="1.5" fill="white"/>
              <rect y="13.5" width="22" height="2.5" rx="1.5" fill="white"/>
            </svg>
            <span style={{ fontSize:26, fontWeight:800, color:'#fff', letterSpacing:0, fontFamily:"'El Messiri', 'Amiri', serif" }}>الإلهام</span>
          </div>
          <div style={{ display:'flex', gap:10 }}>
            {['M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z','M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9 M13.73 21a2 2 0 0 1-3.46 0'].map((d,i)=>(
              <div key={i} style={{ width:40, height:40, borderRadius:'50%', background:'rgba(255,255,255,.12)', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', position:'relative' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8"><path d={d}/></svg>
                {i===1 && <div style={{ position:'absolute', top:8, right:8, width:8, height:8, borderRadius:'50%', background:'#E05A6B', border:'1.5px solid #1A1A1A' }}/>}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div ref={scrollRef} style={{ flex:1, overflowY:'auto', background:'#FAFAFA' }}>
        <style>{`
          .hover-scale-micro {
            transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          }
          .hover-scale-micro:hover {
            transform: scale(1.04);
          }
        `}</style>
        {/* STORIES BLOCK */}
        <div style={{ padding:'16px 20px 18px', borderBottom:'1px solid #F2F2F5', background:'#fff', marginBottom: 14 }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:14 }}>
            <span style={{ fontSize:17, fontWeight:800, color:'#1A1A24', fontFamily:"'El Messiri', 'Cairo', sans-serif" }}>القصص اليومية للصالونات</span>
            <button style={{ display:'flex', alignItems:'center', gap:5, background:'rgba(212,168,53,0.08)', border:'1px solid rgba(212,168,53,0.4)', borderRadius:20, padding:'6px 12px', cursor:'pointer', transition:'all 0.2s' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#D4A835" strokeWidth="3"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              <span style={{ fontSize:11, fontWeight:800, color:'#D4A835', fontFamily:"'Cairo', sans-serif" }}>إضافة قصة</span>
            </button>
          </div>
          <div dir="rtl" style={{ display:'flex', gap:12, paddingBottom:4, marginLeft:-20, overflowX:'auto' }}>
            {STORIES.map(s=>(
              <div key={s.id} onClick={() => {
                const foundSalon = SALONS.find(sal => sal.name === s.user);
                if (foundSalon) onSalonClick(foundSalon);
              }} style={{ flexShrink:0, width:92, cursor:'pointer' }} className="hover-scale-micro">
                <div style={{
                  width:92, height:130, borderRadius:18, overflow:'hidden', position:'relative', marginBottom:6,
                  padding: 2.5,
                  background: 'linear-gradient(135deg, #D4A835 0%, #E05A6B 50%, #9C59D9 100%)',
                  boxShadow: '0 4px 15px rgba(224,90,107,0.12)'
                }}>
                  <div style={{ width:'100%', height:'100%', borderRadius:15, overflow:'hidden', background:'#fff', position:'relative' }}>
                    <img src={s.img} alt={s.user} style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
                    <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,.6))' }}/>
                    <div style={{ position:'absolute', bottom:6, right:6, width:26, height:26, borderRadius:'50%', border:'1.5px solid #fff', overflow:'hidden', boxShadow:'0 2px 6px rgba(0,0,0,0.15)' }}>
                      <img src={s.avatar} style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
                    </div>
                  </div>
                </div>
                <span style={{ fontSize:11, color:'#2D2D3D', fontWeight:700, direction:'rtl', display:'block', textAlign:'center', fontFamily:"'Cairo', sans-serif" }}>{s.user}</span>
              </div>
            ))}
          </div>
        </div>

        {/* SOCIAL LOOKBOOK POSTS FEED */}
        <div style={{ padding:'16px 16px 24px' }}>
          {LOOKBOOK_POSTS.map(post => (
            <div key={post.id} style={{ background: '#fff', borderRadius: 16, marginBottom: 18, border: '1px solid #ECECEC', overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,.025)' }}>
              {/* Post Header */}
              <div dir="rtl" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 38, height: 38, borderRadius: '50%', overflow: 'hidden', border: '1.5px solid #F0F0F0' }}>
                    <img src={post.avatar} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'right' }}>
                    <span style={{ fontSize: 13, fontWeight: 800, color: '#1A1A1A' }}>{post.salonName}</span>
                    <span style={{ fontSize: 11, fontWeight: 600, color: post.catColor }}>{post.category}</span>
                  </div>
                </div>
                <div style={{ cursor: 'pointer' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#9B9B9B"><circle cx="12" cy="12" r="2"/><circle cx="12" cy="5" r="2"/><circle cx="12" cy="19" r="2"/></svg>
                </div>
              </div>

              {/* Post Content (Image) */}
              <div style={{ width: '100%', aspectRatio: '1', background: '#F8F8F8', overflow: 'hidden' }}>
                <img src={post.img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>

              {/* Post Footer */}
              <div dir="rtl" style={{ padding: '12px 16px 14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5, cursor: 'pointer' }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                      <span style={{ fontSize: 12, fontWeight: 700, color: '#1A1A1A' }}>{post.likes}</span>
                    </div>
                    <div style={{ cursor: 'pointer' }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                    </div>
                  </div>
                  <button onClick={() => {
                    const foundSalon = SALONS.find(s => s.id === post.salonId);
                    if (foundSalon) onSalonClick(foundSalon);
                  }} style={{ background: 'linear-gradient(135deg, #1A1A1A, #2D2D2D)', color: '#fff', border: 'none', borderRadius: 16, padding: '6px 14px', fontSize: 11, fontWeight: 700, cursor: 'pointer', fontFamily: "'El Messiri', 'Cairo', sans-serif" }}>
                    عرض الملف
                  </button>
                </div>
                <div style={{ textAlign: 'right', fontSize: 12, lineHeight: 1.6, color: '#4A4A4A' }}>
                  <strong>{post.salonName}</strong> {post.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <BottomNav active={navTab} onNavigate={onNavigate}/>
    </RTL>
  );
};

// ─── STORE SCREEN (OLD HOME DIRECTORY CATALOG) ───────────
const StoreScreen = ({ onSalonClick, navTab, onNavigate, scrollY, initialFilter = 'الكل' }) => {
  const [catFilter, setCatFilter] = useState(initialFilter);
  const scrollRef = useRef(null);

  useEffect(() => {
    setCatFilter(initialFilter);
  }, [initialFilter]);

  useEffect(() => {
    if (scrollRef.current && typeof scrollY === 'number') {
      scrollRef.current.scrollTop = scrollY;
    }
  }, [scrollY]);

  const getCatIcon = (c) => {
    switch (c) {
      case 'الكل':
        return (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7" rx="1.5" />
            <rect x="14" y="3" width="7" height="7" rx="1.5" />
            <rect x="14" y="14" width="7" height="7" rx="1.5" />
            <rect x="3" y="14" width="7" height="7" rx="1.5" />
          </svg>
        );
      case 'شعر':
        return (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="6" cy="6" r="3" />
            <circle cx="6" cy="18" r="3" />
            <line x1="20" y1="4" x2="8.12" y2="15.88" />
            <line x1="14.47" y1="14.48" x2="20" y2="20" />
            <line x1="8.12" y1="8.12" x2="12" y2="12" />
          </svg>
        );
      case 'مكياج':
        return (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="6" y="10" width="12" height="11" rx="2" />
            <path d="M9 10V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v5" />
            <line x1="6" y1="14" x2="18" y2="14" />
          </svg>
        );
      case 'أظافر':
        return (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="7" y="10" width="10" height="11" rx="2" />
            <path d="M10 10V3h4v7" />
            <line x1="7" y1="14" x2="17" y2="14" />
          </svg>
        );
      case 'سبا':
        return (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 2 .4 9.8a7 7 0 0 1-8.4 8.2z" />
            <path d="M19 2L11 10" />
          </svg>
        );
      default:
        return null;
    }
  };

  const getCatGlow = (c) => {
    switch(c) {
      case 'شعر': return 'rgba(22, 167, 126, 0.15)';
      case 'مكياج': return 'rgba(74, 143, 231, 0.15)';
      case 'أظافر': return 'rgba(224, 90, 107, 0.15)';
      case 'سبا': return 'rgba(232, 125, 62, 0.15)';
      default: return 'rgba(26, 26, 26, 0.15)';
    }
  };

  const filteredSalons = catFilter === 'الكل'
    ? SALONS
    : SALONS.filter(s => s.category.includes(catFilter) || (catFilter==='شعر' && s.category==='قص الشعر') || (catFilter==='سبا' && s.category==='عناية بالبشرة'));

  return (
    <RTL>
      <style>{`
        .hover-scale-micro {
          transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .hover-scale-micro:hover {
          transform: scale(1.04);
        }
        .hover-card-elevation {
          transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.25s ease !important;
        }
        .hover-card-elevation:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 36px rgba(0,0,0,0.06) !important;
          border-color: #E2E2E6 !important;
        }
        .hover-card-elevation:hover .zoom-on-hover {
          transform: scale(1.08);
        }
      `}</style>

      <div style={{ background:'linear-gradient(135deg, #111115 0%, #1c1c24 100%)', flexShrink:0, borderBottom:'1px solid rgba(255,255,255,0.05)' }}>
        <StatusBar dark/>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 20px 20px', direction: 'rtl' }}>
          <div style={{ display:'flex', alignItems:'center', gap:12, textAlign:'right' }}>
            {/* Hamburger Menu (3 lines) */}
            <svg width="22" height="16" viewBox="0 0 22 16" fill="none" style={{ cursor:'pointer' }}>
              <rect width="22" height="2.5" rx="1.5" fill="white"/>
              <rect y="6.75" width="16" height="2.5" rx="1.5" fill="white"/>
              <rect y="13.5" width="22" height="2.5" rx="1.5" fill="white"/>
            </svg>
            <span style={{ fontSize:24, fontWeight:800, color:'#fff', fontFamily:"'El Messiri', 'Amiri', serif" }}>دليل الصالونات</span>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            {/* Chat Bubble Icon */}
            <div style={{ width:40, height:40, borderRadius:'50%', background:'rgba(255,255,255,.08)', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
            </div>
            {/* Notification Bell */}
            <div style={{ width:40, height:40, borderRadius:'50%', background:'rgba(255,255,255,.08)', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', position:'relative' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
              <div style={{ position:'absolute', top:10, right:10, width:8, height:8, borderRadius:'50%', background:'#E05A6B', border:'1.5px solid #1c1c24', boxShadow:'0 0 8px #E05A6B' }}/>
            </div>
          </div>
        </div>
      </div>

      <div ref={scrollRef} style={{ flex:1, overflowY:'auto', background:'#FAFAFA' }}>
        {/* STORIES BLOCK */}
        <div style={{ padding:'16px 20px 18px', borderBottom:'1px solid #F2F2F5', background:'#fff', marginBottom: 14 }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:14 }}>
            <span style={{ fontSize:17, fontWeight:800, color:'#1A1A24', fontFamily:"'El Messiri', 'Cairo', sans-serif" }}>القصص اليومية للصالونات</span>
            <button style={{ display:'flex', alignItems:'center', gap:5, background:'rgba(212,168,53,0.08)', border:'1px solid rgba(212,168,53,0.4)', borderRadius:20, padding:'6px 12px', cursor:'pointer', transition:'all 0.2s' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#D4A835" strokeWidth="3"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              <span style={{ fontSize:11, fontWeight:800, color:'#D4A835', fontFamily:"'Cairo', sans-serif" }}>إضافة قصة</span>
            </button>
          </div>
          <div dir="rtl" style={{ display:'flex', gap:12, paddingBottom:4, marginLeft:-20, overflowX:'auto' }}>
            {STORIES.map(s=>(
              <div key={s.id} onClick={() => {
                const foundSalon = SALONS.find(sal => sal.name === s.user);
                if (foundSalon) onSalonClick(foundSalon);
              }} style={{ flexShrink:0, width:92, cursor:'pointer' }} className="hover-scale-micro">
                <div style={{
                  width:92, height:130, borderRadius:18, overflow:'hidden', position:'relative', marginBottom:6,
                  padding: 2.5,
                  background: 'linear-gradient(135deg, #D4A835 0%, #E05A6B 50%, #9C59D9 100%)',
                  boxShadow: '0 4px 15px rgba(224,90,107,0.12)'
                }}>
                  <div style={{ width:'100%', height:'100%', borderRadius:15, overflow:'hidden', background:'#fff', position:'relative' }}>
                    <img src={s.img} alt={s.user} style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
                    <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,.6))' }}/>
                    <div style={{ position:'absolute', bottom:6, right:6, width:26, height:26, borderRadius:'50%', border:'1.5px solid #fff', overflow:'hidden', boxShadow:'0 2px 6px rgba(0,0,0,0.15)' }}>
                      <img src={s.avatar} style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
                    </div>
                  </div>
                </div>
                <span style={{ fontSize:11, color:'#2D2D3D', fontWeight:700, direction:'rtl', display:'block', textAlign:'center', fontFamily:"'Cairo', sans-serif" }}>{s.user}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Category filtering */}
        <div dir="rtl" style={{ padding:'16px 20px 16px', display:'flex', gap:8, overflowX:'auto', background:'#fff', borderBottom:'1px solid #F8F8F8', boxShadow:'0 4px 20px rgba(0,0,0,0.015)', marginBottom: 16 }}>
          {['الكل','شعر','مكياج','أظافر','سبا'].map(c=>{
            const isSelected = catFilter === c;
            return (
              <button key={c} onClick={()=>setCatFilter(c)} style={{
                padding:'8px 18px',
                borderRadius:24,
                flexShrink:0,
                background: isSelected ? '#1A1A1A' : '#FAFAFA',
                color: isSelected ? '#fff' : '#5A5A6A',
                border: isSelected ? 'none' : '1px solid #ECECEF',
                fontSize:13,
                fontWeight:700,
                cursor:'pointer',
                display:'flex',
                alignItems:'center',
                gap:6,
                fontFamily:"'Cairo', sans-serif",
                boxShadow: isSelected ? `0 6px 15px ${getCatGlow(c)}` : 'none',
                transition: 'all 0.2s ease-out'
              }}>
                <span style={{ opacity: isSelected ? 1 : 0.7 }}>{getCatIcon(c)}</span>
                {c}
              </button>
            );
          })}
        </div>

        {/* Directory listings */}
        <div style={{ padding:'0 20px 30px' }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:16 }}>
            <span style={{ fontSize:18, fontWeight:800, color:'#1A1A24', fontFamily:"'El Messiri', 'Cairo', sans-serif" }}>الصالونات المتوفرة</span>
            <span style={{ fontSize:12, color:'#9B9B9B', fontWeight:600 }}>{filteredSalons.length} مكان متوفر</span>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
            {filteredSalons.map(s=>(
              <div key={s.id} onClick={()=>onSalonClick(s)}
                style={{
                  background:'#fff',
                  borderRadius:18,
                  overflow:'hidden',
                  boxShadow:'0 10px 30px rgba(0,0,0,0.025)',
                  border:'1px solid #F0F0F3',
                  cursor:'pointer',
                  position: 'relative'
                }}
                className="hover-card-elevation">
                
                {/* Image Container with Floating Badges */}
                <div style={{ height:124, background:'#F0F0F3', overflow:'hidden', position:'relative' }}>
                  <img src={s.img} alt={s.name} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.3s ease' }} className="zoom-on-hover"/>
                  <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, transparent 40%)' }}/>
                  
                  {/* Floating Category Tag (Right Side) */}
                  <div style={{
                    position:'absolute',
                    top:8,
                    right:8,
                    padding:'4px 10px',
                    borderRadius:10,
                    fontSize:10,
                    fontWeight:800,
                    fontFamily:"'Cairo', sans-serif",
                    color: '#fff',
                    background: s.catColor,
                    boxShadow: `0 4px 10px ${s.catColor}33`,
                  }}>
                    {s.category}
                  </div>
                  
                  {/* Floating Rating Badge (Left Side) */}
                  <div style={{
                    position:'absolute',
                    top:8,
                    left:8,
                    padding:'4px 8px',
                    borderRadius:10,
                    fontSize:10,
                    fontWeight:800,
                    color:'#fff',
                    background:'rgba(26,26,26,0.65)',
                    backdropFilter:'blur(8px)',
                    display:'flex',
                    alignItems:'center',
                    gap:2,
                    direction:'rtl'
                  }}>
                    <span style={{ color:'#F5A623', fontSize:11 }}>★</span>
                    <span>{s.rating}</span>
                  </div>
                </div>

                {/* Details Section */}
                <div style={{ padding:'12px 12px 14px', textAlign:'right' }}>
                  <div style={{ fontSize:14, fontWeight:800, color:'#1A1A1A', marginBottom:6, fontFamily:"'El Messiri', 'Cairo', sans-serif" }}>{s.name}</div>
                  
                  <div style={{ display:'flex', alignItems:'center', gap:4, flexDirection:'row-reverse', color:'#8A8A9A', fontSize:11, fontWeight:500 }}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink:0 }}>
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                      <circle cx="12" cy="9" r="2.5"/>
                    </svg>
                    <span style={{ textOverflow:'ellipsis', overflow:'hidden', whiteSpace:'nowrap' }}>{s.address}</span>
                  </div>
                  
                  <div style={{ display:'flex', alignItems:'center', gap:4, flexDirection:'row-reverse', color:'#D4A835', fontSize:10, fontWeight:700, marginTop:5 }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polygon points="12 2 2 7 12 12 22 7 12 2"/>
                      <polyline points="2 17 12 22 22 17"/>
                      <polyline points="2 12 12 17 22 12"/>
                    </svg>
                    <span>تبعد {s.distance}</span>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      </div>
      <BottomNav active={navTab} onNavigate={onNavigate}/>
    </RTL>
  );
};


// ─── MAP ─────────────────────────────────────────────────
const MapBg = () => (
  <svg width="100%" height="100%" viewBox="0 0 393 520" xmlns="http://www.w3.org/2000/svg" style={{ position:'absolute', top:0, left:0 }}>
    <rect width="393" height="520" fill="#EDEADE"/>
    <polygon fill="#C8D89E" points="0,0 175,0 120,95 35,115 0,80"/>
    <polygon fill="#C8D89E" points="300,430 393,375 393,520 270,520 255,470"/>
    <rect fill="#C8D89E" x="325" y="0" width="68" height="110"/>
    {[[55,52,48,32],[112,48,68,36],[190,52,58,30],[250,46,80,42]].map(([x,y,w,h],i)=><rect key={'b1'+i} fill="#DADDD6" x={x} y={y} width={w} height={h} rx="3"/>)}
    {[[22,150,58,48],[90,146,88,54],[188,143,72,56],[270,138,98,64]].map(([x,y,w,h],i)=><rect key={'b2'+i} fill="#D8DBD3" x={x} y={y} width={w} height={h} rx="3"/>)}
    {[[18,268,72,54],[100,262,96,60],[208,257,82,64],[298,252,88,70]].map(([x,y,w,h],i)=><rect key={'b3'+i} fill="#D8DBD3" x={x} y={y} width={w} height={h} rx="3"/>)}
    {[[12,382,70,54],[92,378,82,58],[182,374,78,54]].map(([x,y,w,h],i)=><rect key={'b4'+i} fill="#D8DBD3" x={x} y={y} width={w} height={h} rx="3"/>)}
    <rect fill="white" x="0" y="116" width="393" height="16"/>
    <rect fill="white" x="0" y="228" width="393" height="12"/>
    <rect fill="white" x="168" y="0" width="14" height="520"/>
    <rect fill="white" x="294" y="0" width="10" height="520"/>
    <rect fill="rgba(255,255,255,.55)" x="0" y="340" width="393" height="8"/>
    <rect fill="rgba(255,255,255,.45)" x="66" y="0" width="8" height="520"/>
    <line x1="-20" y1="196" x2="430" y2="345" stroke="#F5D56A" strokeWidth="7"/>
    <circle cx="84" cy="125" r="13" fill="#4B94D8"/>
    <text x="84" y="130" fill="white" fontSize="11" fontFamily="-apple-system,sans-serif" fontWeight="800" textAnchor="middle">٤</text>
    <rect x="221" y="118" width="18" height="15" rx="3.5" fill="#4B94D8"/>
    <text x="230" y="130" fill="white" fontSize="10" fontFamily="-apple-system,sans-serif" fontWeight="800" textAnchor="middle">م</text>
    {[['الناصرة',46,40],['شفاعمرو',336,38],['كفر ياسيف',155,218],['الطيبة',8,250],['أم الفحم',282,214],['المثلث',195,313],['باقة الغربية',5,445]].map(([t,x,y])=>
      <text key={t} x={x} y={y} fill="#999" fontSize="9" fontFamily="-apple-system,sans-serif" fontWeight="700">{t}</text>)}
    <text x="170" y="112" fill="#999" fontSize="7.5" fontFamily="-apple-system,sans-serif">ش. الجليل</text>
    <text x="186" y="223" fill="#999" fontSize="7.5" fontFamily="-apple-system,sans-serif">ش. الاستقلال</text>
    <text x="50" y="166" fill="#999" fontSize="7" fontFamily="-apple-system,sans-serif">ش. الزهراء</text>
  </svg>
);

// ─── SEARCH ──────────────────────────────────────────────
const SearchScreen = ({ onSalonClick, navTab, onNavigate, initialView='map', initialShowFilters=false, initialFilterCats=[] }) => {
  const [view, setView] = useState(initialView);
  const [pickedSalon, setPickedSalon] = useState(initialView==='card' ? SALONS[0] : null);
  const [showFilters, setShowFilters] = useState(initialShowFilters);
  const [filterCats, setFilterCats] = useState(initialFilterCats);
  const toggleCat = c => setFilterCats(p=>p.includes(c)?p.filter(x=>x!==c):[...p,c]);

  useEffect(() => {
    setFilterCats(initialFilterCats);
  }, [initialFilterCats]);

  useEffect(() => {
    setShowFilters(initialShowFilters);
  }, [initialShowFilters]);

  const activeSalons = filterCats.length > 0
    ? SALONS.filter(s => filterCats.some(c => s.category.includes(c) || (c==='أظافر' && s.category==='أظافر')))
    : SALONS;

  const pins = [
    { ...SALONS[0], px:210, py:235 },
    { ...SALONS[3], px:135, py:395 },
  ];

  return (
    <RTL style={{ background:'#fff', position:'relative' }}>
      <StatusBar/>
      <div style={{ textAlign:'center', paddingBottom:10, flexShrink:0 }}>
        <span style={{ fontSize:20, fontWeight:800, fontFamily: "'El Messiri', sans-serif" }}>البحث عن صالون</span>
      </div>

      <div dir="rtl" style={{ padding:'0 16px 12px', display:'flex', gap:10, flexShrink:0, zIndex:10, position:'relative' }}>
        <div style={{ flex:1, height:48, borderRadius:14, background:'#fff', border:'1px solid #E8E8E8', display:'flex', alignItems:'center', padding:'0 14px', gap:10, boxShadow:'0 2px 10px rgba(0,0,0,.06)' }}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#9B9B9B" strokeWidth="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/></svg>
          <span style={{ fontSize:14, color:'#A0A0A0' }}>
            الخدمات والفلاتر
            {view==='list' && <span style={{ color:'#1A1A1A', fontWeight:500 }}> · موقعي الحالي</span>}
          </span>
        </div>
        <button onClick={()=>setShowFilters(true)} style={{ width:48, height:48, borderRadius:14, background:'#1A1A1A', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/>
            <circle cx="7" cy="6" r="2.2" fill="white" stroke="none"/>
            <circle cx="17" cy="12" r="2.2" fill="white" stroke="none"/>
            <circle cx="12" cy="18" r="2.2" fill="white" stroke="none"/>
          </svg>
        </button>
      </div>

      <div style={{ flex:view==='list'?'0 0 155px':(view==='card'?'0 0 290px':1), position:'relative', overflow:'hidden', transition:'flex 0.3s ease' }}>
        {view==='card' && <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,.36)', zIndex:5 }}/>}
        <MapBg/>
        {pins.map(pin=>(
          <div key={pin.id} onClick={()=>{ setPickedSalon(pin); setView('card'); }}
            style={{ position:'absolute', left:pin.px, top:pin.py, transform:'translate(-50%,-100%)', zIndex:10, cursor:'pointer', display:'flex', flexDirection:'column', alignItems:'center' }}>
            <div style={{ width:50, height:50, borderRadius:'50% 50% 50% 0', transform:'rotate(-45deg)', background:'#fff', border:'3px solid #2BAD7C', boxShadow:'0 4px 14px rgba(0,0,0,.25)', overflow:'hidden' }}>
              <div style={{ transform:'rotate(45deg)', width:'100%', height:'100%', borderRadius:'50%', overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <img src={pin.img} style={{ width:54, height:54, objectFit:'cover' }}/>
              </div>
            </div>
            <div style={{ marginTop:6, background:'white', padding:'3px 9px', borderRadius:8, fontSize:12, fontWeight:700, boxShadow:'0 2px 8px rgba(0,0,0,.12)', whiteSpace:'nowrap' }}>{pin.name}</div>
          </div>
        ))}
      </div>

      {view==='map' && (
        <div style={{ background:'#fff', borderTopLeftRadius:20, borderTopRightRadius:20, boxShadow:'0 -4px 20px rgba(0,0,0,.09)', padding:'10px 16px 0', flexShrink:0 }}>
          <div style={{ width:36, height:4, borderRadius:2, background:'#D8D8D8', margin:'0 auto 12px' }}/>
          <div dir="rtl" style={{ display:'flex', gap:8, paddingBottom:12, overflowX:'auto' }}>
            {[{l:'فلاتر',icon:true},{l:'ترتيب',dd:true},{l:'السعر',dd:true},{l:'خيارات',dd:true},{l:'النوع',dd:true}].map((item,i)=>(
              <button key={i} onClick={()=>{ if(item.icon) setShowFilters(true); }} style={{ padding:'8px 14px', borderRadius:22, border:'1.5px solid #E0E0E0', background:'#fff', fontSize:13, fontWeight:500, cursor:'pointer', whiteSpace:'nowrap', flexShrink:0, display:'flex', alignItems:'center', gap:5, fontFamily:'inherit' }}>
                {item.icon && <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="2"><line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/></svg>}
                {item.l}
                {item.dd && <svg width="12" height="12" viewBox="0 0 24 24" fill="#888"><path d="M7 10l5 5 5-5z"/></svg>}
              </button>
            ))}
          </div>
        </div>
      )}

      {view==='card' && pickedSalon && (
        <div style={{ background:'#fff', borderTopLeftRadius:24, borderTopRightRadius:24, padding:'12px 16px 28px', flexShrink:0, boxShadow:'0 -4px 30px rgba(0,0,0,.12)', zIndex:20 }}>
          <div style={{ width:36, height:4, borderRadius:2, background:'#D8D8D8', margin:'0 auto 14px' }}/>
          <div style={{ height:148, borderRadius:16, overflow:'hidden', marginBottom:14 }}>
            <img src="https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800&q=80&fit=crop" style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
          </div>
          <div style={{ fontSize:17, fontWeight:700, marginBottom:8, textAlign:'right' }}>شارع الجليل 23، الناصرة، إسرائيل</div>
          <div dir="rtl" style={{ display:'flex', alignItems:'center', gap:18, marginBottom:7 }}>
            <div style={{ display:'flex', alignItems:'center', gap:6 }}>
              <div style={{ width:10, height:10, borderRadius:'50%', background:'#22C55E' }}/>
              <span style={{ fontSize:13, fontWeight:600 }}>مفتوح الآن</span>
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:6 }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="1.5"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
              <span style={{ fontSize:13, color:'#666' }}>يغلق ٩:٠٠م</span>
            </div>
          </div>
          <div dir="rtl" style={{ display:'flex', alignItems:'center', gap:4, marginBottom:18 }}>
            <span style={{ color:'#F5A623', fontSize:15 }}>★</span>
            <span style={{ fontSize:14, fontWeight:700 }}>٥.٠٠</span>
            <span style={{ fontSize:13, color:'#9B9B9B' }}>(٤٥)</span>
          </div>
          <div style={{ display:'flex', gap:12 }}>
            <button onClick={()=>setView('map')} style={{ flex:1, height:52, borderRadius:30, border:'1.5px solid #DCDCDC', background:'#fff', fontSize:15, fontWeight:600, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:8, fontFamily:'inherit' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="1.8"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              محادثة
            </button>
            <button onClick={()=>onSalonClick(pickedSalon)} style={{ flex:1.5, height:52, borderRadius:30, background:'#1A1A1A', color:'#fff', border:'none', fontSize:15, fontWeight:700, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:8, fontFamily:'inherit' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
              عرض الملف
            </button>
          </div>
        </div>
      )}

      {view==='list' && (
        <div style={{ flex:1, background:'#fff', borderTopLeftRadius:20, borderTopRightRadius:20, boxShadow:'0 -4px 20px rgba(0,0,0,.08)', overflowY:'auto', padding:'12px 16px 0' }}>
          <div style={{ width:36, height:4, borderRadius:2, background:'#D8D8D8', margin:'0 auto 10px' }}/>
          <div dir="rtl" style={{ display:'flex', gap:8, marginBottom:10, overflowX:'auto' }}>
            {['فلاتر','ترتيب','السعر','خيارات','النوع'].map((l,i)=>(
              <button key={i} onClick={()=>{ if(l==='فلاتر') setShowFilters(true); }} style={{ padding:'7px 13px', borderRadius:22, border:'1.5px solid #E0E0E0', background:'#fff', fontSize:12, fontWeight:500, cursor:'pointer', whiteSpace:'nowrap', flexShrink:0, display:'flex', alignItems:'center', gap:4, fontFamily:'inherit' }}>
                {l}{l!=='فلاتر' && <svg width="11" height="11" viewBox="0 0 24 24" fill="#888"><path d="M7 10l5 5 5-5z"/></svg>}
              </button>
            ))}
          </div>
          <div style={{ fontSize:13, color:'#6B6B6B', marginBottom:8, textAlign:'right' }}>{activeSalons.length} أماكن قريبة</div>
          {activeSalons.map(s=>(
            <div key={s.id} onClick={()=>onSalonClick(s)} dir="rtl" style={{ display:'flex', alignItems:'center', gap:12, padding:'12px 0', borderBottom:'1px solid #F5F5F5', cursor:'pointer' }}>
              <div style={{ width:72, height:72, borderRadius:10, overflow:'hidden', flexShrink:0, background:'#EEE' }}>
                <img src={s.img} style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
              </div>
              <div style={{ flex:1, minWidth:0, textAlign:'right' }}>
                <div style={{ fontSize:15, fontWeight:700, marginBottom:2 }}>{s.name}</div>
                <div style={{ fontSize:12, color:s.catColor, fontWeight:600, marginBottom:4 }}>{s.category}</div>
                <div style={{ fontSize:11, color:'#9B9B9B' }}>★ <span style={{ color:'#F5A623', fontWeight:600 }}>{s.rating}</span> ({s.reviews}) · {s.address} ({s.distance})</div>
              </div>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#C0C0C0" style={{ transform:'scaleX(-1)' }}><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/></svg>
            </div>
          ))}
          <div style={{ height:16 }}/>
        </div>
      )}

      {view==='map' && (
        <button onClick={()=>setView('list')} style={{ position:'absolute', bottom:100, left:'50%', transform:'translateX(-50%)', padding:'8px 18px', borderRadius:22, background:'#1A1A1A', color:'#fff', border:'none', fontSize:13, fontWeight:600, cursor:'pointer', boxShadow:'0 4px 14px rgba(0,0,0,.25)', zIndex:20, fontFamily:'inherit' }}>
          ≡ عرض القائمة
        </button>
      )}
      {view==='list' && (
        <button onClick={()=>setView('map')} style={{ position:'absolute', top:190, left:'50%', transform:'translateX(-50%)', padding:'6px 14px', borderRadius:22, background:'#1A1A1A', color:'#fff', border:'none', fontSize:12, fontWeight:600, cursor:'pointer', boxShadow:'0 4px 14px rgba(0,0,0,.25)', zIndex:20, fontFamily:'inherit' }}>
          ⊙ عرض الخريطة
        </button>
      )}

      <BottomNav active={navTab} onNavigate={onNavigate}/>
      {showFilters && <FiltersModal onClose={()=>setShowFilters(false)} selected={filterCats} onToggle={toggleCat}/>}
    </RTL>
  );
};

// ─── FILTERS MODAL ───────────────────────────────────────
const FILTER_CATS = ['قص الشعر','أظافر','علاج الوجه','مانيكير','باديكير','صباغة','ضفائر','تصفيف','عناية بالبشرة','تصحيح اللون'];

const FiltersModal = ({ onClose, selected, onToggle }) => {
  const getFilterCatIcon = (cat, isSelected) => {
    const strokeColor = isSelected ? '#fff' : '#777';
    switch (cat) {
      case 'قص الشعر':
        return (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: 6 }}>
            <circle cx="6" cy="6" r="3" />
            <circle cx="6" cy="18" r="3" />
            <line x1="20" y1="4" x2="8.12" y2="15.88" />
            <line x1="14.47" y1="14.48" x2="20" y2="20" />
            <line x1="8.12" y1="8.12" x2="12" y2="12" />
          </svg>
        );
      case 'تمليس':
        return (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: 6 }}>
            <path d="M12 3v4M12 17v4M3 12h4M17 12h4" />
            <path d="M18 6l-2 2M6 18l-2 2M6 6l2 2M18 18l-2 2" />
          </svg>
        );
      case 'علاج الوجه':
        return (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: 6 }}>
            <circle cx="12" cy="12" r="3" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            <path d="M2 12a15.3 15.3 0 0 1 10-4 15.3 15.3 0 0 1 10 4 15.3 15.3 0 0 1-10 4 15.3 15.3 0 0 1-10-4z" />
          </svg>
        );
      case 'مانيكير':
        return (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: 6 }}>
            <rect x="7" y="10" width="10" height="11" rx="2" />
            <path d="M10 10V3h4v7" />
            <line x1="7" y1="14" x2="17" y2="14" />
          </svg>
        );
      case 'باديكير':
        return (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: 6 }}>
            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
            <path d="M8 12a4 4 0 0 0 8 0" />
          </svg>
        );
      case 'صباغة':
        return (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: 6 }}>
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 14.7255 3.09032 17.1962 4.85857 19" />
            <circle cx="7.5" cy="10.5" r="1.5" />
            <circle cx="11.5" cy="7.5" r="1.5" />
            <circle cx="16.5" cy="9.5" r="1.5" />
          </svg>
        );
      case 'ضفائر':
        return (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: 6 }}>
            <path d="M4 4c6 0 6 16 12 16" />
            <path d="M12 4c-6 0-6 16 12 16" />
            <path d="M8 4c0 6 8 6 8 12" />
          </svg>
        );
      case 'تصفيف':
        return (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: 6 }}>
            <path d="M12 6h8a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-8" />
            <path d="M12 6c-3 0-5 2-5 5v5a2 2 0 0 0 2 2h3" />
            <path d="M8 16v5a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-5" />
          </svg>
        );
      case 'عناية بالبشرة':
        return (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: 6 }}>
            <rect x="6" y="10" width="12" height="11" rx="2" />
            <path d="M9 10V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v5" />
            <line x1="6" y1="14" x2="18" y2="14" />
          </svg>
        );
      case 'تصحيح اللون':
        return (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: 6 }}>
            <line x1="19" y1="5" x2="5" y2="19" />
            <line x1="19" y1="19" x2="15" y2="15" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,.5)', zIndex:100, display:'flex', alignItems:'flex-end' }}>
      <div dir="rtl" style={{ background:'#fff', borderTopLeftRadius:24, borderTopRightRadius:24, width:'100%', padding:'24px 20px 36px', maxHeight:'90%', overflowY:'auto' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:22 }}>
          <span style={{ fontSize:20, fontWeight:800 }}>الفلاتر</span>
          <button onClick={onClose} style={{ width:32, height:32, borderRadius:'50%', border:'1.5px solid #E0E0E0', background:'#fff', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="2.2"><path d="M18 6 6 18M6 6l12 12"/></svg>
          </button>
        </div>
        {[{icon:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9B9B9B" strokeWidth="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/></svg>,p:'الخدمات والفلاتر'},{icon:<svg width="16" height="16" viewBox="0 0 24 24" fill="#9B9B9B"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>,p:'الموقع الحالي'}].map((row,i)=>(
          <div key={i} style={{ height:48, borderRadius:12, background:'#F5F5F5', display:'flex', alignItems:'center', padding:'0 14px', gap:10, marginBottom:12 }}>
            {row.icon}<span style={{ fontSize:14, color:'#A0A0A0' }}>{row.p}</span>
          </div>
        ))}
        <div style={{ display:'flex', gap:10, marginBottom:20 }}>
          {[{icon:<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#9B9B9B" strokeWidth="1.5"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>,p:'التاريخ'},{icon:<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#9B9B9B" strokeWidth="1.5"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>,p:'الوقت'}].map((item,i)=>(
            <div key={i} style={{ flex:1, height:48, borderRadius:12, background:'#F5F5F5', display:'flex', alignItems:'center', padding:'0 14px', gap:8 }}>
              {item.icon}<span style={{ fontSize:14, color:'#A0A0A0' }}>{item.p}</span>
            </div>
          ))}
        </div>
        <div style={{ fontSize:16, fontWeight:700, marginBottom:12 }}>الفئة</div>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:28 }}>
          {FILTER_CATS.map(cat=>(
            <button key={cat} onClick={()=>onToggle(cat)} style={{ height:48, borderRadius:12, background:selected.includes(cat)?'#1A1A1A':'#F5F5F5', color:selected.includes(cat)?'#fff':'#1A1A1A', border:'none', fontSize:13, fontWeight:600, cursor:'pointer', display:'flex', alignItems:'center', gap:8, padding:'0 14px', fontFamily:'inherit' }}>
              {getFilterCatIcon(cat, selected.includes(cat))}
              {cat}
            </button>
          ))}
        </div>
        <div style={{ display:'flex', gap:12 }}>
          <button onClick={onClose} style={{ flex:1, height:52, borderRadius:30, border:'1.5px solid #DCDCDC', background:'#fff', fontSize:15, fontWeight:600, color:'#9B9B9B', cursor:'pointer', fontFamily:'inherit' }}>إلغاء</button>
          <button onClick={onClose} style={{ flex:1.5, height:52, borderRadius:30, background:'#1A1A1A', color:'#fff', border:'none', fontSize:15, fontWeight:700, cursor:'pointer', fontFamily:'inherit' }}>بحث</button>
        </div>
      </div>
    </div>
  );
};

// ─── SALON PROFILE ───────────────────────────────────────
const HIGHLIGHTS = [
  { label:'أجواء',  img:'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=80&h=80&q=80&fit=crop&crop=face' },
  { label:'عروض',  img:'https://images.unsplash.com/photo-1512207736890-6ffed8a84e8d?w=80&h=80&q=80&fit=crop' },
  { label:'ستايل', img:'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=80&h=80&q=80&fit=crop&crop=face' },
  { label:'توهج',  img:'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=80&h=80&q=80&fit=crop&crop=face' },
  { label:'لمعان', img:'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=80&h=80&q=80&fit=crop' },
  { label:'جديد',  img:'https://images.unsplash.com/photo-1560869713-7d0a29430803?w=80&h=80&q=80&fit=crop' },
];

const SalonProfileScreen = ({ salon, onBack, onBook, initialTab='services' }) => {
  const [tab, setTab] = useState(initialTab);
  const TABS = [['services','خدمات'],['posts','منشورات'],['store','متجر'],['details','تفاصيل']];
  const salonServices = salon?.category === 'أظافر' ? NAIL_SERVICES : SERVICES;

  return (
    <RTL>
      <div style={{ height:205, position:'relative', flexShrink:0 }}>
        <img src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=800&q=80&fit=crop" style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
        <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,.28)' }}/>
        <div style={{ position:'absolute', top:0, left:0, right:0 }}><StatusBar dark/></div>
        <div dir="rtl" style={{ position:'absolute', bottom:0, left:0, right:0, display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 16px 14px' }}>
          <button onClick={onBack} style={{ width:36, height:36, borderRadius:10, background:'rgba(255,255,255,.92)', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="2.5" style={{ transform:'scaleX(-1)' }}><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          </button>
          <span style={{ fontSize:17, fontWeight:700, color:'white' }}>ملف الصالون</span>
          <button style={{ width:36, height:36, borderRadius:10, background:'rgba(255,255,255,.15)', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>
          </button>
        </div>
        <div style={{ position:'absolute', right:16, bottom:58, background:'rgba(0,0,0,.65)', borderRadius:10, padding:'6px 12px', backdropFilter:'blur(4px)', textAlign:'right' }}>
          <div style={{ fontSize:10, color:'rgba(255,255,255,.7)', fontWeight:600 }}>مفتوح اليوم</div>
          <div style={{ fontSize:15, fontWeight:800, color:'white' }}>١٠:٠٠ <span style={{ fontSize:10 }}>ص</span></div>
        </div>
        <div style={{ position:'absolute', left:16, bottom:58, background:'rgba(0,0,0,.65)', borderRadius:10, padding:'6px 12px', backdropFilter:'blur(4px)', textAlign:'center' }}>
          <div style={{ fontSize:10, color:'rgba(255,255,255,.7)', fontWeight:600 }}>متابعون</div>
          <div style={{ fontSize:15, fontWeight:800, color:'white' }}>٢٤١</div>
        </div>
        <div style={{ position:'absolute', bottom:-32, left:'50%', transform:'translateX(-50%)', width:68, height:68, borderRadius:'50%', border:'3px solid white', background:'#1A1A1A', zIndex:10, display:'flex', alignItems:'center', justifyContent:'center' }}>
          <span style={{ fontSize:11, fontWeight:800, color:'white', letterSpacing:-0.3, lineHeight:1.2, textAlign:'center' }}>URBAN</span>
        </div>
      </div>

      <div style={{ flex:1, overflowY:'auto', background:'#fff' }}>
        <div style={{ padding:'44px 20px 16px', textAlign:'center' }}>
          <div style={{ fontSize:20, fontWeight:800, marginBottom:12 }}>صالون أوربان غلو</div>
          <div style={{ display:'flex', justifyContent:'center', gap:12, marginBottom:16 }}>
            {[['#E8F8F0','#22C55E','M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z'],['#EEF4FF','#4A8FE7','M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z'],['#FFF8EC','#F5A623','M12 2a5 5 0 1 1 0 10A5 5 0 0 1 12 2zm0 12c5.33 0 8 2.67 8 4v2H4v-2c0-1.33 2.67-4 8-4z']].map(([bg,clr,d],i)=>(
              <div key={i} style={{ width:44, height:44, borderRadius:'50%', background:bg, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={clr} strokeWidth="1.8"><path d={d}/></svg>
              </div>
            ))}
          </div>
          <div style={{ display:'flex', gap:14, overflowX:'auto', paddingBottom:2, flexDirection:'row-reverse' }}>
            {HIGHLIGHTS.map(h=>(
              <div key={h.label} style={{ flexShrink:0, display:'flex', flexDirection:'column', alignItems:'center', gap:5, cursor:'pointer' }}>
                <div style={{ width:52, height:52, borderRadius:'50%', border:'2.5px solid #E0E0E0', overflow:'hidden' }}>
                  <img src={h.img} style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
                </div>
                <span style={{ fontSize:11, color:'#4A4A4A', fontWeight:500 }}>{h.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div dir="rtl" style={{ display:'flex', borderBottom:'1px solid #EBEBEB', padding:'0 20px' }}>
          {TABS.map(([k,label])=>{
            const on=tab===k;
            return <button key={k} onClick={()=>setTab(k)} style={{ flex:1, height:44, background:'none', border:'none', borderBottom:on?'2.5px solid #1A1A1A':'2.5px solid transparent', fontSize:14, fontWeight:on?700:500, color:on?'#1A1A1A':'#9B9B9B', cursor:'pointer', marginBottom:-1, fontFamily:'inherit' }}>{label}</button>;
          })}
        </div>

        {tab==='services' && (
          <div style={{ padding:'12px 16px 28px' }}>
            {salonServices.map(svc=>(
              <div key={svc.id} dir="rtl" style={{ background:'#fff', borderRadius:14, padding:'16px', marginBottom:10, boxShadow:'0 1px 8px rgba(0,0,0,.06)', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                <div style={{ flex:1, textAlign:'right' }}>
                  <div style={{ fontSize:15, fontWeight:700, marginBottom:3 }}>{svc.name}</div>
                  <div style={{ fontSize:13, marginBottom:3 }}><span style={{ fontWeight:700 }}>₪{svc.price}</span><span style={{ color:'#9B9B9B' }}> | {svc.duration}</span></div>
                  <div style={{ fontSize:12, color:'#9B9B9B' }}>{svc.desc}</div>
                </div>
                <button onClick={()=>onBook(svc)} style={{ width:72, height:34, borderRadius:8, background:'#1A1A1A', color:'#fff', border:'none', fontSize:13, fontWeight:700, cursor:'pointer', flexShrink:0, marginRight:12, fontFamily:'inherit' }}>احجز</button>
              </div>
            ))}
          </div>
        )}

        {tab==='posts' && (
          <div style={{ padding:2 }}>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:2 }}>
              {[
                'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400&h=400&fit=crop&q=80',
                'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=400&fit=crop&q=80',
                'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=400&fit=crop&q=80',
                'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=400&h=400&fit=crop&q=80',
                'https://images.unsplash.com/photo-1560869713-7d0a29430803?w=400&h=400&fit=crop&q=80',
                'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400&h=400&fit=crop&q=80',
                'https://images.unsplash.com/photo-1512207736890-6ffed8a84e8d?w=400&h=400&fit=crop&q=80',
                'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=400&h=400&fit=crop&q=80',
                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&q=80'
              ].map((img,i)=>(
                <div key={i} style={{ aspectRatio:'1', overflow:'hidden', background:'#EEE', cursor:'pointer' }}>
                  <img src={img} style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab==='store' && (
          <div style={{ padding:'16px' }}>
            <div dir="rtl" style={{ display:'flex', gap:16, marginBottom:20, overflowX:'auto' }}>
              {[['مكياج','https://images.unsplash.com/photo-1512207736890-6ffed8a84e8d?w=80&q=80&fit=crop'],['عناية','https://images.unsplash.com/photo-1556228720-195a672e8a03?w=80&q=80&fit=crop'],['شعر','https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=80&q=80&fit=crop&crop=face'],['جسم','https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=80&q=80&fit=crop'],['إكسسوار','https://images.unsplash.com/photo-1590156546746-c588a113f9f2?w=80&q=80&fit=crop']].map(([label,img])=>(
                <div key={label} style={{ flexShrink:0, display:'flex', flexDirection:'column', alignItems:'center', gap:5, cursor:'pointer' }}>
                  <div style={{ width:52, height:52, borderRadius:'50%', overflow:'hidden', background:'#F5E8D0' }}>
                    <img src={img} style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
                  </div>
                  <span style={{ fontSize:10, color:'#4A4A4A', fontWeight:500, textAlign:'center' }}>{label}</span>
                </div>
              ))}
            </div>
            <div style={{ fontSize:16, fontWeight:800, fontStyle:'italic', marginBottom:14, textAlign:'right' }}>المنتجات</div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
              {PRODUCTS.map(p=>(
                <div key={p.id} style={{ background:'#fff', borderRadius:12, overflow:'hidden', boxShadow:'0 2px 10px rgba(0,0,0,.07)', cursor:'pointer' }}>
                  <div style={{ height:120, background:'#F0F0F0', overflow:'hidden' }}>
                    <img src={p.img} style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
                  </div>
                  <div style={{ padding:'10px 10px 12px', textAlign:'right' }}>
                    <div style={{ fontSize:13, fontWeight:700, marginBottom:2 }}>{p.name}</div>
                    <div style={{ fontSize:11, color:'#9B9B9B', marginBottom:6 }}>{p.brand}</div>
                    <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                      <div style={{ width:26, height:26, borderRadius:'50%', background:'#1A1A1A', display:'flex', alignItems:'center', justifyContent:'center' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="white" style={{ transform:'scaleX(-1)' }}><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/></svg>
                      </div>
                      <span style={{ fontSize:14, fontWeight:700, color:'#4A8FE7' }}>₪{p.price}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab==='details' && (
          <div style={{ padding:'16px 16px 32px', textAlign:'right' }}>
            <div style={{ fontSize:15, fontWeight:700, marginBottom:12 }}>شارع الجليل 23، الناصرة، إسرائيل</div>
            <div style={{ height:160, borderRadius:14, overflow:'hidden', background:'#E8EDD4', marginBottom:20, position:'relative' }}>
              <svg width="100%" height="160" viewBox="0 0 361 160">
                <rect width="361" height="160" fill="#E8EDD4"/>
                {[[18,8,80,50],[116,12,105,46],[235,8,116,54]].map(([x,y,w,h],i)=><rect key={'dm'+i} fill="#DADDD6" x={x} y={y} width={w} height={h} rx="3"/>)}
                {[[10,86,92,52],[112,82,124,56],[248,85,105,52]].map(([x,y,w,h],i)=><rect key={'db'+i} fill="#DADDD6" x={x} y={y} width={w} height={h} rx="3"/>)}
                <rect fill="white" x="0" y="64" width="361" height="12"/>
                <rect fill="white" x="102" y="0" width="10" height="160"/>
                <rect fill="white" x="238" y="0" width="8" height="160"/>
                <path d="M0,135 Q60,125 120,135 Q180,145 240,132 Q300,120 361,130" fill="none" stroke="#A8CCDD" strokeWidth="18"/>
              </svg>
              <div style={{ position:'absolute', top:'48%', left:'50%', transform:'translate(-50%,-100%)' }}>
                <svg width="32" height="40" viewBox="0 0 32 40"><path d="M16 0C8.27 0 2 6.27 2 14c0 10.5 14 26 14 26s14-15.5 14-26C30 6.27 23.73 0 16 0z" fill="#1A1A1A"/><circle cx="16" cy="14" r="6" fill="white"/></svg>
              </div>
            </div>
            <div style={{ fontSize:16, fontWeight:700, marginBottom:12 }}>التواصل</div>
            <div style={{ background:'#F8F8F8', borderRadius:12, padding:'14px 16px', display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:20 }}>
              <button style={{ padding:'6px 14px', borderRadius:8, border:'1.5px solid #E0E0E0', background:'#fff', fontSize:13, fontWeight:600, cursor:'pointer', color:'#9B9B9B', fontFamily:'inherit' }}>اتصال</button>
              <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                <span style={{ fontSize:14, direction:'ltr' }}>+972 50-585-3344</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9B9B9B" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              </div>
            </div>
            <div style={{ fontSize:16, fontWeight:700, marginBottom:12 }}>ساعات العمل</div>
            <div style={{ background:'#F8F8F8', borderRadius:12, padding:'4px 16px', marginBottom:20 }}>
              {DAYS_AR.map((day,i)=>(
                <div key={day} dir="rtl" style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'9px 0', borderBottom:i<DAYS_AR.length-1?'1px solid #EBEBEB':'none' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                    <div style={{ width:8, height:8, borderRadius:'50%', background:'#22C55E' }}/>
                    <span style={{ fontSize:14, fontWeight:i===0?700:500 }}>{day}</span>
                  </div>
                  <span style={{ fontSize:14, fontWeight:500, direction:'ltr' }}>١٠:٠٠ – ٢٢:٠٠</span>
                </div>
              ))}
            </div>
            <div dir="rtl" style={{ display:'flex', alignItems:'center', gap:5 }}>
              {[1,2,3,4,5].map(s=><span key={s} style={{ color:'#F5A623', fontSize:22 }}>★</span>)}
              <span style={{ fontSize:15, fontWeight:700, marginRight:4 }}>٥.٠٠</span>
              <span style={{ fontSize:13, color:'#9B9B9B' }}>(٤٥)</span>
            </div>
          </div>
        )}
      </div>
    </RTL>
  );
};

// ─── SELECT PROFESSIONAL ─────────────────────────────────
const SelectProfessionalScreen = ({ onBack, onSelect }) => (
  <RTL style={{ background:'#F8F8F8' }}>
    <StatusBar/>
    <div dir="rtl" style={{ display:'flex', alignItems:'center', padding:'0 20px 16px', gap:16 }}>
      <button onClick={onBack} style={{ width:36, height:36, borderRadius:10, background:'#F0F0F0', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="2.5" style={{ transform:'scaleX(-1)' }}><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
      </button>
      <span style={{ fontSize:19, fontWeight:800, fontFamily: "'El Messiri', sans-serif" }}>اختر خبيرة التجميل</span>
    </div>
    <div style={{ flex:1, overflowY:'auto', padding:'0 16px 24px' }}>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
        {PROFESSIONALS.map(p=>(
          <div key={p.id} onClick={()=>onSelect(p)} style={{ background:'#fff', borderRadius:16, padding:'22px 16px 18px', display:'flex', flexDirection:'column', alignItems:'center', gap:8, cursor:'pointer', boxShadow:'0 2px 10px rgba(0,0,0,.06)' }}>
            {p.special
              ? <div style={{ width:60, height:60, borderRadius:'50%', background:'#F2F2F2', display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="#9B9B9B"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
                </div>
              : <div style={{ width:60, height:60, borderRadius:'50%', overflow:'hidden', border:'2.5px solid #F0F0F0' }}>
                  <img src={p.img} style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
                </div>
            }
            <span style={{ fontSize:14, fontWeight:700, textAlign:'center' }}>{p.name}</span>
            <span style={{ fontSize:12, color:'#9B9B9B', textAlign:'center', lineHeight:1.35 }}>{p.role}</span>
            {!p.special && (
              <div style={{ display:'flex', alignItems:'center', gap:4 }}>
                <span style={{ color:'#F5A623', fontSize:13 }}>★</span>
                <span style={{ fontSize:13, fontWeight:700 }}>{p.rating}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  </RTL>
);

// ─── BOOKING CONFIRMED ───────────────────────────────────
const BookingConfirmedScreen = ({ professional, salon, onDone }) => (
  <RTL>
    <StatusBar/>
    <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'20px 32px' }}>
      <div style={{ width:88, height:88, borderRadius:'50%', background:'#E8F8F0', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:24 }}>
        <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2.5"><path d="M20 6 9 17l-5-5"/></svg>
      </div>
      <div style={{ fontSize:22, fontWeight:800, marginBottom:10, textAlign:'center', fontFamily: "'El Messiri', sans-serif" }}>تم الحجز بنجاح!</div>
      <div style={{ fontSize:14, color:'#6B6B6B', textAlign:'center', lineHeight:1.8, marginBottom:6 }}>
        تم حجز موعدك مع <strong>{professional?.name || 'المختص'}</strong><br/>بنجاح.
      </div>
      {salon && <div style={{ fontSize:13, color:'#9B9B9B', marginBottom:28, textAlign:'center' }}>{salon.name} · {salon.fullAddress}</div>}
      <div dir="rtl" style={{ width:'100%', background:'#F8F8F8', borderRadius:16, padding:'16px', marginBottom:28 }}>
        {[['التاريخ','اليوم، ٢٢ مايو'],['الوقت','٢:٠٠ م'],['المختص',professional?.name||'أي مختص']].map(([k,v])=>(
          <div key={k} style={{ display:'flex', justifyContent:'space-between', marginBottom:10, textAlign:'right' }}>
            <span style={{ fontSize:13, color:'#9B9B9B' }}>{k}</span>
            <span style={{ fontSize:13, fontWeight:700 }}>{v}</span>
          </div>
        ))}
      </div>
      <button onClick={onDone} style={{ width:'100%', height:54, borderRadius:30, background:'#1A1A1A', color:'#fff', border:'none', fontSize:16, fontWeight:700, cursor:'pointer', marginBottom:12, fontFamily:'inherit' }}>عرض الحجز</button>
      <button onClick={onDone} style={{ width:'100%', height:54, borderRadius:30, background:'#fff', color:'#1A1A1A', border:'1.5px solid #DCDCDC', fontSize:15, fontWeight:600, cursor:'pointer', fontFamily:'inherit' }}>العودة للرئيسية</button>
    </div>
    <HomeIndicator/>
  </RTL>
);

// ─── EXPORTS ─────────────────────────────────────────────
Object.assign(window, {
  PhoneFrame, StatusBar, BottomNav, HomeIndicator,
  SplashScreen, FeedScreen, SearchScreen, FiltersModal,
  SalonProfileScreen, SelectProfessionalScreen, BookingConfirmedScreen,
  SALONS,
});
