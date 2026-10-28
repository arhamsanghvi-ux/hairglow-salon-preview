(function(){
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
  // subtle hero parallax
  var heroImg=document.querySelector('.hero-media img');
  if(heroImg && !window.matchMedia('(prefers-reduced-motion: reduce)').matches){
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
})();
