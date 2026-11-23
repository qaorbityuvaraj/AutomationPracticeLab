(function () {
  const page = document.getElementById('page-dialogs');
  if (!page) return;

  const setResult = (id, message) => {
    document.getElementById(id).innerHTML = `<span class="result-dot"></span><span>${message}</span>`;
  };
  const notify = message => window.QAOrbit?.toast(message);

  const triggerAlert = () => {
    alert('QAOrbit alert: your browser dialog was triggered.');
    setResult('alertResult', 'Success: the alert was accepted and page interaction resumed.');
    notify('Alert handled.');
  };
  const triggerConfirm = () => {
    const accepted = confirm('QAOrbit confirmation: do you want to continue?');
    setResult('confirmResult', accepted ? 'Confirmation accepted: confirm() returned true.' : 'Confirmation dismissed: confirm() returned false.');
    notify(accepted ? 'Confirmation accepted.' : 'Confirmation dismissed.');
  };
  const triggerPrompt = () => {
    const response = prompt('QAOrbit prompt: enter your learner name.', '');
    setResult('promptResult', response === null ? 'Prompt dismissed: prompt() returned null.' : `Prompt accepted: you entered “${response || '(empty value)'}”.`);
    notify(response === null ? 'Prompt dismissed.' : 'Prompt accepted.');
  };
  const triggerDelayed = () => {
    setResult('delayedResult', 'Waiting briefly for the browser dialog…');
    window.setTimeout(() => {
      alert('QAOrbit delayed alert: this dialog opened after a short delay.');
      setResult('delayedResult', 'Success: the delayed alert was accepted.');
      notify('Delayed alert handled.');
    }, 900);
  };

  document.getElementById('triggerAlert').addEventListener('click', triggerAlert);
  document.getElementById('triggerConfirm').addEventListener('click', triggerConfirm);
  document.getElementById('triggerPrompt').addEventListener('click', triggerPrompt);
  document.getElementById('triggerDelayedDialog').addEventListener('click', triggerDelayed);
  page.querySelectorAll('.dialog-challenge-trigger').forEach(button => button.addEventListener('click', () => {
    const challenge = button.dataset.challenge;
    if (challenge === 'alert') triggerAlert();
    if (challenge === 'confirm') triggerConfirm();
    if (challenge === 'prompt') triggerPrompt();
    if (challenge === 'delayed') triggerDelayed();
  }));
})();
