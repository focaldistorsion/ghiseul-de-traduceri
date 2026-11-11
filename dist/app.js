const modal = document.querySelector('#about');
document.querySelector('#about-open').addEventListener('click', () => modal.showModal());
document.querySelector('#about-close').addEventListener('click', () => modal.close());
modal.addEventListener('click', event => { if (event.target === modal) modal.close(); });
