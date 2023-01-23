const archiver = require('archiver');

const archive = archiver('zip', {
    zlib: { level: 9 } // Sets the compression level.
  });
  
  archive.on('warning', function(err) {
    if (err.code === 'ENOENT') {
      console.log(err);
    } else {
      throw err;
    }
  });
 
  archive.on('error', function(err) {
    throw err;
  });

  module.exports = archive;