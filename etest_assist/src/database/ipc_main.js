import {
    ipcMain,
} from 'electron';
import db from './m_db';


function open(db_path) {
    db.open(db_path);
    ipcMain.handle('db_load', (_, opt) => {
        return db.load(opt.kind, opt.id);
    });
    ipcMain.handle('db_list', (_, opt) => {
        return db.list(opt.kind);
    });
    ipcMain.handle('db_update', (_, opt) => {
        return db.update(opt.kind, opt.doc);
    });
}

async function close() {
    await db.close();
}

export default {
    open,
    close
}