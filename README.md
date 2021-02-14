<div align="center" markdown="1">

<img src="https://i.imgur.com/jKQ4ywE.png" alt="Cashflow" width="240">

# Cashflow

Cashflow is an app that helps you keep track of your finances.

</div>

This is the official Electron implementation of the [Cashflow project](https://github.com/zandrexrc/cashflow).

## Install

First, clone the repo via git and install dependencies:

```bash
git clone https://github.com/zandrexrc/cashflow-electron.git
cd cashflow-electron
yarn
```

## Starting Development

### Running the app

Start the app in the `dev` environment:

```bash
yarn start
```

### About the database files

There are two database files located in _src/database_. Initially, both of them
are empty (tables are already defined, but no data yet).  
We're going to be saving data in the _cashflow.db_ database file,
while _cashflow-empty.db_ will remain empty so we can use it to reset our data if needed.  
It may also be helpful to add the _cashflow.db_ file to _.gitignore_ to prevent git from tracking it.

## Packaging for Production

To package for the local platform:

```bash
yarn package
```

## Docs

Read the Cashflow [docs and guides here](https://github.com/zandrexrc/cashflow/tree/master/docs).

This project is built on [Electron React Boilerplate](https://github.com/electron-react-boilerplate/electron-react-boilerplate).
Read their [docs and guides here](https://electron-react-boilerplate.js.org/docs/installation).

## License

MIT © [Zandrex Camagon](https://github.com/zandrexrc)
