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
2. runs `npm ci` when `package-lock.json` exists, otherwise `npm install`
3. runs `npm run build`
4. runs `docker compose up -d mysql wordpress`
5. runs `RESTART_CMD` if configured

## Notes

- The hook assumes the bare repo user can run `docker compose`.
- The Next.js runtime restart is intentionally left configurable because this repo does not define a production process manager.
- If your deployment directory needs `.env.local`, place it on the server before the first deploy.
