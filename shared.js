// Shared JS for HiOja class pages

// Fade-in observer
const observer = new IntersectionObserver((entries) => {
  entries.forEach(el => { if (el.isIntersecting) el.target.classList.add('visible'); });
}, { threshold: 0.08 });
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// Accordion chapters
function initChapters() {
  document.querySelectorAll('.chapter-card').forEach(card => {
    card.querySelector('.ch-top').addEventListener('click', () => {
      const isOpen = card.classList.contains('open');
      // close siblings in same section
      card.closest('.chapters-grid')?.querySelectorAll('.chapter-card.open').forEach(c => c.classList.remove('open'));
      if (!isOpen) card.classList.add('open');
    });
  });
}

// Sidebar navigation
function initSidebar() {
  document.querySelectorAll('.sidebar-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = link.dataset.target;
      // switch active sidebar
      document.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      // switch subject section
      document.querySelectorAll('.subject-section').forEach(s => s.classList.remove('active'));
      const sec = document.getElementById(target);
      if (sec) { sec.classList.add('active'); sec.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });
}

// MCQ quiz
function initMCQ() {
  document.querySelectorAll('.mcq-opt').forEach(opt => {
    opt.addEventListener('click', () => {
      const q = opt.closest('.mcq-q');
      if (q.dataset.answered) return;
      q.dataset.answered = '1';
      q.querySelectorAll('.mcq-opt').forEach(o => o.classList.add(o.dataset.correct === '1' ? 'correct' : 'wrong'));
    });
  });
}

// Animate progress bars
function initProgress() {
  document.querySelectorAll('.prog-fill').forEach(bar => {
    setTimeout(() => { bar.style.width = bar.dataset.width || '0%'; }, 400);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initChapters();
  initSidebar();
  initMCQ();
  initProgress();
  // activate first sidebar link & section
  const firstLink = document.querySelector('.sidebar-link');
  if (firstLink) { firstLink.classList.add('active'); const id = firstLink.dataset.target; if (id) document.getElementById(id)?.classList.add('active'); }
});
