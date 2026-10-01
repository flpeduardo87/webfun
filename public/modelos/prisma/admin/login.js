'use strict';

const $ = s => document.querySelector(s);
const els = {
  form: $('#authForm'), loginTab: $('#loginTab'), registerTab: $('#registerTab'), nameField: $('#nameField'),
  submit: $('#authSubmit'), message: $('#authMessage'), title: $('#formTitle'), copy: $('#formCopy'),
  notConfigured: $('#notConfigured'), authArea: $('#authArea')
};
let mode = 'login';

function setMessage(text = '', success = false) {
  els.message.textContent = text;
  els.message.classList.toggle('is-success', success);
}

function setMode(next) {
  mode = next;
  const register = mode === 'register';
  els.loginTab.classList.toggle('is-active', !register);
  els.registerTab.classList.toggle('is-active', register);
  els.nameField.hidden = !register;
  els.form.elements.password.autocomplete = register ? 'new-password' : 'current-password';
  els.title.textContent = register ? 'Criar sua conta' : 'Entrar no painel';
  els.copy.textContent = register ? 'Crie o primeiro acesso administrativo. Depois você poderá cadastrar seu negócio.' : 'Use sua conta para acessar os negócios vinculados a você.';
  els.submit.innerHTML = register ? 'Criar conta <span>→</span>' : 'Entrar <span>→</span>';
  setMessage('');
}

function adminTarget() {
  const params = new URLSearchParams(location.search);
  const r = params.get('r');
  return r ? `vitrine.html?r=${encodeURIComponent(r)}` : 'vitrine.html';
}

async function boot() {
  if (!window.MenuBackend.isCloud()) {
    els.notConfigured.hidden = false;
    els.authArea.hidden = true;
    return;
  }
  try {
    const session = await window.MenuBackend.getSession();
    if (session) location.replace(adminTarget());
  } catch (error) {
    setMessage(error.message || 'Não foi possível verificar a sessão.');
  }
}

els.loginTab.addEventListener('click', () => setMode('login'));
els.registerTab.addEventListener('click', () => setMode('register'));
els.form.addEventListener('submit', async e => {
  e.preventDefault();
  setMessage('');
  const fd = new FormData(els.form);
  const email = String(fd.get('email') || '').trim();
  const password = String(fd.get('password') || '');
  const fullName = String(fd.get('fullName') || '').trim();
  els.submit.disabled = true;
  els.submit.textContent = mode === 'register' ? 'Criando conta...' : 'Entrando...';
  try {
    if (mode === 'register') {
      const data = await window.MenuBackend.signUp(email, password, fullName);
      if (data.session) {
        location.replace(adminTarget());
      } else {
        setMessage('Conta criada. Confirme seu e-mail e depois faça login.', true);
        setMode('login');
        els.form.elements.email.value = email;
      }
    } else {
      await window.MenuBackend.signIn(email, password);
      location.replace(adminTarget());
    }
  } catch (error) {
    setMessage(error.message || 'Não foi possível concluir o acesso.');
  } finally {
    els.submit.disabled = false;
    els.submit.innerHTML = mode === 'register' ? 'Criar conta <span>→</span>' : 'Entrar <span>→</span>';
  }
});

boot();
