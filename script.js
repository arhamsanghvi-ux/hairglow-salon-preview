(function(){
 var t=document.querySelector('.nav-toggle'),n=document.getElementById('site-nav');
 t.addEventListener('click',function(){var o=n.classList.toggle('open');t.setAttribute('aria-expanded',o)});
 n.addEventListener('click',function(e){if(e.target.tagName==='A'){n.classList.remove('open');t.setAttribute('aria-expanded',false)}});
 document.getElementById('book-form').addEventListener('submit',function(e){
  e.preventDefault();var f=e.target,m='Hi Hair and Glow Salon, I would like to book an appointment.';
  if(f.name.value)m+='\nName: '+f.name.value;if(f.service.value)m+='\nService: '+f.service.value;if(f.when.value)m+='\nPreferred time: '+f.when.value;
  window.open('https://wa.me/919819103125?text='+encodeURIComponent(m),'_blank','noopener');
 });
})();
