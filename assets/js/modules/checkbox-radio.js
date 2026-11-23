(function () {
  const showButton = document.getElementById('showSelections');
  const clearButton = document.getElementById('clearSelections');
  const result = document.getElementById('selectionResult');
  showButton.addEventListener('click', () => {
    const skills = [...document.querySelectorAll('input[name="skills"]:checked')].map(el => el.value);
    const experience = document.querySelector('input[name="experience"]:checked')?.value || 'Not selected';
    const formats = [...document.querySelectorAll('input[name="format"]:checked')].map(el => el.value);
    const message = `Skills: ${skills.length ? skills.join(', ') : 'None'} | Experience: ${experience} | Learning format: ${formats.length ? formats.join(', ') : 'None'}`;
    result.innerHTML = `<span class="result-dot"></span><span>${message}</span>`;
    QAOrbit.toast('Selection summary updated.');
  });
  clearButton.addEventListener('click', () => {
    document.querySelectorAll('#page-checks input[type="checkbox"], #page-checks input[type="radio"]').forEach(el => el.checked = false);
    result.innerHTML = '<span class="result-dot"></span><span>Selections cleared.</span>';
  });
})();
