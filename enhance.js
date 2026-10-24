(function(){
  var doc=document,root=doc.documentElement;
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine=window.matchMedia('(hover:hover) and (pointer:fine)').matches;
  var $$=function(s,c){return Array.prototype.slice.call((c||doc).querySelectorAll(s));};

  /* ---------- Mobile menu (text toggle) ---------- */
  var nav=doc.querySelector('.nav'),header=doc.getElementById('header');
  if(nav&&header){
    var links=$$('.nav-left a, .nav-right a:not(.btn)');
    var cta=doc.querySelector('.nav-right .btn');
    var btn=doc.createElement('button');
    btn.type='button';btn.className='nav-toggle';btn.textContent='Menu';
    btn.setAttribute('aria-expanded','false');btn.setAttribute('aria-controls','mnav');
    nav.appendChild(btn);
    var menu=doc.createElement('div');menu.className='mnav';menu.id='mnav';
    var inner=doc.createElement('div');inner.className='mnav-inner';
    var cur=location.pathname.split('/').pop()||'index.html';
    var seen={};
    links.concat(cta?[cta]:[]).forEach(function(a){
      var l=a.cloneNode(true);l.removeAttribute('style');
      if(a===cta){l.className='btn btn-terracotta';}
      else{l.className='';var h=(l.getAttribute('href')||'').split('#')[0];if(h===cur&&!/#/.test(l.getAttribute('href')))l.classList.add('active');}
      var key=l.textContent.trim();if(seen[key]&&a!==cta)return;seen[key]=1;
      inner.appendChild(l);
    });
    menu.appendChild(inner);header.appendChild(menu);
    var setMenu=function(o){menu.classList.toggle('open',o);btn.setAttribute('aria-expanded',String(o));btn.textContent=o?'Close':'Menu';};
    btn.addEventListener('click',function(){setMenu(!menu.classList.contains('open'));});
    menu.addEventListener('click',function(e){if(e.target.closest('a'))setMenu(false);});
    doc.addEventListener('keydown',function(e){if(e.key==='Escape')setMenu(false);});
    window.addEventListener('resize',function(){if(window.innerWidth>960)setMenu(false);});
  }

  if(reduce){return;}

  /* ---------- Tag elements for 3D reveal ---------- */
  $$('.reveal,.reveal-scale').forEach(function(el){el.classList.remove('reveal','reveal-scale','visible');el.style.removeProperty('transition-delay');});
  var targets='.page-hero p,.section-desc,.svc-card,.ba-card,.service-block,.extra-card,.testimonial,.faq-item,.team-item,.form-card,.info-block,.google-box,.pricing-table,.cta p,.cta .btn,.review-stage .avatar,.footer-col,.footer-brand,.footer-brand+p,.contact-grid>div,.map-placeholder,.container>.btn,.container>div[style*="text-align"]';
  var wordTargets='.section-title,.page-hero h1,.cta h2,.service-block h2';
  var tagged=[];
  function cols(el){
    var p=el.parentElement;if(!p)return 1;
    var cs=getComputedStyle(p);
    if(cs.display!=='grid')return 1;
    return cs.gridTemplateColumns.split(' ').length;
  }
  $$(targets).forEach(function(el){
    if(el.closest('.hero')||el.hasAttribute('data-s3d'))return;
    el.setAttribute('data-s3d','up');tagged.push(el);
  });
  // stagger and variant per sibling group
  var groups=new Map();
  tagged.forEach(function(el){var p=el.parentElement;if(!groups.has(p))groups.set(p,[]);groups.get(p).push(el);});
  groups.forEach(function(arr,p){
    var c=cols(arr[0]);
    arr.forEach(function(el,i){
      var col=c>1?i%c:0;
      el.style.setProperty('--d',(Math.min(col>0||c===1?i:i%c,6)*95)+'ms');
      if(c===2&&el.matches('.svc-card,.ba-card,.testimonial,.extra-card,.team-item'))el.setAttribute('data-s3d',col===0?'left':'right');
      else if(c>=3&&el.matches('.svc-card,.ba-card,.testimonial,.extra-card,.team-item')){el.setAttribute('data-s3d',col===0?'left':(col===c-1?'right':'up'));}
      else if(el.matches('.service-block,.google-box,.form-card,.map-placeholder,.pricing-table'))el.setAttribute('data-s3d','zoom');
    });
  });
  if(window.innerWidth<700){$$('[data-s3d="left"],[data-s3d="right"]').forEach(function(e){e.setAttribute('data-s3d','up');});}

  // heading words
  $$(wordTargets).forEach(function(h){
    if(h.closest('.hero'))return;
    var i=0;
    (function walk(n){
      Array.prototype.slice.call(n.childNodes).forEach(function(c){
        if(c.nodeType===3){
          var parts=c.textContent.split(/(\s+)/),frag=doc.createDocumentFragment();
          parts.forEach(function(t){
            if(!t)return;
            if(/^\s+$/.test(t)){frag.appendChild(doc.createTextNode(' '));return;}
            var s=doc.createElement('span');s.className='w';s.textContent=t;s.style.setProperty('--d',(Math.min(i++,10)*55)+'ms');frag.appendChild(s);
          });
          n.replaceChild(frag,c);
        }else if(c.nodeType===1&&c.tagName!=='BR'){walk(c);}
      });
    })(h);
    h.setAttribute('data-words','');
  });

  var io=new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}
    });
  },{threshold:.12,rootMargin:'0px 0px -6% 0px'});
  requestAnimationFrame(function(){requestAnimationFrame(function(){
    $$('[data-s3d],[data-words]').forEach(function(el){io.observe(el);});
  });});

  /* ---------- Scroll-linked depth ---------- */
  var heroBg=doc.getElementById('heroBg'),heroContent=doc.getElementById('heroContent');
  var band=doc.querySelector('.sticky-band'),bandText=doc.getElementById('bandText');
  var pageHero=doc.querySelector('.page-hero');
  var cards=fine?$$('.svc-card,.ba-card,.testimonial,.extra-card,.team-item,.service-block'):[];
  var pars=$$('img[data-par]');
  var avatars=window.innerWidth>1024?$$('.review-stage .avatar'):[];
  var avDepth=avatars.map(function(_,i){return [0.9,-0.6,0.4,-1,0.7,-0.5,1,-0.8,0.3][i%9];});
  var ticking=false,vh=window.innerHeight;
  var hov=new WeakMap();
  var baCards=$$('.ba-card');

  function frame(){
    ticking=false;
    var sy=window.pageYOffset;vh=window.innerHeight;
    if(heroBg&&sy<vh*1.2){
      var p=Math.min(sy/vh,1.2);
      heroBg.style.transform='translate3d(0,'+(sy*.3).toFixed(1)+'px,0) scale('+(1.06+p*.06).toFixed(4)+')';
    }
    if(heroContent&&sy<vh*1.2){
      var q=Math.min(sy/vh,1);
      heroContent.style.transform='perspective(1200px) translate3d(0,'+(sy*.2).toFixed(1)+'px,'+(-q*140).toFixed(1)+'px) rotateX('+(q*10).toFixed(2)+'deg)';
      heroContent.style.opacity=Math.max(0,1-q*1.2).toFixed(3);
    }
    if(pageHero){
      var ph=pageHero.getBoundingClientRect();
      if(ph.bottom>0){
        var t=Math.min(Math.max(-ph.top/Math.max(ph.height,1),0),1);
        pageHero.style.setProperty('--ph',t);
        var kids=pageHero.children;
        for(var i=0;i<kids.length;i++){kids[i].style.transform='perspective(900px) translate3d(0,'+(t*50*(1+i*.2)).toFixed(1)+'px,'+(-t*80).toFixed(1)+'px) rotateX('+(t*8).toFixed(2)+'deg)';kids[i].style.opacity=t>.02?(1-t*.7).toFixed(3):'';}
      }
    }
    if(band&&bandText){
      var r=band.getBoundingClientRect(),c=(r.top+r.height/2-vh/2)/(vh/2+r.height/2);
      var a=Math.max(0,1-Math.abs(c));
      bandText.style.transform='perspective(900px) translate3d(0,'+(c*60).toFixed(1)+'px,'+(a*80-60).toFixed(1)+'px) rotateX('+(c*38).toFixed(2)+'deg) scale('+(.86+a*.14).toFixed(3)+')';
      bandText.style.opacity=(.12+a*.88).toFixed(3);
    }
    pars.forEach(function(img){
      var host=img.parentElement.getBoundingClientRect();
      if(host.bottom<-50||host.top>vh+50)return;
      var c=(host.top+host.height/2-vh/2)/(vh/2);
      img.style.transform='translate3d(0,'+(c*-7).toFixed(2)+'%,0)';
    });
    avatars.forEach(function(av,i){
      var r2=av.getBoundingClientRect();
      if(r2.bottom<-80||r2.top>vh+80)return;
      var c=(r2.top+r2.height/2-vh/2)/(vh/2),d=avDepth[i];
      av.style.transform='translate3d(0,'+(c*d*-38).toFixed(1)+'px,'+(d*40).toFixed(1)+'px)';
    });
    if(!fine){baCards.forEach(function(el){var r4=el.getBoundingClientRect(),c=(r4.top+r4.height/2)/vh;el.classList.toggle('tap',c>.25&&c<.72);});}
    cards.forEach(function(el){
      var h=hov.get(el);
      if(h&&h.on)return;
      var r3=el.getBoundingClientRect();
      if(r3.bottom<0||r3.top>vh)return;
      var c=(r3.top+r3.height/2-vh/2)/(vh/2);
      el.style.transform='perspective(1100px) rotateX('+(c*-3.2).toFixed(2)+'deg)';
    });
  }
  function req(){if(!ticking){ticking=true;requestAnimationFrame(frame);}}
  window.addEventListener('scroll',req,{passive:true});
  window.addEventListener('resize',req);
  frame();

  /* ---------- Pointer tilt for cards (mouse only) ---------- */
  cards.forEach(function(el){
    el.setAttribute('data-tilt','');
    var st={on:false};hov.set(el,st);
    el.addEventListener('pointerenter',function(){st.on=true;});
    el.addEventListener('pointermove',function(e){
      if(e.pointerType==='touch')return;
      var r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
      var big=el.matches('.service-block')?.35:1;
      el.style.transform='perspective(1000px) translate3d(0,-8px,24px) rotateX('+(-y*7*big).toFixed(2)+'deg) rotateY('+(x*9*big).toFixed(2)+'deg)';
    });
    el.addEventListener('pointerleave',function(){st.on=false;el.style.transform='';req();});
  });
})();
