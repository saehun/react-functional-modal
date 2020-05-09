var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import * as React from "react";
import * as ReactDOM from "react-dom";
import styled, { keyframes, css } from "styled-components";
var counter = 0;
var instances = [];
var fadeIn = keyframes(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n   from {\n     opacity: 0;\n   }\n   to {\n     opacity: 1.0;\n   }\n"], ["\n   from {\n     opacity: 0;\n   }\n   to {\n     opacity: 1.0;\n   }\n"])));
var fadeOut = keyframes(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  from {\n    opacity: 1.0;\n  }\n  to {\n    opacity: 0;\n  }\n"], ["\n  from {\n    opacity: 1.0;\n  }\n  to {\n    opacity: 0;\n  }\n"])));
var fading = css(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  animation: ", " 0.2s ease-out;\n  animation-fill-mode: forwards;\n"], ["\n  animation: ", " 0.2s ease-out;\n  animation-fill-mode: forwards;\n"])), function (props) { return props.show ? fadeIn : fadeOut; });
var Container = styled.div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  display: flex;\n  position: fixed;\n  top: 0; left: 0; right: 0; bottom: 0;\n  justify-content: center;\n  align-items: center;\n  background: rgba(255,255,255,0);\n  ", "\n"], ["\n  display: flex;\n  position: fixed;\n  top: 0; left: 0; right: 0; bottom: 0;\n  justify-content: center;\n  align-items: center;\n  background: rgba(255,255,255,0);\n  ", "\n"])), function (props) { return props.fading ? fading : ""; });
var Instance = /** @class */ (function (_super) {
    __extends(Instance, _super);
    function Instance() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            children: null,
            option: {},
            show: true,
        };
        _this.handleClickOutside = function (e) {
            e.preventDefault();
            e.stopPropagation();
            if (_this.state.option.clickOutsideToClose) {
                hide(_this.state.option.key);
            }
        };
        return _this;
    }
    Instance.prototype.show = function (children, option) {
        this.setState({ children: children, option: option });
    };
    Instance.prototype.hide = function () {
        this.setState({ show: false });
    };
    Instance.prototype.componentWillUnmount = function () {
        var _a;
        if ((_a = this.state.option) === null || _a === void 0 ? void 0 : _a.onClose) {
            this.state.option.onClose();
        }
    };
    Instance.prototype.render = function () {
        var _a;
        return React.createElement(Container, { show: this.state.show, fading: !!this.state.option.fading, onClick: this.handleClickOutside, style: (_a = this.state.option) === null || _a === void 0 ? void 0 : _a.styles }, this.state.children);
    };
    return Instance;
}(React.Component));
var getInstance = function (callback, _option) {
    var option = __assign({ key: String(counter++), onClose: function () { }, fading: true, clickOutsideToClose: true }, _option);
    var i;
    var key = option.key;
    if (i = instances.find(function (x) { return x.key === key; })) {
        callback(i.instance, option);
        return;
    }
    var el = document.createElement("div");
    document.body.appendChild(el);
    var ref = function (instance) {
        if (!instance)
            return;
        callback(instance, option);
        instances.push({ key: key, instance: instance, el: el, option: option });
        return instance;
    };
    ReactDOM.render(React.createElement(Instance, { ref: ref }), el);
};
export var show = function (children, option) {
    getInstance(function (instance, o) {
        instance.show(children, o);
    }, option);
};
var hideAndRemove = function (i) {
    var el = i.el, option = i.option;
    var instance = i.instance;
    if (option.fading) {
        console.log("fading1");
        instance.hide();
        setTimeout(function () {
            ReactDOM.unmountComponentAtNode(el);
            document.body.removeChild(el);
        }, 200);
    }
    else {
        ReactDOM.unmountComponentAtNode(el);
        document.body.removeChild(el);
    }
};
export var hide = function (key) {
    var i;
    if (typeof key === "string") {
        if (i = instances.find(function (x) { return x.key === key; })) {
            hideAndRemove(i);
            instances.splice(instances.indexOf(i), 1);
            return;
        }
    }
    else {
        if (i = instances.pop()) {
            var el = i.el;
            hideAndRemove(i);
        }
    }
};
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
