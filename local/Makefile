# Container execs
DOCKER_APP_NAME=local-web-1
DOCKER_WEB_EXEC=docker exec -it $(DOCKER_APP_NAME)

up:
	docker compose up

down:
	docker compose down

web-shell:
	$(DOCKER_WEB_EXEC) bash
