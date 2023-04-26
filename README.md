# Currencies rate table project

### Создние образа и запуск контейнера

`docker build -t laravel-ws . ; docker run -p 8000:8000 -p 8090:8090 laravel-ws`

### Просмотр
 http://127.0.0.1:8000
 
### Возможные проблемы
Если docker создаст контейнер с необычным внутренним IP, то это будет видно по ошибке в консоле `Send not allowed for ip x.x.x.x`, то тогда надо вписать этот IP в `.env` `WS_LOCAL_API` 