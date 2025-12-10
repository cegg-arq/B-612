/* ============ Animación de estrellas ============ */
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener("resize", resize);
resize();

let stars = [];

for (let i = 0; i < 300; i++) {
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2,
        speed: Math.random() * 0.5
    });
}

function animateStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    stars.forEach(star => {
        star.y += star.speed;
        if (star.y > canvas.height) star.y = 0;

        ctx.fillStyle = "white";
        ctx.fillRect(star.x, star.y, star.size, star.size);
    });

    requestAnimationFrame(animateStars);
}

animateStars();


/* ============ NAVBAR SCROLL ============ */
window.addEventListener("scroll", () => {
    const nav = document.getElementById("navbar");
    if (window.scrollY > 50) {
        nav.classList.add("scrolled");
    } else {
        nav.classList.remove("scrolled");
    }
});

// --------------------------------------------

/* ===============================
/* =========================
   CARRUSEL B-612 — OPTIMIZADO
========================= */

const slides = document.querySelectorAll(".slide");
const slidesContainer = document.querySelector(".slides");
const dotsContainer = document.querySelector(".dots");

let index = 0;
let total = slides.length;
let isAnimating = false;

/* Crear dots dinámicamente */
for (let i = 0; i < total; i++) {
    const dot = document.createElement("div");
    if (i === 0) dot.classList.add("active");
    dotsContainer.appendChild(dot);
}
const dots = dotsContainer.querySelectorAll("div");

/* Actualizar vista */
function updateSlides(smooth = true) {
    slidesContainer.style.transition = smooth
        ? "transform 0.65s ease-in-out"
        : "none";

    slidesContainer.style.transform = `translateX(-${index * 100}%)`;

    slides.forEach(s => s.classList.remove("active"));
    dots.forEach(d => d.classList.remove("active"));

    slides[index].classList.add("active");
    dots[index].classList.add("active");
}

/* Siguiente */
function nextSlide() {
    if (isAnimating) return;
    isAnimating = true;

    index = (index + 1) % total;
    updateSlides(true);

    setTimeout(() => isAnimating = false, 650);
}

/* Anterior */
function prevSlide() {
    if (isAnimating) return;
    isAnimating = true;

    index = (index - 1 + total) % total;
    updateSlides(true);

    setTimeout(() => isAnimating = false, 650);
}

/* Botones */
document.querySelector(".next").addEventListener("click", nextSlide);
document.querySelector(".prev").addEventListener("click", prevSlide);

/* Autoplay */
setInterval(nextSlide, 5000);

/* Inicial */
updateSlides();



// modales--------------------------------------

// =========================== DATOS DEL MENÚ ===========================

const menuData = {
    petit: {
        name: "Le Petit",
        desc: "Una burger curiosa y delicada, inspirada en la esencia del pequeño príncipe.",
        ingredients: ["Pan artesanal", "Carne de res 100 g", "Queso mozzarella", "Vegetales frescos", "Chimichurri de lulo", "Aloli"],
        price: "$19.000"
    },
    volcanes: {
        name: "3 Volcanes",
        desc: "Tres salsas, tres intensidades, un viaje por los volcanes del pequeño príncipe.",
        ingredients: ["Pan artesanal", "Carne de res 100 g", "Tocineta", "Mayonesa de cilantro (Volcán dormido)", "Salsa de chipotle y miel (Volcán a punto de estallar)", "Barbacoa casera ahumada (Volcán activo)", "Pepinillos", "Vegetales frescos"],
        price: "$19.000"
    },
    vuelo: {
        name: "Vuelo 612",
        desc: "Un homenaje al aviador, una travesía que empieza en tu plato y sigue dentro de ti.",
        ingredients: ["Pan artesanal", "Tártara de maracuya", "Piña ahumada", "Ensalada tropical de mango", "Queso crema", "Aros de cebolla crujientes"],
        price: "$19.000"
    },
    domestikda: {
        name: "Domestikda",
        desc: "Un tributo al encuentro con el zorro: lo salvaje que aprende a confiar y termina revelando su sabor más profundo.",
        ingredients: ["Pan artesanal", "Queso campesino", "Carne desmechada al hogao", "Cebolla crunch" , "Mermelada de uchuva", "Mayonesa criolla", "Lechuga fresca"],
        price: "$19.000"
    },
    farolero: {
        name: "Farolero",
        desc: "Inspirada en quien enciende la luz sin descanso: una hamburguesa humilde, constante y brillante, creada para iluminar cada bocado.",
        ingredients: ["Pan artesanal", "Salsa andaluza", "100 g de pollo desmechado en hogao", "Queso cuajada rallada", "Pico andino", "Chips de plátano verde", "Lechuga fresca"],
        price: "$19.000"
    },
    universo: {
        name: "Crea tu propio universo",
        desc: "Tu universo empieza aquí. Pan artesanal dorado a la perfección y vegetales frescos.",
        ingredients: ["Elige proteína, Puedes elegir entre carne desmechada en hogao, pollo desmechado en hogao, carne de res jugosa o pollo marinado a la parrilla, ", 
          "Elige tu acompañante especiales, Puedes elegir entre chimichurri de lulo, mermelada de uchuva, piña ahumada o pico andino", 
          "Agrega Salsas artesanales, Puedes elegir entre alioli artesanal de ajo, mayonesa de cilantro, salsa chipotle y miel, barbacoa casera ahumada, tártara de maracuyá o mayonesa criolla", 
          "Selecciona el queso, elige entre queso campesino, queso crema, cuajada o mozzarella"],
        price: "Desde $19.000"
    }
};


// =========================== MODAL ===========================

const modal = document.getElementById("modalB612");
const mName = document.getElementById("mName");
const mDesc = document.getElementById("mDesc");
const mIngredients = document.getElementById("mIngredients");
const mPrice = document.getElementById("mPrice");

// ABRIR MODAL
document.querySelectorAll("[data-modal]").forEach(btn => {
    btn.addEventListener("click", () => {
        const key = btn.dataset.modal;
        const data = menuData[key];

        mName.textContent = data.name;
        mDesc.textContent = data.desc;
        mIngredients.innerHTML = data.ingredients.map(i => `<li>${i}</li>`).join("");
        mPrice.textContent = data.price;

        modal.classList.add("active");
    });
});

// CERRAR MODAL
document.querySelector(".modal-close").onclick = () => modal.classList.remove("active");
document.querySelector(".modal-overlay").onclick = () => modal.classList.remove("active");


// --------------------------------------------

/* ============ Animación de estrellas para sección experiencia ============ */

const canvasExp = document.getElementById("stars-exp");
if (canvasExp) {
    const ctxExp = canvasExp.getContext("2d");

    function resizeExp() {
        canvasExp.width = canvasExp.offsetWidth;
        canvasExp.height = canvasExp.offsetHeight;
    }

    window.addEventListener("resize", resizeExp);
    resizeExp();

    let starsExp = [];

    for (let i = 0; i < 220; i++) {
        starsExp.push({
            x: Math.random() * canvasExp.width,
            y: Math.random() * canvasExp.height,
            size: Math.random() * 1.8,
            speed: Math.random() * 0.4
        });
    }

    function animateStarsExp() {
        ctxExp.clearRect(0, 0, canvasExp.width, canvasExp.height);

        starsExp.forEach(star => {
            star.y += star.speed;
            if (star.y > canvasExp.height) star.y = 0;

            ctxExp.fillStyle = "white";
            ctxExp.fillRect(star.x, star.y, star.size, star.size);
        });

        requestAnimationFrame(animateStarsExp);
    }

    animateStarsExp();
}


/* -------------------------------------------------- */

/* ========== GALERÍA CONSTELADA: líneas + partículas ========== */
(function(){
  // ---- LÍNEAS DE CONSTELACIÓN (SVG) ----
  const svg = document.getElementById("constellation-lines");
  const items = Array.from(document.querySelectorAll(".gal-item"));

  function updateLines() {
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    // limpiar
    while (svg.firstChild) svg.removeChild(svg.firstChild);

    // calculamos centros y creamos líneas entre items vecinos (estética constelada)
    const centers = items.map(it => {
      const r = it.getBoundingClientRect();
      return {
        x: r.left + r.width / 2 - rect.left,
        y: r.top + r.height / 2 - rect.top
      };
    });

    // Dibuja conexiones: aquí hago un patrón conectando 0-1,1-2,2-3,... y 0-2 para textura
    function addLine(x1,y1,x2,y2, opacity=0.95, width=1.2) {
      const line = document.createElementNS("http://www.w3.org/2000/svg","line");
      line.setAttribute("x1", x1);
      line.setAttribute("y1", y1);
      line.setAttribute("x2", x2);
      line.setAttribute("y2", y2);
      line.setAttribute("stroke", "#FFCE45");
      line.setAttribute("stroke-opacity", opacity);
      line.setAttribute("stroke-width", width);
      line.setAttribute("stroke-linecap","round");
      svg.appendChild(line);
    }

    for (let i=0;i<centers.length;i++){
      if (i+1 < centers.length) addLine(centers[i].x, centers[i].y, centers[i+1].x, centers[i+1].y, 0.25, 1.2);
      // cross connect for poetic shape (skip if too few)
      if (i+2 < centers.length) addLine(centers[i].x, centers[i].y, centers[i+2].x, centers[i+2].y, 0.14, 0.9);
    }
  }

  // actualizar en load y resize
  window.addEventListener("load", updateLines);
  window.addEventListener("resize", () => {
    window.requestAnimationFrame(updateLines);
  });

  // ---- PARTICULAS SUAVES EN CANVAS ----
  const canvasP = document.getElementById("galaxy-particles");
  if (canvasP) {
    const ctxP = canvasP.getContext("2d");
    let w=0,h=0,parts=[];

    function resizeParticles(){
      const parent = canvasP.parentElement;
      w = canvasP.width = parent.clientWidth;
      h = canvasP.height = 380; // altura base; ajusta si cambias diseño
      // generar partículas
      parts = [];
      const count = Math.round((w*h)/60000); // densidad baja
      for (let i=0;i<count;i++){
        parts.push({
          x: Math.random()*w,
          y: Math.random()*h,
          r: 0.3 + Math.random()*1.1,
          speed: 0.05 + Math.random()*0.3,
          alpha: 0.08 + Math.random()*0.22
        });
      }
    }

    function drawParticles(){
      ctxP.clearRect(0,0,w,h);
      parts.forEach(p=>{
        p.y -= p.speed;
        if (p.y < -10) p.y = h + 10;
        ctxP.beginPath();
        ctxP.fillStyle = `rgba(255,255,255,${p.alpha})`;
        ctxP.arc(p.x, p.y, p.r, 0, Math.PI*2);
        ctxP.fill();
      });
      requestAnimationFrame(drawParticles);
    }

    window.addEventListener("resize", () => {
      clearTimeout(canvasP._to);
      canvasP._to = setTimeout(()=>{ resizeParticles(); }, 120);
    });

    resizeParticles();
    drawParticles();
  }

  // ---- FLOATING IDLE (sutil movimiento) ----
  // pequeños offsets en loop para que las tarjetas no se vean estáticas
  const floatEls = items;
  function idleFloat(){
    floatEls.forEach((el, i) => {
      const t = Date.now()/2000 + i;
      const y = Math.sin(t + i)*6; // amplitud
      el.style.transform = `translateY(${y}px)`;
    });
    requestAnimationFrame(idleFloat);
  }
  idleFloat();

  // Reaplicar updateLines cuando cambian posiciones (por hover z-index) con debounce
  let _deb;
  floatEls.forEach(el=>{
    el.addEventListener("mouseenter", ()=> {
      el.style.transform = "translateY(-12px)";
      clearTimeout(_deb);
      _deb = setTimeout(updateLines, 220);
    });
    el.addEventListener("mouseleave", ()=> {
      clearTimeout(_deb);
      _deb = setTimeout(updateLines, 220);
    });
  });

})();


/* -------------------------------------------------- */

/* ============================
   ESTRELLAS — SECCIÓN CONTACTO
============================ */

const canvasContact = document.getElementById("contact-stars");
const ctxContact = canvasContact.getContext("2d");

function resizeContactStars() {
    canvasContact.width = canvasContact.offsetWidth;
    canvasContact.height = canvasContact.offsetHeight;
}
resizeContactStars();
window.addEventListener("resize", resizeContactStars);

let contactStars = [];

for (let i = 0; i < 250; i++) {
    contactStars.push({
        x: Math.random() * canvasContact.width,
        y: Math.random() * canvasContact.height,
        size: Math.random() * 1.7,
        speed: 0.2 + Math.random() * 0.4,
        glow: Math.random() * 0.6 + 0.4
    });
}

function animateContactStars() {
    ctxContact.clearRect(0, 0, canvasContact.width, canvasContact.height);

    contactStars.forEach(star => {
        star.y += star.speed;
        if (star.y > canvasContact.height) star.y = -2;

        // Glow effect
        ctxContact.shadowBlur = 8;
        ctxContact.shadowColor = "white";

        ctxContact.fillStyle = `rgba(255,255,255,${star.glow})`;
        ctxContact.fillRect(star.x, star.y, star.size, star.size);
    });

    requestAnimationFrame(animateContactStars);
}

animateContactStars();



/* -------------------------------------------------- */

  document.addEventListener("DOMContentLoaded", () => {
    const footer = document.querySelector(".footer-b612");

    setInterval(() => {
      footer.style.setProperty(
        "--twinkle-opacity",
        Math.random() * 0.15 + 0.05
      );
    }, 2000);
  });



