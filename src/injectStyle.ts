let injected = false;

const styles = `
.rfm-overlay {
  display: flex;
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  justify-content: center;
  align-items: center;
  background: rgba(255,255,255,0);
}

.rfm-overlay.show {
  -webkit-animation: 0.2s ease-out forwards rfm-fadein;
          animation: 0.2s ease-out forwards rfm-fadein;
}

.rfm-overlay.hide {
  -webkit-animation: 0.2s ease-out forwards rfm-fadeout;
          animation: 0.2s ease-out forwards rfm-fadeout;
}

@-webkit-keyframes rfm-fadein  { from { opacity: 0; } to { opacity: 1.0; }  }
        @keyframes rfm-fadein  { from { opacity: 0; } to { opacity: 1.0; }  }

@-webkit-keyframes rfm-fadeout { from { opacity: 1.0; } to { opacity: 0; }  }
        @keyframes rfm-fadeout { from { opacity: 1.0; } to { opacity: 0; }  }
`;

export const injectStyle = () => {
  if (injected) return;
  const styleTag = document.createElement("style");
  styleTag.type = "text/css";
  styleTag.appendChild(document.createTextNode(styles));
  document.head.appendChild(styleTag);

  injected = true;
};
