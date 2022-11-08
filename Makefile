CONTAINER_NAME=social-frontend

dev-run:
	docker run \
		--entrypoint=bash \
		-it \
		--rm \
		--name "$(CONTAINER_NAME)" \
		-u 1000:1000 \
		-p 3000:5173 \
		-w /app \
		-v "$$PWD:/app" \
		node:latest

dev-exec:
	docker \
		exec \
		-it \
		"$(CONTAINER_NAME)" \
		bash