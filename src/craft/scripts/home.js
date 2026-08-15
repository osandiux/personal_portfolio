
/* ===== hero keyvisual: clouds field + neon + decode-to-real-text + detonate; clips into rounded box on scroll ===== */
(function(){
  var cv=document.getElementById('hero-kv'), hero=document.getElementById('hero'), origin=document.querySelector('.intro')||document.getElementById('origin'); if(!cv) return; var ctx=cv.getContext('2d'); if(!ctx) return;
  var DPR=Math.min(devicePixelRatio||1,2), W=0,H=0, cell=9, BRUSH=10, cols=0, rows=0, heat=null, dis=null, t=0, SEED=Math.random()*1000;
  var waves=[], shake=0, mx=-1,my=-1,hov=false, typeT=0, introT=0, RSPREAD=1.15, RLEAD=0.16, TBLOCK=6, tcols=0, trows=0;
  var LINES=['CRAFT,','ENGINEERED.'];
  var BANDS=[[0.30,'#1c2541'],[0.46,'#3b5bd9'],[0.62,'#f5c518'],[0.78,'#e0492a']];
  var tmask=document.createElement('canvas'), tmc=tmask.getContext('2d'), tfx=document.createElement('canvas'), tfc=tfx.getContext('2d');
  var smask=document.createElement('canvas'), smc=smask.getContext('2d'), sData=null, TB=null;
  function size(){ W=innerWidth; H=innerHeight; cv.width=Math.round(W*DPR); cv.height=Math.round(H*DPR); ctx.setTransform(DPR,0,0,DPR,0,0);
    tmask.width=cv.width; tmask.height=cv.height; tmc.setTransform(DPR,0,0,DPR,0,0); tfx.width=cv.width; tfx.height=cv.height; tfc.setTransform(DPR,0,0,DPR,0,0);
    cols=Math.ceil(W/cell)+1; rows=Math.ceil(H/cell)+1; heat=new Float32Array(cols*rows); dis=new Float32Array(cols*rows); smask.width=cols; smask.height=rows; }
  var lastW=innerWidth; size(); addEventListener('resize',function(){ if(innerWidth!==lastW){ lastW=innerWidth; size(); } });   /* ignore iOS address-bar height toggles that reset the field */
  var hrTop=0, hrH=0, fhb=-1;                  /* hero rect (viewport): headline & safe zones follow it; fhb = eased fade edge */
  /* every copy block & image keeps the pixels out of it; the field only fills the gaps */
  var pxsafeEls=[].slice.call(document.querySelectorAll('.masthead .mh-l, .masthead .mh-r, .masthead .mh-c'));
  function hsh(c,r){ var n=Math.sin(c*127.1+r*311.7+SEED*0.13)*43758.5453; return n-Math.floor(n); }
  function base(nx,ny,tt){ var s=SEED; nx+=Math.sin(ny*5+tt*0.5+s)*0.05; ny+=Math.cos(nx*5-tt*0.4)*0.05;
    var v=Math.sin(nx*5.6+s*1.3+tt*0.3)*Math.cos(ny*4.7-s*0.7+tt*0.22)+Math.sin((nx*1.4+ny*1.7)*4.1-s+tt*0.16)+Math.sin(ny*9+s*2.1+nx*3)*0.5+Math.sin(nx*13-s*1.7)*0.28;
    return 0.5+0.5*(v/2.55); }
  /* low-frequency blobs: deeper in the page the field only survives inside these, so pixels cluster in areas (no scattered singles) */
  function region(nx,ny,tt){ return 0.5+0.5*Math.sin(nx*2.1+tt*0.12+SEED*0.7)*Math.cos(ny*1.8-tt*0.09+SEED*0.3); }
  function dep(x,y,amt,sig){ var cc=x/cell,cr=y/cell,rad=Math.ceil(sig*1.6),inv=1/(2*sig*sig*0.18);
    for(var dr=-rad;dr<=rad;dr++)for(var dc=-rad;dc<=rad;dc++){ var c=(cc+dc)|0,r=(cr+dr)|0; if(c<0||r<0||c>=cols||r>=rows)continue;
      var dx=c+.5-cc,dy=r+.5-cr,w=Math.exp(-(dx*dx+dy*dy)*inv); if(w<.02)continue; var id=r*cols+c,vv=heat[id]+amt*w; heat[id]=vv>1?1:vv; } }
  /* stamp the blob along the cursor's path so a fast flick stays continuous instead of vanishing between frames */
  var pmx=-1, pmy=-1, lastMove=-9, vel=0, lastZone2='', hopT=-9;
  function follow(x,y,sig){ if(pmx<0){pmx=x;pmy=y;}
    var dx=x-pmx, dy=y-pmy, dl=Math.sqrt(dx*dx+dy*dy), steps=Math.max(1,Math.min(48,Math.round(dl/(cell*0.8))));
    for(var s=1;s<=steps;s++){ var f=s/steps; dep(pmx+dx*f, pmy+dy*f, 0.16, sig); }
    pmx=x; pmy=y; }
  var ZG=[[0,0],[1,0],[2,0],[1,0.55],[0,1.1],[1,1.1],[2,1.1]];
  /* a filled disk with a chomping wedge carved out: Pac-Man, facing `ang` */
  function pacman(cx,cy,rad,ang,mouth,val){ var c0=Math.floor((cx-rad)/cell),c1=Math.ceil((cx+rad)/cell),r0=Math.floor((cy-rad)/cell),r1=Math.ceil((cy+rad)/cell),rr=rad*rad;
    for(var r=r0;r<=r1;r++)for(var c=c0;c<=c1;c++){ if(c<0||r<0||c>=cols||r>=rows)continue; var dx=(c+.5)*cell-cx, dy=(r+.5)*cell-cy; if(dx*dx+dy*dy>rr)continue;
      var da=Math.abs((((Math.atan2(dy,dx)-ang)%(2*Math.PI))+3*Math.PI)%(2*Math.PI)-Math.PI); if(da<mouth)continue;   /* carve the mouth wedge in the facing direction */
      var id=r*cols+c, v=val+0.03*Math.sin((c*0.7+r*0.7)-t*0.01); if(v>heat[id])heat[id]=v; } }
  /* inactive: the blob becomes a Pac-Man, heads off in a straight line eating a row of pellets, until it leaves the screen */
  var pacOn=false, pacx=0, pacy=0, pacDir=1, pacStart=0, pacAge=0, PFOOD=34;
  function wander(restx,resty,tt){
    if(!pacOn){ pacOn=true; pacDir=(restx<W*0.5)?1:-1; pacx=restx; pacy=resty; pacStart=restx; pacAge=0; PFOOD=BRUSH*3.4; }
    var rad=BRUSH*3.4;                                                       /* big enough to read clearly as Pac-Man */
    pacAge++; pacx += pacDir*2.6;                                            /* straight horizontal line, steady speed */
    if(pacx > W+rad+12 || pacx < -rad-12){                                   /* left the screen -> respawn on a fresh row, crossing back */
      pacDir = Math.random()<0.5?1:-1; pacy = 70 + Math.random()*(H-140); pacx = pacDir>0 ? -rad : W+rad; pacStart=pacx; pacAge=0; }
    var ang=pacDir>0?0:Math.PI;
    var pr=Math.round(pacy/cell);                                            /* pellets sit on one grid row */
    for(var k=1;k<=80;k++){ var px=pacStart + pacDir*PFOOD*k; if(px<-20||px>W+20)continue;
      if(pacDir*(px-pacx) > rad*0.7){ var pc=Math.round(px/cell); if(pc>=0&&pr>=0&&pc<cols&&pr<rows){ var pid=pr*cols+pc; if(0.72>heat[pid])heat[pid]=0.72; } } }   /* 1-cell pellets ahead of him; each vanishes as the mouth reaches it */
    var mouth=0.05+0.6*Math.abs(Math.sin(pacAge*0.16));                     /* chomp open/close */
    pacman(pacx, pacy, rad, ang, mouth, 0.72);                              /* 0.72 => yellow band */
  }
  /* hovered slide: a single one-cell-thick line of hero-coloured pixels around its image */
  var hoverSlide=null;
  function setEdge(c,r){ if(c<0||r<0||c>=cols||r>=rows)return; var id=r*cols+c;
    var w=0.5+0.5*Math.sin((c*0.8+r*0.8) - t*0.006);          /* a colour wave travels around the line */
    heat[id]=0.34 + w*0.56 + (hsh(c,r)-0.5)*0.12; }
  function measureType(){ var fs=Math.min((W*0.6)/2.6, H*0.165), lh=fs*0.92, cy=hrTop + hrH*0.45;
    tmc.font='400 '+fs+'px Sneak,sans-serif'; var mw=1; for(var i=0;i<LINES.length;i++){ var ww=tmc.measureText(LINES[i]).width; if(ww>mw)mw=ww; }
    TB={cx:W/2, w:mw, fs:fs, lh:lh, y0:cy-lh/2};
    tmc.clearRect(0,0,W,H); tmc.textAlign='center'; tmc.textBaseline='middle'; tmc.fillStyle='#000'; for(i=0;i<LINES.length;i++) tmc.fillText(LINES[i], W/2, TB.y0+i*lh);
    /* safe zone: clear the field behind the title so it stays readable */
    smc.setTransform(1,0,0,1,0,0); smc.clearRect(0,0,cols,rows); smc.textAlign='center'; smc.textBaseline='middle'; smc.lineJoin='round'; smc.lineWidth=3.2; smc.strokeStyle='#000'; smc.fillStyle='#000';
    for(i=0;i<LINES.length;i++){ smc.font='400 '+(fs/cell)+'px Sneak,sans-serif'; smc.strokeText(LINES[i], (W/2)/cell, (TB.y0+i*lh)/cell); smc.fillText(LINES[i], (W/2)/cell, (TB.y0+i*lh)/cell); }
    sData=smc.getImageData(0,0,cols,rows).data; }
  function clamp01(x){ return x<0?0:(x>1?1:x); }
  function clearAt(c,r,x,y){
    if(sData && sData[(r*cols+c)*4+3]>40) return 1;            /* headline: keep clean & readable */
    var yr=y-hrTop;                                             /* relative to the hero (it scrolls) */
    var tl=clamp01((400-x)/150)*clamp01((220-yr)/130);
    var tr=clamp01((x-(W-360))/150)*clamp01((220-yr)/130);
    var bl=clamp01((W*0.52-x)/170)*clamp01((yr-(hrH-210))/130);
    return Math.max(tl,tr,bl); }                                /* corner safe zones: soft, fuzzy edges */
  function drawTypeReveal(g2,color){ if(!TB)return; var n=Math.ceil(W/TBLOCK), span=Math.max(1,n), tick=Math.floor(typeT*16), nr=Math.ceil(H/TBLOCK);
    tfc.clearRect(0,0,W,H); tfc.fillStyle=color;
    for(var c=0;c<n;c++){ var key=c/span, ra=key*RSPREAD;
      if(typeT>=ra){ tfc.fillRect(c*TBLOCK,0,TBLOCK,H); }
      else if(typeT>ra-RLEAD){ var prob=0.25+0.75*(1-(ra-typeT)/RLEAD); for(var r=0;r<nr;r++){ if(hsh(c+tick*0.7,r)<prob) tfc.fillRect(c*TBLOCK,r*TBLOCK,TBLOCK,TBLOCK); } } }
    tfc.globalCompositeOperation='destination-in'; tfc.drawImage(tmask,0,0,W,H); tfc.globalCompositeOperation='source-over'; g2.drawImage(tfx,0,0,W,H); }
  var TOUCH = !(window.matchMedia && matchMedia('(hover: hover) and (pointer: fine)').matches);   /* phones/tablets: no mouse */
  var secOrigin=document.getElementById('origin'), secAi=document.getElementById('ai'), secContact=document.getElementById('contact'), footEl=document.querySelector('footer');
  var secProcess=document.getElementById('process'), secProto=document.getElementById('protocol'), secProtoParts=document.getElementById('protocol-parts');
  function spans(el,y){ if(!el)return false; var r=el.getBoundingClientRect(); return r.top<y && r.bottom>y; }
  /* which section is under the cursor -> the CTA marquee/follow, or the heart over the origin story */
  function zoneOf(el){ if(!el||!el.closest) return '';
    return el.closest('#contact, footer') ? 'text'
      : el.closest('#origin') ? 'heart' : ''; }
  var hoverEls=[], groups=[], smileyEls=[], ctaMeta=null, headEls=[], headElsM=[];
  function collectTargets(){
    hoverEls=[].slice.call(document.querySelectorAll(TOUCH ? '.btn' : '.slide:first-child .csm, .slide:first-child .pv, .btn'));
    headEls=[].slice.call(document.querySelectorAll('.hero h1, .ed h2, .proc h2, .ch h2'));   /* desktop: the blob points at every headline */
    headElsM=[].slice.call(document.querySelectorAll('[data-blobarrow]'));                     /* mobile: only these couple get the auto-blob arrow */
    groups=[];
    ['#process .donuts','#protocol-parts .donuts'].forEach(function(sel){ var h=document.querySelector(sel); if(h){ var e=[].slice.call(h.querySelectorAll('.donut')); if(e.length) groups.push({host:h,els:e,frame:true}); } });
    var two=document.querySelector('#shift .two'); if(two){ var sm=[].slice.call(two.querySelectorAll('.smiley')); if(sm.length) groups.push({host:two,els:sm,frame:false}); }
    /* smileys the cursor blob can be pulled into; heat value picks the band colour (neon vs blue) */
    smileyEls=[].slice.call(document.querySelectorAll('#shift .smiley')).map(function(el){ return {el:el, val: el.getAttribute('data-base')==='#3b5bd9' ? 0.56 : 1.0}; });
    ctaMeta=document.querySelector('#contact .meta');
  }
  collectTargets(); addEventListener('load',collectTargets);
  function nearestTarget(vc){ var best=null,bd=H*0.42,i,r,d; for(i=0;i<hoverEls.length;i++){ r=hoverEls[i].getBoundingClientRect(); if(r.width<2||r.bottom<0||r.top>H)continue; d=Math.abs(r.top+r.height/2-vc); if(d<bd){bd=d;best=hoverEls[i];} } return best; }
  /* nearest headline within a margin of the cursor -> the blob points at it / reacts */
  function nearHeadline(x,y,list){ var best=null,bd=1e9,i,r,M=150; for(i=0;i<list.length;i++){ r=list[i].getBoundingClientRect(); if(r.width<2||r.bottom<-40||r.top>H+40)continue;
      if(x<r.left-M||x>r.right+M||y<r.top-M||y>r.bottom+M)continue;            /* cursor must be within the margin band */
      var cx=r.left+r.width/2, cy=r.top+r.height/2, d=Math.hypot(x-cx,y-cy); if(d<bd){ bd=d; best={x:cx,y:cy,idx:i}; } } return best; }
  function ctr(el){ var r=el.getBoundingClientRect(); return [r.left+r.width/2, r.top+r.height/2]; }
  function activeGroup(vc){ var best=null,bd=H*0.55,i,h,d;
    for(i=0;i<groups.length;i++){ h=groups[i].host.getBoundingClientRect(); if(h.bottom<0||h.top>H||h.height<2)continue; d=Math.abs(h.top+h.height/2-vc); if(d<bd){bd=d;best=groups[i];} }
    if(!best) return null;
    var hb2=best.host.getBoundingClientRect(), n=best.els.length, p=(vc-hb2.top)/Math.max(1,hb2.height); p=Math.max(0,Math.min(0.9999,p));
    if(n<2){ var c=ctr(best.els[0]); return {x:c[0],y:c[1],el:best.els[0],frame:best.frame}; }
    var f=p*(n-1), i0=Math.floor(f), fr=f-i0, a=ctr(best.els[i0]), b=ctr(best.els[Math.min(n-1,i0+1)]);
    return {x:a[0]*(1-fr)+b[0]*fr, y:a[1]*(1-fr)+b[1]*fr, el:best.els[fr<0.5?i0:Math.min(n-1,i0+1)], frame:best.frame};
  }
  addEventListener('pointermove',function(e){ if(TOUCH) return; lastMove=performance.now()/1000; pacOn=false; mx=e.clientX; my=e.clientY; hov=true; cursorZone=zoneOf(e.target); });           /* heat follows the cursor anywhere on the page */
  addEventListener('scroll',function(){ if(TOUCH||!hov||mx<0)return; lastMove=performance.now()/1000; pacOn=false; cursorZone=zoneOf(document.elementFromPoint(mx,my)); }, {passive:true});   /* scrolling counts as activity (resets the Pac-Man timer) and re-checks the section under the cursor */
  document.querySelectorAll('.slide .csm, .slide .pv, .ctabtn, .btn, .proc .donut').forEach(function(m){
    m.addEventListener('mouseenter',function(){ hoverSlide=m; });
    m.addEventListener('mouseleave',function(){ if(hoverSlide===m) hoverSlide=null; }); });
  var charging=false, chT0=0, chx=0, chy=0;
  addEventListener('pointerdown',function(e){ if(TOUCH) return; if(e.target.closest('a,button,input,.masthead,.pxctl')) return;
    charging=true; chT0=performance.now()/1000; chx=e.clientX; chy=e.clientY; });                                /* hold to charge (pointer devices only) */
  function release(){ if(!charging) return; charging=false; var ns=performance.now()/1000, ch=Math.min((ns-chT0)/2.2,1);
    waves.push({x:chx,y:chy,t0:ns,pow:0.35+ch*2.1}); dep(chx,chy,1,BRUSH*(2.5+ch*18)); shake=0.45+ch*1.9;          /* slower ramp (2.2s to full); a quick tap is gentle, a long hold blows up */
    var hb=hero.getBoundingClientRect(); if(hb.bottom>0 && hb.top<H) typeT=0; }
  addEventListener('pointerup',release); addEventListener('pointercancel',release);
  var cursorZone='';
  var HEART=[[2,1],[3,1],[5,1],[6,1],[1,2],[2,2],[3,2],[4,2],[5,2],[6,2],[7,2],[1,3],[2,3],[3,3],[4,3],[5,3],[6,3],[7,3],[2,4],[3,4],[4,4],[5,4],[6,4],[3,5],[4,5],[5,5],[4,6]];
  /* the heart, drawn 2x bigger over the origin story */
  function stampHeart(cx,cy){ var S=2, bc=Math.round(cx/cell), br=Math.round(cy/cell), o=4*S;
    for(var k=0;k<HEART.length;k++){ for(var yy=0;yy<S;yy++)for(var xx=0;xx<S;xx++){ var C=bc+HEART[k][0]*S+xx-o, R=br+HEART[k][1]*S+yy-o; if(C<0||R<0||C>=cols||R>=rows)continue; var id=R*cols+C, w=0.86+0.12*Math.sin((C*0.6+R*0.6)-t*0.006); if(w>heat[id])heat[id]=w; } } }
  /* a small explosion of heart-coloured sparks when the heart first appears */
  var hsparks=[];
  function heartBoom(x,y){ for(var i=0;i<16;i++){ var a=i/16*6.2832, sp=BRUSH*(0.7+hsh(i,x)*0.7); hsparks.push({x:x,y:y,vx:Math.cos(a)*sp,vy:Math.sin(a)*sp,life:1}); } }
  var wasHeart=false;
  var SAYS=['nice','wow','ooh','yes','neat','huh','oh!'];   /* the blob's little reactions to headlines */
  /* a big crisp arrow that rotates to any angle to point at the headline, with a highlight pulse running toward the tip */
  function pointArrow(x,y,ang,tt){ var L=BRUSH*8.5, ca=Math.cos(ang), sa=Math.sin(ang), tipx=x+ca*L, tipy=y+sa*L;
    var pulse=(tt*0.9)%1, steps=Math.max(16,Math.round(L/(cell*0.5)));
    for(var i=0;i<=steps;i++){ var f=i/steps, hi=Math.exp(-Math.pow((f-pulse)*3.0,2)); dep(x+ca*L*f, y+sa*L*f, 0.5+0.46*hi, 0.95); }   /* thin shaft (sig~1 cell) + travelling bright band toward the tip */
    var hl=BRUSH*3.4; for(var s=-1;s<=1;s+=2){ var ba=ang+Math.PI+s*0.62, bsteps=Math.max(8,Math.round(hl/(cell*0.5)));
      for(var j=0;j<=bsteps;j++){ var g=j/bsteps; dep(tipx+Math.cos(ba)*hl*g, tipy+Math.sin(ba)*hl*g, 0.72, 0.95); } } }   /* crisp arrowhead barbs */
  function stampCells(cx,cy,cells,ox,oy){ var bc=Math.round(cx/cell), br=Math.round(cy/cell); for(var k=0;k<cells.length;k++){ var C=bc+cells[k][0]-ox, R=br+cells[k][1]-oy; if(C<0||R<0||C>=cols||R>=rows)continue; var id=R*cols+C, w=0.8+0.16*Math.sin((C*0.7+R*0.7)-t*0.005); if(w>heat[id])heat[id]=w; } }
  /* fill a circle of heat at a fixed value (the blob taking the shape + colour of a smiley face) */
  function stampDisk(cx,cy,rad,val){ if(rad<3)return; var c0=Math.floor((cx-rad)/cell),c1=Math.ceil((cx+rad)/cell),r0=Math.floor((cy-rad)/cell),r1=Math.ceil((cy+rad)/cell), rr=rad*rad, fk=Math.floor(t/140), ACCV=[0.96,0.72,0.82];
    for(var r=r0;r<=r1;r++)for(var c=c0;c<=c1;c++){ if(c<0||r<0||c>=cols||r>=rows)continue; var dx=(c+.5)*cell-cx, dy=(r+.5)*cell-cy; if(dx*dx+dy*dy>rr)continue;
      var v = hsh(c*1.7+0.3, r*1.1+fk*3.7) < 0.18 ? ACCV[(hsh(c+fk*2.1, r-fk*1.3)*3)|0] : val+0.03*Math.sin((c*0.7+r*0.7)-t*0.01);   /* base colour, ~18% of cells flicker to accents, retimed to ~7fps */
      heat[r*cols+c]=v; } }
  var txtC=document.createElement('canvas'), txc=txtC.getContext('2d'), TXT='the answer is yes we do it     ', txtW=0, TXH=20, txtData=null, txtScroll=0;
  function buildTxt(){ txc.font='18px "Sneak",monospace'; txtW=Math.max(8,Math.ceil(txc.measureText(TXT).width)); txtC.width=txtW; txtC.height=TXH; txc.font='18px "Sneak",monospace'; txc.textBaseline='middle'; txc.fillStyle='#000'; txc.clearRect(0,0,txtW,TXH); txc.fillText(TXT,0,TXH/2); txtData=txc.getImageData(0,0,txtW,TXH).data; }
  function stampText(cx,cy){ if(!txtData) buildTxt(); var br=Math.round(cy/cell)-(TXH>>1), so=Math.floor(txtScroll), amp=TOUCH?0.05:0.14;   /* gentler shimmer on touch so the marquee stays in one colour band instead of flickering across them */
    for(var lc=0;lc<cols;lc++){ var mc=(((so+lc)%txtW)+txtW)%txtW; for(var lr=0;lr<TXH;lr++){ if(txtData[(lr*txtW+mc)*4+3]>80){ var R=br+lr; if(R<0||R>=rows)continue; var id=R*cols+lc, ww=0.84+amp*Math.sin((lc*0.6+lr*0.6)-t*0.006); if(ww>heat[id])heat[id]=ww; } } } }
  /* blob "speech": a short word stamped above it in chunky pixels (reacting to a headline) */
  var sayC=document.createElement('canvas'), sayx=sayC.getContext('2d'), sayMasks={};
  function saymask(txt){ if(sayMasks[txt])return sayMasks[txt]; sayx.font='bold 12px "Sneak",monospace'; var w=Math.max(8,Math.ceil(sayx.measureText(txt).width)),h=12; sayC.width=w; sayC.height=h;
    sayx.font='bold 12px "Sneak",monospace'; sayx.textBaseline='middle'; sayx.fillStyle='#000'; sayx.clearRect(0,0,w,h); sayx.fillText(txt,0,h/2); var o={d:sayx.getImageData(0,0,w,h).data,w:w,h:h}; sayMasks[txt]=o; return o; }
  function sayWord(txt,x,y,pop){ var o=saymask(txt), th=38, sc=th/o.h, tw=o.w*sc, ox=x-tw/2, oy=y-28-th;
    for(var mr=0;mr<o.h;mr++)for(var mc=0;mc<o.w;mc++){ if(o.d[(mr*o.w+mc)*4+3]<80)continue;
      var c0=((ox+mc*sc)/cell)|0,c1=((ox+(mc+1)*sc)/cell)|0,r0=((oy+mr*sc)/cell)|0,r1=((oy+(mr+1)*sc)/cell)|0;
      for(var R=r0;R<=r1;R++)for(var C=c0;C<=c1;C++){ if(C<0||R<0||C>=cols||R>=rows)continue; var id=R*cols+C, ww=0.55+0.38*pop; if(ww>heat[id])heat[id]=ww; } } }
  /* ===== easter eggs ===== */
  var wMask=document.createElement('canvas'), wmx=wMask.getContext('2d'), wData=null, wW=0, wH=14, eggUntil=0, heartUntil=0;
  function buildWord(txt){ wmx.font='bold 12px "Sneak",monospace'; wW=Math.max(8,Math.ceil(wmx.measureText(txt).width)); wMask.width=wW; wMask.height=wH; wmx.font='bold 12px "Sneak",monospace'; wmx.textBaseline='middle'; wmx.fillStyle='#000'; wmx.clearRect(0,0,wW,wH); wmx.fillText(txt,0,wH/2); wData=wmx.getImageData(0,0,wW,wH).data; }
  function stampWord(){ if(!wData)return; var tw=Math.min(W*0.7,(H*0.45)*(wW/wH)), sc=tw/wW, ox=(W-tw)/2, oy=(H-sc*wH)/2;
    for(var mr=0;mr<wH;mr++)for(var mc=0;mc<wW;mc++){ if(wData[(mr*wW+mc)*4+3]<80)continue; var c0=((ox+mc*sc)/cell)|0,c1=((ox+(mc+1)*sc)/cell)|0,r0=((oy+mr*sc)/cell)|0,r1=((oy+(mr+1)*sc)/cell)|0;
      for(var R=r0;R<=r1;R++)for(var C=c0;C<=c1;C++){ if(C<0||R<0||C>=cols||R>=rows)continue; var id=R*cols+C, ww=0.8+0.18*Math.sin((C*0.5+R*0.5)-t*0.012); if(ww>heat[id])heat[id]=ww; } } }
  function stampBigHeart(){ var gw=9,gh=8, tw=Math.min(W*0.42,H*0.55*(gw/gh)), sc=tw/gw, ox=(W-gw*sc)/2, oy=(H-gh*sc)/2;
    for(var k=0;k<HEART.length;k++){ var c0=((ox+HEART[k][0]*sc)/cell)|0,c1=((ox+(HEART[k][0]+1)*sc)/cell)|0,r0=((oy+HEART[k][1]*sc)/cell)|0,r1=((oy+(HEART[k][1]+1)*sc)/cell)|0;
      for(var R=r0;R<=r1;R++)for(var C=c0;C<=c1;C++){ if(C<0||R<0||C>=cols||R>=rows)continue; var id=R*cols+C, ww=0.82+0.12*Math.sin((C*0.5+R*0.5)-t*0.01); if(ww>heat[id])heat[id]=ww; } } }
  function burst(n,pow){ var b=performance.now()/1000; for(var i=0;i<n;i++) waves.push({x:Math.random()*W, y:Math.random()*H, t0:b, pow:pow*(0.6+Math.random())}); shake=Math.max(shake,1.6); }
  function fireWild(){ buildWord('WILD'); eggUntil=performance.now()/1000+3.4; burst(12,1.1); }
  function fireHeart(){ heartUntil=performance.now()/1000+3.4; burst(8,0.9); }
  var KON=[38,38,40,40,37,39,37,39,66,65], ki=0, typed='';
  addEventListener('keydown',function(e){ var k=e.keyCode;
    if(k===KON[ki]){ ki++; if(ki===KON.length){ ki=0; fireWild(); } } else { ki=(k===KON[0])?1:0; }
    if(e.key&&e.key.length===1){ typed=(typed+e.key.toLowerCase()).slice(-6); if(typed.slice(-4)==='wild') fireWild(); else if(typed==='vienna') fireHeart(); } });
  addEventListener('dblclick',function(e){ if(TOUCH) return; if(e.target.closest&&e.target.closest('a,button,input,.pxctl'))return; waves.push({x:e.clientX,y:e.clientY,t0:performance.now()/1000,pow:2.8}); dep(e.clientX,e.clientY,1,BRUSH*22); shake=2.4; });
  function render(){ var tt=t*0.001, ns=performance.now()/1000;
    /* hero rect drives the headline + its safe zone */
    var hb=hero.getBoundingClientRect(); hrTop=hb.top; hrH=hb.height;
    var heroVis = hb.bottom>0 && hb.top<H;
    var intro=introT/1.6;                                 /* on-load reveal: random pixels scatter in over ~1.6s */
    /* content rects (viewport) the pixels must avoid: copy & images. Padding varies per block (some generous),
       and a fuzzy band gives a ragged, random edge rather than a clean rectangle. */
    var safes=[], i, b;
    for(i=0;i<pxsafeEls.length;i++){ b=pxsafeEls[i].getBoundingClientRect(); if(b.width>0 && b.bottom>0 && b.top<H){
      var ep=10 + (i*53 % 5)*8;                           /* 10,18,26,34,42 px: more generous in some cases */
      safes.push([b.left-ep, b.top-ep*0.7, b.right+ep, b.bottom+ep*0.7, cell*2.4]); } }
    for(i=0;i<heat.length;i++){
      if(dis[i]>0 && ((i/cols)|0)*cell>hb.bottom){ dis[i]-=0.007;          /* below the hero: hold red, then dissolve to white */
        if(dis[i]<=0){ dis[i]=0; heat[i]=0; }
        else if(dis[i]<0.3){ heat[i]*=0.88; }
        else { heat[i]=Math.max(heat[i]*0.95, 0.9); } }
      else { if(dis[i]>0)dis[i]=0; heat[i]*=(TOUCH?0.85:0.878); if(heat[i]<.003)heat[i]=0; } }   /* short, fast-fading trail everywhere (matches the old footer feel) */
    if(TOUCH){ var sp=scrollY, vc=H*0.5, bx, by, mhd=null;               /* no cursor on touch: the blob eases along a scroll path */
      for(var mi=0;mi<headElsM.length;mi++){ var mr=headElsM[mi].getBoundingClientRect(); if(mr.width<2)continue; var mcy=mr.top+mr.height/2; if(mcy>H*0.30 && mcy<H*0.64){ mhd={x:mr.left+mr.width/2, y:mcy}; break; } }   /* a tagged headline near the middle -> point the auto-blob at it */
      if(mhd){ cursorZone=''; var tprog=(H*0.64-mhd.y)/(H*0.34); tprog=tprog<0?0:tprog>1?1:tprog;   /* how far the headline has scrolled up through the band */
        bx=mhd.x+(tprog-0.5)*W*0.5; by=mhd.y-104; hoverSlide=null; }                                  /* sit above it and sweep across as you scroll, so the arrow rotates to keep pointing down at it */
      else {
        cursorZone = spans(secOrigin,vc)?'heart' : ((spans(secContact,vc)||spans(footEl,vc))?'text':'');
        if(cursorZone){ bx=W*0.5+Math.sin(sp*0.0026+0.6)*W*0.33; by=H*0.5+Math.sin(sp*0.0052)*H*0.20; hoverSlide=null; }
        else { var g=activeGroup(vc);
          if(g){ bx=g.x; by=g.y; hoverSlide=g.frame?g.el:null; }
          else { var tg=nearestTarget(vc);
            if(tg){ var tr=tg.getBoundingClientRect(); bx=tr.left+tr.width/2; by=tr.top+tr.height/2; hoverSlide=tg; }
            else { bx=W*0.5+Math.sin(sp*0.0026+0.6)*W*0.33; by=H*0.5+Math.sin(sp*0.0052)*H*0.20; hoverSlide=null; } } }
      }
      if(mx<0)mx=bx; if(my<0)my=by;
      mx += (bx-mx)*0.11; my += (by-my)*0.11;                   /* gentler ease => visits each tile in order, less momentum jitter */
      mx=Math.max(8,Math.min(W-8,mx)); my=Math.max(8,Math.min(H-8,my)); hov=true; lastMove=ns; }   /* touch: always "active" (scroll-follow), never idles into Pac-Man */
    if(hov&&mx>0){
      var hd = TOUCH ? mhd : nearHeadline(mx,my,headEls), idle = ns-lastMove;
      if(hd){                                                                                /* near a headline: keep pointing at it, then wander off when idle */
        if(idle<2.4){ pointArrow(mx,my, Math.atan2(hd.y-my, hd.x-mx), ns); pmx=mx;pmy=my; }
        else { wander(mx,my,ns); pmx=mx;pmy=my; }
      }
      else if(cursorZone==='heart'){ if(!wasHeart) heartBoom(mx,my); stampHeart(mx,my); pmx=mx;pmy=my; }   /* origin story: a big heart that pops in with a little explosion */
      else if(cursorZone==='text'){ follow(mx,my, my>hb.bottom?BRUSH*0.5:BRUSH); }   /* keep the follow-blob in the CTA; the marquee runs independently on top */
      else {
        var sg=null, sp=0;                                                          /* find the nearest smiley and how close (0..1); runs on touch too so the scroll-follow blob fills the face */
        for(var qi=0;qi<smileyEls.length;qi++){ var qr=smileyEls[qi].el.getBoundingClientRect(); if(qr.width<2||qr.bottom<-40||qr.top>H+40)continue;
          var qcx=qr.left+qr.width/2, qcy=qr.top+qr.height/2, GR=qr.width*1.9, qp=1-Math.hypot(mx-qcx,my-qcy)/GR;
          if(qp>sp){ sp=qp; sg={cx:qcx,cy:qcy,rad:qr.width*0.46,val:smileyEls[qi].val}; } }
        if(sg && sp>0){ var e=sp*sp*(3-2*sp), bx=mx+(sg.cx-mx)*e, by=my+(sg.cy-my)*e;   /* stronger pull (wider reach) toward the face... */
          if(e<0.82) dep(bx,by,0.13, BRUSH*(1-0.5*e));
          if(sp>0.16) stampDisk(sg.cx, sg.cy, sg.rad*e, sg.val); pmx=mx;pmy=my; }      /* ...and blooms into it, becoming the face's colour */
        else if(idle>1.5){ wander(mx,my,ns); pmx=mx;pmy=my; }                          /* inactive: turn into a Pac-Man and wander off */
        else follow(mx,my, (my>hb.bottom?BRUSH*0.5:BRUSH));                            /* steady size (no velocity growth) */
      }
      wasHeart=(cursorZone==='heart');
    }
    /* heart explosion sparks: fly out from the heart and fade */
    for(var hi=hsparks.length-1;hi>=0;hi--){ var hsp=hsparks[hi]; hsp.x+=hsp.vx; hsp.y+=hsp.vy; hsp.vx*=0.88; hsp.vy*=0.88; hsp.life-=0.06;
      if(hsp.life<=0){ hsparks.splice(hi,1); continue; } dep(hsp.x, hsp.y, 0.45+0.45*hsp.life, 1.6); }
    /* bottom marquee: always on, locked above the CTA paragraph, independent of the cursor */
    if(ctaMeta){ var _mr=ctaMeta.getBoundingClientRect();
      if(_mr.bottom>0 && _mr.top<H+260){ txtScroll+=0.14; stampText(0, _mr.top-(TOUCH?195:235)); } }   /* sit the marquee a touch lower on phones; global decay matches so no extra pass needed */
    if(ns<eggUntil) stampWord(); if(ns<heartUntil) stampBigHeart();
    if(charging){ var chg=Math.min((ns-chT0)/2.2,1); dep(chx,chy, 0.45+chg*0.5, BRUSH*(2+chg*8)); if(shake<0.12+chg*0.35) shake=0.12+chg*0.35; }
    /* (hover frame is drawn straight to canvas after the field, so it never streaks the heat on scroll) */
    for(var wi=waves.length-1;wi>=0;wi--){ var wv=waves[wi], age=ns-wv.t0; if(age>1.5){waves.splice(wi,1);continue;}
      var pw=wv.pow||1, R=age*Math.hypot(W,H)*1.7, sig=cell*5.5*pw, amp=Math.max(0,1-age/1.5)*1.2*pw, inv=1/(2*sig*sig);
      for(var r=0;r<rows;r++)for(var c=0;c<cols;c++){ var dx=(c+.5)*cell-wv.x, dy=(r+.5)*cell-wv.y, dd=Math.sqrt(dx*dx+dy*dy), g=amp*Math.exp(-((dd-R)*(dd-R))*inv); if(g>0.02){ var id=r*cols+c; if(g>heat[id])heat[id]=g;
        if((r+0.5)*cell>hb.bottom && g>0.25 && dis[id]===0) dis[id]=0.45+hsh(c,r)*0.7; } } }
    sData=null;
    ctx.save(); if(shake>0.01){ shake*=0.9; ctx.translate((Math.random()-0.5)*shake*20,(Math.random()-0.5)*shake*20); } else shake=0;
    ctx.clearRect(-40,-40,W+80,H+80); ctx.fillStyle='#fff'; ctx.fillRect(-40,-40,W+80,H+80);
    /* grid + field are document-aligned, so they scroll with the page instead of being pinned to the viewport */
    var sy=TOUCH?0:scrollY, off=sy-Math.floor(sy/cell)*cell, s=cell-1;   /* on touch, lock the field to the viewport so iOS momentum scroll cannot make it jitter */
    ctx.strokeStyle='#fafafa'; ctx.lineWidth=1; ctx.beginPath();
    for(var gx=0;gx<=W;gx+=cell){ctx.moveTo(gx+.5,0);ctx.lineTo(gx+.5,H);}
    for(var gy=-off;gy<=H;gy+=cell){ctx.moveTo(0,gy+.5);ctx.lineTo(W,gy+.5);}
    ctx.stroke();
    var drStart=Math.floor(sy/cell)-1, drEnd=Math.floor((sy+H)/cell)+1;
    /* colour field is full below the header through the viewport, then fades out (ragged) by the next section */
    if(fhb<0) fhb=hb.bottom; else fhb += (hb.bottom-fhb)*(TOUCH?0.2:1);   /* ease the fade edge on touch so it glides instead of stepping */
    var hAmp=H*0.14, heroBottom=fhb+sy, heroEnd=heroBottom*0.55, fadeSpan=Math.max(1, heroBottom*0.18);   /* H (cached) not live innerHeight; span clamped positive so field is fully off past the hero */
    for(var dr=drStart; dr<=drEnd; dr++){
      var vy=dr*cell-sy, ccyView=vy+cell*0.5, vr=Math.floor(ccyView/cell), inRow=(vr>=0&&vr<rows);
      var dd=dr*cell, ny=(dr*cell)/H;
      for(var c2=0;c2<cols;c2++){ var ccx=(c2+.5)*cell, nx=(c2*cell)/innerWidth;
        /* ragged & random cutoff: smooth column waves + blocky random patches fade out earlier (below the viewport) */
        var co=Math.max(0,(Math.sin(c2*0.5+SEED)+Math.sin(c2*0.21-SEED*1.3))*0.16 + hsh(Math.floor(c2/2)+3.3,Math.floor(dr/4))*0.6 + 0.15), depthN=dd+co*hAmp;
        var regThr=depthN<=heroEnd?0:Math.min(1,(depthN-heroEnd)/fadeSpan);
        var safe=false; for(var si=0;si<safes.length;si++){ var sf=safes[si];
          if(ccx>=sf[0]&&ccx<=sf[2]&&ccyView>=sf[1]&&ccyView<=sf[3]){ safe=true; break; }              /* core */
          var fz=sf[4]; if(ccx>=sf[0]-fz&&ccx<=sf[2]+fz&&ccyView>=sf[1]-fz&&ccyView<=sf[3]+fz && hsh(c2+9.1,dr+4.7)<0.55){ safe=true; break; } }   /* ragged edge */
        if(safe) continue;                                   /* keep the masthead title clear */
        var v=inRow?heat[vr*cols+c2]*0.9:0;                  /* cursor heat / explosion paints anywhere */
        if(region(nx,ny,tt) > regThr && hsh(c2*1.7+11.3, dr*1.3+5.1) < intro){   /* ambient field: clustered in blobs, revealed by intro */
          v += base(nx,ny,tt)+(hsh(c2,dr)-0.5)*0.12+Math.sin((c2*0.6+dr*0.8)+tt*1.7)*0.045; }
        if(v<0.30 && !(v>=0.86&&v<1.02))continue; var col=BANDS[0][1]; if(v>=BANDS[1][0])col=BANDS[1][1]; if(v>=BANDS[2][0])col=BANDS[2][1]; if(v>=BANDS[3][0])col=BANDS[3][1]; if(v>=0.86&&v<1.02)col='#d8ff00';
        ctx.fillStyle=col; ctx.fillRect(c2*cell, vy, s, s); } }
    ctx.restore();
  }
  function loop(ts){ if(!loop.l)loop.l=ts; var d=ts-loop.l; loop.l=ts; t+=d; typeT+=d/1000; introT+=d/1000;
    render(); requestAnimationFrame(loop); }
  (document.fonts&&document.fonts.ready?document.fonts.ready:Promise.resolve()).then(function(){ size(); });
  requestAnimationFrame(loop);

  /* cell / brush size controls */
  var pxctl=document.getElementById('pxctl');
  if(pxctl){ pxctl.addEventListener('click', function(e){ var btn=e.target.closest('button'); if(!btn) return;
    function pick(attr){ pxctl.querySelectorAll('button[data-'+attr+']').forEach(function(x){ x.classList.remove('on'); }); btn.classList.add('on'); }
    if(btn.dataset.cell!=null){ cell=+btn.dataset.cell; size(); pick('cell'); }
    else if(btn.dataset.brush!=null){ BRUSH=+btn.dataset.brush; pick('brush'); }
  }); }
})();

/* ===== reveals ===== */
(function(){ var io=new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } }); },{threshold:0.1, rootMargin:'0px 0px -8% 0px'});
  document.querySelectorAll('.reveal').forEach(function(el){
    var i=0, s=el.previousElementSibling;                                  /* index among .reveal siblings */
    while(s){ if(s.classList && s.classList.contains('reveal')) i++; s=s.previousElementSibling; }
    if(i) el.style.transitionDelay=(i*0.12)+'s';                           /* stagger so the headline leads and section content follows */
    io.observe(el); }); })();
/* intro lead: split into rendered lines and reveal them line by line */
(function(){
  var lead=document.querySelector('.intro .lead'); if(!lead) return;
  if(matchMedia('(prefers-reduced-motion: reduce)').matches){ lead.classList.add('ready'); return; }
  var orig=lead.innerHTML, revealed=false;
  function split(){
    lead.innerHTML=orig;
    if(!lead.clientWidth) return false;                                    /* not laid out yet */
    var toks=[];
    [].forEach.call(lead.childNodes, function(n){
      var em = n.nodeType===1 && n.tagName==='EM';
      String(n.textContent).split(/(\s+)/).forEach(function(p){ if(p.length) toks.push({t:p, em:em, sp:/^\s+$/.test(p)}); });
    });
    lead.textContent='';
    var ws=toks.map(function(tk){ var s=document.createElement('span'); s.textContent=tk.t; if(tk.em) s.style.color='var(--muted)'; if(tk.sp) s.setAttribute('data-sp','1'); lead.appendChild(s); return s; });
    var lines=[], cur=null, top=null;
    ws.forEach(function(s){
      if(s.getAttribute('data-sp') && top===null) return;                  /* skip a leading space */
      var t=s.offsetTop;
      if(top===null || Math.abs(t-top)>2){ cur=[]; lines.push(cur); top=t; }
      cur.push(s);
    });
    lead.textContent='';
    lines.forEach(function(arr,i){
      var ln=document.createElement('span'); ln.className='ln';
      var inner=document.createElement('span'); inner.style.transitionDelay=(i*0.1)+'s';   /* each line a beat after the last */
      arr.forEach(function(s){ s.removeAttribute('data-sp'); inner.appendChild(s); });
      ln.appendChild(inner); lead.appendChild(ln);
    });
    lead.classList.add('ready');                                            /* lines are in place (translated out of view) - safe to show without flashing raw text */
    if(revealed) lead.classList.add('in');
    return true;
  }
  function init(){
    if(!split()){ requestAnimationFrame(init); return; }                   /* wait until it has a width */
    new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting){ revealed=true; lead.classList.add('in'); } }); },{threshold:0}).observe(lead);   /* reveal as soon as any part is visible */
    var rt; addEventListener('resize', function(){ clearTimeout(rt); rt=setTimeout(function(){ lead.classList.remove('in'); split(); }, 200); });   /* re-flow lines on resize */
  }
  if(document.fonts && document.fonts.ready) document.fonts.ready.then(init); else init();
})();

/* ===== springy momentum carousels (iPhone feel) ===== */
(function(){
  document.querySelectorAll('[data-slider]').forEach(function(sl){
    var track=sl.firstElementChild, x=0, vel=0, dragging=false, lastX=0, lastT=0, maxX=0, raf=0, step=0, target=null, prevB=null, nextB=null, SNAP=!!(window.matchMedia&&matchMedia('(pointer:coarse)').matches);
    function bounds(){ maxX=Math.min(0, sl.clientWidth - track.scrollWidth); var c=track.children; step=c.length>1?Math.abs(c[1].getBoundingClientRect().left-c[0].getBoundingClientRect().left):sl.clientWidth; if(!step)step=sl.clientWidth; }
    function snapX(px){ if(!step)return Math.max(maxX,Math.min(0,px)); return Math.max(maxX,Math.min(0,Math.round(px/step)*step)); }
    bounds(); addEventListener('resize',function(){ bounds(); clampSpring(); });
    function apply(){ track.style.transform='translate3d('+x+'px,0,0)'; if(prevB){ prevB.disabled = x>=-0.5; nextB.disabled = x<=maxX+0.5; } }
    function clampSpring(){ if(x>0)x=0; if(x<maxX)x=maxX; apply(); }
    function run(){ raf=0;
      if(dragging){ apply(); return; }
      if(target!==null){                          /* smooth ease-out snap to the nearest slide (no overshoot) */
        x += (target - x)*0.18;
        if(Math.abs(target-x)<0.3){ x=target; target=null; apply(); return; }
        apply(); raf=requestAnimationFrame(run); return;
      }
      x+=vel; vel*=0.94;
      if(x>0){ x+=(0-x)*0.18; vel*=0.5; }                 /* rubber-band back */
      else if(x<maxX){ x+=(maxX-x)*0.18; vel*=0.5; }
      if(Math.abs(vel)>0.06 || x>0.5 || x<maxX-0.5){ apply(); raf=requestAnimationFrame(run); }
      else { x=Math.max(maxX, Math.min(0, Math.round(x/14)*14)); vel=0; apply(); }   /* settle on the pixel grid */
    }
    function kick(){ if(!raf) raf=requestAnimationFrame(run); }
    sl.addEventListener('pointerdown',function(e){ if(e.pointerType==='mouse'&&e.button!==0)return; e.preventDefault(); dragging=true; sl.classList.add('drag'); cancelAnimationFrame(raf); raf=0; lastX=e.clientX; lastT=performance.now(); vel=0; target=null; sl._sx=e.clientX; sl._moved=false; sl._downA=(e.target.closest?e.target.closest('a.slide'):null); try{sl.setPointerCapture(e.pointerId);}catch(_){} });
    sl.addEventListener('pointermove',function(e){ if(!dragging)return; var dx=e.clientX-lastX, now=performance.now(), dt=now-lastT||16;
      if(Math.abs(e.clientX-sl._sx)>5) sl._moved=true;
      var nx=x+dx; if(nx>0) nx=x+dx*0.35; else if(nx<maxX) nx=x+dx*0.35;   /* resistance past the ends */
      x=nx; vel=dx/dt*16; lastX=e.clientX; lastT=now; apply(); });
    function up(nav){ if(!dragging)return; dragging=false; sl.classList.remove('drag'); if(SNAP){ target=snapX(x + vel*8); vel=0; } kick();
      /* a press that didn't turn into a drag is a click: navigate the tile ourselves (pointer-capture eats the native click) */
      if(nav && !sl._moved && sl._downA){ var a=sl._downA; if(a.getAttribute('target')==='_blank'){ window.open(a.href,'_blank','noopener'); } else { location.href=a.href; } }
      sl._downA=null; }
    sl.addEventListener('pointerup',function(){ up(true); }); sl.addEventListener('pointercancel',function(){ up(false); });
    sl.addEventListener('wheel',function(e){ if(Math.abs(e.deltaX)<Math.abs(e.deltaY)) return; vel=0; x-=e.deltaX; clampSpring(); e.preventDefault(); },{passive:false});
    if(window.matchMedia && matchMedia('(hover:hover) and (pointer:fine)').matches){
      var mkArrow=function(cls,label,left,sign){
        var b=document.createElement('button'); b.type='button'; b.className='sl-arrow '+cls; b.setAttribute('aria-label',label);
        b.innerHTML = left
          ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 12H5"/><path d="m11 18-6-6 6-6"/></svg>'
          : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>';
        b.addEventListener('pointerdown',function(e){ e.stopPropagation(); });
        b.addEventListener('click',function(e){ e.preventDefault(); target=snapX(x + sign*step); kick(); });
        sl.appendChild(b); return b;
      };
      prevB=mkArrow('prev','Previous slides',true,1);
      nextB=mkArrow('next','Next slides',false,-1);
      apply();
    }
    track.querySelectorAll('a.slide').forEach(function(a){ a.addEventListener('click',function(e){ if(e.detail!==0) e.preventDefault(); }); });   /* pointer clicks navigate via pointerup; let keyboard (detail 0) use native nav */
    /* drop a "view ..." tell into each tile's image so the card reads as clickable on hover */
    var ctaLabel = sl.closest('#lab') ? 'View experiment' : 'View case study';
    track.querySelectorAll('a.slide.cs .csm').forEach(function(m){
      var c=document.createElement('span'); c.className='reveal-cta'; m.appendChild(c);   /* gradient layer */
      var clip=document.createElement('span'); clip.className='rc-clip';
      var inn=document.createElement('span'); inn.className='rc-i'; inn.textContent=ctaLabel;
      clip.appendChild(inn); m.appendChild(clip);   /* label layer, pinned at bottom so it steps up in place */
    });

    (document.fonts&&document.fonts.ready?document.fonts.ready:Promise.resolve()).then(function(){ bounds(); });
    requestAnimationFrame(function(){ bounds(); });
  });
})();

/* ===== snap each carousel vertically so the slide images sit on the pixel grid ===== */
(function(){
  function snapV(){
    document.querySelectorAll('.track-wrap').forEach(function(tw){
      tw.style.transform='none';
      var m=tw.querySelector('.slide .csm, .slide .pv'); if(!m) return;
      var top=m.getBoundingClientRect().top + (window.pageYOffset||document.documentElement.scrollTop||0);
      var off=((top%14)+14)%14; if(off>7) off-=14;            /* nudge to the nearest grid row */
      tw.style.transform='translateY('+(-off)+'px)';
    });
  }
  addEventListener('resize', snapV);
  (document.fonts&&document.fonts.ready?document.fonts.ready:Promise.resolve()).then(snapV);
  requestAnimationFrame(snapV); setTimeout(snapV,400);
})();

/* ===== live preview experiments inside the lab slides ===== */
(function(){
  var DPR=Math.min(devicePixelRatio||1,2), items=[];
  var PALS={ heat:['#1c2541','#3b5bd9','#f5c518','#e0492a'], camo:['#9aa0d6','#e0552e','#0A0A0A'], warm:['#7a1020','#e0492a','#f5c518'] };
  var FX={ kv:{type:'thermal',pal:PALS.heat,neon:true}, thermal:{type:'thermal',pal:PALS.warm,neon:false}, dots:{type:'dots'}, fluid:{type:'fluid'}, reveal:{type:'reveal'}, lab:{type:'thermal',pal:PALS.camo,neon:true} };
  function hsh(a){ var n=Math.sin(a)*43758.5453; return n-Math.floor(n); }
  document.querySelectorAll('.caro .slide .pv canvas').forEach(function(cv){
    var slide=cv.closest('.slide'), fx=FX[slide.getAttribute('data-fx')]||FX.kv;
    var o={cv:cv, ctx:cv.getContext('2d'), fx:fx, seed:Math.random()*100, w:0, h:0, t:Math.random()*1000, on:true, mx:-1, my:-1, hov:false, tm:document.createElement('canvas'), tmData:null};
    function size(){ var r=cv.getBoundingClientRect(); if(r.width<2)return; o.w=r.width; o.h=r.height; cv.width=Math.round(r.width*DPR); cv.height=Math.round(r.height*DPR); o.ctx.setTransform(DPR,0,0,DPR,0,0);
      if(fx.type==='reveal'){ var cl=8, tc=Math.ceil(r.width/cl), tr=Math.ceil(r.height/cl); o.tm.width=tc; o.tm.height=tr; var m=o.tm.getContext('2d'); m.clearRect(0,0,tc,tr); m.fillStyle='#000'; m.textAlign='center'; m.textBaseline='middle'; m.font='600 '+(tr*0.46)+'px Sneak,sans-serif'; m.fillText('WILD', tc/2, tr/2); o.tmData=m.getImageData(0,0,tc,tr).data; o.tc=tc; o.tr=tr; o.cl=cl; } }
    o.size=size; new ResizeObserver(size).observe(cv);
    slide.addEventListener('pointermove',function(e){ var r=cv.getBoundingClientRect(); o.mx=e.clientX-r.left; o.my=e.clientY-r.top; o.hov=true; });
    slide.addEventListener('pointerleave',function(){ o.hov=false; o.mx=-1; });
    items.push(o);
  });
  var io=new IntersectionObserver(function(es){ es.forEach(function(e){ items.forEach(function(o){ if(o.cv.closest('.slide')===e.target) o.on=e.isIntersecting; }); }); },{threshold:0.01});
  items.forEach(function(o){ io.observe(o.cv.closest('.slide')); });
  function pt(o,tt){ return [ o.hov&&o.mx>0?o.mx:o.w*(0.5+0.34*Math.sin(tt*0.5+o.seed)), o.hov&&o.my>0?o.my:o.h*(0.5+0.34*Math.cos(tt*0.6+o.seed)) ]; }
  function grid(ctx,w,h,cl){ ctx.strokeStyle='#ededed'; ctx.lineWidth=1; ctx.beginPath(); for(var x=0;x<=w;x+=cl){ctx.moveTo(x+.5,0);ctx.lineTo(x+.5,h);} for(var y=0;y<=h;y+=cl){ctx.moveTo(0,y+.5);ctx.lineTo(w,y+.5);} ctx.stroke(); }
  function thermal(o){ var ctx=o.ctx,w=o.w,h=o.h,tt=o.t*0.001,s=o.seed,cell=9,cols=Math.ceil(w/cell),rows=Math.ceil(h/cell),pal=o.fx.pal,p=pt(o,tt);
    ctx.clearRect(0,0,w,h); ctx.fillStyle='#fff'; ctx.fillRect(0,0,w,h);
    for(var r=0;r<rows;r++)for(var c=0;c<cols;c++){ var nx=c/cols,ny=r/rows, v=0.5+0.5*(Math.sin(nx*6+s+tt*0.3)*Math.cos(ny*5-s+tt*0.2)+Math.sin((nx+ny)*5+s))/1.6;
      var dx=(c+.5)*cell-p[0],dy=(r+.5)*cell-p[1],dd=Math.sqrt(dx*dx+dy*dy); v+=Math.max(0,1-dd/120)*0.5; v+=(hsh(c*12.9+r*78.2+s)-0.5)*0.12; if(v<0.34)continue;
      var col=pal[0]; for(var k=1;k<pal.length;k++){ if(v>=0.34+0.62*(k/pal.length)) col=pal[k]; } if(o.fx.neon&&v>=0.9)col='#d8ff00';
      ctx.fillStyle=col; ctx.fillRect(c*cell,r*cell,cell-1,cell-1); } grid(ctx,w,h,cell); }
  function dots(o){ var ctx=o.ctx,w=o.w,h=o.h,tt=o.t*0.001,p=pt(o,tt),step=14; ctx.clearRect(0,0,w,h); ctx.fillStyle='#fff'; ctx.fillRect(0,0,w,h);
    for(var y=step;y<h;y+=step)for(var x=step;x<w;x+=step){ var dx=x-p[0],dy=y-p[1],d=Math.sqrt(dx*dx+dy*dy)||1,f=Math.max(0,1-d/120),ox=x+dx/d*f*16,oy=y+dy/d*f*16,sz=1.6+f*4.5;
      ctx.fillStyle=f>0.55?'#e0492a':'#0A0A0A'; ctx.globalAlpha=0.3+f*0.7; ctx.fillRect(ox-sz/2,oy-sz/2,sz,sz); } ctx.globalAlpha=1; }
  function fluid(o){ var ctx=o.ctx,w=o.w,h=o.h,tt=o.t*0.001,p=pt(o,tt),step=15; ctx.clearRect(0,0,w,h); ctx.fillStyle='#fff'; ctx.fillRect(0,0,w,h); ctx.lineWidth=1.4;
    for(var y=step;y<h;y+=step)for(var x=step;x<w;x+=step){ var dx=x-p[0],dy=y-p[1],d=Math.sqrt(dx*dx+dy*dy)||1,f=Math.max(0,1-d/150),a=Math.atan2(dy,dx)+Math.PI/2+Math.sin(tt+d*0.02)*0.6,len=3+f*15;
      ctx.strokeStyle='#3b5bd9'; ctx.globalAlpha=0.14+f*0.7; ctx.beginPath(); ctx.moveTo(x-Math.cos(a)*len,y-Math.sin(a)*len); ctx.lineTo(x+Math.cos(a)*len,y+Math.sin(a)*len); ctx.stroke(); } ctx.globalAlpha=1; }
  function reveal(o){ var ctx=o.ctx,w=o.w,h=o.h,cl=o.cl||8,tc=o.tc,tr=o.tr; ctx.clearRect(0,0,w,h); ctx.fillStyle='#fff'; ctx.fillRect(0,0,w,h); if(!o.tmData){ return; }
    var sweep=((o.t*0.00055)%1.5), tick=Math.floor(o.t*0.016);
    for(var r=0;r<tr;r++)for(var c=0;c<tc;c++){ if(o.tmData[(r*tc+c)*4+3]<60)continue; var ra=c/tc;
      if(sweep>=ra){ ctx.fillStyle='#0A0A0A'; ctx.fillRect(c*cl,r*cl,cl-1,cl-1); }
      else if(sweep>ra-0.16){ if(hsh(c+tick*0.7+r*3.1)<0.5){ ctx.fillStyle='#e0552e'; ctx.fillRect(c*cl,r*cl,cl-1,cl-1); } } }
    grid(ctx,w,h,cl); }
  function draw(o){ var ty=o.fx.type; if(ty==='dots')dots(o); else if(ty==='fluid')fluid(o); else if(ty==='reveal')reveal(o); else thermal(o); }
  var last=0; function loop(ts){ var d=ts-last; last=ts; for(var i=0;i<items.length;i++){ var o=items[i]; if(!o.w){ o.size(); continue; } if(!o.on) continue; o.t+=d; draw(o); } requestAnimationFrame(loop); }
  (document.fonts&&document.fonts.ready?document.fonts.ready:Promise.resolve()).then(function(){ items.forEach(function(o){o.size();}); });
  requestAnimationFrame(loop);
})();

/* mobile-safe playback: muted property + gesture unlock, and only decode on-screen videos */
(function(){ var vids=[].slice.call(document.querySelectorAll('video[autoplay]')); if(!vids.length) return;
  vids.forEach(function(v){ v.muted=true; v.defaultMuted=true; v.setAttribute('muted',''); v.playsInline=true; v.setAttribute('playsinline',''); v.setAttribute('webkit-playsinline',''); });
  function play(v){ v.muted=true; var p=v.play(); if(p&&p.catch)p.catch(function(){}); }
  function vis(v){ var r=v.getBoundingClientRect(); return r.bottom>-40 && r.top<innerHeight+40 && r.right>0 && r.left<innerWidth; }
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){ es.forEach(function(e){ var v=e.target; if(e.isIntersecting) play(v); else { try{ v.pause(); }catch(_){} } }); }, {threshold:0.15, rootMargin:'120px 0px'});
    vids.forEach(function(v){ io.observe(v); });
  } else { vids.forEach(play); }
  function unlock(){ vids.forEach(function(v){ if(vis(v)) play(v); }); }            /* a real touch unlocks muted autoplay on iOS */
  ['touchstart','pointerdown','click'].forEach(function(ev){ addEventListener(ev, unlock, {once:true, passive:true}); });
})();

/* super-slight smooth scroll (pointer devices only; touch keeps native momentum) */
(function(){ if(!window.matchMedia) return;
  if(matchMedia('(hover: none)').matches || matchMedia('(pointer: coarse)').matches || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var target=window.scrollY||0, cur=target, raf=0;
  function maxY(){ return Math.max(0, document.documentElement.scrollHeight - innerHeight); }
  function run(){ var d=target-cur; if(Math.abs(d)<0.4){ cur=target; window.scrollTo({top:cur,behavior:'instant'}); raf=0; return; } cur+=d*0.18; window.scrollTo({top:cur,behavior:'instant'}); raf=requestAnimationFrame(run); }
  addEventListener('wheel',function(e){ if(e.ctrlKey||e.defaultPrevented) return; if(!raf){ cur=target=window.scrollY; } var dy=e.deltaY*(e.deltaMode===1?16:(e.deltaMode===2?innerHeight:1)); target=Math.max(0,Math.min(maxY(),target+dy)); if(!raf)raf=requestAnimationFrame(run); e.preventDefault(); },{passive:false});
  addEventListener('keydown',function(){ if(!raf){ cur=target=window.scrollY; } });
  addEventListener('resize',function(){ cur=target=window.scrollY; });
})();



/* ===== generative visualisations: process stages + brand-context-protocol parts ===== */
(function(){
  var HEAT=['#1c2541','#3b5bd9','#f5c518','#e0492a'], GREY=['#e4e4e4','#c8c8c8','#a6a6a6','#727272'], NEON='#d8ff00', DPR=Math.min(devicePixelRatio||1,2), PX=6;
  var ORDER={explore:0,generate:1,refine:2,scale:3};
  function mix(a,b,t){ var ar=parseInt(a.slice(1,3),16),ag=parseInt(a.slice(3,5),16),ab=parseInt(a.slice(5,7),16),br=parseInt(b.slice(1,3),16),bg=parseInt(b.slice(3,5),16),bb=parseInt(b.slice(5,7),16); return 'rgb('+((ar+(br-ar)*t)|0)+','+((ag+(bg-ag)*t)|0)+','+((ab+(bb-ab)*t)|0)+')'; }
  function rnd(s){ var x=Math.sin(s*12.9898)*43758.5453; return x-Math.floor(x); }
  var items=[];
  document.querySelectorAll('canvas[data-viz]').forEach(function(cv){
    var host=cv.closest('.donut')||cv.closest('.slide')||cv.parentElement;
    var o={cv:cv,ctx:cv.getContext('2d'),kind:cv.getAttribute('data-viz'),host:host,w:0,h:0,t:Math.random()*1000,on:true,hov:false,st:null,pmx:0,pmy:0,pin:false,pstr:0};
    function size(){ var r=cv.getBoundingClientRect(); if(r.width<2)return; o.w=r.width;o.h=r.height; cv.width=Math.round(r.width*DPR); cv.height=Math.round(r.height*DPR); o.ctx.setTransform(DPR,0,0,DPR,0,0); o.st=null; }
    o.size=size; new ResizeObserver(size).observe(cv);
    /* protocol parts: track the cursor so the diamonds react to it */
    if(/^(truth|skills|output|check)$/.test(o.kind)){
      cv.addEventListener('pointermove',function(e){ var r=cv.getBoundingClientRect(); o.pmx=e.clientX-r.left; o.pmy=e.clientY-r.top; o.pin=true; o.hov=true; },{passive:true});
      cv.addEventListener('pointerleave',function(){ o.pin=false; o.hov=false; });
    }
    items.push(o);
  });
  var io=new IntersectionObserver(function(es){ es.forEach(function(e){ items.forEach(function(o){ if(o.host===e.target)o.on=e.isIntersecting; }); }); },{threshold:0.02});
  items.forEach(function(o){ if(o.host) io.observe(o.host); });
  function bg(o){ o.ctx.clearRect(0,0,o.w,o.h); if(/^(explore|generate|refine|scale|truth|skills|output|check)$/.test(o.kind)) return;   /* process + protocol visuals stay transparent so the page grid shows through */ o.ctx.fillStyle='#fff'; o.ctx.fillRect(0,0,o.w,o.h); }
  function grid(o){ if(/^(explore|generate|refine|scale|truth|skills|output|check)$/.test(o.kind)) return;   /* no background grid on the process + protocol visuals */
    var c=o.ctx; c.strokeStyle='#fafafa'; c.lineWidth=1; c.beginPath(); for(var x=0;x<=o.w;x+=14){c.moveTo(x+.5,0);c.lineTo(x+.5,o.h);} for(var y=0;y<=o.h;y+=14){c.moveTo(0,y+.5);c.lineTo(o.w,y+.5);} c.stroke(); }
  function px(c,x,y,col,a){ c.globalAlpha=(a==null?1:a); c.fillStyle=col; c.fillRect(Math.round(x/PX)*PX, Math.round(y/PX)*PX, PX-1, PX-1); }
  function explore(o){ var c=o.ctx,N=30,sp=o.hov?2.0:0.95; if(!o.st){ o.st=[]; for(var i=0;i<N;i++)o.st.push({x:rnd(i+1)*o.w,y:rnd(i+7)*o.h,a:rnd(i+3)*6.28,col:HEAT[i%4]}); }
    bg(o); grid(o);
    for(var i=0;i<o.st.length;i++){ var d=o.st[i]; d.a+=(rnd(i+((o.t*0.002)|0))-0.5)*0.6; d.x+=Math.cos(d.a)*sp; d.y+=Math.sin(d.a)*sp;
      if(d.x<6){d.x=6;d.a=Math.PI-d.a;} if(d.x>o.w-6){d.x=o.w-6;d.a=Math.PI-d.a;} if(d.y<6){d.y=6;d.a=-d.a;} if(d.y>o.h-6){d.y=o.h-6;d.a=-d.a;}
      px(c,d.x,d.y,d.col,1); } c.globalAlpha=1; }
  function generate(o){ var c=o.ctx,cell=PX,cols=Math.ceil(o.w/cell),nr=Math.ceil(o.h/cell)+1; bg(o); grid(o); var tt=o.t*(o.hov?0.011:0.0055);
    for(var cx=0;cx<cols;cx++){ if(rnd(cx+3)>0.45) continue;
      var speed=0.45+rnd(cx+1)*0.8, off=(tt*speed)%1, hot=rnd(cx*5)>0.72;
      for(var y=0;y<nr;y++){ if(rnd(cx*7+y)>0.45) continue;
        var yy=(y+off*nr)%nr, py=yy*cell, a=1-yy/nr;
        c.globalAlpha=0.5*a; c.fillStyle=(hot&&rnd(cx+y*3)>0.55)?HEAT[(rnd(cx)*4)|0]:'#1c2541'; c.fillRect(cx*cell,py,cell-1,cell-1); } }
    c.globalAlpha=1; }
  function refine(o){ var c=o.ctx,N=120; if(!o.st){ o.st=[]; for(var i=0;i<N;i++)o.st.push({a:i/N*6.28, nx:rnd(i+1), ny:rnd(i+5)}); }
    bg(o); grid(o); var cyc=Math.sin(o.t*0.001*(o.hov?1.6:0.7))*0.5+0.5, cx=o.w/2,cy=o.h/2,R=Math.min(o.w,o.h)*0.32;
    for(var i=0;i<o.st.length;i++){ var d=o.st[i], tx=cx+Math.cos(d.a)*R, ty=cy+Math.sin(d.a)*R, nx=cx+(d.nx-0.5)*o.w*0.92, ny=cy+(d.ny-0.5)*o.h*0.92;
      var x=nx+(tx-nx)*cyc, y=ny+(ty-ny)*cyc; px(c,x,y, cyc>0.82?'#1c2541':HEAT[i%4], 0.3+cyc*0.7); } c.globalAlpha=1; }
  function scale(o){ var c=o.ctx,cell=PX*2,cols=Math.ceil(o.w/cell),rows=Math.ceil(o.h/cell); bg(o); grid(o);
    var wave=(o.t*0.001*(o.hov?1.3:0.6))%2.6, cx=o.w/2,cy=o.h/2,maxd=Math.hypot(cx,cy);
    for(var r=0;r<rows;r++)for(var cc=0;cc<cols;cc++){ var x=cc*cell+cell/2,y=r*cell+cell/2,dd=Math.hypot(x-cx,y-cy)/maxd, act=Math.max(0,1-Math.abs(dd*2.2-wave)*3);
      if(act<0.05){ px(c,x,y,'#1c2541',0.1); continue; }
      var col=act>0.6?HEAT[3]:act>0.38?HEAT[2]:act>0.18?HEAT[1]:HEAT[0]; px(c,x,y,col,0.3+act*0.7); } c.globalAlpha=1; }
  /* the four protocol parts as one diamond-tessellation language, drawn at the page's 9px grid size,
     snapped to the canvas-local grid so it stays rock-steady while scrolling, with cursor interaction:
     diamonds swell, light toward neon, and get pushed away under the pointer */
  var C9=9;
  function px9(o,x,y,col,a){ var c=o.ctx; c.globalAlpha=(a==null?1:a); c.fillStyle=col; c.fillRect(Math.round(x/C9)*C9, Math.round(y/C9)*C9, C9-1, C9-1); }
  function diam(o,cx,cy,r,col,a){ var n=Math.round(r/C9),i,j; for(i=-n;i<=n;i++)for(j=-n;j<=n;j++){ if(Math.abs(i)+Math.abs(j)<=n) px9(o,cx+i*C9,cy+j*C9,col,a); } }
  function hb(o,x,y){ if(o.pstr<=0.001)return 0; var dx=x-o.pmx,dy=y-o.pmy,R=Math.min(o.w,o.h)*0.42,d=Math.sqrt(dx*dx+dy*dy); if(d>=R)return 0; var b=1-d/R; return b*b*o.pstr; }
  function rep(o,cx,cy,b){ if(b<=0)return null; var dx=cx-o.pmx,dy=cy-o.pmy,d=Math.sqrt(dx*dx+dy*dy)||1,R=Math.min(o.w,o.h)*0.42,push=b*Math.min(o.w,o.h)*0.30*Math.min(1,d/(R*0.4)); return [cx+dx/d*push, cy+dy/d*push]; }
  function dDiam(o,cx,cy,r,col,a){ var b=hb(o,cx,cy),p=rep(o,cx,cy,b); diam(o,p?p[0]:cx,p?p[1]:cy, r*(1+b*0.3), b>0.02?mix(col,NEON,Math.min(1,b)):col, a==null?1:a); }
  function tessViz(o){ var c=o.ctx; bg(o); grid(o); o.pstr+=((o.pin?1:0)-o.pstr)*0.14; var tt=o.t*0.001,cx=o.w/2,cy=o.h/2,m=Math.min(o.w,o.h),k=o.kind,i,x,y;
    if(k==='truth'){ var RD=Math.max(C9*2,(m*0.32)|0),n=Math.round(RD/C9),inner=Math.round(n*0.42),wave=(1-((o.t*0.0005)%1))*(n+2)-1,j;
      for(i=-n;i<=n;i++)for(j=-n;j<=n;j++){ var d=Math.abs(i)+Math.abs(j); if(d>n)continue; var base=d<=inner?HEAT[3]:HEAT[2],pulse=Math.max(0,1-Math.abs(d-wave)/1.6),col=pulse>0.04?mix(base,'#ffffff',pulse*0.6):base,cxp=cx+i*C9,cyp=cy+j*C9,bb=hb(o,cxp,cyp),pp=rep(o,cxp,cyp,bb); if(bb>0.02)col=mix(col,NEON,Math.min(1,bb)); px9(o,pp?pp[0]:cxp,pp?pp[1]:cyp,col,1); } }
    else if(k==='skills'){ var RD2=Math.max(C9*2,(m*0.19)|0),step=RD2+C9*2,offs=[[0,0],[1,0],[0,1],[-1,0],[0,-1]],gr=ss3((o.t%3200)/3200),n=1+Math.floor(gr*4); for(i=0;i<n;i++) dDiam(o,cx+offs[i][0]*step,cy+offs[i][1]*step,(RD2*0.7)|0,i?HEAT[1]:HEAT[2],1); }
    else if(k==='output'){ var rd=Math.max(C9,(m*0.11)|0),st=rd+C9,reveal=ss3((o.t%4000)/4000); for(x=-st;x<o.w+st;x+=st)for(y=-st;y<o.h+st;y+=st){ var dd=Math.hypot(x-cx,y-cy)/m; if(dd>reveal*1.4)continue; dDiam(o,x,y,rd, dd<0.18?HEAT[3]:dd<0.4?HEAT[2]:HEAT[1],0.95); } }
    else { var rd2=Math.max(C9,(m*0.16)|0),st2=rd2+C9*2,sweep=((tt*0.4)%1.3)*o.w; for(x=st2*0.5;x<o.w;x+=st2)for(y=st2*0.5;y<o.h;y+=st2){ var lit=Math.abs(x-sweep)<st2*0.6,b=hb(o,x,y),pp=rep(o,x,y,b),base=lit?NEON:(x<sweep?HEAT[2]:'#dcdcdc'),col=b>0.02?mix(base,NEON,Math.min(1,b)):base; diam(o,pp?pp[0]:x,pp?pp[1]:y, rd2*0.8*(1+b*0.3), col, lit?1:(x<sweep?0.9:0.55)); } }
    c.globalAlpha=1; }
  /* --- 3D story engine (ported from the keyvisual lab); these viz stay transparent so the page grid shows behind --- */
  var SH3={};
  function gCube(M){ var pts=[],defs=[[0,1,2,1],[0,1,2,-1],[1,2,0,1],[1,2,0,-1],[2,0,1,1],[2,0,1,-1]]; for(var f=0;f<6;f++){ var d=defs[f],a=d[0],b=d[1],c2=d[2],sg=d[3]; for(var i=0;i<M;i++)for(var j=0;j<M;j++){ var P=[0,0,0],N=[0,0,0]; P[a]=i/(M-1)*2-1; P[b]=j/(M-1)*2-1; P[c2]=sg; N[c2]=sg; pts.push([P[0]*0.82,P[1]*0.82,P[2]*0.82,N[0],N[1],N[2]]); } } return pts; }
  function gTorus(){ var pts=[],R=0.7,r=0.32,NU=80,NV=30; for(var i=0;i<NU;i++)for(var j=0;j<NV;j++){ var u=i/NU*6.2832,v=j/NV*6.2832,cu=Math.cos(u),su=Math.sin(u),cv=Math.cos(v),sv=Math.sin(v); pts.push([(R+r*cv)*cu,(R+r*cv)*su,r*sv, cv*cu,cv*su,sv]); } return pts; }
  function gSphere(N){ var pts=[],off=2/N,inc=Math.PI*(3-Math.sqrt(5)); for(var i=0;i<N;i++){ var y=i*off-1+off/2, rr=Math.sqrt(Math.max(0,1-y*y)), phi=i*inc, x=Math.cos(phi)*rr, z=Math.sin(phi)*rr; pts.push([x,y,z,x,y,z]); } return pts; }
  function gCloud(N){ var pts=[]; for(var i=0;i<N;i++){ var a=rnd(i*1.3)*6.2832, b=Math.acos(2*rnd(i*2.7)-1), rr=0.5+rnd(i*0.7)*0.6, x=Math.sin(b)*Math.cos(a)*rr, y=Math.cos(b)*rr, z=Math.sin(b)*Math.sin(a)*rr; pts.push([x,y,z,x,y,z]); } return pts; }
  function faceSample(V,F,D,sc){ var pts=[]; for(var f=0;f<F.length;f++){ var a=V[F[f][0]],b=V[F[f][1]],c=V[F[f][2]], nx=a[0]+b[0]+c[0],ny=a[1]+b[1]+c[1],nz=a[2]+b[2]+c[2],nl=Math.hypot(nx,ny,nz)||1; nx/=nl;ny/=nl;nz/=nl; for(var i=0;i<=D;i++)for(var j=0;j<=D-i;j++){ var u=i/D,v=j/D,w=1-u-v; pts.push([(a[0]*u+b[0]*v+c[0]*w)*sc,(a[1]*u+b[1]*v+c[1]*w)*sc,(a[2]*u+b[2]*v+c[2]*w)*sc,nx,ny,nz]); } } return pts; }
  function gIcosa(D){ var p=(1+Math.sqrt(5))/2, nl=Math.hypot(1,p,0), V=[[-1,p,0],[1,p,0],[-1,-p,0],[1,-p,0],[0,-1,p],[0,1,p],[0,-1,-p],[0,1,-p],[p,0,-1],[p,0,1],[-p,0,-1],[-p,0,1]].map(function(q){return [q[0]/nl,q[1]/nl,q[2]/nl];}), F=[[0,11,5],[0,5,1],[0,1,7],[0,7,10],[0,10,11],[1,5,9],[5,11,4],[11,10,2],[10,7,6],[7,1,8],[3,9,4],[3,4,2],[3,2,6],[3,6,8],[3,8,9],[4,9,5],[2,4,11],[6,2,10],[8,6,7],[9,8,1]]; return faceSample(V,F,D,0.96); }
  function shp3(kind){ if(SH3[kind])return SH3[kind]; var pts=kind==='icosa'?gIcosa(9):kind==='torus'?gTorus():kind==='sphere'?gSphere(1300):kind==='cloud'?gCloud(900):gCube(18);
    var scat=pts.map(function(_,i){ var a=rnd(i*5.1)*6.2832, b=Math.acos(2*rnd(i*7.3)-1), rr=1.5+rnd(i*3.9)*0.7; return [Math.sin(b)*Math.cos(a)*rr, Math.cos(b)*rr, Math.sin(b)*Math.sin(a)*rr]; });
    SH3[kind]={pts:pts,scat:scat}; return SH3[kind]; }
  function ss3(x){ x=x<0?0:x>1?1:x; return x*x*(3-2*x); }
  function paint3(o,pts,ax,ay){ var c=o.ctx; bg(o); grid(o); var cc0=(o.col==null)?(o.active?1:0):o.col, PAL=[mix(GREY[0],HEAT[0],cc0),mix(GREY[1],HEAT[1],cc0),mix(GREY[2],HEAT[2],cc0),mix(GREY[3],HEAT[3],cc0)], NE=mix(GREY[3],NEON,cc0);
    var ca=Math.cos(ax),sa=Math.sin(ax),cb=Math.cos(ay),sb=Math.sin(ay), scale=Math.min(o.w,o.h)*0.44, cx=o.w/2, cy=o.h/2, f=3.2, lx=0.4,ly=-0.5,lz=0.76;
    var cols=Math.ceil(o.w/PX), rows=Math.ceil(o.h/PX); if(!o._g||o._g.length!==cols*rows)o._g=new Float32Array(cols*rows); var G=o._g; for(var gi=0;gi<G.length;gi++)G[gi]=0;
    for(var p=0;p<pts.length;p++){ var Q=pts[p], x=Q[0],y=Q[1],z=Q[2];
      var y1=y*ca-z*sa, z1=y*sa+z*ca, x2=x*cb+z1*sb, z2=-x*sb+z1*cb;
      var nx=Q[3],ny=Q[4],nz=Q[5], ny1=ny*ca-nz*sa, nz1=ny*sa+nz*ca, nx2=nx*cb+nz1*sb, nz2=-nx*sb+nz1*cb;
      if(nz2<-0.12)continue; var per=f/(f-z2), sx=cx+x2*scale*per, sy=cy+y1*scale*per, cc=(sx/PX)|0, rr=(sy/PX)|0;
      if(cc<0||rr<0||cc>=cols||rr>=rows)continue; var sh=0.5+0.5*(nx2*lx+ny1*ly+nz2*lz), val=sh*0.7+((z2+1)/2)*0.4, id=rr*cols+cc; if(val>G[id])G[id]=val; }
    for(var r2=0;r2<rows;r2++)for(var c3=0;c3<cols;c3++){ var v=G[r2*cols+c3]; if(v<0.18)continue; var col=PAL[0]; if(v>=0.40)col=PAL[1]; if(v>=0.62)col=PAL[2]; if(v>=0.82)col=PAL[3]; if(v>=0.96)col=NE; c.fillStyle=col; c.fillRect(c3*PX,r2*PX,PX-1,PX-1); } }
  function b_solid(o,k){ var S=shp3(k),tt=o.t*0.001; paint3(o,S.pts,0.6+Math.sin(tt*0.2)*0.12, tt*(o.hov?0.55:0.3)); }
  function b_assemble(o,k){ var S=shp3(k),tt=o.t*0.001,ph=(o.t%4200)/4200,a=ph<0.55?ss3(ph/0.55):1-ss3((ph-0.55)/0.45),P=S.pts,Sc=S.scat,n=P.length,out=new Array(n);
    for(var i=0;i<n;i++){ var p=P[i],s=Sc[i]; out[i]=[s[0]+(p[0]-s[0])*a, s[1]+(p[1]-s[1])*a, s[2]+(p[2]-s[2])*a, p[3],p[4],p[5]]; } paint3(o,out,0.6, tt*0.3); }
  function b_refine(o,k){ var S=shp3(k),tt=o.t*0.001,ph=(o.t%3600)/3600,nzz=(1-ss3(ph))*0.85,seed=(o.t/380|0),P=S.pts,n=P.length,out=new Array(n);
    for(var i=0;i<n;i++){ var p=P[i]; out[i]=[p[0]+(rnd(i*1.1+seed)-0.5)*nzz, p[1]+(rnd(i*2.2+seed)-0.5)*nzz, p[2]+(rnd(i*3.3+seed)-0.5)*nzz, p[3],p[4],p[5]]; } paint3(o,out,0.6, tt*0.3); }
  function b_cloud(o){ var S=shp3('cloud'),tt=o.t*0.001,P=S.pts,n=P.length,out=new Array(n);
    for(var i=0;i<n;i++){ var p=P[i],d=tt+i*0.7; out[i]=[p[0]+Math.sin(d*0.7)*0.13, p[1]+Math.cos(d*0.6)*0.13, p[2]+Math.sin(d*0.5+1)*0.13, p[3],p[4],p[5]]; } paint3(o,out,0.6, tt*0.22); }
  function b_replicate(o){ var S=shp3('cube'),tt=o.t*0.001,ph=(o.t%4200)/4200,n=1+Math.floor(ss3(ph)*7),offs=[[0,0,0],[1,0,0],[0,1,0],[1,1,0],[0,0,1],[1,0,1],[0,1,1],[1,1,1]],P=S.pts,out=[];
    for(var g=0;g<n;g++){ var oo=offs[g],ox=(oo[0]-0.5)*1.5,oy=(oo[1]-0.5)*1.5,oz=(oo[2]-0.5)*1.5; for(var i=0;i<P.length;i++){ var p=P[i]; out.push([p[0]*0.4+ox, p[1]*0.4+oy, p[2]*0.4+oz, p[3],p[4],p[5]]); } } paint3(o,out,0.6, tt*0.3); }
  /* one transforming visual read across the four stages: random -> sphere -> octahedron -> many octahedra (shared index-aligned point sets) */
  var MORPH=null;
  function morphSets(){ if(MORPH)return MORPH; var N=2000,R=[],C=[],O=[],OF=[[1,1,1],[1,1,-1],[1,-1,1],[1,-1,-1],[-1,1,1],[-1,1,-1],[-1,-1,1],[-1,-1,-1]],nlo=Math.sqrt(3),CF=[[0,1,2,1],[0,1,2,-1],[1,2,0,1],[1,2,0,-1],[2,0,1,1],[2,0,1,-1]];
    for(var i=0;i<N;i++){ var ra=rnd(i*1.1)*6.2832,rb=Math.acos(2*rnd(i*2.3)-1),rr=Math.cbrt(rnd(i*3.7)); var rx=Math.sin(rb)*Math.cos(ra)*rr,ry=Math.cos(rb)*rr,rz=Math.sin(rb)*Math.sin(ra)*rr,rl=Math.hypot(rx,ry,rz)||1; R.push([rx,ry,rz,rx/rl,ry/rl,rz/rl]);
      var d=CF[i%6],Pp=[0,0,0],Nn=[0,0,0]; Pp[d[0]]=rnd(i*5.9)*2-1; Pp[d[1]]=rnd(i*8.1)*2-1; Pp[d[2]]=d[3]; Nn[d[2]]=d[3]; C.push([Pp[0]*0.82,Pp[1]*0.82,Pp[2]*0.82,Nn[0],Nn[1],Nn[2]]);
      var s=OF[i%8],u=rnd(i*9.3),v=rnd(i*11.7); if(u+v>1){u=1-u;v=1-v;} var w=1-u-v; O.push([s[0]*u*0.98,s[1]*v*0.98,s[2]*w*0.98, s[0]/nlo,s[1]/nlo,s[2]/nlo]); }
    MORPH={R:R,C:C,O:O}; return MORPH; }
  function morphLerp(o,A,B,a,ay){ var n=A.length,out=new Array(n); for(var i=0;i<n;i++){ var p=A[i],q=B[i]; out[i]=[p[0]+(q[0]-p[0])*a,p[1]+(q[1]-p[1])*a,p[2]+(q[2]-p[2])*a,p[3]+(q[3]-p[3])*a,p[4]+(q[4]-p[4])*a,p[5]+(q[5]-p[5])*a]; } paint3(o,out,0.6,ay); }
  function mExplore(o){ var M=morphSets(),tt=o.t*0.001,R=M.R,n=R.length,out=new Array(n); for(var i=0;i<n;i++){ var p=R[i],dd=tt+i*0.7; out[i]=[p[0]+Math.sin(dd*0.7)*0.05,p[1]+Math.cos(dd*0.6)*0.05,p[2]+Math.sin(dd*0.5)*0.05,p[3],p[4],p[5]]; } paint3(o,out,0.6,tt*0.22); }
  function mGenerate(o){ var M=morphSets(),tt=o.t*0.001; morphLerp(o,M.R,M.C, ss3(o.prog||0), tt*0.3); }   /* random -> square (cube), one way */
  function mRefine(o){ var M=morphSets(),tt=o.t*0.001; morphLerp(o,M.C,M.O, ss3(o.prog||0), tt*0.3); }      /* square -> octahedron, one way */
  function gOctaS(D){ var S=[[1,1,1],[1,1,-1],[1,-1,1],[1,-1,-1],[-1,1,1],[-1,1,-1],[-1,-1,1],[-1,-1,-1]],pts=[],nl=Math.sqrt(3); for(var f=0;f<8;f++){ var s=S[f],nx=s[0]/nl,ny=s[1]/nl,nz=s[2]/nl; for(var i=0;i<=D;i++)for(var j=0;j<=D-i;j++){ var u=i/D,v=j/D,w=1-u-v; pts.push([s[0]*u,s[1]*v,s[2]*w,nx,ny,nz]); } } return pts; }
  var OCTAS=null, SCPOS=(function(){ var a=[]; for(var x=-1;x<=1;x++)for(var y=-1;y<=1;y++)for(var z=-1;z<=1;z++) a.push([x*0.5,y*0.5,z*0.5,x*x+y*y+z*z]); a.sort(function(p,q){return p[3]-q[3];}); return a; })();
  function mScale(o){ if(!OCTAS)OCTAS=gOctaS(3); var tt=o.t*0.001,n=1+Math.round(ss3(o.prog||0)*19),out=[];   /* 1 -> 20 octahedra, one way */
    for(var g=0;g<n;g++){ var pos=SCPOS[g]; for(var i=0;i<OCTAS.length;i++){ var p=OCTAS[i]; out.push([p[0]*0.22+pos[0],p[1]*0.22+pos[1],p[2]*0.22+pos[2],p[3],p[4],p[5]]); } } paint3(o,out,0.6,tt*0.3); }
  var REND={explore:explore, generate:generate, refine:refine, scale:scale, truth:tessViz, skills:tessViz, output:tessViz, check:tessViz};   /* protocol parts = diamond tessellation */
  var last=0, DWELL=1700, DUR=450;
  function loop(ts){ var dt=ts-last; last=ts; ts=ts||0; var act=Math.floor(ts/DWELL)%4;   /* spotlight cycles; each stage plays its transition once when first lit, then holds */
    for(var i=0;i<items.length;i++){ var o=items[i]; if(!o.w){o.size();continue;} if(!o.on)continue;
      o.active=(ORDER[o.kind]===undefined)||(ORDER[o.kind]===act);
      if(o.col==null)o.col=o.active?1:0; o.col+=((o.active?1:0)-o.col)*0.09;   /* smooth grey<->colour */
      if(o.active&&o.act0==null)o.act0=ts; o.prog=(o.act0==null)?0:Math.min(1,(ts-o.act0)/DUR);
      o.t+=dt; var fn=REND[o.kind]; if(fn)fn(o); } requestAnimationFrame(loop); }
  (document.fonts&&document.fonts.ready?document.fonts.ready:Promise.resolve()).then(function(){ items.forEach(function(o){o.size();}); });
  requestAnimationFrame(loop);
})();


/* minimal w-logo appears once the hero header has scrolled away */
(function(){ var tl=document.getElementById('toplink'), hero=document.getElementById('hero'); if(!hero) return;
  function upd(){ var on=scrollY > hero.offsetHeight*0.55; if(tl) tl.classList.toggle('show', on); }
  addEventListener('scroll', upd, {passive:true}); addEventListener('resize', upd); upd();
})();
/* smileys: ink eyes/mouth that follow the cursor, blink, and react on hover (the blob still supplies the colour) */
(function(){
  var sm=[].slice.call(document.querySelectorAll('.two .c .smiley'));
  if(!sm.length) return;
  var NS='http://www.w3.org/2000/svg';
  var HEART=[[2,1],[3,1],[5,1],[6,1],[1,2],[2,2],[3,2],[4,2],[5,2],[6,2],[7,2],[1,3],[2,3],[3,3],[4,3],[5,3],[6,3],[7,3],[2,4],[3,4],[4,4],[5,4],[6,4],[3,5],[4,5],[5,5],[4,6]];
  var TOUCH=!(window.matchMedia && matchMedia('(hover:hover) and (pointer:fine)').matches);
  function heartSVG(){ var s=document.createElementNS(NS,'svg'); s.setAttribute('viewBox','0 0 9 7'); s.setAttribute('width','24'); s.setAttribute('height','19');
    for(var i=0;i<HEART.length;i++){ var r=document.createElementNS(NS,'rect'); r.setAttribute('x',HEART[i][0]); r.setAttribute('y',HEART[i][1]); r.setAttribute('width',1.04); r.setAttribute('height',1.04); r.setAttribute('fill','#e0492a'); s.appendChild(r);} return s; }
  var ptr={x:-1,y:-1}; addEventListener('pointermove',function(e){ ptr.x=e.clientX; ptr.y=e.clientY; }, {passive:true});
  var faces=sm.map(function(sv){
    var mood=sv.getAttribute('data-mood');
    var g=document.createElementNS(NS,'g'); sv.appendChild(g);
    function rect(c,r){ var e=document.createElementNS(NS,'rect'); e.setAttribute('x',c*12); e.setAttribute('y',r*12); e.setAttribute('width',12); e.setAttribute('height',12); e.setAttribute('fill','#0a0a0a'); g.appendChild(e); return e; }
    var eyeL=rect(4,5), eyeR=rect(8,5), mouth=[], blush=[];
    if(mood==='sad'){ mouth.push(rect(5,7),rect(6,7),rect(7,7),rect(4,8),rect(8,8));
      [[3,7],[9,7]].forEach(function(p){ var e=document.createElementNS(NS,'rect'); e.setAttribute('x',p[0]*12); e.setAttribute('y',p[1]*12); e.setAttribute('width',12); e.setAttribute('height',12); e.setAttribute('fill','#e0492a'); e.setAttribute('fill-opacity','0'); g.appendChild(e); blush.push(e); }); }
    else { mouth.push(rect(4,7),rect(8,7),rect(5,8),rect(6,8),rect(7,8)); }
    return {sv:sv, g:g, eyeL:eyeL, eyeR:eyeR, mouth:mouth, blush:blush, mood:mood, lx:0, ly:0, shy:false};
  });
  /* look toward the cursor */
  (function loop(){
    if(!TOUCH && ptr.x>=0){ for(var i=0;i<faces.length;i++){ var f=faces[i], r=f.sv.getBoundingClientRect();
      if(r.width>1){ var cx=r.left+r.width/2, cy=r.top+r.height/2, dx=ptr.x-cx, dy=ptr.y-cy, d=Math.hypot(dx,dy)||1, tx, ty;
        if(f.shy){ tx=-dx/d*7; ty=-dy/d*7+2.5; }                 /* avert the gaze and glance down */
        else { var m=Math.min(1,d/420)*5.5; tx=dx/d*m; ty=dy/d*m; }
        f.lx+=(tx-f.lx)*0.15; f.ly+=(ty-f.ly)*0.15; f.g.setAttribute('transform','translate('+f.lx.toFixed(2)+','+f.ly.toFixed(2)+')'); } } }
    requestAnimationFrame(loop);
  })();
  /* idle blink */
  function blink(f){ f.eyeL.setAttribute('height',2); f.eyeR.setAttribute('height',2); f.eyeL.setAttribute('y',5*12+5); f.eyeR.setAttribute('y',5*12+5);
    setTimeout(function(){ f.eyeL.setAttribute('height',12); f.eyeR.setAttribute('height',12); f.eyeL.setAttribute('y',5*12); f.eyeR.setAttribute('y',5*12); }, 110); }
  function scheduleBlink(f){ setTimeout(function(){ blink(f); scheduleBlink(f); }, 2200+Math.random()*4200); }
  faces.forEach(scheduleBlink);
  /* reactions */
  function replay(sv,cls){ sv.classList.remove(cls); void sv.offsetWidth; sv.classList.add(cls); }
  function spawnHearts(f){ var host=f.sv.parentNode; for(var i=0;i<4;i++){ (function(i){ setTimeout(function(){ var h=heartSVG(); h.setAttribute('class','sm-heart'); h.style.left=(38+Math.random()*52)+'%'; h.style.top='6px'; host.appendChild(h); setTimeout(function(){ if(h.parentNode)h.remove(); },1000); }, i*90); })(i); } }
  faces.forEach(function(f){
    if(TOUCH) return;
    if(f.mood==='sad'){   /* shy: look away, recoil, blush */
      f.sv.addEventListener('mouseenter', function(){ f.shy=true; f.sv.classList.add('sm-shy'); f.blush.forEach(function(e){ e.setAttribute('fill-opacity','.5'); }); });
      f.sv.addEventListener('mouseleave', function(){ f.shy=false; f.sv.classList.remove('sm-shy'); f.blush.forEach(function(e){ e.setAttribute('fill-opacity','0'); }); });
    } else {              /* happy: jump + hearts */
      var busy=false;
      f.sv.addEventListener('mouseenter', function(){ if(busy) return; busy=true; setTimeout(function(){ busy=false; }, 620); replay(f.sv,'sm-jump'); spawnHearts(f); });
    }
  });
})();
/* buttons: smiley-style random pixel flicker on hover */
(function(){
  var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  var ACC=['#d8ff00','#f5c518','#e0492a','#0a0a0a'], CELL=9;
  function attach(b){
    if(!b||b.__pxd) return; b.__pxd=true;
    var lbl=document.createElement('span'); lbl.className='lbl';
    while(b.firstChild) lbl.appendChild(b.firstChild);
    var fx=document.createElement('span'); fx.className='pxfx'; fx.setAttribute('aria-hidden','true');
    b.appendChild(fx); b.appendChild(lbl);
    var cells=[];
    function build(){
      fx.textContent=''; cells=[];
      var cols=Math.ceil(b.offsetWidth/CELL), rows=Math.ceil(b.offsetHeight/CELL);
      fx.style.gridTemplateColumns='repeat('+cols+','+CELL+'px)'; fx.style.gridAutoRows=CELL+'px';
      for(var i=0;i<cols*rows;i++){ cells.push(fx.appendChild(document.createElement('i'))); }
    }
    build();
    if(window.ResizeObserver) new ResizeObserver(build).observe(b);
    if(reduce) return;
    var timer=null;
    function tick(){ for(var i=0;i<cells.length;i++) cells[i].style.background = Math.random()<0.14 ? ACC[(Math.random()*ACC.length)|0] : 'transparent'; }
    function clear(){ for(var i=0;i<cells.length;i++) cells[i].style.background='transparent'; }
    b.addEventListener('mouseenter', function(){ if(timer) return; tick(); timer=setInterval(tick,130); });
    b.addEventListener('mouseleave', function(){ clearInterval(timer); timer=null; clear(); });
  }
  window.__pxHover=attach;                                                  /* so dynamically-created buttons (tetris) can opt in */
  [].slice.call(document.querySelectorAll('.btn, .cta .ctabtn, .tt-teaser')).forEach(attach);
})();


/* fade the pixel controls away over the footer so they don't sit on top of it */
(function(){ var px=document.querySelector('.pxctl'), ft=document.querySelector('footer');
  if(!px||!ft||!('IntersectionObserver' in window)) return;
  new IntersectionObserver(function(es){ es.forEach(function(e){ px.classList.toggle('hide', e.isIntersecting); }); }, {rootMargin:'0px 0px 320px 0px'}).observe(ft);
})();
/* which wild-er is nearest you, by IP */
(function(){ var el=document.getElementById('nearest'); if(!el) return;
  var TEAM=[
    {who:'Jake, Matt and Claire', place:'Washington DC', lat:38.90, lng:-77.04},
    {who:'Felix', place:'Los Angeles', lat:34.05, lng:-118.24},
    {who:'Anton', place:'the UK', lat:51.51, lng:-0.13},
    {who:'Monde', place:'South Africa', lat:-26.20, lng:28.04},
    {who:'Eva and David', place:'Spain', lat:40.42, lng:-3.70},
    {who:'Alex and Dom', place:'Italy', lat:41.90, lng:12.50},
    {who:'Rag, Matthias and Litchy', place:'Vienna', lat:48.21, lng:16.37},
    {who:'Leandro', place:'Argentina', lat:-34.60, lng:-58.38}
  ];
  function hav(a,b,c,d){ var R=6371,p=Math.PI/180; var s=Math.sin((c-a)*p/2), t=Math.sin((d-b)*p/2);
    var h=s*s+Math.cos(a*p)*Math.cos(c*p)*t*t; return 2*R*Math.asin(Math.sqrt(h)); }
  function show(lat,lng){ var best=null, bd=1/0;
    for(var i=0;i<TEAM.length;i++){ var d=hav(lat,lng,TEAM[i].lat,TEAM[i].lng); if(d<bd){ bd=d; best=TEAM[i]; } }
    if(!best) return; var plural=best.who.indexOf(' and ')>-1;
    var dist=bd<60?'practically next door':('about '+(bd<1000?(Math.round(bd/10)*10):(Math.round(bd/100)*100)).toLocaleString()+' km away');
    el.textContent='The nearest wildling'+(plural?'s are ':' is ')+best.who+' in '+best.place+', '+dist+'.';
    el.style.display='';
  }
  try{ fetch('https://ipwho.is/').then(function(r){ return r.json(); }).then(function(j){
    if(j&&typeof j.latitude==='number'&&typeof j.longitude==='number') show(j.latitude,j.longitude);
  }).catch(function(){}); }catch(_){}
})();


/* carousel hover: the slide's own image/video crumbles into chunky pixels at the corners (top overlay, no trail) */
(function(){
  if(!(window.matchMedia && matchMedia('(hover:hover) and (pointer:fine)').matches)) return;   /* pointer devices only */
  var media=[].slice.call(document.querySelectorAll('.slide .csm video, .slide .csm img')); if(!media.length) return;
  var cv=document.createElement('canvas'); cv.setAttribute('aria-hidden','true');
  cv.style.cssText='position:fixed;inset:0;width:100%;height:100%;z-index:5;pointer-events:none;'; document.body.appendChild(cv);
  var ctx=cv.getContext('2d'), DPR=Math.min(devicePixelRatio||1,2), W=0,H=0, BL=14, target=null;
  var off=document.createElement('canvas'), offc=off.getContext('2d',{willReadFrequently:true});
  function size(){ W=innerWidth; H=innerHeight; cv.width=Math.round(W*DPR); cv.height=Math.round(H*DPR); ctx.setTransform(DPR,0,0,DPR,0,0); }
  size(); addEventListener('resize',size);
  media.forEach(function(m){ var host=m.closest('.csm')||m; host.addEventListener('mouseenter',function(){ target=m; }); host.addEventListener('mouseleave',function(){ if(target===m) target=null; }); });
  function hsh(a){ var n=Math.sin(a)*43758.5453; return n-Math.floor(n); }
  (function loop(ts){ ctx.clearRect(0,0,W,H);
    if(target){ var host=target.closest('.csm')||target.parentNode, r=host.getBoundingClientRect(), mw=target.videoWidth||target.naturalWidth, mh=target.videoHeight||target.naturalHeight;   /* use the visible .csm box, not the (often scaled) media element */
      if(r.width>0 && r.bottom>0 && r.top<H && mw && mh){
        var cols=Math.floor(r.width/BL), rows=Math.floor(r.height/BL); if(cols<2||rows<2){ requestAnimationFrame(loop); return; } if(off.width!==cols||off.height!==rows){ off.width=cols; off.height=rows; }
        var sc=Math.max(r.width/mw, r.height/mh), cw=r.width/sc, ch=r.height/sc;                 /* cover-fit sample of the media */
        try{ offc.drawImage(target, (mw-cw)/2,(mh-ch)/2,cw,ch, 0,0,cols,rows); }catch(e){ requestAnimationFrame(loop); return; }
        var data; try{ data=offc.getImageData(0,0,cols,rows).data; }catch(e){ requestAnimationFrame(loop); return; }
        var step=Math.floor((ts||0)/90), reach=Math.min(cols,rows)*0.62, s=BL-1;
        for(var j=0;j<rows;j++)for(var i=0;i<cols;i++){
          var dcx=Math.min(i,cols-1-i), dcy=Math.min(j,rows-1-j), d=Math.sqrt(dcx*dcx+dcy*dcy);   /* distance to the nearest corner */
          var p=1-d/reach; if(p<=0) continue; p*=p;                                               /* densest right at the corners */
          if(hsh(i*12.9+j*78.2+step*3.1) > p) continue;                                           /* random twinkle => crumbling */
          var k=(j*cols+i)*4;
          ctx.fillStyle='rgb('+data[k]+','+data[k+1]+','+data[k+2]+')';
          ctx.fillRect(Math.round(r.left)+i*BL, Math.round(r.top)+j*BL, s, s); } } }
    requestAnimationFrame(loop); })();
})();


/* process row: a double helix flowing left -> right, frayed blue chaos resolving into a clean
   yellow strand with rungs (Explore -> Generate -> Refine -> Scale). Run the cursor through it
   and the strands part around your hand, then spring back. On the page's 9px grid. */
(function(){
  var cv=document.getElementById('procflow'), ctx=cv&&cv.getContext('2d'); if(!ctx) return;
  var DPR=Math.min(devicePixelRatio||1,2), CELL=9, W=0,H=0,cols=0,rows=0, on=true;
  var COOL='#3b5bd9', YEL='#f5c518';
  function mix(a,b,t){ if(t<=0)return a; if(t>=1)return b; var ar=parseInt(a.slice(1,3),16),ag=parseInt(a.slice(3,5),16),ab=parseInt(a.slice(5,7),16),br=parseInt(b.slice(1,3),16),bg=parseInt(b.slice(3,5),16),bb=parseInt(b.slice(5,7),16); return 'rgb('+((ar+(br-ar)*t)|0)+','+((ag+(bg-ag)*t)|0)+','+((ab+(bb-ab)*t)|0)+')'; }
  function rnd(s){ var x=Math.sin(s*12.9898)*43758.5453; return x-Math.floor(x); }
  function ss(x){ x=x<0?0:x>1?1:x; return x*x*(3-2*x); }
  function prof(x){ return 0.06+0.94*Math.pow(Math.abs(2*x-1),1.2); }
  function pick(seed,x){ return rnd(seed) < ss(x) ? YEL : COOL; }
  function dep(za,rk){ return Math.max(0,Math.min(1,0.5+0.5*(za/Math.max(1,rk)))); }
  function size(){ var r=cv.getBoundingClientRect(); if(r.width<2)return; W=r.width;H=r.height; cv.width=Math.round(W*DPR); cv.height=Math.round(H*DPR); ctx.setTransform(DPR,0,0,DPR,0,0); cols=Math.ceil(W/CELL); rows=Math.ceil(H/CELL); }
  size(); if(window.ResizeObserver) new ResizeObserver(size).observe(cv);
  if('IntersectionObserver' in window){ new IntersectionObserver(function(es){ es.forEach(function(e){ on=e.isIntersecting; }); }).observe(cv); }
  /* pointer: part the strands around the cursor, ease the influence in and out */
  var pmx=0,pmy=0,pstr=0,ptgt=0;
  function moveAt(cx,cy){ var r=cv.getBoundingClientRect(); pmx=cx-r.left; pmy=cy-r.top; ptgt=(pmx>=-40&&pmx<=W+40&&pmy>=-40&&pmy<=H+40)?1:0; }
  cv.addEventListener('pointermove',function(e){ moveAt(e.clientX,e.clientY); },{passive:true});
  cv.addEventListener('pointerleave',function(){ ptgt=0; });
  /* hover a step label below: that quarter of the helix stays lit, the rest recedes */
  var ST=-1, EM=[1,1,1,1];
  function aOf(u){ if(ST<0&&EM[0]>0.995&&EM[1]>0.995&&EM[2]>0.995&&EM[3]>0.995) return 1;
    var g=u*4-0.5, q=Math.floor(g), f=ss(Math.min(1,Math.max(0,(g-q-0.35)/0.3))),
        a0=EM[Math.max(0,Math.min(3,q))], a1=EM[Math.max(0,Math.min(3,q+1))]; return a0+(a1-a0)*f; }
  var steps=document.querySelectorAll('#process .donuts .step');
  for(var si=0;si<steps.length;si++)(function(el,i){
    el.addEventListener('pointerenter',function(e){ if(e.pointerType!=='touch') ST=i; });
    el.addEventListener('pointerleave',function(){ if(ST===i) ST=-1; });
    el.addEventListener('pointermove',function(e){ var r=el.getBoundingClientRect(), lw=62, x=e.clientX-r.left-lw/2; x=Math.max(0,Math.min(r.width-lw,x)); el.style.setProperty('--lx', Math.round(x/9)*9+'px'); },{passive:true});   /* the pixel line tracks the cursor, snapped to the 9px grid */
  })(steps[si],si);
  var M=400, turns=3.2, clk=0;
  function frame(){ if(!cols)return; ctx.clearRect(0,0,W,H);
    pstr += (ptgt-pstr)*0.09; var RAD=H*0.55, AMP=H*0.42, repel=pstr>0.01;
    for(var e2=0;e2<4;e2++){ var tg=(ST<0||ST===e2)?1:0.16; EM[e2]+=(tg-EM[e2])*0.07; }
    var cy=H/2, R=H*0.42, items=[], s,i,uu,w;
    function push(it){ /* part the strands away from the cursor */
      if(repel){ var dx=it.sx-pmx, dy=it.sy-pmy, dist=Math.sqrt(dx*dx+dy*dy)+0.001; if(dist<RAD){ var f=(1-dist/RAD); f=f*f*pstr; it.sx+=dx/dist*f*AMP; it.sy+=dy/dist*f*AMP; } }
      items.push({c:(it.sx/CELL)|0,r:(it.sy/CELL)|0,d:it.d,col:it.col,a:it.a}); }
    /* two strands: frayed blue at the mouth tightening into a clean yellow helix */
    for(s=0;s<2;s++){ var ph0=s*Math.PI;
      for(i=0;i<M;i++){ var u=((i/M)+clk*0.0013)%1, rk=R*prof(u), chaos=Math.pow(1-u,1.05),
        ang=u*turns*6.2832+ph0+(rnd(i*3.1+s*40)-0.5)*2.9*chaos, jr=rk*(1+(rnd(i*7.7+s*9)-0.5)*1.9*chaos),
        za=Math.cos(ang)*jr, ya=Math.sin(ang)*jr, depth=dep(za,rk);
        push({sx:u*W+za*0.34, sy:cy+ya*0.92, d:depth, col:mix('#ffffff',pick(i*2.3+s*70,u),0.3+0.65*depth), a:aOf(u)}); } }
    /* rungs that knit the two clean strands together on the resolved (right) half */
    for(uu=0;uu<1;uu+=0.04){ var u2=(uu+clk*0.0013)%1; if(u2<0.5)continue; var rk2=R*prof(u2), ang2=u2*turns*6.2832; for(w=0;w<=1.001;w+=0.12){ var f2=1-2*w, za2=Math.cos(ang2)*rk2*f2, ya2=Math.sin(ang2)*rk2*f2, depth2=dep(za2,rk2); push({sx:u2*W+za2*0.34, sy:cy+ya2*0.92, d:depth2-0.01, col:mix('#ffffff',YEL,0.3+0.5*depth2), a:aOf(u2)}); } }
    items.sort(function(a,b){return a.d-b.d;});
    for(i=0;i<items.length;i++){ var it=items[i]; if(it.r<0||it.r>=rows||it.c<0||it.c>=cols)continue; ctx.globalAlpha=it.a==null?1:it.a; ctx.fillStyle=it.col; ctx.fillRect(it.c*CELL,it.r*CELL,CELL-1,CELL-1); } ctx.globalAlpha=1; }
  (function loop(){ if(on){ clk++; frame(); } requestAnimationFrame(loop); })();
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


/* W logo: choppy 3D spin every ~10s (also spins on hover via CSS) */
(function(){ var l=document.querySelector('.wlogo'); if(!l) return;
  setInterval(function(){ l.classList.add('spin'); setTimeout(function(){ l.classList.remove('spin'); }, 860); }, 10000); })();


/* Brand Context Protocol: one continuous "constellation" flow across all four stages.
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
  /* hover a step label below: that stage's cloud stays lit, the rest recede */
  function stageOf(u,s){ var isSk=hash(s*5.5)<0.5, px=pxf(u,isSk); if(px>0.74) return 3; if(px>=0.58) return 2; return isSk?1:0; }
  var ST=-1, EM=[1,1,1,1];
  var steps=document.querySelectorAll('#protocol-parts .donuts .step');
  for(var si=0;si<steps.length;si++)(function(el,i){
    el.addEventListener('pointerenter',function(e){ if(e.pointerType!=='touch') ST=i; });
    el.addEventListener('pointerleave',function(){ if(ST===i) ST=-1; });
    el.addEventListener('pointermove',function(e){ var r=el.getBoundingClientRect(), lw=62, x=e.clientX-r.left-lw/2; x=Math.max(0,Math.min(r.width-lw,x)); el.style.setProperty('--lx', Math.round(x/9)*9+'px'); },{passive:true});   /* the pixel line tracks the cursor, snapped to the 9px grid */
  })(steps[si],si);
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
