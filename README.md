<div align="center" markdown="1">

<img src="https://i.imgur.com/jKQ4ywE.png" alt="Cashflow" width="240">

# Cashflow   
Cashflow is an app that helps you keep track of your finances.  

</div> 

## Install

First, clone the repo via git and install dependencies:

```bash
git clone --depth 1 --single-branch https://github.com/electron-react-boilerplate/electron-react-boilerplate.git your-project-name
cd your-project-name
yarn
```

## Starting Development

### About the database files
There are two database files located in *src/database*.   
Initially, both of them are empty (tables are already defined, but no data yet).   
We're going to be saving data in the *cashflow.db* database file, 
while *cashflow-empty.db* will remain empty so we can use it to reset our data if needed.   
It may also be helpful to add the *cashflow.db* file to *.gitignore* to prevent git from tracking it.

### Running the app
Start the app in the `dev` environment:

```bash
yarn start
```

## Packaging for Production

To package for the local platform:

```bash
yarn package
```

## Docs

Read the Cashflow [docs and guides here](https://electron-react-boilerplate.js.org/docs/installation).   

This project is built on [Electron React Boilerplate](https://github.com/electron-react-boilerplate/electron-react-boilerplate). 
Read their [docs and guides here](https://electron-react-boilerplate.js.org/docs/installation).

## License

MIT © [Zandrex Camagon](https://github.com/zandrexrc)
