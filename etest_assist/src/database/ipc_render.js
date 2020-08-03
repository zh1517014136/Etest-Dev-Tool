const {
    ipcRenderer
} = window.require('electron');

async function load(opt) {
    return await ipcRenderer.invoke('db_load', opt);
}
async function list(opt) {
    return await ipcRenderer.invoke('db_list', opt);
}