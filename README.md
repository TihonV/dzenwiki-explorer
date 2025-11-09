<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  
  <!-- === SEO и Open Graph === -->
  <title>🌌📚 DzenWiki Explorer — Поиск видео и статей без ГДЗ</title>
  <meta name="description" content="DzenWiki Explorer — платформа для поиска образовательных видео в Дзене и статей в Википедии. Без ГДЗ, с AI-чатом, формулами, 3D-анимациями и синхронизацией закладок." />
  <meta name="keywords" content="дзен, википедия, поиск видео, образование, гдз запрещено, ai чат, формулы, 3d, синхронизация, закладки" />
  <meta name="author" content="DzenWiki Explorer" />
  <meta name="robots" content="index, follow" />

  <!-- === Open Graph / Facebook / Вконтакте === -->
  <meta property="og:title" content="DzenWiki Explorer — Поиск видео и статей без ГДЗ" />
  <meta property="og:description" content="Платформа для поиска образовательных видео в Дзене и статей в Википедии. Без ГДЗ, с AI-чатом, формулами, 3D-анимациями." />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://yourusername.github.io/dzenwiki-explorer/" />
  <meta property="og:image" content="https://yourusername.github.io/dzenwiki-explorer/og-image.jpg" /> <!-- Загрузите изображение в репо -->
  <meta property="og:locale" content="ru_RU" />

  <!-- === Twitter Card === -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="DzenWiki Explorer" />
  <meta name="twitter:description" content="Поиск видео и статей без ГДЗ. AI, 3D, закладки." />
  <meta name="twitter:image" content="https://yourusername.github.io/dzenwiki-explorer/og-image.jpg" />

  <!-- === Schema.org === -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "DzenWiki Explorer",
    "description": "Платформа для поиска образовательных видео в Дзене и статей в Википедии.",
    "url": "https://yourusername.github.io/dzenwiki-explorer/",
    "applicationCategory": "EducationApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0"
    }
  }
  </script>

  <!-- === PWA === -->
  <link rel="manifest" href="manifest.json">
  <link rel="icon" href="icon-192.png">
  <link rel="apple-touch-icon" href="icon-192.png">

  <!-- === Стили === -->
  <link rel="stylesheet" href="style.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
  
  <!-- === MathJax === -->
  <script src="https://polyfill.io/v3/polyfill.min.js?features=es6"></script>
  <script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js"></script>
</head>
<body class="mode-dzen">
  <div class="container">
    <header>
      <div class="logo" id="logo"><i class="fas fa-blog"></i> Dzen Explorer</div>
      <div class="controls" id="dzenControls">
        <button class="btn" id="toggleModeBtn"><i class="fas fa-exchange-alt"></i> Переключить режим</button>
        <button class="btn" id="hideBtn"><i class="fas fa-user-secret"></i> Скрыть</button>
      </div>
    </header>

    <!-- ========== РЕЖИМ ДЗЕН ========== -->
    <div id="dzenMode">
      <section class="search-area">
        <div class="search-box">
          <input type="text" id="searchInput" placeholder="Поиск видео и постов в Дзене..." autofocus />
          <button class="btn" id="searchBtn"><i class="fas fa-search"></i> Найти</button>
          <button class="btn" id="voiceBtn"><i class="fas fa-microphone"></i> Голос</button>
        </div>
        <div class="suggestions" id="dzenSuggestions"></div>
      </section>

      <div id="resultsLoader" class="loader">Введите запрос...</div>
      <div class="video-grid" id="videoGrid"></div>

      <div style="margin-top: 20px;">
        <h3>AI-Помощник</h3>
        <div id="aiChat">
          <div id="chatMessages">
            <div class="message ai-msg">Привет! Я помогу найти нужное видео или объяснить формулу.</div>
          </div>
          <div id="chatInputBox">
            <input type="text" id="chatInput" placeholder="Например: «Как решить x² + 5x + 6 = 0»" />
            <button class="btn" id="sendChatBtn"><i class="fas fa-paper-plane"></i></button>
          </div>
        </div>
      </div>

      <div style="margin-top: 20px;">
        <h3>3D Анимация</h3>
        <div id="preview3d"></div>
      </div>
    </div>

    <!-- ========== РЕЖИМ ВИКИПЕДИЯ ========== -->
    <div id="wikiMode">
      <section class="search-area">
        <div class="search-box">
          <input type="text" id="wikiSearchInput" placeholder="Поиск в Википедии..." />
          <button class="btn" id="wikiSearchBtn"><i class="fas fa-search"></i> Найти</button>
        </div>
        <div class="suggestions" id="wikiSuggestions"></div>
      </section>

      <div id="wikiContent">
        <div class="loader">Введите запрос в Википедию</div>
      </div>

      <div style="display: flex; gap: 15px; margin-top: 20px; flex-wrap: wrap;">
        <button class="btn accent" id="exportPDF"><i class="fas fa-file-pdf"></i> Экспорт в PDF</button>
        <button class="btn" id="exportMD"><i class="fas fa-file-code"></i> Экспорт в Markdown</button>
        <button class="btn" id="readAloud"><i class="fas fa-volume-up"></i> Озвучить текст</button>
      </div>
    </div>
  </div>

  <div id="hiddenMode">
    <h2>🎮 Режим скрытности</h2>
    <p>Введите любой текст, чтобы вернуться</p>
    <input type="text" id="gameInput" placeholder="..." />
    <button class="btn" id="gameSubmitBtn">Вернуться</button>
  </div>

  <div class="toast" id="toast">Готово!</div>

  <!-- === Скрипты === -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/GLTFLoader.min.js"></script>
  <script src="https://accounts.google.com/gsi/client" async defer></script>
  <script src="https://apis.google.com/js/api.js" async defer></script>

  <script>
    // === Глобальное состояние ===
    let currentMode = localStorage.getItem('dzenwiki_mode') || 'dzen';
    let dzenHistory = JSON.parse(localStorage.getItem('dzen_history') || '[]');
    let wikiHistory = JSON.parse(localStorage.getItem('wiki_history') || '[]');

    // === Инициализация ===
    function init() {
      document.body.className = `mode-${currentMode}`;
      updateLogo();
      showCurrentMode();

      if (currentMode === 'dzen') {
        initDzen();
      } else {
        initWiki();
      }
    }

    function showCurrentMode() {
      document.getElementById('dzenMode').style.display = currentMode === 'dzen' ? 'block' : 'none';
      document.getElementById('wikiMode').style.display = currentMode === 'wiki' ? 'block' : 'none';
    }

    function updateLogo() {
      const logo = document.getElementById('logo');
      logo.innerHTML = currentMode === 'dzen'
        ? '<i class="fas fa-blog"></i> Dzen Explorer'
        : '<i class="fas fa-book"></i> Wikipedia Explorer';
    }

    // === ПЕРЕКЛЮЧЕНИЕ РЕЖИМОВ ===
    document.getElementById('toggleModeBtn').addEventListener('click', () => {
      currentMode = currentMode === 'dzen' ? 'wiki' : 'dzen';
      localStorage.setItem('dzenwiki_mode', currentMode);
      init();
    });

    // === РЕЖИМ ДЗЕН ===
    function initDzen() {
      updateDzenSuggestions();

      document.getElementById('searchBtn').onclick = () => {
        const q = document.getElementById('searchInput').value.trim();
        if (q) performDzenSearch(q);
      };

      document.getElementById('searchInput').addEventListener('keypress', e => {
        if (e.key === 'Enter') {
          const q = document.getElementById('searchInput').value.trim();
          if (q) performDzenSearch(q);
        }
      });

      // Голосовой ввод
      if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.lang = 'ru-RU';
        document.getElementById('voiceBtn').onclick = () => recognition.start();
        recognition.onresult = e => {
          const transcript = e.results[0][0].transcript;
          document.getElementById('searchInput').value = transcript;
          performDzenSearch(transcript);
        };
      } else {
        document.getElementById('voiceBtn').remove();
      }

      initAIChat();
      init3DAnimation();
      initGoogleDrive();

      // Кнопка синхронизации
      const syncBtn = document.createElement('button');
      syncBtn.className = 'btn';
      syncBtn.innerHTML = '<i class="fas fa-sync-alt"></i> Синхронизировать';
      syncBtn.onclick = syncBookmarksToDrive;
      document.getElementById('dzenControls').appendChild(syncBtn);
    }

    async function performDzenSearch(query) {
      // Фильтр ГДЗ
      const gdzWords = ['гдз', 'решебник', 'ответы', 'домашка'];
      if (gdzWords.some(w => query.toLowerCase().includes(w))) {
        showToast("🚫 Поиск ГДЗ запрещён");
        return;
      }

      // Распознавание номера задачи
      const numMatch = query.match(/\b(\d{1,4})\b/);
      if (numMatch) {
        const num = numMatch[1];
        const base = query.replace(numMatch[0], '').trim();
        query = `${base} упражнение ${num}`;
        showToast(`🔍 Уточнённо: "${query}"`);
      }

      saveToHistory('dzen', query);
      updateDzenSuggestions();

      const loader = document.getElementById('resultsLoader');
      loader.textContent = 'Поиск...';
      document.getElementById('videoGrid').innerHTML = '';

      // Эмуляция результатов
      const mockResults = [
        { title: `"${query}" — подробный разбор`, author: "Образовательный канал", thumb: "https://via.placeholder.com/320x180/1e1e1e/0077ff?text=Видео+1" },
        { title: `Как решать задачи по ${query}`, author: "Учёный Кот", thumb: "https://via.placeholder.com/320x180/1e1e1e/bb86fc?text=Видео+2" },
        { title: `Лайфхаки для понимания ${query}`, author: "SmartStudy", thumb: "https://via.placeholder.com/320x180/1e1e1e/0077ff?text=Видео+3" }
      ];

      const grid = document.getElementById('videoGrid');
      mockResults.forEach(video => {
        const card = document.createElement('div');
        card.className = 'video-card';
        card.innerHTML = `
          <img src="${video.thumb}" alt="" class="video-thumb">
          <div class="video-info">
            <div class="video-title">${video.title}</div>
            <div class="video-author">${video.author}</div>
          </div>
        `;
        card.onclick = () => {
          document.getElementById('searchInput').value = video.title;
          performDzenSearch(video.title);
        };
        grid.appendChild(card);
      });

      loader.textContent = '';
    }

    function saveToHistory(type, item) {
      const list = type === 'dzen' ? dzenHistory : wikiHistory;
      if (!list.includes(item)) {
        list.unshift(item);
        if (list.length > 30) list.pop();
        localStorage.setItem(`${type}_history`, JSON.stringify(list));
      }
    }

    function updateDzenSuggestions() {
      const box = document.getElementById('dzenSuggestions');
      box.innerHTML = '';
      dzenHistory.slice(0, 5).forEach(q => {
        const tag = createSuggestionTag(q, () => {
          document.getElementById('searchInput').value = q;
          performDzenSearch(q);
        });
        box.appendChild(tag);
      });
    }

    // === ЧАТ С МАТЕМАТИКОЙ ===
    function initAIChat() {
      const chatInput = document.getElementById('chatInput');
      const chatMessages = document.getElementById('chatMessages');

      document.getElementById('sendChatBtn').onclick = sendChat;
      chatInput.addEventListener('keypress', e => e.key === 'Enter' && sendChat());

      function sendChat() {
        const msg = chatInput.value.trim();
        if (!msg) return;
        addMessage(msg, 'user');
        chatInput.value = '';

        setTimeout(() => {
          let reply = getAIResponse(msg);
          addMessage(reply, 'ai');
          MathJax.typesetPromise([chatMessages.lastElementChild]).catch(console.error);
        }, 600);
      }

      function addMessage(text, sender) {
        const div = document.createElement('div');
        div.className = `message ${sender === 'user' ? 'user-msg' : 'ai-msg'}`;
        div.textContent = text;
        chatMessages.appendChild(div);
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }

      function getAIResponse(msg) {
        msg = msg.toLowerCase();
        if (msg.includes('формула')) return "Формулы поддерживаются: $E = mc^2$, $\\int x dx$";
        if (msg.includes('x²') || msg.includes('квадратное')) return "Решайте через дискриминант: $D = b^2 - 4ac$";
        if (msg.includes('гдз')) return "Я не помогаю с ГДЗ. Но могу объяснить тему!";
        return "Я помогаю с учебой без ГДЗ. Задайте вопрос по теме.";
      }
    }

    // === 3D АНИМАЦИЯ ===
    function init3DAnimation() {
      const container = document.getElementById('preview3d');
      if (!container) return;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, container.clientWidth / 180, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ alpha: true });
      renderer.setSize(container.clientWidth, 180);
      container.innerHTML = '';
      container.appendChild(renderer.domElement);

      const light = new THREE.AmbientLight(0xffffff, 1);
      scene.add(light);

      const loader = new THREE.GLTFLoader();
      loader.load('model.glb', (gltf) => {
        scene.add(gltf.scene);
        animate();
      }, undefined, (error) => {
        console.error('Ошибка загрузки 3D-модели:', error);
        // Заглушка
        const geometry = new THREE.TorusKnotGeometry(0.8, 0.3, 100, 16);
        const material = new THREE.MeshPhongMaterial({ color: 0x0077ff });
        const shape = new THREE.Mesh(geometry, material);
        scene.add(shape);
        animate();
      });

      camera.position.z = 3;

      function animate() {
        requestAnimationFrame(animate);
        if (scene.children.find(c => c.isObject3D)) {
          scene.children.find(c => c.isObject3D).rotation.x += 0.01;
          scene.children.find(c => c.isObject3D).rotation.y += 0.01;
        }
        renderer.render(scene, camera);
      }

      window.addEventListener('resize', () => {
        renderer.setSize(container.clientWidth, 180);
        camera.aspect = container.clientWidth / 180;
        camera.updateProjectionMatrix();
      });
    }

    // === GOOGLE DRIVE SYNC ===
    let gapiLoaded = false;
    let isSignedIn = false;

    function initGoogleDrive() {
      gapi.load('client:auth2', () => {
        gapiLoaded = true;
        gapi.client.init({
          apiKey: 'YOUR_BROWSER_API_KEY',
          clientId: 'YOUR_CLIENT_ID',
          discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
          scope: 'https://www.googleapis.com/auth/drive.file'
        }).then(() => {
          const authInstance = gapi.auth2.getAuthInstance();
          authInstance.isSignedIn.listen(updateSignInStatus);
          updateSignInStatus(authInstance.isSignedIn.get());
        });
      });
    }

    function updateSignInStatus(isSignedInState) {
      isSignedIn = isSignedInState;
      if (isSignedInState) {
        showToast("✅ Вход в Google выполнен");
      }
    }

    function syncBookmarksToDrive() {
      if (!isSignedIn) {
        showToast("❌ Сначала войдите в Google");
        return;
      }
      const bookmarks = JSON.parse(localStorage.getItem('dzenBookmarks') || '[]');
      const content = JSON.stringify(bookmarks, null, 2);

      const boundary = 'dzenwikiboundary';
      const delimiter = "\r\n--" + boundary + "\r\n";
      const close_delim = "\r\n--" + boundary + "--";

      const metadata = {
        name: 'dzen-bookmarks.json',
        parents: ['appDataFolder']
      };

      const multipartRequestBody =
        delimiter +
        'Content-Type: application/json\r\n\r\n' +
        JSON.stringify(metadata) +
        delimiter +
        'Content-Type: application/json\r\n\r\n' +
        content +
        close_delim;

      gapi.client.request({
        path: '/upload/drive/v3/files',
        method: 'POST',
        params: { uploadType: 'multipart' },
        headers: { 'Content-Type': 'multipart/related; boundary="' + boundary + '"' },
        body: multipartRequestBody
      }).then(() => showToast("💾 Закладки синхронизированы"));
    }

    // === РЕЖИМ ВИКИПЕДИЯ ===
    function initWiki() {
      updateWikiSuggestions();

      document.getElementById('wikiSearchBtn').onclick = () => {
        const q = document.getElementById('wikiSearchInput').value.trim();
        if (q) performWikiSearch(q);
      };

      document.getElementById('wikiSearchInput').addEventListener('keypress', e => {
        if (e.key === 'Enter') {
          const q = document.getElementById('wikiSearchInput').value.trim();
          if (q) performWikiSearch(q);
        }
      });

      document.getElementById('exportMD').onclick = exportMarkdown;
      document.getElementById('exportPDF').onclick = () => window.print();
      document.getElementById('readAloud').onclick = readAloud;
    }

    async function performWikiSearch(query) {
      saveToHistory('wiki', query);
      updateWikiSuggestions();

      const contentDiv = document.getElementById('wikiContent');
      contentDiv.innerHTML = '<div class="loader">Загрузка статьи...</div>';

      try {
        const response = await fetch(`https://ru.wikipedia.org/api/rest_v1/page/html/${encodeURIComponent(query)}`);
        if (!response.ok) throw new Error("Статья не найдена");

        const html = await response.text();
        contentDiv.innerHTML = html;

        document.querySelectorAll('#wikiContent .mwe-popups, #wikiContent .vector-page-toolbar').forEach(el => el.remove());

        document.querySelectorAll('#wikiContent img').forEach(img => {
          if (img.src.startsWith('//')) img.src = 'https:' + img.src;
        });

        document.querySelectorAll('#wikiContent a').forEach(a => {
          if (a.href.includes('wikipedia.org')) {
            a.onclick = (e) => {
              e.preventDefault();
              const title = a.href.split('/').pop();
              performWikiSearch(decodeURIComponent(title));
            };
          }
        });

        MathJax.typesetPromise([contentDiv]).catch(console.error);
      } catch (err) {
        contentDiv.innerHTML = `<div class="loader">❌ Статья "${query}" не найдена. Попробуйте другое название.</div>`;
      }
    }

    function exportMarkdown() {
      const content = document.getElementById('wikiContent').innerText;
      const blob = new Blob([`# ${document.getElementById('wikiSearchInput').value}\n\n${content}`], { type: 'text/markdown' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'article.md';
      a.click();
    }

    function readAloud() {
      const text = document.getElementById('wikiContent').innerText;
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text.substring(0, 500));
        utterance.lang = 'ru-RU';
        speechSynthesis.speak(utterance);
      } else {
        alert("Синтез речи не поддерживается в этом браузере.");
      }
    }

    function updateWikiSuggestions() {
      const box = document.getElementById('wikiSuggestions');
      box.innerHTML = '';
      wikiHistory.slice(0, 5).forEach(q => {
        const tag = createSuggestionTag(q, () => {
          document.getElementById('wikiSearchInput').value = q;
          performWikiSearch(q);
        });
        box.appendChild(tag);
      });
    }

    // === Утилиты ===
    function createSuggestionTag(text, onClick) {
      const tag = document.createElement('div');
      tag.className = 'suggestion-tag';
      tag.textContent = text;
      tag.onclick = onClick;
      return tag;
    }

    // === СКРЫТИЕ ===
    document.getElementById('hideBtn').addEventListener('click', () => {
      document.querySelector('.container').style.display = 'none';
      document.getElementById('hiddenMode').style.display = 'flex';
    });

    document.getElementById('gameSubmitBtn').addEventListener('click', () => {
      document.querySelector('.container').style.display = 'block';
      document.getElementById('hiddenMode').style.display = 'none';
    });

    // === TOAST ===
    function showToast(msg) {
      const t = document.getElementById('toast');
      t.textContent = msg;
      t.classList.add('show');
      setTimeout(() => t.classList.remove('show'), 3000);
    }

    // === PWA Registration ===
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('service-worker.js');
      });
    }

    // === ЗАПУСК ===
    init();
  </script>
</body>
</html>
