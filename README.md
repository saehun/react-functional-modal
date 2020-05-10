<!-- <p align="center"> -->
  <!-- <img src="https://github.com/minidonut/cmdconfig/raw/master/logo.png" alt="Cmdconfig" width="600" /> -->
<!-- </p> -->

<h1 align="center">React Functional Modal</h1>

<p align="center">
  <a href="https://npmjs.org/package/react-functional-modal">
    <img src="https://img.shields.io/npm/v/react-functional-modal.svg" alt="version" />
  </a>
  <a href="https://npmjs.org/package/react-functional-modal">
    <img src="https://img.shields.io/npm/dm/react-functional-modal.svg" alt="downloads" />
  </a>
</p>

<p align="center">
  <b>Modal component doesn't needs to be mounted</b></br>
  <sub>Call functions show, hide with arguments ReactNode and few options</sub>
</p>

<br />

- **Simple**: Only have 2 API. show and hide.
- **Functional**: State is managed inside the library. Just call the function.
- **Flexible**: No restriction for how the modal to be shaped.
- **Typed**: Built with typescript.

## Install

``` shell
$ npm install --save react-functional-modal
```

## Usage
Let's assume that we are building an office CLI tool which interact with S3. We need to save the user's configuration in local file, implementing functionality similar to `git config` `aws config`.

![config-prompt](https://github.com/minidonut/cmdconfig/raw/master/docs/config-prompt.png)

``` javascript
// myapp.js
const cmdconfig = require("cmdconfig");

const configSchema = cmdconfig.schema({
  "username": { type: "string", description: "Name of the user" },
  "bucketRegion": { type: ["us-east-1", "ap-northeast-2", "eu-west-1"], description: "Primary region of the bucket" },
  "timeout": { type: "number", description: "Request timeout in seconds", shared: true },
  "localCache": { type: "boolean", description: "Save files to a local directory", shared: true },
});

const config = cmdconfig.init({
  filename: ".myappconfig",
  schema: configSchema,
});

console.log(config);
```

![config-result](https://github.com/minidonut/cmdconfig/raw/master/docs/config-result.png)

## Features
After implemented, `config` command is reserved. commands with options `config --help` and `config --list` are auto generated. If the program starts with `config` command, it's execution will be stopped after configuration procedure is done.

### Inline configuration
``` shell
$ myapp config --cache=false --bucketRegion=eu-west-1
```

### Profile management
Save and load configs by profile with `profile=PROFILE_NAME` option.

``` shell
$ myapp config --profile=dev
✔ username … katarina/dev
✔ region › ap-northeast-2
✔ save as 'dev' profile? … yes
$ myapp --profile=dev
{
  username: 'katarina/dev',
  bucketRegion: 'ap-northeast-2',
  timeout: 30,
  localCache: true
}
```

### Environment variable

``` javascript
// myapp.js
...
const config = cmdconfig.init({
  filename: ".myappconfig",
  schema: configSchema,
  profile: process.env.MY_APP_PROFILE,
});
...
```

``` shell
$ MY_APP_PROFILE=dev myapp
{
  username: 'katarina/dev',
  bucketRegion: 'ap-northeast-2',
  timeout: 30,
  localCache: true
}
```

### Overriding

``` shell
$ myapp --username=katarina/test --localCache=false
{
  username: 'katarina/test',
  bucketRegion: 'us-east-1',
  timeout: 30,
  localCache: false
}
```


### Change base directory and filename
Change location where the configuration file is saved.
Save file to `~/.dotfiles/.myappconf` (default `~/.config`):

``` javascript
// myapp.js
const os = require("os");
const path = require("path");
...
const config = cmdconfig.init({
  filename: ".myappconf",
  schema: configSchema,
  base: path.join(os.homedir(), ".dotfiles"),
});
...
```


### Help
``` shell
$ myapp config --help
Options:
  --help             Show help                                         [boolean]
  --list             Show list                                         [boolean]
  --username         Name of the user                                   [string]
  --bucketRegion     Primary region of the bucket                       [string]
  --timeout          Request timeout in seconds                         [number]
  --localCache       Save files to a local directory                   [boolean]
```


### List
Print all configuration details in yaml format.
``` shell
$ myapp config --list
/Users/$USER/.config/.myappconfig
default:
  username: katarina
  bucketRegion: us-east-1
dev:
  username: katarina/dev
  bucketRegion: ap-northeast-2
shared:
  timeout: 30
  localCache: false
```

## API
### show(ReactNode, Option)
return: `void`

Validate given schema object.

### hide(key?: String)
return: `void`<br>
**config object**: plain javascript object with key, value map.

Parse commandline argument. if `config` command exist, it saves the configuration and exit. Else, it loads the configuration and provides.


## `Option`
All properties follow are optional.
| Key | Type | Description |
| ----- | :--: | ----------- |
| key | `string` | Unique key of modal. if ommited incremental number is assigned. |
| onClose | `function` | callback when `hide` function called |
| style | `object` | CSS properties object which will overrides the modal's overlay |
| fading | `boolean` | enable fadeIn and fadeOut (default `false`) |
| clickOutsideToClose | `boolean` | click overlay to close modal (default `false`) |

## Default overlay styles
``` css
display: flex;
position: fixed;
top: 0; left: 0; right: 0; bottom: 0;
justify-content: center;
align-items: center;
background: rgba(255,255,255,0);
```


## How it works

## Restriction



## Typescript
This package is written in typescript, generating output type from schema is not supported yet (work in progress).

### Example


## License
MIT
