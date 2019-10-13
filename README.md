Для запуска приложения нужно установить установить зависимости ```npm run install-all```, скачать репозитории для теста ```npm run clone-reps``` и запутить 2 сервера: для клиента ```npm run client``` ([список репозиториев](http://localhost:3000)), для бэка ```npm run dev-server``` (```localhost:3010```).<br>
Если нужно указать другую папку с репозиториями: ```npm run server -- --path=pathToReps```
Чтобы запустить тесты: ```npm test```
Запуск тестов гермионы: ```npm run test-hermione```
Запуск тестов бэкенда: ```npm run test-server```
