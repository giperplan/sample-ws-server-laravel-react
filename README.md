# Проект реатаймовой таблицы курсов валют

Крон работает каждые 2 минуты. В задании сказано про 5 минут, но это скучно... 

### Развёртывание и запуск
````
git clone https://github.com/giperplan/sample-ws-server-laravel-react ws-test
cd ws-test; 
copy ws/.env.example ws/.env 
docker build -t laravel-ws . ; docker run -p 8000:8000 -p 8090:8090 laravel-ws
````
### Просмотр
 http://127.0.0.1:8000
 
### Возможные проблемы
Если docker создаст контейнер с необычным внутренним IP, то это будет видно по ошибке в консоле `Send not allowed for ip x.x.x.x`, то тогда надо вписать этот IP в `.env` `WS_LOCAL_API` 