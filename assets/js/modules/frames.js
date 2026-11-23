(function () {
  const page = document.getElementById('page-frames');
  if (!page) return;

  const frameStyle = `<style>body{margin:0;padding:15px;background:#0d1526;color:#eaf0fc;font:12px 'DM Sans',Arial,sans-serif}h3{margin:0 0 10px;font-size:14px;color:#dce8ff}p{color:#9cacc4;line-height:1.5}label{display:block;margin:10px 0 5px;color:#c9d7eb;font-weight:600}input,textarea{box-sizing:border-box;width:100%;background:#091224;border:1px solid #2a3852;border-radius:6px;color:#eaf0fc;padding:8px;font:inherit}button{margin-top:10px;background:#3976e8;color:#fff;border:0;border-radius:7px;padding:8px 11px;font:600 11px 'DM Sans',Arial,sans-serif;cursor:pointer}.result{margin-top:10px;padding:8px;border:1px dashed #365078;border-radius:7px;color:#9eb2cd;font-size:11px}</style>`;
  const writeFrame = (iframe, markup) => {
    const document = iframe.contentDocument;
    document.open(); document.write(`<!doctype html><html><head>${frameStyle}</head><body>${markup}</body></html>`); document.close();
    return document;
  };

  const basic = document.getElementById('basic-frame');
  const basicDocument = writeFrame(basic, `<h3>Basic frame form</h3><p>This content belongs to the Basic iframe document.</p><label for="frame-name">Name</label><input id="frame-name" name="name" type="text" placeholder="Enter your name"><button type="button" id="frame-submit">Submit</button><div id="frame-result" class="result" role="status">Waiting for input.</div>`);
  basicDocument.getElementById('frame-submit').addEventListener('click', () => {
    const name = basicDocument.getElementById('frame-name').value.trim();
    basicDocument.getElementById('frame-result').textContent = name ? `Submitted: ${name}` : 'Enter a name before submitting.';
  });

  const login = document.getElementById('login-frame');
  const loginDocument = writeFrame(login, `<h3>Login frame</h3><label for="login-username">Username</label><input id="login-username" name="username" placeholder="qa_learner"><label for="login-password">Password</label><input id="login-password" type="password" name="password"><button id="login-submit" type="button">Submit</button><div class="result" id="login-result" role="status">Login not submitted.</div>`);
  loginDocument.getElementById('login-submit').addEventListener('click', () => { loginDocument.getElementById('login-result').textContent = 'Login form submitted.'; });

  const feedback = document.getElementById('feedback-frame');
  const feedbackDocument = writeFrame(feedback, `<h3>Feedback frame</h3><label for="feedback-text">Feedback</label><textarea id="feedback-text" name="feedback" rows="3" placeholder="Share feedback"></textarea><button id="feedback-submit" type="button">Submit</button><div class="result" id="feedback-result" role="status">Feedback not submitted.</div>`);
  feedbackDocument.getElementById('feedback-submit').addEventListener('click', () => { feedbackDocument.getElementById('feedback-result').textContent = 'Feedback submitted.'; });

  const parent = document.getElementById('parent-frame');
  const parentDocument = writeFrame(parent, `<h3>Parent frame</h3><p id="parent-note">This text is inside the parent frame.</p><iframe id="child-frame" name="childPracticeFrame" title="Child iframe practice" style="width:100%;height:125px;border:1px solid #365078;border-radius:7px;background:#0d1526"></iframe>`);
  const child = parentDocument.getElementById('child-frame');
  const childDocument = writeFrame(child, `<h3>Child frame</h3><label for="secret-code">Secret code</label><input id="secret-code" name="secretCode" placeholder="orbit-42"><button id="verify-code" type="button">Verify</button><div id="child-result" class="result" role="status">Code not verified.</div>`);
  childDocument.getElementById('verify-code').addEventListener('click', () => {
    const code = childDocument.getElementById('secret-code').value;
    childDocument.getElementById('child-result').textContent = code ? `Verified: ${code}` : 'Enter a secret code first.';
  });

  const host = document.getElementById('dynamicFrameHost');
  const status = document.getElementById('dynamicFrameStatus');
  let dynamicVersion = 0;
  const populateDynamic = iframe => {
    dynamicVersion += 1;
    const dynamicDocument = writeFrame(iframe, `<h3>Dynamic frame</h3><p data-testid="frame-version">Version ${dynamicVersion}</p><label for="dynamic-note">Dynamic note</label><input id="dynamic-note" name="dynamicNote" placeholder="Write a note"><button id="refresh-frame-content" type="button">Refresh content</button><div id="dynamic-result" class="result" role="status">Dynamic frame ready.</div>`);
    dynamicDocument.getElementById('refresh-frame-content').addEventListener('click', () => {
      populateDynamic(iframe);
      status.textContent = `Frame content updated to version ${dynamicVersion}.`;
    });
  };
  document.getElementById('createDynamicFrame').addEventListener('click', () => {
    let iframe = document.getElementById('dynamic-frame');
    if (!iframe) {
      iframe = document.createElement('iframe');
      iframe.id = 'dynamic-frame'; iframe.name = 'dynamicPracticeFrame'; iframe.title = 'Dynamic iframe practice'; iframe.className = 'practice-frame';
      host.append(iframe);
    }
    populateDynamic(iframe);
    status.textContent = `Dynamic frame loaded: version ${dynamicVersion}.`;
    window.QAOrbit?.toast('Dynamic frame loaded.');
  });

  page.querySelectorAll('.frame-challenge-trigger').forEach(button => button.addEventListener('click', () => {
    const target = document.getElementById(button.dataset.frameTarget);
    if (target?.id === 'createDynamicFrame') target.click();
    else target?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }));
})();
