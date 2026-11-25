/*
  HIGH STAKES MEDIA — SHARED SITE SCRIPT
  --------------------------------------
  Every page loads this file. It draws the top bar, masthead, menu, breaking
  bar, sidebar and footer, so you only ever edit those things HERE.
*/

/* ===== Things you might want to change ===== */
var HSM = {
  /* How readers reach you for tips and ads. Shown on the Submit a Tip and Advertise pages. */
  contact: "%Gambling_Queen on the SuperNat",

  /* The menu. "section" must match the section name you use in articles.js. */
  categories: [
    { name: "World",          file: "world.html",          blurb: "News from beyond Zenchou's borders and the powers that shape the wider world." },
    { name: "Zenchou",        file: "zenchou.html",        blurb: "The streets, wards and people of Zenchou — the stories closest to home." },
    { name: "Business",       file: "business.html",       blurb: "Trade, guilds, markets and the money moving behind the scenes." },
    { name: "Conflicts",      file: "conflicts.html",      blurb: "Duels, feuds, sect wars and the battles that change the balance of power." },
    { name: "Politics",       file: "politics.html",       blurb: "The Council, the clans and the decisions that govern the adepts." },
    { name: "Investigations", file: "investigations.html", blurb: "In-depth reporting on what the powerful would rather keep hidden." },
    { name: "Opinion",        file: "opinion.html",        blurb: "Commentary, columns and arguments from our writers and guests." },
    { name: "Life & Arts",    file: "life-arts.html",      blurb: "Culture, food, festivals, craft and the lighter side of Zenchou." }
  ]
};

(function () {
  var page = document.body.getAttribute("data-page") || "";

  /* ---------- Helpers ---------- */
  function esc(t) { var d = document.createElement("div"); d.textContent = t == null ? "" : t; return d.innerHTML; }
  function niceDate(iso) {
    if (!iso) return "";
    var d = new Date(iso + "T12:00:00");
    return isNaN(d) ? esc(iso) : d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  }
  function $(id) { return document.getElementById(id); }
  var articles = (window.ARTICLES || []).filter(function (a) { return a && a.title && a.url; });
  articles.sort(function (a, b) { return (b.date || "").localeCompare(a.date || ""); }); /* newest first */

  function artBox(a, cls) {
    return a.image
      ? '<div class="art" data-caption="' + esc(a.caption || "") + '"><img src="' + esc(a.image) + '" alt=""></div>'
      : '<div class="art ' + cls + '"></div>';
  }
  function tagFor(a) {
    if (a.exclusive) return '<span class="tag exclusive">Exclusive</span>';
    return a.section ? '<span class="tag">' + esc(a.section) + '</span>' : '';
  }
  function byline(a) {
    return '<p class="byline">' + (a.author ? 'By <strong>' + esc(a.author) + '</strong> · ' : '') + niceDate(a.date) + '</p>';
  }
  function listStory(a, i) {
    return '<article class="list-story">' +
      '<a href="' + esc(a.url) + '">' + artBox(a, "art-" + (2 + (i % 4))) + '</a>' +
      '<a href="' + esc(a.url) + '">' + tagFor(a) + '<h4>' + esc(a.title) + '</h4>' +
      (a.summary ? '<p>' + esc(a.summary) + '</p>' : '') + byline(a) + '</a></article>';
  }
  var suits = '<span class="s">♠</span><span class="g">♥</span><span class="s">♦</span><span class="g">♣</span>';

  /* ---------- Header ---------- */
  var nav = '<li><a href="index.html"' + (page === "home" ? ' class="active"' : '') + '>Home</a></li>' +
    HSM.categories.map(function (c) {
      return '<li><a href="' + c.file + '"' + (c.file === page + ".html" ? ' class="active"' : '') + '>' + esc(c.name) + '</a></li>';
    }).join("");

  $("site-header").innerHTML =
    '<div class="topbar"><div class="wrap"><span>Zenchou Edition</span><span class="right">' +
      '<span class="weather" id="weather"></span>' +
      '<button class="theme-toggle" id="themeToggle" type="button" aria-label="Switch color theme">☀ Light</button>' +
    '</span></div></div>' +
    '<header class="masthead"><div class="wrap">' +
      '<div class="kicker">Est. 2019</div>' +
      '<a href="index.html"><div class="logo">High <span>Stakes</span> Media</div></a>' +
      '<div class="suits" aria-hidden="true">' + suits + '</div>' +
      '<div class="tagline">All in on the truth.</div>' +
    '</div></header>' +
    '<nav><ul>' + nav + '</ul></nav>' +
    '<div class="ticker" id="ticker" aria-label="Breaking news" hidden>' +
      '<div class="label">Breaking</div><div class="track" id="tickerTrack"></div></div>';

  /* ---------- Footer ---------- */
  var half = Math.ceil(HSM.categories.length / 2);
  function linkList(cats) { return cats.map(function (c) { return '<li><a href="' + c.file + '">' + esc(c.name) + '</a></li>'; }).join(""); }
  $("site-footer").innerHTML =
    '<footer><div class="wrap"><div class="cols">' +
      '<div><div class="logo">High <span style="color:#d4af37">Stakes</span> Media</div>' +
        '<div class="suits" aria-hidden="true" style="text-align:left;padding-left:0;font-size:15px">' + suits + '</div>' +
        '<p>Founded in 2019 by Kivriel. Independent reporting on the Spiritual Adepts of Zenchou.</p></div>' +
      '<div><h6>Sections</h6><ul>' + linkList(HSM.categories.slice(0, half)) + '</ul><ul>' + linkList(HSM.categories.slice(half)) + '</ul></div>' +
      '<div><h6>About</h6><ul>' +
        '<li><a href="staff.html">Our Staff</a></li><li><a href="tips.html">Submit a Tip</a></li>' +
        '<li><a href="advertise.html">Advertise</a></li><li><a href="corrections.html">Corrections</a></li></ul></div>' +
    '</div><div class="legal"><span>© 2019 High Stakes Media · Kivriel, Owner &amp; Publisher. All rights reserved by the Zenchou Press Guild.</span></div></div></footer>';

  /* ---------- Standard sidebar (section and About pages) ---------- */
  var side = $("site-sidebar");
  if (side) {
    side.innerHTML =
      '<div class="most-read"><div class="section-title" style="margin-top:0">Most Read</div>' +
        '<ol id="mostReadList"></ol><p class="empty" id="mostReadEmpty">Nothing here yet.</p></div>' +
      '<div class="ad ad-open"><span class="ad-label">Ad Space Available</span>' +
        '<div class="ad-suits" aria-hidden="true">♠ ♥ ♦ ♣</div><h5>Your Ad Here</h5>' +
        '<p>Local businesses of Zenchou: reach the readers who follow the adepts.</p>' +
        '<a class="btn" href="advertise.html">Reserve This Spot</a></div>' +
      '<div class="newsletter" id="newsletter"></div>';
  }

  /* ---------- Newsletter box ---------- */
  var nl = $("newsletter");
  if (nl) {
    nl.innerHTML = '<h5>The Morning Dispatch</h5><p>Zenchou\'s biggest stories, direct to you via the SuperNat.</p>' +
      '<form><input type="text" placeholder="Your SuperNat handle" aria-label="Your SuperNat handle"><button type="submit">Subscribe</button></form>';
    nl.querySelector("form").addEventListener("submit", function (e) {
      e.preventDefault();
      this.outerHTML = '<p style="color:inherit;margin:0">You\'re subscribed. ✓</p>';
    });
  }

  /* ---------- Contact placeholders ---------- */
  Array.prototype.forEach.call(document.querySelectorAll(".contact"), function (el) { el.textContent = HSM.contact; });

  /* ---------- Theme toggle (dark is default) ---------- */
  var root = document.documentElement, btn = $("themeToggle");
  function label() { btn.textContent = root.getAttribute("data-theme") === "light" ? "☾ Dark" : "☀ Light"; }
  btn.addEventListener("click", function () {
    if (root.getAttribute("data-theme") === "light") root.removeAttribute("data-theme");
    else root.setAttribute("data-theme", "light");
    try { localStorage.setItem("hsm-theme", root.getAttribute("data-theme") || "dark"); } catch (e) {}
    label();
  });
  label();

  /* ---------- Weather: changes every 6 hours, same for everyone ---------- */
  (function () {
    var conditions = [
      ["☀", "Clear skies"], ["🌤", "Mostly sunny"], ["⛅", "Partly cloudy"], ["☁", "Overcast"],
      ["🌦", "Passing showers"], ["🌧", "Steady rain"], ["⛈", "Thunderstorms"], ["🌫", "Morning fog"],
      ["🌬", "Strong winds"], ["❄", "Light snow"]
    ];
    var block = Math.floor(Date.now() / (6 * 60 * 60 * 1000));
    function rand(n) { var x = Math.sin(block * 9301 + n * 49297) * 233280; return x - Math.floor(x); }
    var c = conditions[Math.floor(rand(1) * conditions.length)];
    var temp = Math.round(4 + rand(2) * 24);
    if (c[1] === "Light snow") temp = Math.round(-4 + rand(3) * 5);
    $("weather").textContent = c[0] + " Zenchou City · " + c[1] + ", " + temp + "°C";
  })();

  /* ---------- Breaking bar ---------- */
  var breaking = articles.filter(function (a) { return a.breaking; });
  if (breaking.length) {
    var items = breaking.map(function (a) { return '<span><a href="' + esc(a.url) + '">' + esc(a.title) + '</a></span>'; }).join("");
    $("tickerTrack").innerHTML = items + items;
    $("tickerTrack").style.animationDuration = Math.max(20, breaking.length * 10) + "s";
    $("ticker").hidden = false;
  }

  /* ---------- Most Read ---------- */
  if ($("mostReadList")) {
    var ranked = articles.slice().sort(function (a, b) { return (a.mostRead || 999) - (b.mostRead || 999); }).slice(0, 5);
    if (ranked.length) {
      $("mostReadList").innerHTML = ranked.map(function (a) { return '<li><a href="' + esc(a.url) + '">' + esc(a.title) + '</a></li>'; }).join("");
      $("mostReadEmpty").hidden = true;
    }
  }

  /* ---------- Homepage ---------- */
  if (page === "home") {
    var lead = articles.filter(function (a) { return a.lead; })[0];
    if (lead) {
      $("leadStory").innerHTML = '<a href="' + esc(lead.url) + '">' + artBox(lead, "art-1") + tagFor(lead) +
        '<h2>' + esc(lead.title) + '</h2>' + (lead.summary ? '<p class="dek">' + esc(lead.summary) + '</p>' : '') + byline(lead) + '</a>';
      $("leadStory").hidden = false;
    }
    var tops = articles.filter(function (a) { return a.topStory && a !== lead; }).slice(0, 3);
    if (tops.length) {
      $("topCards").innerHTML = tops.map(function (a, i) {
        return '<article class="card"><a href="' + esc(a.url) + '">' + artBox(a, "art-" + (2 + i)) + tagFor(a) +
          '<h3>' + esc(a.title) + '</h3>' + (a.summary ? '<p>' + esc(a.summary) + '</p>' : '') + '</a></article>';
      }).join("");
      $("topStories").hidden = false;
    }
    if (articles.length) $("latestList").innerHTML = articles.slice(0, 6).map(listStory).join("");

    /* Opinion box: newest Opinion article. Uses its "quote" field if it has one, otherwise the headline. */
    var op = articles.filter(function (a) { return a.section === "Opinion"; })[0];
    if (op) {
      $("opinionBox").innerHTML = '<span class="tag">Opinion</span><a href="' + esc(op.url) + '"><blockquote>' +
        esc(op.quote || op.title) + '</blockquote></a>' +
        (op.author ? '<p class="byline">— <strong>' + esc(op.author) + '</strong></p>' : '');
      $("opinionBox").hidden = false;
    }
  }

  /* ---------- Section pages ---------- */
  var sectionName = document.body.getAttribute("data-section");
  if (sectionName) {
    var inSection = articles.filter(function (a) { return a.section === sectionName; });
    if (inSection.length) $("sectionList").innerHTML = inSection.map(listStory).join("");
  }
})();
