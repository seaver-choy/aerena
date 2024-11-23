import { Amplify } from "aws-amplify";
import { createRoot } from "react-dom/client";
import outputs from "../amplify_outputs.json";
import { Root } from './root';
import { init } from '@telegram-apps/sdk';

init();

Amplify.configure(outputs);
const existingConfig = Amplify.getConfig();

Amplify.configure({
    ...existingConfig,
    API: {
        ...existingConfig.API,
        REST: outputs.custom.API,
    },
});


createRoot(document.getElementById("root")!).render(<Root/>);
