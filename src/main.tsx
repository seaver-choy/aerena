import { createRoot } from "react-dom/client";
import { Root } from "./Root.tsx";
import "./index.css";
import "./mockEnv.ts";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";

if (window.visualViewport) {
    window.visualViewport.addEventListener("resize", () => {
        document.body.style.height = window.visualViewport.height + "px";
    });
}
// This will ensure user never overscroll the page
window.addEventListener("scroll", () => {
    if (window.scrollY > 0) window.scrollTo(0, 0);
});

Amplify.configure(outputs);
const existingConfig = Amplify.getConfig();

Amplify.configure({
    ...existingConfig,
    API: {
        ...existingConfig.API,
        REST: outputs.custom.API,
    },
});

createRoot(document.getElementById("root")!).render(<Root />);
