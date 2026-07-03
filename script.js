/* ==========================================================================
   KODE STUDIO — INTERACTIVE JAVASCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------------------------------------------------
     1. STICKY HEADER & ACTIVE SECTION TRACKING (SCROLLSPY)
     --------------------------------------------------------- */
  const header = document.getElementById('header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');

  const handleScroll = () => {
    // 1.1 Sticky Header Class
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // 1.2 Scrollspy (Track Active Section)
    let currentSectionId = '';
    const scrollPosition = window.scrollY + 120; // offset for fixed header

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    if (currentSectionId) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
          link.classList.add('active');
        }
      });
    }
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Run once on load to set initial state

  /* ---------------------------------------------------------
     2. MOBILE MENU TOGGLE
     --------------------------------------------------------- */
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinksList = document.querySelectorAll('.nav-link, .nav-cta');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      mobileToggle.classList.toggle('active');

      const isOpen = navMenu.classList.contains('open');
      mobileToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      mobileToggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');

      // Animate hamburger lines
      const span1 = mobileToggle.children[0];
      const span2 = mobileToggle.children[1];
      const span3 = mobileToggle.children[2];

      if (navMenu.classList.contains('open')) {
        span1.style.transform = 'translateY(7px) rotate(45deg)';
        span2.style.opacity = '0';
        span3.style.transform = 'translateY(-7px) rotate(-45deg)';
      } else {
        span1.style.transform = 'none';
        span2.style.opacity = '1';
        span3.style.transform = 'none';
      }
    });

    // Close menu when clicking any link
    navLinksList.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileToggle.setAttribute('aria-label', 'Abrir menu');
        Array.from(mobileToggle.children).forEach(span => span.style.transform = 'none');
        mobileToggle.children[1].style.opacity = '1';
      });
    });
  }

  /* ---------------------------------------------------------
     3. FAQ ACCORDION LOGIC
     --------------------------------------------------------- */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionButton = item.querySelector('.faq-question');

    questionButton.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other FAQ items for a clean accordion effect
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        otherItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });

      // Toggle current item
      if (!isActive) {
        item.classList.add('active');
        questionButton.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ---------------------------------------------------------
     4. HERO TERMINAL INTERACTIVE ANIMATION
     --------------------------------------------------------- */
  const terminalBody = document.getElementById('terminal-body');

  const terminalScripts = [
    { type: 'cmd', text: 'npm init kode-studio', delay: 1000 },
    { type: 'comment', text: '// Inicializando ambiente de desenvolvimento...', delay: 600 },
    { type: 'sys', text: 'Kode Studio ativado com sucesso. Estúdio pronto.', delay: 800 },
    { type: 'cmd', text: 'node build_project.js --niche="salao_e_clinicas"', delay: 1200 },
    { type: 'comment', text: '// Carregando catálogo de serviços e padrões de design...', delay: 800 },
    { type: 'sys', text: '✔ Site Institucional estruturado com código limpo e semântico.', delay: 500 },
    { type: 'sys', text: '✔ Sistema de agendamento online configurado com banco de dados seguro.', delay: 500 },
    { type: 'sys', text: '✔ Fluxo de notificações via WhatsApp integrado.', delay: 500 },
    { type: 'cmd', text: 'npm run checklist_qa', delay: 1000 },
    { type: 'comment', text: '// Rodando bateria de testes finais antes de entregar...', delay: 600 },
    { type: 'sys', text: '✔ Responsividade Mobile (iOS/Android): 100% OK', delay: 400 },
    { type: 'sys', text: '✔ Validação de inputs e tratamento de erros: OK', delay: 400 },
    { type: 'sys', text: '✔ Revisão técnica final pelo Arquiteto de Soluções: OK', delay: 500 },
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

  const runTerminalAnimation = () => {
    if (!terminalBody) return;

    // Clear initial markup to start fresh animation
    terminalBody.innerHTML = '';
    scriptIndex = 0;

    const executeNextStep = () => {
      if (scriptIndex >= terminalScripts.length) {
        // Loop back after 8 seconds of idle time
        setTimeout(runTerminalAnimation, 8000);
        return;
      }

      const step = terminalScripts[scriptIndex];
      const lineDiv = document.createElement('div');
      lineDiv.className = 'terminal-line';

      if (step.type === 'cmd') {
        const prefix = document.createElement('span');
        prefix.className = 'terminal-prefix';
        prefix.textContent = '>';
        lineDiv.appendChild(prefix);

        const code = document.createElement('span');
        code.className = 'terminal-code';
        lineDiv.appendChild(code);
        terminalBody.appendChild(lineDiv);

        typeText(code, step.text, () => {
          scriptIndex++;
          setTimeout(executeNextStep, step.delay);
        }, 50);

      } else if (step.type === 'comment') {
        const comment = document.createElement('span');
        comment.className = 'terminal-comment';
        lineDiv.appendChild(comment);
        terminalBody.appendChild(lineDiv);

        typeText(comment, step.text, () => {
          scriptIndex++;
          setTimeout(executeNextStep, step.delay);
        }, 30);

      } else if (step.type === 'sys') {
        const systemText = document.createElement('span');
        systemText.style.color = 'var(--color-lime)';
        systemText.textContent = step.text;
        lineDiv.appendChild(systemText);
        terminalBody.appendChild(lineDiv);

        scriptIndex++;
        setTimeout(executeNextStep, step.delay);

      } else if (step.type === 'ready') {
        const readyText = document.createElement('span');
        readyText.style.color = 'var(--color-flame)';
        readyText.style.fontWeight = 'bold';
        readyText.textContent = step.text;
        lineDiv.appendChild(readyText);
        terminalBody.appendChild(lineDiv);

        scriptIndex++;
        setTimeout(executeNextStep, step.delay);
      }

      // Auto scroll terminal to bottom
      terminalBody.scrollTop = terminalBody.scrollHeight;
    };

    executeNextStep();
  };

  // Start terminal animation
  runTerminalAnimation();

  /* ---------------------------------------------------------
     5. INTERACTIVE SCOPE PLANNER LOGIC
     --------------------------------------------------------- */
  const plannerOptions = document.querySelectorAll('.planner-option');
  const summaryList = document.getElementById('summary-items-list');
  const totalSolutionsEl = document.getElementById('total-solutions');
  const totalTimeEl = document.getElementById('total-time');
  const btnPlannerWhatsapp = document.getElementById('btn-planner-whatsapp');

  let selectedServices = new Set();

  // 'timeline' must mirror the timeline advertised on each service card
  // (section "Serviços") so a single-service estimate never contradicts it.
  const serviceDetailsMap = {
    site: { name: 'Site Institucional / Landing Page', time: 7, timeline: '5 a 10 dias úteis' },
    agendamento: { name: 'Sistema de Agendamento Online', time: 28, timeline: '3 a 5 semanas' },
    estoque: { name: 'Controle de Estoque Simples', time: 35, timeline: '4 a 6 semanas' },
    dashboard: { name: 'Painel / Dashboard de Dados', time: 14, timeline: '1 a 3 semanas' },
    automacao: { name: 'Automação de Fluxo de Trabalho', time: 7, timeline: '3 a 10 dias úteis' }
  };

  const updatePlannerSummary = () => {
    if (selectedServices.size === 0) {
      // Show placeholder
      summaryList.innerHTML = `
        <div class="summary-item-placeholder">
          <i class="fa-solid fa-cubes"></i>
          <p>Nenhuma solução selecionada.<br>Selecione ao lado para montar seu escopo.</p>
        </div>
      `;
      totalSolutionsEl.textContent = '0';
      totalTimeEl.textContent = '—';
      btnPlannerWhatsapp.disabled = true;
      return;
    }

    // Clear placeholder
    summaryList.innerHTML = '';

    let totalTime = 0;
    let maxSingleTime = 0;
    let otherTimesSum = 0;

    selectedServices.forEach(serviceId => {
      const service = serviceDetailsMap[serviceId];

      // Build visual line in summary
      const itemDiv = document.createElement('div');
      itemDiv.className = 'selected-item';
      itemDiv.innerHTML = `
        <span class="selected-item-name">${service.name}</span>
        <span class="selected-item-time">~ ${service.time} dias</span>
      `;
      summaryList.appendChild(itemDiv);

      // Time calculations
      if (service.time > maxSingleTime) {
        otherTimesSum += maxSingleTime; // add previous max to the rest
        maxSingleTime = service.time;   // set new max
      } else {
        otherTimesSum += service.time;
      }
    });

    // Format delivery time string
    let timeText = '';
    if (selectedServices.size === 1) {
      // Single service: mirror the exact timeline advertised on its service card
      // so the planner never contradicts the "Serviços" section.
      const onlyId = selectedServices.values().next().value;
      timeText = `~ ${serviceDetailsMap[onlyId].timeline}`;
    } else {
      // Smart Parallelized Deadline calculation:
      // A development team works on things in parallel, so we don't just sum
      // them up (linear). Estimated time = biggest single timeline + 35% of the
      // rest (parallel overlap adjustment), rounded up to the nearest integer.
      totalTime = Math.ceil(maxSingleTime + (otherTimesSum * 0.35));

      if (totalTime < 5) {
        timeText = `~ ${totalTime} dias úteis`;
      } else if (totalTime <= 10) {
        timeText = `~ 5 a 10 dias úteis`;
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

      option.classList.toggle('selected');

      if (selectedServices.has(serviceId)) {
        selectedServices.delete(serviceId);
      } else {
        selectedServices.add(serviceId);
      }

      updatePlannerSummary();
    });
  });

  // WhatsApp Link generator for the planner
  if (btnPlannerWhatsapp) {
    btnPlannerWhatsapp.addEventListener('click', () => {
      if (selectedServices.size === 0) return;

      let servicesListString = '';
      selectedServices.forEach(serviceId => {
        servicesListString += `- ${serviceDetailsMap[serviceId].name}\n`;
      });

      const timeEstimate = totalTimeEl.textContent;

      const rawText = `Olá, equipe Kode!\n\nUtilizei o planejador do site de vocês e montei um escopo para o meu negócio.\n\n*Soluções desejadas:*\n${servicesListString}\n*Prazo estimado pelo sistema:*\n${timeEstimate}\n\nGostaria de solicitar uma cotação personalizada para este projeto!`;

      const whatsappUrl = `https://wa.me/5541996973947?text=${encodeURIComponent(rawText)}`;
      window.open(whatsappUrl, '_blank');
    });
  }

  /* ---------------------------------------------------------
     6. CONTACT FORM SUBMISSION & WHATSAPP REDIRECT
     --------------------------------------------------------- */
  const contactForm = document.getElementById('main-contact-form');
  const successFeedback = document.getElementById('form-success-feedback');
  const phoneInput = document.getElementById('form-phone');

  // Strip non-numeric characters in real time
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

      // Visual feedback
      successFeedback.classList.add('success');
      contactForm.querySelector('button[type="submit"]').disabled = true;

      // Build WhatsApp message
      const rawText = `Olá, equipe Kode!\n\nMe chamo *${name}*, da empresa *${business}*.\n\n*Meu WhatsApp:* ${phone}\n*Minha necessidade:*\n${message}\n\nGostaria de agendar um contato para detalharmos uma proposta!`;

      const whatsappUrl = `https://wa.me/5541996973947?text=${encodeURIComponent(rawText)}`;

      // Redirect after 1.5 seconds
      setTimeout(() => {
        window.open(whatsappUrl, '_blank');
        successFeedback.classList.remove('success');
        contactForm.querySelector('button[type="submit"]').disabled = false;
        contactForm.reset();
      }, 1500);
    });
  }

});
