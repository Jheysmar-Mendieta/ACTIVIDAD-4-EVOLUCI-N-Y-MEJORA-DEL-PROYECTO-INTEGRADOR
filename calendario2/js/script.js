document.addEventListener("DOMContentLoaded", () => {

const ctx = new (window.AudioContext || window.webkitAudioContext)();

function beep(freq=440, dur=0.08, type="sine", vol=0.15) {
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.connect(g); g.connect(ctx.destination);
    o.type = type; o.frequency.value = freq;
    g.gain.setValueAtTime(vol, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
    o.start(); o.stop(ctx.currentTime + dur);
}

function sonidoNav(){ beep(480,0.07,"sine",0.1); }
function sonidoSel(){ beep(660,0.09,"sine",0.12); }
function sonidoGuardar(){ beep(880,0.08,"sine",0.15); setTimeout(()=>beep(1100,0.1,"sine",0.12),90); }
function sonidoBorrar(){ beep(250,0.15,"sawtooth",0.1); }
function sonidoModo(){ beep(700,0.1,"sine",0.12); setTimeout(()=>beep(900,0.12,"sine",0.1),110); }


const KEY_NOMBRE = "calc_nombre";
const KEY_MODO   = "calc_modo";

const modalOverlay = document.getElementById("modal-overlay");
const inputNombre  = document.getElementById("input-nombre");
const btnGuardar   = document.getElementById("btn-guardar-nombre");
const bienvenida   = document.getElementById("bienvenida");

function cargarNombre() {
    const nombre = localStorage.getItem(KEY_NOMBRE);

    if (!nombre) {
        modalOverlay.classList.remove("oculto");
    } else {
        modalOverlay.classList.add("oculto");
        mostrarBienvenida(nombre);
    }
}

function mostrarBienvenida(n) {
    const h = new Date().getHours();
    const s = h<12 ? "🌅 Buenos días" : h<20 ? "☀️ Buenas tardes" : "🌙 Buenas noches";
    bienvenida.textContent = `${s}, ${n}!`;
}

btnGuardar.addEventListener("click", () => {
    const n = inputNombre.value.trim();
    if (!n) return;

    localStorage.setItem(KEY_NOMBRE, n);
    modalOverlay.classList.add("oculto");
    mostrarBienvenida(n);
    sonidoGuardar();
});

inputNombre.addEventListener("keydown", e => { 
    if(e.key==="Enter") btnGuardar.click(); 
});


const toggle = document.getElementById("mode-toggle");

toggle.addEventListener("change", () => {
    const inf = toggle.checked;
    document.body.classList.toggle("modo-infantil", inf);
    localStorage.setItem(KEY_MODO, inf ? "infantil" : "adulto");

    document.getElementById("titulo-app").textContent = inf ? "🌈 ¡Mi Calendario!" : "📅 Calendario";
    
    sonidoModo();
});

const modoGuardado = localStorage.getItem(KEY_MODO);
if (modoGuardado === "infantil") {
    toggle.checked = true;
    document.body.classList.add("modo-infantil");
    document.getElementById("titulo-app").textContent = "🌈 ¡Mi Calendario!";
}


const feriados = [[0,1],[1,16],[1,17],[2,23],[3,2],[3,3],[4,1],[4,25],[5,15],[5,20],[6,9],[7,17],[9,12],[10,20],[11,8],[11,25]];

function esFeriado(y,m,d){ return feriados.some(([fm,fd])=>fm===m&&fd===d); }

const meses = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];

let date = new Date();
let selectedDay = null;
let selectedYear, selectedMonth;

function claveNota(y,m,d){ return `cal_nota_${y}_${m}_${d}`; }
function getNota(y,m,d){ return localStorage.getItem(claveNota(y,m,d)) || ""; }
function setNota(y,m,d,txt){
    if(txt) localStorage.setItem(claveNota(y,m,d), txt);
    else localStorage.removeItem(claveNota(y,m,d));
}
function tieneNota(y,m,d){ return !!localStorage.getItem(claveNota(y,m,d)); }

function renderCalendar() {
    const daysContainer = document.getElementById("days");
    daysContainer.innerHTML = "";

    const y = date.getFullYear();
    const m = date.getMonth();

    document.getElementById("month").innerText = meses[m];
    document.getElementById("year").innerText = y;

    let primerDia = new Date(y,m,1).getDay();
    if(primerDia===0) primerDia=7;

    const ultimoDia = new Date(y,m+1,0).getDate();
    const hoy = new Date();

    for(let i=1;i<primerDia;i++){
        const empty=document.createElement("div");
        daysContainer.appendChild(empty);
    }

    for(let i=1;i<=ultimoDia;i++){
        const div=document.createElement("div");
        div.innerText=i;

        if(i===hoy.getDate()&&m===hoy.getMonth()&&y===hoy.getFullYear()) div.classList.add("today");
        if(esFeriado(y,m,i)) div.classList.add("holiday");
        if(i===selectedDay) div.classList.add("selected");
        if(tieneNota(y,m,i)) div.classList.add("tiene-nota");

        div.addEventListener("click",()=>{
            if (ctx.state === "suspended") ctx.resume();
            selectedDay=i;
            selectedYear=y;
            selectedMonth=m;
            renderCalendar();
            abrirPanelNota(y,m,i);
            sonidoSel();
        });

        daysContainer.appendChild(div);
    }
}


cargarNombre();
renderCalendar();

});