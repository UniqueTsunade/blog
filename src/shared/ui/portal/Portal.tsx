import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
    children: React.ReactNode;
  }

const Portal: React.FC<PortalProps> = ({children}) => {
    const portalRoot = document.getElementById("portal-root");
    const el = useRef(document.createElement("div"));

    useEffect(() => {
        if (portalRoot) {
            portalRoot.appendChild(el.current);
        }

        return () => {
            if (portalRoot) {
                portalRoot.removeChild(el.current);
            }
        }
    }, [portalRoot]);

    return createPortal(children, el.current);
}

export default Portal;