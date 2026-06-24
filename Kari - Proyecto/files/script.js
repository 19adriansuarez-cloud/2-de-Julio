/* ---------- Cielo estrellado animado con canvas ---------- */
const cv = document.getElementById('cielo');
const ctx = cv.getContext('2d');
function ajustarCanvas(){ cv.width = innerWidth; cv.height = innerHeight; }
ajustarCanvas();
window.addEventListener('resize', ajustarCanvas);

const estrellas = Array.from({length:140}, () => ({
  x: Math.random()*innerWidth,
  y: Math.random()*innerHeight,
  r: Math.random()*1.4 + .3,
  fase: Math.random()*Math.PI*2,
  vel: Math.random()*.015 + .005
}));

function dibujarCielo(t){
  ctx.clearRect(0,0,cv.width,cv.height);
  estrellas.forEach(e=>{
    const brillo = .35 + .65*Math.abs(Math.sin(e.fase + t*e.vel));
    ctx.beginPath();
    ctx.fillStyle = `rgba(252,234,187,${brillo})`;
    ctx.arc(e.x, e.y, e.r, 0, Math.PI*2);
    ctx.fill();
  });
  requestAnimationFrame(dibujarCielo);
}
requestAnimationFrame(dibujarCielo);

/* ---------- Interacción con Chimuelo ---------- */
const escenario = document.getElementById('escenario');
let clicks = 0, temporizadorClick = null, presionado = null;

function parpadear(){
  escenario.classList.add('parpadea');
  setTimeout(()=> escenario.classList.remove('parpadea'), 160);
}
function aletear(){
  escenario.classList.toggle('aletea');
}
function disparar(){
  escenario.classList.remove('disparo');
  // forzar reflow para reiniciar animación
  void escenario.offsetWidth;
  escenario.classList.add('disparo');
}

function manejarClick(){
  clicks++;
  clearTimeout(temporizadorClick);
  temporizadorClick = setTimeout(()=>{
    if(clicks === 1) parpadear();
    else aletear();
    clicks = 0;
  }, 280);
}

escenario.addEventListener('click', manejarClick);
escenario.addEventListener('keydown', (e)=>{
  if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); manejarClick(); }
});
escenario.addEventListener('mousedown', ()=>{ presionado = setTimeout(disparar, 420); });
escenario.addEventListener('touchstart', ()=>{ presionado = setTimeout(disparar, 420); });
['mouseup','mouseleave','touchend'].forEach(ev=>{
  escenario.addEventListener(ev, ()=> clearTimeout(presionado));
});

/* ---------- Cuaderno de Hipo: notas rotativas ---------- */
const notas = [
  "Las Furias Nocturnas son tan raras que la mayoría de los vikingos creía que solo existía una.",
  "Chimuelo no puede volar en línea recta sin su aleta artificial.",
  "Su plasma es casi invisible en la oscuridad: por eso nadie lo había visto antes.",
  "A diferencia de otros dragones, Chimuelo no tiene dientes visibles... hasta que ataca.",
  "Le encanta el pescado, especialmente si se lo regala su jinete.",
  "Ronronea como un gato gigante cuando está cómodo."
];
let idx = -1;
const elFrase = document.getElementById('frase-curiosa');
document.getElementById('btn-frase').addEventListener('click', ()=>{
  idx = (idx + 1) % notas.length;
  elFrase.style.opacity = 0;
  setTimeout(()=>{
    elFrase.textContent = notas[idx];
    elFrase.style.transition = 'opacity .35s ease';
    elFrase.style.opacity = 1;
  }, 180);
});

/* ---------- Easter egg: nido con el frasco ---------- */
const nido = document.getElementById('nido-secreto');
const modalFrasco = document.getElementById('frasco-modal');
nido.addEventListener('click', ()=> modalFrasco.classList.add('abierto'));
document.getElementById('cerrar-frasco').addEventListener('click', ()=> modalFrasco.classList.remove('abierto'));
modalFrasco.addEventListener('click', (e)=>{ if(e.target === modalFrasco) modalFrasco.classList.remove('abierto'); });
