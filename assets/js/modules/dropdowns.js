(function () {
  const page = document.getElementById('page-dropdowns');
  if (!page) return;

  const setResult = (id, message) => {
    document.getElementById(id).innerHTML = `<span class="result-dot"></span><span>${message}</span>`;
  };
  const notify = message => window.QAOrbit && window.QAOrbit.toast(message);
  const resetSelect = (select, placeholder) => {
    select.value = '';
    if (placeholder) select.options[0].text = placeholder;
  };

  const language = document.getElementById('language-select');
  document.getElementById('submitLanguage').addEventListener('click', () => {
    const option = language.options[language.selectedIndex];
    setResult('languageResult', language.value ? `Selected: ${option.text} (value: ${language.value})` : 'Please select a programming language.');
  });
  document.getElementById('resetLanguage').addEventListener('click', () => {
    resetSelect(language);
    setResult('languageResult', 'Selection reset.');
  });

  const tools = document.getElementById('testing-tools');
  document.getElementById('submitTools').addEventListener('click', () => {
    const selected = [...tools.selectedOptions].map(option => option.text);
    setResult('toolsResult', selected.length ? `Selected ${selected.length}: ${selected.join(', ')}` : 'No testing tools selected.');
  });
  document.getElementById('clearTools').addEventListener('click', () => {
    [...tools.options].forEach(option => option.selected = false);
    setResult('toolsResult', 'All testing tool selections cleared.');
  });

  const setupCustomDropdown = ({ root, trigger, panel, options, resultId, defaultText, onSelect }) => {
    const open = () => { panel.hidden = false; trigger.setAttribute('aria-expanded', 'true'); };
    const close = () => { panel.hidden = true; trigger.setAttribute('aria-expanded', 'false'); };
    trigger.addEventListener('click', () => panel.hidden ? open() : close());
    options.forEach((option, index) => {
      option.tabIndex = -1;
      option.addEventListener('click', () => {
        trigger.childNodes[0].nodeValue = `${option.dataset.value} `;
        close();
        setResult(resultId, `Selected: ${option.dataset.value}`);
        onSelect?.(option.dataset.value);
      });
      option.addEventListener('keydown', event => {
        if (event.key === 'ArrowDown') { event.preventDefault(); options[(index + 1) % options.length].focus(); }
        if (event.key === 'ArrowUp') { event.preventDefault(); options[(index - 1 + options.length) % options.length].focus(); }
        if (event.key === 'Escape') { close(); trigger.focus(); }
      });
    });
    trigger.addEventListener('keydown', event => {
      if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') { event.preventDefault(); open(); options[0]?.focus(); }
      if (event.key === 'Escape') close();
    });
    return { close, reset: () => { trigger.childNodes[0].nodeValue = `${defaultText} `; setResult(resultId, 'Selection reset.'); } };
  };

  const osRoot = document.getElementById('osDropdown');
  const osDropdown = setupCustomDropdown({ root: osRoot, trigger: document.getElementById('osTrigger'), panel: document.getElementById('osList'), options: [...osRoot.querySelectorAll('[role="option"]')], resultId: 'osResult', defaultText: 'Choose an operating system' });
  document.getElementById('resetOs').addEventListener('click', osDropdown.reset);

  const countries = ['India', 'United States', 'United Kingdom', 'Canada', 'Australia', 'Germany', 'France', 'Japan', 'Singapore', 'Brazil', 'South Africa', 'New Zealand', 'Italy', 'Spain', 'Netherlands', 'Sweden', 'Switzerland', 'UAE', 'Saudi Arabia', 'Sri Lanka'];
  const countryRoot = document.getElementById('countryDropdown');
  const countryTrigger = document.getElementById('countryTrigger');
  const countryPanel = document.getElementById('countryPanel');
  const countrySearch = document.getElementById('countrySearch');
  const countryOptions = document.getElementById('countryOptions');
  const noResults = document.getElementById('countryNoResults');
  const renderCountries = filter => {
    const matching = countries.filter(country => country.toLowerCase().includes(filter.toLowerCase()));
    countryOptions.innerHTML = '';
    matching.forEach(country => {
      const option = document.createElement('li');
      option.setAttribute('role', 'option'); option.dataset.value = country; option.tabIndex = 0; option.textContent = country;
      option.addEventListener('click', () => selectCountry(country));
      option.addEventListener('keydown', event => { if (event.key === 'Enter') selectCountry(country); });
      countryOptions.append(option);
    });
    noResults.hidden = matching.length > 0;
  };
  const openCountry = () => { countryPanel.hidden = false; countryTrigger.setAttribute('aria-expanded', 'true'); countrySearch.focus(); };
  const closeCountry = () => { countryPanel.hidden = true; countryTrigger.setAttribute('aria-expanded', 'false'); };
  const selectCountry = country => { countryTrigger.childNodes[0].nodeValue = `${country} `; closeCountry(); setResult('countryResult', `Selected country: ${country}`); notify(`${country} selected.`); };
  countryTrigger.addEventListener('click', () => countryPanel.hidden ? openCountry() : closeCountry());
  countrySearch.addEventListener('input', () => renderCountries(countrySearch.value));
  countrySearch.addEventListener('keydown', event => { if (event.key === 'Escape') { closeCountry(); countryTrigger.focus(); } });
  document.getElementById('clearCountry').addEventListener('click', () => { countrySearch.value = ''; renderCountries(''); countryTrigger.childNodes[0].nodeValue = 'Search or choose a country '; setResult('countryResult', 'Country selection cleared.'); closeCountry(); });
  renderCountries('');

  const hoverMenu = document.getElementById('hoverMenu');
  const hoverTrigger = document.getElementById('hoverTrigger');
  const setHoverOpen = isOpen => { hoverMenu.classList.toggle('open', isOpen); hoverTrigger.setAttribute('aria-expanded', String(isOpen)); };
  hoverMenu.addEventListener('mouseenter', () => setHoverOpen(true));
  hoverMenu.addEventListener('mouseleave', () => setHoverOpen(false));
  hoverMenu.addEventListener('focusin', () => setHoverOpen(true));
  hoverMenu.addEventListener('focusout', event => { if (!hoverMenu.contains(event.relatedTarget)) setHoverOpen(false); });
  hoverTrigger.addEventListener('click', () => setHoverOpen(!hoverMenu.classList.contains('open')));
  hoverMenu.querySelectorAll('[role="menuitem"]').forEach(item => item.addEventListener('click', () => { setResult('hoverResult', `Selected menu item: ${item.textContent}`); setHoverOpen(false); notify(`${item.textContent} selected.`); }));

  const environment = document.getElementById('environment-select');
  document.getElementById('submitEnvironment').addEventListener('click', () => setResult('environmentResult', environment.value ? `Environment selected: ${environment.options[environment.selectedIndex].text}` : 'Please choose an available environment.'));

  const locations = {
    india: { label: 'India', states: { 'tamil-nadu': { label: 'Tamil Nadu', cities: ['Chennai', 'Coimbatore', 'Madurai', 'Trichy'] }, karnataka: { label: 'Karnataka', cities: ['Bengaluru', 'Mysuru', 'Mangaluru'] }, kerala: { label: 'Kerala', cities: ['Kochi', 'Trivandrum', 'Kozhikode'] } } },
    'united-states': { label: 'United States', states: { california: { label: 'California', cities: ['Los Angeles', 'San Francisco', 'San Diego'] }, texas: { label: 'Texas', cities: ['Houston', 'Austin', 'Dallas'] }, 'new-york': { label: 'New York', cities: ['New York City', 'Buffalo', 'Albany'] } } },
    australia: { label: 'Australia', states: { 'new-south-wales': { label: 'New South Wales', cities: ['Sydney', 'Newcastle'] }, victoria: { label: 'Victoria', cities: ['Melbourne', 'Geelong'] }, queensland: { label: 'Queensland', cities: ['Brisbane', 'Gold Coast'] } } }
  };
  const locationCountry = document.getElementById('location-country'); const locationState = document.getElementById('location-state'); const locationCity = document.getElementById('location-city');
  const fillOptions = (select, placeholder, entries) => { select.innerHTML = `<option value="">${placeholder}</option>`; entries.forEach(([value, label]) => select.add(new Option(label, value))); };
  const locationMessage = () => { const country = locationCountry.options[locationCountry.selectedIndex].text; const state = locationState.options[locationState.selectedIndex].text; const city = locationCity.options[locationCity.selectedIndex].text; setResult('locationResult', locationCity.value ? `Selected: ${country} → ${state} → ${city}` : 'Choose a country, then a state and city.'); };
  locationCountry.addEventListener('change', () => { const data = locations[locationCountry.value]; fillOptions(locationState, data ? 'Select state' : 'Select a country first', data ? Object.entries(data.states).map(([key, value]) => [key, value.label]) : []); fillOptions(locationCity, 'Select a state first', []); locationState.disabled = !data; locationCity.disabled = true; locationMessage(); });
  locationState.addEventListener('change', () => { const state = locations[locationCountry.value]?.states[locationState.value]; fillOptions(locationCity, state ? 'Select city' : 'Select a state first', state ? state.cities.map(city => [city.toLowerCase().replaceAll(' ', '-'), city]) : []); locationCity.disabled = !state; locationMessage(); });
  locationCity.addEventListener('change', locationMessage);

  const dynamic = document.getElementById('dynamic-dropdown');
  const generatedId = `practice-level-${Math.floor(10000 + Math.random() * 90000)}`;
  dynamic.id = generatedId;
  document.querySelector('label[for="dynamic-dropdown"]').htmlFor = generatedId;
  document.getElementById('dynamicDropdownId').textContent = generatedId;
  dynamic.addEventListener('change', () => setResult('dynamicResult', dynamic.value ? `Selected practice level: ${dynamic.options[dynamic.selectedIndex].text}` : 'Select a practice level.'));

  document.addEventListener('click', event => { if (!osRoot.contains(event.target)) osDropdown.close(); if (!countryRoot.contains(event.target)) closeCountry(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape') { osDropdown.close(); closeCountry(); setHoverOpen(false); } });
})();
