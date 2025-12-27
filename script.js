const canvas = document.getElementById("cartaCanvas");
const ctx = canvas.getContext("2d");
const papel3d = document.getElementById("papel3d");
const papelMsg = document.getElementById("papelMsg");
const closeBtn = document.getElementById("closeBtn");
const subtitle = document.getElementById("subtitle");
const bgFade = document.getElementById("bgFade");

const openSound = document.getElementById("openSound");
const closeSound = document.getElementById("closeSound");
const bgMusic = document.getElementById("bgMusic");

let open = false;

// ✨ Carta cerrada morada
function drawCarta() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Cuerpo blanco
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(50, 80, 300, 150);

  // Borde morado
  ctx.strokeStyle = "#b37bff";
  ctx.lineWidth = 3;
  ctx.strokeRect(50, 80, 300, 150);

  // Tapa superior morada pastel
  ctx.fillStyle = "#d7b3ff";
  ctx.beginPath();
  ctx.moveTo(50, 80);
  ctx.lineTo(200, 180);
  ctx.lineTo(350, 80);
  ctx.closePath();
  ctx.fill();
}
drawCarta();

// Texto de la carta
let mensaje = `Hola ✨,

Quiero desearte un muy feliz Año Nuevo 🎆✨.
Gracias por estar presente y por ser una amiga tan especial.
Que este nuevo año venga lleno de salud, alegría y momentos inolvidables 💕.

Que cada meta que te propongas se acerque un poquito más,
que no falten las sonrisas, los sueños cumplidos y la paz en tu corazón 🌷.
Deseo que la vida te regale razones para celebrar cada día.

Gracias por tu amistad y por compartir tantos momentos bonitos.
Te mando un fuerte abrazo y mis mejores deseos para este nuevo comienzo ✨.

Con mucho cariño,
Carlitos`;



// Máquina de escribir
function escribirTexto(texto, elemento, velocidad = 50) {
  elemento.innerHTML = "";
  let i = 0;
  const intervalo = setInterval(() => {
    elemento.innerHTML += texto[i];
    i++;
    if (i >= texto.length) clearInterval(intervalo);
  }, velocidad);
}

// Corazones morados flotando
function crearCorazon() {
  const corazon = document.createElement("div");
  corazon.classList.add("corazon");
  corazon.innerHTML = "🍷";
  corazon.style.left = Math.random() * 100 + "vw";
  corazon.style.bottom = "0px";
  document.body.appendChild(corazon);
  setTimeout(() => corazon.remove(), 4000);
}


// Abrir la carta
canvas.addEventListener("click", () => {
  if (!open) {
    open = true;

    gsap.to(canvas, { y: -80, opacity: 0, duration: 1 });

    setTimeout(() => {
      papel3d.classList.add("visible");
      escribirTexto(mensaje, papelMsg, 45);

      bgFade.classList.add("bg-fade-dark");
      closeBtn.classList.add("visible");
      subtitle.style.opacity = 0;

      openSound.play();
      bgMusic.play();

      setInterval(crearCorazon, 400);

    }, 800);
  }
});

// Cerrar carta
closeBtn.addEventListener("click", () => {
  open = false;

  papel3d.classList.remove("visible");
  bgFade.classList.remove("bg-fade-dark");
  closeBtn.classList.remove("visible");

  gsap.to(canvas, { y: 0, opacity: 1, duration: 1 });

  subtitle.style.opacity = 1;

  closeSound.play();
  bgMusic.pause();
});
