FROM node:16

ARG workdir

RUN apt-get update
RUN apt-get install -y vim
RUN npm install -g pnpm@7.25.0

WORKDIR ${workdir}
COPY . .
RUN pnpm install --frozen-lockfile
RUN pnpm -r build