(function () {
  const page = document.getElementById('page-tables');
  if (!page) return;

  const setResult = (id, message) => {
    document.getElementById(id).innerHTML = `<span class="result-dot"></span><span>${message}</span>`;
  };

  page.querySelectorAll('.employee-view').forEach(button => button.addEventListener('click', () => {
    const employee = button.dataset.employee;
    setResult('employeeResult', `Viewing the profile for ${employee} (demo).`);
    window.QAOrbit?.toast(`${employee} selected.`);
  }));

  const projects = [
    { name: 'Checkout regression', tests: 148, coverage: 92, owner: 'Anika' },
    { name: 'Customer portal', tests: 96, coverage: 84, owner: 'Vikram' },
    { name: 'Mobile API suite', tests: 121, coverage: 89, owner: 'Nisha' },
    { name: 'Reports smoke tests', tests: 58, coverage: 76, owner: 'Dev' }
  ];
  const projectBody = document.querySelector('#project-table tbody');
  let projectSort = { key: 'name', direction: 'asc' };
  const renderProjects = () => {
    const { key, direction } = projectSort;
    const ordered = [...projects].sort((a, b) => {
      const left = a[key]; const right = b[key];
      return (typeof left === 'string' ? left.localeCompare(right) : left - right) * (direction === 'asc' ? 1 : -1);
    });
    projectBody.innerHTML = ordered.map(project => `<tr><td>${project.name}</td><td>${project.tests}</td><td>${project.coverage}%</td><td>${project.owner}</td></tr>`).join('');
    page.querySelectorAll('.sort-button').forEach(button => {
      const active = button.dataset.sort === key;
      button.setAttribute('aria-sort', active ? (direction === 'asc' ? 'ascending' : 'descending') : 'none');
    });
  };
  page.querySelectorAll('.sort-button').forEach(button => button.addEventListener('click', () => {
    const key = button.dataset.sort;
    projectSort = { key, direction: projectSort.key === key && projectSort.direction === 'asc' ? 'desc' : 'asc' };
    renderProjects();
    setResult('projectResult', `Projects sorted by ${key} in ${projectSort.direction === 'asc' ? 'ascending' : 'descending'} order.`);
  }));
  renderProjects();

  const filter = document.getElementById('order-filter');
  const orderRows = [...document.querySelectorAll('#orders-table tbody tr')];
  const empty = document.getElementById('ordersEmpty');
  filter.addEventListener('input', () => {
    const term = filter.value.trim().toLowerCase(); let visible = 0;
    orderRows.forEach(row => {
      const matches = row.textContent.toLowerCase().includes(term);
      row.hidden = !matches;
      if (matches) visible += 1;
    });
    empty.hidden = visible > 0;
  });

  const runPages = [
    [ ['RUN-001', 'Login smoke', 'Passed', '24s'], ['RUN-002', 'Cart suite', 'Passed', '1m 12s'], ['RUN-003', 'Payments', 'Failed', '48s'] ],
    [ ['RUN-004', 'Accessibility', 'Passed', '39s'], ['RUN-005', 'Profile suite', 'Passed', '1m 04s'], ['RUN-006', 'API contract', 'Skipped', '0s'] ]
  ];
  const runBody = document.querySelector('#runs-table tbody');
  const previous = document.getElementById('previousRuns');
  const next = document.getElementById('nextRuns');
  const pageLabel = document.getElementById('runsPage');
  let activeRunPage = 0;
  const renderRuns = () => {
    runBody.innerHTML = runPages[activeRunPage].map(run => `<tr><td>${run[0]}</td><td>${run[1]}</td><td>${run[2]}</td><td>${run[3]}</td></tr>`).join('');
    pageLabel.textContent = `Page ${activeRunPage + 1} of ${runPages.length}`;
    previous.disabled = activeRunPage === 0;
    next.disabled = activeRunPage === runPages.length - 1;
  };
  previous.addEventListener('click', () => { if (activeRunPage > 0) { activeRunPage -= 1; renderRuns(); } });
  next.addEventListener('click', () => { if (activeRunPage < runPages.length - 1) { activeRunPage += 1; renderRuns(); } });
  renderRuns();

  // This table intentionally has no stable positional structure. Both collections
  // are shuffled once per page load to encourage content-based row scoping.
  const inventory = [
    { product: 'Apple', category: 'Fruit', stock: 48, supplier: 'Orchard Lane' },
    { product: 'Banana', category: 'Fruit', stock: 72, supplier: 'Tropic Trade' },
    { product: 'Carrot', category: 'Vegetable', stock: 35, supplier: 'Green Fields' },
    { product: 'Dates', category: 'Pantry', stock: 19, supplier: 'Desert Harvest' },
    { product: 'Eggplant', category: 'Vegetable', stock: 27, supplier: 'Farm Basket' },
    { product: 'Fig', category: 'Fruit', stock: 14, supplier: 'Orchard Lane' },
    { product: 'Ginger', category: 'Spice', stock: 41, supplier: 'Root & Co.' },
    { product: 'Honey', category: 'Pantry', stock: 22, supplier: 'Golden Hive' },
    { product: 'Iceberg Lettuce', category: 'Vegetable', stock: 30, supplier: 'Green Fields' },
    { product: 'Jasmine Rice', category: 'Pantry', stock: 56, supplier: 'Grain House' }
  ];
  const randomize = values => [...values].sort(() => Math.random() - 0.5);
  const columnDefinitions = [
    { key: 'product', label: 'Product' },
    { key: 'category', label: 'Category' },
    { key: 'stock', label: 'Stock' },
    { key: 'supplier', label: 'Supplier' }
  ];
  const randomizedColumns = randomize(columnDefinitions);
  const inventoryTable = document.getElementById('random-inventory-table');
  inventoryTable.querySelector('thead').innerHTML = `<tr>${randomizedColumns.map(column => `<th scope="col">${column.label}</th>`).join('')}<th scope="col">Action</th></tr>`;
  inventoryTable.querySelector('tbody').innerHTML = randomize(inventory).map(item => {
    const cells = randomizedColumns.map(column => `<td data-column="${column.key}">${item[column.key]}</td>`).join('');
    return `<tr data-product="${item.product}">${cells}<td><button class="secondary-btn inventory-inspect" aria-label="Inspect ${item.product}" data-product="${item.product}">Inspect</button></td></tr>`;
  }).join('');
  inventoryTable.querySelectorAll('.inventory-inspect').forEach(button => button.addEventListener('click', () => {
    const item = inventory.find(record => record.product === button.dataset.product);
    setResult('inventoryResult', `${item.product}: ${item.category} · ${item.stock} in stock · supplied by ${item.supplier}.`);
    window.QAOrbit?.toast(`${item.product} inspected.`);
  }));
})();
