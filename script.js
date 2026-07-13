(function () {
  var DEFAULT_LANG = "en";
  var btn = document.getElementById("langBtn");

  function apply(lang) {
    document.documentElement.lang = lang;

    document.querySelectorAll("[data-en]").forEach(function (el) {
      var val = el.getAttribute("data-" + lang);
      if (val === null) return;
      if (el.tagName === "META") {
        el.setAttribute("content", val);
      } else {
        el.textContent = val;
      }
    });

    if (btn) {
      btn.querySelectorAll("[data-lang]").forEach(function (span) {
        span.classList.toggle("on", span.getAttribute("data-lang") === lang);
      });
    }

    try { localStorage.setItem("lang", lang); } catch (e) {}
  }

  var saved = null;
  try { saved = localStorage.getItem("lang"); } catch (e) {}
  var current = (saved === "tr" || saved === "en") ? saved : DEFAULT_LANG;
  apply(current);

  if (btn) {
    btn.addEventListener("click", function () {
      var next = (current === "en") ? "tr" : "en";
      current = next;
      // Cross-fade the text change where supported; fall back to instant swap.
      if (document.startViewTransition) {
        document.startViewTransition(function () { apply(next); });
      } else {
        apply(next);
      }
    });
  }
})();
