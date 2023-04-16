install:
	npm ci
lint:
	npx eslint .
fix:
	npx eslint --fix . 
develop: 
	npx webpack serve
build:
	rm -rf dist
	NODE_ENV=production npx webpack
