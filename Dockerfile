FROM php:7.4

# Установка зависимостей
RUN apt-get update && \
    apt-get install -y \
        libzip-dev \
        libonig-dev \
        libxml2-dev \
        libcurl4-openssl-dev \
        libssl-dev \
        curl \
        git \
        unzip \
        wget \
        cron \
        mc \
        htop

# Установка Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Установка node
RUN curl -sL https://deb.nodesource.com/setup_16.x | bash -
RUN apt-get install -y nodejs

WORKDIR /var/www

# Копирование исходных файлов Laravel в контейнер
COPY ws /var/www

# Установка зависимостей composer
RUN composer install --no-dev

# Установка зависимостей npm
RUN npm install

# Генерация фронта
RUN npm run dev

# Открываем порты
EXPOSE 8000
EXPOSE 8090

# создаём крон
COPY cron /etc/cron.d/cron
RUN chmod 0644 /etc/cron.d/cron 
RUN crontab /etc/cron.d/cron
RUN touch /var/log/cron.log 
CMD cron && tail -f /var/log/cron.log

# Запуск PHP и WS серверов 
CMD cron -f | php artisan serve --host=0.0.0.0 --port=8000 | php artisan websocket:serve 

