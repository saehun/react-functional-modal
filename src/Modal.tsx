import * as React from "react";
import * as ReactDOM from "react-dom";

let counter = 0;
const idPrefix = String(Number(new Date())).slice(7); // prevent id of element from overlapping
/* const isBrowser = typeof window === "object"; */

// initialize global object.
const [root, instances] = ((): [HTMLElement, Record<string, { instance: React.ReactNode; el: HTMLElement }>] => {
  const el = document.createElement("div");
  const instances: Record<string, { instance: React.ReactNode; el: HTMLElement }> = {};
  el.setAttribute("id", `modal-root-${idPrefix}`);
  document.body.appendChild(el);

  return [el, instances];
})();

class Instance extends React.Component<any> {

  state: any = {
    children: null,
  }

  show(children: React.ReactNode) {
    this.setState({ children });
  }

  hide() {
  }

  render() {
    return <div>{this.state.children}</div>;
  }
}


const getInstance = (callback: any, key: string) => {

  if (key in instances) {
    callback(instances[key].instance);
    return;
  }

  const el = document.createElement("div");
  root.appendChild(el);

  const ref = (instance: any) => {
    if (!instance) return;
    callback(instance);
    instances[key] = { instance, el };
    return instance;
  };

  ReactDOM.render(<Instance ref={ref} el={el} />, el);
};

interface Option {
  key?: string;
}

export const show = (children: React.ReactNode, option?: Option) => {
  getInstance((instance: any) => {
    instance.show(children);
  }, option?.key || String(counter++));
};

export const hide = (key?: string) => {
  const _key = typeof key === "string" ? key : Object.keys(instances).reverse()[0];
  if (_key === undefined) {
    return;
  }

  if (_key in instances) {
    const { el } = instances[_key];
    ReactDOM.unmountComponentAtNode(el);
    root.removeChild(el);
    delete instances[_key];
    return;
  }

};
