var path = require('path');
var fs = require('fs');
var child_process = require("child_process");
let compressQueue = [];
let _allAssets = [];
function CheckDisablePngquant(filename) {
    let uuid = filename.substring(0, filename.indexOf('.'));
    for (let i = 0; i < _allAssets.length; i++) {
        if (_allAssets[i].uuid == uuid) {
            let content = fs.readFileSync(_allAssets[i].file + ".meta", 'utf8');
            let meta = JSON.parse(content);
            if (meta.userData.disablePngquant) {
                return true;
            }
            else {
                return false;
            }
        }
    }
    return false;
}
function CompressOneFile(cwd, respath, cb) {
    child_process.execFile("pngquant.exe", [respath, '--ext', '.png',
        '--force'
    ], {
        cwd: cwd
    }, function (error, stdout, stderr) {
        if (compressQueue.length > 0) {
            let file = compressQueue.shift();
            CompressOneFile(cwd, file, cb);
        }
        else {
            cb();
        }
    });
}
function CollectPngFiles(dest, filePath) {
    let files = fs.readdirSync(filePath);
    files.forEach(function (filename) {
        var filedir = path.join(filePath, filename);
        let stats = fs.statSync(filedir);
        var isFile = stats.isFile();
        var isDir = stats.isDirectory();
        if (isFile && path.extname(filedir) == '.png') {
            if (!CheckDisablePngquant(path.basename(filedir))) {
                var respath = './' + filedir.slice(dest.length + 1);
                compressQueue.push(respath);
            }
        }
        if (isDir) {
            if (filename != "SkinPlugin" && filename != "CommonPlugin") {
                CollectPngFiles(dest, filedir);
            }
        }
    });
}
// 进行PNG压缩
function ApplyPNGQuant(assets, dest, filePath, cb) {
    compressQueue = [];
    _allAssets = assets;
    CollectPngFiles(dest, filePath);
    console.log("begin pngquant total = ", compressQueue.length);
    if (compressQueue.length > 0) {
        let file = compressQueue.shift();
        CompressOneFile(dest, file, cb);
    }
    else {
        console.log("compress png list empty");
        cb();
    }
}
module.exports = {
    apply: ApplyPNGQuant
};
