/* Each research panel owns its slides, controls, and autoplay timer. */
document.querySelectorAll('[data-carousel]').forEach((carousel) => {
  const track = carousel.querySelector('.carousel-track');
  const slides = Array.from(track.children);
  if (slides.length < 2) return;

  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const interval = Number(carousel.dataset.interval) || 4500;
  const title = carousel.closest('.research-item').querySelector('h3').textContent;
  let index = 0;
  let timer;
  let paused = false;
  let hovered = false;
  let focused = false;
  let visible = false;

  carousel.setAttribute('role', 'region');
  carousel.setAttribute('aria-roledescription', 'carousel');
  carousel.setAttribute('aria-label', `${title} — figures`);
  carousel.classList.add('is-ready');

  slides.forEach((slide, i) => {
    slide.setAttribute('role', 'group');
    slide.setAttribute('aria-roledescription', 'slide');
    slide.setAttribute('aria-label', `${i + 1} of ${slides.length}`);
  });

  // An inert copy lets the last figure slide forward seamlessly to the first.
  const loopSlide = slides[0].cloneNode(true);
  loopSlide.setAttribute('aria-hidden', 'true');
  loopSlide.inert = true;
  track.append(loopSlide);

  const controls = document.createElement('div');
  controls.className = 'carousel-controls';
  const dots = document.createElement('div');
  dots.className = 'carousel-dots';
  dots.setAttribute('role', 'group');
  dots.setAttribute('aria-label', 'Choose a figure');

  const buttons = slides.map((slide, i) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'carousel-dot';
    button.setAttribute('aria-label', `Show figure ${i + 1} of ${slides.length}`);
    button.addEventListener('click', () => show(i));
    button.addEventListener('keydown', (event) => {
      let target;
      if (event.key === 'ArrowRight') target = (i + 1) % slides.length;
      if (event.key === 'ArrowLeft') target = (i - 1 + slides.length) % slides.length;
      if (event.key === 'Home') target = 0;
      if (event.key === 'End') target = slides.length - 1;
      if (target === undefined) return;
      event.preventDefault();
      buttons[target].focus();
      show(target);
    });
    dots.append(button);
    return button;
  });

  const toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.className = 'carousel-toggle';
  function updateToggle() {
    toggle.hidden = motion.matches;
    toggle.innerHTML = paused
      ? '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 5 11 7-11 7z"/></svg>'
      : '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 5h4v14H7zM15 5h4v14h-4z"/></svg>';
    toggle.title = paused ? 'Play' : 'Pause';
    toggle.setAttribute('aria-label', paused ? 'Resume automatic figure changes' : 'Pause automatic figure changes');
  }
  toggle.addEventListener('click', () => {
    paused = !paused;
    // Explicitly pressing Play resumes even while the control still has focus.
    if (!paused) {
      focused = false;
      hovered = false;
    }
    updateToggle();
    schedule();
  });
  controls.append(dots, toggle);
  carousel.append(controls);

  function schedule() {
    clearTimeout(timer);
    if (!paused && !hovered && !focused && visible && !document.hidden && !motion.matches) {
      timer = setTimeout(() => show(index + 1), interval);
    }
  }

  function show(next) {
    index = next;
    track.style.transform = `translateX(-${index * 100}%)`;
    const current = index % slides.length;
    buttons.forEach((button, i) => button.setAttribute('aria-pressed', String(i === current)));
    slides.forEach((slide, i) => slide.setAttribute('aria-hidden', String(i !== current)));
    schedule();
  }

  track.addEventListener('transitionend', (event) => {
    if (event.target !== track || event.propertyName !== 'transform' || index !== slides.length) return;
    track.classList.add('is-resetting');
    index = 0;
    track.style.transform = 'translateX(0)';
    // Commit the invisible reset before allowing another animated movement.
    void track.offsetWidth;
    track.classList.remove('is-resetting');
  });
  carousel.addEventListener('mouseenter', () => { hovered = true; schedule(); });
  carousel.addEventListener('mouseleave', () => { hovered = false; schedule(); });
  carousel.addEventListener('focusin', () => { focused = true; schedule(); });
  carousel.addEventListener('focusout', (event) => {
    focused = carousel.contains(event.relatedTarget);
    schedule();
  });
  document.addEventListener('visibilitychange', schedule);
  motion.addEventListener('change', () => {
    // A reduced-motion change may interrupt the loop transition.
    if (index === slides.length) show(0);
    updateToggle();
    schedule();
  });
  const observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    schedule();
  }, { threshold: 0.25 });
  observer.observe(carousel);
  updateToggle();
  show(0);
});
