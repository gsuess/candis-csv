candis-csv
==========

A collection of candis-csv generators. See candis.io.

## Install

Requires node 12 or above:

```bash
nvm use 12
```

This package is not on npm yet.

```
npm install <git repo url>
```

If in development mode, build it:

```
npm run build
```

## Use

```bash
candis-csv --help
```

```
Usage: candis-csv [options] [command]

Options:
  -v, --vers                output the current version
  -h, --help                output usage information

Commands:
  list                      List available parsers
  parse [options] <format>  Parse foreign format into candis-csv format
```
