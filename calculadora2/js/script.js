document.addEventListener("DOMContentLoaded", () => {

const ctx = new (window.AudioContext || window.webkitAudioContext)();

function beep(freq = 440, dur = 0.08, type = "sine", vol = 0.2) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(vol, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + dur);
}

function sonidoNum()   { beep(600, 0.06, "sine", 0.1); }
function sonidoOp()    { beep(420, 0.09, "triangle", 0.12); }
function sonidoIgual() { beep(880, 0.1, "sine", 0.18); setTimeout(() => beep(1100, 0.12, "sine", 0.15), 100); }
function sonidoClear() { beep(220, 0.18, "sawtooth", 0.1); }
function sonidoError() { beep(180, 0.25, "square", 0.15); }
function sonidoModo()  { beep(660, 0.12, "sine", 0.12); setTimeout(() => beep(990, 0.15, "sine", 0.12), 120); }

let operacion = "";
const pantalla  = document.getElementById("resultado");
const expresion = document.getElementById("expresion");
const feedback  = document.getElementById("feedback");

const modalOverlay = document.getElementById("modal-overlay");
const inputNombre  = document.getElementById("input-nombre");
const btnGuardar   = document.getElementById("btn-guardar-nombre");
const bienvenida   = document.getElementById("bienvenida");

function cargarNombre() {
    const nombre = localStorage.getItem("calc_nombre");

    if (!nombre) {
        modalOverlay.classList.remove("oculto");
    } else {
        modalOverlay.classList.add("oculto");
        mostrarBienvenida(nombre);
    }
}

function mostrarBienvenida(nombre) {
    const hora = new Date().getHours();
    let saludo = hora < 12 ? "🌅 Buenos días" : hora < 20 ? "☀️ Buenas tardes" : "🌙 Buenas noches";
    bienvenida.textContent = `${saludo}, ${nombre}!`;
}

btnGuardar.addEventListener("click", () => {
    const nombre = inputNombre.value.trim();
    if (!nombre) return;

    localStorage.setItem("calc_nombre", nombre);
    modalOverlay.classList.add("oculto");
    mostrarBienvenida(nombre);
    sonidoIgual();
});

inputNombre.addEventListener("keydown", e => { 
    if (e.key === "Enter") btnGuardar.click(); 
});

const toggle    = document.getElementById("mode-toggle");
const modeLabel = document.getElementById("mode-label");

function aplicarModo(infantil) {
    document.body.classList.toggle("modo-infantil", infantil);
    modeLabel.textContent = infantil ? "👔 Modo Adulto" : "👔 Modo Adulto";

    if (infantil) {
        document.getElementById("titulo-app").textContent = "🧮 ¡Calculadora!";
        feedback.textContent = "";
    } else {
        document.getElementById("titulo-app").textContent = "Calculadora";
    }
}

toggle.addEventListener("change", () => {
    const infantil = toggle.checked;
    localStorage.setItem("calc_modo", infantil ? "infantil" : "adulto");
    aplicarModo(infantil);
    sonidoModo();
});

const modoGuardado = localStorage.getItem("calc_modo");
if (modoGuardado === "infantil") {
    toggle.checked = true;
    aplicarModo(true);
}

function mostrarFeedback(tipo) {
    const modoInfantil = toggle.checked;
    if (!modoInfantil) { 
        feedback.textContent = ""; 
        return; 
    }

    if (tipo === "ok") {
        const frutas = ["🍎","🍊","🍋","🍇","🍓","🍉","🥝","🍑","🍍","🥭"];
        feedback.textContent = frutas[Math.floor(Math.random() * frutas.length)] + " ¡Correcto!";
    } else if (tipo === "error") {
        feedback.textContent = "❌ ¡Ups, error!";
    } else if (tipo === "clear") {
        feedback.textContent = "🧹 Limpiado";
        setTimeout(() => { feedback.textContent = ""; }, 800);
    }
}

function animarResultado() {
    pantalla.classList.remove("pop");
    void pantalla.offsetWidth;
    pantalla.classList.add("pop");
}

function animarError() {
    pantalla.classList.remove("shake");
    void pantalla.offsetWidth;
    pantalla.classList.add("shake");
}

function agregarNumero(num) {
    if (pantalla.textContent === "0" || pantalla.textContent === "Error") {
        pantalla.textContent = num;
        operacion = num;
    } else {
        pantalla.textContent += num;
        operacion += num;
    }

    expresion.textContent = operacion;
    sonidoNum();
}

function agregarOperador(op) {
    const ultimo = operacion.slice(-1);

    if (["+","-","*","/"].includes(ultimo)) {
        operacion = operacion.slice(0, -1) + op;
        pantalla.textContent = pantalla.textContent.slice(0, -1) + op;
        expresion.textContent = operacion;
        return;
    }

    pantalla.textContent += op === "*" ? "×" : op === "/" ? "÷" : op;
    operacion += op;
    expresion.textContent = operacion;
    sonidoOp();
}

function agregarPunto() {
    const partes = operacion.split(/[\+\-\*\/]/);

    if (partes[partes.length - 1].includes(".")) return;

    pantalla.textContent += ".";
    operacion += ".";
    expresion.textContent = operacion;
    sonidoNum();
}

function calcular() {
    if (!operacion) return;

    try {
        const res = Function('"use strict"; return (' + operacion + ')')();
        expresion.textContent = operacion + " =";

        const resStr = parseFloat(res.toFixed(10)).toString();
        pantalla.textContent = resStr;
        operacion = resStr;

        animarResultado();
        sonidoIgual();
        mostrarFeedback("ok");

    } catch {
        pantalla.textContent = "Error";
        expresion.textContent = "";
        operacion = "";

        animarError();
        sonidoError();
        mostrarFeedback("error");
    }
}

function limpiar() {
    operacion = "";
    pantalla.textContent = "0";
    expresion.textContent = "";

    sonidoClear();
    mostrarFeedback("clear");
}

function borrarUltimo() {
    if (pantalla.textContent === "Error") { 
        limpiar(); 
        return; 
    }

    if (operacion.length > 1) {
        operacion = operacion.slice(0, -1);
        let display = pantalla.textContent.slice(0, -1);
        pantalla.textContent = display || "0";
        expresion.textContent = operacion;
    } else {
        pantalla.textContent = "0";
        operacion = "";
        expresion.textContent = "";
    }

    sonidoNum();
}

document.querySelectorAll(".botones button").forEach(boton => {
    boton.addEventListener("click", () => {

        if (ctx.state === "suspended") ctx.resume();

        const accion = boton.dataset.action;
        const valor  = boton.dataset.val;

        if (accion === "num")    agregarNumero(valor);
        if (accion === "op")     agregarOperador(valor);
        if (accion === "dot")    agregarPunto();
        if (accion === "equals") calcular();
        if (accion === "clear")  limpiar();
        if (accion === "delete") borrarUltimo();
    });
});

document.addEventListener("keydown", e => {

    if (ctx.state === "suspended") ctx.resume();

    if ("0123456789".includes(e.key)) agregarNumero(e.key);
    if (["+","-","*","/"].includes(e.key)) {
        e.preventDefault();
        agregarOperador(e.key);
    }

    if (e.key === ".") agregarPunto();
    if (e.key === "Enter" || e.key === "=") {
        e.preventDefault();
        calcular();
    }

    if (e.key === "Escape") limpiar();
    if (e.key === "Backspace") borrarUltimo();
});

cargarNombre();

});