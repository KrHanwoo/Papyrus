const { open } = window.__TAURI__.dialog;
const { homeDir } = window.__TAURI__.path;

$('browse-btn').onclick = async () => {
  const selected = await open({
    multiple: false,
    directory: true
  });
  $('dir-input').value = selected;
}

await getVersions();

async function getVersions() {
  const req = await fetch('https://api.papermc.io/v2/projects/paper');
  const json = await req.json();
  const versions = json.versions.toReversed();
  const list = getListElement('version-input');
  const options = [];
  versions.forEach((v, idx) => {
    const span = document.createElement('span');
    span.innerText = v;
    if (idx == 0) {
      span.classList.add('selected');
      span.classList.add('current');
      $('version-input').value = v;
    }
    options.push(span);
  });
  list.dispatchEvent(new CustomEvent('updatelist', { detail: options }));
}


//https://api.papermc.io/v2/projects/paper