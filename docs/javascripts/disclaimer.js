/*
 * One-time disclaimer acknowledgment for the interactive tools.
 *
 * The dialog markup is rendered by overrides/main.html on pages whose front
 * matter sets `disclaimer_ack: true`. Acknowledgment is remembered per
 * browser under a versioned key; bump the key when the wording changes so
 * everyone sees the new text once. Every storage read and write is guarded:
 * if storage is unavailable the dialog simply appears again next time.
 */
(function (root) {
  "use strict";

  var KEY = "disclaimer-ack-v1";

  function getStorage() {
    try {
      return root && root.localStorage ? root.localStorage : null;
    } catch (e) {
      return null;
    }
  }

  function hasAcknowledged(store) {
    try {
      return !!store && store.getItem(KEY) === "yes";
    } catch (e) {
      return false;
    }
  }

  function remember(store) {
    try {
      if (!store) return false;
      store.setItem(KEY, "yes");
      return true;
    } catch (e) {
      return false;
    }
  }

  function setup() {
    var dialog = document.querySelector("dialog[data-atd-ack]");
    if (!dialog || dialog.hasAttribute("data-atd-ready")) return;
    dialog.setAttribute("data-atd-ready", "");

    var store = getStorage();
    if (hasAcknowledged(store)) return;

    var accept = dialog.querySelector("[data-atd-ack-accept]");
    var title = dialog.querySelector("#atd-ack-title");
    var accepted = false;

    function open() {
      if (typeof dialog.showModal === "function") {
        if (!dialog.open) dialog.showModal();
      } else {
        dialog.setAttribute("open", "");
      }
      if (title) title.focus();
    }

    accept.addEventListener("click", function () {
      accepted = true;
      remember(store);
      if (typeof dialog.close === "function") dialog.close();
      else dialog.removeAttribute("open");
    });

    // Esc must not dismiss the notice without an acknowledgment.
    dialog.addEventListener("cancel", function (event) {
      event.preventDefault();
      accept.focus();
    });
    dialog.addEventListener("close", function () {
      if (!accepted) open();
    });

    open();
  }

  if (typeof module === "object" && module.exports) {
    module.exports = { KEY: KEY, hasAcknowledged: hasAcknowledged, remember: remember };
  }

  if (typeof document !== "undefined") {
    // With navigation.instant, Material emits document$ on every page load.
    if (root.document$ && typeof root.document$.subscribe === "function") {
      root.document$.subscribe(setup);
    } else if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", setup);
    } else {
      setup();
    }
  }
})(typeof window !== "undefined" ? window : this);
