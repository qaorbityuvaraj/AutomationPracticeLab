(function () {
  const page = document.getElementById('page-dynamic');
  if (!page) return;

  // -----------------------------
  // Shared helpers
  // -----------------------------
  const setResult = (id, message) => {
    const result = document.getElementById(id);
    if (!result) return;

    result.replaceChildren();

    const dot = document.createElement('span');
    dot.className = 'result-dot';

    const text = document.createElement('span');
    text.textContent = message;

    result.append(dot, text);
  };

  const randomDigits = () =>
    Math.floor(10000 + Math.random() * 90000);

  // -----------------------------
  // Section 1: Random IDs
  // -----------------------------
  const dynamicInput = document.getElementById('dynamic-practice-input');
  const dynamicButton = document.getElementById('dynamicIdAction');

  const inputId = `dynamic-input-${randomDigits()}`;
  const buttonId = `dynamic-action-${randomDigits()}`;

  if (dynamicInput && dynamicButton) {
    dynamicInput.id = inputId;

    const label = document.querySelector(
      'label[for="dynamic-practice-input"]'
    );

    if (label) {
      label.htmlFor = inputId;
    }

    dynamicButton.id = buttonId;

    const inputIdDisplay = document.getElementById('dynamicInputId');
    const buttonIdDisplay = document.getElementById('dynamicButtonId');

    if (inputIdDisplay) inputIdDisplay.textContent = inputId;
    if (buttonIdDisplay) buttonIdDisplay.textContent = buttonId;

    dynamicButton.addEventListener('click', () => {
      const value = dynamicInput.value.trim();

      setResult(
        'dynamicIdResult',
        value
          ? `Action completed with "${value}".`
          : 'Enter a value using a stable locator first.'
      );
    });
  }

  // -----------------------------
  // Section 2: Hidden element
  // -----------------------------
  const revealed = document.getElementById('revealedElement');
  const revealButton = document.getElementById('revealElement');

  if (revealed && revealButton) {
    revealButton.addEventListener('click', () => {
      revealed.hidden = false;
    });
  }

  // -----------------------------
  // Section 3: Delayed element
  // -----------------------------
  const loadDelayedButton = document.getElementById(
    'loadDelayedElement'
  );

  if (loadDelayedButton) {
    loadDelayedButton.addEventListener('click', () => {
      const host = document.getElementById('delayedElementHost');
      if (!host) return;

      host.textContent = 'Loading a delayed element...';

      window.setTimeout(() => {
        const target = document.createElement('div');
        target.className = 'dynamic-target';
        target.dataset.testid = 'delayed-element';
        target.textContent = 'Delayed element is now visible.';

        host.replaceChildren(target);
      }, 850);
    });
  }

  // -----------------------------
  // Section 4: Disappearing elements
  // -----------------------------
  const hideNotificationButton = document.getElementById(
    'hideNotification'
  );

  const removeElementButton = document.getElementById(
    'removeElement'
  );

  if (hideNotificationButton) {
    hideNotificationButton.addEventListener('click', () => {
      const notification = document.getElementById(
        'temporaryNotification'
      );

      if (notification) {
        notification.hidden = true;
      }
    });
  }

  if (removeElementButton) {
    removeElementButton.addEventListener('click', () => {
      const removable = document.getElementById(
        'removableElement'
      );

      if (removable) {
        removable.remove();
      }
    });
  }

  const restoreDisappearingButton = document.getElementById(
    'restoreDisappearing'
  );

  if (restoreDisappearingButton) {
    restoreDisappearingButton.addEventListener('click', () => {
      let notification = document.getElementById(
        'temporaryNotification'
      );

      // Restore the notification if it was removed.
      if (!notification) {
        notification = document.createElement('div');
        notification.id = 'temporaryNotification';
        notification.className = 'dynamic-notice';
        notification.setAttribute('role', 'status');
        notification.textContent =
          'Temporary notification: I will disappear.';

        hideNotificationButton?.before(notification);
      }

      notification.hidden = false;

      // Restore the removable element if it was removed.
      if (!document.getElementById('removableElement')) {
        const removable = document.createElement('div');

        removable.id = 'removableElement';
        removable.className = 'dynamic-notice detachable';
        removable.textContent =
          'Removable element: I will detach from the DOM.';

        notification.after(removable);
      }
    });
  }

  // -----------------------------
  // Section 5: Changing status
  // -----------------------------
  const processStatus = document.getElementById('processStatus');
  const startProcessButton = document.getElementById('startProcess');

  if (processStatus && startProcessButton) {
    startProcessButton.addEventListener('click', () => {
      processStatus.textContent = 'Processing';

      window.setTimeout(() => {
        processStatus.textContent = 'Completed';
      }, 800);
    });
  }

  // -----------------------------
  // Section 6: Dynamic counter
  // -----------------------------
  let counter = 0;

  const increaseCounterButton = document.getElementById(
    'increaseCounter'
  );

  if (increaseCounterButton) {
    increaseCounterButton.addEventListener('click', () => {
      counter += 1;

      const counterDisplay = document.getElementById(
        'dynamicCounter'
      );

      if (counterDisplay) {
        counterDisplay.textContent = counter;
      }
    });
  }

  // -----------------------------
  // Section 7: DOM replacement
  // -----------------------------
  const replacementHost = document.getElementById(
    'replacementHost'
  );

  let replacementVersion = 1;

  const replaceCard = () => {
    if (!replacementHost) return;

    replacementVersion += 1;

    const card = document.createElement('div');
    card.className = 'replacement-card';
    card.dataset.testid = 'replacement-card';

    const heading = document.createElement('strong');
    heading.textContent = `Version ${replacementVersion}`;

    const description = document.createElement('span');
    description.textContent = 'Replacement DOM node';

    const button = document.createElement('button');
    button.className = 'secondary-btn replace-card';
    button.type = 'button';
    button.textContent = 'Replace Card';

    card.append(heading, description, button);

    replacementHost.replaceChildren(card);

    button.addEventListener('click', replaceCard);
  };

  if (replacementHost) {
    const initialReplaceButton = replacementHost.querySelector(
      '.replace-card'
    );

    if (initialReplaceButton) {
      initialReplaceButton.addEventListener(
        'click',
        replaceCard
      );
    }
  }

  // -----------------------------
  // Section 8: Asynchronous data
  // -----------------------------
  const loadAsyncDataButton = document.getElementById(
    'loadAsyncData'
  );

  if (loadAsyncDataButton) {
    loadAsyncDataButton.addEventListener('click', () => {
      const spinner = document.getElementById('asyncSpinner');
      const data = document.getElementById('asyncData');

      if (!spinner || !data) return;

      spinner.hidden = false;
      data.replaceChildren();

      window.setTimeout(() => {
        spinner.hidden = true;

        const scenarios = [
          'Login scenario',
          'Checkout scenario',
          'API scenario'
        ];

        scenarios.forEach((name, index) => {
          const row = document.createElement('div');

          row.className = 'async-row';
          row.dataset.testid = 'async-row';
          row.textContent = `${index + 1}. ${name}`;

          data.append(row);
        });
      }, 900);
    });
  }

  // -----------------------------
  // Section 9: Dynamic list
  // -----------------------------
  const list = document.getElementById('dynamicList');
  const listCount = document.getElementById('listCount');

  let itemNumber = 0;

  const updateListCount = () => {
    if (!list || !listCount) return;

    const count = list.querySelectorAll('li').length;

    listCount.textContent =
      `${count} item${count === 1 ? '' : 's'}`;
  };

  const addItem = (text) => {
    if (!list) return;

    itemNumber += 1;

    const item = document.createElement('li');
    item.dataset.itemId = `item-${itemNumber}`;

    const itemText = document.createElement('span');
    itemText.textContent = text;

    const updateButton = document.createElement('button');
    updateButton.className = 'text-btn update-item';
    updateButton.type = 'button';
    updateButton.textContent = 'Update';

    const removeButton = document.createElement('button');
    removeButton.className = 'secondary-btn remove-item';
    removeButton.type = 'button';
    removeButton.textContent = 'Remove';

    updateButton.addEventListener('click', () => {
      itemText.textContent = `${text} (updated)`;
    });

    removeButton.addEventListener('click', () => {
      item.remove();
      updateListCount();
    });

    item.append(
      itemText,
      updateButton,
      removeButton
    );

    list.append(item);

    updateListCount();
  };

  const randomItems = [
    'Regression check',
    'Smoke scenario',
    'API validation',
    'Visual review'
  ];

  const addListItemButton = document.getElementById(
    'addListItem'
  );

  if (addListItemButton) {
    addListItemButton.addEventListener('click', () => {
      const randomIndex = Math.floor(
        Math.random() * randomItems.length
      );

      addItem(randomItems[randomIndex]);
    });
  }

  const addDuplicateItemButton = document.getElementById(
    'addDuplicateItem'
  );

  if (addDuplicateItemButton) {
    addDuplicateItemButton.addEventListener('click', () => {
      addItem('Practice Task');
    });
  }

  // -----------------------------
  // Section 10: Dynamic challenges
  // -----------------------------
  page.querySelectorAll('.dynamic-challenge-trigger')
    .forEach((button) => {
      button.addEventListener('click', () => {
        const targetId = button.dataset.dynamicTarget;
        const target = document.getElementById(targetId);

        if (!target) return;

        // DOM replacement challenge:
        // Trigger the actual button inside the container.
        if (targetId === 'replacementHost') {
          target.querySelector('.replace-card')?.click();
        }

        // Duplicate elements challenge:
        // Create two matching elements so nth(1) can be used.
        else if (targetId === 'addDuplicateItem') {
          target.click();
          target.click();
        }

        // Default behavior for other challenges.
        else {
          target.click();
        }

        target.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      });
    });

})();