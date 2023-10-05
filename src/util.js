const $ = (id) => document.getElementById(id);
const defStr = (str, def) => (!str || str?.trim() == '') ? def : str;
const validName = (name) => !'<>:"/\\|?*'.split('').some(x => name.includes(x));
const validPath = (path) => !'<>"|?*'.split('').some(x => path.includes(x));