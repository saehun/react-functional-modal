<p align="center">
  <img src="https://github.com/minidonut/react-functional-modal/raw/master/docs/logo.png" alt="logo" width="600" />
</p>

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

## How is it different?
![comparison](https://github.com/minidonut/react-functional-modal/raw/master/docs/old-and-new.png)

## Usage
TBD

## Features
TBD

## API
### show(ReactNode, Option)
`ReactNode`:
Evaluated react component. e.g. `<div>...</div>`, `<SomeComponent />`, `<>...</>`

`Option` (optional):
See [Option](https://github.com/minidonut/react-functional-modal#option)
return: `void`

### hide(string)
`string` (optional):
Key of the modal to hide. if not provided, hide modals in order from recent to old.
return: `void`<br>


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
TBD

## Restriction
TBD



## Typescript
This package is written in typescript, generating output type from schema is not supported yet (work in progress).

### Example


## License
MIT
