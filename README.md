# nodejs app starter
nodejs app starter with express + typescript + typeORM + React + Redux + Ant design


## REST API

Here we use MySQL as a default database with TypeORM so anyone can change his preferred database.


### Start api server

```
cd api
```
```
npm install
```
Create your own local ```.env``` file in the ```api``` directory. Make sure it's formatted like ```sample.env``` with the right credentials. This file should not be checked into version control.

Create your own local typeORM config ```ormconfig.json``` file in the ```api``` directory. Make sure it's formatted like ```sample.ormconfig.json``` with the right credentials. This file should not be checked into version control.



Run in development mode
```
npm run build
```
```
npm run watch
```

### API documentations
Build api documentations

```
npm run apidoc
```
Open ```/docs/index.html``` in browser for api documentations details.

## React App

### Start react app server

```
cd app
```
```
npm install
```
Create your own local ```.env``` file in the ```app``` directory. Make sure it's formatted like ```sample.env``` with the right credentials. This file should not be checked into version control.

Run in development mode
```
npm start
```