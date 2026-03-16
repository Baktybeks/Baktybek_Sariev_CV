document.addEventListener('DOMContentLoaded', function () {
  var body = document.body;
  var themeToggles = document.querySelectorAll('.theme-toggle');
  var langLinks = document.querySelectorAll('.lang-switch a[data-lang]');
  var langBlocks = document.querySelectorAll('[data-lang-block]');

  function applyThemeFromStorage(currentLang) {
    var storedTheme = window.localStorage.getItem('theme');
    var isDark = storedTheme === 'dark';
    body.classList.toggle('theme-dark', isDark);
    body.classList.toggle('theme-light', !isDark);
    updateThemeToggleText(currentLang, isDark);
  }

  function updateThemeToggleText(lang, isDark) {
    themeToggles.forEach(function (btn) {
      if (lang === 'ru') {
        btn.textContent = isDark ? 'Светлая тема' : 'Тёмная тема';
      } else {
        btn.textContent = isDark ? 'Light theme' : 'Dark theme';
      }
    });
  }

  function setLanguage(lang) {
    currentLang = lang;
    window.localStorage.setItem('lang', lang);

    // Активный пункт переключателя
    langLinks.forEach(function (link) {
      var linkLang = link.getAttribute('data-lang');
      if (linkLang === lang) {
        link.classList.add('lang-active');
      } else {
        link.classList.remove('lang-active');
      }
    });

    // Показ нужных языковых блоков
    langBlocks.forEach(function (el) {
      var blockLang = el.getAttribute('data-lang-block');
      el.style.display = blockLang === lang ? '' : 'none';
    });

    // Обновление текста кнопки темы
    var isDark = body.classList.contains('theme-dark');
    updateThemeToggleText(lang, isDark);
  }

  // Язык: берём из localStorage, по умолчанию EN
  var storedLang = window.localStorage.getItem('lang');
  var currentLang = storedLang === 'ru' ? 'ru' : 'en';
  setLanguage(currentLang);

  // Тема
  applyThemeFromStorage(currentLang);

  themeToggles.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var isDark = !body.classList.contains('theme-dark');
      body.classList.toggle('theme-dark', isDark);
      body.classList.toggle('theme-light', !isDark);
      window.localStorage.setItem('theme', isDark ? 'dark' : 'light');
      updateThemeToggleText(currentLang, isDark);
    });
  });

  // Переключатель языка
  langLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      var lang = link.getAttribute('data-lang');
      if (!lang) return;
      setLanguage(lang);
    });
  });
});

