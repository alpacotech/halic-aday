const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const smoothScroll = !reducedMotion && window.Lenis ? new Lenis({
  smoothWheel: true, infinite: false, orientation: 'vertical', gestureOrientation: 'vertical',
  autoRaf: true, autoToggle: false, anchors: true, allowNestedScroll: true,
  syncTouch: false, stopInertiaOnNavigate: true
}) : null;
function syncScrollLock() {
  if (!smoothScroll) return;
  const locked = document.body.classList.contains('locked');
  if (locked && !smoothScroll.isStopped) smoothScroll.stop();
  else if (!locked && smoothScroll.isStopped) smoothScroll.start();
}
document.documentElement.classList.add('js-ready');
if (!reducedMotion) document.documentElement.classList.add('js-motion');

const revealObserver = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); revealObserver.unobserve(e.target); } }), { threshold: .5 });
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
  document.body.classList.toggle('locked', open); syncScrollLock();
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
function openDialog(dialog) { if (menuOpen) setMenu(false); dialog.showModal(); document.body.classList.add('locked'); syncScrollLock(); }
$$('dialog').forEach(dialog => {
  $('.dialog-close', dialog).addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', e => { const r = dialog.getBoundingClientRect(); if (e.target === dialog && (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom)) dialog.close(); });
  dialog.addEventListener('close', () => { document.body.classList.remove('locked'); syncScrollLock(); });
});
$$('.consult-open').forEach(b => b.addEventListener('click', () => openDialog($('#consult-dialog'))));

// Search the complete official program list, retaining the chosen program for fees.
let programs = [], visibleLimit = 6, currentProgram = null, discoveryOpened = false, activeInterest = '';
const normalize = text => text.toLocaleLowerCase('tr-TR').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ı/g, 'i');
const search = $('#program-search');
const degree = $('#degree-filter');
const score = $('#score-filter');
const language = $('#language-filter');
const clinicalPrograms = new Set(['Anestezi', 'Fizyoterapi', 'İlk ve Acil Yardım', 'Optisyenlik', 'Tıbbi Görüntüleme Teknikleri'].map(normalize));
function matches() {
  const q = normalize(search.value.trim());
  return programs.filter(p => {
    const keywordMatch = !q || normalize(`${p.name} ${p.faculty}`).includes(q);
    const healthInterestMatch = /saglik|tip fakultesi/.test(normalize(p.faculty)) || normalize(p.name).includes('saglik') || clinicalPrograms.has(normalize(p.name));
    const interestMatch = activeInterest === 'Sağlık' ? healthInterestMatch : keywordMatch;
    return interestMatch && (!degree.value || p.degree === degree.value) && (!score.value || p.score === score.value) && (!language.value || p.language === language.value);
  });
}
function renderPrograms() {
  const results = matches();
  const hasCriteria = Boolean(search.value || degree.value || score.value || language.value);
  $('#discovery-results').hidden = !(discoveryOpened || hasCriteria);
  const selectedInterest = $$('.interest-ticket').find(b => b.dataset.interest === activeInterest);
  $('#discovery-result-heading').textContent = selectedInterest ? `${selectedInterest.dataset.interest} için bir sahne.` : 'Merakının peşinden.';
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
    const arrow = document.createElement('span'); arrow.className = 'program-arrow'; arrow.innerHTML = '<svg class="ui-chevron" viewBox="0 0 16 20" aria-hidden="true"><path d="m5 4 6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>'; arrow.setAttribute('aria-hidden', 'true');
    b.append(index, name, faculty, meta, arrow); b.setAttribute('aria-label', `${p.name}, ${p.degree}, ${p.score}. Ayrıntıları incele`);
    b.addEventListener('click', () => showProgram(p)); $('#program-list').append(b);
  });
  $('#result-count').textContent = `${results.length} program${results.length > visibleLimit ? ` · İlk ${visibleLimit} program gösteriliyor` : ''}`;
  $('#program-empty').hidden = results.length !== 0;
  $('#more-programs').hidden = results.length <= visibleLimit;
  $('#clear-filters').hidden = !(search.value || degree.value || score.value || language.value);
  $$('.interest-chips button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.interest === activeInterest)));
}
function resetFilters() { discoveryOpened = true; activeInterest = ''; search.value = ''; degree.value = ''; score.value = ''; language.value = ''; visibleLimit = 6; renderPrograms(); }
[search, degree, score, language].forEach(el => el.addEventListener(el === search ? 'input' : 'change', () => { discoveryOpened = true; if (el === search) activeInterest = ''; visibleLimit = 6; renderPrograms(); }));
$('#clear-filters').addEventListener('click', resetFilters); $('#empty-reset').addEventListener('click', resetFilters);
$('#more-programs').addEventListener('click', () => { visibleLimit += 12; renderPrograms(); });
$('.hero-search').addEventListener('submit', e => { e.preventDefault(); resetFilters(); search.value = $('#hero-search').value; renderPrograms(); scrollToFocus($('#discovery-results'), $('#discovery-result-heading')); });
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
  if (p) { const text = document.createElement('p'); text.textContent = `${p.name} · ${p.degree} · ${p.score}`; const a = document.createElement('a'); a.href = p.url; a.target = '_blank'; a.rel = 'noopener'; a.textContent = 'Programın resmî bilgileri'; box.append(text, a); }
}
let pendingProgramFeeJump = false;
$('#program-fees').addEventListener('click', () => { chooseFeeProgram(currentProgram); pendingProgramFeeJump = true; $('#program-dialog').close(); });
$('#program-dialog').addEventListener('close', () => {
  if (!pendingProgramFeeJump) return; pendingProgramFeeJump = false;
  requestAnimationFrame(() => scrollToFocus($('#ucretler'), $('#fee-program')));
});
$('#fee-program').addEventListener('change', e => chooseFeeProgram(programs.find(p => p.url === e.target.value)));
fetch('programs.json').then(r => { if (!r.ok) throw Error('Program listesi yüklenemedi'); return r.json(); }).then(data => {
  programs = data;
  renderPrograms();
  programs.forEach(p => { const option = document.createElement('option'); option.value = p.url; option.textContent = p.name; $('#fee-program').append(option); });
}).catch(() => { $('#discovery-results').hidden = false; $('#result-count').textContent = 'Program listesi şu anda yüklenemiyor.'; $('#program-list').innerHTML = '<a class="arrow-link" href="https://aday.halic.edu.tr/bolumler-programlar/" target="_blank" rel="noopener">Resmî program listesini incele</a>'; $('#more-programs').hidden = true; });

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
  const focusDestination = () => control.focus({ preventScroll: true });
  const cardIndex = referenceCards.indexOf(section);
  const scrollTarget = cardIndex >= 0 ? referenceMarkers[cardIndex] : section;
  if (smoothScroll) smoothScroll.scrollTo(scrollTarget, { offset: cardIndex >= 0 ? -56 : -110, force: true, onComplete: focusDestination });
  else { section.scrollIntoView({ behavior: reducedMotion ? 'instant' : 'smooth', block: 'start' }); focusDestination(); }
}

// Interest labels are real shortcuts into the same official program search.
function chooseInterest(value) {
  resetFilters(); activeInterest = value; search.value = value; renderPrograms();
  scrollToFocus($('#discovery-results'), $('#discovery-result-heading'));
}
$$('[data-interest]').forEach(button => button.addEventListener('click', e => {
  e.preventDefault(); e.stopPropagation(); closeDropdown(); chooseInterest(button.dataset.interest);
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
const keduMascot = $('.kedu-mascot');
let keduInView = false;
function syncKeduMotion() {
  if (!keduMascot) return;
  const source = !motionPaused && keduInView && !document.hidden ? keduMascot.dataset.animatedSrc : keduMascot.dataset.posterSrc;
  if (keduMascot.getAttribute('src') !== source) keduMascot.src = source;
}
if (keduMascot) {
  new IntersectionObserver(entries => { keduInView = entries[0].isIntersecting; syncKeduMotion(); }, { rootMargin: '100px 0px', threshold: .1 }).observe(keduMascot);
  keduMascot.addEventListener('error', () => { if (keduMascot.getAttribute('src') !== keduMascot.dataset.posterSrc) { keduMascot.dataset.animatedSrc = keduMascot.dataset.posterSrc; keduMascot.src = keduMascot.dataset.posterSrc; } });
}
async function syncBackgroundVideo() {
  syncKeduMotion();
  document.body.classList.toggle('motion-paused', motionPaused);
  if (smoothScroll) smoothScroll.options.lerp = motionPaused ? 1 : .1;
  requestReferenceEffects();
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

$('#discovery-result-heading').tabIndex = -1;
$('#explore-all').addEventListener('click', () => { resetFilters(); scrollToFocus($('#discovery-results'), $('#discovery-result-heading')); });
$('.discovery-filters').addEventListener('toggle', e => { if (e.target.open) { discoveryOpened = true; renderPrograms(); } });

// Source-matched scroll targets: outgoing service cards and the nested about media.
const referenceCards = $$('.stack-section > .stack-card');
const referenceMarkers = referenceCards.map((card, index) => {
  const marker = document.createElement('div'); marker.className = 'stack-marker'; marker.setAttribute('aria-hidden', 'true');
  card.before(marker); card.style.zIndex = String(index + 1); return marker;
});
const referenceMedia = $('.intro-photo.scroll-media');
const referenceStates = referenceCards.slice(0, -1).map(() => ({ x: 0, v: 0 }));
const mediaState = { x: 0, v: 0 };
let referenceFrame = 0, referenceLastTime = 0;
const clamp01 = value => Math.max(0, Math.min(1, value));
function syncReferenceCardLayout() {
  referenceCards.forEach((card, index) => {
    const fits = !reducedMotion && innerWidth >= 810 && index < referenceCards.length - 1 && card.offsetHeight <= innerHeight - 70;
    card.classList.toggle('can-stick', fits);
  });
  requestReferenceEffects();
}
function requestReferenceEffects() {
  if (!referenceFrame) referenceFrame = requestAnimationFrame(renderReferenceEffects);
}
function advanceReferenceSpring(state, target, dt) {
  let remaining = dt;
  while (remaining > 0) {
    const step = Math.min(remaining, 1 / 120);
    const acceleration = 500 * (target - state.x) - 60 * state.v;
    state.v += acceleration * step; state.x += state.v * step; remaining -= step;
  }
  if (Math.abs(state.x - target) < .0001 && Math.abs(state.v) < .001) { state.x = target; state.v = 0; }
  return Math.abs(state.x - target) > .0001 || Math.abs(state.v) > .001;
}
function renderReferenceEffects(time) {
  referenceFrame = 0;
  const dt = referenceLastTime ? Math.min((time - referenceLastTime) / 1000, .05) : 1 / 60;
  referenceLastTime = time;
  const staticMotion = reducedMotion || motionPaused;
  let unsettled = false;
  referenceStates.forEach((state, index) => {
    const current = referenceCards[index], next = referenceCards[index + 1];
    const nextTop = referenceMarkers[index + 1].getBoundingClientRect().top;
    const active = !staticMotion && (innerWidth < 810 || current.classList.contains('can-stick'));
    const threshold = innerWidth < 810 && index === 0 ? .5 : 1;
    const target = active ? clamp01((innerHeight + threshold - nextTop) / Math.max(1, next.clientHeight)) : 0;
    unsettled = advanceReferenceSpring(state, target, dt) || unsettled;
    current.style.transform = active ? `scale(${1 - .3 * state.x}) rotate(${10 * state.x}deg)` : 'none';
  });
  if (referenceMedia) {
    const top = referenceMedia.getBoundingClientRect().top;
    const target = staticMotion ? 1 : clamp01((innerHeight - top) / Math.max(1, referenceMedia.clientHeight));
    unsettled = advanceReferenceSpring(mediaState, target, dt) || unsettled;
    referenceMedia.style.transform = `scale(${.7 + .3 * mediaState.x})`;
    $('img', referenceMedia).style.transform = `scale(${1.3 - .3 * mediaState.x})`;
  }
  if (unsettled) requestReferenceEffects(); else referenceLastTime = 0;
}
const referenceResizeObserver = new ResizeObserver(syncReferenceCardLayout);
referenceCards.forEach(card => referenceResizeObserver.observe(card));
if (referenceMedia) referenceResizeObserver.observe(referenceMedia);
addEventListener('scroll', requestReferenceEffects, { passive: true });
addEventListener('resize', syncReferenceCardLayout);
document.fonts.ready.then(syncReferenceCardLayout);

// The reference's short character entrance: x100/rotate5, .03s stagger, .7s easing.
const characterNote = $('.intro-note');
if (characterNote && !reducedMotion) {
  const original = characterNote.textContent;
  characterNote.setAttribute('aria-label', original); characterNote.classList.add('char-reveal'); characterNote.replaceChildren();
  [...original].forEach((letter, index) => {
    const span = document.createElement('span'); span.className = 'scroll-char'; span.textContent = letter;
    span.setAttribute('aria-hidden', 'true'); span.style.setProperty('--char-delay', `${index * .03}s`); characterNote.append(span);
  });
  const characterObserver = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) { characterNote.classList.add('in-view'); characterObserver.disconnect(); }
  }, { threshold: .5 });
  characterObserver.observe(characterNote);
}
syncReferenceCardLayout();
syncBackgroundVideo();

// Sticky panels use their untransformed layout markers as anchor destinations.
function navigateReferenceAnchor(hash, immediate = false) {
  const index = referenceCards.findIndex(card => `#${card.id}` === hash);
  if (index < 0) return false;
  if (smoothScroll) smoothScroll.scrollTo(referenceMarkers[index], { offset: -56, force: true, immediate });
  else referenceCards[index].scrollIntoView({ behavior: 'instant', block: 'start' });
  return true;
}
document.addEventListener('click', event => {
  const link = event.target.closest('a[href^="#"]');
  if (!link || event.defaultPrevented || link.classList.contains('skip') || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  const hash = link.getAttribute('href');
  const target = hash === '#' ? 0 : document.getElementById(hash.slice(1));
  if (target === null) return;
  event.preventDefault(); event.stopPropagation();
  const desiredHash = hash === '#' ? '' : hash;
  if (location.hash !== desiredHash) history.pushState(null, '', desiredHash || `${location.pathname}${location.search}`);
  if (navigateReferenceAnchor(hash)) return;
  if (smoothScroll) smoothScroll.scrollTo(target, { offset: target === 0 ? 0 : -90, force: true });
  else if (target === 0) window.scrollTo({ top: 0, behavior: 'instant' });
  else target.scrollIntoView({ behavior: 'instant', block: 'start' });
});
addEventListener('popstate', () => navigateReferenceAnchor(location.hash, true));
if (location.hash) requestAnimationFrame(() => navigateReferenceAnchor(location.hash, true));
