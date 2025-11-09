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
    parents: ['appDataFolder'] // Хранить в скрытой папке
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

// Вызываем при инициализации
initGoogleDrive();

// Добавляем кнопку в интерфейс
const syncBtn = document.createElement('button');
syncBtn.className = 'btn';
syncBtn.innerHTML = '<i class="fas fa-sync-alt"></i> Синхронизировать';
syncBtn.onclick = syncBookmarksToDrive;
document.querySelector('#dzenMode .controls')?.appendChild(syncBtn);
