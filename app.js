/* ═══════════════════════════════════════════════════════
   POLYGLOTTE — app.js  (Frontend complet)
   ═══════════════════════════════════════════════════════ */

// ── STATE ──────────────────────────────────────────────
const STATE = {
  user: null,
  stats: null,
  progress: {}, // { lang: { lesson_id: { xp, accuracy } } }
  currentLang: null,
  currentLevel: 'A1',
  lesson: {
    langCode: null,
    lessonId: null,
    exercises: [],
    index: 0,
    correct: 0,
    total: 0,
    lives: 3,
    answer: null,  // selected answer
    answered: false,
  }
};

// ── INIT ───────────────────────────────────────────────
window.addEventListener('DOMContentLoaded', async () => {
  initGoogleAuth();
  const token = localStorage.getItem('poly_token');
  if (token) {
    try {
      const data = await api('/api/auth/me');
      STATE.user = data.user;
      STATE.stats = data.stats;
      await loadAllProgress();
      showScreen('home');
      renderHome();
    } catch { showScreen('auth'); }
  } else {
    showScreen('auth');
  }

  // Auth tabs
  document.querySelectorAll('.auth-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById('tab-login').classList.toggle('active', tab.dataset.tab === 'login');
      document.getElementById('tab-register').classList.toggle('active', tab.dataset.tab === 'register');
      document.getElementById('tab-login').classList.toggle('hidden', tab.dataset.tab !== 'login');
      document.getElementById('tab-register').classList.toggle('hidden', tab.dataset.tab !== 'register');
    });
  });
});

// ── GOOGLE AUTH ────────────────────────────────────────
function initGoogleAuth() {
  if (!window.google) return;
  const GOOGLE_CLIENT_ID = window.GOOGLE_CLIENT_ID || ''; // injected server-side if needed
  if (!GOOGLE_CLIENT_ID) return;
  const cfg = {
    client_id: GOOGLE_CLIENT_ID,
    callback: onGoogleToken,
    auto_select: false,
  };
  google.accounts.id.initialize(cfg);
  google.accounts.id.renderButton(document.getElementById('g_id_signin_btn'), { theme: 'outline', size: 'large', width: 280 });
  google.accounts.id.renderButton(document.getElementById('g_id_signin_btn2'), { theme: 'outline', size: 'large', width: 280 });
}

async function onGoogleToken(resp) {
  try {
    // Decode JWT payload (no verification, server trusts Google)
    const payload = JSON.parse(atob(resp.credential.split('.')[1]));
    const data = await api('/api/auth/google', 'POST', {
      google_id: payload.sub,
      email: payload.email,
      display_name: payload.name,
      avatar: payload.picture,
    });
    localStorage.setItem('poly_token', data.token);
    STATE.user = data.user;
    await loadAllProgress();
    showScreen('home');
    renderHome();
  } catch(e) { showError('login-error', e.message); }
}

// ── AUTH ACTIONS ───────────────────────────────────────
async function doLogin() {
  const identifier = document.getElementById('login-identifier').value.trim();
  const password = document.getElementById('login-password').value;
  if (!identifier || !password) return showError('login-error', 'Champs requis');
  try {
    const data = await api('/api/auth/login', 'POST', { identifier, password });
    localStorage.setItem('poly_token', data.token);
    STATE.user = data.user;
    STATE.stats = null;
    await loadAllProgress();
    showScreen('home');
    renderHome();
  } catch(e) { showError('login-error', e.message); }
}

async function doRegister() {
  const username = document.getElementById('reg-username').value.trim();
  const email = document.getElementById('reg-email').value.trim();
  const password = document.getElementById('reg-password').value;
  if (!username || !email || !password) return showError('reg-error', 'Champs requis');
  try {
    const data = await api('/api/auth/register', 'POST', { username, email, password });
    localStorage.setItem('poly_token', data.token);
    STATE.user = data.user;
    STATE.stats = null;
    await loadAllProgress();
    showScreen('home');
    renderHome();
  } catch(e) { showError('reg-error', e.message); }
}

async function doGuest() {
  const data = await api('/api/auth/guest', 'POST', {});
  localStorage.setItem('poly_token', data.token);
  STATE.user = data.user;
  STATE.stats = null;
  await loadAllProgress();
  showScreen('home');
  renderHome();
}

async function doLogout() {
  await api('/api/auth/logout', 'POST', {});
  localStorage.removeItem('poly_token');
  STATE.user = null; STATE.stats = null; STATE.progress = {};
  showScreen('auth');
}

// ── PROGRESS ───────────────────────────────────────────
async function loadAllProgress() {
  try {
    const data = await api('/api/progress');
    STATE.stats = data.stats;
    STATE.progress = {};
    for (const row of data.completed) {
      if (!STATE.progress[row.lang]) STATE.progress[row.lang] = {};
      STATE.progress[row.lang][row.lesson_id] = { xp: row.xp, accuracy: row.accuracy };
    }
  } catch {}
}

function getLangProgress(lang) {
  return STATE.progress[lang] || {};
}

function getLessonDone(lang, lessonId) {
  return !!(STATE.progress[lang]?.[lessonId]);
}

// ── HOME SCREEN ────────────────────────────────────────
function renderHome() {
  const name = STATE.user?.display_name || STATE.user?.username || 'ami';
  document.getElementById('home-username').textContent = name;
  document.getElementById('hdr-xp').textContent = STATE.stats?.total_xp || 0;
  document.getElementById('hdr-streak').textContent = STATE.stats?.streak || 1;

  const grid = document.getElementById('lang-grid');
  grid.innerHTML = '';
  for (const [code, lang] of Object.entries(CURRICULUM)) {
    const langProg = getLangProgress(code);
    const totalLessons = lang.units.flatMap(u => u.lessons).length;
    const doneLessons = Object.keys(langProg).length;
    const xp = Object.values(langProg).reduce((s, v) => s + (v.xp || 0), 0);

    const card = document.createElement('div');
    card.className = 'lang-card';
    card.style.setProperty('--lang-color', lang.color);
    card.innerHTML = `
      <span class="lang-flag">${lang.flag}</span>
      <div class="lang-name">${lang.name}</div>
      <div class="lang-native">${lang.native}</div>
      <div class="lang-xp-badge">⚡ ${xp} XP · ${doneLessons}/${totalLessons} leçons</div>
    `;
    card.onclick = () => openLang(code);
    grid.appendChild(card);
  }
}

// ── LANGUAGE SCREEN ────────────────────────────────────
function openLang(code) {
  STATE.currentLang = code;
  const lang = CURRICULUM[code];
  document.getElementById('lang-header-title').textContent = `${lang.flag} ${lang.name}`;
  document.getElementById('lang-hdr-xp').textContent = STATE.stats?.total_xp || 0;
  document.getElementById('lang-hdr-streak').textContent = STATE.stats?.streak || 1;

  // Detect best starting level
  const prog = getLangProgress(code);
  const allLessons = lang.units.flatMap(u => u.lessons);
  const a1Lessons = lang.units.filter(u => u.level === 'A1').flatMap(u => u.lessons);
  const a1Done = a1Lessons.filter(l => prog[l.id]).length;
  const suggestedLevel = a1Done >= a1Lessons.length * 0.8 ? 'A2' : 'A1';
  STATE.currentLevel = suggestedLevel;

  // Show adaptive banner if appropriate
  checkAdaptiveBanner(code);

  showScreen('lang');
  renderLevelPills(code);
  renderUnits(code, STATE.currentLevel);
}

function renderLevelPills(code) {
  document.querySelectorAll('.pill').forEach(p => {
    p.classList.toggle('active', p.dataset.lvl === STATE.currentLevel);
    p.onclick = () => {
      STATE.currentLevel = p.dataset.lvl;
      renderLevelPills(code);
      renderUnits(code, p.dataset.lvl);
      document.getElementById('adaptive-banner').classList.add('hidden');
    };
  });
}

function checkAdaptiveBanner(code) {
  const prog = getLangProgress(code);
  const lang = CURRICULUM[code];
  const banner = document.getElementById('adaptive-banner');
  const msg = document.getElementById('adaptive-msg');

  const levelLessons = (lvl) => lang.units.filter(u => u.level === lvl).flatMap(u => u.lessons);
  const doneRatio = (lvl) => {
    const lessons = levelLessons(lvl);
    if (!lessons.length) return 0;
    const done = lessons.filter(l => prog[l.id]);
    const totalAcc = done.reduce((s, l) => s + (prog[l.id]?.accuracy || 0), 0);
    const avgAcc = done.length ? totalAcc / done.length : 0;
    return { ratio: done.length / lessons.length, acc: avgAcc };
  };

  const cur = doneRatio(STATE.currentLevel);
  banner.classList.add('hidden');

  if (cur.ratio > 0.7 && cur.acc > 85) {
    const levels = ['A1','A2','B1'];
    const idx = levels.indexOf(STATE.currentLevel);
    if (idx < levels.length - 1) {
      msg.textContent = `💡 Excellent ! Vous maîtrisez le niveau ${STATE.currentLevel} à ${Math.round(cur.acc)}%. Prêt pour le niveau supérieur ?`;
      banner.classList.remove('hidden');
    }
  } else if (cur.ratio > 0.3 && cur.acc < 60) {
    const levels = ['A1','A2','B1'];
    const idx = levels.indexOf(STATE.currentLevel);
    if (idx > 0) {
      msg.textContent = `⚠️ Votre précision au niveau ${STATE.currentLevel} est de ${Math.round(cur.acc)}%. Réviser le niveau précédent pourrait aider.`;
      banner.classList.remove('hidden');
    }
  }
}

function skipToNextLevel() {
  const levels = ['A1','A2','B1'];
  const idx = levels.indexOf(STATE.currentLevel);
  if (idx < levels.length - 1) {
    STATE.currentLevel = levels[idx + 1];
    renderLevelPills(STATE.currentLang);
    renderUnits(STATE.currentLang, STATE.currentLevel);
    document.getElementById('adaptive-banner').classList.add('hidden');
  }
}

function slowDownLevel() {
  const levels = ['A1','A2','B1'];
  const idx = levels.indexOf(STATE.currentLevel);
  if (idx > 0) {
    STATE.currentLevel = levels[idx - 1];
    renderLevelPills(STATE.currentLang);
    renderUnits(STATE.currentLang, STATE.currentLevel);
    document.getElementById('adaptive-banner').classList.add('hidden');
  }
}

function renderUnits(code, level) {
  const lang = CURRICULUM[code];
  const prog = getLangProgress(code);
  const container = document.getElementById('units-container');
  container.innerHTML = '';

  const units = lang.units.filter(u => u.level === level);
  if (!units.length) {
    container.innerHTML = `<div style="text-align:center;color:var(--text2);padding:40px">Aucune unité disponible pour ce niveau.</div>`;
    return;
  }

  // Determine which lessons are unlocked (sequential unlock)
  const allLessons = lang.units.flatMap(u => u.lessons);
  let firstLocked = false;

  units.forEach((unit, ui) => {
    const totalLessons = unit.lessons.length;
    const doneLessons = unit.lessons.filter(l => prog[l.id]).length;
    const pct = totalLessons ? Math.round((doneLessons / totalLessons) * 100) : 0;

    const card = document.createElement('div');
    card.className = 'unit-card';
    card.innerHTML = `
      <div class="unit-header" onclick="toggleUnit(this)">
        <span class="unit-icon">${unit.icon}</span>
        <div class="unit-info">
          <div class="unit-title">${unit.title}</div>
          <div class="unit-meta">${unit.lessons.length} leçons · Niveau ${unit.level}</div>
        </div>
        <div class="unit-progress">
          <div class="unit-bar-wrap"><div class="unit-bar" style="width:${pct}%"></div></div>
          <span class="unit-pct">${pct}%</span>
        </div>
        <span class="unit-chevron">›</span>
      </div>
      <div class="lesson-list hidden" id="unit-lessons-${unit.id}">
        ${unit.lessons.map((lesson, li) => {
          const done = prog[lesson.id];
          const xp = done?.xp || 0;
          const acc = done ? Math.round(done.accuracy) + '%' : '';
          // Unlock logic: first lesson always free, then sequential
          const prevDone = li === 0 ? true : !!prog[unit.lessons[li-1]?.id];
          const locked = !prevDone && !done && ui > 0;
          return `
            <div class="lesson-item${locked ? ' locked' : ''}" onclick="${locked ? '' : `startLesson('${code}','${lesson.id}')`}">
              <div class="lesson-dot${done ? ' done' : ''}"></div>
              <div class="lesson-title-wrap">
                <div class="lesson-name">${lesson.title}</div>
                <div class="lesson-count">${lesson.exercises.length} exercices${acc ? ' · ' + acc : ''}</div>
              </div>
              ${done ? `<div class="lesson-xp-badge">⚡${xp}</div>` : ''}
              ${locked ? '<span style="color:var(--text3)">🔒</span>' : ''}
            </div>`;
        }).join('')}
      </div>
    `;
    container.appendChild(card);
    // Auto-open first unit
    if (ui === 0) {
      card.classList.add('open');
      card.querySelector('.lesson-list').classList.remove('hidden');
    }
  });
}

function toggleUnit(header) {
  const card = header.parentElement;
  const list = card.querySelector('.lesson-list');
  const isOpen = card.classList.toggle('open');
  list.classList.toggle('hidden', !isOpen);
}

// ── LESSON ENGINE ──────────────────────────────────────
function startLesson(langCode, lessonId) {
  const lang = CURRICULUM[langCode];
  const unit = lang.units.find(u => u.lessons.find(l => l.id === lessonId));
  const lesson = unit?.lessons.find(l => l.id === lessonId);
  if (!lesson) return;

  // Shuffle exercises for variety but keep grammar cards first
  const grammars = lesson.exercises.filter(e => e.type === 'grammar');
  const others = shuffle(lesson.exercises.filter(e => e.type !== 'grammar'));
  const exercises = [...grammars, ...others];

  STATE.lesson = {
    langCode, lessonId,
    exercises,
    index: 0,
    correct: 0,
    total: exercises.length,
    lives: 3,
    answer: null,
    answered: false,
  };

  showScreen('lesson');
  renderExercise();
}

function renderExercise() {
  const L = STATE.lesson;
  const ex = L.exercises[L.index];
  if (!ex) return finishLesson();

  // Progress bar
  document.getElementById('lesson-progress-bar').style.width = `${(L.index / L.total) * 100}%`;
  // Lives
  document.getElementById('lesson-lives').innerHTML = '❤️'.repeat(L.lives) + '🖤'.repeat(3 - L.lives);

  L.answer = null;
  L.answered = false;

  const main = document.getElementById('lesson-main');
  const footer = document.getElementById('lesson-footer');
  main.innerHTML = '';
  footer.innerHTML = '';

  // Remove old feedback
  document.querySelectorAll('.feedback-bar').forEach(f => f.remove());

  // Direction attribute for RTL languages
  const lang = CURRICULUM[L.langCode];
  main.style.direction = lang.dir || 'ltr';

  const typeLabels = {
    flashcard: '🃏 Carte mémoire',
    qcm: '📝 Choix multiple',
    truefalse: '✅ Vrai ou Faux',
    fill: '📝 Compléter',
    pair: '🔗 Association',
    order: '🔀 Remettre en ordre',
    listen: '🔊 Écouter',
    grammar: '📖 Grammaire',
  };

  const label = document.createElement('div');
  label.className = 'exercise-type-label';
  label.textContent = typeLabels[ex.type] || ex.type;
  main.appendChild(label);

  switch(ex.type) {
    case 'flashcard': renderFlashcard(ex, main, footer); break;
    case 'qcm':       renderQCM(ex, main, footer); break;
    case 'truefalse': renderTrueFalse(ex, main, footer); break;
    case 'fill':      renderFill(ex, main, footer); break;
    case 'pair':      renderPair(ex, main, footer); break;
    case 'order':     renderOrder(ex, main, footer); break;
    case 'listen':    renderListen(ex, main, footer); break;
    case 'grammar':   renderGrammar(ex, main, footer); break;
    default:          renderQCM(ex, main, footer);
  }
}

/* ── Exercise renderers ── */

function renderFlashcard(ex, main, footer) {
  const card = document.createElement('div');
  card.className = 'flashcard';
  card.innerHTML = `
    <div class="flashcard-inner">
      <div class="flashcard-front">
        <div class="flashcard-char">${ex.q}</div>
        <div class="flashcard-hint">${ex.hint || ''}</div>
        <div class="flashcard-prompt">Cliquez pour retourner</div>
      </div>
      <div class="flashcard-back">
        <div class="flashcard-answer">${ex.a}</div>
        <div class="flashcard-tip">${ex.hint || ''}</div>
      </div>
    </div>`;
  card.onclick = () => {
    card.classList.toggle('flipped');
    if (card.classList.contains('flipped') && !STATE.lesson.answered) {
      STATE.lesson.answered = true;
      STATE.lesson.answer = 'seen';
      renderFlashcardButtons(footer);
    }
  };
  main.appendChild(card);
}

function renderFlashcardButtons(footer) {
  footer.innerHTML = `
    <div style="display:flex;gap:10px">
      <button class="btn-ghost" style="flex:1" onclick="flashcardAnswer(false)">😕 À revoir</button>
      <button class="btn-primary" style="flex:1" onclick="flashcardAnswer(true)">✅ Je savais</button>
    </div>`;
}

function flashcardAnswer(knew) {
  STATE.lesson.answer = knew ? 'correct' : 'wrong';
  if (knew) STATE.lesson.correct++;
  else STATE.lesson.lives = Math.max(0, STATE.lesson.lives - 1);
  nextExercise();
}

function renderQCM(ex, main, footer) {
  const q = document.createElement('div');
  q.className = 'exercise-question';
  q.textContent = ex.q;
  main.appendChild(q);

  const grid = document.createElement('div');
  grid.className = 'choices-grid';
  const choices = ex.choices || [];
  choices.forEach((c, i) => {
    const btn = document.createElement('button');
    btn.className = 'choice-btn';
    btn.textContent = c;
    btn.onclick = () => {
      if (STATE.lesson.answered) return;
      document.querySelectorAll('.choice-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      STATE.lesson.answer = i;
      document.getElementById('btn-check')?.removeAttribute('disabled');
    };
    grid.appendChild(btn);
  });
  main.appendChild(grid);

  footer.innerHTML = `<button class="btn-check" id="btn-check" onclick="checkAnswer()" disabled>Vérifier</button>`;
}

function renderTrueFalse(ex, main, footer) {
  const q = document.createElement('div');
  q.className = 'exercise-question';
  q.textContent = ex.q;
  main.appendChild(q);

  const row = document.createElement('div');
  row.className = 'tf-row';
  row.innerHTML = `
    <button class="tf-btn true-btn" onclick="tfAnswer(true, ${ex.correct})">✅ Vrai</button>
    <button class="tf-btn false-btn" onclick="tfAnswer(false, ${ex.correct})">❌ Faux</button>`;
  main.appendChild(row);
  footer.innerHTML = '';
}

function tfAnswer(userVal, correct) {
  if (STATE.lesson.answered) return;
  STATE.lesson.answered = true;
  const isCorrect = userVal === correct;
  STATE.lesson.answer = userVal;
  document.querySelectorAll('.tf-btn').forEach(b => b.classList.add('disabled'));
  const trueBtn = document.querySelector('.true-btn');
  const falseBtn = document.querySelector('.false-btn');
  if (isCorrect) {
    STATE.lesson.correct++;
    (userVal ? trueBtn : falseBtn).classList.add('correct');
    showFeedback(true, 'Correct !', '');
  } else {
    (userVal ? trueBtn : falseBtn).classList.add('incorrect');
    (!userVal ? trueBtn : falseBtn).classList.add('correct');
    STATE.lesson.lives = Math.max(0, STATE.lesson.lives - 1);
    showFeedback(false, 'Incorrect', `La bonne réponse est : ${correct ? 'Vrai' : 'Faux'}`);
  }
}

function renderFill(ex, main, footer) {
  const q = document.createElement('div');
  q.className = 'exercise-question';
  q.textContent = ex.q;
  main.appendChild(q);

  const wrap = document.createElement('div');
  wrap.className = 'fill-wrap';
  wrap.innerHTML = `<div class="fill-choices">
    ${(ex.choices || [ex.answer]).map(c => `
      <button class="fill-chip" onclick="fillSelect(this, '${c.replace(/'/g,"\\'")}', '${ex.answer.replace(/'/g,"\\'")}')">
        ${c}
      </button>`).join('')}
  </div>`;
  main.appendChild(wrap);
  footer.innerHTML = '';
}

function fillSelect(btn, choice, answer) {
  if (STATE.lesson.answered) return;
  STATE.lesson.answered = true;
  STATE.lesson.answer = choice;
  document.querySelectorAll('.fill-chip').forEach(b => b.classList.add('disabled'));

  const isCorrect = choice === answer;
  btn.classList.add(isCorrect ? 'correct' : 'incorrect');
  if (!isCorrect) {
    document.querySelectorAll('.fill-chip').forEach(b => {
      if (b.textContent.trim() === answer) b.classList.add('correct');
    });
    STATE.lesson.lives = Math.max(0, STATE.lesson.lives - 1);
    showFeedback(false, 'Incorrect', `Réponse : ${answer}`);
  } else {
    STATE.lesson.correct++;
    showFeedback(true, 'Correct !', '');
  }
}

function renderPair(ex, main, footer) {
  const q = document.createElement('div');
  q.className = 'exercise-question';
  q.style.fontSize = '1.1rem';
  q.textContent = ex.q;
  main.appendChild(q);

  // Shuffle both columns independently
  const pairs = ex.pairs || [];
  const leftItems = shuffle([...pairs.map(p => p[0])]);
  const rightItems = shuffle([...pairs.map(p => p[1])]);
  const pairMap = Object.fromEntries(pairs);

  const cols = document.createElement('div');
  cols.className = 'pair-cols';

  let selectedLeft = null, selectedRight = null;
  let matched = 0;

  const leftBtns = [], rightBtns = [];

  leftItems.forEach((item, i) => {
    const btn = document.createElement('div');
    btn.className = 'pair-item';
    btn.textContent = item;
    btn.dataset.val = item;
    btn.dataset.side = 'left';
    btn.onclick = () => selectPairItem(btn, 'left');
    cols.appendChild(btn);
    leftBtns.push(btn);
  });
  rightItems.forEach((item, i) => {
    const btn = document.createElement('div');
    btn.className = 'pair-item';
    btn.textContent = item;
    btn.dataset.val = item;
    btn.dataset.side = 'right';
    btn.onclick = () => selectPairItem(btn, 'right');
    cols.appendChild(btn);
    rightBtns.push(btn);
  });
  main.appendChild(cols);
  footer.innerHTML = '';

  function selectPairItem(btn, side) {
    if (btn.classList.contains('matched') || btn.classList.contains('disabled')) return;
    if (side === 'left') {
      leftBtns.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedLeft = btn;
    } else {
      rightBtns.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedRight = btn;
    }
    if (selectedLeft && selectedRight) {
      const lVal = selectedLeft.dataset.val;
      const rVal = selectedRight.dataset.val;
      const isCorrect = pairMap[lVal] === rVal;
      if (isCorrect) {
        selectedLeft.classList.remove('selected');
        selectedRight.classList.remove('selected');
        selectedLeft.classList.add('matched');
        selectedRight.classList.add('matched');
        matched++;
        if (matched === pairs.length) {
          STATE.lesson.answered = true;
          STATE.lesson.answer = 'done';
          STATE.lesson.correct++;
          showFeedback(true, 'Parfait !', 'Toutes les paires trouvées !');
        }
      } else {
        selectedLeft.classList.add('wrong');
        selectedRight.classList.add('wrong');
        setTimeout(() => {
          selectedLeft.classList.remove('wrong', 'selected');
          selectedRight.classList.remove('wrong', 'selected');
          selectedLeft = null; selectedRight = null;
        }, 600);
      }
    }
  }
}

function renderOrder(ex, main, footer) {
  const q = document.createElement('div');
  q.className = 'exercise-question';
  q.style.fontSize = '1.1rem';
  q.textContent = ex.q;
  main.appendChild(q);

  const wrap = document.createElement('div');
  wrap.className = 'order-wrap';
  const slots = document.createElement('div');
  slots.className = 'order-slots';
  slots.id = 'order-slots';
  const bank = document.createElement('div');
  bank.className = 'order-banks';
  bank.id = 'order-bank';

  const words = shuffle([...ex.words]);
  const placed = [];

  words.forEach(word => {
    const btn = document.createElement('div');
    btn.className = 'order-word';
    btn.textContent = word;
    btn.onclick = () => placeWord(btn, word, slots, bank, placed, ex.answer, footer);
    bank.appendChild(btn);
  });

  wrap.appendChild(slots);
  wrap.appendChild(bank);
  main.appendChild(wrap);
  footer.innerHTML = `<button class="btn-check" id="btn-check" onclick="checkOrder(${JSON.stringify(ex.answer)}, ${JSON.stringify(placed)})" disabled>Vérifier</button>`;
}

function placeWord(btn, word, slots, bank, placed, answer, footer) {
  if (btn.classList.contains('placed')) {
    // Remove from slots
    btn.classList.remove('placed');
    const idx = placed.indexOf(word);
    if (idx !== -1) placed.splice(idx, 1);
    bank.appendChild(btn);
  } else {
    btn.classList.add('placed');
    placed.push(word);
    slots.appendChild(btn);
  }
  // Enable check button when all placed
  const checkBtn = document.getElementById('btn-check');
  if (checkBtn) checkBtn.disabled = placed.length !== answer.length;
}

function checkOrder(answer, placed) {
  const L = STATE.lesson;
  if (L.answered) return;
  L.answered = true;
  const isCorrect = JSON.stringify(placed) === JSON.stringify(answer);
  if (isCorrect) {
    L.correct++;
    showFeedback(true, 'Correct !', '');
  } else {
    L.lives = Math.max(0, L.lives - 1);
    showFeedback(false, 'Incorrect', `Ordre correct : ${answer.join(' › ')}`);
  }
}

function renderListen(ex, main, footer) {
  const btn = document.createElement('button');
  btn.className = 'listen-btn';
  btn.innerHTML = '🔊';
  btn.title = 'Écouter';
  const lang = CURRICULUM[STATE.lesson.langCode];
  btn.onclick = () => speak(ex.text, lang.voice);
  main.appendChild(btn);

  const q = document.createElement('div');
  q.className = 'exercise-question';
  q.style.fontSize = '1.1rem';
  q.textContent = ex.q;
  main.appendChild(q);

  // Auto-play
  setTimeout(() => speak(ex.text, lang.voice), 300);

  const grid = document.createElement('div');
  grid.className = 'choices-grid';
  ex.choices.forEach((c, i) => {
    const cb = document.createElement('button');
    cb.className = 'choice-btn';
    cb.textContent = c;
    cb.onclick = () => {
      if (STATE.lesson.answered) return;
      document.querySelectorAll('.choice-btn').forEach(b => b.classList.remove('selected'));
      cb.classList.add('selected');
      STATE.lesson.answer = i;
      document.getElementById('btn-check')?.removeAttribute('disabled');
    };
    grid.appendChild(cb);
  });
  main.appendChild(grid);
  footer.innerHTML = `<button class="btn-check" id="btn-check" onclick="checkAnswer()" disabled>Vérifier</button>`;
}

function renderGrammar(ex, main, footer) {
  const card = document.createElement('div');
  card.className = 'grammar-card';
  card.innerHTML = `<div class="grammar-title">${ex.title || 'Règle de grammaire'}</div>${ex.content}`;
  main.appendChild(card);
  footer.innerHTML = `<button class="btn-primary" onclick="nextExercise()">Compris ! Continuer →</button>`;
  STATE.lesson.answered = true;
  STATE.lesson.answer = 'read';
  STATE.lesson.correct++; // grammar is always "correct"
}

// ── CHECK / NEXT ───────────────────────────────────────
function checkAnswer() {
  const L = STATE.lesson;
  const ex = L.exercises[L.index];
  if (L.answered) return;
  L.answered = true;

  if (ex.type === 'qcm' || ex.type === 'listen') {
    const isCorrect = L.answer === ex.correct;
    document.querySelectorAll('.choice-btn').forEach((b, i) => {
      b.classList.add('disabled');
      if (i === ex.correct) b.classList.add('correct');
      else if (i === L.answer && !isCorrect) b.classList.add('incorrect');
    });
    if (isCorrect) { L.correct++; showFeedback(true, 'Correct !', ''); }
    else { L.lives = Math.max(0, L.lives - 1); showFeedback(false, 'Incorrect', `Réponse : ${ex.choices[ex.correct]}`); }
  }
  // Other types handle their own check inline
}

function showFeedback(correct, label, detail) {
  document.querySelectorAll('.feedback-bar').forEach(f => f.remove());
  document.getElementById('lesson-footer').innerHTML = '';

  const bar = document.createElement('div');
  bar.className = `feedback-bar ${correct ? 'correct' : 'incorrect'}`;
  bar.innerHTML = `
    <span class="feedback-icon">${correct ? '✅' : '❌'}</span>
    <div class="feedback-text">
      <div class="feedback-label ${correct ? 'correct' : 'incorrect'}">${label}</div>
      ${detail ? `<div class="feedback-detail">${detail}</div>` : ''}
    </div>
    <button class="feedback-btn" onclick="nextExercise()">Continuer</button>`;
  document.body.appendChild(bar);
}

function nextExercise() {
  document.querySelectorAll('.feedback-bar').forEach(f => f.remove());
  STATE.lesson.index++;
  STATE.lesson.answered = false;
  STATE.lesson.answer = null;
  if (STATE.lesson.index >= STATE.lesson.total || STATE.lesson.lives <= 0) {
    finishLesson();
  } else {
    renderExercise();
  }
}

async function finishLesson() {
  const L = STATE.lesson;
  const accuracy = L.total > 0 ? Math.round((L.correct / L.total) * 100) : 0;
  const xp = Math.round(accuracy * 0.5) + (L.lives > 0 ? L.lives * 5 : 0) + 10;

  try {
    const data = await api('/api/progress/complete', 'POST', {
      lang: L.langCode,
      lesson_id: L.lessonId,
      xp, accuracy,
    });
    STATE.stats = { ...STATE.stats, total_xp: data.total_xp, streak: data.streak };
    if (!STATE.progress[L.langCode]) STATE.progress[L.langCode] = {};
    STATE.progress[L.langCode][L.lessonId] = { xp, accuracy };
  } catch {}

  document.getElementById('result-icon').textContent = accuracy >= 70 ? '🎉' : accuracy >= 50 ? '👏' : '💪';
  document.getElementById('result-title').textContent = accuracy >= 70 ? 'Leçon terminée !' : accuracy >= 50 ? 'Bien joué !' : 'Continue ainsi !';
  document.getElementById('result-subtitle').textContent = L.lives <= 0 ? 'Vous avez perdu toutes vos vies. Réessayez !' : `Précision : ${accuracy}%`;
  document.getElementById('res-xp').textContent = `+${xp}`;
  document.getElementById('res-acc').textContent = `${accuracy}%`;
  document.getElementById('res-streak').textContent = STATE.stats?.streak || 1;
  showScreen('result');

  // Adaptive check after lesson
  checkAdaptiveBanner(L.langCode);
}

function afterLesson() {
  showScreen('lang');
  renderLevelPills(STATE.currentLang);
  renderUnits(STATE.currentLang, STATE.currentLevel);
  document.getElementById('lang-hdr-xp').textContent = STATE.stats?.total_xp || 0;
  document.getElementById('lang-hdr-streak').textContent = STATE.stats?.streak || 1;
}

function exitLesson() {
  if (confirm('Quitter la leçon ? Votre progression sera perdue.')) {
    document.querySelectorAll('.feedback-bar').forEach(f => f.remove());
    showScreen('lang');
    renderUnits(STATE.currentLang, STATE.currentLevel);
  }
}

// ── LEADERBOARD ────────────────────────────────────────
async function showLeaderboard() {
  const rows = await api('/api/leaderboard');
  const list = document.getElementById('leaderboard-list');
  list.innerHTML = rows.map((r, i) => `
    <div class="lb-row">
      <div class="lb-rank ${i===0?'top1':i===1?'top2':i===2?'top3':''}">${i===0?'🥇':i===1?'🥈':i===2?'🥉':i+1}</div>
      <div class="lb-avatar">${r.avatar ? `<img src="${r.avatar}">` : '👤'}</div>
      <div class="lb-name">${r.display_name || r.username || 'Invité'}</div>
      <div class="lb-xp">⚡ ${r.xp} XP</div>
    </div>`).join('');
  document.getElementById('modal-leaderboard').classList.remove('hidden');
}

function closeModal(id) {
  document.getElementById(id).classList.add('hidden');
}

// ── UTILS ──────────────────────────────────────────────
function showScreen(name) {
  document.querySelectorAll('.screen').forEach(s => {
    s.classList.remove('active');
    s.classList.add('hidden');
  });
  const s = document.getElementById(`screen-${name}`);
  if (s) {
    s.classList.remove('hidden');
    s.classList.add('active');
  }
}

function showError(id, msg) {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = msg;
  el.classList.remove('hidden');
}

function toast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.remove('hidden');
  setTimeout(() => t.classList.add('hidden'), 2500);
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function speak(text, lang = 'fr-FR') {
  if (!window.speechSynthesis) return;
  const utt = new SpeechSynthesisUtterance(text);
  utt.lang = lang;
  utt.rate = 0.85;
  speechSynthesis.cancel();
  speechSynthesis.speak(utt);
}

async function api(path, method = 'GET', body = null) {
  const token = localStorage.getItem('poly_token');
  const opts = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    },
    credentials: 'include',
  };
  if (body) opts.body = JSON.stringify(body);
  const res = await fetch(path, opts);
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Erreur réseau');
  return data;
}
