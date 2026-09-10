/* ==========================================================================
   KODE — INTERAÇÕES
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------------------------------------------------
     1. HEADER STICKY & SCROLLSPY
     --------------------------------------------------------- */
  const header = document.getElementById('header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  const handleScroll = () => {
    if (header) header.classList.toggle('scrolled', window.scrollY > 40);

    let currentSectionId = '';
    const scrollPosition = window.scrollY + 140;

    sections.forEach(section => {
      if (scrollPosition >= section.offsetTop &&
        scrollPosition < section.offsetTop + section.offsetHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    if (currentSectionId) {
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${currentSectionId}`);
      });
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  /* ---------------------------------------------------------
     2. MENU MOBILE
     --------------------------------------------------------- */
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');

  const setMenuState = (isOpen) => {
    if (!mobileToggle || !navMenu) return;

    navMenu.classList.toggle('open', isOpen);
    mobileToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    mobileToggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');

    const [span1, span2, span3] = mobileToggle.children;
    span1.style.transform = isOpen ? 'translateY(7px) rotate(45deg)' : 'none';
    span2.style.opacity = isOpen ? '0' : '1';
    span3.style.transform = isOpen ? 'translateY(-7px) rotate(-45deg)' : 'none';
  };

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      setMenuState(!navMenu.classList.contains('open'));
    });

    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => setMenuState(false));
    });
  }

  /* ---------------------------------------------------------
     3. FAQ — ACORDEÃO EXCLUSIVO
     --------------------------------------------------------- */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    item.addEventListener('toggle', () => {
      if (!item.open) return;
      faqItems.forEach(other => {
        if (other !== item) other.open = false;
      });
    });
  });

  /* ---------------------------------------------------------
     4. TERMINAL ANIMADO
     --------------------------------------------------------- */
  const terminalBody = document.getElementById('terminal-body');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const terminalScripts = [
    { type: 'cmd', text: 'npm init kode-studio', delay: 1000 },
    { type: 'comment', text: '// Inicializando ambiente de desenvolvimento...', delay: 600 },
    { type: 'sys', text: 'Kode Studio ativado com sucesso. Estúdio pronto.', delay: 800 },
    { type: 'cmd', text: 'node build_project.js --niche="salao_e_clinicas"', delay: 1200 },
    { type: 'comment', text: '// Carregando catálogo de serviços e padrões de design...', delay: 800 },
    { type: 'sys', text: '✓ Site Institucional estruturado com código limpo e semântico.', delay: 500 },
    { type: 'sys', text: '✓ Sistema de agendamento online configurado com banco de dados seguro.', delay: 500 },
    { type: 'sys', text: '✓ Fluxo de notificações via WhatsApp integrado.', delay: 500 },
    { type: 'cmd', text: 'npm run checklist_qa', delay: 1000 },
    { type: 'comment', text: '// Rodando bateria de testes finais antes de entregar...', delay: 600 },
    { type: 'sys', text: '✓ Responsividade Mobile (iOS/Android): 100% OK', delay: 400 },
    { type: 'sys', text: '✓ Validação de inputs e tratamento de erros: OK', delay: 400 },
    { type: 'sys', text: '✓ Revisão técnica final pelo Arquiteto de Soluções: OK', delay: 500 },
    { type: 'ready', text: 'STATUS: PRONTO PARA PUBLICAÇÃO EM PRODUÇÃO! █', delay: 2000 }
  ];

  let scriptIndex = 0;

  const typeText = (element, text, callback, speed = 40) => {
    let charIndex = 0;
    const interval = setInterval(() => {
      if (charIndex < text.length) {
        element.textContent += text.charAt(charIndex);
        charIndex++;
      } else {
        clearInterval(interval);
        if (callback) callback();
      }
    }, speed);
  };

  const appendLine = (className, text) => {
    const lineDiv = document.createElement('div');
    lineDiv.className = 'terminal-line';

    const span = document.createElement('span');
    span.className = className;
    span.textContent = text;
    lineDiv.appendChild(span);
    terminalBody.appendChild(lineDiv);

    return lineDiv;
  };

  const runTerminalAnimation = () => {
    if (!terminalBody) return;

    terminalBody.innerHTML = '';
    scriptIndex = 0;

    const executeNextStep = () => {
      if (scriptIndex >= terminalScripts.length) {
        setTimeout(runTerminalAnimation, 8000);
        return;
      }

      const step = terminalScripts[scriptIndex];

      if (step.type === 'cmd' || step.type === 'comment') {
        const lineDiv = document.createElement('div');
        lineDiv.className = 'terminal-line';

        if (step.type === 'cmd') {
          const prefix = document.createElement('span');
          prefix.className = 'terminal-prefix';
          prefix.textContent = '>';
          lineDiv.appendChild(prefix);
        }

        const target = document.createElement('span');
        target.className = step.type === 'cmd' ? 'terminal-code' : 'terminal-comment';
        lineDiv.appendChild(target);
        terminalBody.appendChild(lineDiv);

        typeText(target, step.text, () => {
          scriptIndex++;
          setTimeout(executeNextStep, step.delay);
        }, step.type === 'cmd' ? 50 : 30);

      } else {
        appendLine(step.type === 'sys' ? 'terminal-sys' : 'terminal-ready', step.text);
        scriptIndex++;
        setTimeout(executeNextStep, step.delay);
      }

      terminalBody.scrollTop = terminalBody.scrollHeight;
    };

    executeNextStep();
  };

  if (!prefersReducedMotion) runTerminalAnimation();

  /* ---------------------------------------------------------
     5. PLANEJADOR DE ESCOPO
     --------------------------------------------------------- */
  const plannerOptions = document.querySelectorAll('.planner-option');
  const summaryList = document.getElementById('summary-items-list');
  const totalSolutionsEl = document.getElementById('total-solutions');
  const totalTimeEl = document.getElementById('total-time');
  const btnPlannerWhatsapp = document.getElementById('btn-planner-whatsapp');

  const selectedServices = new Set();

  // 'timeline' espelha o prazo anunciado em cada card de serviço
  // (seção "Serviços") para que a estimativa nunca o contradiga.
  const serviceDetailsMap = {
    site: { name: 'Site Institucional / Landing Page', time: 7, timeline: '5 a 10 dias úteis' },
    agendamento: { name: 'Sistema de Agendamento Online', time: 28, timeline: '3 a 5 semanas' },
    estoque: { name: 'Controle de Estoque Simples', time: 35, timeline: '4 a 6 semanas' },
    dashboard: { name: 'Painel / Dashboard de Dados', time: 14, timeline: '1 a 3 semanas' },
    automacao: { name: 'Automação de Fluxo de Trabalho', time: 7, timeline: '3 a 10 dias úteis' }
  };

  const updatePlannerSummary = () => {
    if (!summaryList) return;

    if (selectedServices.size === 0) {
      summaryList.innerHTML =
        '<p class="summary-placeholder">Nenhuma solução selecionada.<br>Selecione ao lado para montar seu escopo.</p>';
      totalSolutionsEl.textContent = '0';
      totalTimeEl.textContent = '—';
      btnPlannerWhatsapp.disabled = true;
      return;
    }

    summaryList.innerHTML = '';

    let maxSingleTime = 0;
    let otherTimesSum = 0;

    selectedServices.forEach(serviceId => {
      const service = serviceDetailsMap[serviceId];

      const itemDiv = document.createElement('div');
      itemDiv.className = 'selected-item';
      itemDiv.innerHTML = `
        <span class="selected-item-name">${service.name}</span>
        <span class="selected-item-time">~ ${service.time} dias</span>
      `;
      summaryList.appendChild(itemDiv);

      if (service.time > maxSingleTime) {
        otherTimesSum += maxSingleTime;
        maxSingleTime = service.time;
      } else {
        otherTimesSum += service.time;
      }
    });

    let timeText = '';
    if (selectedServices.size === 1) {
      // Serviço único: repete o prazo exato do card correspondente.
      const onlyId = selectedServices.values().next().value;
      timeText = `~ ${serviceDetailsMap[onlyId].timeline}`;
    } else {
      // Prazo paralelizado: maior prazo + 35% da soma dos demais.
      const totalTime = Math.ceil(maxSingleTime + (otherTimesSum * 0.35));

      if (totalTime < 5) {
        timeText = `~ ${totalTime} dias úteis`;
      } else if (totalTime <= 10) {
        timeText = '~ 5 a 10 dias úteis';
      } else {
        const weeksMin = Math.floor(totalTime / 7);
        const weeksMax = Math.ceil((totalTime + 5) / 7);
        timeText = `~ ${weeksMin} a ${weeksMax} semanas`;
      }
    }

    totalSolutionsEl.textContent = selectedServices.size.toString();
    totalTimeEl.textContent = timeText;
    btnPlannerWhatsapp.disabled = false;
  };

  plannerOptions.forEach(option => {
    option.addEventListener('click', () => {
      const serviceId = option.getAttribute('data-id');
      const isSelected = option.classList.toggle('selected');

      option.setAttribute('aria-pressed', isSelected ? 'true' : 'false');

      if (isSelected) {
        selectedServices.add(serviceId);
      } else {
        selectedServices.delete(serviceId);
      }

      updatePlannerSummary();
    });
  });

  if (btnPlannerWhatsapp) {
    btnPlannerWhatsapp.addEventListener('click', () => {
      if (selectedServices.size === 0) return;

      let servicesListString = '';
      selectedServices.forEach(serviceId => {
        servicesListString += `- ${serviceDetailsMap[serviceId].name}\n`;
      });

      const timeEstimate = totalTimeEl.textContent;
      const rawText = `Olá, equipe Kode!\n\nUtilizei o planejador do site de vocês e montei um escopo para o meu negócio.\n\n*Soluções desejadas:*\n${servicesListString}\n*Prazo estimado pelo sistema:*\n${timeEstimate}\n\nGostaria de solicitar uma cotação personalizada para este projeto!`;

      window.open(`https://wa.me/5541996973947?text=${encodeURIComponent(rawText)}`, '_blank');
    });
  }

  /* ---------------------------------------------------------
     6. FORMULÁRIO DE CONTATO → WHATSAPP
     --------------------------------------------------------- */
  const contactForm = document.getElementById('main-contact-form');
  const successFeedback = document.getElementById('form-success-feedback');
  const phoneInput = document.getElementById('form-phone');

  if (phoneInput) {
    phoneInput.addEventListener('input', () => {
      phoneInput.value = phoneInput.value.replace(/[^\d\s()\-+]/g, '');
    });
  }

  if (contactForm && successFeedback) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('form-name').value;
      const business = document.getElementById('form-business').value;
      const phone = document.getElementById('form-phone').value;
      const message = document.getElementById('form-message').value;

      successFeedback.classList.add('success');
      const submitButton = contactForm.querySelector('button[type="submit"]');
      submitButton.disabled = true;

      const rawText = `Olá, equipe Kode!\n\nMe chamo *${name}*, da empresa *${business}*.\n\n*Meu WhatsApp:* ${phone}\n*Minha necessidade:*\n${message}\n\nGostaria de agendar um contato para detalharmos uma proposta!`;

      setTimeout(() => {
        window.open(`https://wa.me/5541996973947?text=${encodeURIComponent(rawText)}`, '_blank');
        successFeedback.classList.remove('success');
        submitButton.disabled = false;
        contactForm.reset();
      }, 1500);
    });
  }

  /* ---------------------------------------------------------
     N. MARQUEE — movimento via requestAnimationFrame

     A faixa era animada por @keyframes, mas o site tem um reset global
     `* { animation-duration:.01ms !important }` sob prefers-reduced-motion.
     Em Windows/macOS com "reduzir animações" ligado isso congela QUALQUER
     animação CSS — era por isso que a faixa aparecia parada. Transform via
     rAF não é afetado por esse override, então o movimento é garantido; o
     sistema que pede menos movimento recebe uma versão mais lenta.
     --------------------------------------------------------- */
  const marqueeTrack = document.querySelector('.marquee-track');

  if (marqueeTrack && marqueeTrack.children.length) {
    marqueeTrack.classList.add('js-marquee');   // desliga a keyframe do CSS

    let step = 0;                               // uma cópia do texto + respiro
    const measureMarquee = () => {
      const first = marqueeTrack.children[0];
      const cs = window.getComputedStyle(first);
      step = first.getBoundingClientRect().width + (parseFloat(cs.marginRight) || 0);
    };
    measureMarquee();
    window.addEventListener('resize', measureMarquee);

    const marqueeSpeed = prefersReducedMotion ? 55 : 150;   // px/s
    const marqueeBand = marqueeTrack.parentElement;
    let offset = 0, lastFrame = null, marqueePaused = false;

    marqueeBand.addEventListener('mouseenter', () => { marqueePaused = true; });
    marqueeBand.addEventListener('mouseleave', () => { marqueePaused = false; });
    document.addEventListener('visibilitychange', () => { lastFrame = null; });

    const stepMarquee = (now) => {
      if (lastFrame === null) lastFrame = now;
      const dt = Math.min((now - lastFrame) / 1000, 0.1);   // ignora abas em background
      lastFrame = now;

      if (!marqueePaused && step > 0) {
        offset = (offset + marqueeSpeed * dt) % step;
        marqueeTrack.style.transform = 'translateX(' + (-offset).toFixed(2) + 'px)';
      }
      requestAnimationFrame(stepMarquee);
    };
    requestAnimationFrame(stepMarquee);
  }

});
