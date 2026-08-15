
/* reveal on scroll */
(function(){ var io=new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } }); },{threshold:0.12, rootMargin:'0px 0px -8% 0px'});
  document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); }); })();

/* faq accordion: toggle a class, browser interpolates grid-template-rows */
(function(){
  document.querySelectorAll('.faq .q button').forEach(function(btn){
    btn.addEventListener('click', function(){
      var qa=btn.closest('.qa'); var open=qa.classList.toggle('open');
      btn.setAttribute('aria-expanded', open?'true':'false');
    });
  });
})();

/* hero heat field: cursor heat + hold-to-charge detonation + pixel controls */
(function(){
  var cv=document.getElementById('strip'); if(!cv) return; var ctx=cv.getContext('2d');
  var DPR=Math.min(devicePixelRatio||1,2), W=0,H=0, cell=9, BRUSH=10, cols=0, rows=0, heat=null, t=0, SEED=Math.random()*1000;
  var waves=[], mx=-1,my=-1,hov=false, charging=false, chT0=0, chx=0, chy=0;
  var BANDS=[[0.30,'#1c2541'],[0.46,'#3b5bd9'],[0.62,'#f5c518'],[0.78,'#e0492a']];
  function size(){ var r=cv.getBoundingClientRect(); W=Math.max(1,r.width); H=Math.max(1,r.height); cv.width=Math.round(W*DPR); cv.height=Math.round(H*DPR); ctx.setTransform(DPR,0,0,DPR,0,0); cols=Math.ceil(W/cell)+1; rows=Math.ceil(H/cell)+1; heat=new Float32Array(cols*rows); }
  size(); addEventListener('resize',size);
  function hsh(c,r){ var n=Math.sin(c*127.1+r*311.7+SEED*0.13)*43758.5453; return n-Math.floor(n); }
  function base(nx,ny,tt){ var s=SEED; var v=Math.sin(nx*5.6+s*1.3+tt*0.3)*Math.cos(ny*4.7-s*0.7+tt*0.22)+Math.sin((nx*1.4+ny*1.7)*4.1-s+tt*0.16)+Math.sin(ny*9+s*2.1+nx*3)*0.5; return 0.5+0.5*(v/2.0); }
  function dep(x,y,amt,sig){ var cc=x/cell,cr=y/cell,rad=Math.ceil(sig*1.6),inv=1/(2*sig*sig*0.18);
    for(var dr=-rad;dr<=rad;dr++)for(var dc=-rad;dc<=rad;dc++){ var c=(cc+dc)|0,r=(cr+dr)|0; if(c<0||r<0||c>=cols||r>=rows)continue; var dx=c+.5-cc,dy=r+.5-cr,w=Math.exp(-(dx*dx+dy*dy)*inv); if(w<.02)continue; var id=r*cols+c,vv=heat[id]+amt*w; heat[id]=vv>1?1:vv; } }
  function pos(e){ var r=cv.getBoundingClientRect(); return [e.clientX-r.left, e.clientY-r.top]; }
  cv.addEventListener('pointermove',function(e){ var p=pos(e); mx=p[0]; my=p[1]; hov=(mx>=0&&mx<=W&&my>=0&&my<=H); });
  cv.addEventListener('pointerleave',function(){ hov=false; mx=-1; release(); });
  cv.addEventListener('pointerdown',function(e){ var p=pos(e); charging=true; chT0=performance.now()/1000; chx=p[0]; chy=p[1]; });
  function release(){ if(!charging) return; charging=false; var ns=performance.now()/1000, ch=Math.min((ns-chT0)/1.1,1); waves.push({x:chx,y:chy,t0:ns,pow:0.7+ch*1.7}); dep(chx,chy,1,BRUSH*(5+ch*16)); }
  cv.addEventListener('pointerup',release); cv.addEventListener('pointercancel',release);
  function loop(ts){ if(!loop.l)loop.l=ts; t+=ts-loop.l; loop.l=ts; var tt=t*0.001, ns=performance.now()/1000;
    for(var i=0;i<heat.length;i++){ heat[i]*=0.965; if(heat[i]<.003)heat[i]=0; }
    if(hov&&mx>0) dep(mx,my,0.13,BRUSH);
    if(charging){ var chg=Math.min((ns-chT0)/1.1,1); dep(chx,chy,0.45+chg*0.5,BRUSH*(2+chg*8)); }
    for(var wi=waves.length-1;wi>=0;wi--){ var wv=waves[wi], age=ns-wv.t0; if(age>1.5){waves.splice(wi,1);continue;} var pw=wv.pow||1, R=age*Math.hypot(W,H)*1.7, sig=cell*5.5*pw, amp=Math.max(0,1-age/1.5)*1.2*pw, inv=1/(2*sig*sig);
      for(var r=0;r<rows;r++)for(var c=0;c<cols;c++){ var dx=(c+.5)*cell-wv.x, dy=(r+.5)*cell-wv.y, dd=Math.sqrt(dx*dx+dy*dy), g=amp*Math.exp(-((dd-R)*(dd-R))*inv); if(g>0.02){ var id=r*cols+c; if(g>heat[id])heat[id]=g; } } }
    ctx.clearRect(0,0,W,H); ctx.fillStyle='#fff'; ctx.fillRect(0,0,W,H);
    ctx.strokeStyle='#f4f4f4'; ctx.lineWidth=1; ctx.beginPath(); for(var gx=0;gx<=W;gx+=cell){ctx.moveTo(gx+.5,0);ctx.lineTo(gx+.5,H);} for(var gy=0;gy<=H;gy+=cell){ctx.moveTo(0,gy+.5);ctx.lineTo(W,gy+.5);} ctx.stroke();
    var s=cell-1;
    for(var r2=0;r2<rows;r2++)for(var c2=0;c2<cols;c2++){ var v=base((c2+.5)/cols,(r2+.5)/rows,tt)+heat[r2*cols+c2]*0.9+(hsh(c2,r2)-0.5)*0.12+Math.sin((c2*0.6+r2*0.8)+tt*1.7)*0.05;
      if(v<0.3 && !(v>=0.86&&v<1.02))continue; var col=BANDS[0][1]; if(v>=BANDS[1][0])col=BANDS[1][1]; if(v>=BANDS[2][0])col=BANDS[2][1]; if(v>=BANDS[3][0])col=BANDS[3][1]; if(v>=0.86&&v<1.02)col='#d8ff00';
      ctx.fillStyle=col; ctx.fillRect(c2*cell,r2*cell,s,s); }
    requestAnimationFrame(loop); }
  (document.fonts&&document.fonts.ready?document.fonts.ready:Promise.resolve()).then(size);
  requestAnimationFrame(loop);
  var pxctl=document.getElementById('pxctl');
  if(pxctl){ pxctl.addEventListener('click', function(e){ var b=e.target.closest('button'); if(!b) return;
    function pick(a){ pxctl.querySelectorAll('button[data-'+a+']').forEach(function(x){x.classList.remove('on');}); b.classList.add('on'); }
    if(b.dataset.cell!=null){ cell=+b.dataset.cell; size(); pick('cell'); } else if(b.dataset.brush!=null){ BRUSH=+b.dataset.brush; pick('brush'); } }); }
})();

/* Brand Context Protocol: one continuous "constellation" flow across all four stages (same as the homepage).
   Truth (navy) + Skills (blue) are born as loose clouds, flow into a big randomised output (yellow),
   then at the Brand Check nearly all rise + turn green (pass); a very few drop + turn red (fail). */
(function(){
  var cv=document.getElementById('bcp-flowviz'); if(!cv) return;
  var ctx=cv.getContext('2d'), DPR=Math.min(devicePixelRatio||1,2), PX=8;
  var HEAT=['#1c2541','#3b5bd9','#f5c518','#e0492a'], NEON='#d8ff00';
  function ss(t){ t=t<0?0:t>1?1:t; return t*t*(3-2*t); }
  function hash(n){ var s=Math.sin(n*12.9898)*43758.5453; return s-Math.floor(s); }
  var HX={}; function hx(h){ if(HX[h])return HX[h]; var v; if(h.charAt(0)==='#'){ v=[parseInt(h.slice(1,3),16),parseInt(h.slice(3,5),16),parseInt(h.slice(5,7),16)]; } else { var m=h.match(/\d+/g); v=[+m[0],+m[1],+m[2]]; } return HX[h]=v; }
  function mix(a,b,t){ var A=hx(a),B=hx(b); return 'rgb('+((A[0]+(B[0]-A[0])*t)|0)+','+((A[1]+(B[1]-A[1])*t)|0)+','+((A[2]+(B[2]-A[2])*t)|0)+')'; }
  function pxf(u,isSk){ var startX=isSk?0.28:0.0; return startX+u*(1-startX); }
  function flowPos(u,s,W,H,t){ var cy=H/2, isSk=hash(s*5.5)<0.5, px=pxf(u,isSk), x=px*W;
    var mg=1-ss(Math.min(1,(px-0.02)/0.55));
    var r=H*0.30*(0.28+0.72*mg)+H*0.05;
    var chaos=Math.pow(Math.max(0,1-px/0.5),1.2);
    var a=px*0.85*6.2832+(isSk?3.14159:0)+(hash(s*3.1)-0.5)*3.0*chaos+Math.sin(t*0.0016+s*30)*chaos*1.1;
    var jr=r*(1+(hash(s*7.7)-0.5)*1.8*chaos);
    var env=1-0.22*ss((px-0.50)/0.16);
    var oz=ss((px-0.50)/0.14)*(1-ss((px-0.80)/0.08));
    var z=Math.cos(a)*jr;
    var y=cy+(Math.sin(a)*jr+(isSk?1:-1)*H*0.16*mg)*env - H*0.09*ss((px-0.40)/0.30);
    x+=z*0.30*env;
    var jt=t*0.0022; x+=Math.sin(jt+s*40+px*7)*W*0.007+Math.sin(jt*0.5+s*13)*W*0.005; y+=(Math.cos(jt*1.1+s*27+px*5)*H*0.055+Math.sin(jt*0.7+s*51)*H*0.04)*env;
    y+=(Math.sin(t*0.0025+s*44)+(hash(s*61)-0.5)*1.8)*H*0.11*oz;
    if(px>0.74){ var tl=(px-0.74)/0.26, pass=hash(s*9.1)<0.96; y+=(pass?-1:1)*ss(tl)*H*0.42; }
    return [x,y,0.5+0.5*(z/(jr+0.001))]; }
  function cu(u,s){ var isSk=hash(s*5.5)<0.5, px=pxf(u,isSk);
    if(px<0.58) return isSk?HEAT[1]:HEAT[0];
    if(px<0.74) return HEAT[2];
    var tl=(px-0.74)/0.26; return mix(HEAT[2], hash(s*9.1)<0.96?NEON:HEAT[3], ss(Math.min(1,tl*1.4))); }
  function px(x,y,col,a){ ctx.globalAlpha=a==null?1:a; ctx.fillStyle=col; ctx.fillRect(Math.round(x/PX)*PX, Math.round(y/PX)*PX, PX-1, PX-1); }
  /* demo sync: the carousel tells us which stage is playing; that stage's cloud stays lit, the rest recede */
  function stageOf(u,s){ var isSk=hash(s*5.5)<0.5, px=pxf(u,isSk); if(px>0.74) return 3; if(px>=0.58) return 2; return isSk?1:0; }
  var ST=-1, EM=[1,1,1,1];
  window.bcpFlowStage=function(i){ ST=(typeof i==='number')?i:-1; };
  var W=0,H=0,P=null,t=Math.random()*4000,on=true,pmx=0,pmy=0,pstr=0,ptgt=0;
  function ensure(){ if(!P){ P=[]; for(var i=0;i<4400;i++) P.push({u0:hash(i*3.3+7), s:hash(i*1.7+3), sp:0.55+hash(i*5.1+2)*0.9}); } }
  function size(){ var r=cv.getBoundingClientRect(); if(r.width<2)return; W=r.width;H=r.height; cv.width=Math.round(W*DPR); cv.height=Math.round(H*DPR); ctx.setTransform(DPR,0,0,DPR,0,0); }
  if(window.ResizeObserver) new ResizeObserver(size).observe(cv);
  cv.addEventListener('pointermove',function(e){ var r=cv.getBoundingClientRect(); pmx=e.clientX-r.left; pmy=e.clientY-r.top; ptgt=(pmx>=-40&&pmx<=W+40&&pmy>=-40&&pmy<=H+40)?1:0; },{passive:true});   /* same cursor-parting as the process flow, half-size brush */
  cv.addEventListener('pointerleave',function(){ ptgt=0; });
  if('IntersectionObserver' in window){ new IntersectionObserver(function(es){ es.forEach(function(e){ on=e.isIntersecting; }); }).observe(cv); }
  function rep(p){ if(pstr<0.01) return p; var R=Math.min(W,H)*0.35, dx=p[0]-pmx, dy=p[1]-pmy, d=Math.sqrt(dx*dx+dy*dy)+0.001; if(d>=R) return p; var f=(1-d/R); f=f*f*pstr; var m=Math.min(W,H)*0.3; return [p[0]+dx/d*f*m, p[1]+dy/d*f*m, p[2]]; }
  function draw(){ ensure(); ctx.clearRect(0,0,W,H); pstr+=(ptgt-pstr)*0.09;
    for(var e=0;e<4;e++){ var tgt=(ST<0||ST===e)?1:0.16; EM[e]+=(tgt-EM[e])*0.07; }
    var pts=[]; for(var i=0;i<P.length;i++){ var Q=P[i], u=(Q.u0+t*0.00006*(Q.sp||1))%1, p=rep(flowPos(u,Q.s,W,H,t)); pts.push([p[0],p[1],p[2],cu(u,Q.s),EM[stageOf(u,Q.s)]]); }
    pts.sort(function(a,b){ return a[2]-b[2]; });
    ctx.globalAlpha=0.13; ctx.strokeStyle='#cfcfcf'; ctx.lineWidth=1; var LK=(PX*6)*(PX*6);
    for(var j=0;j<pts.length;j+=2){ for(var k=j+1;k<Math.min(pts.length,j+6);k++){ var dx=pts[j][0]-pts[k][0],dy=pts[j][1]-pts[k][1]; if(dx*dx+dy*dy<LK){ ctx.beginPath(); ctx.moveTo(pts[j][0],pts[j][1]); ctx.lineTo(pts[k][0],pts[k][1]); ctx.stroke(); } } }
    for(var m2=0;m2<pts.length;m2++) px(pts[m2][0],pts[m2][1],pts[m2][3],pts[m2][4]); ctx.globalAlpha=1; }
  var last=0; function loop(ts){ var dt=Math.min(40,ts-last); last=ts; if(!W){ size(); } else if(on){ t+=dt; draw(); } requestAnimationFrame(loop); }
  size(); if(W){ draw(); }   /* paint one frame immediately so it's there the moment it scrolls in */
  requestAnimationFrame(loop);
})();


/* live demo: tiles are the nav; auto-advance when a clip finishes; progress bar tracks the clip */
(function(){ var c=document.getElementById('demoCaro'); if(!c) return;
  var vp=c.querySelector('.dc-vp'), track=c.querySelector('.dc-track'),
      vids=c.querySelectorAll('.dc-slide video'), tiles=c.querySelectorAll('.donuts .step'),
      n=track.children.length, cur=0, w=0, startX=0, dragX=0, dragging=false;
  function setActive(){ for(var i=0;i<tiles.length;i++) tiles[i].classList.toggle('active', i===cur); if(window.bcpFlowStage) window.bcpFlowStage(cur); }   /* light up the matching stage in the flow viz */
  function clearProg(){ for(var i=0;i<tiles.length;i++) tiles[i].style.setProperty('--p','0'); }
  function playCur(){ for(var i=0;i<vids.length;i++){ if(i!==cur){ try{ vids[i].pause(); vids[i].currentTime=0; }catch(_){} } } clearProg(); var v=vids[cur]; if(v){ try{ v.currentTime=0; var pr=v.play(); if(pr&&pr.catch)pr.catch(function(){}); }catch(_){} } }
  function place(animate){ if(!animate){ track.style.transition='none'; } track.style.transform='translateX('+(-cur*w)+'px)'; if(!animate){ requestAnimationFrame(function(){ track.style.transition=''; }); } }
  function go(i){ cur=(i%n+n)%n; place(true); setActive(); playCur(); }
  function size(){ w=vp.clientWidth; place(false); }
  for(var k=0;k<tiles.length;k++){ (function(j){ tiles[j].addEventListener('click',function(){ go(j); }); })(k); }
  for(var mm=0;mm<vids.length;mm++){ (function(v,j){
    v.addEventListener('timeupdate',function(){ if(j===cur && v.duration){ tiles[cur].style.setProperty('--p',(v.currentTime/v.duration).toFixed(4)); } });
    v.addEventListener('ended',function(){ if(j===cur){ tiles[cur].style.setProperty('--p','1'); go(cur+1); } });
  })(vids[mm],mm); }
  vp.addEventListener('pointerdown',function(e){ dragging=true; startX=e.clientX; dragX=0; track.classList.add('drag'); vp.classList.add('drag'); try{vp.setPointerCapture(e.pointerId);}catch(_){} });
  vp.addEventListener('pointermove',function(e){ if(!dragging)return; dragX=e.clientX-startX; track.style.transform='translateX('+(-cur*w+dragX)+'px)'; });
  function endDrag(){ if(!dragging)return; dragging=false; track.classList.remove('drag'); vp.classList.remove('drag'); if(Math.abs(dragX)>w*0.16) go(cur+(dragX<0?1:-1)); else go(cur); }
  vp.addEventListener('pointerup',endDrag); vp.addEventListener('pointercancel',endDrag);
  addEventListener('resize',size);
  (document.fonts&&document.fonts.ready?document.fonts.ready:Promise.resolve()).then(size);
  size(); setActive(); playCur();
})();
/* buttons: smiley-style random pixel flicker on hover (matches the homepage) */
(function(){
  var btns=[].slice.call(document.querySelectorAll('.btn:not(.soon)'));
  if(!btns.length) return;
  var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  var ACC=['#d8ff00','#f5c518','#e0492a','#0a0a0a'], CELL=9;
  btns.forEach(function(b){
    var lbl=document.createElement('span'); lbl.className='lbl';
    while(b.firstChild) lbl.appendChild(b.firstChild);
    var fx=document.createElement('span'); fx.className='pxfx'; fx.setAttribute('aria-hidden','true');
    b.appendChild(fx); b.appendChild(lbl);
    var cells=[];
    function build(){ fx.textContent=''; cells=[]; var cols=Math.ceil(b.offsetWidth/CELL), rows=Math.ceil(b.offsetHeight/CELL); fx.style.gridTemplateColumns='repeat('+cols+','+CELL+'px)'; fx.style.gridAutoRows=CELL+'px'; for(var i=0;i<cols*rows;i++){ cells.push(fx.appendChild(document.createElement('i'))); } }
    build();
    if(window.ResizeObserver) new ResizeObserver(build).observe(b);
    if(reduce) return;
    var timer=null;
    function tick(){ for(var i=0;i<cells.length;i++) cells[i].style.background = Math.random()<0.14 ? ACC[(Math.random()*ACC.length)|0] : 'transparent'; }
    function clear(){ for(var i=0;i<cells.length;i++) cells[i].style.background='transparent'; }
    b.addEventListener('mouseenter', function(){ if(timer) return; tick(); timer=setInterval(tick,130); });
    b.addEventListener('mouseleave', function(){ clearInterval(timer); timer=null; clear(); });
  });

  /* same pixel-flicker on hover for the nav pill */
  var nav=document.querySelector('.nav');
  if(nav){
    var nfx=document.createElement('span'); nfx.className='pxfx'; nfx.setAttribute('aria-hidden','true'); nav.appendChild(nfx);
    var ncells=[];
    function nbuild(){ nfx.textContent=''; ncells=[]; var cols=Math.ceil(nav.offsetWidth/CELL), rows=Math.ceil(nav.offsetHeight/CELL); nfx.style.gridTemplateColumns='repeat('+cols+','+CELL+'px)'; nfx.style.gridAutoRows=CELL+'px'; for(var i=0;i<cols*rows;i++){ ncells.push(nfx.appendChild(document.createElement('i'))); } }
    nbuild();
    if(window.ResizeObserver) new ResizeObserver(nbuild).observe(nav);
    if(!reduce){
      var ntimer=null;
      function ntick(){ for(var i=0;i<ncells.length;i++) ncells[i].style.background = Math.random()<0.14 ? ACC[(Math.random()*ACC.length)|0] : 'transparent'; }
      function nclear(){ for(var i=0;i<ncells.length;i++) ncells[i].style.background='transparent'; }
      nav.addEventListener('mouseenter', function(){ if(ntimer) return; ntick(); ntimer=setInterval(ntick,130); });
      nav.addEventListener('mouseleave', function(){ clearInterval(ntimer); ntimer=null; nclear(); });
    }
  }
})();

/* footer: an auto-building Tetris skyline you can take over and play across the full width, on the same canvas */
(function(){
  var cv=document.getElementById('footcity'); if(!cv) return; var ctx=cv.getContext('2d'); if(!ctx) return;
  var footer=cv.closest('footer'); if(!footer) return;
  var DPR=Math.min(devicePixelRatio||1,2), cell=9, W=0,H=0,cols=0,rows=0, on=true, phase='idle';   /* idle | flick | expand | play */
  var reduce=window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var grid=null, PAL=['#1c2541','#3b5bd9','#f5c518','#e0492a','#d8ff00'];
  function hsh(a){ var n=Math.sin(a*12.9898)*43758.5453; return n-Math.floor(n); }
  /* ---- ambient auto-build skyline ---- */
  function ci(s){ return 1+Math.min(4,(hsh(s)*5)|0); }
  function seed(){ for(var c=0;c<cols;c++){ if(hsh(c*2.3+1.1)<0.3) continue; var hh=1+Math.floor(hsh(c*4.7+0.5)*(rows*0.58)); for(var r=rows-1;r>=rows-hh && r>=0;r--) grid[r*cols+c]=ci(c*9.1+r*3.7); } }
  var APCS=[ [[0,0],[1,0],[2,0],[3,0]], [[0,0],[1,0],[0,1],[1,1]], [[0,0],[1,0],[2,0],[1,1]], [[0,0],[0,1],[1,1],[2,1]], [[0,0],[1,0],[2,0],[2,1]], [[0,0],[1,0],[1,1],[2,1]] ];
  var apiece=null, at=0, afade=0, flick=0;
  function aspawn(){ if(!cols)return; var m=APCS[(Math.random()*APCS.length)|0], w=0; for(var i=0;i<m.length;i++)w=Math.max(w,m[i][0]); apiece={m:m, x:(Math.random()*(cols-w))|0, y:-2, col:1+Math.min(4,(Math.random()*5)|0)}; }
  function ahit(m,px,py){ for(var i=0;i<m.length;i++){ var gx=px+m[i][0], gy=py+m[i][1]; if(gy>=rows) return true; if(gy>=0 && (gx<0||gx>=cols||grid[gy*cols+gx])) return true; } return false; }
  function astep(){ if(afade>0)return; if(!apiece){ aspawn(); return; }
    if(ahit(apiece.m, apiece.x, apiece.y+1)){ var top=rows; for(var i=0;i<apiece.m.length;i++){ var gx=apiece.x+apiece.m[i][0], gy=apiece.y+apiece.m[i][1]; if(gy>=0&&gy<rows){ grid[gy*cols+gx]=apiece.col; if(gy<top)top=gy; } } if(top<=1) afade=0.001; apiece=null; }
    else apiece.y++; }
  function adraw(){ ctx.clearRect(0,0,W,H); var a=afade>0?Math.max(0,1-afade):1, fk=Math.floor(flick*30);
    for(var r=0;r<rows;r++)for(var c=0;c<cols;c++){ var g=grid[r*cols+c]; if(!g)continue;
      if(flick>0 && hsh(c*7.1+r*3.3+fk*2.7) < flick) continue;                 /* cells blink off as the skyline flickers out */
      ctx.globalAlpha=a; ctx.fillStyle=PAL[g-1]; ctx.fillRect(c*cell, r*cell, cell-1, cell-1); }
    if(apiece && flick<=0){ ctx.globalAlpha=1; ctx.fillStyle=PAL[apiece.col-1]; for(var i=0;i<apiece.m.length;i++){ var gx=apiece.x+apiece.m[i][0], gy=apiece.y+apiece.m[i][1]; if(gy>=0) ctx.fillRect(gx*cell, gy*cell, cell-1, cell-1); } }
    ctx.globalAlpha=1; }
  /* ---- playable, full-width: a batch of pieces falls at once and you steer them together ---- */
  var PIECES=[{c:1,m:[[1,1,1,1]]},{c:2,m:[[1,1],[1,1]]},{c:4,m:[[0,1,0],[1,1,1]]},{c:3,m:[[0,1,1],[1,1,0]]},{c:0,m:[[1,1,0],[0,1,1]]},{c:1,m:[[1,0,0],[1,1,1]]},{c:2,m:[[0,0,1],[1,1,1]]}];
  var curs=[], over=false, dropMs=300, grav=0, spawnT=0, score=0, scoreEl=null;
  function rot(m){ var R=m.length,C=m[0].length,n=[]; for(var x=0;x<C;x++){ n[x]=[]; for(var y=0;y<R;y++) n[x][y]=m[R-1-y][x]; } return n; }
  function phit(m,px,py){ for(var y=0;y<m.length;y++)for(var x=0;x<m[0].length;x++){ if(!m[y][x])continue; var gx=px+x,gy=py+y; if(gx<0||gx>=cols||gy>=rows||(gy>=0&&grid[gy*cols+gx])) return true; } return false; }
  function spawnOne(){ var cap=Math.max(2, Math.round(cols/38)); if(curs.length>=cap) return;   /* keep a few raining at once */
    var p=PIECES[(Math.random()*PIECES.length)|0], pw=p.m[0].length;
    for(var t=0;t<8;t++){ var x=(Math.random()*(cols-pw+1))|0; if(!phit(p.m,x,0)){ curs.push({m:p.m,c:p.c,x:x,y:-p.m.length}); return; } } }   /* random column, eases in from above */
  function mergeP(pc){ for(var y=0;y<pc.m.length;y++)for(var x=0;x<pc.m[0].length;x++){ if(pc.m[y][x]){ var gy=pc.y+y; if(gy>=0&&gy<rows) grid[gy*cols+pc.x+x]=pc.c+1; } } }
  function clearLines(){ var n=0; for(var y=rows-1;y>=0;y--){ var full=true; for(var x=0;x<cols;x++){ if(!grid[y*cols+x]){ full=false; break; } } if(full){ for(var yy=y;yy>0;yy--) for(var x2=0;x2<cols;x2++) grid[yy*cols+x2]=grid[(yy-1)*cols+x2]; for(var x3=0;x3<cols;x3++) grid[x3]=0; n++; y++; } }
    if(n){ score+=[0,100,300,600,1000][Math.min(4,n)]; setScore(); } }
  function pmove(d){ if(over)return; var mv=false; for(var i=0;i<curs.length;i++){ var c=curs[i]; if(!phit(c.m,c.x+d,c.y)){ c.x+=d; mv=true; } } if(mv)pdraw(); }
  function psoft(){ if(over)return; for(var i=0;i<curs.length;i++){ var c=curs[i]; if(!phit(c.m,c.x,c.y+1)) c.y++; } pdraw(); }
  function protate(){ if(over)return; for(var i=0;i<curs.length;i++){ var c=curs[i]; var r=rot(c.m),k=[0,-1,1,-2,2],j; for(j=0;j<k.length;j++){ if(!phit(r,c.x+k[j],c.y)){ c.m=r; c.x+=k[j]; break; } } } pdraw(); }
  function phard(){ if(over)return; for(var i=0;i<curs.length;i++){ var c=curs[i]; while(!phit(c.m,c.x,c.y+1)) c.y++; mergeP(c); if(c.y<=0) over=true; } curs=[]; clearLines(); pdraw(); }
  function pdraw(){ ctx.clearRect(0,0,W,H);   /* transparent: the page background grid shows behind the pieces */
    for(var r=0;r<rows;r++)for(var c=0;c<cols;c++){ var g=grid[r*cols+c]; if(g){ ctx.fillStyle=PAL[g-1]; ctx.fillRect(c*cell, r*cell, cell-1, cell-1); } }
    for(var i=0;i<curs.length;i++){ var pc=curs[i]; ctx.fillStyle=PAL[pc.c]; for(var yy=0;yy<pc.m.length;yy++)for(var xx=0;xx<pc.m[0].length;xx++){ if(pc.m[yy][xx]){ var cy=pc.y+yy; if(cy>=0) ctx.fillRect((pc.x+xx)*cell, cy*cell, cell-1, cell-1); } } }
    ov.classList.toggle('tt-isover', !!over); }
  function pstep(){ if(over)return; var still=[];
    for(var i=0;i<curs.length;i++){ var c=curs[i]; if(phit(c.m,c.x,c.y+1)){ mergeP(c); if(c.y<=0) over=true; } else { c.y++; still.push(c); } }
    curs=still;
    if(--spawnT<=0){ spawnOne(); spawnT=1+((Math.random()*4)|0); }   /* stagger spawns over random intervals */
    clearLines(); pdraw(); }
  function gtick(){ if(phase!=='play'||over) return; pstep(); grav=setTimeout(gtick,dropMs); }
  function setScore(){ if(scoreEl) scoreEl.textContent=('000000'+score).slice(-6); }
  function beginPlay(){ phase='play'; size(); for(var i=0;i<grid.length;i++) grid[i]=0; over=false; dropMs=300; score=0; setScore(); curs=[]; spawnT=0; spawnOne(); spawnOne(); pdraw(); clearTimeout(grav); grav=setTimeout(gtick,dropMs); }
  /* ---- sizing ---- */
  function size(){ var r=cv.getBoundingClientRect(); if(r.width<2)return; W=r.width;H=r.height; cv.width=Math.round(W*DPR); cv.height=Math.round(H*DPR); ctx.setTransform(DPR,0,0,DPR,0,0); cols=Math.ceil(W/cell); rows=Math.floor(H/cell); grid=new Int8Array(cols*rows); if(phase==='idle') seed(); }
  size(); if(window.ResizeObserver) new ResizeObserver(function(){ var wasPlay=(phase==='play'); size(); if(wasPlay){ over=false; curs=[]; spawnT=0; pdraw(); } }).observe(cv);
  if('IntersectionObserver' in window){ new IntersectionObserver(function(es){ es.forEach(function(e){ on=e.isIntersecting; }); }).observe(cv); }
  /* ---- HUD overlay: score, controls, close, game over ---- */
  var ov=document.createElement('div'); ov.id='tetris';
  ov.innerHTML='<div class="tt-score">000000</div>'+
    '<div class="tt-pad">'+
      '<button data-k="left" aria-label="Move left"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg></button>'+
      '<button data-k="right" aria-label="Move right"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></button>'+
      '<button data-k="rot" aria-label="Rotate"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg></button>'+
      '<button data-k="drop" aria-label="Hard drop"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m7 6 5 5 5-5"/><path d="m7 13 5 5 5-5"/></svg></button>'+
    '</div>'+
    '<button class="tt-close" aria-label="Close"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="M6 6l12 12"/></svg></button>'+
    '<div class="tt-over"><span class="ttl">Game over</span><button class="tt-again" type="button">play again</button></div>';
  footer.appendChild(ov); scoreEl=ov.querySelector('.tt-score');
  if(window.__pxHover) window.__pxHover(ov.querySelector('.tt-again'));
  ov.querySelector('.tt-again').addEventListener('click', function(e){ e.stopPropagation(); beginPlay(); });
  ov.querySelector('.tt-close').addEventListener('click', function(e){ e.stopPropagation(); endGame(); });
  ov.querySelectorAll('.tt-pad button').forEach(function(b){ b.addEventListener('click', function(e){ e.stopPropagation(); if(over){ beginPlay(); return; } var a=b.getAttribute('data-k'); if(a==='left')pmove(-1); else if(a==='right')pmove(1); else if(a==='rot')protate(); else phard(); }); });
  /* ---- transitions ---- */
  function glideToFooter(){ var startY=window.pageYOffset||0, start=performance.now();   /* scroll to the very bottom so the footer ends at the bottom of the browser (nothing cut off) */
    (function tick(now){ var p=Math.min(1,(now-start)/560), e=1-Math.pow(1-p,3), maxNow=Math.max(document.documentElement.scrollHeight, document.body.scrollHeight)-innerHeight;
      scrollTo(0, startY+(maxNow-startY)*e); if(p<1) requestAnimationFrame(tick); })(start); }
  function startGame(){ if(phase!=='idle') return; phase='flick'; flick=0.001; }
  function endGame(){ phase='idle'; footer.classList.remove('playing'); clearTimeout(grav); flick=0; over=false; curs=[]; }
  function key(e){ if(phase!=='play')return; if(e.key==='Escape'){ endGame(); return; } if(over){ if(e.key==='Enter') beginPlay(); return; }
    if(e.key==='ArrowLeft'){pmove(-1);e.preventDefault();} else if(e.key==='ArrowRight'){pmove(1);e.preventDefault();}
    else if(e.key==='ArrowDown'){psoft();e.preventDefault();} else if(e.key==='ArrowUp'||e.key==='x'||e.key==='X'){protate();e.preventDefault();}
    else if(e.key===' '){phard();e.preventDefault();} }
  document.addEventListener('keydown', key);
  footer.addEventListener('click', function(e){ if(phase!=='idle' || (e.target.closest && e.target.closest('.tt-close,.tt-pad,.tt-again'))) return; startGame(); });
  /* ---- main loop ---- */
  (function loop(){ if(on && !reduce){
      if(phase==='idle'){ at++; if(at%5===0) astep(); if(afade>0){ afade+=0.05; if(afade>=1){ grid=new Int8Array(cols*rows); seed(); afade=0; } } adraw(); }
      else if(phase==='flick'){ flick+=0.06; adraw(); if(flick>=1){ phase='expand'; footer.classList.add('playing'); glideToFooter(); setTimeout(beginPlay,580); } }
    } requestAnimationFrame(loop); })();
})();
/* teaser: cycle through tetromino pieces one at a time, like a tiny loop */
(function(){
  var cv=document.getElementById('ttpieces'); if(!cv) return; var ctx=cv.getContext('2d'); if(!ctx) return;
  var DPR=Math.min(devicePixelRatio||1,2), U=4, Wc=5*U, Hc=4*U;
  cv.width=Math.round(Wc*DPR); cv.height=Math.round(Hc*DPR); cv.style.width=Wc+'px'; cv.style.height=Hc+'px'; ctx.setTransform(DPR,0,0,DPR,0,0);
  var COL=['#3b5bd9','#f5c518','#e0492a','#d8ff00'];
  var P=[ [[0,0],[1,0],[2,0],[3,0]], [[0,0],[1,0],[0,1],[1,1]], [[0,0],[1,0],[2,0],[1,1]], [[1,0],[2,0],[0,1],[1,1]], [[0,0],[1,0],[2,0],[0,1]], [[0,0],[1,0],[2,0],[2,1]] ];
  var i=0;
  function draw(){ ctx.clearRect(0,0,Wc,Hc); var m=P[i%P.length], col=COL[i%COL.length], mx=0,my=0,k; for(k=0;k<m.length;k++){ if(m[k][0]>mx)mx=m[k][0]; if(m[k][1]>my)my=m[k][1]; }
    var ox=(Wc-(mx+1)*U)/2, oy=(Hc-(my+1)*U)/2; ctx.fillStyle=col; for(k=0;k<m.length;k++) ctx.fillRect(ox+m[k][0]*U, oy+m[k][1]*U, U-1, U-1); }
  draw(); setInterval(function(){ i++; draw(); }, 520);
})();


/* faint page-background grid, same look as the homepage field (document-aligned, scrolls with the page) */
(function(){
  var cv=document.getElementById('bcpgrid'); if(!cv) return; var ctx=cv.getContext('2d'); if(!ctx) return;
  var DPR=Math.min(devicePixelRatio||1,2), cell=9, W=0,H=0, lastW=innerWidth;
  function draw(){ ctx.clearRect(0,0,W,H); var off=scrollY-Math.floor(scrollY/cell)*cell;
    ctx.strokeStyle='#f1f1f1'; ctx.lineWidth=1; ctx.beginPath();
    for(var gx=0;gx<=W;gx+=cell){ ctx.moveTo(gx+.5,0); ctx.lineTo(gx+.5,H); }
    for(var gy=-off;gy<=H;gy+=cell){ ctx.moveTo(0,gy+.5); ctx.lineTo(W,gy+.5); } ctx.stroke(); }
  function size(){ W=innerWidth; H=innerHeight; cv.width=Math.round(W*DPR); cv.height=Math.round(H*DPR); ctx.setTransform(DPR,0,0,DPR,0,0); draw(); }
  size(); addEventListener('resize',function(){ if(innerWidth!==lastW){ lastW=innerWidth; } size(); }); addEventListener('scroll',draw,{passive:true});
})();


/* why it's different: step through the four points as the sticky section scrolls (same progress->stage logic used elsewhere) */
(function(){
  var sec=document.getElementById('whyx'); if(!sec) return;
  var items=[].slice.call(sec.querySelectorAll('.whyx-item')), dots=[].slice.call(sec.querySelectorAll('.whyx-dots span')), n=items.length, curi=-1;
  function set(i){ if(i===curi)return; curi=i; for(var k=0;k<n;k++){ items[k].classList.toggle('on',k===i); if(dots[k]) dots[k].classList.toggle('on',k===i); } }
  function update(){ var total=sec.offsetHeight-innerHeight, top=sec.getBoundingClientRect().top, p=total>0?Math.min(1,Math.max(0,(-top)/total)):0; set(Math.min(n-1, Math.floor(p*n*0.999))); }
  update(); addEventListener('scroll',update,{passive:true}); addEventListener('resize',update);
})();


/* W logo: choppy stepped spin every ~10s (it also spins on hover via CSS) */
(function(){ var l=document.querySelector('.nav .home'); if(!l) return;
  setInterval(function(){ l.classList.add('spin'); setTimeout(function(){ l.classList.remove('spin'); }, 760); }, 10000); })();
