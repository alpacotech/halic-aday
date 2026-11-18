const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
document.documentElement.classList.add('js-ready');
if (!reducedMotion) document.documentElement.classList.add('js-motion');

const revealObserver = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); revealObserver.unobserve(e.target); } }), { threshold: .12 });
$$('.reveal').forEach(el => revealObserver.observe(el));

// Navigation and accessible mobile menu.
const menuButton = $('.menu-toggle');
let menuOpen = false;
function setMenu(open) {
  menuOpen = open;
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Menüyü kapat' : 'Menüyü aç');
  $('#mobile-menu').inert = !open;
  $('#mobile-menu').classList.toggle('open', open);
  document.body.classList.toggle('menu-is-open', open);
  document.body.classList.toggle('locked', open);
  $('#main').inert = open;
  $('.footer').inert = open;
  if (!open && $('#mobile-menu').contains(document.activeElement)) menuButton.focus();
  updateHeader();
}
menuButton.addEventListener('click', () => setMenu(!menuOpen));
$$('#mobile-menu a').forEach(a => a.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { setMenu(false); closeDropdown(); }
  if (e.key === 'Tab' && menuOpen) {
    const focusable = $$('.header a,.header button,#mobile-menu a').filter(el => el.getClientRects().length);
    const first = focusable[0], last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
});
matchMedia('(min-width: 901px)').addEventListener('change', e => { if (e.matches && menuOpen) setMenu(false); });
const dropButton = $('.nav-drop>button');
function closeDropdown() { if ($('#program-menu').contains(document.activeElement)) dropButton.focus(); dropButton.setAttribute('aria-expanded', 'false'); }
dropButton.addEventListener('click', () => dropButton.setAttribute('aria-expanded', String(dropButton.getAttribute('aria-expanded') !== 'true')));
document.addEventListener('click', e => { if (!e.target.closest('.nav-drop')) closeDropdown(); });
$$('.dropdown a').forEach(a => a.addEventListener('click', closeDropdown));
function updateHeader() {
  const scrolled = scrollY > 80;
  $('#header').classList.toggle('scrolled', scrolled);
  $('.brand img').src = 'assets/halic-logo-blue.svg';
}
let scrollTick = false;
addEventListener('scroll', () => { if (!scrollTick) { requestAnimationFrame(() => { updateHeader(); scrollTick = false; }); scrollTick = true; } }, { passive: true });
updateHeader();

// Shared native dialogs handle focus, Escape and keyboard navigation.
function openDialog(dialog) { if (menuOpen) setMenu(false); dialog.showModal(); document.body.classList.add('locked'); }
$$('dialog').forEach(dialog => {
  $('.dialog-close', dialog).addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', e => { const r = dialog.getBoundingClientRect(); if (e.target === dialog && (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom)) dialog.close(); });
  dialog.addEventListener('close', () => document.body.classList.remove('locked'));
});
$$('.consult-open').forEach(b => b.addEventListener('click', () => openDialog($('#consult-dialog'))));

// Search the complete official program list, retaining the chosen program for fees.
let programs = [], visibleLimit = 6, currentProgram = null;
const normalize = text => text.toLocaleLowerCase('tr-TR').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ı/g, 'i');
const search = $('#program-search');
const degree = $('#degree-filter');
const score = $('#score-filter');
const language = $('#language-filter');
function matches() {
  const q = normalize(search.value.trim());
  return programs.filter(p => (!q || normalize(`${p.name} ${p.faculty}`).includes(q)) && (!degree.value || p.degree === degree.value) && (!score.value || p.score === score.value) && (!language.value || p.language === language.value));
}
function renderPrograms() {
  const results = matches();
  $('#program-list').replaceChildren();
  results.slice(0, visibleLimit).forEach((p, i) => {
    const b = document.createElement('button'); b.className = 'program-row';
    const index = document.createElement('span'); index.className = 'program-index'; index.textContent = String(i + 1).padStart(2, '0');
    const name = document.createElement('span'); name.className = 'program-name'; name.textContent = p.name;
    const faculty = document.createElement('span'); faculty.className = 'program-faculty'; faculty.textContent = p.faculty;
    const meta = document.createElement('span'); meta.className = 'program-meta';
    const level = document.createElement('span'); level.textContent = p.degree;
    const scoring = document.createElement('span'); scoring.className = 'program-score'; scoring.textContent = p.score || 'Programı incele';
    meta.append(level, scoring);
    const arrow = document.createElement('span'); arrow.className = 'program-arrow'; arrow.textContent = '↗'; arrow.setAttribute('aria-hidden', 'true');
    b.append(index, name, faculty, meta, arrow); b.setAttribute('aria-label', `${p.name}, ${p.degree}, ${p.score}. Ayrıntıları incele`);
    b.addEventListener('click', () => showProgram(p)); $('#program-list').append(b);
  });
  $('#result-count').textContent = `${results.length} program${results.length > visibleLimit ? ` · İlk ${visibleLimit} program gösteriliyor` : ''}`;
  $('#program-empty').hidden = results.length !== 0;
  $('#more-programs').hidden = results.length <= visibleLimit;
  $('#clear-filters').hidden = !(search.value || degree.value || score.value || language.value);
  $$('.interest-chips button').forEach(b => b.setAttribute('aria-pressed', String(normalize(b.dataset.interest) === normalize(search.value.trim()))));
}
function resetFilters() { search.value = ''; degree.value = ''; score.value = ''; language.value = ''; visibleLimit = 6; renderPrograms(); }
[search, degree, score, language].forEach(el => el.addEventListener(el === search ? 'input' : 'change', () => { visibleLimit = 6; renderPrograms(); }));
$('#clear-filters').addEventListener('click', resetFilters); $('#empty-reset').addEventListener('click', resetFilters);
$('#more-programs').addEventListener('click', () => { visibleLimit += 12; renderPrograms(); });
$('.hero-search').addEventListener('submit', e => { e.preventDefault(); resetFilters(); search.value = $('#hero-search').value; renderPrograms(); scrollToFocus($('#bolumler'), search); });
function showProgram(p) {
  currentProgram = p;
  $('#program-dialog-title').textContent = p.name;
  $('#program-dialog-faculty').textContent = p.faculty;
  const facts = $('#program-facts'); facts.replaceChildren();
  [['Eğitim düzeyi', p.degree], ['Puan türü', p.scoreDetail || p.score], ['Eğitim dili', p.language === 'Belirtilmemiş' ? 'Resmî program sayfasından kontrol et' : p.language]].forEach(([label, value], i) => {
    const item = document.createElement('div'); if (i === 2) item.className = 'fact-lang';
    const l = document.createElement('span'); l.textContent = label; const v = document.createElement('strong'); v.textContent = value; item.append(l, v); facts.append(item);
  });
  $('#program-official').href = p.url;
  openDialog($('#program-dialog'));
}
function chooseFeeProgram(p) {
  $('#fee-program').value = p ? p.url : '';
  const box = $('#selected-program'); box.replaceChildren(); box.hidden = !p;
  if (p) { const text = document.createElement('p'); text.textContent = `${p.name} · ${p.degree} · ${p.score}`; const a = document.createElement('a'); a.href = p.url; a.target = '_blank'; a.rel = 'noopener'; a.textContent = 'Programın resmî bilgileri ↗'; box.append(text, a); }
}
$('#program-fees').addEventListener('click', () => { chooseFeeProgram(currentProgram); $('#program-dialog').close(); scrollToFocus($('#ucretler'), $('#fee-program')); });
$('#fee-program').addEventListener('change', e => chooseFeeProgram(programs.find(p => p.url === e.target.value)));
fetch('programs.json').then(r => { if (!r.ok) throw Error('Program listesi yüklenemedi'); return r.json(); }).then(data => {
  programs = data;
  renderPrograms();
  programs.forEach(p => { const option = document.createElement('option'); option.value = p.url; option.textContent = p.name; $('#fee-program').append(option); });
}).catch(() => { $('#result-count').textContent = 'Program listesi şu anda yüklenemiyor.'; $('#program-list').innerHTML = '<a class="arrow-link" href="https://aday.halic.edu.tr/bolumler-programlar/" target="_blank" rel="noopener"><span class="arrow-box">↗</span>Resmî program listesini incele</a>'; $('#more-programs').hidden = true; });

// Reference-style image and text transitions, with keyboard operable tabs.
const slides = [
  { image: 'classroom', alt: 'Bilgisayar laboratuvarında çalışan Haliç Üniversitesi öğrencileri', caption: 'Öğrenmenin ötesine geç.', description: 'Teorik bilgini uygulamayla buluştur. Laboratuvar ve atölyeleriyle Haliç’te öğrenme ortamını yakından tanı.', url: 'https://aday.halic.edu.tr/kampus/' },
  { image: 'events', alt: 'Haliç Üniversitesi eğitim ve etkinlik salonu', caption: 'Fikrini bir adım ileriye taşı.', description: 'Bir fikrin varsa, ilk adımı at. Haliç AI TEKMER’in girişimcilik ve teknoloji ekosistemini yakından incele.', url: 'https://halicaitekmer.com/' },
  { image: 'campus-life', alt: 'Kampüste bir araya gelen Haliç Üniversitesi öğrencileri', caption: 'Dünyayla yeni bağlar kur.', description: 'Erasmus+ ile farklı kültürleri ve öğrenme ortamlarını keşfet. Bölümüne ve ülkeye göre anlaşmalı kurumları incele.', url: 'https://aday.halic.edu.tr/erasmus/' },
  { image: 'pool', alt: 'Haliç Üniversitesi kapalı yüzme havuzu', caption: 'Kendi ritmini keşfet.', description: 'Kültür, sanat ve sporla kampüs yaşamına katıl. Etkinlik alanlarını ve sportif olanakları yakından tanı.', url: 'https://aday.halic.edu.tr/kampus/' }
];
let activeSlide = 0, slideTimeout;
function setSlide(index, focus = false) {
  activeSlide = index; const data = slides[index];
  $$('.opportunity-tabs button').forEach((b, i) => { b.setAttribute('aria-selected', String(i === index)); b.tabIndex = i === index ? 0 : -1; });
  if (focus) $(`#op-tab-${index}`).focus();
  $('#opportunity-panel').setAttribute('aria-labelledby', `op-tab-${index}`);
  $('.opportunity-photo').classList.add('changing');
  clearTimeout(slideTimeout); slideTimeout = setTimeout(async () => {
    const nextImage = new Image(); nextImage.src = `assets/${data.image}.webp`;
    try { await nextImage.decode(); } catch (_) {}
    if (activeSlide !== index) return;
    $('#opportunity-image').src = nextImage.src; $('#opportunity-image').alt = data.alt;
    $('#opportunity-caption').textContent = data.caption; $('#opportunity-description').textContent = data.description;
    $('#opportunity-link').href = data.url; $('#opportunity-number').textContent = String(index + 1).padStart(2, '0');
    $('.slide-progress i').style.transform = `translateX(${index * 100}%)`; $('.opportunity-photo').classList.remove('changing');
  }, reducedMotion ? 0 : 150);
}
$$('.opportunity-tabs button').forEach((b, i) => { b.addEventListener('click', () => setSlide(i)); b.addEventListener('keydown', e => { let next; if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = (i + 1) % 4; if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') next = (i + 3) % 4; if (e.key === 'Home') next = 0; if (e.key === 'End') next = 3; if (next !== undefined) { e.preventDefault(); setSlide(next, true); } }); });

const gallery = $('#campus-gallery');
function galleryStep() {
  return $('.campus-card', gallery).getBoundingClientRect().width + parseFloat(getComputedStyle(gallery).columnGap || '0');
}
function updateGallery() {
  const cards = $$('.campus-card', gallery), atEnd = gallery.scrollLeft + gallery.clientWidth >= gallery.scrollWidth - 5;
  const index = atEnd && gallery.scrollWidth > gallery.clientWidth ? cards.length - 1 : Math.min(cards.length - 1, Math.round(gallery.scrollLeft / galleryStep()));
  $('#gallery-counter').textContent = `${String(index + 1).padStart(2, '0')} / ${String(cards.length).padStart(2, '0')}`;
  $('#gallery-prev').disabled = gallery.scrollLeft < 4; $('#gallery-next').disabled = atEnd;
}
$('#gallery-prev').addEventListener('click', () => gallery.scrollBy({ left: -galleryStep(), behavior: reducedMotion ? 'instant' : 'smooth' }));
$('#gallery-next').addEventListener('click', () => gallery.scrollBy({ left: galleryStep(), behavior: reducedMotion ? 'instant' : 'smooth' }));
gallery.addEventListener('scroll', updateGallery, { passive: true }); addEventListener('resize', updateGallery); updateGallery();

const film = $('#film-dialog video');
$('#play-film').addEventListener('click', () => { openDialog($('#film-dialog')); film.play().catch(() => {}); });
$('#film-dialog').addEventListener('close', () => film.pause());
film.addEventListener('error', () => $('.video-error').hidden = false);
film.querySelector('source').addEventListener('error', () => $('.video-error').hidden = false);

// The keyboard focus follows the visitor's intentional jump.
function scrollToFocus(section, control) {
  control.focus({ preventScroll: true });
  section.scrollIntoView({ behavior: reducedMotion ? 'instant' : 'smooth', block: 'start' });
}

// Interest labels are real shortcuts into the same official program search.
function chooseInterest(value) {
  resetFilters(); search.value = value; renderPrograms();
  scrollToFocus($('#bolumler'), search);
}
$$('[data-interest]').forEach(button => button.addEventListener('click', e => {
  e.preventDefault(); chooseInterest(button.dataset.interest);
}));

// Duplicate the visual strip with an inert copy for a seamless, accessible loop.
const marqueeTrack = $('.marquee-track');
$('.marquee-copy').remove();
const marqueeSet = document.createElement('div'); marqueeSet.className = 'marquee-set';
while (marqueeTrack.firstChild) marqueeSet.append(marqueeTrack.firstChild);
const marqueeCopy = marqueeSet.cloneNode(true); marqueeCopy.setAttribute('aria-hidden', 'true'); marqueeCopy.inert = true;
marqueeTrack.append(marqueeSet, marqueeCopy);

// Continuous movement is optional and background playback stops off screen.
const heroVideo = $('#hero-video'), motionButton = $('#motion-toggle');
let motionPaused = reducedMotion || Boolean(navigator.connection?.saveData), heroInView = true;
async function syncBackgroundVideo() {
  document.body.classList.toggle('motion-paused', motionPaused);
  motionButton.setAttribute('aria-pressed', String(motionPaused));
  motionButton.innerHTML = motionPaused ? '<span>▶</span> Hareketi başlat' : '<span>Ⅱ</span> Hareketi durdur';
  if (motionPaused || !heroInView || $('#film-dialog').open || document.hidden) { heroVideo.pause(); return; }
  if (!heroVideo.src) heroVideo.src = heroVideo.dataset.src;
  try { await heroVideo.play(); } catch (_) { heroVideo.classList.remove('playing'); }
}
heroVideo.addEventListener('playing', () => heroVideo.classList.add('playing'));
heroVideo.addEventListener('error', () => { heroVideo.classList.remove('playing'); motionPaused = true; syncBackgroundVideo(); });
motionButton.addEventListener('click', () => { motionPaused = !motionPaused; syncBackgroundVideo(); });
if (reducedMotion) motionButton.hidden = true;
new IntersectionObserver(entries => { heroInView = entries[0].isIntersecting; syncBackgroundVideo(); }, { threshold: .1 }).observe($('.hero'));
document.addEventListener('visibilitychange', syncBackgroundVideo);
$('#film-dialog').addEventListener('close', syncBackgroundVideo);
$('#play-film').addEventListener('click', () => heroVideo.pause());
syncBackgroundVideo();

// A tall card remains in normal flow so its actions and notes are always readable.
function syncStackCards() {
  $$('.stack-card').forEach((card, index) => {
    const fits = !reducedMotion && innerWidth > 600 && card.offsetHeight <= innerHeight - (112 + index * 20) - 20;
    card.classList.toggle('can-stick', fits);
  });
}
const stackObserver = new ResizeObserver(syncStackCards);
$$('.stack-card').forEach(card => stackObserver.observe(card));
addEventListener('resize', syncStackCards);
document.fonts.ready.then(syncStackCards);
syncStackCards();
