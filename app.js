// Clave para guardar las sesiones en localStorage
var CLAVE = "sesiones";

// Elementos del DOM
var formulario = document.getElementById("formulario");
var inputFecha = document.getElementById("fecha");
var inputTema = document.getElementById("tema");
var inputMinutos = document.getElementById("minutos");
var lista = document.getElementById("lista");
var vacio = document.getElementById("vacio");
var rachaEl = document.getElementById("racha");
var mensaje = document.getElementById("mensaje");

// Convierte una fecha a texto "AAAA-MM-DD" usando la fecha LOCAL
function aTextoFecha(fecha) {
  var anio = fecha.getFullYear();
  var mes = String(fecha.getMonth() + 1).padStart(2, "0");
  var dia = String(fecha.getDate()).padStart(2, "0");
  return anio + "-" + mes + "-" + dia;
}

// Carga las sesiones guardadas (o un array vacío si no hay)
function cargarSesiones() {
  var datos = localStorage.getItem(CLAVE);
  if (datos) {
    return JSON.parse(datos);
  }
  return [];
}

// Guarda las sesiones en localStorage
function guardarSesiones(sesiones) {
  localStorage.setItem(CLAVE, JSON.stringify(sesiones));
}

// Calcula la racha actual de días consecutivos con sesión
function calcularRacha(sesiones) {
  // Creamos un conjunto con los días que tienen al menos una sesión
  var dias = {};
  for (var i = 0; i < sesiones.length; i++) {
    dias[sesiones[i].fecha] = true;
  }

  var hoy = new Date();
  var cursor = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());

  // Si hoy no hay sesión, empezamos a contar desde ayer (la racha sigue viva)
  if (!dias[aTextoFecha(cursor)]) {
    cursor.setDate(cursor.getDate() - 1);
  }

  var racha = 0;
  while (dias[aTextoFecha(cursor)]) {
    racha++;
    cursor.setDate(cursor.getDate() - 1);
  }
  return racha;
}

// Convierte "AAAA-MM-DD" a un texto legible como "5 oct 2026"
function formatearFecha(texto) {
  var partes = texto.split("-");
  var fecha = new Date(Number(partes[0]), Number(partes[1]) - 1, Number(partes[2]));
  return fecha.toLocaleDateString("es", { day: "numeric", month: "short", year: "numeric" });
}

// Muestra las sesiones en pantalla, de la más reciente a la más antigua
function mostrarSesiones(sesiones) {
  lista.innerHTML = "";

  var ordenadas = sesiones.slice().sort(function (a, b) {
    return a.fecha < b.fecha ? 1 : a.fecha > b.fecha ? -1 : 0;
  });

  vacio.style.display = ordenadas.length === 0 ? "block" : "none";

  for (var i = 0; i < ordenadas.length; i++) {
    var li = document.createElement("li");
    var tema = document.createElement("span");
    tema.className = "tema";
    tema.textContent = ordenadas[i].tema;
    var detalle = document.createElement("span");
    detalle.className = "detalle";
    detalle.textContent = formatearFecha(ordenadas[i].fecha) + " · " + ordenadas[i].minutos + " min";
    li.appendChild(tema);
    li.appendChild(detalle);
    lista.appendChild(li);
  }
}

// Actualiza la racha y la lista en pantalla
function actualizar() {
  var sesiones = cargarSesiones();
  rachaEl.textContent = calcularRacha(sesiones);
  mostrarSesiones(sesiones);
}

// Fecha por defecto: hoy
inputFecha.value = aTextoFecha(new Date());

// Cuando se envía el formulario
formulario.addEventListener("submit", function (evento) {
  evento.preventDefault();
  mensaje.textContent = "";

  var fecha = inputFecha.value;
  var tema = inputTema.value.trim();
  var minutos = Number(inputMinutos.value);

  if (!tema) {
    mensaje.textContent = "El tema es obligatorio.";
    return;
  }
  if (!minutos || minutos <= 0) {
    mensaje.textContent = "Los minutos deben ser un número mayor que 0.";
    return;
  }

  var sesiones = cargarSesiones();
  sesiones.push({ fecha: fecha, tema: tema, minutos: minutos });
  guardarSesiones(sesiones);

  inputTema.value = "";
  inputMinutos.value = "";
  inputFecha.value = aTextoFecha(new Date());
  actualizar();
});

// Primera carga
actualizar();
