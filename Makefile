SHELL   := /bin/bash

default: help
	
# Compile contract
compile: 
	$(call read_env) \
	&& docker run --rm -v $(PWD)/packages/contracts:/project -w /project $$LIGO compile-contract token.ligo main > "$$MICHELSON_DIR/token.tz"

 # Deploy contract
deploy:
	docker-compose exec flextesa tezos-client originate 
	
# Enter sandbox container
sandbox-shell: 
	docker-compose exec flextesa ash
	
# Start flextesa sandbox
sandbox-start: 
	docker-compose up -d
	docker-compose exec flextesa delphibox info

# Stop sandbox
sandbox-stop: 
	docker-compose stop
	
# Show this help
help:
	@cat $(MAKEFILE_LIST) | docker run --rm -i xanders/make-help


define read_env
	set -o allexport && source .env && set +o allexport
endef


