(function () {
  const pages = document.querySelectorAll('.page');
  const navItems = document.querySelectorAll('.nav-item[data-page]');
  const crumb = document.getElementById('currentCrumb');
  const sidebar = document.getElementById('sidebar');
  const toast = document.getElementById('toast');
  let toastTimer;
  const pageNames = {home:'Dashboard',inputs:'Input Fields',buttons:'Buttons',checks:'Checkbox & Radio',locators:'Locator Playground',dropdowns:'Dropdowns',tables:'Web Tables',dialogs:'Dialogs & Alerts',frames:'Frames',dynamic:'Dynamic Elements'};

  window.QAOrbit = {
    navigate(page) {
      if (!pageNames[page]) return;
      pages.forEach(p => p.classList.toggle('active', p.id === `page-${page}`));
      navItems.forEach(item => item.classList.toggle('active', item.dataset.page === page));
      crumb.textContent = pageNames[page];
      sidebar.classList.remove('open');
      window.scrollTo({top:0, behavior:'smooth'});
    },
    toast(message) {
      toast.textContent = message;
      toast.classList.add('show');
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
    }
  };

  navItems.forEach(item => item.addEventListener('click', () => QAOrbit.navigate(item.dataset.page)));
  document.querySelectorAll('[data-go]').forEach(item => item.addEventListener('click', () => QAOrbit.navigate(item.dataset.go)));
  document.getElementById('mobileMenu').addEventListener('click', () => sidebar.classList.toggle('open'));

  const randomDigits = () => Math.floor(10000 + Math.random() * 90000);
  document.getElementById('qa-dynamic').id = `password-field-${randomDigits()}`;
  const userField = document.getElementById('loc-user'); userField.id = `user-field-${randomDigits()}`;
  const orderField = document.getElementById('loc-order'); orderField.id = `customer-order-${randomDigits()}`;
  const submitField = document.getElementById('loc-end'); submitField.id = `reference-${randomDigits()}-submit`;
  const dynamicButton = document.getElementById('dynamic-button'); dynamicButton.id = `action-button-${randomDigits()}`;

  document.getElementById('practiceForm').addEventListener('submit', event => {
    event.preventDefault();
    const user = document.getElementById('qa-username').value.trim();
    const email = document.getElementById('qa-email').value.trim();
    const status = document.getElementById('formStatus');
    if (!user) { status.textContent = 'Username is required.'; status.className = 'form-status error'; return; }
    status.textContent = `Form submitted for ${user}${email ? ` (${email})` : ''}.`; status.className = 'form-status success';
    QAOrbit.toast('Form submitted successfully (demo).');
  });

  document.querySelectorAll('.product-add').forEach(button => button.addEventListener('click', () => {
    showLocatorMessage(`${button.dataset.product} added to cart (demo).`);
  }));
})();
