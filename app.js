document.getElementById('bookmarkForm').addEventListener('submit', addBookmark);

function addBookmark(e) {
  e.preventDefault();

  const siteName = document.getElementById('siteName').value;
  const siteUrl = document.getElementById('siteUrl').value;

  if (!validateUrl(siteUrl)) {
    showErrorMessage('Please enter a valid URL (e.g., https://example.com)');
    return;
  }

  const bookmark = {
    name: siteName,
    url: siteUrl
  };

  addBookmarkToTable(bookmark);
  clearFormFields();
}

function validateUrl(url) {
  const urlPattern = /^https?:\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/;
  return urlPattern.test(url);
}

function addBookmarkToTable(bookmark) {
  const table = document.getElementById('bookmarksTable');
  const bookmarksList = document.getElementById('bookmarksList');

  const row = document.createElement('tr');
  const nameCell = document.createElement('td');
  const urlCell = document.createElement('td');
  const actionCell = document.createElement('td');
  const deleteButton = document.createElement('button');
  const visitButton = document.createElement('button');

  nameCell.textContent = bookmark.name;
  urlCell.innerHTML = `<a href="${bookmark.url}" target="_blank">${bookmark.url}</a>`;
  deleteButton.textContent = 'Delete';
  visitButton.textContent = 'Visit';

  deleteButton.addEventListener('click', function () {
    row.remove();
  });

  visitButton.addEventListener('click', function () {
    window.open(bookmark.url, '_blank');
  });

  actionCell.appendChild(deleteButton);
  actionCell.appendChild(visitButton);

  row.appendChild(nameCell);
  row.appendChild(urlCell);
  row.appendChild(actionCell);

  bookmarksList.appendChild(row);
}

function clearFormFields() {
  document.getElementById('siteName').value = '';
  document.getElementById('siteUrl').value = '';
}

function showErrorMessage(message) {
  const formContainer = document.querySelector('.form-container');
  const errorMessage = document.createElement('p');
  errorMessage.classList.add('error-message');
  errorMessage.textContent = message;
  formContainer.appendChild(errorMessage);
}