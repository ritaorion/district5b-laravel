DOCKER_APP_NAME=web
DOCKER_WEB_EXEC=docker exec -it $(DOCKER_APP_NAME)

build-no-cache:
	@echo "Building Docker images without cache..."
	docker compose build --no-cache

up: ssl-check
	@echo "Starting Docker containers..."
	docker compose up

up-no-local-sql: ssl-check
	@echo "Starting Docker containers without local SQL service..."
	docker compose up web redis wss phpmyadmin

ssl-check:
	@if [ ! -f .docker/ssl/d5b.local.pem ]; then \
		echo "SSL certificates not found. Running ssl-setup..."; \
		$(MAKE) ssl-setup; \
	fi

down:
	@echo "Stopping Docker containers..."
	docker compose down

web-shell:
	$(DOCKER_WEB_EXEC) /bin/sh

logs:
	@echo "Tailing Docker logs..."
	docker compose logs -f

kill-ports:
	@echo "Killing processes using ports 8080, 3069, 6379..."
	@lsof -ti:8080 | xargs -r kill -9 2>/dev/null || true
	@lsof -ti:3069 | xargs -r kill -9 2>/dev/null || true
	@lsof -ti:6379 | xargs -r kill -9 2>/dev/null || true
	@echo "Port cleanup complete."

restart: kill-ports down up

ssl-setup:
	@echo "Setting up SSL certificates for local development..."
	@command -v mkcert >/dev/null 2>&1 || { echo "mkcert not found. Installing via Homebrew..."; brew install mkcert; }
	@echo "Installing mkcert CA in system trust store (may require sudo password)..."
	@mkcert -install
	@echo "Creating SSL certificate directory..."
	@mkdir -p .docker/ssl
	@echo "Generating SSL certificates for all domains..."
	@mkcert -key-file .docker/ssl/d5b.local-key.pem -cert-file .docker/ssl/d5b.local.pem "d5b.local" "*.d5b.local"
	@echo "SSL setup complete! Certificates generated in .docker/ssl/"

ssl-clean:
	@echo "Removing SSL certificates..."
	@rm -rf .docker/ssl
	@echo "SSL certificates removed."

dev-setup: ssl-setup
	@echo "Development environment setup complete!"

.PHONY: up down web-shell logs kill-ports restart ssl-setup ssl-clean dev-setup ssl-check build-no-cache
