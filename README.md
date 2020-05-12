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
- **Functional**: Let library manages the state. Just call the function.
- **Flexible**: No restriction for how the modal to be shaped.
- **Typed**: Built with typescript.
- **Small**: 160 lines, ~1.8Kb gzipped. no deps.

## Install

``` shell
$ npm install --save react-functional-modal
```

## How is it different?
![comparison](https://github.com/minidonut/react-functional-modal/raw/master/docs/old-and-new.png)

## Usage

Simply Call the function `show` with react element(jsx):
``` jsx
show(<div>{/* contents */}</div>);
```

And hide it:
``` jsx
hide();
```

If you want modals to be overlapped, do it:
``` jsx
show(<ModalOne />);
show(<ModalTwo />);
```

`hide` function closes recently opened modal:
``` jsx
hide(); // hide ModalTwo
hide(); // hide ModalOne
hide(); // do nothing
```

If you specified the key, you can close it:
``` jsx
show(<Modal />, { key: "1234" });
hide("1234");
```

When you need fade-in, fade-out animation, there is a option:
``` jsx
show(<Modal />, {
  fading: true,
  clickOutsideToClose: true,
});
```

You can override overlay style:
``` jsx
show(<Modal />, {
  style: {
    justifyContent: "flex-start"     // Modal is placed left side of the page.
    background: "rgba(0, 0, 0, 0.1)" // Darken overlay background color.
  }
});
```

Provide `onClose` callback:
``` jsx
show(<Modal />, {
  onClose: () => { /* called when the modal closed */ }
});
```


`hide(key, ...args)` function pass the arguments to `onClose(...args)` callback:
``` jsx
show(<Modal />, {
  key: "1234" // required
  onClose: (value1, value2) => { console.log(value1, value2) } // Hello World!
});

hide("1234", "Hello", "World!");
```


You can promisify the modal
``` jsx
const getValue = new Promise((resolve) => {
  show(<Modal someHandler={(value) => hide("1234", value)} />, {
    key: "1234" // required
    onClose: (value) => { resolve(value); }
  });
});

// inside some async function
...
const value = await getValue();
...
```


## Advanced

### Message

``` jsx
const Message = ({ duration, title }) => {
  const [remain, setRemain] = React.useState(duration / 1000);

  React.useEffect(() => {
    const interval = setInterval(() => { setRemain(remain => remain - 1) }, 1000);
    return () => clearInterval(interval);
  }, []);

  return <div style={wrapperStyle}>
    <h3 style={{ whiteSpace: "pre" }}>{title}</h3>
    <p>{`closed after ${remain}seconds..`}</p>
  </div>;
};

const message = (title, duration) => {
  setTimeout(() => { hide("alert") }, duration);
  show(<Message title={title} duration={duration} />, {
    key: "alert",
    fading: true,
    style: { background: "rgba(27, 28, 37, 0.03)" }
  });
}

...

<button onClick={() => message(
  `You have no test.
Successfully deployed to production.

Have a nice weekend.`,
  3000,
)}>
  show message modal
</button>
```

### Confirm

``` jsx
const confirm = () => new Promise((resolve) => {
  show(<div style={wrapperStyle}>
    <p>Are you sure to send this message to your ex at 3AM?</p>
    <div style={{ textAlign: "right" }}>
      <button onClick={() => hide("confirm", true)} style={{ marginRight: "8px" }}>
        OK
    </button>
      <button onClick={() => hide("confirm", false)}>
        CANCEL
    </button>
    </div>
  </div>, {
    key: "confirm",
    fading: true,
    onClose: (result) => {
      resolve(result);
    },
    style: {
      background: "rgba(27, 28, 37, 0.08)"
    }
  })
});
```

### Select

``` jsx
const select = (title, options) => new Promise((resolve) => {
  show(<div style={wrapperStyle}>
    <h3>{title}</h3>
    <select
      value={options[0].toLowerCase()}
      onChange={(e) => { e.persist(); hide("select", e.target.value) }}>
      {options.map((o, i) => {
        return <option key={i} value={o.toLowerCase()}>{o}</option>
      })}
    </select>
  </div>, {
    key: "select",
    fading: true,
    style: { background: "rgba(27, 28, 37, 0.08)" },
    onClose: (value) => {
      resolve(value);
    },
  })
});

...

<button onClick={async () => {
  const result = await select("What is your favorite language?", [
    "Javscript", "Typescript", "Python", "Go", "C/C++",
  ]);
  console.log(result);
}}>
  show select modal
</button>
```

### Form

``` jsx
const Form = () => {
  const [values, setValues] = React.useState({ name: "", email: "", phone: "" });
  const onChange = React.useCallback((property) => (e) => {
    e.persist();
    setValues((prev) => ({ ...prev, [property]: e.target.value }));
  }, [setValues]);

  return <form style={wrapperStyle}>
    <h3>GET FREE CHICKEN!</h3>
    <InputGroup property="name" onChange={onChange} value={values.name} />
    <InputGroup property="email" onChange={onChange} value={values.email} />
    <InputGroup property="phone" onChange={onChange} value={values.phone} />
    <div style={{ textAlign: "center" }}>
      <button onClick={() => hide("form", undefined)} style={{ marginRight: "8px" }}>
        CANCEL
      </button>
      <button onClick={() => hide("form", values)}>
        SUBMIT
      </button>
    </div>
  </form>
};

const form = () => new Promise((resolve, reject) => {
  show(<Form />, {
    key: "form",
    fading: true,
    style: { background: "rgba(27, 28, 37, 0.08)" },
    onClose: (v) => {
      if (!v) reject();
      resolve(v);
    },
  });
});
```

### Step

``` jsx
const step = (title, contents, index = 0) => {
  if (index === contents.length || index < 0) return hide("step");

  show(<div style={wrapperStyle}>
    <h3 style={{ textAlign: "center" }}>{title}</h3>
    <p>{contents[index]}</p>
    <div style={{ textAlign: "center" }}>
      <button onClick={() => step(title, contents, index - 1)} style={{ marginRight: "8px" }}>
        PREV
      </button>
      <button onClick={() => step(title, contents, index + 1)}>
        NEXT
      </button>
    </div>
  </div>,
    { key: "step", fading: true, style: { background: "rgba(27, 28, 37, 0.08)" } });
}

...

<button onClick={() => step(
  "How to debug code", [
  "1. Make sure the code is saved",
  "2. Reinstall node_modules",
  "3. Restart your computer",
])}>
  show step modal
</button>
```


## API
### show(ReactNode, Option)
`ReactNode`: <br>
React element. e.g. `<div>...</div>`, `<SomeComponent />`, `<>...</>`

`Option` (optional): <br>
See [Option](https://github.com/minidonut/react-functional-modal#option) <br>

**return**: `void`

### hide(string)
`string` (optional): <br>
Key of the modal to hide. if not provided, hide modals in order from recent to old. <br>

**return**: `void`


## `Option`
All properties follow are optional.
| Key | Type | Description |
| ----- | :--: | ----------- |
| key | `string` | Unique key of modal. if ommited incremental number is assigned. |
| onClose | `function` | callback when `hide` function called |
| style | `object` | CSS properties object which will overrides the modal's overlay |
| fading | `boolean` | enable fadeIn and fadeOut (default `false`) |
| clickOutsideToClose | `boolean` | click overlay to close the modal (default `false`) |

## Default overlay styles
```
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

## License
MIT
