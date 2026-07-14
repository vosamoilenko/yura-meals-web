if(typeof window<"u"&&window.location.search.includes("debug")){let s=function(d){if(c)return;c=!0,d!==void 0&&(r=d,localStorage.setItem("debug-viewport-index",String(d)));const o=f[r],{width:e,height:i}=o;a.style.width=e+"px",a.style.height=i+"px",t.style.width=e+"px",t.style.height=i+"px";const m=window.innerWidth*.85,l=(window.innerHeight-60)*.85,n=Math.min(m/e,l/i);a.style.transform=`scale(${n})`,y(e,i,n),c=!1},y=function(d,o,e){const i=Math.round(d*e),m=Math.round(o*e);let l="?",n="?",u=!1;try{t.contentWindow&&(l=t.contentWindow.innerWidth,n=t.contentWindow.innerHeight,u=l===d&&n===o)}catch{}const w=u?"match":"mismatch";h.innerHTML=`
        <div><span class="label">Target:</span> <span class="value">${d} × ${o}</span></div>
        <div><span class="label">iframe:</span> <span class="${w}">${l} × ${n}</span> ${u?"✓":"✗"}</div>
        <div><span class="label">Display:</span> <span class="value">${i} × ${m}</span> <span class="label">(${Math.round(e*100)}%)</span></div>
      `};const f=[{width:360,height:800,type:"mobile",label:"Mobile 360×800"},{width:390,height:844,type:"mobile",label:"Mobile 390×844"},{width:480,height:854,type:"mobile",label:"Mobile 480×854"},{width:700,height:1024,type:"tablet",label:"Tablet 700×1024"},{width:800,height:1180,type:"tablet",label:"Tablet 800×1180"},{width:860,height:900,type:"desktop",label:"Desktop 860×900"},{width:1024,height:768,type:"desktop",label:"Desktop 1024×768"},{width:1280,height:800,type:"desktop",label:"Desktop 1280×800"},{width:1440,height:900,type:"desktop",label:"Desktop 1440×900"},{width:1920,height:1080,type:"desktop",label:"Desktop 1920×1080"}];let r=7;const v=localStorage.getItem("debug-viewport-index");v!==null&&(r=parseInt(v));let c=!1;const b=document.createElement("style");b.id="debug-mode-styles",b.textContent=`
      body > *:not(#debug-overlay):not(#debug-dim-display):not(#debug-preset-bar):not(script):not(style) {
        display: none !important;
      }
      html, body {
        margin: 0 !important;
        padding: 0 !important;
        overflow: hidden !important;
        background: #1a1a1a !important;
        font-family: system-ui, sans-serif !important;
      }
      #debug-overlay {
        position: fixed;
        inset: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #1a1a1a;
        z-index: 999999;
        pointer-events: none;
      }
      #debug-viewport {
        position: relative;
        flex: none;
        background: #fff;
        transform-origin: center center;
        overflow: visible;
        pointer-events: auto;
        box-shadow: 0 0 0 1px rgba(255,255,255,0.1);
      }
      #debug-frame {
        position: absolute;
        top: 0; left: 0;
        border: none;
        display: block;
        pointer-events: auto;
      }
      .dg { position: absolute; z-index: 5; pointer-events: none; }
      .dg.v { width: 0; border-left: 1px dotted rgba(255,100,100,0.5); top: -300%; height: 700%; }
      .dg.h { height: 0; border-top: 1px dotted rgba(255,100,100,0.5); left: -300%; width: 700%; }
      .dg.left { left: 0; }
      .dg.right { left: 100%; }
      .dg.top { top: 0; }
      .dg.bottom { top: 100%; }
      .dg.g20 { left: 20%; border-left-color: rgba(100,100,255,0.4); }
      .dg.g80 { left: 80%; border-left-color: rgba(100,100,255,0.4); }

      #debug-preset-bar {
        position: fixed;
        top: 10px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        gap: 4px;
        z-index: 1000001;
        flex-wrap: wrap;
        justify-content: center;
        max-width: 90vw;
      }
      .debug-preset-btn {
        background: rgba(255,255,255,0.08);
        color: #aaa;
        border: 1px solid rgba(255,255,255,0.12);
        border-radius: 4px;
        padding: 4px 8px;
        font-size: 11px;
        font-family: monospace;
        cursor: pointer;
        transition: all 0.15s;
      }
      .debug-preset-btn:hover { background: rgba(255,255,255,0.15); color: #fff; }
      .debug-preset-btn.active {
        background: rgba(74,222,128,0.15);
        color: #4ade80;
        border-color: rgba(74,222,128,0.4);
      }

      #debug-dim-display {
        position: fixed;
        bottom: 10px;
        left: 10px;
        background: rgba(0,0,0,0.85);
        color: #fff;
        font-size: 11px;
        font-family: monospace;
        padding: 8px 12px;
        border-radius: 6px;
        z-index: 1000001;
        line-height: 1.6;
      }
      #debug-dim-display .label { color: #888; }
      #debug-dim-display .value { color: #4ade80; font-weight: bold; }
      #debug-dim-display .match { color: #4ade80; }
      #debug-dim-display .mismatch { color: #f87171; }
    `,document.head.appendChild(b);const g=document.createElement("div");g.id="debug-overlay";const a=document.createElement("div");a.id="debug-viewport",a.innerHTML=`
      <div class="dg v left"></div>
      <div class="dg v right"></div>
      <div class="dg h top"></div>
      <div class="dg h bottom"></div>
      <div class="dg v g20"></div>
      <div class="dg v g80"></div>
    `;const t=document.createElement("iframe");t.id="debug-frame",t.src=window.location.pathname,a.appendChild(t),g.appendChild(a);const p=document.createElement("div");p.id="debug-preset-bar",f.forEach((d,o)=>{const e=document.createElement("button");e.className="debug-preset-btn"+(o===r?" active":""),e.textContent=d.label,e.addEventListener("click",()=>{p.querySelectorAll(".debug-preset-btn").forEach(i=>i.classList.remove("active")),e.classList.add("active"),s(o)}),p.appendChild(e)});const h=document.createElement("div");h.id="debug-dim-display",document.body.appendChild(g),document.body.appendChild(p),document.body.appendChild(h),t.addEventListener("load",()=>s()),window.addEventListener("resize",()=>s()),s()}
