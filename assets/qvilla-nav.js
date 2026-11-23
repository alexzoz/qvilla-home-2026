/**
 * Q Villa Unified Responsive Header & Category Popover Navigation
 * Follows modern-web-guidance:
 * - `navbar` & `content-first-noise-reduction`: Compact single-row desktop nav, single `☰ Menu` popover on mobile/tablet,
 *   scroll-down auto-hide (`scroll-state` container query + passive scroll fallback), `aria-current="page"`,
 *   Popover API (`popover="auto"` via `setAttribute` + `popovertarget` + `@oddbird/popover-polyfill` feature-detected),
 *   CSS Anchor Positioning (`position-area` + `position-try-fallbacks`) with viewport-clamped fixed fallback.
 * - `single-line-overflow`: `min-inline-size: 0` on flex brand wrappers, 1-line ellipsis on desktop, max 2-line clamp on mobile.
 */
(function () {
  if (!Object.hasOwn(HTMLElement.prototype, "popover")) {
    import("https://unpkg.com/@oddbird/popover-polyfill@latest/dist/popover.min.js").catch(function () {});
  }

  var NAV_GROUPS = [
    {
      id: "floors",
      label: "✨ Nội Thất",
      fullLabel: "✨ Nội Thất Theo Tầng (T1 → Tum)",
      accent: "gold",
      sections: [
        {
          heading: "🌟 Tổng Thể Nội Thất & Dự Toán",
          items: [
            { href: "mau-modern-luxury-349.html", icon: "✨", title: "Tổng Duyệt 22 Phối Cảnh Nội Thất Toàn Nhà (T1 → T3)", badge: "Đủ 22 góc" },
            { href: "noi-that-toan-nha.html", icon: "🪑", title: "Dự Toán & Mã Ván Nội Thất Toàn Nhà (Plywood + MDF)" },
            { href: "ho-so-xuong-noi-that.html", icon: "🔧", title: "Hồ Sơ Nội Thất Giao Xưởng (T1 → T3)", badge: "Đủ 3 tầng" },
            { href: "index.html#sec-cost-table", icon: "💰", title: "Bảng Dự Toán Chi Tiết 52 Hạng Mục Hoàn Thiện" }
          ]
        },
        {
          heading: "1️⃣ Tầng 1 → 2️⃣ Tầng 2 → 3️⃣ Tầng 3 → 4️⃣ Tum",
          items: [
            { href: "phong-khach-bep-tang1.html", icon: "🛋️", title: "Tầng 1: Tiền Sảnh • Phòng Khách • Phòng Ăn & Bếp", badge: "5 góc V01→V05" },
            { href: "bep-tang1.html", icon: "🍳", title: "Tầng 1: 3D Tủ Bếp Chữ I, Đảo Bo R400 & Đá Vicostone" },
            { href: "san-sau-tang1.html", icon: "🌿", title: "Tầng 1: 3D Bếp Ướt Sân Sau, Giặt Sấy & Lọc Nước" },
            { href: "phong-master-tang2.html", icon: "👑", title: "Tầng 2: Phòng Master Warm Minimalist WM-06 & Vòng Xuyên Sáng", badge: "WM-06" },
            { href: "phong-ngu-con-gai-t2-t3.html", icon: "🎀", title: "Tầng 2: 2 Phòng Con Gái (7T & 3T • PA WM-06 & Bé Gái)", badge: "2 phòng T2" },
            { href: "phong-ngu-con-gai-t2-t3.html#sec-t3-bedrooms", icon: "🛏️", title: "Tầng 3: 2 Phòng Ngủ (PN3 & PN4 • Đủ 2 Chiều)", badge: "2 phòng T3" },
            { href: "phong-lam-viec-tang3.html", icon: "💻", title: "Tầng 3: Phòng Làm Việc Đôi Vợ Chồng (PA T3-A)" },
            { href: "phong-tho-tang3.html", icon: "🪷", title: "Tầng 3: Phòng Thờ Gia Tiên (Hồ Sơ Chuyên Biệt)" },
            { href: "tang-tum-3d.html", icon: "🧊", title: "Tầng Tum: Mô Hình 3D Tầng Tum, Kho Solar & Sân Thượng" }
          ]
        }
      ]
    },
    {
      id: "struct",
      label: "🧱 Khối Xây & Cửa",
      fullLabel: "🧱 3D Khối Xây • Mặt Tiền & Cửa",
      accent: "sky",
      sections: [
        {
          heading: "🏛️ Khối Xây 3D, Mặt Tiền & Mái Kính",
          items: [
            { href: "khoi-xay-mat-tien-t2-t3-3d.html", icon: "🧱", title: "3D Khối Xây Mặt Tiền T2 – T3 & Chi Tiết Đổ Bù" },
            { href: "mat-tien.html", icon: "🏛️", title: "Phối Cảnh Vật Liệu Mặt Tiền & Sơn Hiệu Ứng" },
            { href: "gieng-troi-mai-kinh-3d.html", icon: "🌤️", title: "3D Mái Kính 03 Đỉnh Giếng Trời & Thoát Gió" },
            { href: "tang-tum-3d.html", icon: "🧊", title: "3D Tầng Tum, Tường Chữ L Che Bồn & Mái Sắt H200" }
          ]
        },
        {
          heading: "🚪 Hệ Cửa Gỗ Lim & Cửa Nhôm Kính",
          items: [
            { href: "cua-chinh-d1.html", icon: "🚪", title: "Cửa Chính Gỗ Lim D1 (PA 1B — 09 Mẫu & Pivot)" },
            { href: "mo-phong-3d-cua-d1.html", icon: "🧊", title: "Mô Phỏng 3D Tương Tác Đóng/Mở Cửa Chính D1" },
            { href: "cua-go-lim-d3.html", icon: "🚪", title: "Hồ Sơ 07 Mẫu Cửa Gỗ Lim Phẳng Hiện Đại D3" },
            { href: "index.html#sec-cost-table", icon: "🪟", title: "Hệ 28 Bộ Cửa Nhôm Kính DCONS (Bản 3.1)" }
          ]
        }
      ]
    },
    {
      id: "finish",
      label: "📐 Gạch • Trần • WC",
      fullLabel: "📐 Chia Gạch • Trần • Sơn & WC",
      accent: "emerald",
      sections: [
        {
          heading: "📐 Hồ Sơ Kỹ Thuật Hoàn Thiện Theo Hạng Mục",
          items: [
            { href: "op-lat-chia-gach.html", icon: "📐", title: "Chia Khổ Gạch 1m/1m2 T1, Gỗ Xương Cá & 4 WC" },
            { href: "tran-thach-cao.html", icon: "✨", title: "Trần Thạch Cao 4 Tầng (T1 → T2 → T3 → Tum)" },
            { href: "son-gach-phoi-mau.html", icon: "🎨", title: "Bảng Phối Màu Sơn Nội/Ngoại Thất & Gạch Đá" },
            { href: "giam-sat-wc.html", icon: "🚽", title: "Giám Sát Kỹ Thuật & Thiết Bị 04 Phòng Vệ Sinh" }
          ]
        }
      ]
    },
    {
      id: "mep",
      label: "⚡ Điện & Đèn",
      fullLabel: "⚡ Điện Aqara & Đèn 3D",
      accent: "amber",
      sections: [
        {
          heading: "⚡ Điện Thông Minh, Chiếu Sáng & Quạt Trần",
          items: [
            { href: "aqara-smarthome.html", icon: "⚡", title: "Bản Đồ Công Tắc Aqara, Schneider & Mạng Wifi PoE" },
            { href: "chieu-sang-osram-3d.html", icon: "💡", title: "Phòng Lab Chiếu Sáng 3D OSRAM & Quạt Trần" }
          ]
        }
      ]
    }
  ];

  function injectStyles() {
    if (document.getElementById("qvilla-unified-nav-css")) return;
    var style = document.createElement("style");
    style.id = "qvilla-unified-nav-css";
    style.textContent = [
      "html { container-type: scroll-state; }",
      ":target { scroll-margin-top: 5.5rem; }",
      "header { padding-block: 7px !important; }",
      "@media (prefers-reduced-motion: no-preference) { header { transition: transform 0.22s ease; } }",
      "@container scroll-state((scrolled: bottom) and (scrollable: top)) {",
      "  header:not(:focus-within):not(:has(:is(:popover-open, .\\:popover-open))) { transform: translateY(-100%); }",
      "}",
      "header.qv-hdr-hidden:not(:focus-within):not(:has(:is(:popover-open, .\\:popover-open))) { transform: translateY(-100%); }",
      "header .header-inner, header .header-row-top { display: flex !important; align-items: center !important; justify-content: space-between !important; flex-wrap: nowrap !important; gap: 10px !important; }",
      "header a.brand { display: flex !important; align-items: center !important; gap: 10px !important; flex: 1 1 auto !important; min-inline-size: 0 !important; }",
      "header .brand-badge { flex: none !important; padding: 5px 10px !important; font-size: 0.72rem !important; }",
      "header .brand-title { flex: 1 1 auto !important; min-inline-size: 0 !important; }",
      "header .brand-title p { display: none !important; }",
      "@media (min-width: 1024px) {",
      "  header .brand-title h1 { font-size: 0.98rem !important; line-height: 1.3 !important; margin: 0 !important; white-space: nowrap !important; overflow: hidden !important; text-overflow: ellipsis !important; }",
      "  .qv-mobile-menu-wrap { display: none !important; }",
      "  .qv-nav-desktop { display: flex !important; align-items: center; gap: 6px; flex-wrap: nowrap; flex: none; }",
      "}",
      "@media (max-width: 1023px) {",
      "  header .container { padding-inline: 12px !important; }",
      "  header .brand-title h1 { font-size: 0.9rem !important; line-height: 1.26 !important; margin: 0 !important; white-space: normal !important; display: -webkit-box !important; -webkit-box-orient: vertical !important; -webkit-line-clamp: 2 !important; line-clamp: 2 !important; overflow: hidden !important; text-wrap: balance; }",
      "  .qv-nav-desktop { display: none !important; }",
      "  .qv-mobile-menu-wrap { display: inline-flex !important; align-items: center; gap: 6px; flex: none; }",
      "}",
      "@media (max-width: 640px) {",
      "  header .brand-badge { display: none !important; }",
      "}",
      ".qv-nav-bar { display: flex; align-items: center; gap: 6px; flex: none; }",
      ".qv-nav-home, .qv-drop-btn, .qv-mob-trigger { appearance: none; display: inline-flex; align-items: center; gap: 5px; font-family: inherit; font-size: 0.77rem; font-weight: 700; line-height: 1.2; padding: 6px 11px; border-radius: 999px; border: 1px solid rgba(148, 163, 184, 0.28); background: rgba(15, 23, 42, 0.82); color: #e2e8f0; text-decoration: none; cursor: pointer; white-space: nowrap; transition: background 0.16s ease, border-color 0.16s ease, color 0.16s ease; }",
      ".qv-mob-trigger { border-color: rgba(245, 158, 11, 0.5); color: #fde68a; background: rgba(30, 41, 59, 0.9); padding: 6px 11px; font-weight: 800; }",
      ".qv-nav-home:hover, .qv-drop-btn:hover, .qv-mob-trigger:hover { color: #ffffff; border-color: #f59e0b; background: rgba(245, 158, 11, 0.18); }",
      ".qv-nav-home:focus-visible, .qv-drop-btn:focus-visible, .qv-mob-trigger:focus-visible, .qv-pop-link:focus-visible { outline: 2px solid #fbbf24; outline-offset: 2px; }",
      ".qv-nav-home[aria-current='page'], .qv-drop-btn.has-current, .qv-drop-btn[aria-expanded='true'], .qv-mob-trigger[aria-expanded='true'] { color: #ffffff; border-color: #f59e0b; background: linear-gradient(135deg, rgba(245, 158, 11, 0.26), rgba(217, 119, 6, 0.18)); box-shadow: 0 0 0 1px rgba(245, 158, 11, 0.28); }",
      ".qv-drop-btn[data-accent='emerald'].has-current, .qv-drop-btn[data-accent='emerald'][aria-expanded='true'] { border-color: #10b981; background: rgba(16, 185, 129, 0.22); box-shadow: 0 0 0 1px rgba(16, 185, 129, 0.3); }",
      ".qv-drop-btn[data-accent='sky'].has-current, .qv-drop-btn[data-accent='sky'][aria-expanded='true'] { border-color: #38bdf8; background: rgba(56, 189, 248, 0.22); box-shadow: 0 0 0 1px rgba(56, 189, 248, 0.3); }",
      ".qv-chev { font-size: 0.68rem; opacity: 0.85; transition: transform 0.16s ease; }",
      "[popovertarget][aria-expanded='true'] .qv-chev { transform: rotate(180deg); }",
      ".qv-popover-panel { padding: 10px; border-radius: 14px; border: 1px solid rgba(245, 158, 11, 0.45); background: rgba(11, 15, 25, 0.98); color: #f8fafc; box-shadow: 0 22px 50px rgba(0, 0, 0, 0.85); min-inline-size: min(320px, calc(100dvw - 16px)); max-inline-size: min(420px, calc(100dvw - 16px)); max-block-size: min(82dvh, 720px); overflow-y: auto; z-index: 9999; }",
      ".qv-popover-panel:not(:is(:popover-open, .\\:popover-open)) { display: none; }",
      ".qv-popover-panel:is(:popover-open, .\\:popover-open) { display: grid; gap: 8px; }",
      "@supports (position-area: block-end) {",
      "  .qv-popover-panel { inset: auto; height: auto; margin: 0; margin-block-start: 6px; position-area: block-end span-inline-end; position-try-fallbacks: flip-block, flip-inline, flip-block flip-inline; }",
      "}",
      "@supports not (position-area: block-end) {",
      "  .qv-popover-panel { position: fixed; inset: auto; height: auto; margin: 0; }",
      "}",
      "@media print { .qv-nav-bar, .qv-popover-panel { display: none !important; } }",
      "@media (prefers-reduced-motion: no-preference) {",
      "  .qv-popover-panel { opacity: 0; translate: 0 -4px; transition: opacity 0.14s ease, translate 0.14s ease, display 0.14s ease, overlay 0.14s ease; transition-behavior: allow-discrete; }",
      "  .qv-popover-panel:is(:popover-open, .\\:popover-open) { opacity: 1; translate: 0 0; }",
      "  @starting-style { .qv-popover-panel:is(:popover-open, .\\:popover-open) { opacity: 0; translate: 0 -4px; } }",
      "}",
      ".qv-pop-sec-title { font-size: 0.7rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; color: #94a3b8; padding: 4px 8px 2px; }",
      ".qv-pop-hr { border: 0; border-top: 1px solid rgba(148, 163, 184, 0.16); margin: 2px 0; }",
      ".qv-pop-list { list-style: none; margin: 0; padding: 0; display: grid; gap: 3px; }",
      ".qv-pop-link { display: flex; align-items: center; gap: 9px; padding: 7px 10px; border-radius: 9px; text-decoration: none; color: #e2e8f0; font-size: 0.81rem; font-weight: 650; border-inline-start: 3px solid transparent; transition: background 0.14s ease, color 0.14s ease; }",
      ".qv-pop-link:hover { background: rgba(245, 158, 11, 0.15); color: #ffffff; }",
      ".qv-pop-link[aria-current='page'] { background: rgba(245, 158, 11, 0.2); color: #fde68a; font-weight: 800; border-inline-start-color: #f59e0b; }",
      ".qv-pop-ico { flex: none; inline-size: 1.3rem; text-align: center; font-size: 0.95rem; }",
      ".qv-pop-txt { flex: 1; line-height: 1.35; }",
      ".qv-pop-badge { flex: none; font-size: 0.68rem; font-weight: 800; padding: 2px 7px; border-radius: 999px; background: rgba(16, 185, 129, 0.2); color: #6ee7b7; border: 1px solid rgba(16, 185, 129, 0.45); }",
      ".qv-mob-quick-row { display: flex; flex-wrap: wrap; gap: 6px; padding: 2px 4px 4px; }"
    ].join("\n");
    document.head.appendChild(style);
  }

  function positionFallback(trigger, panel) {
    if (CSS.supports("position-area", "block-end")) return;
    var tRect = trigger.getBoundingClientRect();
    var pRect = panel.getBoundingClientRect();
    var vw = window.innerWidth;
    var vh = window.innerHeight;
    var top = tRect.bottom + 6;
    if (top + pRect.height > vh - 8 && tRect.top - 6 - pRect.height >= 8) {
      top = tRect.top - pRect.height - 6;
    } else if (top + pRect.height > vh - 8) {
      top = Math.max(8, vh - pRect.height - 8);
    }
    var left = tRect.right - pRect.width;
    if (left < 8) {
      left = Math.max(8, Math.min(tRect.left, vw - pRect.width - 8));
    }
    panel.style.top = Math.round(top) + "px";
    panel.style.left = Math.round(left) + "px";
  }

  function wirePopoverPair(trigger, panel) {
    if (!trigger || !panel || panel.dataset.qvWired === "1") return;
    panel.dataset.qvWired = "1";
    panel.addEventListener("toggle", function (e) {
      var isOpen = e.newState === "open";
      trigger.setAttribute("aria-expanded", isOpen ? "true" : "false");
      if (isOpen) {
        var hdr = trigger.closest("header");
        if (hdr) hdr.classList.remove("qv-hdr-hidden");
        positionFallback(trigger, panel);
      }
    });
    panel.addEventListener("click", function (e) {
      var link = e.target.closest("a[href], [data-close-popover='1']");
      if (link && typeof panel.hidePopover === "function") {
        try { panel.hidePopover(); } catch (_) {}
      }
    });
  }

  window.initQVillaPopovers = function (root) {
    var scope = root || document;
    var buttons = scope.querySelectorAll("button[popovertarget]");
    buttons.forEach(function (btn) {
      var targetId = btn.getAttribute("popovertarget");
      var panel = targetId ? document.getElementById(targetId) : null;
      if (panel && panel.classList.contains("qv-popover-panel")) {
        wirePopoverPair(btn, panel);
      }
    });
  };

  function currentPageFile() {
    var seg = (window.location.pathname || "").split("/").pop();
    return seg && seg.indexOf(".html") !== -1 ? seg : "index.html";
  }

  function appendGroupSections(panel, secList, curFile) {
    var groupHasCurrent = false;
    secList.forEach(function (sec, sIdx) {
      if (sIdx > 0) {
        var hr = document.createElement("hr");
        hr.className = "qv-pop-hr";
        panel.appendChild(hr);
      }
      var h = document.createElement("div");
      h.className = "qv-pop-sec-title";
      h.textContent = sec.heading;
      panel.appendChild(h);

      var ul = document.createElement("ul");
      ul.className = "qv-pop-list";
      sec.items.forEach(function (it) {
        var li = document.createElement("li");
        var a = document.createElement("a");
        a.href = it.href;
        a.className = "qv-pop-link";
        var itemFile = it.href.split("#")[0].split("?")[0];
        if (itemFile === curFile && it.href.indexOf("#") === -1) {
          a.setAttribute("aria-current", "page");
          groupHasCurrent = true;
        }
        a.innerHTML =
          "<span class='qv-pop-ico' aria-hidden='true'>" + it.icon + "</span>" +
          "<span class='qv-pop-txt'>" + it.title + "</span>" +
          (it.badge ? "<span class='qv-pop-badge'>" + it.badge + "</span>" : "");
        li.appendChild(a);
        ul.appendChild(li);
      });
      panel.appendChild(ul);
    });
    return groupHasCurrent;
  }

  function setupScrollHideFallback() {
    if (CSS.supports("container-type", "scroll-state")) return;
    var bar = document.querySelector("header");
    if (!bar) return;
    var lastY = window.scrollY;
    window.addEventListener("scroll", function () {
      var maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      var y = Math.max(0, Math.min(window.scrollY, maxScroll));
      if (Math.abs(y - lastY) < 6) return;
      bar.classList.toggle("qv-hdr-hidden", y > lastY && y > bar.offsetHeight + 20);
      lastY = y;
    }, { passive: true });
  }

  function buildUnifiedNav() {
    injectStyles();
    setupScrollHideFallback();
    var navEl = document.querySelector("header nav.nav-links, header nav.nav-pills, header .nav-links, [data-qvilla-nav]");
    if (!navEl || navEl.dataset.qvBuilt === "1") return;
    navEl.dataset.qvBuilt = "1";

    var preservedButtons = Array.prototype.slice.call(navEl.querySelectorAll("button:not([popovertarget])"));
    var curFile = currentPageFile();
    navEl.className = "qv-nav-bar";
    navEl.setAttribute("aria-label", "Điều hướng theo tầng và hạng mục công trình Q Villa");
    navEl.innerHTML = "";

    /* 1. Desktop single-row inline navigation */
    var desktopWrap = document.createElement("div");
    desktopWrap.className = "qv-nav-desktop";

    var homeLink = document.createElement("a");
    homeLink.href = "index.html";
    homeLink.className = "qv-nav-home";
    homeLink.innerHTML = "<span aria-hidden='true'>🏠</span><span>Trang Chủ</span>";
    if (curFile === "index.html") {
      homeLink.setAttribute("aria-current", "page");
    }
    desktopWrap.appendChild(homeLink);

    if (curFile === "index.html") {
      var costLink = document.createElement("a");
      costLink.href = "#sec-cost-table";
      costLink.className = "qv-nav-home";
      costLink.innerHTML = "<span aria-hidden='true'>💰</span><span>Dự Toán (52)</span>";
      desktopWrap.appendChild(costLink);
    }

    NAV_GROUPS.forEach(function (grp, idx) {
      var popId = "qv-hdr-pop-" + grp.id + "-" + idx;
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "qv-drop-btn";
      btn.dataset.accent = grp.accent;
      btn.setAttribute("popovertarget", popId);
      btn.setAttribute("aria-controls", popId);
      btn.setAttribute("aria-expanded", "false");
      btn.setAttribute("aria-label", grp.fullLabel.replace(/^[^\wÀ-ỹ]+/, ""));

      var panel = document.createElement("div");
      panel.id = popId;
      panel.className = "qv-popover-panel";
      panel.setAttribute("popover", "auto");

      var groupHasCurrent = appendGroupSections(panel, grp.sections, curFile);
      if (groupHasCurrent) {
        btn.classList.add("has-current");
      }
      btn.innerHTML =
        "<span>" + grp.label + "</span>" +
        "<span class='qv-chev' aria-hidden='true'>▾</span>";

      desktopWrap.appendChild(btn);
      desktopWrap.appendChild(panel);
      wirePopoverPair(btn, panel);
    });

    preservedButtons.forEach(function (actionBtn) {
      desktopWrap.appendChild(actionBtn);
    });

    /* 2. Mobile / Tablet compact single `☰ Menu` popover */
    var mobileWrap = document.createElement("div");
    mobileWrap.className = "qv-mobile-menu-wrap";

    var mobPopId = "qv-mobile-drawer-pop";
    var mobBtn = document.createElement("button");
    mobBtn.type = "button";
    mobBtn.className = "qv-mob-trigger";
    mobBtn.setAttribute("popovertarget", mobPopId);
    mobBtn.setAttribute("aria-controls", mobPopId);
    mobBtn.setAttribute("aria-expanded", "false");
    mobBtn.innerHTML = "<span aria-hidden='true'>☰</span><span>Menu</span><span class='qv-chev' aria-hidden='true'>▾</span>";

    var mobPanel = document.createElement("div");
    mobPanel.id = mobPopId;
    mobPanel.className = "qv-popover-panel";
    mobPanel.setAttribute("popover", "auto");

    var quickRow = document.createElement("div");
    quickRow.className = "qv-mob-quick-row";
    var mobHome = document.createElement("a");
    mobHome.href = "index.html";
    mobHome.className = "qv-nav-home";
    mobHome.innerHTML = "<span aria-hidden='true'>🏠</span><span>Trang Chủ Q Villa</span>";
    if (curFile === "index.html") {
      mobHome.setAttribute("aria-current", "page");
    }
    quickRow.appendChild(mobHome);

    preservedButtons.forEach(function (origBtn) {
      var cloneBtn = origBtn.cloneNode(true);
      cloneBtn.setAttribute("data-close-popover", "1");
      quickRow.appendChild(cloneBtn);
    });
    mobPanel.appendChild(quickRow);

    NAV_GROUPS.forEach(function (grp) {
      var hr = document.createElement("hr");
      hr.className = "qv-pop-hr";
      mobPanel.appendChild(hr);
      appendGroupSections(mobPanel, grp.sections, curFile);
    });

    mobileWrap.appendChild(mobBtn);
    mobileWrap.appendChild(mobPanel);
    wirePopoverPair(mobBtn, mobPanel);

    navEl.appendChild(desktopWrap);
    navEl.appendChild(mobileWrap);

    window.initQVillaPopovers(document);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", buildUnifiedNav);
  } else {
    buildUnifiedNav();
  }
})();
