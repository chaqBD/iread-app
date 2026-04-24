// NAV SCROLL
window.addEventListener('scroll', () => {
  document.getElementById('main-nav').classList.toggle('scrolled', window.scrollY > 40);
});

// MOBILE MENU
window.toggleMenu = function () {
  document.getElementById('mobile-menu').classList.toggle('open');
};

// SCROLL REVEAL
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 80);
        revealObserver.unobserve(e.target);
      }
    });
  },
  { threshold: 0.1 }
);
document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

// VOTE SYSTEM
let selectedCandidate = null;
let hasVoted = false;

window.selectCandidate = function (index) {
  if (hasVoted) return;
  selectedCandidate = index;
  document.querySelectorAll('.candidate').forEach((c, i) => {
    c.classList.toggle('selected', i === index);
  });
  const btn = document.getElementById('vote-btn');
  btn.disabled = false;
  btn.textContent = 'Cast My Vote →';
};

window.castVote = function () {
  if (selectedCandidate === null || hasVoted) return;
  hasVoted = true;

  const candidates = document.querySelectorAll('.candidate');
  const voteCounts = Array.from(candidates).map((c) => parseInt(c.dataset.votes) || 0);
  voteCounts[selectedCandidate] += 1;
  const total = voteCounts.reduce((a, b) => a + b, 0);

  candidates.forEach((c, i) => {
    const pct = Math.round((voteCounts[i] / total) * 100);
    c.dataset.votes = voteCounts[i];
    c.querySelector('.candidate-pct').textContent = pct + '%';
    c.querySelector('.candidate-bar-fill').style.width = pct + '%';
    c.querySelector('.candidate-fill').style.width = pct + '%';
  });

  const btn = document.getElementById('vote-btn');
  btn.textContent = '✓ Vote Cast — Thank You!';
  btn.disabled = true;
  btn.style.background = 'var(--sage)';

  showToast('Your vote has been cast! Results update live.');
};

// TOAST
let toastTimer;
window.showToast = function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 3500);
};

// JOIN FORM
window.handleJoin = function () {
  const email = document.getElementById('join-email').value.trim();
  if (!email || !email.includes('@')) {
    showToast('Please enter a valid email address.');
    return;
  }
  showToast('Welcome to iRead! Check your inbox for next steps.');
  document.getElementById('join-email').value = '';
};

// HERO CARD STAGGERED ANIMATION
document.querySelectorAll('.journal-card').forEach((card, i) => {
  card.style.animationDelay = 1.4 + i * 0.15 + 's';
});
