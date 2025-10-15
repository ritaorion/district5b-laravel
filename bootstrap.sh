#!/bin/bash

# Bootstrap script for STAGING/PRODUCTION
# This script ONLY runs: composer install, npm install, php artisan optimize
# All services (nginx, php-fpm, reverb, queue workers) are managed by supervisord

IS_NON_LOCAL=false
if [ "${APP_ENV}" != "local" ]; then
    IS_NON_LOCAL=true
fi

log_info() {
    local message="$1"
    if [ "$IS_NON_LOCAL" = true ]; then
        echo "[INFO] $(date '+%Y-%m-%d %H:%M:%S'): $message" | tee -a /var/www/html/logs/bootstrap.log
    else
        echo "[INFO] $(date '+%Y-%m-%d %H:%M:%S'): $message" >> /var/www/html/logs/bootstrap.log
    fi
}

log_error() {
    local message="$1"
    if [ "$IS_NON_LOCAL" = true ]; then
        echo "[ERROR] $(date '+%Y-%m-%d %H:%M:%S'): $message" | tee -a /var/www/html/logs/bootstrap_errors.log >&2
    else
        echo "[ERROR] $(date '+%Y-%m-%d %H:%M:%S'): $message" >> /var/www/html/logs/bootstrap_errors.log
    fi
}

mkdir -p /var/www/html/logs
mkdir -p /var/www/html/storage/logs

# Create all necessary storage subdirectories
log_info "Creating storage directories..."
mkdir -p /var/www/html/storage/framework/cache/data
mkdir -p /var/www/html/storage/framework/sessions
mkdir -p /var/www/html/storage/framework/views
mkdir -p /var/www/html/storage/framework/testing
mkdir -p /var/www/html/storage/app/public
mkdir -p /var/www/html/bootstrap/cache

# Set proper ownership and permissions for Laravel
log_info "Setting storage directory permissions..."
chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache
chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# Ensure web server can write to these specific directories
chmod -R 777 /var/www/html/storage/framework/views
chmod -R 777 /var/www/html/storage/framework/cache
chmod -R 777 /var/www/html/storage/framework/sessions
chmod 777 /var/www/html/bootstrap/cache

log_info "Starting Laravel application bootstrap..."

echo "Checking PCNTL installation..."
if php -r "echo extension_loaded('pcntl') ? 'PCNTL is installed' : 'PCNTL IS NOT INSTALLED';" | grep -q "NOT INSTALLED"; then
    log_error "PCNTL extension is not properly installed. Laravel Reverb requires this extension."
fi

# Run composer install (already done in builder stage, but run again for safety)
log_info "Running composer install..."
if ! output=$(composer install --no-dev --optimize-autoloader 2>&1); then
    log_error "Composer install failed: $output"
else
    log_info "Composer install completed successfully"
fi

# Run npm install (already done in builder stage, but run again for safety)
log_info "Running npm install..."
if ! output=$(npm install 2>&1); then
    log_error "npm install failed: $output"
else
    log_info "npm install completed successfully"
fi

# Run Laravel optimization
log_info "Running php artisan optimize..."
if ! output=$(php artisan optimize 2>&1); then
    log_error "Optimization failed: $output"
else
    log_info "Laravel optimization completed successfully"
fi

# Bootstrap complete - now start supervisord to manage all services
# Supervisord will manage: nginx, php-fpm, reverb, landlord-queue-worker, multi-tenant-queue-worker
log_info "Bootstrap complete. Starting supervisord to manage all services..."

# Signal handling for graceful shutdown
handle_signal() {
    local signal="$1"
    log_info "Received signal: $signal - forwarding to supervisord"
    if [ -n "$child_pid" ] && kill -0 "$child_pid" 2>/dev/null; then
        kill -s "$signal" "$child_pid" 2>/dev/null
    fi
}

trap 'handle_signal HUP' SIGHUP
trap 'handle_signal INT' SIGINT
trap 'handle_signal TERM' SIGTERM
trap 'handle_signal QUIT' SIGQUIT

# Start supervisord - it will manage all services defined in /etc/supervisord.conf
/usr/bin/supervisord -c /etc/supervisord.conf &
child_pid=$!

log_info "Supervisord started with PID: $child_pid"
log_info "All services are now managed by supervisord. Waiting for child process..."

# Wait for supervisord to exit
wait "$child_pid"
exit_code=$?

log_info "Supervisord exited with code: $exit_code"
exit "$exit_code"