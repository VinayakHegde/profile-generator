const fs = require('fs');

const Write = (path, data, callback = () => {}) => {
  fs.writeFile(path, JSON.stringify(data, null, 2), callback);
};

const WriteCallback = (minilog, out, outputPath, valueColumns, index) => err => {
  if (err) {
    const {RedChalk} = require('./chalk');
    if(!minilog) {
      RedChalk(`  JSON failed to save to ${outputPath} - ${err}`);
    } else if (minilog && valueColumns.length - 1 === index) {
      RedChalk(`  JSON files failed to save under ${out}/ - ${err}`);
    }
  } else {
    const {GreenBlueChalk} = require('./chalk');
    if(!minilog) {
      GreenBlueChalk("  JSON saved to ", outputPath);
    } else if(minilog && valueColumns.length - 1 === index) {
      GreenBlueChalk("  JSON created for ", `"${valueColumns.map(({saveAs}) => saveAs).toString()}" under ${out}/`);
    }
  }
};

const ExistsSync = ({path, unlink = false, callback = () => {}}) => {
  const exist = fs.existsSync(path);

  if(exist && unlink) {
    fs.unlink(path, callback)
  }

  return exist
}

module.exports = {
  Write,
  WriteCallback,
  ExistsSync
};
