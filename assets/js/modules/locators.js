function showLocatorMessage(message) {
  const result = document.getElementById('locatorResult');
  result.innerHTML = `<span class="result-dot"></span><span>${message}</span>`;
  if (window.QAOrbit) QAOrbit.toast(message);
}
