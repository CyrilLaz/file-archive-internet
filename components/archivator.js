const archiver = require('archiver');

const archive = archiver('zip', {
    zlib: { level: 9 } // Sets the compression level.
  });
  
  archive.on('warning', function(err) {
    if (err.code === 'ENOENT') {
      // log warning
    } else {
      // throw error
      throw err;
    }
  });
  
  // good practice to catch this error explicitly
  archive.on('error', function(err) {
    throw err;
  });

  module.exports = archive;