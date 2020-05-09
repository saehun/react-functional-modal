import * as React from "react";
import * as ReactDOM from "react-dom";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
from {
  opacity: 0;
} to {
  opacity: 1.0;
}
`;

let counter = 0;
const idPrefix = String(Number(new Date())).slice(7); // prevent id of element from overlapping
/* const isBrowser = typeof window === "object"; */

// initialize global object.
interface InstanceItem {
  key: string;
  instance: React.ReactNode;
  el: HTMLElement;
  option: Option;
}

interface Option {
  key?: string;
  styles?: {
    justifyContent?: string;
    alignItems?: string;
    background?: string;
  };
  onClose?: () => void;
  clickOutsideToClose?: boolean;
}

const [root, instances] = ((): [HTMLElement, InstanceItem[]] => {
  const el = document.createElement("div");
  const instances: any = [];
  el.setAttribute("id", `modal-root-${idPrefix}`);
  document.body.appendChild(el);

  return [el, instances];
})();

const Container = styled.div`
  display: flex;
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  justify-content: center;
  align-items: center;
  background: rgba(255,255,255,0);
  animation: ${fadeIn} 0.2s ease-out forward;
`;

class Instance extends React.Component {

  state: { children: React.ReactNode; option: Option } = {
    children: null,
    option: {},
  }

  show(children: React.ReactNode, option: Option) {
    this.setState({ children, option });
  }

  componentWillUnmount() {
    if (this.state.option?.onClose) {
      this.state.option.onClose();
    }
  }

  handleClickOutside = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (this.state.option.clickOutsideToClose) {
      hide(this.state.option.key);
    }
  }

  render() {
    return <Container onClick={this.handleClickOutside} style={this.state.option?.styles}>
      {this.state.children}
    </Container>;
  }
}


const getInstance = (callback: any, _option?: Option) => {

  const option: Option = {
    key: String(counter++),
    onClose: () => { },
    clickOutsideToClose: true,
    ..._option,
  };

  let i;
  const key = option.key as string;
  if (i = instances.find(x => x.key === key)) {
    callback(i.instance, option);
    return;
  }

  const el = document.createElement("div");
  root.appendChild(el);

  const ref = (instance: any) => {
    if (!instance) return;
    callback(instance, option);
    instances.push({ key, instance, el, option });
    return instance;
  };

  ReactDOM.render(<Instance ref={ref} />, el);
};

export const show = (children: React.ReactNode, option?: Option) => {
  getInstance((instance: any, o: Option) => {
    instance.show(children, o);
  }, option);
};

export const hide = (key?: string) => {
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
