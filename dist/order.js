const input = document.querySelector('#documents');
const list = document.querySelector('#upload-list');
const status = document.querySelector('#upload-status');
let files = [];

function renderFiles() {
  list.replaceChildren();
  for (const [index, file] of files.entries()) {
    const row = document.createElement('li');
    const icon = document.createElement('span');
    icon.className = 'file-icon';
    icon.textContent = '▤';
    icon.setAttribute('aria-hidden', 'true');
    const info = document.createElement('span');
    info.className = 'file-info';
    const name = document.createElement('strong');
    name.textContent = file.name;
    const size = document.createElement('small');
    size.textContent = `${(file.size / 1024 / 1024).toFixed(2)} MB`;
    info.append(name, size);
    const remove = document.createElement('button');
    remove.type = 'button';
    remove.className = 'file-remove';
    remove.setAttribute('aria-label', `Elimină ${file.name}`);
    remove.textContent = '×';
    remove.addEventListener('click', () => {
      files.splice(index, 1);
      syncInput();
      renderFiles();
      status.textContent = 'Document eliminat.';
    });
    row.append(icon, info, remove);
    list.append(row);
  }
}

function syncInput() {
  const selection = new DataTransfer();
  files.forEach(file => selection.items.add(file));
  input.files = selection.files;
}

input.addEventListener('change', () => {
  const messages = [];
  for (const file of input.files) {
    if (!/\.(pdf|jpe?g|png)$/i.test(file.name) || file.size > 10 * 1024 * 1024 || file.size === 0) {
      messages.push(`${file.name}: acceptăm doar PDF, JPG sau PNG, până la 10 MB.`);
    } else if (files.some(item => item.name === file.name && item.size === file.size && item.lastModified === file.lastModified)) {
      messages.push(`${file.name} este deja adăugat.`);
    } else if (files.length >= 5) {
      messages.push('Poți selecta cel mult 5 fișiere.');
      break;
    } else {
      files.push(file);
    }
  }
  syncInput();
  renderFiles();
  status.textContent = messages.join(' ') || `${files.length} ${files.length === 1 ? 'document selectat' : 'documente selectate'}.`;
});
