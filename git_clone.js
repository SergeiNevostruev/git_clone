const readline = require('readline');
const { stdin: input, stdout: output } = require('process');
const fs = require('fs');
const path = require('path');
const { execSync, exec } = require('child_process');
const https = require('https');


// функция запрос на гитхаб
const get_rep = (arg) => {
  const [name_rep, not_org] = arg;
  
  const path_name = (not_org === 'y') ? `/users/${name_rep}/repos?type=all` : `/orgs/${name_rep}/repos?type=all`;
  
const options = {
  hostname: 'api.github.com',
  port: 443,
  path: path_name,
  method: 'GET',
  headers: {
    'User-Agent': 'request'
  }
};

// функция-помошник синхронное клонирование репозиториев
const clone_rep = (json, dir_name = 'github') => {
    const errors = [];
    const data = JSON.parse(json).map(d => d['git_url']);
    data.forEach(d => {
        try {
            let title = d.split('/').pop();
            console.log(`Загружается репозиторий ${title}`);
            execSync(`git clone ${d} ${dir_name}/${title}`)        
        } catch (e) {
            errors.push(d);
        };
    })
    fs.writeFile(path.resolve(__dirname, 'errors.txt'), JSON.stringify(errors), (err) => {
        if (err) {
            throw err;
        }
    });
  }

let output = '';

// запрос на сервер github
https
  .get(options, (res) => {
    console.log("Запрос списка доступных репозиториев выполнен");
    if (res.statusCode !== 200) {
        console.log('неудача... приложение закрывается');
        process.exit();
    }
    console.log("statusCode:", res.statusCode);
    res.on("data", (chunk) => {
      output += chunk;
    });
    res.on("end", () => {
      clone_rep(output, name_rep);
    });
  })
  .on("error", (e) => {
    console.error(e);
  });

}
// запросы коммандной строки
const rl = readline.createInterface({ input, output });
const read_console = (func) =>{
let arr = [];
console.log('Для работы приложения должен быть установлен GIT');
console.log('Введите имя репозитория:');
rl.setPrompt('clone_all >>>>>');
rl.prompt();
rl.on('line', (input) => {
    arr.push(input);
    console.log('Это репозиторий пользователя (y) или организации (n):');
    rl.prompt();
    if (arr.length === 2) {
        rl.close();
        return arr;
    };    
}).on('close', () => func(arr));
}

read_console(get_rep);





