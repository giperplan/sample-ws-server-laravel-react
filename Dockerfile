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
        supervisor \
        cron \
        mc

# Копирование исходных файлов Laravel в контейнер
COPY ws /var/www
COPY cron /etc/cron.d/cron

WORKDIR /var/www

# Установка Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

RUN composer install --no-dev


RUN curl -sL https://deb.nodesource.com/setup_16.x | bash -
RUN apt-get install -y nodejs

RUN npm install

# Открываем порты
EXPOSE 8000
EXPOSE 8090

CMD ["cron", "-f"]

CMD php artisan serve --host=0.0.0.0 --port=8000 | php artisan websocket:serve 

