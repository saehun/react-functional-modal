import * as React from "react";
import * as ReactDOM from "react-dom";

let counter = 0;
const idPrefix = String(Number(new Date())).slice(7); // prevent id of element from overlapping
/* const isBrowser = typeof window === "object"; */

// initialize global object.
interface InstanceItem {
  key: string;
  instance: React.ReactNode;
  el: HTMLElement;
}

const [root, instances] = ((): [HTMLElement, InstanceItem[]] => {
  const el = document.createElement("div");
  const instances: any = [];
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

  let i;
  if (i = instances.find(x => x.key === key)) {
    callback(i.instance);
    return;
  }

  const el = document.createElement("div");
  root.appendChild(el);

  const ref = (instance: any) => {
    if (!instance) return;
    callback(instance);
    instances.push({ key, instance, el });
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
  console.log(instances);
  let i;
  if (typeof key === "string") {
    if (i = instances.find(x => x.key === key)) {
      const { el } = i;
      ReactDOM.unmountComponentAtNode(el);
      root.removeChild(el);
      instances.splice(instances.indexOf(i), 1);
      return;
    }
  } else {
    if (i = instances.pop()) {
      const { el } = i;
      ReactDOM.unmountComponentAtNode(el);
      root.removeChild(el);
    }
  }
};
