/**
 * Q Villa Unified Floor-Ordered & Category Popover Navigation
 * Follows modern-web-guidance: Popover API (`popover="auto"` + `popovertarget`),
 * CSS Anchor Positioning (`position-area` + `position-try-fallbacks`) gated with `@supports`,
 * viewport-clamped fallback positioning, and `aria-current="page"`.
 */
(function () {
  if (!Object.hasOwn(HTMLElement.prototype, "popover")) {
    import("https://unpkg.com/@oddbird/popover-polyfill@latest/dist/popover.min.js").catch(function () {});
  }

  var NAV_GROUPS = [
    {
      id: "floors",
      label: "✨ Nội Thất Theo Tầng (T1 → Tum)",
      accent: "gold",
      sections: [
        {
          heading: "🌟 Tổng Thể Nội Thất 349 × Travertine & Dự Toán",
          items: [
            { href: "mau-modern-luxury-349.html", icon: "✨", title: "Tổng Duyệt Phối Cảnh 349 × Travertine (T1 → T3)", badge: "Mới chốt" },
            { href: "noi-that-toan-nha.html", icon: "🪑", title: "Dự Toán & Mã Ván Nội Thất Toàn Nhà (Plywood + MDF)" },
            { href: "ho-so-xuong-noi-that.html", icon: "🔧", title: "Hồ Sơ Đa Góc 360° & Bản Vẽ Đóng Tủ Giao Xưởng" },
            { href: "index.html#sec-cost-table", icon: "💰", title: "Bảng Dự Toán Chi Tiết 52 Hạng Mục Hoàn Thiện" }
          ]
        },
        {
          heading: "1️⃣ Tầng 1 → 2️⃣ Tầng 2 → 3️⃣ Tầng 3 → 4️⃣ Tum",
          items: [
            { href: "phong-khach-bep-tang1.html", icon: "🛋️", title: "Tầng 1: Tiền Sảnh • Phòng Khách • Phòng Ăn & Bếp", badge: "5 góc V01→V05" },
            { href: "bep-tang1.html", icon: "🍳", title: "Tầng 1: 3D Tủ Bếp Chữ I, Đảo Bo R400 & Đá Vicostone" },
            { href: "san-sau-tang1.html", icon: "🌿", title: "Tầng 1: 3D Bếp Ướt Sân Sau, Giặt Sấy & Lọc Nước" },
            { href: "phong-master-tang2.html", icon: "👑", title: "Tầng 2: Phòng Master 100% Vân Gỗ & Vòng Xuyên Sáng", badge: "Mới chốt" },
            { href: "phong-lam-viec-tang3.html", icon: "💻", title: "Tầng 3: Phòng Làm Việc Đôi Vợ Chồng (PA T3-A)" },
            { href: "phong-tho-tang3.html", icon: "🪷", title: "Tầng 3: Phòng Thờ Gia Tiên (Hồ Sơ Chuyên Biệt)" },
            { href: "tang-tum-3d.html", icon: "🧊", title: "Tầng Tum: Mô Hình 3D Tầng Tum, Kho Solar & Sân Thượng" }
          ]
        }
      ]
    },
    {
      id: "struct",
      label: "🧱 3D Khối Xây • Mặt Tiền & Cửa",
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
            { href: "cua-go-lim-d3.html", icon: "🚪", title: "Hồ Sơ 07 Mẫu Cửa Gỗ Lim Thông Phòng D3" },
            { href: "index.html#sec-cost-table", icon: "🪟", title: "Hệ 28 Bộ Cửa Nhôm Kính DCONS (Bản 3.1)" }
          ]
        }
      ]
    },
    {
      id: "finish",
      label: "📐 Chia Gạch • Trần • Sơn & WC",
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
      label: "⚡ Điện Aqara & Đèn 3D",
      accent: "amber",
      sections: [
        {
          heading: "⚡ Điện Thông Minh, Chiếu Sáng & Quạt Trần",
          items: [
            { href: "aqara-smarthome.html", icon: "⚡", title: "Bản Đồ Công Tắc Aqara, Schneider & Mạng Wifi PoE" },
            { href: "chieu-sang-opple-3d.html", icon: "💡", title: "Phòng Lab Chiếu Sáng 3D OPPLE & Quạt Trần" }
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
      ".qv-nav-bar { display: flex; align-items: center; gap: 7px; flex-wrap: wrap; }",
      ".qv-nav-home, .qv-drop-btn { appearance: none; display: inline-flex; align-items: center; gap: 6px; font-family: inherit; font-size: 0.79rem; font-weight: 700; line-height: 1.2; padding: 7px 12px; border-radius: 999px; border: 1px solid rgba(148, 163, 184, 0.26); background: rgba(15, 23, 42, 0.78); color: #e2e8f0; text-decoration: none; cursor: pointer; white-space: nowrap; transition: background 0.16s ease, border-color 0.16s ease, color 0.16s ease; }",
      ".qv-nav-home:hover, .qv-drop-btn:hover { color: #ffffff; border-color: #f59e0b; background: rgba(245, 158, 11, 0.18); }",
      ".qv-nav-home:focus-visible, .qv-drop-btn:focus-visible, .qv-pop-link:focus-visible { outline: 2px solid #fbbf24; outline-offset: 2px; }",
      ".qv-nav-home[aria-current='page'], .qv-drop-btn.has-current, .qv-drop-btn[aria-expanded='true'] { color: #ffffff; border-color: #f59e0b; background: linear-gradient(135deg, rgba(245, 158, 11, 0.26), rgba(217, 119, 6, 0.18)); box-shadow: 0 0 0 1px rgba(245, 158, 11, 0.28); }",
      ".qv-drop-btn[data-accent='emerald'].has-current, .qv-drop-btn[data-accent='emerald'][aria-expanded='true'] { border-color: #10b981; background: rgba(16, 185, 129, 0.22); box-shadow: 0 0 0 1px rgba(16, 185, 129, 0.3); }",
      ".qv-drop-btn[data-accent='sky'].has-current, .qv-drop-btn[data-accent='sky'][aria-expanded='true'] { border-color: #38bdf8; background: rgba(56, 189, 248, 0.22); box-shadow: 0 0 0 1px rgba(56, 189, 248, 0.3); }",
      ".qv-chev { font-size: 0.7rem; opacity: 0.85; transition: transform 0.16s ease; }",
      ".qv-drop-btn[aria-expanded='true'] .qv-chev { transform: rotate(180deg); }",
      ".qv-popover-panel { padding: 10px; border-radius: 14px; border: 1px solid rgba(245, 158, 11, 0.45); background: rgba(11, 15, 25, 0.98); color: #f8fafc; box-shadow: 0 22px 50px rgba(0, 0, 0, 0.85); min-inline-size: min(340px, calc(100dvw - 16px)); max-inline-size: min(420px, calc(100dvw - 16px)); max-block-size: min(78dvh, 620px); overflow-y: auto; z-index: 9999; }",
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
      ".qv-pop-link { display: flex; align-items: center; gap: 9px; padding: 8px 10px; border-radius: 9px; text-decoration: none; color: #e2e8f0; font-size: 0.82rem; font-weight: 650; border-inline-start: 3px solid transparent; transition: background 0.14s ease, color 0.14s ease; }",
      ".qv-pop-link:hover { background: rgba(245, 158, 11, 0.15); color: #ffffff; }",
      ".qv-pop-link[aria-current='page'] { background: rgba(245, 158, 11, 0.2); color: #fde68a; font-weight: 800; border-inline-start-color: #f59e0b; }",
      ".qv-pop-ico { flex: none; inline-size: 1.3rem; text-align: center; font-size: 0.95rem; }",
      ".qv-pop-txt { flex: 1; line-height: 1.35; }",
      ".qv-pop-badge { flex: none; font-size: 0.68rem; font-weight: 800; padding: 2px 7px; border-radius: 999px; background: rgba(16, 185, 129, 0.2); color: #6ee7b7; border: 1px solid rgba(16, 185, 129, 0.45); }"
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
    var left = tRect.left;
    if (left + pRect.width > vw - 8) {
      left = Math.max(8, vw - pRect.width - 8);
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
        positionFallback(trigger, panel);
      }
    });
    panel.addEventListener("click", function (e) {
      var link = e.target.closest("a[href]");
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

  function buildUnifiedNav() {
    injectStyles();
    var navEl = document.querySelector("header nav.nav-links, header nav.nav-pills, header .nav-links, [data-qvilla-nav]");
    if (!navEl || navEl.dataset.qvBuilt === "1") return;
    navEl.dataset.qvBuilt = "1";

    var preservedButtons = Array.prototype.slice.call(navEl.querySelectorAll("button:not([popovertarget])"));
    var curFile = currentPageFile();
    navEl.className = "qv-nav-bar";
    navEl.setAttribute("aria-label", "Điều hướng theo tầng và hạng mục công trình Q Villa");
    navEl.innerHTML = "";

    var homeLink = document.createElement("a");
    homeLink.href = "index.html";
    homeLink.className = "qv-nav-home";
    homeLink.innerHTML = "<span aria-hidden='true'>🏠</span><span>Trang Chủ</span>";
    if (curFile === "index.html") {
      homeLink.setAttribute("aria-current", "page");
    }
    navEl.appendChild(homeLink);

    if (curFile === "index.html") {
      var costLink = document.createElement("a");
      costLink.href = "#sec-cost-table";
      costLink.className = "qv-nav-home";
      costLink.innerHTML = "<span aria-hidden='true'>💰</span><span>Bảng Dự Toán (52 Mục)</span>";
      navEl.appendChild(costLink);
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

      var groupHasCurrent = false;
      var panel = document.createElement("div");
      panel.id = popId;
      panel.className = "qv-popover-panel";
      panel.setAttribute("popover", "auto");

      grp.sections.forEach(function (sec, sIdx) {
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

      if (groupHasCurrent) {
        btn.classList.add("has-current");
      }
      btn.innerHTML =
        "<span>" + grp.label + "</span>" +
        "<span class='qv-chev' aria-hidden='true'>▾</span>";

      navEl.appendChild(btn);
      navEl.appendChild(panel);
      wirePopoverPair(btn, panel);
    });

    preservedButtons.forEach(function (actionBtn) {
      navEl.appendChild(actionBtn);
    });

    window.initQVillaPopovers(document);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", buildUnifiedNav);
  } else {
    buildUnifiedNav();
  }
})();
