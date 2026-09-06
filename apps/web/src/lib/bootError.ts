/** Shows startup failures before React can replace the boot splash. */
export function showBootError(error: unknown) {
  console.error("T3 Code failed to start.", error);
  const target = document.getElementById("boot-shell") ?? document.getElementById("root") ?? document.body;
  if (!target) return;

  const content = document.createElement("div");
  content.id = "boot-error";
  content.setAttribute("role", "alert");

  const message = document.createElement("p");
  message.textContent = "T3 Code could not load.";
  content.append(message);

  if (error instanceof Error && error.message) {
    const detail = document.createElement("p");
    detail.textContent = error.message;
    content.append(detail);
  }

  const reload = document.createElement("button");
  reload.type = "button";
  reload.textContent = "Reload";
  reload.addEventListener("click", () => window.location.reload());
  content.append(reload);
  target.replaceChildren(content);
}
