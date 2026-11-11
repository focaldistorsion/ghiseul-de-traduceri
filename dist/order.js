const rows = document.querySelector('#file-rows');
const addFile = document.querySelector('#add-file');
const status = document.querySelector('#upload-status');
let nextId = 2;

function updateRows() {
  const entries = [...rows.querySelectorAll('.file-row')];
  entries.forEach((row, index) => {
    row.querySelector('.file-title').textContent = `Fișierul ${index + 1}`;
    const remove = row.querySelector('.remove-file');
    if (remove) remove.setAttribute('aria-label', `Elimină fișierul ${index + 1}`);
  });
  addFile.disabled = entries.length >= 5;
}

rows.addEventListener('change', event => {
  const input = event.target;
  if (input.type !== 'file' || !input.files.length) return;
  const file = input.files[0];
  if (!/\.(pdf|jpe?g|png)$/i.test(file.name) || !file.size || file.size > 10 * 1024 * 1024) {
    input.value = '';
    input.closest('.file-row').querySelector('.file-name').textContent = 'Niciun fișier selectat';
    status.textContent = 'Selectează un fișier PDF, JPG sau PNG de maximum 10 MB.';
  } else {
    input.closest('.file-row').querySelector('.file-name').textContent = file.name;
    status.textContent = '';
  }
});

addFile.addEventListener('click', () => {
  if (rows.children.length >= 5) return;
  const row = document.createElement('div');
  row.className = 'file-row';
  const title = document.createElement('span');
  title.className = 'file-title';
  const label = document.createElement('label');
  label.className = 'choose-file';
  label.textContent = 'Încarcă fișier';
  const input = document.createElement('input');
  input.id = `document-${nextId++}`;
  input.type = 'file';
  input.className = 'file-picker';
  input.name = 'documents';
  input.accept = '.pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png';
  input.setAttribute('aria-describedby', 'file-help upload-status');
  label.htmlFor = input.id;
  const remove = document.createElement('button');
  remove.type = 'button';
  remove.className = 'remove-file';
  remove.textContent = 'Elimină';
  remove.addEventListener('click', () => { row.remove(); updateRows(); status.textContent = 'Câmp eliminat.'; });
  const filename = document.createElement('span');
  filename.className = 'file-name';
  filename.textContent = 'Niciun fișier selectat';
  row.append(title, label, input, filename, remove);
  rows.append(row);
  updateRows();
  input.focus();
});
updateRows();
