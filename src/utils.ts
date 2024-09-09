export type MaybePromise<T> = T | Promise<T>;

export function viewTransition(cb: () => MaybePromise<void>) {
  if (
    "startViewTransition" in document &&
    typeof document.startViewTransition === "function"
  ) {
    document.startViewTransition(cb);
    return;
  }
  cb();
}

export function getElement(id: string): HTMLElement {
  const el = document.getElementById(id);
  if (!el) {
    throw new Error(`Element with id ${id} not found`);
  }
  return el;
}
