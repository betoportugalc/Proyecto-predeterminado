const PROJECTS = {
  portraits: {
    title: 'RETRATOS', category: 'Retrato', year: '2026',
    hero: 'assets/portrait1.jpg',
    desc: 'Estudios de presencia y luz. Una serie que explora la identidad desde el silencio, la sombra y la mirada directa.',
    credits: 'Fotografía — Rut Noemi / 2026',
    shots: [
      { src: 'assets/portrait2.jpg', cls: 'w-full', h: '80vh' },
      { src: 'assets/portrait3.jpg', cls: 'w-60', h: '70vh' },
      { src: 'assets/portrait1.jpg', cls: 'w-70-r', h: '75vh' },
      { src: 'assets/portrait2.jpg', cls: 'w-50-r', h: '60vh' },
    ],
  },
  events: {
    title: 'EVENTOS', category: 'Evento', year: '2026',
    hero: 'assets/events1.jpg',
    desc: 'Bodas, celebraciones y encuentros, documentados con discreción, emoción y un lenguaje cinematográfico.',
    credits: 'Fotografía — Rut Noemi / 2026',
    shots: [
      { src: 'assets/events2.jpg', cls: 'w-full', h: '80vh' },
      { src: 'assets/events3.jpg', cls: 'w-70-r', h: '72vh' },
      { src: 'assets/events4.jpg', cls: 'w-50', h: '60vh' },
      { src: 'assets/events1.jpg', cls: 'w-50-r', h: '68vh' },
    ],
  },
  commercial: {
    title: 'COMERCIAL', category: 'Comercial', year: '2026',
    hero: 'assets/commercial1.jpg',
    desc: 'Campañas de marca e historias de producto creadas con una mirada editorial depurada y un lenguaje visual limpio.',
    credits: 'Fotografía — Rut Noemi · Dirección de Arte — Estudio Portugal / 2026',
    shots: [
      { src: 'assets/commercial2.jpg', cls: 'w-60', h: '68vh' },
      { src: 'assets/commercial3.jpg', cls: 'w-full', h: '80vh' },
      { src: 'assets/commercial4.jpg', cls: 'w-70-r', h: '74vh' },
      { src: 'assets/commercial1.jpg', cls: 'w-50-r', h: '62vh' },
    ],
  },
  editorial: {
    title: 'EDITORIAL', category: 'Editorial', year: '2026',
    hero: 'assets/editorial1.jpg',
    desc: 'Historias de moda y editoriales construidas con siluetas potentes, textura y drama sutil.',
    credits: 'Fotografía — Rut Noemi · Estilismo — M. Rivas / 2026',
    shots: [
      { src: 'assets/editorial2.jpg', cls: 'w-full', h: '82vh' },
      { src: 'assets/editorial3.jpg', cls: 'w-50', h: '72vh' },
      { src: 'assets/editorial4.jpg', cls: 'w-50-r', h: '72vh' },
      { src: 'assets/editorial1.jpg', cls: 'w-60', h: '66vh' },
    ],
  },
  'fine-art': {
    title: 'ARTE', category: 'Arte', year: '2026',
    hero: 'assets/fineart1.jpg',
    desc: 'Paisajes y atmósferas tratados como pinturas: mínimos, contemplativos, atemporales.',
    credits: 'Fotografía — Rut Noemi / 2026',
    shots: [
      { src: 'assets/fineart2.jpg', cls: 'w-full', h: '84vh' },
      { src: 'assets/fineart3.jpg', cls: 'w-70-r', h: '74vh' },
      { src: 'assets/fineart4.jpg', cls: 'w-50', h: '62vh' },
      { src: 'assets/fineart1.jpg', cls: 'w-60', h: '68vh' },
    ],
  },
  'personal': {
    title: 'PROYECTOS PERSONALES', category: 'Personal', year: '2026',
    hero: 'assets/personal1.jpg',
    desc: 'Ensayos visuales de larga duración, realizados fuera de encargos: la cara privada de la práctica fotográfica.',
    credits: 'Fotografía — Rut Noemi / 2026',
    shots: [
      { src: 'assets/personal2.jpg', cls: 'w-full', h: '80vh' },
      { src: 'assets/personal3.jpg', cls: 'w-60', h: '70vh' },
      { src: 'assets/personal4.jpg', cls: 'w-70-r', h: '76vh' },
      { src: 'assets/personal1.jpg', cls: 'w-50-r', h: '60vh' },
    ],
  },
};

const ORDER = ['portraits', 'events', 'commercial', 'editorial', 'fine-art', 'personal'];

const params = new URLSearchParams(location.search);
const id = params.get('id') || 'portraits';
const p = PROJECTS[id] || PROJECTS.portraits;
const nextId = ORDER[(ORDER.indexOf(id) + 1) % ORDER.length];

document.title = p.title + ' — Rut Noemi';

document.getElementById('p-title').textContent = p.title;
document.getElementById('p-meta').textContent = p.category.toUpperCase() + '  ·  ' + p.year;
document.getElementById('p-desc').textContent = p.desc;
document.getElementById('p-hero').src = p.hero;
document.getElementById('credits').textContent = p.credits;
document.getElementById('next-name').textContent = PROJECTS[nextId].title;
document.getElementById('next-link').href = 'project.html?id=' + nextId;

const gallery = document.getElementById('gallery');
gallery.innerHTML = p.shots.map(s => {
  const inner = `<div class="frame" style="height:${s.h}"><img src="${s.src}" alt="${p.title}"></div>`;
  const extra = s.cls.endsWith('-r') ? ' style="margin-left:auto"' : '';
  return `<figure class="${s.cls.replace('-r','')}"${extra}>${inner}</figure>`;
}).join('');
