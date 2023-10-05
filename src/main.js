const { open, message } = window.__TAURI__.dialog;
const { homeDir, join } = window.__TAURI__.path;
const { createDir } = window.__TAURI__.fs;

browseBtn.onclick = async () => {
  dirInput.value = await open({
    multiple: false,
    directory: true
  });
  dirInput.classList.remove('invalid');
}

versionInput.disabled = true;
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
      versionInput.value = v;
    }
    options.push(span);
  });
  list.dispatchEvent(new CustomEvent('updatelist', { detail: options }));
  versionInput.disabled = false;
}

nameInput.oninput = () => {
  const valid = validName(nameInput.value);
  if(valid) nameInput.classList.remove('invalid');
  else nameInput.classList.add('invalid');
}

dirInput.oninput = () => {
  const valid = validPath(dirInput.value);
  if(valid){
    dirInput.classList.remove('invalid');
  }else{
    dirInput.classList.add('invalid');
  }
}


createBtn.onclick = create;

async function create() {
  const name = defStr(nameInput.value, 'Unnamed Server');
  const directory = defStr(dirInput.value, await join(await homeDir(), 'Servers'));
  const baseDir = await join(directory, name);
  createDir(baseDir);

}

//https://api.papermc.io/v2/projects/paper