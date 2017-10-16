# Auth
## About this project
* Website: [https://auth.ikindness.cn](https://auth.ikindness.cn)
* UI(todo): `Sketch`
* JavaScript: `ECMAScript *`
* Main front side frameworks:
	1. `React ^16`
	2. `React-Router ^4`
	3. `Redux ^3`
	4. `React-Redux`
	5. `React-Router-Redux`
* Bundler: `Webpack ^3`
* Main server side frameworks:
	1. `Node.js ^8`
	2. `Koa ^2`
	3. `Sequelize ^4`
* Proxy server: `Nginx ^1.13`
* Database: `MySQL ^5.7`
* Static resource: `AliOSS`
* Lint: `ESLint ^4`
* Test(doing): `Mocha ^3`

## Workflow

### Development

* start a development server

```sh
yarn start:dev
```

* start webpack

```sh
cd ./front && yarn run build:dev
```

* git adding

```sh
yarn git:add
```

### production

* start a production server

```sh
yarn start:pro
```

* build for production

```sh
cd ./front && yarn run build:pro
```

## UI standard

### icons

Designing is based on Apple 6 (375 * 667), others scaled from it.

1. medium-big
	* size: 25 * 25
2. medium
	* size: 20 * 20
3. small
	* size: 15 * 15

### colors

1. black & gray 
	* #333 (font-color)
	* #666 (font-color)
	* #999 (font-color)
	* #ccc (font-color)
	* #e3e3e3 (border-color)
	* #f3f3f3 (background-color)
2. blue
	* #e39efe (font-color, background-color)

## Development standard

### names standard

1. sperator case names
	* css class names
2. lodash case names
	* interface queries
	* database columns
	* file names
3. camel case names
	* js variables, constants
4. uppercase names
	* configurable constants