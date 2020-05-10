import * as React from "react";
import * as ReactDOM from "react-dom";
import styled, { keyframes, css } from "styled-components";

let counter = 0;
const instances: InstanceItem[] = [];
const fadeIn = keyframes`
   from {
     opacity: 0;
   }
   to {
     opacity: 1.0;
   }
`;

const fadeOut = keyframes`
  from {
    opacity: 1.0;
  }
  to {
    opacity: 0;
  }
`;

interface InstanceItem {
  key: string;
  instance: React.ReactNode;
  el: HTMLElement;
  option: Option;
}

interface Option {
  key?: string;
  fading?: boolean;
  style?: React.CSSProperties;
  onClose?: () => void;
  clickOutsideToClose?: boolean;
}

const fading = css<{ show: boolean }>`
  animation: ${props => props.show ? fadeIn : fadeOut} 0.2s ease-out;
  animation-fill-mode: forwards;
`;

const Container = styled.div<{ show: boolean; fading: boolean }>`
  display: flex;
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  justify-content: center;
  align-items: center;
  background: rgba(255,255,255,0);
  ${props => props.fading ? fading : ""}
`;

class Instance extends React.Component {

  state: { children: React.ReactNode; option: Option; show: boolean } = {
    children: null,
    option: {},
    show: true,
  }

  show(children: React.ReactNode, option: Option) {
    this.setState({ children, option });
  }

  hide() {
    this.setState({ show: false });
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
    return <Container
      show={this.state.show}
      fading={!!this.state.option.fading}
      onClick={this.handleClickOutside}
      style={this.state.option?.style}>
      {this.state.children}
    </Container>;
  }
}


const getInstance = (callback: any, _option?: Option) => {

  const option: Option = {
    key: String(counter++),
    onClose: () => { },
    fading: true,
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
  document.body.appendChild(el);

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

const hideAndRemove = (i: InstanceItem) => {
  const { el, option } = i;
  const instance = i.instance as any;
  if (option.fading) {
    console.log("fading1");
    instance.hide();
    setTimeout(() => {
      ReactDOM.unmountComponentAtNode(el);
      document.body.removeChild(el);
    }, 200);
  } else {
    ReactDOM.unmountComponentAtNode(el);
    document.body.removeChild(el);
  }
};

export const hide = (key?: string) => {
  let i;
  if (typeof key === "string") {
    if (i = instances.find(x => x.key === key)) {
      hideAndRemove(i);
      instances.splice(instances.indexOf(i), 1);
      return;
    }
  } else {
    if (i = instances.pop()) {
      const { el } = i;
      hideAndRemove(i);
    }
  }
};
