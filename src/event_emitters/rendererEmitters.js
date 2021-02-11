const electron = window.require('electron');
const { ipcRenderer } = electron;

export default function fetch(action, payload) {
  return new Promise((resolve) => {
    ipcRenderer.once('FETCH_REPLY', (_, result) => {
      resolve(result);
    });
    ipcRenderer.send(action, payload);
  });
}
