import * as React from "react";
import * as ReactDOM from "react-dom";

let counter = 0;
const idPrefix = String(Number(new Date())).slice(7); // prevent id of element from overlapping
/* const isBrowser = typeof window === "object"; */

// initialize global object.
const [root, instances] = ((): [HTMLElement, Record<string, React.ReactNode>] => {
  const el = document.createElement("div");
  const instances: Record<string, React.ReactNode> = {};
  el.setAttribute("id", `modal-root-${idPrefix}`);
  document.body.appendChild(el);

  return [el, instances];
})();

class Instance extends React.Component {

  state: any = {
    children: null,
    show: false,
  }

  show(children: React.ReactNode) {
    this.setState({ show: true, children });
  }

  hide() {
    this.setState({ show: false, children: null });
  }

  render() {
    return this.state.show ? (
      <div>{this.state.children}</div>
    ) : null;
  }
}


const getInstance = (callback: any, key?: string) => {
  console.log(instances, key);
  if (key in instances) {
    callback(instances[key]);
    return;
  }

  const ref = (instance: any) => {
    callback(instance);
    instances[key] = instance;
    return instance;
  };

  const el = document.createElement("div");
  el.setAttribute("id", `modal-item-${idPrefix}`);
  root.appendChild(el);

  ReactDOM.render(<Instance ref={ref} />, el);
};

interface Option {
  key?: string;
}

export const show = (children: React.ReactNode, option?: Option) => {
  getInstance((instance: any) => {
    console.log(instance);
    instance.show(children);
  }, option?.key || String(counter++));
};

export const hide = (key?: string) => {
  getInstance((instance: any) => {
    instance.hide();
  }, key);
};
