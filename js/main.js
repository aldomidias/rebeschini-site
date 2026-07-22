/* =============================================================
   Rebeschini Advocacia — main.js
   JS vanilla, sem dependências. Progressive enhancement:
   nada aqui é requisito pro conteúdo ser lido.
   Regra de segurança: NUNCA usar innerHTML com dado do usuário —
   toda escrita de texto passa por textContent.
   ============================================================= */
(function () {
  'use strict';

  document.documentElement.classList.add('js');

  var reduzirMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 1. Header sticky ---------- */
  var header = document.querySelector('[data-header]');
  if (header) {
    var marcarHeader = function () {
      header.classList.toggle('is-stuck', window.scrollY > 24);
    };
    marcarHeader();
    window.addEventListener('scroll', marcarHeader, { passive: true });
  }

  /* ---------- 2. Menu mobile ---------- */
  var toggle = document.querySelector('[data-nav-toggle]');
  var nav = document.getElementById('nav-principal');

  if (toggle && nav) {
    var fecharMenu = function () {
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Abrir menu de navegação');
      nav.classList.remove('is-open');
      document.body.classList.remove('nav-open');
    };

    toggle.addEventListener('click', function () {
      var aberto = toggle.getAttribute('aria-expanded') === 'true';
      if (aberto) {
        fecharMenu();
      } else {
        toggle.setAttribute('aria-expanded', 'true');
        toggle.setAttribute('aria-label', 'Fechar menu de navegação');
        nav.classList.add('is-open');
        document.body.classList.add('nav-open');
      }
    });

    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) fecharMenu();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        fecharMenu();
        toggle.focus();
      }
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth >= 1024) fecharMenu();
    });
  }

  /* ---------- 3. FAQ accordion (acessível) ---------- */
  var accordion = document.querySelector('[data-accordion]');
  if (accordion) {
    var gatilhos = Array.prototype.slice.call(accordion.querySelectorAll('.acc-trigger'));

    var abrir = function (btn) {
      var painel = document.getElementById(btn.getAttribute('aria-controls'));
      if (!painel) return;
      btn.setAttribute('aria-expanded', 'true');
      painel.hidden = false;

      if (reduzirMovimento) return;
      var altura = painel.scrollHeight;
      painel.classList.add('is-animating');
      painel.style.height = '0px';
      painel.style.opacity = '0';
      // força reflow para o browser registrar o estado inicial
      void painel.offsetHeight;
      painel.style.transition = 'height 220ms cubic-bezier(.4,0,.2,1), opacity 180ms cubic-bezier(.4,0,.2,1)';
      painel.style.height = altura + 'px';
      painel.style.opacity = '1';
      window.setTimeout(function () {
        painel.style.transition = '';
        painel.style.height = '';
        painel.style.opacity = '';
        painel.classList.remove('is-animating');
      }, 240);
    };

    var fechar = function (btn) {
      var painel = document.getElementById(btn.getAttribute('aria-controls'));
      if (!painel) return;
      btn.setAttribute('aria-expanded', 'false');

      if (reduzirMovimento) {
        painel.hidden = true;
        return;
      }
      painel.classList.add('is-animating');
      painel.style.height = painel.scrollHeight + 'px';
      void painel.offsetHeight;
      painel.style.transition = 'height 200ms cubic-bezier(.4,0,.2,1), opacity 150ms cubic-bezier(.4,0,.2,1)';
      painel.style.height = '0px';
      painel.style.opacity = '0';
      window.setTimeout(function () {
        painel.hidden = true;
        painel.style.transition = '';
        painel.style.height = '';
        painel.style.opacity = '';
        painel.classList.remove('is-animating');
      }, 210);
    };

    gatilhos.forEach(function (btn, i) {
      btn.addEventListener('click', function () {
        var aberto = btn.getAttribute('aria-expanded') === 'true';
        // comportamento sanfona: um painel aberto por vez
        gatilhos.forEach(function (outro) {
          if (outro !== btn && outro.getAttribute('aria-expanded') === 'true') fechar(outro);
        });
        if (aberto) { fechar(btn); } else { abrir(btn); }
      });

      // navegação por teclado entre perguntas (padrão WAI-ARIA Accordion)
      btn.addEventListener('keydown', function (e) {
        var destino = null;
        if (e.key === 'ArrowDown') destino = gatilhos[(i + 1) % gatilhos.length];
        else if (e.key === 'ArrowUp') destino = gatilhos[(i - 1 + gatilhos.length) % gatilhos.length];
        else if (e.key === 'Home') destino = gatilhos[0];
        else if (e.key === 'End') destino = gatilhos[gatilhos.length - 1];
        if (destino) { e.preventDefault(); destino.focus(); }
      });
    });
  }

  /* ---------- 4. Revelação no scroll ---------- */
  var alvos = document.querySelectorAll('.reveal');

  if (reduzirMovimento || !('IntersectionObserver' in window)) {
    Array.prototype.forEach.call(alvos, function (el) { el.classList.add('is-visible'); });
  } else {
    var observer = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (!entrada.isIntersecting) return;
        var el = entrada.target;
        // escalona irmãos para um reveal em cascata discreto
        // §8 — stagger por --i (o CSS multiplica por 70ms, teto de 280ms = 4 itens)
        var irmaos = el.parentElement ? el.parentElement.querySelectorAll(':scope > .reveal') : [];
        var indice = Array.prototype.indexOf.call(irmaos, el);
        el.style.setProperty('--i', String(indice > 0 ? Math.min(indice, 4) : 0));
        el.classList.add('is-visible');
        observer.unobserve(el);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });

    Array.prototype.forEach.call(alvos, function (el) { observer.observe(el); });
  }

  /* ---------- 4b. Pílula do menu: desgruda do hero (§7.0) ---------- */
  var pill = document.querySelector('[data-menu-pill]');
  var heroCapa = document.querySelector('.hero-capa');
  if (pill && heroCapa && 'IntersectionObserver' in window) {
    var pillHost = pill.parentElement;
    var sentinela = new IntersectionObserver(function (entradas) {
      // quando o hero sai da tela, a pílula vira barra fixa no topo
      var fora = !entradas[0].isIntersecting;
      pill.classList.toggle('is-fixed', fora);
      if (pillHost) pillHost.style.minHeight = fora ? pill.offsetHeight + 'px' : '';
    }, { rootMargin: '-90% 0px 0px 0px', threshold: 0 });
    sentinela.observe(heroCapa);
  }

  /* ---------- 5. Link de navegação ativo ---------- */
  var secoes = document.querySelectorAll('.areas-blocos [id]');
  var linksNav = document.querySelectorAll('.subnav-lista a[href^="#"]');

  if (secoes.length && linksNav.length && 'IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (!entrada.isIntersecting) return;
        var id = entrada.target.id;
        Array.prototype.forEach.call(linksNav, function (a) {
          if (a.getAttribute('href') === '#' + id) {
            a.setAttribute('aria-current', 'true');
          } else {
            a.removeAttribute('aria-current');
          }
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    Array.prototype.forEach.call(secoes, function (s) { spy.observe(s); });
  }

  /* ---------- 6. Validação do formulário ---------- */
  var form = document.querySelector('[data-form]');
  if (form) {
    var MENSAGENS = {
      nome: 'Informe seu nome completo.',
      email: 'Informe um e-mail válido.',
      whatsapp: 'Informe um telefone com DDD.',
      consentimento: 'É necessário autorizar o tratamento dos dados para enviar.'
    };

    var mostrarErro = function (campo, texto) {
      var alvo = form.querySelector('[data-erro-for="' + campo.name + '"]');
      if (alvo) alvo.textContent = texto; // textContent: nunca innerHTML com dado de campo
      campo.setAttribute('aria-invalid', texto ? 'true' : 'false');
    };

    var validarCampo = function (campo) {
      if (campo.type === 'checkbox') {
        var okCheck = !campo.hasAttribute('required') || campo.checked;
        mostrarErro(campo, okCheck ? '' : MENSAGENS[campo.name] || 'Campo obrigatório.');
        return okCheck;
      }

      var valor = campo.value.trim();

      if (campo.hasAttribute('required') && valor === '') {
        mostrarErro(campo, MENSAGENS[campo.name] || 'Campo obrigatório.');
        return false;
      }
      if (campo.type === 'email' && valor !== '' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(valor)) {
        mostrarErro(campo, MENSAGENS.email);
        return false;
      }
      if (campo.type === 'tel' && valor !== '' && valor.replace(/\D/g, '').length < 10) {
        mostrarErro(campo, MENSAGENS.whatsapp);
        return false;
      }
      mostrarErro(campo, '');
      return true;
    };

    var campos = Array.prototype.slice.call(form.querySelectorAll('input[required], input[type="email"], input[type="tel"]'));
    var erroGeral = form.querySelector('[data-erro-geral]');

    campos.forEach(function (campo) {
      var evento = campo.type === 'checkbox' ? 'change' : 'blur';
      campo.addEventListener(evento, function () { validarCampo(campo); });
      campo.addEventListener('input', function () {
        if (campo.getAttribute('aria-invalid') === 'true') validarCampo(campo);
      });
    });

    form.addEventListener('submit', function (e) {
      var primeiroInvalido = null;
      campos.forEach(function (campo) {
        if (!validarCampo(campo) && !primeiroInvalido) primeiroInvalido = campo;
      });
      if (primeiroInvalido) {
        e.preventDefault();
        if (erroGeral) erroGeral.hidden = false;
        primeiroInvalido.focus();
        return;
      }
      if (erroGeral) erroGeral.hidden = true;
      // válido → deixa seguir para o Netlify Forms (POST nativo)
    });
  }

  /* ---------- 7b. Carrossel de depoimentos ---------- */
  var trilho = document.querySelector('.reviews-trilho');
  var setaAnt = document.querySelector('[data-reviews-prev]');
  var setaProx = document.querySelector('[data-reviews-next]');
  if (trilho && setaAnt && setaProx) {
    var atualizarSetasReviews = function () {
      var maxScroll = trilho.scrollWidth - trilho.clientWidth - 1;
      setaAnt.disabled = trilho.scrollLeft <= 0;
      setaProx.disabled = maxScroll <= 0 || trilho.scrollLeft >= maxScroll;
    };
    var deslocarReviews = function (dir) {
      var item = trilho.querySelector('.review');
      var largura = item ? item.getBoundingClientRect().width + 16 : trilho.clientWidth * 0.85;
      trilho.scrollBy({ left: dir * largura, behavior: reduzirMovimento ? 'auto' : 'smooth' });
    };
    setaAnt.addEventListener('click', function () { deslocarReviews(-1); });
    setaProx.addEventListener('click', function () { deslocarReviews(1); });
    trilho.addEventListener('scroll', atualizarSetasReviews, { passive: true });
    window.addEventListener('resize', atualizarSetasReviews);
    atualizarSetasReviews();
  }

  /* ---------- 7. Ano do copyright ---------- */
  var ano = document.querySelector('[data-ano]');
  if (ano) ano.textContent = String(new Date().getFullYear());
})();
