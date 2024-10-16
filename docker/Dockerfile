FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

# Installation des dépendances avec root et passage du propriétaire à node
RUN npm install -g @quasar/cli
RUN npm install
RUN chown -R node:node /app/node_modules

COPY . .

# Changement de propriétaire vers node de tous les fichiers sauf ceux dans node_modules
# RUN chown -R node:node /app/src /app/public
RUN find /app ! -path "/app/node_modules/*" -exec chown node:node {} +

USER node

RUN quasar build

CMD ["quasar", "serve", "dist/spa"]
