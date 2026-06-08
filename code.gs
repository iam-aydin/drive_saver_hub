// ==================== CONFIG ====================
var DATA_SAVER_FOLDER_ID = 'YOUR OWN DRIVE FOLDER ID';   // ← replace with your own folder ID
var FOLDER_NAME = '';   // ← your custom folder name (shown in UI)(OPTIONAL)
var APP_TITLE = '';   // ← change this to whatever you want(OPTIONAL)
// ===============================================

// ========== PART 1: The Web App Interface (with tooltips) ==========
function doGet() {
  return HtmlService.createHtmlOutput(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
        <link href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;500;700&display=swap" rel="stylesheet">
        <style>
          /* --- All your existing styles unchanged --- */
          :root {
            --md-sys-color-surface: #fef7ff;
            --md-sys-color-surface-container: #ffffff;
            --md-sys-color-on-surface: #1c1b1f;
            --md-sys-color-outline: #79747e;
            --md-sys-color-primary: #1b6ef3;
            --md-sys-color-on-primary: #ffffff;
            --md-sys-color-primary-container: #d3e3fd;
            --md-sys-color-on-primary-container: #041e49;
            --md-sys-color-secondary-container: #e8def8;
            --md-sys-color-on-secondary-container: #1d192b;
            --md-sys-color-surface-variant: #e7e0ec;
            --md-sys-shadow: 0 1px 2px rgba(0,0,0,0.1), 0 2px 8px rgba(0,0,0,0.08);
            --md-sys-radius: 28px;
            --md-sys-radius-small: 20px;
          }

          body.dark {
            --md-sys-color-surface: #1c1b1f;
            --md-sys-color-surface-container: #2b2930;
            --md-sys-color-on-surface: #e6e1e5;
            --md-sys-color-outline: #938f99;
            --md-sys-color-primary: #a8c7fa;
            --md-sys-color-on-primary: #003258;
            --md-sys-color-primary-container: #004a77;
            --md-sys-color-on-primary-container: #d3e3fd;
            --md-sys-color-secondary-container: #4a4458;
            --md-sys-color-on-secondary-container: #e8def8;
            --md-sys-color-surface-variant: #49454f;
            --md-sys-shadow: 0 1px 2px rgba(0,0,0,0.3), 0 2px 8px rgba(0,0,0,0.2);
          }

          * { margin: 0; padding: 0; box-sizing: border-box; }

          body {
            font-family: 'Google Sans', 'Roboto', system-ui, -apple-system, sans-serif;
            text-align: center;
            padding: 24px 16px 16px;
            background: var(--md-sys-color-surface);
            color: var(--md-sys-color-on-surface);
            transition: background 0.3s, color 0.3s;
            direction: ltr;
          }

          body.rtl, body.rtl * {
            font-family: 'Vazirmatn', 'Google Sans', 'Roboto', system-ui, sans-serif !important;
          }
          body.rtl .material-symbols-outlined {
            font-family: 'Material Symbols Outlined' !important;
          }
          body.rtl {
            direction: rtl;
          }

          .title-chip {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            background: var(--md-sys-color-primary-container);
            color: var(--md-sys-color-on-primary-container);
            border-radius: 24px;
            padding: 8px 24px;
            font-size: 20px;
            cursor: default;
            font-weight: 500;
            letter-spacing: 0.1px;
            transition: background 0.3s, color 0.3s;
            line-height: 1.2;
            min-height: 48px;
          }

          .top-controls {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            gap: 12px;
            margin-bottom: 24px;
            flex-wrap: wrap;
          }

          #connectivityBar {
            display: inline-flex;
            flex-direction: row-reverse;
            align-items: center;
            justify-content: center;
            gap: 8px;
            font-size: 20px;
            padding: 8px 24px;
            border-radius: 24px;
            cursor: default;
            background: var(--md-sys-color-surface-variant);
            color: var(--md-sys-color-on-surface);
            box-shadow: var(--md-sys-shadow);
            transition: background 0.3s, color 0.3s;
            line-height: 1.2;
            min-height: 48px;
          }
          #connectivityIcon {
            font-size: 24px;
          }
          #connectivityBar.connected { color: #0d652d; }
          body.dark #connectivityBar.connected { color: #a5d6a7; }
          #connectivityBar.disconnected { color: #d93025; }
          body.dark #connectivityBar.disconnected { color: #ef9a9a; }

          .theme-toggle-btn {
            background: var(--md-sys-color-surface-variant);
            border: none;
            color: var(--md-sys-color-on-surface);
            font-size: 28px;
            cursor: pointer;
            padding: 8px;
            border-radius: 50%;
            width: 48px;
            height: 48px;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: var(--md-sys-shadow);
            transition: background 0.3s;
          }
          .theme-toggle-btn:hover {
            background: var(--md-sys-color-secondary-container);
          }

          .main-container {
            display: flex;
            justify-content: center;
            gap: 16px;
            flex-wrap: wrap;
            margin-bottom: 16px;
          }

          .card {
            background: var(--md-sys-color-surface-container);
            border-radius: var(--md-sys-radius);
            padding: 28px 24px;
            max-width: 380px;
            width: 100%;
            box-shadow: var(--md-sys-shadow);
            transition: background 0.3s, box-shadow 0.3s;
            display: flex;
            flex-direction: column;
          }

          .left-card, .right-card {
            max-width: 380px;
          }

          h2, h3 {
            font-weight: 500;
            color: var(--md-sys-color-on-surface);
          }

          input {
            width: 100%;
            padding: 14px 18px;
            border-radius: 28px;
            border: 2px solid var(--md-sys-color-outline);
            background: transparent;
            color: var(--md-sys-color-on-surface);
            font-family: system-ui, monospace;
            font-size: 15px;
            margin: 12px 0;
            outline: none;
            transition: border 0.2s, background 0.3s;
          }

          input:focus {
            border-color: var(--md-sys-color-primary);
            background: rgba(27,110,243,0.04);
          }

          button {
            background: var(--md-sys-color-primary);
            color: var(--md-sys-color-on-primary);
            border: none;
            padding: 14px 24px;
            border-radius: 28px;
            font-size: 15px;
            font-weight: 500;
            cursor: pointer;
            transition: background 0.2s, box-shadow 0.2s, transform 0.1s;
            letter-spacing: 0.2px;
          }

          button:hover { box-shadow: 0 1px 4px rgba(0,0,0,0.15); }
          button:active { transform: scale(0.97); }

          .outlined-btn {
            background: transparent;
            color: var(--md-sys-color-primary);
            border: 2px solid var(--md-sys-color-outline);
          }
          .outlined-btn:hover {
            background: rgba(27,110,243,0.08);
            border-color: var(--md-sys-color-primary);
          }

          .row { display: flex; gap: 8px; align-items: center; }
          .small-input {
            text-align: center;
          }

          .icon-btn {
            width: 48px;
            height: 48px;
            border-radius: 50%;
            padding: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            background: transparent;
            color: var(--md-sys-color-primary);
            border: 2px solid var(--md-sys-color-outline);
            cursor: pointer;
            transition: background 0.2s, border 0.2s;
          }
          .icon-btn:hover {
            background: rgba(27,110,243,0.08);
            border-color: var(--md-sys-color-primary);
          }

          .status-box {
            margin-top: 16px;
            padding: 12px;
            border-radius: 16px;
            font-size: 14px;
            background: var(--md-sys-color-surface-variant);
            color: var(--md-sys-color-on-surface);
            transition: background 0.3s, color 0.3s;
          }
          .success { color: #0d652d; }
          .error   { color: #d93025; }
          body.dark .success { color: #b9f6ca; }
          body.dark .error   { color: #ffab91; }

          #firstIndex {
            border-color: #0d652d !important;
            color: #0d652d !important;
          }
          body.dark #firstIndex {
            border-color: #b9f6ca !important;
            color: #b9f6ca !important;
          }
          #firstIndex::placeholder {
            color: #0d652d;
            opacity: 0.6;
          }
          body.dark #firstIndex::placeholder {
            color: #b9f6ca;
          }

          #lastIndex {
            border-color: #d93025 !important;
            color: #d93025 !important;
          }
          body.dark #lastIndex {
            border-color: #ffab91 !important;
            color: #ffab91 !important;
          }
          #lastIndex::placeholder {
            color: #d93025;
            opacity: 0.6;
          }
          body.dark #lastIndex::placeholder {
            color: #ffab91;
          }

          p, .small-text {
            font-size: 12px;
            margin-top: 12px;
            opacity: 0.8;
          }

          .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
            font-size: 24px;
          }

          .placeholder-bold::placeholder {
            font-weight: bold;
            text-transform: uppercase;
            opacity: 0.7;
          }

          .footer {
            margin-top: 24px;
            display: flex;
            justify-content: center;
          }

          .lang-btn {
            background: var(--md-sys-color-primary-container);
            color: var(--md-sys-color-on-primary-container);
            border: none;
            border-radius: 20px;
            padding: 8px 20px;
            font-size: 14px;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 6px;
            transition: background 0.3s;
          }

          .lang-btn:hover {
            background: var(--md-sys-color-secondary-container);
          }

          .drive-link-btn {
            display: inline-block;
            margin-top: 8px;
            padding: 8px 20px;
            background: var(--md-sys-color-primary);
            color: var(--md-sys-color-on-primary);
            border-radius: 28px;
            text-decoration: none;
            font-size: 14px;
            font-weight: 500;
            transition: box-shadow 0.2s;
          }
          .drive-link-btn:hover {
            box-shadow: 0 1px 4px rgba(0,0,0,0.2);
          }
        </style>
      </head>
      <body>
        <div class="top-controls">
          <div class="title-chip" data-i18n-title="titleChipTitle">${APP_TITLE}</div>
          <div id="connectivityBar" data-i18n-title="connectivityTitle">
            <span id="connectivityIcon" class="material-symbols-outlined">wifi</span>
            <span id="connectivityText">Connected</span>
          </div>
          <button id="themeToggle" class="theme-toggle-btn" aria-label="Toggle theme" data-i18n-title="themeToggleTitle">
            <span class="material-symbols-outlined">dark_mode</span>
          </button>
        </div>

        <div class="main-container">
          <div class="card left-card">
            <h2 data-i18n="mainHeader" style="text-align:center; font-size:1.3rem; margin-bottom: 12px;">📥 Save to Google Drive</h2>
            <div style="position:relative; width:100%;">

        <input
          type="text"
          id="fileUrl"
          data-i18n-placeholder="urlPlaceholder"
          placeholder="Paste direct download link here"
          value="https://aka.ms/vs/17/release/vs_community.exe"
          style="padding-right:60px;"
        >

        <button
          id="queueBtn"
          style="
            position:absolute;
            right:6px;
            top:50%;
            transform:translateY(-50%);
            width:42px;
            height:42px;
            border-radius:50%;
            border:none;
            background:#1b6ef3;
            color:white;
            font-size:26px;
            cursor:pointer;
            padding:0;
          "
        >+</button>

</div>
            <div class="row">
              <button id="saveBtn" style="flex:1;" data-i18n="saveBtn">⬇️ Download & Save</button>
              <button id="checkSizeBtn" class="icon-btn" data-i18n-title="checkSizeTitle" title="Check file size">🗃️</button>
            </div>
            <div id="status" class="status-box">Ready</div>
            <div
              id="queueBox"
              class="status-box"
              style="
                margin-top:12px;
                text-align:left;
                max-height:180px;
                overflow:auto;
              "
            >
              Queue empty
            </div>
            <p data-i18n="saveNote">File will be saved to folder: <strong>${FOLDER_NAME}</strong><br>(max 2GB+)</p>
          </div>

          <div class="card right-card">
            <h3 style="margin-top:0;" data-i18n="rangeHeader">📏 Chunk Range</h3>
            <input type="text" id="chunkUrl" data-i18n-placeholder="rangeUrlPlaceholder" placeholder="Paste direct download link">
            <div class="row" style="justify-content:center;">
              <input type="number" id="firstIndex" data-i18n-placeholder="firstPlaceholder" placeholder="First" class="small-input" min="0" value="">
              <input type="number" id="lastIndex" data-i18n-placeholder="lastPlaceholder" placeholder="Last" class="small-input" min="0" value="">
            </div>
            <button id="rangeSaveBtn" style="background:#ff9800; margin-top:12px;" data-i18n="rangeSaveBtn">📥 Download Range</button>
            <div id="rangeStatus" class="status-box">Ready</div>
            <p class="small-text" style="margin-top:8px;" data-i18n="rangeHelp">Enter 0‑based chunk range.<br>Useful for splitting downloads across accounts.<br>Example: 0–15 in one, 16–33 in another.</p>
          </div>
        </div>

        <div class="card" style="max-width: 640px; margin: 0 auto;">
          <h3 data-i18n="combineHeader">🔧 Combine Downloaded Chunks</h3>
          <input type="file" id="chunkSelector" multiple accept="*" style="margin:8px 0;">
          <input type="text" id="outputFileName" class="placeholder-bold" data-i18n-placeholder="combinePlaceholder" placeholder="LEAVE EMPTY TO USE AUTO-DETECTED NAME">
          <button id="combineBtn" style="background:#34a853;" data-i18n="combineBtn">🔗 Combine Selected Chunks</button>
          <p class="small-text" data-i18n="combineHelp">Select all chunk files (any order) and leave filename empty to auto‑detect.</p>
        </div>

        <div class="footer">
          <button id="langToggle" class="lang-btn" data-i18n-title="langToggleTitle">
            <span class="material-symbols-outlined">translate</span>
            <span data-i18n="langLabel">فارسی</span>
          </button>
        </div>

        <script>
          // ==================== i18n ====================
          const i18n = {
            en: {
              mainHeader: '📥 Save to Google Drive',
              urlPlaceholder: 'Paste direct download link here',
              saveBtn: '⬇️ Download & Save',
              checkSizeTitle: 'Check file size',
              statusReady: 'Ready',
              saveNote: 'File will be saved to folder: <strong>${FOLDER_NAME}</strong><br>(max 2GB+)',
              rangeHeader: '📏 Chunk Range',
              rangeUrlPlaceholder: 'Paste direct download link',
              firstPlaceholder: 'First',
              lastPlaceholder: 'Last',
              rangeSaveBtn: '📥 Download Range',
              rangeStatusReady: 'Ready',
              rangeHelp: 'Enter 0‑based chunk range.<br>Useful for splitting downloads across accounts.<br>Example: 0–15 in one, 16–33 in another.',
              combineHeader: '🔧 Combine Downloaded Chunks',
              combinePlaceholder: 'LEAVE EMPTY TO USE AUTO-DETECTED NAME',
              combineBtn: '🔗 Combine Selected Chunks',
              combineHelp: 'Select all chunk files (any order) and leave filename empty to auto‑detect.',
              langLabel: 'فارسی',
              starting: 'Starting...',
              analyzing: 'Analyzing file...',
              tryAgain: 'Try again',
              fetchingSize: 'Fetching size information...',
              startingRange: 'Starting range...',
              schedulingRange: 'Scheduling chunks ',
              errorPrefix: 'Error: ',
              connected: 'Connected',
              disconnected: 'Disconnected',
              titleChipTitle: 'Custom name set by user – helps identify multiple open downloaders',
              connectivityTitle: 'Checks every 7 seconds that you can reach Google services',
              themeToggleTitle: 'Switch between light and dark theme',
              langToggleTitle: 'Switch language between English and Persian'
            },
            fa: {
              mainHeader: '📥 ذخیره در گوگل درایو',
              urlPlaceholder: 'لینک مستقیم دانلود را وارد کنید',
              saveBtn: '⬇️ دانلود و ذخیره',
              checkSizeTitle: 'بررسی حجم فایل',
              statusReady: 'آماده',
              saveNote: 'فایل در پوشه <strong>${FOLDER_NAME}</strong> ذخیره خواهد شد.<br>(حداکثر ۲ گیگابایت)',
              rangeHeader: '📏 محدوده قطعات',
              rangeUrlPlaceholder: 'لینک مستقیم دانلود',
              firstPlaceholder: 'اولین',
              lastPlaceholder: 'آخرین',
              rangeSaveBtn: '📥 دانلود محدوده',
              rangeStatusReady: 'آماده',
              rangeHelp: 'بازه قطعات را بر اساس صفر وارد کنید.<br>برای تقسیم دانلود بین چند حساب کاربردی است.<br>مثال: ۰ تا ۱۵ در یکی، ۱۶ تا ۳۳ در دیگری.',
              combineHeader: '🔧 ترکیب قطعات دانلود شده',
              combinePlaceholder: 'برای استفاده از نام تشخیص خودکار خالی بگذارید',
              combineBtn: '🔗 ترکیب قطعات انتخاب شده',
              combineHelp: 'همه قطعات را به هر ترتیب انتخاب کنید و نام فایل نهایی را خالی بگذارید.',
              langLabel: 'English',
              starting: 'در حال شروع...',
              analyzing: 'در حال بررسی فایل...',
              tryAgain: 'تلاش دوباره',
              fetchingSize: 'دریافت اطلاعات حجم...',
              startingRange: 'در حال شروع محدوده...',
              schedulingRange: 'زمان‌بندی قطعات ',
              errorPrefix: 'خطا: ',
              connected: 'متصل',
              disconnected: 'قطع',
              titleChipTitle: 'نام دلخواه تعیین شده توسط کاربر - برای تشخیص دانلودرهای باز متعدد',
              connectivityTitle: 'هر ۷ ثانیه بررسی می‌کند که آیا به سرویس‌های گوگل متصل هستید',
              themeToggleTitle: 'تغییر بین تم روشن و تاریک',
              langToggleTitle: 'تغییر زبان بین انگلیسی و فارسی'
            }
          };

          let currentLang = localStorage.getItem('lang') || 'en';
          const rtlLangs = ['fa'];
          let isConnected = null;
          const statusEl = document.getElementById('status');
          const rangeStatusEl = document.getElementById('rangeStatus');

          function updateConnectivity(status) {
            isConnected = status;
            const bar = document.getElementById('connectivityBar');
            const icon = document.getElementById('connectivityIcon');
            const text = document.getElementById('connectivityText');
            if (status) {
              text.textContent = i18n[currentLang]['connected'];
              icon.textContent = 'wifi';
              bar.classList.add('connected');
              bar.classList.remove('disconnected');
            } else {
              text.textContent = i18n[currentLang]['disconnected'];
              icon.textContent = 'wifi_off';
              bar.classList.add('disconnected');
              bar.classList.remove('connected');
            }
          }

          function applyLanguage(lang) {
            document.querySelectorAll('[data-i18n]').forEach(el => {
              const key = el.dataset.i18n;
              if (i18n[lang] && i18n[lang][key]) el.innerHTML = i18n[lang][key];
            });
            document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
              const key = el.dataset.i18nPlaceholder;
              if (i18n[lang] && i18n[lang][key]) el.placeholder = i18n[lang][key];
            });
            document.querySelectorAll('[data-i18n-title]').forEach(el => {
              const key = el.dataset.i18nTitle;
              if (i18n[lang] && i18n[lang][key]) el.title = i18n[lang][key];
            });

            if (rtlLangs.includes(lang)) {
              document.body.classList.add('rtl');
            } else {
              document.body.classList.remove('rtl');
            }

            document.querySelector('#langToggle span[data-i18n="langLabel"]').textContent = i18n[lang].langLabel;

            const saveBtn = document.getElementById('saveBtn');
            if (!saveBtn.disabled) saveBtn.textContent = i18n[lang].saveBtn;
            const rangeBtn = document.getElementById('rangeSaveBtn');
            if (!rangeBtn.disabled) rangeBtn.textContent = i18n[lang].rangeSaveBtn;
            const combineBtn = document.getElementById('combineBtn');
            if (!combineBtn.disabled) combineBtn.textContent = i18n[lang].combineBtn;

            const statusReadyEn = i18n['en'].statusReady;
            const statusReadyFa = i18n['fa'].statusReady;
            if (statusEl.innerText.trim() === statusReadyEn || statusEl.innerText.trim() === statusReadyFa) {
              statusEl.innerHTML = '<span class="success">' + i18n[lang].statusReady + '</span>';
            }
            if (rangeStatusEl.innerText.trim() === statusReadyEn || rangeStatusEl.innerText.trim() === statusReadyFa) {
              rangeStatusEl.innerHTML = '<span class="success">' + i18n[lang].rangeStatusReady + '</span>';
            }

            if (isConnected !== null) updateConnectivity(isConnected);
          }

          document.getElementById('langToggle').onclick = () => {
            currentLang = currentLang === 'en' ? 'fa' : 'en';
            localStorage.setItem('lang', currentLang);
            applyLanguage(currentLang);
          };

          applyLanguage(currentLang);

          // Theme toggle
          const themeToggle = document.getElementById('themeToggle');
          const themeIcon = themeToggle.querySelector('.material-symbols-outlined');
          const bodyEl = document.body;
          const setTheme = (isDark) => {
            if (isDark) {
              bodyEl.classList.add('dark');
              themeIcon.textContent = 'light_mode';
              localStorage.setItem('themeMode', 'dark');
            } else {
              bodyEl.classList.remove('dark');
              themeIcon.textContent = 'dark_mode';
              localStorage.setItem('themeMode', 'light');
            }
          };
          const savedTheme = localStorage.getItem('themeMode');
          setTheme(savedTheme === 'dark');
          themeToggle.onclick = () => setTheme(!bodyEl.classList.contains('dark'));

          function setStatus(msg, isError = false) {
            statusEl.innerHTML = isError ? '<span class="error">' + msg + '</span>' : '<span class="success">' + msg + '</span>';
          }

          function setRangeStatus(msg, isError = false) {
            rangeStatusEl.innerHTML = isError ? '<span class="error">' + msg + '</span>' : '<span class="success">' + msg + '</span>';
          }

          // Ping every 7 seconds
          function pingInternet() {
            fetch('https://drive.google.com/favicon.ico', { mode: 'no-cors' })
              .then(() => updateConnectivity(true))
              .catch(() => updateConnectivity(false));
          }
          pingInternet();
          setInterval(pingInternet, 7000);

          // ==================== MAIN DOWNLOAD (now passes timestamp) ====================
          document.getElementById('fileUrl').addEventListener('keydown', function(e) {
            if (e.key === 'Enter') document.getElementById('saveBtn').click();
          });

          document.getElementById('saveBtn').onclick = function() {
            const btn = this, url = document.getElementById('fileUrl').value;
            if (!url) return;
            btn.disabled = true;
            btn.textContent = i18n[currentLang].starting;
            setStatus(i18n[currentLang].analyzing);
            const downloadTime = new Date().toLocaleString();      // user's local time
            google.script.run
              .withSuccessHandler(function(msg) {
                btn.disabled = false;
                btn.textContent = i18n[currentLang].saveBtn;
                setStatus(msg);
              })
              .withFailureHandler(function(err) {
                btn.disabled = false;
                btn.textContent = i18n[currentLang].tryAgain;
                setStatus(i18n[currentLang].errorPrefix + err.message, true);
              })
              .chooseBasedOnFileSize(currentLang, url, downloadTime);   // pass time
          };

          document.getElementById('checkSizeBtn').onclick = function() {
            const btn = this, url = document.getElementById('fileUrl').value;
            if (!url) return;
            btn.disabled = true;
            setStatus(i18n[currentLang].fetchingSize);
            google.script.run
              .withSuccessHandler(function(info) {
                btn.disabled = false;
                setStatus(info);
              })
              .withFailureHandler(function(err) {
                btn.disabled = false;
                setStatus(i18n[currentLang].errorPrefix + err.message, true);
              })
              .getFileSizeInfo(currentLang, url);
          };

          document.getElementById('rangeSaveBtn').onclick = function() {
            const btn = this;
            const chunkUrl = document.getElementById('chunkUrl').value;
            const first = parseInt(document.getElementById('firstIndex').value, 10);
            const last  = parseInt(document.getElementById('lastIndex').value, 10);
            if (!chunkUrl || isNaN(first) || isNaN(last)) {
              setRangeStatus(i18n[currentLang].errorPrefix + 'Please enter a URL and both first and last indices.', true);
              return;
            }
            if (first > last) {
              setRangeStatus(i18n[currentLang].errorPrefix + 'First index must be ≤ last index.', true);
              return;
            }
            btn.disabled = true;
            btn.textContent = i18n[currentLang].startingRange;
            setRangeStatus(i18n[currentLang].schedulingRange + first + ' to ' + last + '...');
            const downloadTime = new Date().toLocaleString();      // user's local time
            google.script.run
              .withSuccessHandler(function(msg) {
                btn.disabled = false;
                btn.textContent = i18n[currentLang].rangeSaveBtn;
                setRangeStatus(msg);
              })
              .withFailureHandler(function(err) {
                btn.disabled = false;
                btn.textContent = i18n[currentLang].rangeSaveBtn;
                setRangeStatus(i18n[currentLang].errorPrefix + err.message, true);
              })
              .startChunkRangeDownload(currentLang, chunkUrl, first, last, downloadTime);   // pass time
          };

          // ==================== COMBINE CHUNKS (fixed ordering) ====================
          function getChunkNumber(filename) {
            // Search for ANY digit sequence inside the name and take the last one
            const matches = filename.match(/(\d+)/g);
            return matches && matches.length > 0 ? parseInt(matches[matches.length - 1], 10) : 0;
          }

          const chunkSelector = document.getElementById('chunkSelector');
          const outputFileName = document.getElementById('outputFileName');
          chunkSelector.addEventListener('change', function() {
            const files = Array.from(this.files);
            if (files.length === 0) return;
            const first = files[0].name;
            const baseName = first.replace(/\.\d+$/, '');
            if (baseName && baseName !== first) {
              outputFileName.value = baseName;
              outputFileName.placeholder = baseName;
            }
          });

          function combineChunks() {
            const combineBtn = document.getElementById('combineBtn');
            const fileInput = document.getElementById('chunkSelector');
            const outputNameInput = document.getElementById('outputFileName');
            if (!fileInput.files.length) {
              setStatus(i18n[currentLang].errorPrefix + 'Please select chunk files first!', true);
              return;
            }
            let outputName = outputNameInput ? outputNameInput.value.trim() : '';
            if (!outputName) {
              const first = fileInput.files[0].name;
              outputName = first.replace(/\.\d+$/, '') || 'combined_output.bin';
            }
            combineBtn.disabled = true;
            combineBtn.textContent = '⏳ Combining...';
            setStatus('Processing chunks...');
            const files = Array.from(fileInput.files);
            files.sort((a, b) => getChunkNumber(a.name) - getChunkNumber(b.name));
            const chunkBlobs = [];
            let completed = 0;
            files.forEach((file, idx) => {
              const reader = new FileReader();
              reader.onload = function(e) {
                chunkBlobs[idx] = e.target.result;
                completed++;
                if (completed === files.length) {
                  const blob = new Blob(chunkBlobs, { type: 'application/octet-stream' });
                  const a = document.createElement('a');
                  const url = URL.createObjectURL(blob);
                  a.href = url;
                  a.download = outputName;
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);
                  URL.revokeObjectURL(url);
                  combineBtn.disabled = false;
                  combineBtn.textContent = i18n[currentLang].combineBtn;
                  setStatus('✅ Combined! File saved as "' + outputName + '"');
                }
              };
              reader.onerror = function() {
                setStatus(i18n[currentLang].errorPrefix + 'Error reading file: ' + file.name, true);
                combineBtn.disabled = false;
                combineBtn.textContent = i18n[currentLang].combineBtn;
              };
              reader.readAsArrayBuffer(file);
            });
          }
          document.getElementById('combineBtn').onclick = combineChunks;
        </script>
      </body>
    </html>
  `).setTitle('Drive Saver');
}

// ==================== SERVER‑SIDE TRANSLATIONS ====================
var t = {
  en: {
    sizeUnknown: 'Could not determine file size.',
    sizeUnknownRange: 'File size unknown (server may not support Range).',
    sizeInfo: 'Size: {size} MB • Chunks needed: {chunks} (45 MB each)',
    directSuccessWithLink: 'Success! "{name}" ({size} KB) saved. {link}',
    downloadFailed: 'Download failed: ',
    fullStart: '✅ Full download started: {chunks} chunks (45 MB each). Estimated time: {time}. {link}',
    rangeStart: '✅ Downloading chunks {first} to {last} ({count} chunks). Est. time: {time}. {link}',
    rangeInvalid: 'Invalid range: start byte exceeds end byte.',
    driveLinkButtonText: 'Click to go to Drive'
  },
  fa: {
    sizeUnknown: 'امکان تعیین حجم فایل وجود ندارد.',
    sizeUnknownRange: 'حجم فایل نامشخص (سرور ممکن است از Range پشتیبانی نکند).',
    sizeInfo: 'حجم: {size} مگابایت • تعداد قطعات: {chunks} (هر کدام ۴۵ مگابایت)',
    directSuccessWithLink: 'با موفقیت ذخیره شد! "{name}" ({size} کیلوبایت) {link}',
    downloadFailed: 'دانلود ناموفق: ',
    fullStart: '✅ دانلود کامل آغاز شد: {chunks} قطعه (هر کدام ۴۵ مگابایت). زمان تقریبی: {time}. {link}',
    rangeStart: '✅ دانلود قطعات {first} تا {last} ({count} قطعه). زمان تقریبی: {time}. {link}',
    rangeInvalid: 'محدوده نامعتبر: بایت شروع از بایت پایان بیشتر است.',
    driveLinkButtonText: 'برای رفتن به درایو کلیک کنید'
  }
};

function _(lang, key, params) {
  var str = t[lang] && t[lang][key] ? t[lang][key] : t['en'][key];
  if (params) {
    for (var k in params) {
      str = str.replace('{' + k + '}', params[k]);
    }
  }
  return str;
}

function getDriveLinkButton(url, lang) {
  var text = _(lang, 'driveLinkButtonText');
  return '<a href="' + url + '" target="_blank" class="drive-link-btn">' + text + '</a>';
}

// ========== PART 2: File size & chunk info ==========
function getFileSizeInfo(lang, fileUrl) {
  var CHUNK_SIZE = 45 * 1024 * 1024;
  var fileSize = null;
  try {
    var resp = UrlFetchApp.fetch(fileUrl, {
      headers: { 'Range': 'bytes=0-0' },
      muteHttpExceptions: true,
      followRedirects: true
    });
    var cr = resp.getHeaders()['Content-Range'];
    if (cr) fileSize = parseInt(cr.split('/')[1], 10);
    else {
      var cl = resp.getHeaders()['Content-Length'];
      if (cl) fileSize = parseInt(cl, 10);
    }
  } catch (e) {
    return _(lang, 'sizeUnknown');
  }
  if (!fileSize || fileSize === 0) return _(lang, 'sizeUnknownRange');
  var sizeMB = (fileSize / 1048576).toFixed(2);
  var chunks = Math.ceil(fileSize / CHUNK_SIZE);
  return _(lang, 'sizeInfo', { size: sizeMB, chunks: chunks });
}

// ========== PART 3: Choose download method (accepts downloadTime) ==========
function chooseBasedOnFileSize(lang, fileUrl, downloadTime) {
  var SIZE_LIMIT = 50 * 1024 * 1024;
  var fileSize = null;
  try {
    var resp = UrlFetchApp.fetch(fileUrl, {
      headers: { 'Range': 'bytes=0-0' },
      muteHttpExceptions: true,
      followRedirects: true
    });
    var cr = resp.getHeaders()['Content-Range'];
    if (cr) fileSize = parseInt(cr.split('/')[1], 10);
    else {
      var cl = resp.getHeaders()['Content-Length'];
      if (cl) fileSize = parseInt(cl, 10);
    }
  } catch (e) {
    console.log('Size check failed: ' + e);
  }
  if (fileSize === null || fileSize === 0) return startChunkedDownload(lang, fileUrl, downloadTime);
  if (fileSize > SIZE_LIMIT) return startChunkedDownload(lang, fileUrl, downloadTime);
  return downloadCustomUrl(lang, fileUrl, downloadTime);
}

// ========== PART 4: Direct download (with timestamp) ==========
function downloadCustomUrl(lang, fileUrl, downloadTime) {
  try {
    var response = UrlFetchApp.fetch(fileUrl, { followRedirects: true });
    var blob = response.getBlob();
    var fileName = fileUrl.substring(fileUrl.lastIndexOf('/') + 1).split('?')[0];
    if (!fileName || fileName.length < 2) fileName = 'downloaded_file.bin';

    var parentFolder = DriveApp.getFolderById(DATA_SAVER_FOLDER_ID);
    var folderName = 'download_' + fileName + '_' + new Date().getTime();
    var downloadFolder = parentFolder.createFolder(folderName);

    var f = downloadFolder.createFile(blob);
    f.setName(fileName);
    var fileSizeBytes = blob.getBytes().length;
    var sizeKB = Math.round(fileSizeBytes / 1024);

    var infoText =
      'File URL: ' + fileUrl + '\n' +
      'File Name: ' + fileName + '\n' +
      'File Size: ' + (fileSizeBytes / (1024 * 1024)).toFixed(2) + ' MB\n' +
      'Download Type: Direct (no chunking)\n' +
      'Download Time: ' + downloadTime + '\n' +
      'Saved Folder: ' + downloadFolder.getUrl();
    downloadFolder.createFile('INFO.txt', infoText, MimeType.PLAIN_TEXT);

    var buttonHtml = getDriveLinkButton(downloadFolder.getUrl(), lang);
    return _(lang, 'directSuccessWithLink', { name: fileName, size: sizeKB, link: buttonHtml });
  } catch (e) {
    throw new Error(_(lang, 'downloadFailed') + e.toString());
  }
}

// ========== PART 5: Full scheduled chunked download (retryCounts added) ==========
function startChunkedDownload(lang, fileUrl, downloadTime) {
  var CHUNK_SIZE = 45 * 1024 * 1024;
  var parentFolder = DriveApp.getFolderById(DATA_SAVER_FOLDER_ID);
  var baseFileName = fileUrl.substring(fileUrl.lastIndexOf('/') + 1).split('?')[0];
  if (!baseFileName || baseFileName.length < 2) baseFileName = 'unknown_file';

  var totalSize = 0;
  try {
    var resp = UrlFetchApp.fetch(fileUrl, {
      headers: { 'Range': 'bytes=0-0' },
      muteHttpExceptions: true,
      followRedirects: true
    });
    var cr = resp.getHeaders()['Content-Range'];
    if (cr) totalSize = parseInt(cr.split('/')[1], 10);
    else {
      var cl = resp.getHeaders()['Content-Length'];
      if (cl) totalSize = parseInt(cl, 10);
    }
  } catch (e) { totalSize = 0; }

  var numChunks = totalSize > 0 ? Math.ceil(totalSize / CHUNK_SIZE) : '?';

  var chunkFolderName = 'chunk_' + baseFileName;
  var chunkFolder = parentFolder.createFolder(chunkFolderName);

  var infoText =
    'File URL: ' + fileUrl + '\n' +
    'File Name: ' + baseFileName + '\n' +
    'Total Size: ' + (totalSize > 0 ? (totalSize / (1024 * 1024)).toFixed(2) + ' MB' : 'Unknown') + '\n' +
    'Chunk Size: 45 MB\n' +
    'Number of Chunks: ' + numChunks + '\n' +
    'Download Time: ' + downloadTime + '\n' +
    'Chunks Folder: ' + chunkFolder.getUrl();
  chunkFolder.createFile('INFO.txt', infoText, MimeType.PLAIN_TEXT);

  var approxSecPerChunk = 10;
  var timeEst = numChunks === '?' ? 'unknown'
    : (function() { var mins = Math.ceil(numChunks * approxSecPerChunk / 60); return '~' + mins + ' minute' + (mins !== 1 ? 's' : ''); })();

  var state = {
    fileUrl: fileUrl, outputFolderId: DATA_SAVER_FOLDER_ID, baseFileName: baseFileName,
    nextStart: 0, chunkIndex: 0, totalSize: totalSize, CHUNK_SIZE: CHUNK_SIZE,
    chunkFolderId: chunkFolder.getId(),
    endByte: totalSize > 0 ? totalSize - 1 : undefined,
    firstChunkIndex: 0, rangeEndIndex: undefined, running: false, triggerId: null,
    retryCounts: {}   // NEW: track retries per chunkIndex
  };
  var stateKey = 'chunkState_' + baseFileName + '_full';
  PropertiesService.getScriptProperties().setProperty(stateKey, JSON.stringify(state));

  deleteOldChunkTriggers();
  var trigger = ScriptApp.newTrigger('processChunksContinuation')
    .timeBased().everyMinutes(1).create();
  state.triggerId = trigger.getUniqueId();
  PropertiesService.getScriptProperties().setProperty(stateKey, JSON.stringify(state));

  var buttonHtml = getDriveLinkButton(chunkFolder.getUrl(), lang);
  return _(lang, 'fullStart', { chunks: numChunks, time: timeEst, link: buttonHtml });
}


// ========== PART 6: Range scheduled download (retryCounts added) ==========
function startChunkRangeDownload(lang, fileUrl, startIndex, endIndex, downloadTime) {
  var CHUNK_SIZE = 45 * 1024 * 1024;
  var parentFolder = DriveApp.getFolderById(DATA_SAVER_FOLDER_ID);
  var baseFileName = fileUrl.substring(fileUrl.lastIndexOf('/') + 1).split('?')[0];
  if (!baseFileName || baseFileName.length < 2) baseFileName = 'unknown_file';

  var totalSize = 0;
  try {
    var resp = UrlFetchApp.fetch(fileUrl, {
      headers: { 'Range': 'bytes=0-0' },
      muteHttpExceptions: true,
      followRedirects: true
    });
    var cr = resp.getHeaders()['Content-Range'];
    totalSize = cr ? parseInt(cr.split('/')[1], 10) : parseInt(resp.getHeaders()['Content-Length'], 10);
  } catch (e) { totalSize = 0; }

  var chunkFolderName = 'chunk_' + baseFileName;
  var folders = parentFolder.getFoldersByName(chunkFolderName);
  var chunkFolder = folders.hasNext() ? folders.next() : parentFolder.createFolder(chunkFolderName);

  if (!folders.hasNext()) {
    var numChunksForInfo = Math.ceil((Math.min((endIndex * CHUNK_SIZE) + CHUNK_SIZE - 1, totalSize > 0 ? totalSize - 1 : Infinity) - startIndex * CHUNK_SIZE + 1) / CHUNK_SIZE);
    var infoText =
      'File URL: ' + fileUrl + '\n' +
      'File Name: ' + baseFileName + '\n' +
      'Total Size (if available): ' + (totalSize > 0 ? (totalSize / (1024 * 1024)).toFixed(2) + ' MB' : 'Unknown') + '\n' +
      'Chunk Size: 45 MB\n' +
      'Download Range: chunks ' + startIndex + ' to ' + endIndex + ' (' + numChunksForInfo + ' chunks in this batch)\n' +
      'First Index: ' + startIndex + '\n' +
      'Last Index: ' + endIndex + '\n' +
      'Download Time: ' + downloadTime + '\n' +
      'Chunks Folder: ' + chunkFolder.getUrl();
    chunkFolder.createFile('INFO.txt', infoText, MimeType.PLAIN_TEXT);
  }

  var startByte = startIndex * CHUNK_SIZE;
  var maxEndByte = totalSize > 0 ? totalSize - 1 : Infinity;
  var endByte = Math.min((endIndex * CHUNK_SIZE) + CHUNK_SIZE - 1, maxEndByte);

  if (startByte > endByte) {
    throw new Error(_(lang, 'rangeInvalid'));
  }

  var numChunks = Math.ceil((endByte - startByte + 1) / CHUNK_SIZE);
  var approxSecPerChunk = 10;
  var timeEst = (function() {
    var mins = Math.ceil(numChunks * approxSecPerChunk / 60);
    return '~' + mins + ' minute' + (mins !== 1 ? 's' : '');
  })();

  var state = {
    fileUrl: fileUrl, outputFolderId: DATA_SAVER_FOLDER_ID, baseFileName: baseFileName,
    nextStart: startByte, chunkIndex: startIndex, totalSize: totalSize, CHUNK_SIZE: CHUNK_SIZE,
    chunkFolderId: chunkFolder.getId(), endByte: endByte,
    firstChunkIndex: startIndex, rangeEndIndex: endIndex, running: false, triggerId: null,
    retryCounts: {}   // NEW
  };
  var stateKey = 'chunkState_' + baseFileName + '_range' + startIndex + 'to' + endIndex;
  PropertiesService.getScriptProperties().setProperty(stateKey, JSON.stringify(state));

  deleteOldChunkTriggers();
  var trigger = ScriptApp.newTrigger('processChunksContinuation')
    .timeBased().everyMinutes(1).create();
  state.triggerId = trigger.getUniqueId();
  PropertiesService.getScriptProperties().setProperty(stateKey, JSON.stringify(state));

  var buttonHtml = getDriveLinkButton(chunkFolder.getUrl(), lang);
  return _(lang, 'rangeStart', {
    first: startIndex,
    last: endIndex,
    count: numChunks,
    time: timeEst,
    link: buttonHtml
  });
}

function deleteOldChunkTriggers() {
  ScriptApp.getProjectTriggers()
    .filter(t => t.getHandlerFunction() === 'processChunksContinuation')
    .forEach(t => ScriptApp.deleteTrigger(t));
}

// ========== PART 7: Background chunk processor WITH RETRY ==========
function processChunksContinuation() {
  const props = PropertiesService.getScriptProperties();
  const keys = props.getKeys().filter(k => k.startsWith('chunkState_'));
  if (keys.length === 0) {
    deleteOldChunkTriggers();
    return;
  }

  const MAX_TIME = 4.5 * 60 * 1000;
  const startTime = Date.now();

  for (const key of keys) {
    let state;
    try {
      state = JSON.parse(props.getProperty(key));
    } catch (e) { continue; }
    if (!state || state.running) continue;

    state.running = true;
    props.setProperty(key, JSON.stringify(state));

    const { fileUrl, baseFileName, CHUNK_SIZE, chunkFolderId } = state;
    let { nextStart, chunkIndex, endByte, retryCounts } = state;
    const chunkFolder = DriveApp.getFolderById(chunkFolderId);

    while (nextStart <= endByte) {
      // Check if we already exceeded max retries for this chunk
      const currentRetries = retryCounts[chunkIndex] || 0;
      if (currentRetries >= MAX_CHUNK_RETRIES) {
        console.error(`❌ Chunk ${chunkIndex} failed after ${MAX_CHUNK_RETRIES} retries. Skipping.`);
        // Skip this chunk
        nextStart = Math.min(nextStart + CHUNK_SIZE - 1, endByte) + 1;
        chunkIndex++;
        delete retryCounts[(chunkIndex - 1)]; // clean up
        state.nextStart = nextStart;
        state.chunkIndex = chunkIndex;
        state.retryCounts = retryCounts;
        props.setProperty(key, JSON.stringify(state));
        continue;
      }

      const end = Math.min(nextStart + CHUNK_SIZE - 1, endByte);
      try {
        const resp = UrlFetchApp.fetch(fileUrl, {
          headers: { 'Range': `bytes=${nextStart}-${end}` },
          muteHttpExceptions: true,
          followRedirects: true
        });
        const blob = resp.getBlob();
        const padded = String(chunkIndex + 1).padStart(3, '0');
        const file = chunkFolder.createFile(blob);
        file.setName(baseFileName + '.' + padded);
        console.log(`✅ Saved chunk ${chunkIndex} → ${baseFileName}.${padded} (bytes ${nextStart}-${end})`);
        // Success: advance
        nextStart = end + 1;
        chunkIndex++;
        if (retryCounts[chunkIndex - 1]) delete retryCounts[chunkIndex - 1]; // clean
      } catch (e) {
        // Failure: increment retry count and keep same position
        if (!retryCounts) retryCounts = {};
        retryCounts[chunkIndex] = (retryCounts[chunkIndex] || 0) + 1;
        console.warn(`⚠️ Chunk ${chunkIndex} failed (attempt ${retryCounts[chunkIndex]}/${MAX_CHUNK_RETRIES}). Will retry. Error: ${e.toString()}`);
        state.nextStart = nextStart;   // keep position
        state.chunkIndex = chunkIndex;
        state.retryCounts = retryCounts;
        props.setProperty(key, JSON.stringify(state));
        state.running = false;
        props.setProperty(key, JSON.stringify(state)); // release lock
        return; // exit loop, next trigger will try again
      }

      // Update state after successful chunk
      state.nextStart = nextStart;
      state.chunkIndex = chunkIndex;
      state.retryCounts = retryCounts;
      props.setProperty(key, JSON.stringify(state));

      // Check time limit
      if (Date.now() - startTime > MAX_TIME) {
        state.running = false;
        props.setProperty(key, JSON.stringify(state));
        return;
      }
    }

    // All chunks in range done
    props.deleteProperty(key);
    console.log(`🎉 All chunks saved for ${baseFileName} (state ${key}).`);
  }

  // Clean up trigger if no states left
  if (props.getKeys().filter(k => k.startsWith('chunkState_')).length === 0) {
    deleteOldChunkTriggers();
  }
}
