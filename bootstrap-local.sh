#!/bin/bash

# Bootstrap script for LOCAL DEVELOPMENT ONLY
# This script runs composer install, npm install, php artisan optimize, and npm run dev

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
LOG_FILE="/var/www/html/logs/bootstrap.log"

cd /var/www/html

log_info() {
    local message="$1"
    echo "[INFO] $(date '+%Y-%m-%d %H:%M:%S'): $message"
    echo "[INFO] $(date '+%Y-%m-%d %H:%M:%S'): $message" >> "$LOG_FILE"
}

log_error() {
    local message="$1"
    echo "[ERROR] $(date '+%Y-%m-%d %H:%M:%S'): $message" >&2
    echo "[ERROR] $(date '+%Y-%m-%d %H:%M:%S'): $message" >> "$LOG_FILE"
}

# Create all necessary directories
log_info "Creating storage directories..."
mkdir -p /var/www/html/logs
mkdir -p /var/www/html/storage/logs
mkdir -p /var/www/html/storage/framework/cache/data
mkdir -p /var/www/html/storage/framework/sessions
mkdir -p /var/www/html/storage/framework/views
mkdir -p /var/www/html/storage/framework/testing
mkdir -p /var/www/html/storage/app/public
mkdir -p /var/www/html/bootstrap/cache

# Set proper ownership and permissions for Laravel
log_info "Setting storage directory permissions..."
chown -R nginx:nginx /var/www/html/storage /var/www/html/bootstrap/cache 2>/dev/null || true
chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache 2>/dev/null || true
chmod -R 777 /var/www/html/storage/framework/views 2>/dev/null || true
chmod -R 777 /var/www/html/storage/framework/cache 2>/dev/null || true
chmod -R 777 /var/www/html/storage/framework/sessions 2>/dev/null || true
chmod 777 /var/www/html/bootstrap/cache 2>/dev/null || true

log_info "Starting Laravel application bootstrap for LOCAL development..."

# Check PCNTL installation
echo "Checking PCNTL installation..."
if php -r "echo extension_loaded('pcntl') ? 'PCNTL is installed' : 'PCNTL IS NOT INSTALLED';" | grep -q "NOT INSTALLED"; then
    log_error "PCNTL extension is not properly installed. Laravel Reverb requires this extension."
fi

# Install PHP dependencies
log_info "Installing PHP dependencies..."
if ! composer install --optimize-autoloader 2>&1 | tee -a "$LOG_FILE"; then
    log_error "Composer install failed"
    exit 1
else
    log_info "Composer install completed successfully"
fi

# Install Node dependencies
log_info "Installing Node dependencies..."
if ! npm install 2>&1 | tee -a "$LOG_FILE"; then
    log_error "npm install failed"
    exit 1
else
    log_info "npm install completed successfully"
fi

# Run Laravel optimization
log_info "Running Laravel optimization..."
if ! php artisan optimize 2>&1 | tee -a "$LOG_FILE"; then
    log_error "Laravel optimization failed"
else
    log_info "Laravel optimization completed successfully"
fi

# Start multi-tenant queue worker in background
log_info "Starting multi-tenant queue worker..."
php /var/www/html/artisan queue:work-multi-tenant >> /var/www/html/logs/queue.log 2>&1 &
QUEUE_PID=$!
log_info "Started queue worker with PID: $QUEUE_PID"

# Start Template Renderer Microservice in background
log_info "Starting Template Renderer Microservice..."
/usr/bin/bootstrap-microservices.sh >> /var/www/html/logs/microservice.log 2>&1 &
MICROSERVICE_PID=$!
log_info "Started template renderer microservice with PID: $MICROSERVICE_PID"

# Build assets with Vite
log_info "Building assets with Vite..."
if ! npm run build 2>&1 | tee -a "$LOG_FILE"; then
    log_error "Vite build failed"
else
    log_info "Vite build completed successfully"
fi

# Handle signals for graceful shutdown
handle_signal() {
    local signal="$1"
    log_info "Received signal: $signal"

    for pid in $QUEUE_PID $MICROSERVICE_PID $child_pid; do
        if [ -n "$pid" ] && kill -0 "$pid" 2>/dev/null; then
            log_info "Terminating process $pid"
            kill -s "$signal" "$pid" 2>/dev/null
        fi
    done
}

trap 'handle_signal HUP' SIGHUP
trap 'handle_signal INT' SIGINT
trap 'handle_signal TERM' SIGTERM
trap 'handle_signal QUIT' SIGQUIT

# Start supervisord (manages php-fpm, nginx, and reverb)
log_info "Starting supervisord..."
/usr/bin/supervisord -c /etc/supervisord.conf &
child_pid=$!

wait_for_child() {
    while kill -0 "$child_pid" 2>/dev/null; do
        wait "$child_pid"
    done
}

log_info "All services started successfully. Container is ready for local development."
log_info "Waiting for child processes..."

wait_for_child

exit_code=$?

log_info "Child process exited with code: $exit_code"

# Clean up background processes
for pid in $QUEUE_PID $MICROSERVICE_PID; do
    if [ -n "$pid" ] && kill -0 "$pid" 2>/dev/null; then
        kill "$pid" 2>/dev/null
    fi
done

exit "$exit_code"
