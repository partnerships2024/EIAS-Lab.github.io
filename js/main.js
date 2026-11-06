(function(){
const pages=[["index.html","Home"],["about.html","About"],["research.html","Research"],["architecture.html","Architecture"],["flagship-project.html","Flagship"],["roadmap.html","Roadmap"],["collaboration.html","Collaborate"]];
const cur=location.pathname.split("/").pop()||"index.html";
const h=document.getElementById("site-header");
if(h){h.outerHTML=`<header class="site"><div class="wrap"><a class="brand" href="index.html"><img src="assets/EIAS-logo.svg" alt="">EIAS Lab</a><button class="menu" aria-expanded="false" aria-controls="nv">Menu</button><nav aria-label="Main"><ul id="nv">${pages.map(p=>`<li><a href="${p[0]}"${p[0]===cur?' aria-current="page"':''}>${p[1]}</a></li>`).join("")}</ul></nav></div></header>`;
const b=document.querySelector(".menu"),u=document.getElementById("nv");b.onclick=()=>{const o=u.classList.toggle("open");b.setAttribute("aria-expanded",o)}}
const f=document.getElementById("site-footer");
if(f)f.outerHTML=`<footer class="site"><div class="wrap"><div><strong style="color:#fff">Environmental Intelligence &amp; Autonomous Systems Lab</strong><br>Intelligent systems · Sustainable solutions · Global impact<br>© ${new Date().getFullYear()} EIAS Lab</div><div>A lab of the <a href="#">International Council for Research &amp; Innovation in Sci, Tech &amp; Engg (ICRI-STE)</a></div><img src="assets/ICRI-STE-Logo.png" alt="ICRI-STE logo" onerror="this.style.display='none'"></div></footer>`;

/* data-driven sections */
const R={
domains:d=>d.domains.map(x=>`<article class="card" style="--c:${x.color}"><h3>${x.name}</h3><p>${x.summary}</p><ul>${x.items.map(i=>`<li>${i}</li>`).join("")}</ul></article>`).join(""),
objectives:d=>d.objectives.map(x=>`<article class="card"><h3>${x.t}</h3><p>${x.d}</p></article>`).join(""),
layers:d=>d.layers.map(x=>`<div class="layer"><b>${x.n}</b><div><h3>${x.name}</h3><p>${x.d}</p></div></div>`).join(""),
stages:d=>`<ol class="tl">${d.stages.map(x=>`<li><span class="m">${x.months}</span><h3>${x.name}</h3><p>${x.d}</p></li>`).join("")}</ol>`,
wps:d=>`<div class="tw"><table><thead><tr><th>Work package</th><th>Focus</th><th>Main output</th></tr></thead><tbody>${d.wps.map(x=>`<tr><td>${x.id}</td><td>${x.focus}</td><td>${x.out}</td></tr>`).join("")}</tbody></table></div>`,
risks:d=>`<div class="tw"><table><thead><tr><th>Risk</th><th>What could happen</th><th>Mitigation</th></tr></thead><tbody>${d.risks.map(x=>`<tr><td><b>${x.r}</b></td><td>${x.w}</td><td>${x.m}</td></tr>`).join("")}</tbody></table></div>`,
metrics:d=>Object.entries(d.metrics).map(([k,v])=>`<article class="card"><h3>${k}</h3><ul>${v.map(i=>`<li>${i}</li>`).join("")}</ul></article>`).join("")};
const t=[...document.querySelectorAll("[data-render]")];
if(t.length)fetch("data/eias-research-data.json").then(r=>r.json()).then(d=>t.forEach(e=>e.innerHTML=R[e.dataset.render](d))).catch(()=>t.forEach(e=>e.innerHTML="<p>Content could not load. Serve the site over http (GitHub Pages or <code>python -m http.server</code>).</p>"));

/* contact form -> mailto */
const cf=document.getElementById("contact");
if(cf)cf.onsubmit=e=>{e.preventDefault();const v=n=>cf.elements[n].value;location.href=`mailto:${cf.dataset.to}?subject=${encodeURIComponent("EIAS Lab enquiry: "+v("type"))}&body=${encodeURIComponent(v("msg")+"\n\n"+v("name")+" ("+v("org")+")")}`};

/* hero swarm: UAVs wander; when a hazard flares, the nearest three converge on it */
const c=document.getElementById("swarm");if(!c)return;
const x=c.getContext("2d"),still=matchMedia("(prefers-reduced-motion:reduce)").matches;let W,H,D=[],hz=null,T=0;
function size(){const r=devicePixelRatio||1;W=c.clientWidth;H=c.clientHeight;c.width=W*r;c.height=H*r;x.setTransform(r,0,0,r,0,0)}
size();addEventListener("resize",size);
for(let i=0;i<16;i++)D.push({x:Math.random()*W,y:Math.random()*H,a:Math.random()*6.28,s:.5+Math.random()*.4,k:0});
function flare(){hz={x:W*(.45+Math.random()*.5),y:H*(.2+Math.random()*.6),t:0};D.forEach(d=>d.k=0);[...D].sort((a,b)=>Math.hypot(a.x-hz.x,a.y-hz.y)-Math.hypot(b.x-hz.x,b.y-hz.y)).slice(0,3).forEach(d=>d.k=1)}
function frame(){T++;x.clearRect(0,0,W,H);
x.strokeStyle="rgba(95,179,107,.10)";x.lineWidth=1;for(let k=1;k<8;k++){x.beginPath();for(let i=0;i<=W;i+=12){const y=H*k/8+Math.sin(i/90+k)*22+Math.cos(i/47+k*2)*10;i?x.lineTo(i,y):x.moveTo(i,y)}x.stroke()}
if(!hz||hz.t>420)flare();hz.t++;
const p=(hz.t%90)/90;x.strokeStyle=`rgba(232,105,43,${1-p})`;x.lineWidth=2;x.beginPath();x.arc(hz.x,hz.y,6+p*50,0,6.28);x.stroke();x.fillStyle="#E8692B";x.beginPath();x.arc(hz.x,hz.y,5,0,6.28);x.fill();
D.forEach(d=>{if(d.k){const a=Math.atan2(hz.y-d.y,hz.x-d.x);let df=a-d.a;df=Math.atan2(Math.sin(df),Math.cos(df));d.a+=df*.04;d.x+=Math.cos(d.a)*d.s*1.5;d.y+=Math.sin(d.a)*d.s*1.5;if(Math.hypot(hz.x-d.x,hz.y-d.y)<70)d.a+=.05}else{d.a+=(Math.random()-.5)*.12;d.x+=Math.cos(d.a)*d.s;d.y+=Math.sin(d.a)*d.s}
if(d.x<0)d.x=W;if(d.x>W)d.x=0;if(d.y<0)d.y=H;if(d.y>H)d.y=0});
for(let i=0;i<D.length;i++)for(let j=i+1;j<D.length;j++){const q=Math.hypot(D[i].x-D[j].x,D[i].y-D[j].y);if(q<150){x.strokeStyle=`rgba(42,167,201,${.45*(1-q/150)})`;x.lineWidth=1;x.beginPath();x.moveTo(D[i].x,D[i].y);x.lineTo(D[j].x,D[j].y);x.stroke()}}
D.forEach(d=>{x.fillStyle=d.k?"#E8692B":"#5FB36B";x.beginPath();x.arc(d.x,d.y,d.k?4.5:3.5,0,6.28);x.fill();x.strokeStyle="rgba(255,255,255,.35)";x.beginPath();x.arc(d.x,d.y,8,0,6.28);x.stroke()});
if(!still)requestAnimationFrame(frame)}
frame();
})();
