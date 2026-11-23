function showButtonMessage(message) {
  const result = document.getElementById('buttonResult');
  result.innerHTML = `<span class="result-dot"></span><span>${message}</span>`;
  if (window.QAOrbit) QAOrbit.toast(message);
}
