######## STAGE 1: Build image #######
FROM php:8.4-fpm-alpine AS builder

ARG APP_ENV=production

ENV BROADCAST_CONNECTION="reverb" \
    BROADCAST_DRIVER="reverb" \
    LOG_CHANNEL="stderr"

RUN apk add --no-cache --virtual .build-deps \
    $PHPIZE_DEPS \
    freetype-dev \
    libjpeg-turbo-dev \
    libpng-dev \
    libzip-dev \
    libxml2-dev \
    nginx \
    nodejs \
    npm \
    curl

RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) \
    gd \
    pdo \
    pdo_mysql \
    mysqli \
    session \
    mbstring \
    xml \
    dom \
    ctype \
    fileinfo \
    filter \
    hash \
    opcache \
    tokenizer \
    zip \
    pcntl \
    && docker-php-ext-install tokenizer || true \
    && pecl install redis \
    && docker-php-ext-enable redis \
    && docker-php-source delete \
    && rm -rf /var/lib/apt/lists/*

RUN php -m | grep pcntl || echo "PCNTL NOT INSTALLED!"
RUN php -m | grep redis || echo "REDIS NOT INSTALLED!"

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

COPY /src /var/www/html/

RUN ls -la /var/www/html/ && ls -la /var/www/html/microservices/ || echo "microservices directory not found"

RUN find /var/www/html -name vite.config.js -delete

COPY .docker/vite/vite.config.prod.js /var/www/html/vite.config.js

RUN if [ "$APP_ENV" = "local" ]; then \
        composer install --optimize-autoloader; \
    else \
        composer install --no-dev --optimize-autoloader; \
    fi \
    && composer dump-autoload --optimize \
    && composer clear-cache

RUN php artisan wayfinder:generate

RUN npm install \
    && npm run build \
    && chown -R nginx:nginx /var/www/html/public/build

RUN if [ -d "/var/www/html/microservices/template-renderer" ]; then \
        cd /var/www/html/microservices/template-renderer && \
        npm ci && \
        npm run build && \
        npm prune --production; \
    else \
        echo "Template renderer microservice directory not found"; \
    fi

RUN mkdir -p /var/www/html/logs /var/log/php-fpm \
    && chmod -R 0777 /var/www/html/logs \
    && touch /var/www/html/logs/php_errors.log \
    && touch /var/log/php-fpm/slow.log \
    && chown -R nginx:nginx /var/www/html/storage /var/www/html/bootstrap/cache \
    && chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

COPY .docker/php/custom.ini /usr/local/etc/php/conf.d/custom.ini

RUN mkdir -p /etc/php-fpm.d

COPY .docker/php-fpm.d/www.conf /etc/php-fpm.d/www.conf

COPY .docker/nginx/nginx-ssl.conf /tmp/nginx-ssl.conf
COPY .docker/nginx/nginx.conf /tmp/nginx.conf

RUN if [ "$APP_ENV" = "local" ]; then \
        cp /tmp/nginx-ssl.conf /etc/nginx/nginx.conf; \
    else \
        cp /tmp/nginx.conf /etc/nginx/nginx.conf; \
    fi

COPY .docker/etc/supervisord.conf /etc/supervisord.conf

####### STAGE 2: Production image #######

FROM php:8.4-fpm-alpine

ENV BROADCAST_CONNECTION="reverb" \
    BROADCAST_DRIVER="reverb" \
    LOG_CHANNEL="stderr"

# Install runtime dependencies
RUN apk add --no-cache \
    nginx \
    supervisor \
    nodejs \
    npm \
    bash \
    make

# Install build dependencies temporarily for PCNTL
RUN apk add --no-cache --virtual .build-deps $PHPIZE_DEPS \
    && docker-php-ext-install pcntl \
    && apk del .build-deps

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

COPY --from=builder /usr/local/etc/php /usr/local/etc/php
COPY --from=builder /usr/local/lib/php /usr/local/lib/php
COPY --from=builder /var/www/html /var/www/html
COPY --from=builder /etc/nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /etc/php-fpm.d/www.conf /etc/php-fpm.d/www.conf
COPY --from=builder /etc/supervisord.conf /etc/supervisord.conf
COPY --from=builder /usr/local/etc/php /usr/local/etc/php
COPY --from=builder /usr/local/lib/php /usr/local/lib/php

RUN php -m | grep pcntl || echo "PCNTL NOT INSTALLED IN FINAL IMAGE!"
RUN php -m | grep redis || echo "REDIS NOT INSTALLED IN FINAL IMAGE!"

RUN mkdir -p /run/nginx \
    && chown -R nginx:nginx /var/www/html \
    && chmod -R 755 /var/www/html

COPY bootstrap.sh /usr/bin/bootstrap.sh
COPY bootstrap-microservices.sh /usr/bin/bootstrap-microservices.sh

RUN chmod +x /usr/bin/bootstrap.sh /usr/bin/bootstrap-microservices.sh

EXPOSE 80 8080 8081

ENTRYPOINT ["bash", "/usr/bin/bootstrap.sh"]