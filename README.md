# Bitume2000

<img src="public/logos/logo_1.svg" width="150">

Bitume2000.fr est un site web qui permet d'offrir une meilleure experience du Bitume Network.
lié a Discord et tout ce qui est en rapport avec le serveur.

## dépendances principales du projet

- [Quasar](https://quasar.dev/)
- [Vue.js](https://vuejs.org/)
- [Vite](https://vitejs.dev/)
- [apib2k](https://github.com/gwilhoa/apib2k)

## architecture du projet

```txt
.
├── public
│   ├── logos
│   │    └── les logos du bitume
│   ├── icons
│   │    └── les icons necessaires au site
│   └── favicon.ico
├── src
│   ├── components
│   │    └── ce sont tout les widgets recurrents du site (ex: profile...)
│   ├── layouts
│   │    └── ce sont les layouts du site (ex: default...)
│   ├── pages
│   │    └── les pages du site
│   ├── router
│   │    └── le router du site
│   ├── stores
│   │    └── ce sont les fichiers traitant les données du site et les gardes en mémoire
│   └── App.vue
└── docs

```

## Installer les dépendances

```bash
yarn
# or
npm install
```

### lancer le projet en mode developement (reload auto)

```bash
quasar dev
```

### Lint the files

```bash
yarn lint
# or
npm run lint
```

### reformater les fichiers

```bash
yarn format
# or
npm run format
```

### construire le projet pour la production

> Note: ce projet est hébergé a travers des serveur qui s'occupe de la compilation et de la mise en ligne du site le
> fichier produit

```bash
quasar build
```

### Customize the configuration

See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).
