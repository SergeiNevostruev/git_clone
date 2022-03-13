# git_clone
## RU
Приложение командной строки для копирования всех репозиториев github пользователя или организации на Node.js. 
Должен быть установлен GIT. 
После запуска нужно указать имя репозитория (не URL), и указать относится оно к пользователю или организации (y/n).
Выполняется запрос на сервер github, полученный массив репозиториев парсится и по очереди для каждого вызывается команда "git clone".

## EN
A command-line application for copying all github repositories of a user or organization to Node.js .
GIT must be installed.
After launching, you need to specify the repository name (not the URL), and specify whether it refers to the user or organization (y/n).
A request is made to the github server, the resulting repository array is parsed and the "git clone" command is called for each in turn.
