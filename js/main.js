// main.js - adds simple interactivity
document.addEventListener('DOMContentLoaded', function(){
  // handle clicks on scheme items
  document.querySelectorAll('[data-scheme]').forEach(el=>{
    el.addEventListener('click', ()=> {
      const slug = el.getAttribute('data-scheme');
      window.location.href = './schemes/' + slug + '.html';
    });
  });
});