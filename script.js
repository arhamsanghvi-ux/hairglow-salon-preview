(function(){

  /* Hydrate images from ASCII .b64 sidecars when present (GitHub text push of binaries) */
  function b64ToUrl(path,b64){
    b64=b64.replace(/\s+/g,'');
    var bin=Uint8Array.from(atob(b64),function(c){return c.charCodeAt(0);});
    var mime=path.indexOf('.png')>-1?'image/png':path.indexOf('.jpg')>-1?'image/jpeg':'image/webp';
    return URL.createObjectURL(new Blob([bin],{type:mime}));
  }
  function hydrateOne(path){
    return fetch(path,{method:'HEAD'}).then(function(r){
      if(r.ok) return path; // real binary present
      return fetch(path+'.b64').then(function(r2){if(!r2.ok)throw 0;return r2.text();}).then(function(b64){return b64ToUrl(path,b64);});
    }).catch(function(){
      return fetch(path+'.b64').then(function(r2){if(!r2.ok)throw 0;return r2.text();}).then(function(b64){return b64ToUrl(path,b64);});
    }).catch(function(){return path;});
  }
  function hydrateFromB64(){
    var imgs=[].slice.call(document.querySelectorAll('img[src^="assets/"]'));
    imgs.forEach(function(img){
      var src=img.getAttribute('src');
      var srcset=img.getAttribute('srcset');
      hydrateOne(src).then(function(u){img.src=u;});
      if(srcset){
        var parts=srcset.split(',').map(function(s){return s.trim().split(/\s+/);});
        Promise.all(parts.map(function(p){return hydrateOne(p[0]).then(function(u){return u+(p[1]?' '+p[1]:'');});})).then(function(bits){img.setAttribute('srcset',bits.join(', '));});
      }
    });
    var sources=[].slice.call(document.querySelectorAll('source[srcset*="assets/"]'));
    sources.forEach(function(el){
      var parts=el.getAttribute('srcset').split(',').map(function(s){return s.trim().split(/\s+/);});
      Promise.all(parts.map(function(p){return hydrateOne(p[0]).then(function(u){return u+(p[1]?' '+p[1]:'');});})).then(function(bits){el.setAttribute('srcset',bits.join(', '));});
    });
  }
  hydrateFromB64();

  var t=document.querySelector('.nav-toggle'),n=document.getElementById('site-nav');
  if(t&&n){
    t.addEventListener('click',function(){
      var o=n.classList.toggle('open');
      t.setAttribute('aria-expanded',o?'true':'false');
      t.setAttribute('aria-label',o?'Close menu':'Open menu');
    });
    n.addEventListener('click',function(e){
      if(e.target.tagName==='A'){n.classList.remove('open');t.setAttribute('aria-expanded','false');t.setAttribute('aria-label','Open menu');}
    });
  }
  var form=document.getElementById('book-form');
  if(form){
    form.addEventListener('submit',function(e){
      e.preventDefault();
      var f=e.target,m='Hi Hair and Glow Salon, I would like to book an appointment.';
      if(f.name.value)m+='\nName: '+f.name.value.trim();
      if(f.service.value)m+='\nService: '+f.service.value.trim();
      if(f.when.value)m+='\nPreferred time: '+f.when.value.trim();
      window.open('https://wa.me/919819103125?text='+encodeURIComponent(m),'_blank','noopener');
    });
  }
  var nodes=document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(entries){
      entries.forEach(function(en){if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target);}});
    },{threshold:0.12,rootMargin:'0px 0px -8% 0px'});
    nodes.forEach(function(el){io.observe(el);});
  }else{nodes.forEach(function(el){el.classList.add('in');});}
  var heroImg=document.querySelector('.hero-media img');
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(heroImg && !reduce){
    var ticking=false;
    window.addEventListener('scroll',function(){
      if(ticking)return;ticking=true;
      requestAnimationFrame(function(){
        var y=Math.min(window.scrollY,420);
        heroImg.style.transform='scale(1.04) translate3d(0,'+(y*0.12)+'px,0)';
        ticking=false;
      });
    },{passive:true});
  }
  /* Cinematic logo intro */
  var intro=document.getElementById('intro');
  if(intro){
    var done=false;
    function finish(){
      if(done)return;done=true;
      intro.classList.add('is-done');
      intro.setAttribute('aria-hidden','true');
      document.body.classList.remove('is-intro');
      setTimeout(function(){if(intro.parentNode)intro.parentNode.removeChild(intro);},750);
    }
    if(reduce){finish();return;}
    requestAnimationFrame(function(){
      intro.classList.add('is-in');
      intro.classList.add('is-open');
    });
    var auto=setTimeout(finish,3200);
    function skip(){clearTimeout(auto);finish();}
    intro.addEventListener('click',function(e){
      if(e.target && e.target.id==='intro-skip')return;
      skip();
    });
    var skipBtn=document.getElementById('intro-skip');
    if(skipBtn)skipBtn.addEventListener('click',function(e){e.stopPropagation();skip();});
    document.addEventListener('keydown',function onKey(e){
      if(e.key==='Escape'||e.key==='Enter'||e.key===' '){e.preventDefault();skip();document.removeEventListener('keydown',onKey);}
    });
  }
})();
