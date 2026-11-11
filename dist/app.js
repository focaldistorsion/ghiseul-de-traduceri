const modal = document.querySelector('#about');
document.querySelector('#about-open').addEventListener('click', () => modal.showModal());
document.querySelector('#about-close').addEventListener('click', () => modal.close());
modal.addEventListener('click', event => { if (event.target === modal) modal.close(); });

const ticketNumber = document.querySelector('#ticket-number');
if (ticketNumber) ticketNumber.textContent = `nr. ${String(Math.floor(Math.random() * 9000) + 1000)}`;
