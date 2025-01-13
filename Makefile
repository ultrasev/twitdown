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
