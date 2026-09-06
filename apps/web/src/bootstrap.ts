import { showBootError } from "./lib/bootError";

window.addEventListener("error", (event) => {
  showBootError(event.error ?? event.message);
});
window.addEventListener("unhandledrejection", (event) => {
  showBootError(event.reason);
});

// Bundled dev can move UI code into shared chunks. Load it only after this
// entry runs the React refresh preamble, and catch failures before React mounts.
void import("./main").then(({ startup }) => startup).catch(showBootError);
