PROJECT_NAME=twitdown

install:
	pnpm install

build:
	pnpm run build

dev:
	pnpm run dev

test:
	pnpm run test

clean:
	rm -rf .next
	rm -rf node_modules

purge:
	find . -type d \( -name '.next' -o -name 'node_modules' \) -exec rm -rf {} +

delete-cache:
	/bin/rm -rf .next
	/bin/rm -rf node_modules

start:
	pnpm run start

deploy:
	vercel deploy --prod

env:
	@cat .env.local | base64 | tr -d '\n' | gh secret set  ${PROJECT_NAME}_ENV
	@echo "Environment variable updated"
	@gh secret list
