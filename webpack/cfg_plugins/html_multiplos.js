
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs=require('fs');

const isDev = process.env.NODE_ENV === 'development'
const isProd  = process.env.NODE_ENV === 'production'


/**
 * Retorna array com os nomes dos arquivos existentes na pasta dir
 * @param {*} dir string contendo a pasta root
 * @param {*} files_ 
 * @returns 
 */
function getFiles (dir, files_){
    files_ = files_ || [];
    var files = fs.readdirSync(dir);
    for (var i in files){
        var name = dir + '/' + files[i];
        if (fs.statSync(name).isDirectory()){
            getFiles(name, files_);
        } else {
            files_.push(name);
        }
    }
    return files_;
}

function resumePath(path_old){
    let ar_path_new = [];
    let ar_path = path_old.split('/');
    for (let i = 0; i < ar_path.length; i++) {
        if(ar_path[i] === '..'){
            ar_path_new.pop();
        }else{
            ar_path_new.push(ar_path[i]);
        }
    }
    return ar_path_new.join('/');
}


// console.log({__dirname});
let folder_start = __dirname + '/../../src/html/pages'; // SEM barra no final
folder_start = resumePath(folder_start);
console.log({folder_start});
var htmlPageNames = getFiles(folder_start);

console.log({htmlPageNames});

var multipleHtmlPlugins = htmlPageNames.map(name_completo => {
  let prefixo = folder_start + '/';
  let use_nome_completo = name_completo; //resumePath(name_completo);
  let nome_publico = name_completo.replace(prefixo, '');
//   console.log("NOME PUBLICO: " + nome_publico)
//   console.log("NOME COMPLETO: " + use_nome_completo)

  return new HtmlWebpackPlugin({


    template: `${use_nome_completo}`, // relative path to the HTML files
    filename: `${nome_publico}`, // output HTML files
    // chunks: [`${name}`], // respective JS files

    inject: 'body', // Injeta o bundle no final do body
    template: `nunjucks-html-loader!${use_nome_completo}`,
    minify: {
        collapseWhitespace: isProd,
        removeComments: isProd
    }
  })
});

module.exports = multipleHtmlPlugins;
// fim de múltiplos HTML