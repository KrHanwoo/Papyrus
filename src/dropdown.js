const dropdowns = Array.from(document.getElementsByClassName('dropdown'));
dropdowns.forEach(d => {
  const input = d.querySelector('input');
  const list = d.querySelector('.list');
  let options = Array.from(list.querySelectorAll('span'));

  list.addEventListener('updatelist', (e) => {
    options = e.detail;
    list.innerHTML = '';
    options.forEach(x => list.append(x));
    processOptions(options, input);
  });

  input.onfocus = () => {
    input.placeholder = input.value;
    input.value = '';
    options.forEach(x => x.classList.remove('current'));

    list.innerHTML = '';
    options.forEach(x => list.append(x));

    const selected = list.querySelector('.selected') ?? list.querySelector('.current');
    selected?.classList?.add('current');
    selected?.scrollIntoView({ block: 'center' });
  };

  input.onblur = () => {
    const selected = list.querySelector('.selected')?.innerText ?? input.placeholder;
    input.value = selected;
    input.placeholder = '';
  };

  input.oninput = () => {
    const value = input.value;
    if(!value){
      list.innerHTML = '';
      options.forEach(x => list.append(x));
      const current = list.querySelector('.current');
      current?.scrollIntoView({ block: 'center' });
      return;
    }
    const reg = new RegExp('.*' + value.replace(/(.)/g, "$1.*"));
    const filtered = options.filter(x => reg.test(x.innerText)).toReversed();
    list.innerHTML = '';
    filtered.forEach(x => list.append(x));
    if (!filtered.some(x => x.classList.contains('current'))) {
      options.forEach(x => x.classList.remove('current'));
      list.firstElementChild?.classList?.add('current');
    }
  };

  input.onkeydown = (e) => {
    const current = list.querySelector('.current');
    switch (e.key) {
      case 'ArrowUp': {
        e.preventDefault();
        if (!current) return;
        current.classList.remove('current');
        const previous = current.previousElementSibling ?? list.lastElementChild;
        previous.classList.add('current');
        previous.scrollIntoView({ block: 'center' });
        break;
      }
      case 'ArrowDown': {
        e.preventDefault();
        if (!current) return;
        current.classList.remove('current');
        const next = current.nextElementSibling ?? list.firstElementChild;
        next.classList.add('current');
        next.scrollIntoView({ block: 'center' });
        break;
      }
      case 'Enter': {
        e.preventDefault();
        if (!current) return;
        options.forEach(x => x.classList.remove('selected'));
        current.classList.add('selected');
        input.value = current.innerText;
        input.blur();
        break;
      }
    }
  };

  processOptions(options, input);
});

function processOptions(options, input) {
  options.forEach(s => {
    s.addEventListener('mouseover', () => {
      options.forEach(x => x.classList.remove('current'));
      s.classList.add('current');
    });
    s.onmousedown = () => {
      options.forEach(x => x.classList.remove('selected'));
      s.classList.add('selected');
      input.value = s.innerText;
    };
  });
}

function getListElement(id) {
  return $(id).nextElementSibling.nextElementSibling;
}