# `post-receive` Hook

This repo includes a bare-repo deployment hook template at `scripts/post-receive`.

## Install

On the deployment server, inside the bare repo:

```bash
cp /path/to/hopeco/scripts/post-receive hooks/post-receive
chmod +x hooks/post-receive
```

## Required Config

Edit the config block at the top of `hooks/post-receive`:

- `BRANCH_TO_DEPLOY`: branch that should trigger deployment
- `DEPLOY_DIR`: checked-out work tree path
- `RESTART_CMD`: command that restarts the Next.js process after a successful build

The deployment server must have:

- Node.js `>= 20.9.0`
- npm
- Docker Compose access if you want the hook to start WordPress/MySQL

Example `RESTART_CMD` values:

```bash
RESTART_CMD="systemctl restart hopeco-next"
```

```bash
RESTART_CMD="pm2 restart hopeco-next"
```

## What It Does

On pushes to the configured branch, the hook:

1. checks out the branch into `DEPLOY_DIR`
2. removes untracked files from previous deploys while preserving `.env.local` and `.env.wordpress`
3. runs `npm ci` when `package-lock.json` exists, otherwise `npm install`
4. starts `mysql` and `wordpress` with `docker compose up -d`
5. waits for `WORDPRESS_GRAPHQL_URL` from `.env.local` to return HTTP `200`
6. runs `npm run build`
7. runs `RESTART_CMD` if configured

## Notes

- The hook assumes the bare repo user can run `docker compose`.
- The Next.js runtime restart is intentionally left configurable because this repo does not define a production process manager.
- If your deployment directory needs `.env.local`, place it on the server before the first deploy.
- The hook uses POSIX `sh` syntax so it works even when the server does not execute hooks under Bash.
- The work tree is cleaned on each deploy so stale files from older apps do not get picked up by `next build`.
- `.env.local` on the server must define `WORDPRESS_GRAPHQL_URL` for the GraphQL readiness check and the Next.js build.
- `.env.wordpress` on the server must exist before deploy so Docker Compose can start MySQL and WordPress with the expected credentials.
- If the server already uses port `8080`, set `WORDPRESS_HOST_PORT` in `.env.wordpress` to a free port and update `.env.local` so `WORDPRESS_GRAPHQL_URL` matches it.
