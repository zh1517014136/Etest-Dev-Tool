
import path from 'path';
import loki  from 'lokijs';

import {
    debounce
} from 'throttle-debounce';

// 数据库文件名
const kinds = ['dataformat', 'statemachine','statecode','nettool']

let _db;
let _init = false; 

let auto_save = debounce(4000, () => {_db.saveDatabase();});

function open(db_path) {
    let f = path.resolve(db_path, 'db.json');
    _db = new loki(f, {
        autoload: true,
        autoloadCallback : init,
    });
}

function init() {
    _init = true;
    kinds.forEach(kind => {
        let coll = _db.getCollection(kind);
        if(!coll) {
            _db.addCollection(kind);
            _db.saveDatabase();
        }
    });
}

function close() {
    if(!_db || !_init) {
        return;
    }
    return new Promise(resolve => {
        _db.saveDatabase(() =>{
            _db.close();
            _db = null;
            return resolve();
        });  
    })
}

function list(kind) {
 
    if(!_db || !_init) {
        return;
    }
    let coll = _db.getCollection(kind);
    if(!coll) {
        console.log('error kind =', kind);
        return;
    }
    return coll.chain().simplesort('id').data();
    // TODO
}

function load(kind, id) {
    if(!_db || !_init) {
        return;
    }
    let coll = _db.getCollection(kind);
    if(!coll) {
        console.log('error kind =', kind);
        return;
    }
    let res = coll.find({'id': { '$eq' : id }});
    if(res && res.length===1) {
        return res[0];
    }
    return null;
}

function insert(kind, doc) {
    if(!_db || !_init) {
        return;
    }
    let coll = _db.getCollection(kind);
    if(!coll) {
        console.log('error kind =', kind);
        return;
    }
    coll.insert(doc);
    auto_save();
}

function update(kind, doc) {
    if(!_db || !_init) {
        return;
    }
    let coll = _db.getCollection(kind);
    if(!coll) {
        console.log('error kind =', kind);
        return;
    }
    let olddocs = coll.find({'id': { '$eq' : doc.id }});
    if(!olddocs || olddocs.length === 0) {
        insert(kind, doc);
    } else {
        let olddoc = olddocs[0];
        for(let k in doc) {
            olddoc[k] = doc[k];
        }
    }
    auto_save();
}

function remove(kind, doc) {
    if(!_db || !_init) {
        return;
    }
    let coll = _db.getCollection(kind);
    if(!coll) {
        console.log('error kind =', kind);
        return;
    }
    let id = doc.id;
    let item = coll.find({'id': { '$eq' : id }})[0];
    if(!item) {
        return;
    }
    coll.remove(item);
    auto_save();
}

export default { 
    open, close, list, load, insert, update, remove
}

// 后端
//const db_path = app.getPath('userData');
//db.open(db_path);
// ipcMain.handle('db_load', (_, opt) => {
//     return db.load(opt.kind, opt.id);
// });

//前端
// async function load(opt) {
//     return await ipcRenderer.invoke('db_load', opt);
// }

