'use strict';
const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('#menu');
function closeMenu(){menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','Abrir menu');menu.classList.remove('open');document.body.classList.remove('menu-open');}
menuButton.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')!=='true';menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'Fechar menu':'Abrir menu');menu.classList.toggle('open',open);document.body.classList.toggle('menu-open',open);});
menu.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
document.addEventListener('keydown',event=>{if(event.key==='Escape')closeMenu();});
document.addEventListener('click',event=>{if(!event.target.closest('.header'))closeMenu();});
matchMedia('(min-width:651px)').addEventListener('change',event=>{if(event.matches)closeMenu();});
const header=document.querySelector('.header');
let scrollScheduled=false;
function updateHeader(){header.classList.toggle('scrolled',window.scrollY>15);scrollScheduled=false;}
window.addEventListener('scroll',()=>{if(!scrollScheduled){scrollScheduled=true;requestAnimationFrame(updateHeader);}},{passive:true});updateHeader();
if('IntersectionObserver' in window){
  const reduced=matchMedia('(prefers-reduced-motion:reduce)').matches;
  if(!reduced){const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');revealObserver.unobserve(entry.target);}}),{threshold:.08,rootMargin:'0px 0px -20px 0px'});document.querySelectorAll('.reveal').forEach(item=>revealObserver.observe(item));document.documentElement.classList.add('js-reveal');}
  const sectionsObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){menu.querySelectorAll('a').forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+entry.target.id));}}),{rootMargin:'-20% 0px -50% 0px',threshold:0});document.querySelectorAll('main section[id]').forEach(section=>sectionsObserver.observe(section));
}
document.querySelectorAll('[data-service]').forEach(link=>link.addEventListener('click',()=>{document.querySelector('#service').value=link.dataset.service;}));
const budgetForm=document.querySelector('#budget-form');
budgetForm.addEventListener('submit',event=>{event.preventDefault();if(!budgetForm.reportValidity())return;const data=new FormData(budgetForm);const message=['Olá, PHD Elétrica! Gostaria de solicitar um orçamento.','',`Nome: ${String(data.get('name')).trim()}`,`Serviço: ${data.get('service')}`,`Bairro e cidade: ${String(data.get('neighborhood')).trim()}`,String(data.get('details')).trim()?`Detalhes: ${String(data.get('details')).trim()}`:''].filter((line,index)=>line||index===1).join('\n');window.location.assign('https://wa.me/5511994781399?text='+encodeURIComponent(message));});
const lightbox=document.querySelector('.lightbox');
const lightboxImage=document.querySelector('#lightbox-image');
let photoTrigger=null;
document.querySelectorAll('[data-lightbox]').forEach(button=>button.addEventListener('click',()=>{if(typeof lightbox.showModal!=='function'){window.open(button.dataset.lightbox,'_blank','noopener');return;}photoTrigger=button;lightboxImage.src=button.dataset.lightbox;lightboxImage.alt=button.querySelector('img').alt;document.querySelector('#lightbox-caption').textContent=button.dataset.caption;lightbox.showModal();document.body.classList.add('modal-open');}));
document.querySelector('.lightbox-close').addEventListener('click',()=>lightbox.close());
lightbox.addEventListener('click',event=>{if(event.target===lightbox)lightbox.close();});
lightbox.addEventListener('close',()=>{document.body.classList.remove('modal-open');if(photoTrigger)photoTrigger.focus({preventScroll:true});});
document.querySelector('#year').textContent=String(new Date().getFullYear());
