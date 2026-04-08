Proyecto Integrador — Calculadora & Calendario Web

Materia: Proyecto de Implementación de Sitios Web Dinámicos  
Institución EEST N.º 1 "Eduardo Ader" – Vicente López  
Año 7° 2° B | 1° Cuatrimestre 2026  
Actividad 4 – Evolución y Mejora del Proyecto Integrador

Descripción del Proyecto
Este proyecto consiste en dos herramientas web independientes pero complementarias:

Calculadora
Una calculadora científica básica con experiencia de usuario mejorada. Resuelve la necesidad de contar con una herramienta de cálculo en el navegador que sea accesible tanto para adultos como para niños, con dos modos visuales distintos.

Calendario
Un calendario mensual interactivo que permite al usuario ver el mes actual, navegar entre meses, identificar feriados nacionales argentinos 2026 y agregar notas personales a cada día. Resuelve la necesidad de organización personal directamente desde el navegador.

Funcionalidades Implementadas (Actividad 4)
Mejoras de diseño y UX
- Tipografías distintivas: `Exo 2` + `Share Tech Mono` (modo adulto) / `Fredoka One` (modo infantil)
- Animaciones de feedback al calcular (pop) y en errores (shake)
- Feedback visual con emojis de frutas al obtener un resultado (modo infantil)
- Leyenda visual de colores en el calendario
- Panel de notas animado en el calendario

Persistencia Local (localStorage)
- Nombre del usuario: se guarda al primera visita y persiste entre recargas
- Modo seleccionado: adulto o infantil se recuerda entre sesiones
- Notas del calendario: cada nota queda guardada por fecha (año-mes-día)

Interfaz Adaptativa — Switch de Modos
Ambas aplicaciones incluyen un switch en la barra superior que cambia entre:
- Modo Adulto: diseño oscuro, tipografía monoespaciada, colores profesionales
- Modo Infantil: fondo pastel, tipografía redondeada, colores vibrantes y emojis

Feedback de Audio (Web Audio API)
- Sonido al presionar números
- Sonido diferente para operadores
- Sonido de confirmación al calcular/guardar
- Sonido de error/borrado
- Sonido al cambiar de modo

Estructura del Proyecto
proyecto/
├── calculadora/
│   ├── index.html
│   ├── css/
│   │   └── calculadora.css
│   └── js/
│       └── script.js
├── calendario/
│   ├── index.html
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── script.js
├── README.md
├── .gitignore
└── LICENSE

Instalación y Uso
No requiere dependencias ni servidor. Basta con abrir el archivo `index.html` de cada carpeta en cualquier navegador moderno.

bash
Clonar el repositorio
git clone https://github.com/Jheysmar-Mendieta/ACTIVIDAD-4-EVOLUCI-N-Y-MEJORA-DEL-PROYECTO-INTEGRADOR.git

Abrir cualquiera de los proyectos

cd proyecto-integrador/calculadora2
Abrir index.html en el navegador

cd ../calendario2
Abrir index.html en el navegador

Feriados Nacionales 2026 (Argentina)

El calendario incluye los feriados nacionales vigentes:
Año Nuevo, Carnaval, Día de la Memoria, Malvinas, Semana Santa, Día del Trabajador, 25 de Mayo, Día de Güemes, Día de la Bandera, 9 de Julio, San Martín, Diversidad Cultural, Soberanía Nacional, Inmaculada Concepción y Navidad.

Autor
- Nombre: Jheysmar Mendieta Mamani  
- Curso: 7° 2° B — EEST N.º 1 "Eduardo Ader"  
- Repositorio: https://github.com/Jheysmar-Mendieta/ACTIVIDAD-4-EVOLUCI-N-Y-MEJORA-DEL-PROYECTO-INTEGRADOR