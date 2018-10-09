const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const counter = require('./counter');

var items = {};

// Public API - Fix these CRUD functions ///////////////////////////////////////

exports.create = (text, callback) => {
  counter.getNextUniqueId((err, id) => {
    fs.writeFile(path.join(exports.dataDir, id + ".txt"), text, (err) => {
      if (err) { callback(err, null); }
      callback(null, {id, text});
      //console.log('The File has been saved!');
    });
  });
  
  // var id = counter.getNextUniqueId();
  // items[id] = text;
  // callback(null, { id, text });
};

exports.readAll = (callback) => {
  fs.readdir(exports.dataDir, (err, files) => {
    if (err) { callback(err, null); }
    let obj = files.map((element) => element = {text: element.substring(0, 5), id: element.substring(0, 5)});
    callback(null, obj);
  }); //callback gets two arguments err 
  //and an array of files
  
  
  
  // var data = [];
  // _.each(items, (text, id) => {
  //   data.push({ id, text });
  // });
  // callback(null, data);
};

exports.readOne = (id, callback) => {
  fs.readFile(path.join(exports.dataDir, id + ".txt"), (err, data) => {
    if (err) { callback(err); } else {
      var obj = {id, text: data.toString()};
      callback(null, obj);
    }   
  });
  // var text = items[id];
  // if (!text) {
  //   callback(new Error(`No item with id: ${id}`));
  // } else {
  //   callback(null, { id, text });
  // }
};

exports.update = (id, text, callback) => {
  fs.readFile(path.join(exports.dataDir, id + ".txt"), (err, data) => {
    if (err) { callback(err); } else {
      fs.writeFile(path.join(exports.dataDir, id + ".txt"), text, (err, data) => {
        if (err) { callback(err); } else {
          callback(null, text);
        }
      });
    }
  });
  
  // var item = items[id];
  // if (!item) {
  //   callback(new Error(`No item with id: ${id}`));
  // } else {
  //   items[id] = text;
  //   callback(null, { id, text });
  // }
};

exports.delete = (id, callback) => {
  fs.unlink(path.join(exports.dataDir, id + ".txt"), (err, data) => {
    if (err) { callback(err); } else {
      callback(null);
    }
  });
  // var item = items[id];
  // delete items[id];
  // if (!item) {
  //   // report an error if item not found
  //   callback(new Error(`No item with id: ${id}`));
  // } else {
  //   callback();
  // }
};

// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};
