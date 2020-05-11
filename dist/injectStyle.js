var injected = false;
var styles = "\n.rfm-overlay {\n  display: flex;\n  position: fixed;\n  top: 0; left: 0; right: 0; bottom: 0;\n  justify-content: center;\n  align-items: center;\n  background: rgba(255,255,255,0);\n}\n\n\n.rfm-overlay.show {\n  -webkit-animation: 0.2s ease-out forward rfm-fadein;\n          animation: 0.2s ease-out forward rfm-fadein;\n}\n\n.rfm-overlay.hide {\n  -webkit-animation: 0.2s ease-out forward rfm-fadeout;\n          animation: 0.2s ease-out forward rfm-fadeout;\n}\n\n@-webkit-keyframes rfm-fadein  { from { opacity: 0; } to { opacity: 1.0; }  }\n        @keyframes rfm-fadein  { from { opacity: 0; } to { opacity: 1.0; }  }\n\n@-webkit-keyframes rfm-fadeout { from { opacity: 1.0; } to { opacity: 0; }  }\n        @keyframes rfm-fadeout { from { opacity: 1.0; } to { opacity: 0; }  }\n";
export var injectStyle = function () {
    if (injected)
        return;
    var styleTag = document.createElement("style");
    styleTag.type = "text/css";
    styleTag.appendChild(document.createTextNode(styles));
    document.head.appendChild(styleTag);
    injected = true;
};
