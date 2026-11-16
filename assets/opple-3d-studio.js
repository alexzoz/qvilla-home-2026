/**
 * Q VILLA (XHOME) — OPPLE 3D LIGHTING SIMULATION, DIALUX LUX HEATMAP & GIMBAL AIMING STUDIO
 * Built with Three.js (r128) for real-time architectural lighting, volumetric cones,
 * ON/OFF emotional scenarios (no dimmer required), and spotlight tilt/rotation aiming.
 */
(function () {
  'use strict';

  const ZONE_CONFIGS = {
    T1: {
      id: 'T1',
      title: 'Tầng 1 (Chuẩn CAD CĐ-11 & KT-4.06): Phòng Khách • Tiền Sảnh • Phòng Ăn • Bếp & Đảo Bếp',
      subtitle: 'Khớp 100% tọa độ CAD: 4 đèn Tiền sảnh (Lộ 1) • 12 đèn viền chữ nhật 4×4 P.Khách (Lộ 3) • Lộ 5A dọc khe gió + hành lang • Cụm 3 đèn 7W dọc Đảo bếp + 5 đèn chữ T Bếp (Lộ 12)',
      dims: { w: 11.4, d: 6.2, h: 3.53 },
      targetLuxLabel: '300 – 550 Lux (Chuẩn TCVN 7114)',
      optionLabel: 'Chuyển đổi: Bản Vẽ Điện CĐ-11 (02 Quạt Trần Đèn Lộ 6 & 6A) ↔ Bản Vẽ Trần KT-4.06 (Đèn Spotlight Đôi Không Quạt)',
      cameras: {
        iso:   { pos: [0.4, 7.5, 10.4], target: [0, 1.0, -0.1], name: '🎥 1. Phối Cảnh Tổng Thể Tầng 1' },
        top:   { pos: [0, 12.6, 0.01], target: [0, 0, 0], name: '🗺️ 2. Mặt Bằng Chuẩn CAD CĐ-11 / KT-4.06 (Top-Down)' },
        ceil:  { pos: [0, 0.65, 0.2], target: [0, 3.53, -0.2], name: '🔼 3. Nhìn Ngước Lên Trần (Soi Khe Gió & Vị Trí Đèn)' },
        eye:   { pos: [-3.15, 1.15, 0.8], target: [-3.15, 1.4, -2.6], name: '🛋️ 4. Góc Ngồi Phòng Khách Nhìn Vách TV' },
        sect:  { pos: [0, 1.85, 8.8], target: [0, 1.6, -0.2], name: '📐 5. Mặt Cắt Ngang Tia Sáng & Cánh Quạt' }
      },
      circuits: [
        { id: 'L1', code: 'Lộ 1 (Tiền Sảnh)', name: '4 Spotlight 4 Góc Ô Trần Tiền Sảnh (12W 4000K — 2090×1125mm)', watt: 48, cct: 4000, luxContrib: 85, on: true, aimable: false },
        { id: 'L2', code: 'Lộ 2+4 (LED Dây —LED—)', name: 'LED Dây COB Hắt Khe Trần Giật Cấp Tiền Sảnh (Lộ 2) & P.Khách 2370mm (Lộ 4 — Chi Tiết 01)', watt: 110, cct: 3000, luxContrib: 55, on: true, aimable: false },
        { id: 'L5_TRACK', code: 'Lộ 5 (Khung Ray P.Khách)', name: 'Khung Chữ Nhật Ray Nam Châm / Thanh LED Âm Trần Lòng P.Khách (1825mm — Lùi 215mm Trong Khe Hắt Lộ 4)', watt: 64, cct: 4000, luxContrib: 110, on: true, aimable: false },
        { id: 'L3', code: 'Lộ 3 (Viền P.Khách)', name: '12 Spotlight Khung Chữ Nhật 4×4 Quanh P.Khách (Ngoài 2 khe điều hòa)', watt: 144, cct: 4000, luxContrib: 260, on: true, aimable: true, defaultTilt: 15, defaultYaw: 0, beam: 24, role: '4 bóng hàng Bắc (cách đều 1220mm) + 4 bóng hàng Nam + 2 bóng cột Tây + 2 bóng cột Đông chuẩn KT-4.06' },
        { id: 'L6', code: 'Lộ 6 (Tâm P.Khách)', name: 'Quạt Trần Kèm Đèn LED Tâm P.Khách (CĐ-11) / 2 Cặp Spotlight Đôi (KT-4.06)', watt: 55, cct: 3500, luxContrib: 160, on: true, aimable: false },
        { id: 'L5A', code: 'Lộ 5A (Khu Ăn & Sảnh)', name: 'Cột 3 Spotlight Dọc Khe Gió (1200+1200mm) + Hàng Ngang Sảnh Thang (1700+1700mm)', watt: 60, cct: 4000, luxContrib: 190, on: true, aimable: true, defaultTilt: 8, defaultYaw: 0, beam: 24, role: 'Đúng lộ dây 5A trên CĐ-11: 3 bóng dọc giữa Bàn ăn & Đảo bếp + 2 bóng ngang trước thang/WC1' },
        { id: 'L6A', code: 'Lộ 6A (Tâm Bàn Ăn)', name: 'Quạt Trần Kèm Đèn LED Tâm Bàn Ăn (CĐ-11) / Cặp Spotlight Đôi 200mm (KT-4.06)', watt: 55, cct: 3000, luxContrib: 240, on: true, aimable: false },
        { id: 'L12', code: 'Lộ 12+10 (Bếp & Đảo)', name: 'Cụm 3 Đèn 7W Dọc Đảo Bếp (Cách 200mm) + 5 Đèn 12W Chữ T Giữa 2 Khe Gió Bếp + LED Tủ Bếp', watt: 126, cct: 4000, luxContrib: 290, on: true, aimable: true, defaultTilt: 8, defaultYaw: 180, beam: 24, role: 'Đúng lộ 12 trên CĐ-11: 3 bóng 7W xếp dọc (200+200mm) trên Đảo bếp + 3 bóng ngang bàn bếp trên + 2 bóng dọc giữa 2 khe gió điều hòa' }
      ],
      scenes: [
        { id: 'guest', name: '✨ 1. Đón Khách & Bật Quạt Trần Mát Thoáng (Chuẩn CĐ-11)', desc: 'Bật đủ Lộ 1 (4 bóng sảnh) + Lộ 2+4 (LED dây) + Lộ 5 (Khung ray P.Khách) + Lộ 3 (12 bóng 4×4) + Quạt đèn Lộ 6 & 6A', activeCircuits: ['L1', 'L2', 'L5_TRACK', 'L3', 'L6', 'L5A', 'L6A'], presetTilt: 15, targetLux: 520, ugr: '14.2 (Không bóng cánh quạt)' },
        { id: 'cad_full', name: '📐 2. Bật Toàn Bộ Đèn Tầng 1 Để Đối Chiếu Bản Vẽ CĐ-11', desc: 'Bật sáng tất cả các lộ Tầng 1 (Lộ 1, 2+4, 5, 3, 6, 5A, 6A, 12) — Bấm Góc Camera số 2 (Top-Down) để soi khớp 100% với bản vẽ', activeCircuits: ['L1', 'L2', 'L5_TRACK', 'L3', 'L6', 'L5A', 'L6A', 'L12'], presetTilt: 12, targetLux: 550, ugr: '14.5 (Chuẩn bản vẽ CAD)' },
        { id: 'fan_breeze', name: '🍃 3. Ngồi Chơi / Ăn Cơm Mát Tự Nhiên (Không Bật Điều Hòa)', desc: 'Chỉ bật 2 Quạt trần kèm đèn (Lộ 6 + Lộ 6A) + LED hắt Lộ 2+4 — Gió mát khắp Tầng 1, siêu tiết kiệm điện', activeCircuits: ['L2', 'L6', 'L6A'], presetTilt: 15, targetLux: 265, ugr: '12.5 (Dịu mát)' },
        { id: 'cook', name: '🍳 4. Nấu Ăn & Đảo Bếp (550 Lux)', desc: 'Bật Lộ 12 (3 đèn dọc Đảo bếp + 5 đèn chữ T Bếp + LED đáy tủ) + Lộ 6A + Lộ 5A', activeCircuits: ['L5A', 'L6A', 'L12'], presetTilt: 10, targetLux: 550, ugr: '15.0 (Chuẩn bếp)' },
        { id: 'movie', name: '🎬 5. Xem Phim / Nghe Nhạc', desc: 'Tắt hết Spotlight trần Lộ 3 & Khung ray Lộ 5, chỉ giữ LED dây hắt trần Lộ 2+4 (Quạt Lộ 6 chỉ quay gió)', activeCircuits: ['L2'], presetTilt: 15, targetLux: 55, ugr: '< 10 (Không chói TV)' }
      ]
    },

    T2: {
      id: 'T2',
      title: 'Tầng 2 — Phòng Master Open-Suite (Chuẩn Thiết Kế 980f20f6 & KT-4.02 / CĐ-12): Khu Ngủ Bắc • Khu Thay Đồ & Bàn Đảo Giữa • WC-02 Nam',
      subtitle: 'Trục Bắc–Nam (7.23m): Khu Ngủ (Bắc 3.01m, Tủ Âm Tường #3 Đông, Logia 01 Tây, 2 Đèn Đôi Giữa Giường Bẻ 25°) • Ghế Bench & Máy Lạnh IN 2.3 Tại Trục B • Khu Thay Đồ (Giữa 2.70m: Vòm Mặt Trăng Ø1.2m, Bàn Đảo Kính, Tủ #1-#2, Bàn Phấn O2) • WC-02 (Nam 1.52m, 3 Khoang)',
      dims: { w: 6.4, d: 7.8, h: 3.13 },
      targetLuxLabel: '45 – 150 Lux (Khu Ngủ) | 380 – 450 Lux (Bàn Đảo Kính, Tủ Áo #1-#3 & Bàn Phấn O2)',
      optionLabel: 'Chuyển đổi Phương Án Master Tầng 2: Phương Án Open-Suite (Vòm Mặt Trăng Ø1.2m + Bàn Đảo Kính + Ghế Bench Trục B) ↔ Bản Vẽ Gốc CĐ-12 / KT-4.02 (Có Vách Tivi Trục B + 6 Đèn Thay Đồ 2×3)',
      cameras: {
        iso:   { pos: [5.2, 6.8, 7.6], target: [0.0, 1.0, 0.0], name: '🎥 1. Phối Cảnh Tổng Thể Master Tầng 2 (Bắc – Nam)' },
        top:   { pos: [0, 12.4, 0.01], target: [0, 0, 0], name: '🗺️ 2. Mặt Bằng Chuẩn Thiết Kế Master & KT-4.02 (Top-Down)' },
        eye:   { pos: [0.0, 0.85, -3.10], target: [0.0, 1.55, 1.20], name: '🛌 3. Nằm Trên Giường Nhìn Qua Ghế Bench & Bàn Đảo Kính (Test Chói!)' },
        ceil:  { pos: [0.0, 1.25, -0.85], target: [0.0, 1.05, 0.95], name: '💎 4. Góc Nhìn Vòm Mặt Trăng Ø1.2m • Bàn Đảo Kính • Tủ #1-#2 & Bàn O2' },
        sect:  { pos: [6.8, 1.85, -0.20], target: [-0.4, 1.45, -0.20], name: '📐 5. Mặt Cắt Dọc Bắc – Nam (Khu Ngủ → Bench Trục B → Bàn Đảo → WC-02)' }
      },
      circuits: [
        { id: 'M14', code: 'Lộ 14 (Hắt Khu Ngủ)', name: 'LED Dây COB 3000K Hắt Hộp Trần Khu Ngủ Bo Góc (2.60×2.45m) & Hốc Rèm Tự Động Logia 01', watt: 120, cct: 3000, luxContrib: 45, on: true, aimable: false },
        { id: 'M15C', code: 'Lộ 15B / 16-Giữa', name: 'Cặp 2 Spotlight Chóa Sâu 7W Cách 200mm Giữa Giường (BẮT BUỘC Bẻ 25° Về Ghế Bench Cuối Giường)', watt: 14, cct: 3000, luxContrib: 80, on: true, aimable: true, defaultTilt: 25, defaultYaw: 0, beam: 24, role: 'Đặt tại tâm hộp trần giường ngủ (cách tường Bắc 1.45m), bẻ chóa 25° về hướng Nam (Ghế Bench) để nằm ngửa không chói mắt' },
        { id: 'M15P', code: 'Lộ 15A (6 Đèn Khu Ngủ)', name: '6 Spotlight 9W Khu Ngủ: 2 Đèn Đầu Giường + 2 Đèn Bẻ 18° Rọi Tủ Âm Tường #3 (Đông) + 2 Đèn Lối Cửa Lùa Tây', watt: 54, cct: 3000, luxContrib: 135, on: true, aimable: true, defaultTilt: 18, defaultYaw: 90, beam: 24, role: '2 bóng đầu giường rửa vách gỗ Bắc + 2 bóng bên Đông bẻ 18° rọi thẳng vào Tủ Áo Âm Tường #3 (2.010mm) + 2 bóng hành lang Tây' },
        { id: 'M16', code: 'Lộ 16 (Vách & Tab Ngủ)', name: '2 Khe LED Hắt Dọc Vách Gỗ Xương Cá Đầu Giường + 2 Đèn Ngủ Táp Đầu Giường (2700K)', watt: 24, cct: 2700, luxContrib: 35, on: true, aimable: false },
        { id: 'M18A', code: 'Lộ 18A (Vòm Mặt Trăng)', name: 'Vòm Tròn Xuyên Sáng Barrisol Ø1.200mm (60W) Tâm Khu Thay Đồ + Khe Hắt Trần Rọi Xuống Bàn Đảo Kính', watt: 60, cct: 3500, luxContrib: 220, on: true, aimable: false },
        { id: 'M18B', code: 'Lộ 18B (4 Spotlight Thay Đồ)', name: '4 Spotlight Chóa Sâu 9W 4000K CRI≥92: 2 Bóng Bẻ 18° Rọi Tủ #1-#2 (Nam) + 2 Bóng Bẻ 15° Rọi Bàn Phấn/LV Cửa Sổ O2 (Tây)', watt: 36, cct: 4000, luxContrib: 180, on: true, aimable: true, defaultTilt: 18, defaultYaw: 0, beam: 24, role: '2 bóng trước Tủ #1 & #2 bẻ 18° về hướng Nam (Yaw 0°) rọi sâu vào lòng tủ + 2 bóng trên Bàn treo cửa sổ O2 bẻ 15° về hướng Tây' },
        { id: 'M19', code: 'Lộ 19 (LED Nội Thất)', name: 'LED Cảm Biến Tủ Kính #1-#3 + LED Mặt Kính & Hốc Bàn Đảo + Kệ Túi Xách Kính Đen + 2 Cột Bo Tròn O2 + Gương Toàn Thân', watt: 85, cct: 3000, luxContrib: 140, on: true, aimable: false },
        { id: 'M20', code: 'Lộ 20–26 (WC-02 & Logia)', name: '3 Spotlight IP44 WC-02 (Lavabo Lộ 20, Bồn Tắm Lộ 22, Tắm Đứng Lộ 24) + Gương LED Đôi (Lộ 21) + Đèn Sưởi (Lộ 23) + 2 Đèn Logia 01 (Lộ 26)', watt: 68, cct: 3000, luxContrib: 260, on: true, aimable: true, defaultTilt: 12, defaultYaw: 0, beam: 24, role: 'Chia 3 khoang WC-02 chuẩn KT-5.03: Khoang Tây (Bồn tắm nằm 1.5m), Khoang Giữa (Lavabo đôi nhìn từ cửa kính khói 1.08m), Khoang Đông (Tắm đứng & Bồn cầu)' }
      ],
      scenes: [
        { id: 'full_right', name: '✨ 1. Toàn Cảnh Master Open-Suite Chuẩn Thiết Kế (Chóa Giữa Giường Bẻ 25°)', desc: 'Bật toàn bộ Khu Ngủ + Vòm Mặt Trăng Ø1.2m + Bàn Đảo Kính + 4 Spotlight Thay Đồ + WC-02 — Bấm Camera số 2 (Top-Down) để đối chiếu bản vẽ!', activeCircuits: ['M14', 'M15C', 'M15P', 'M16', 'M18A', 'M18B', 'M19', 'M20'], presetTilt: 25, targetLux: 420, ugr: '13.4 (Không chói mắt)' },
        { id: 'dressing', name: '💎 2. Chọn Đồ & Trang Điểm Tại Bàn Đảo Kính & Cửa Sổ O2 (440 Lux • CRI≥92)', desc: 'Bật Vòm Mặt Trăng Barrisol Ø1.2m (Lộ 18A) + 4 Spotlight রọi Tủ #1-#2 & Bàn O2 (Lộ 18B) + LED Bàn Đảo, Tủ #1-#3 & Kệ Túi (Lộ 19)', activeCircuits: ['M15P', 'M18A', 'M18B', 'M19'], presetTilt: 18, targetLux: 440, ugr: '13.8 (Chuẩn màu vải & da)' },
        { id: 'relax', name: '🌙 3. Thư Giãn Trước Giờ Ngủ (80 Lux — Êm Dịu Khách Sạn 5 Sao)', desc: 'Tắt Spotlight trần Khu Ngủ, chỉ bật LED hắt hộp trần (Lộ 14) + Khe LED vách gỗ xương cá & Đèn Táp (Lộ 16) + LED Bàn Đảo dịu nhẹ (Lộ 19)', activeCircuits: ['M14', 'M16', 'M19'], presetTilt: 25, targetLux: 80, ugr: '< 10 (Tuyệt đối êm mắt)' },
        { id: 'glare_wrong', name: '⚠️ 4. Thợ Điện Lắp Sai (Chóa 0° Thẳng Đứng Chói Mắt Trên Giường!)', desc: 'Mô phỏng lỗi khi không bẻ góc 2 bóng 7W giữa giường (Lộ 15B để 0°): Tia sáng chiếu thẳng vào mắt người nằm ngửa!', activeCircuits: ['M14', 'M15C', 'M15P', 'M18A', 'M18B'], presetTilt: 0, targetLux: 260, ugr: '25.8 (CHÓI GẮT VÀO MẮT!)' },
        { id: 'wc_night', name: '🚽 5. Đi WC-02 Ban Đêm (Cảm Biến Hiện Diện Tự Bật Đèn Dịu)', desc: 'Bước qua cửa kính khói 1.08m vào WC-02 ban đêm: Tự bật Gương LED Lavabo đôi & đèn dịu không làm tỉnh giấc', activeCircuits: ['M16', 'M20'], presetTilt: 12, targetLux: 65, ugr: '11.0 (Dịu mắt ban đêm)' }
      ]
    },

    T3: {
      id: 'T3',
      title: 'Tầng 3 (Chuẩn CAD KT-4.08 & PA T3-A): Phòng Thờ Phía Bắc • Cửa Lùa Trục B • Phòng Làm Việc Đôi Phía Nam',
      subtitle: 'Khớp 100% phương vị Bắc–Nam của bản vẽ: Phòng Thờ ở phía Bắc (Ban thờ tựa tường Tây + 3 đèn rọi dọc + 6 đèn viền) • Cửa lùa 4 cánh tại Trục B • P.Làm Việc Đôi ở phía Nam (2 bàn đôi tường Tây + Tủ sách tường Nam + Sofa tường Đông)',
      dims: { w: 7.6, d: 8.2, h: 3.30 },
      targetLuxLabel: '400 Lux (Tâm Ban Thờ Tây) | 530 Lux (2 Bàn Làm Việc Tường Tây)',
      optionLabel: 'Chuyển đổi Hệ Đèn P.Làm Việc (PA T3-A): 3 Tuyến Ray Nam Châm 48V (Tây 3m • Nam 2m • Đông 2m) ↔ 9 Đèn Spotlight Âm Trần D90 (KT-4.08)',
      cameras: {
        iso:   { pos: [4.8, 7.6, 8.6], target: [-0.2, 1.0, 0.2], name: '🎥 1. Phối Cảnh Tổng Thể Tầng 3 (Bắc – Nam)' },
        top:   { pos: [0, 12.8, 0.01], target: [0, 0, 0], name: '🗺️ 2. Mặt Bằng Chuẩn CAD KT-4.08 & PA T3-A (Top-Down)' },
        eye:   { pos: [0.4, 1.35, -1.95], target: [-2.4, 1.65, -1.95], name: '🙏 3. Đứng Khấn Nhìn Về Ban Thờ Tường Tây (Rọi 28°)' },
        ceil:  { pos: [0.5, 1.35, 1.6], target: [-2.2, 1.2, 1.6], name: '💻 4. Góc Ngồi 2 Bàn Làm Việc Đôi Tường Tây & Tủ Sách Nam' },
        sect:  { pos: [6.8, 1.9, 0.2], target: [-0.5, 1.5, 0.2], name: '📐 5. Mặt Cắt Dọc Bắc – Nam Qua Cửa Lùa Trục B' }
      },
      circuits: [
        { id: 'W14A', code: 'Lộ 14* (Trước Ban Thờ)', name: '3 Spotlight 7W Xếp Dọc Trước Ban Thờ Tường Tây (500+1205+1205mm — Bẻ 28°)', watt: 21, cct: 3000, luxContrib: 280, on: true, aimable: true, defaultTilt: 28, defaultYaw: -90, beam: 15, role: 'Khớp 100% KT-4.08: 3 bóng xếp dọc cách tường Tây 500mm, bẻ nghiêng 28° về hướng Tây (-90°) rọi vào Ban thờ' },
        { id: 'W14', code: 'Lộ 14+16 (Viền & Chùm Thờ)', name: '6 Spotlight 9W Viền Ô Trần Phòng Thờ (1420+1420mm) + Đèn Thả Trung Tâm (Lộ 16)', watt: 78, cct: 3000, luxContrib: 130, on: true, aimable: true, defaultTilt: 15, defaultYaw: 0, beam: 24, role: '3 bóng hàng Bắc + 3 bóng hàng Nam bao quanh ô trần giật cấp 1620×2210mm + Đèn thả tâm Phòng Thờ' },
        { id: 'W15', code: 'Lộ 15 (Hắt Phòng Thờ)', name: 'LED Dây COB Hắt 4 Cạnh Ô Trần Phòng Thờ & Khe Rèm (3000K)', watt: 85, cct: 3000, luxContrib: 55, on: true, aimable: false },
        { id: 'S1', code: 'Lộ S1 (Tuyến Tây - Bàn Đôi)', name: 'Tuyến Đèn Dọc Tường Tây Trên 2 Bàn Làm Việc Đôi (Ray 3.0m / 4 Spotlight D90 — 4000K)', watt: 48, cct: 4000, luxContrib: 380, on: true, aimable: false },
        { id: 'S2', code: 'Lộ S2 (Tuyến Nam - Tủ Sách)', name: 'Tuyến Đèn Ngang Trước Tủ Sách Tường Nam 2.44m (Ray 2.0m / 3 Spotlight — Bẻ 28° Hướng Nam)', watt: 36, cct: 4000, luxContrib: 150, on: true, aimable: true, defaultTilt: 28, defaultYaw: 0, beam: 24, role: 'Cách mặt tủ sách Nam 320–350mm, bẻ nghiêng 28° về hướng Nam (Yaw 0°) quét sáng toàn bộ các ngăn sách' },
        { id: 'S3', code: 'Lộ S3 (Tuyến Đông - Sofa)', name: 'Tuyến Đèn Dọc Trên Sofa Đọc Sách Tường Đông (Ray 2.0m / 2 Spotlight) + Khe Hắt Trần & Rèm', watt: 65, cct: 3500, luxContrib: 110, on: true, aimable: false },
        { id: 'V27', code: 'Lộ 27 (Thông Tầng)', name: '3 Spotlight 12W Góc Hẹp 15° Rọi Giếng Trời Cầu Thang (Bên Đông)', watt: 36, cct: 3000, luxContrib: 120, on: true, aimable: true, defaultTilt: 10, defaultYaw: 0, beam: 15, role: 'Phóng cột sáng hẹp 15° xuyên suốt giếng trời cầu thang' }
      ],
      scenes: [
        { id: 'work_focus', name: '💻 1. Hai Vợ Chồng Làm Việc Tập Trung (Chuẩn PA T3-A — 530 Lux)', desc: 'Bật Tuyến Tây S1 (2 bàn đôi) + Tuyến Nam S2 (Rọi tủ sách 28°) + Tuyến Đông S3 (Sofa) + Phòng Thờ dịu nhẹ', activeCircuits: ['S1', 'S2', 'S3', 'W14A', 'V27'], presetTilt: 28, targetLux: 530, ugr: '14.1 (Không lóa màn hình)' },
        { id: 'worship_ceremony', name: '🙏 2. Thắp Hương / Cúng Lễ Trang Nghiêm (400 Lux)', desc: 'Bật 3 đèn dọc trước Ban thờ (Lộ 14*) + 6 đèn viền & đèn thả Phòng Thờ (Lộ 14+16) + LED hắt Lộ 15', activeCircuits: ['W14A', 'W14', 'W15', 'V27'], presetTilt: 28, targetLux: 405, ugr: '12.8 (Trang nghiêm)' },
        { id: 'open_space', name: '🚪 3. Mở Thông Cửa Lùa 4 Cánh Trục B (Đối Chiếu Bản Vẽ KT-4.08)', desc: 'Bật toàn bộ Tầng 3: Phòng Thờ (Bắc) + Phòng Làm Việc Đôi (Nam) + Thông Tầng (Đông) — Bấm Camera 2 (Top-Down) để soi bản vẽ', activeCircuits: ['W14A', 'W14', 'W15', 'S1', 'S2', 'S3', 'V27'], presetTilt: 28, targetLux: 560, ugr: '14.4 (Khớp 100% CAD)' },
        { id: 'late_night_work', name: '🌙 4. Làm Việc Khuya 1 Mình (Chống Mỏi Mắt)', desc: 'Chỉ bật Tuyến Nam S2 (Ánh sáng phản xạ từ tủ sách) + Tuyến Đông S3 (Sofa & hắt rèm)', activeCircuits: ['S2', 'S3'], presetTilt: 28, targetLux: 210, ugr: '11.5 (Êm dịu ban đêm)' }
      ]
    },

    BED_AB: {
      id: 'BED_AB',
      title: 'Phòng Ngủ Trục A–B (Chuẩn KT-4.02 & CĐ-11/12/13): P.Ngủ Ông Bà (T1) • P.Ngủ 2 (T2) • P.Ngủ 4 (T3)',
      subtitle: 'Dáng dọc Bắc–Nam (3.21m × 4.49m): Đầu giường tựa Tường Nam (Trục A) nhìn lên Tủ Áo & Tivi Tường Bắc (Trục B) • Cửa lùa D4 (3.0m) bên Đông • Lộ 6 / Lộ 15 là LED Dây (—LED—) hắt 4 cạnh trần (KHÔNG có ray nam châm!) • Cụm 3 bóng 7W (Lộ 7/16) giữa phòng bẻ 25° về hướng Bắc',
      dims: { w: 4.8, d: 4.8, h: 3.13 },
      targetLuxLabel: '45 Lux (Đầu giường Nam) | 380–450 Lux (Bàn học Đông-Bắc & Tủ Áo Bắc)',
      optionLabel: 'Chuyển đổi Tầng (Trục A–B): P.Ngủ 2 (T2) & P.Ngủ 4 (T3 — Có Bàn Học Góc Đông-Bắc Lộ 9) ↔ P.Ngủ Ông Bà (T1 — Có Nẹp U10 Đen P-UT12 & Ô Kính V3 Nhìn Giếng Trời)',
      cameras: {
        iso:   { pos: [-3.8, 5.2, -5.6], target: [0.0, 1.0, 0.0], name: '🎥 1. Phối Cảnh Tổng Thể P.Ngủ Trục A–B (Từ Bắc Nhìn Xuống Đầu Giường Nam)' },
        top:   { pos: [0, 9.6, 0.01], target: [0, 0, 0], name: '🗺️ 2. Mặt Bằng Chuẩn CAD KT-4.02 & CĐ-11/12 (Top-Down)' },
        eye:   { pos: [0.0, 0.85, 1.55], target: [0.0, 1.85, -1.85], name: '🛌 3. Góc Nằm Giường (Tựa Tường Nam Nhìn Lên Tủ Áo/Tivi Bắc — Test Chói!)' },
        ceil:  { pos: [-1.15, 1.25, 0.85], target: [0.85, 1.20, -1.75], name: '📚 4. Góc Nhìn Tủ Áo Tường Bắc • Bàn Học Đông-Bắc (Lộ 9) & Cửa Lùa D4' },
        sect:  { pos: [-5.6, 1.65, 0.0], target: [0.2, 1.45, 0.0], name: '📐 5. Mặt Cắt Dọc Bắc – Nam (Tủ Áo Bắc ← Cụm 3 Đèn 7W Bẻ 25° ← Giường Nam)' }
      },
      circuits: [
        { id: 'AB_COVE', code: 'Lộ 6 (PN2/4) / Lộ 15 (Ông Bà)', name: 'Đèn LED Dây (Ký hiệu —LED—) Hắt 4 Cạnh Ô Trần Giật Cấp (2.040×3.140mm) & Khe Rèm Đông D4 (3000K)', watt: 105, cct: 3000, luxContrib: 50, on: true, aimable: false },
        { id: 'AB_MID', code: 'Lộ 7 (PN2/4) / Lộ 16 (Ông Bà)', name: '5 Spotlight 7W: Cụm 3 Bóng Cách 200mm Giữa Phòng (BẮT BUỘC Bẻ 25° Về Hướng Bắc) + 2 Bóng Đầu Giường Nam (Bẻ 15°)', watt: 35, cct: 3000, luxContrib: 125, on: true, aimable: true, defaultTilt: 25, defaultYaw: 180, beam: 24, role: 'Giường tựa Tường Nam (Trục A) nhìn lên Bắc -> Cụm 3 bóng 7W giữa phòng BẮT BUỘC bẻ 25° về hướng Bắc (Yaw 180°, phía Tủ Áo/Tivi) để không chói mắt!' },
        { id: 'AB_PERIM', code: 'Lộ 5 (PN2/4) / Lộ 14 (Ông Bà)', name: '4 Spotlight 9W: 2 Bóng Góc Trên (Bẻ 18° Rọi Tủ Áo & Tivi Tường Bắc) + 2 Bóng Giữa Hai Bên (Thẳng Hàng Cụm 3 Bóng 7W)', watt: 36, cct: 3000, luxContrib: 145, on: true, aimable: true, defaultTilt: 18, defaultYaw: 180, beam: 24, role: 'Khớp 100% KT-4.02 & CĐ-11/12: 2 bóng 9W góc trên rọi Tủ Áo Bắc + 2 bóng 9W ở 2 bên thẳng hàng ngang với cụm 3 bóng 7W giữa phòng' },
        { id: 'AB_DESK', code: 'Lộ 9 (Bàn Học & Tủ Áo)', name: '1 Spotlight 7W 4000K Trên Bàn Học Góc Đông-Bắc (Lộ 9 ở P.Ngủ 2 & 4) + Dây Chờ LED Tủ Áo (+1.6m) & Gương (+1.2m)', watt: 32, cct: 4000, luxContrib: 160, on: true, aimable: true, defaultTilt: 12, defaultYaw: 180, beam: 24, role: 'Đúng Lộ 9 trên CĐ-12 & CĐ-13: 1 bóng 7W độc lập rọi xuống Bàn học góc Đông-Bắc (cạnh cửa lùa D4)' },
        { id: 'AB_BALC', code: 'Lộ 8 (PN2/4) / Lộ 13 (Ông Bà)', name: '2 Đèn Ống Bơ 12W Lắp Nổi Ngoài Ban Công Đông (Lộ 8 Tầng 2–3) / 3 Đèn Sân Vườn Đông (Lộ 13 Tầng 1)', watt: 24, cct: 3000, luxContrib: 40, on: true, aimable: false }
      ],
      scenes: [
        { id: 'ab_correct', name: '✅ 1. Bật Đủ Đèn Chuẩn CAD Trục A–B (Cụm 3 Bóng 7W Đã Bẻ 25° Về Phía Bắc)', desc: 'Bật đủ Lộ 5/14 (4 bóng 9W) + Lộ 6/15 (LED dây —LED—) + Lộ 7/16 (5 bóng 7W) + Lộ 9 (Bàn học) + Lộ 8/13 — Bấm Camera 2 (Top-Down) để soi bản vẽ', activeCircuits: ['AB_COVE', 'AB_MID', 'AB_PERIM', 'AB_DESK', 'AB_BALC'], presetTilt: 25, targetLux: 360, ugr: '13.2 (Không chói khi nằm)' },
        { id: 'ab_study', name: '📚 2. Học Tập Tại Bàn Góc Đông-Bắc & Lấy Đồ Tủ Áo Bắc (450 Lux)', desc: 'Bật Đèn bàn học Lộ 9 + 4 bóng 9W Lộ 5/14 (rọi Tủ áo Bắc) + LED dây hắt trần Lộ 6/15', activeCircuits: ['AB_COVE', 'AB_PERIM', 'AB_DESK'], presetTilt: 18, targetLux: 450, ugr: '13.8 (Chuẩn đọc sách)' },
        { id: 'ab_wrong', name: '⚠️ 3. Thợ Điện Lắp Sai (Chóa 0° Thẳng Đứng Chói Mắt Trên Giường!)', desc: 'Mô phỏng khi cụm 3 bóng 7W giữa phòng (Lộ 7/16) để 0° thẳng đứng chiếu dội vào mắt người nằm tựa đầu Tường Nam', activeCircuits: ['AB_COVE', 'AB_MID', 'AB_PERIM'], presetTilt: 0, targetLux: 240, ugr: '26.0 (CHÓI GẮT VÀO MẮT!)' },
        { id: 'ab_sleep', name: '🌙 4. Thư Giãn Đi Ngủ (50 Lux — Chỉ Bật LED Dây Hắt Trần Lộ 6 / Lộ 15)', desc: 'Tắt toàn bộ Spotlight 7W & 9W, chỉ bật duy nhất Lộ 6 (PN2/4) / Lộ 15 (Ông Bà) là LED dây (—LED—) hắt 4 cạnh trần', activeCircuits: ['AB_COVE'], presetTilt: 25, targetLux: 50, ugr: '< 10 (Ngủ sâu)' }
      ]
    },

    BED_BD: {
      id: 'BED_BD',
      title: 'Phòng Ngủ Trục B–D (Chuẩn KT-4.02 & CĐ-12/13): P.Ngủ 1 (Tầng 2) • P.Ngủ 3 (Tầng 3)',
      subtitle: 'Dáng ngang Đông–Tây (4.95m × 3.36m): Đầu giường tựa Tường Bắc (Trục D) nhìn xuống Hệ Tủ Áo & Tivi Tường Nam (Trục B) • Bàn học & Cửa sổ S3 bên Tây + Ray nam châm Lộ 12 • Cặp 2 bóng đôi 7W giữa phòng bẻ 25° về hướng Nam',
      dims: { w: 5.8, d: 3.8, h: 3.13 },
      targetLuxLabel: '45 Lux (Đầu giường Bắc) | 480 Lux (Bàn học Tường Tây dưới Ray nam châm Lộ 12)',
      optionLabel: 'Chuyển đổi Tầng (Trục B–D): P.Ngủ 1 Tầng 2 (CĐ-12 — 5 Bóng 9W Lộ 10 Hình Chữ U) ↔ P.Ngủ 3 Tầng 3 (CĐ-13 — 6 Bóng 9W Lộ 10 Đủ 2 Cột Trái/Phải)',
      cameras: {
        iso:   { pos: [-4.2, 4.8, 5.2], target: [0.0, 1.0, 0.0], name: '🎥 1. Phối Cảnh Tổng Thể P.Ngủ Trục B–D (Bắc – Nam)' },
        top:   { pos: [0, 9.8, 0.01], target: [0, 0, 0], name: '🗺️ 2. Mặt Bằng Chuẩn CAD KT-4.02 & CĐ-12/13 (Top-Down)' },
        eye:   { pos: [0.35, 0.85, -1.25], target: [0.35, 1.75, 1.65], name: '🛌 3. Góc Nằm Giường (Tựa Tường Bắc Nhìn Xuống Tủ Áo/Tivi Nam — Test Chói!)' },
        ceil:  { pos: [-0.20, 1.25, 0.55], target: [-2.10, 1.15, -0.35], name: '💻 4. Góc Nhìn Bàn Học Tường Tây • Cửa Sổ S3 & Ray Nam Châm Lộ 12' },
        sect:  { pos: [-6.0, 1.65, 0.0], target: [0.35, 1.45, 0.0], name: '📐 5. Mặt Cắt Dọc Bắc – Nam (Giường Bắc → Cặp 2 Đèn 7W Bẻ 25° → Tủ Áo Nam)' }
      },
      circuits: [
        { id: 'BD_COVE', code: 'Lộ 12* (Hắt Trần)', name: 'LED Dây COB 3000K Hắt 4 Cạnh Ô Trần Giật Cấp (2.990×2.050mm) & Hốc Rèm Cửa Lùa Đông D8', watt: 95, cct: 3000, luxContrib: 45, on: true, aimable: false },
        { id: 'BD_MID', code: 'Lộ 11 (Cặp Giữa + Đầu Giường)', name: 'Cặp 2 Spotlight Đôi 7W Cách 200mm Giữa Phòng (BẮT BUỘC Bẻ 25° Về Hướng Nam) + 2 Bóng 7W Đầu Giường Bắc (Bẻ 15°)', watt: 28, cct: 3000, luxContrib: 105, on: true, aimable: true, defaultTilt: 25, defaultYaw: 0, beam: 24, role: 'Giường tựa Tường Bắc (Trục D) nhìn xuống Nam -> Cặp 2 bóng đôi 7W giữa phòng BẮT BUỘC bẻ 25° về hướng Nam (Yaw 0°, phía Tủ Áo/Tivi) để không chói mắt!' },
        { id: 'BD_PERIM', code: 'Lộ 10 (5–6 Bóng 9W Chữ U)', name: '5–6 Spotlight 9W Xếp Chữ U Quanh Giường: 3 Bóng Hàng Dưới (Bẻ 18° Rọi Tủ Áo & Tivi Tường Nam) + 2–3 Bóng Hai Bên', watt: 54, cct: 3000, luxContrib: 155, on: true, aimable: true, defaultTilt: 18, defaultYaw: 0, beam: 24, role: 'Khớp 100% CĐ-12 & CĐ-13: 3 bóng hàng dưới (cách đều 1410+1410mm) bẻ 18° về hướng Nam rọi Hệ Tủ Áo & Tivi + 2–3 bóng cột Tây/Đông' },
        { id: 'BD_TRACK', code: 'Lộ 12 (Ray Nam Châm Bàn Học Tây)', name: 'Thanh Ray Nam Châm / Đèn LED Thanh Chạy Dọc Trên Bàn Học & Cửa Sổ S3 Tường Tây (4000K CRI≥92)', watt: 36, cct: 4000, luxContrib: 280, on: true, aimable: true, defaultTilt: 15, defaultYaw: -90, beam: 36, role: 'Đúng vị trí thanh sọc Lộ 12 trên CĐ-12 & CĐ-13: chạy dọc Bắc–Nam ngay phía trên Bàn học tường Tây (cách tường Tây 550mm)' },
        { id: 'BD_BALC', code: 'Lộ 13 / 10* (LED Tủ & Ban Công)', name: 'LED Thanh Cảm Biến Trong Hệ Tủ Áo Tường Nam (+1.6m) + Đèn Ban Công Đông Cửa Lùa D8', watt: 35, cct: 3000, luxContrib: 90, on: true, aimable: false }
      ],
      scenes: [
        { id: 'bd_correct', name: '✅ 1. Bật Đủ Đèn Chuẩn CAD Trục B–D (Cặp 2 Bóng 7W Đã Bẻ 25° Về Phía Nam)', desc: 'Bật toàn bộ Lộ 10 + Lộ 11 + Lộ 12 + Lộ 12* — Bấm Camera số 2 (Top-Down) để soi khớp 100% với bản vẽ KT-4.02 & CĐ-12/13', activeCircuits: ['BD_COVE', 'BD_MID', 'BD_PERIM', 'BD_TRACK', 'BD_BALC'], presetTilt: 25, targetLux: 385, ugr: '13.2 (Không chói khi nằm)' },
        { id: 'bd_study', name: '💻 2. Học Bài & Làm Việc Tại Bàn Tường Tây Cửa Sổ S3 (480 Lux Chống Cận)', desc: 'Bật Thanh Ray Nam Châm Lộ 12 ngay trên bàn học Tây + Viền chữ U Lộ 10 + LED hắt trần Lộ 12*', activeCircuits: ['BD_COVE', 'BD_PERIM', 'BD_TRACK', 'BD_BALC'], presetTilt: 18, targetLux: 480, ugr: '13.6 (Không bóng lưng)' },
        { id: 'bd_wrong', name: '⚠️ 3. Thợ Điện Lắp Sai (Chóa 0° Thẳng Đứng Chói Mắt Trên Giường!)', desc: 'Mô phỏng khi cặp 2 bóng đôi 7W giữa phòng (Lộ 11) để 0° thẳng đứng chiếu vào mắt người nằm tựa đầu Tường Bắc', activeCircuits: ['BD_COVE', 'BD_MID', 'BD_PERIM'], presetTilt: 0, targetLux: 250, ugr: '25.8 (CHÓI GẮT VÀO MẮT!)' },
        { id: 'bd_sleep', name: '🌙 4. Chuẩn Bị Đi Ngủ (45 Lux)', desc: 'Chỉ bật duy nhất LED dây COB hắt 4 cạnh ô trần Lộ 12* (3000K)', activeCircuits: ['BD_COVE'], presetTilt: 25, targetLux: 45, ugr: '< 10 (Ngủ sâu)' }
      ]
    }
  };

  function createStudioInstance(rootEl) {
    if (!rootEl || typeof THREE === 'undefined') return null;

    const canvasWrap = rootEl.querySelector('.opple-3d-canvas-wrap');
    const hudOverlay = rootEl.querySelector('.opple-3d-labels-layer');
    if (!canvasWrap) return null;

    let currentZoneId = 'T1';
    let currentSceneId = 'guest';
    let masterTiltDeg = 15;
    let masterYawDeg = 0;
    let masterBeamDeg = 24;
    let showCones = true;
    let showHeatmap = true;
    let showLabels = true;
    let altOptionActive = false; // false = PA1 (Pendant / Track / U10), true = PA2 (All Spotlight / Wall Track)
    let autoRotate = false;
    let isSimulationRunning = true;
    let rafId = null;

    // Three.js core objects
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x070c14);

    const camera = new THREE.PerspectiveCamera(46, 16 / 9, 0.1, 100);
    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    canvasWrap.insertBefore(renderer.domElement, canvasWrap.firstChild);

    // Orbit camera state
    const orbit = {
      theta: 0.06,
      phi: 0.96,
      radius: 11.5,
      target: new THREE.Vector3(0, 1.1, -0.2),
      isDragging: false,
      isPanning: false,
      prevX: 0,
      prevY: 0
    };

    function syncOrbitFromPos(posArr, targetArr) {
      orbit.target.set(targetArr[0], targetArr[1], targetArr[2]);
      const dx = posArr[0] - targetArr[0];
      const dy = posArr[1] - targetArr[1];
      const dz = posArr[2] - targetArr[2];
      orbit.radius = Math.max(1.5, Math.sqrt(dx * dx + dy * dy + dz * dz));
      orbit.phi = Math.acos(Math.min(1, Math.max(-1, dy / orbit.radius)));
      orbit.theta = Math.atan2(dx, dz);
      updateCameraTransform();
    }

    function updateCameraTransform() {
      const sinPhi = Math.sin(orbit.phi);
      camera.position.x = orbit.target.x + orbit.radius * sinPhi * Math.sin(orbit.theta);
      camera.position.y = orbit.target.y + orbit.radius * Math.cos(orbit.phi);
      camera.position.z = orbit.target.z + orbit.radius * sinPhi * Math.cos(orbit.theta);
      camera.lookAt(orbit.target);
    }

    // Pointer interaction on canvas
    const domCanvas = renderer.domElement;
    domCanvas.style.cursor = 'grab';

    domCanvas.addEventListener('pointerdown', (e) => {
      orbit.isDragging = true;
      orbit.isPanning = (e.button === 2 || e.shiftKey);
      orbit.prevX = e.clientX;
      orbit.prevY = e.clientY;
      domCanvas.style.cursor = 'grabbing';
      autoRotate = false;
      updateAutoRotateBtn();
    });

    window.addEventListener('pointermove', (e) => {
      if (!orbit.isDragging) return;
      const dx = e.clientX - orbit.prevX;
      const dy = e.clientY - orbit.prevY;
      orbit.prevX = e.clientX;
      orbit.prevY = e.clientY;

      if (orbit.isPanning) {
        const panSpeed = orbit.radius * 0.0015;
        const right = new THREE.Vector3();
        camera.getWorldDirection(right);
        right.cross(camera.up).normalize();
        orbit.target.addScaledVector(right, -dx * panSpeed);
        orbit.target.y += dy * panSpeed;
      } else {
        orbit.theta -= dx * 0.0065;
        orbit.phi = Math.max(0.08, Math.min(Math.PI * 0.88, orbit.phi - dy * 0.0065));
      }
      updateCameraTransform();
    });

    window.addEventListener('pointerup', () => {
      if (orbit.isDragging) {
        orbit.isDragging = false;
        domCanvas.style.cursor = 'grab';
      }
    });

    domCanvas.addEventListener('contextmenu', (e) => e.preventDefault());

    domCanvas.addEventListener('wheel', (e) => {
      e.preventDefault();
      orbit.radius = Math.max(1.8, Math.min(22, orbit.radius + e.deltaY * 0.006));
      updateCameraTransform();
    }, { passive: false });

    // Scene Graph Containers
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    const ambientLight = new THREE.AmbientLight(0x8fa8c8, 0.28);
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight(0xdbeafe, 0x1e293b, 0.25);
    scene.add(hemiLight);

    // Track dynamic fixtures for aiming, dimming/toggling, and 3D labels
    let fixtureNodes = [];
    let coveStrips = [];
    let heatmapMeshes = [];
    let labelAnchors = [];
    let fanRotors = [];
    let glareWarningMesh = null;

    // Helper: Create 3D Ceiling Fan with Integrated LED Chandelier/Dome Light (Lộ 6 & Lộ 6A)
    function createCeilingFanWithLight(opts) {
      const { x, y, z, circuitId, colorHex = 0xffe4b5 } = opts;
      const fanGroup = new THREE.Group();
      fanGroup.position.set(x, y, z);

      // Canopy & Downrod attached to concrete slab hook
      const canopy = new THREE.Mesh(
        new THREE.CylinderGeometry(0.08, 0.06, 0.06, 20),
        new THREE.MeshStandardMaterial({ color: 0xd97706, metalness: 0.5, roughness: 0.3 })
      );
      canopy.position.y = -0.03;
      fanGroup.add(canopy);

      const rod = new THREE.Mesh(
        new THREE.CylinderGeometry(0.018, 0.018, 0.34, 16),
        new THREE.MeshStandardMaterial({ color: 0xd97706, metalness: 0.6, roughness: 0.3 })
      );
      rod.position.y = -0.20;
      fanGroup.add(rod);

      // Motor Housing
      const motor = new THREE.Mesh(
        new THREE.CylinderGeometry(0.18, 0.16, 0.09, 28),
        new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.4, roughness: 0.4 })
      );
      motor.position.y = -0.38;
      fanGroup.add(motor);

      // 5 Spinning Blades Group
      const rotorGroup = new THREE.Group();
      rotorGroup.position.y = -0.38;
      const bladeGeo = new THREE.BoxGeometry(0.54, 0.014, 0.13);
      bladeGeo.translate(0.34, 0, 0);
      const bladeMat = new THREE.MeshStandardMaterial({ color: 0x92400e, roughness: 0.5 });
      for (let i = 0; i < 5; i++) {
        const blade = new THREE.Mesh(bladeGeo, bladeMat);
        blade.rotation.y = (i * Math.PI * 2) / 5;
        blade.rotation.x = 0.08; // Slight pitch angle
        rotorGroup.add(blade);
      }
      fanGroup.add(rotorGroup);
      fanRotors.push({ rotorGroup, circuitId });

      // Integrated Bottom LED Dome Light (below the blades so blades NEVER cast shadow on light!)
      const domeMat = new THREE.MeshBasicMaterial({ color: colorHex });
      const dome = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.12, 0.06, 24), domeMat);
      dome.position.y = -0.44;
      fanGroup.add(dome);

      rootGroup.add(fanGroup);

      // Add downward illumination cone & point light from the bottom of the fan (-0.46m below ceiling)
      return createAimableSpotlight({
        x, y: y - 0.46, z,
        circuitId,
        colorHex,
        watt: 24,
        baseTiltDeg: 0,
        baseYawDeg: 0,
        beamDeg: 36,
        cutoutMm: 90
      });
    }

    // Helper: Create Volumetric Light Cone + Spot Pool + Point/Spot Light
    function createAimableSpotlight(opts) {
      const {
        x, y, z,
        circuitId,
        colorHex = 0xfff3d6,
        watt = 9,
        baseTiltDeg = 15,
        baseYawDeg = 0,
        beamDeg = 24,
        cutoutMm = 90,
        label = ''
      } = opts;

      const holder = new THREE.Group();
      holder.position.set(x, y, z);

      // Trim ring on ceiling
      const ringRadius = cutoutMm === 75 ? 0.055 : 0.068;
      const ringGeo = new THREE.RingGeometry(ringRadius * 0.58, ringRadius, 24);
      const ringMat = new THREE.MeshBasicMaterial({ color: 0xe2e8f0, side: THREE.DoubleSide });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = Math.PI / 2;
      ringMesh.position.y = -0.005;
      holder.add(ringMesh);

      // Gimbal inner cup (rotates with Yaw & Tilt)
      const gimbalYaw = new THREE.Group();
      const gimbalTilt = new THREE.Group();
      gimbalYaw.add(gimbalTilt);
      holder.add(gimbalYaw);

      // Glowing emitter lens inside gimbal
      const lensGeo = new THREE.CircleGeometry(ringRadius * 0.55, 20);
      const lensMat = new THREE.MeshBasicMaterial({ color: colorHex, side: THREE.DoubleSide });
      const lensMesh = new THREE.Mesh(lensGeo, lensMat);
      lensMesh.rotation.x = Math.PI / 2;
      lensMesh.position.y = -0.008;
      gimbalTilt.add(lensMesh);

      // Direction arrow indicator showing where the gimbal is aimed
      const arrowLen = 0.42;
      const arrowDir = new THREE.Vector3(0, -1, 0);
      const arrowHelper = new THREE.ArrowHelper(arrowDir, new THREE.Vector3(0, -0.02, 0), arrowLen, 0x38bdf8, 0.11, 0.065);
      gimbalTilt.add(arrowHelper);

      // Volumetric Light Cone
      const coneLen = Math.max(1.8, y - 0.08);
      const halfAngleRad = THREE.MathUtils.degToRad(beamDeg * 0.5);
      const coneRadius = Math.tan(halfAngleRad) * coneLen;
      const coneGeo = new THREE.ConeGeometry(coneRadius, coneLen, 28, 1, true);
      coneGeo.translate(0, -coneLen / 2, 0);
      const coneMat = new THREE.MeshBasicMaterial({
        color: colorHex,
        transparent: true,
        opacity: 0.14,
        side: THREE.DoubleSide,
        depthWrite: false,
        blending: THREE.AdditiveBlending
      });
      const coneMesh = new THREE.Mesh(coneGeo, coneMat);
      gimbalTilt.add(coneMesh);

      // Floor / Wall Light Pool (moves based on ray projection)
      const poolGeo = new THREE.CircleGeometry(Math.max(0.45, coneRadius * 1.15), 28);
      const poolMat = new THREE.MeshBasicMaterial({
        color: colorHex,
        transparent: true,
        opacity: 0.26,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide
      });
      const poolMesh = new THREE.Mesh(poolGeo, poolMat);
      poolMesh.rotation.x = -Math.PI / 2;
      poolMesh.position.set(x, 0.015, z);
      rootGroup.add(poolMesh);

      // Real Three.js PointLight positioned at mid-beam for fast, smooth multi-light shading
      const pointLight = new THREE.PointLight(colorHex, watt >= 12 ? 0.52 : 0.38, 5.2, 1.6);
      pointLight.position.set(0, -coneLen * 0.45, 0);
      gimbalTilt.add(pointLight);

      rootGroup.add(holder);

      const node = {
        holder,
        gimbalYaw,
        gimbalTilt,
        lensMat,
        coneMesh,
        coneMat,
        poolMesh,
        poolMat,
        pointLight,
        arrowHelper,
        circuitId,
        colorHex,
        watt,
        baseTiltDeg,
        baseYawDeg,
        beamDeg,
        origin: new THREE.Vector3(x, y, z),
        label
      };

      fixtureNodes.push(node);
      return node;
    }

    function createCoveStrip(opts) {
      const { x, y, z, w, d, circuitId, colorHex = 0xffcf78 } = opts;
      const geo = new THREE.BoxGeometry(w, 0.035, d);
      const mat = new THREE.MeshBasicMaterial({
        color: colorHex,
        transparent: true,
        opacity: 0.92
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(x, y, z);
      rootGroup.add(mesh);

      // Soft glow plane on ceiling above cove
      const glowGeo = new THREE.PlaneGeometry(w + 0.35, d + 0.35);
      const glowMat = new THREE.MeshBasicMaterial({
        color: colorHex,
        transparent: true,
        opacity: 0.22,
        side: THREE.DoubleSide,
        depthWrite: false,
        blending: THREE.AdditiveBlending
      });
      const glowMesh = new THREE.Mesh(glowGeo, glowMat);
      glowMesh.rotation.x = Math.PI / 2;
      glowMesh.position.set(x, y + 0.04, z);
      rootGroup.add(glowMesh);

      const light = new THREE.PointLight(colorHex, 0.38, 4.8, 1.5);
      light.position.set(x, y - 0.1, z);
      rootGroup.add(light);

      const strip = { mesh, mat, glowMesh, glowMat, light, circuitId, colorHex };
      coveStrips.push(strip);
      return strip;
    }

    function createHeatmapPatch(x, y, z, radius, luxLevel, circuitId) {
      // Dialux false-color: >=450 Lux (Red/Orange/Yellow), 250-400 Lux (Warm Green/Yellow), 50-150 Lux (Cyan/Blue)
      let hex = 0x22c55e;
      if (luxLevel >= 450) hex = 0xf97316;
      else if (luxLevel >= 300) hex = 0xeab308;
      else if (luxLevel < 120) hex = 0x38bdf8;

      const geo = new THREE.CircleGeometry(radius, 32);
      const mat = new THREE.MeshBasicMaterial({
        color: hex,
        transparent: true,
        opacity: 0.34,
        side: THREE.DoubleSide,
        depthWrite: false
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.rotation.x = -Math.PI / 2;
      mesh.position.set(x, y, z);
      rootGroup.add(mesh);
      heatmapMeshes.push({ mesh, mat, circuitId, baseOpacity: 0.34 });
    }

    function buildRoomShell(w, d, h) {
      // Floor
      const floorGeo = new THREE.PlaneGeometry(w, d);
      const floorMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.65, metalness: 0.08 });
      const floor = new THREE.Mesh(floorGeo, floorMat);
      floor.rotation.x = -Math.PI / 2;
      rootGroup.add(floor);

      // Subtle architectural grid on floor
      const grid = new THREE.GridHelper(Math.max(w, d), Math.round(Math.max(w, d) * 2), 0x334155, 0x1e293b);
      grid.position.y = 0.004;
      rootGroup.add(grid);

      // Back Wall (North, z = -d/2) & Left Wall (West, x = -w/2) & Right Wall (East, x = +w/2)
      const wallMat = new THREE.MeshStandardMaterial({ color: 0x263548, roughness: 0.8, side: THREE.DoubleSide });
      const backWall = new THREE.Mesh(new THREE.PlaneGeometry(w, h), wallMat);
      backWall.position.set(0, h / 2, -d / 2);
      rootGroup.add(backWall);

      const leftWall = new THREE.Mesh(new THREE.PlaneGeometry(d, h), wallMat);
      leftWall.rotation.y = Math.PI / 2;
      leftWall.position.set(-w / 2, h / 2, 0);
      rootGroup.add(leftWall);

      const rightWall = new THREE.Mesh(new THREE.PlaneGeometry(d, h), wallMat);
      rightWall.rotation.y = -Math.PI / 2;
      rightWall.position.set(w / 2, h / 2, 0);
      rootGroup.add(rightWall);

      // Semi-transparent Gypsum Ceiling Plane so user can see both from below and above
      const ceilMat = new THREE.MeshStandardMaterial({
        color: 0x334155,
        transparent: true,
        opacity: 0.32,
        side: THREE.DoubleSide,
        depthWrite: false
      });
      const ceil = new THREE.Mesh(new THREE.PlaneGeometry(w, d), ceilMat);
      ceil.rotation.x = Math.PI / 2;
      ceil.position.y = h;
      rootGroup.add(ceil);

      // Wireframe border of ceiling
      const edges = new THREE.EdgesGeometry(new THREE.BoxGeometry(w, h, d));
      const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0x475569 }));
      line.position.y = h / 2;
      rootGroup.add(line);
    }

    function addBox(x, y, z, w, h, d, colorHex, opacity = 1) {
      const mat = new THREE.MeshStandardMaterial({
        color: colorHex,
        roughness: 0.6,
        metalness: 0.1,
        transparent: opacity < 1,
        opacity
      });
      const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
      mesh.position.set(x, y + h / 2, z);
      rootGroup.add(mesh);
      return mesh;
    }

    // Helper: Draw Linear AC Slot (Khe gió điều hòa âm trần 150×1200mm chuẩn KT-4.06..08)
    function addLinearACSlot(x, y, z, w, d) {
      const slotGroup = new THREE.Group();
      slotGroup.position.set(x, y - 0.012, z);
      const outer = new THREE.Mesh(
        new THREE.BoxGeometry(w + 0.04, 0.02, d + 0.04),
        new THREE.MeshBasicMaterial({ color: 0x94a3b8 })
      );
      const inner = new THREE.Mesh(
        new THREE.BoxGeometry(w, 0.026, d),
        new THREE.MeshBasicMaterial({ color: 0x020617 })
      );
      slotGroup.add(outer);
      slotGroup.add(inner);
      rootGroup.add(slotGroup);
    }

    // Helper: Draw 4-Sided Recessed Ceiling Coffer (Ô trần giật cấp + khe LED hắt 4 cạnh)
    function addFourSidedCoffer(x, y, z, w, d, circuitId, colorHex = 0xffcf78) {
      const stepEdges = new THREE.EdgesGeometry(new THREE.BoxGeometry(w, 0.12, d));
      const stepLine = new THREE.LineSegments(stepEdges, new THREE.LineBasicMaterial({ color: 0xf59e0b }));
      stepLine.position.set(x, y - 0.06, z);
      rootGroup.add(stepLine);

      createCoveStrip({ x, y: y - 0.10, z: z - d / 2, w, d: 0.08, circuitId, colorHex });
      createCoveStrip({ x, y: y - 0.10, z: z + d / 2, w, d: 0.08, circuitId, colorHex });
      createCoveStrip({ x: x - w / 2, y: y - 0.10, z, w: 0.08, d, circuitId, colorHex });
      createCoveStrip({ x: x + w / 2, y: y - 0.10, z, w: 0.08, d, circuitId, colorHex });
    }

    // ==================== BUILD ZONE 1: TẦNG 1 (CHUẨN BẢN VẼ CĐ-11 & KT-4.06) ====================
    function buildZoneT1() {
      const { w, d, h } = ZONE_CONFIGS.T1.dims;
      buildRoomShell(w, d, h);

      // Vách ngăn & Cột kết cấu giữa Phòng Khách - Tiền Sảnh - Phòng Ăn - Bếp (Trục 2 & Trục 3)
      addBox(-1.10, 0, -2.50, 0.22, h, 0.95, 0x475569); // Vách ngăn Trục 2 (giữa P.Khách & Bàn Ăn)
      addBox(-1.10, 0, 1.15, 0.22, h, 0.65, 0x475569);  // Trụ cột giữa P.Khách - Tiền Sảnh - Bàn Ăn
      addBox(-4.35, 0, 1.15, 1.65, h, 0.18, 0x334155);  // Tường ranh giới phía dưới P.Khách (Trục B)

      // --- 1. TIỀN SẢNH (Góc Dưới-Trái: Trục 1'–2, A–B | x từ -4.15 đến -1.55, z từ +1.20 đến +2.90) ---
      // Ô trần giật cấp Tiền Sảnh (+3.53m, KT: 2090×1125mm) + Khe LED hắt 4 cạnh (Lộ 2)
      addFourSidedCoffer(-2.85, h, 2.05, 2.10, 1.12, 'L2', 0xffcf78);

      // Lộ 1: ĐÚNG 4 BÓNG SPOTLIGHT 12W Ở 4 GÓC Ô TRẦN TIỀN SẢNH (2090×1125mm chuẩn CĐ-11 & KT-4.06!)
      [
        [-3.90, 1.48], [-1.80, 1.48],
        [-3.90, 2.62], [-1.80, 2.62]
      ].forEach(([xp, zp], idx) => {
        createAimableSpotlight({
          x: xp, y: h - 0.12, z: zp,
          circuitId: 'L1', colorHex: 0xfffbeb, watt: 12,
          baseTiltDeg: 0, baseYawDeg: 0, beamDeg: 24, cutoutMm: 75,
          label: idx === 0 ? 'Lộ 1: Đúng 4 Spotlight 4 Góc Tiền Sảnh (2090×1125mm)' : ''
        });
      });

      // --- 2. PHÒNG KHÁCH (Góc Trên-Trái: Trục 1–2, B–C | x từ -5.20 đến -1.15, z từ -2.85 đến +1.05) ---
      // Ô trần giật cấp trung tâm P.Khách (+3.53m, KT: 2370×3100mm) + Khe LED dây hắt 4 cạnh (Lộ 4 — ký hiệu —LED—) & Khe rèm Tây
      addFourSidedCoffer(-3.15, h, -0.80, 2.15, 2.75, 'L2', 0xffcf78);
      createCoveStrip({ x: -5.35, y: h - 0.08, z: -0.80, w: 0.10, d: 3.40, circuitId: 'L2', colorHex: 0xffcf78 }); // Khe rèm Tây

      // Lộ 5 (L5_TRACK): KHUNG CHỮ NHẬT ĐÈN RAY NAM CHÂM / THANH LED ÂM TRẦN (KT: 1825×2200mm, lùi vào 215mm bên trong lòng trần +3.530m chuẩn KT-4.01 & CĐ-11!)
      // Vẽ rãnh ray đen âm trần + 4 dải sáng của khung Lộ 5:
      const trackEdges = new THREE.EdgesGeometry(new THREE.BoxGeometry(1.68, 0.03, 2.22));
      const trackLine = new THREE.LineSegments(trackEdges, new THREE.LineBasicMaterial({ color: 0x020617 }));
      trackLine.position.set(-3.15, h - 0.02, -0.80);
      rootGroup.add(trackLine);
      createCoveStrip({ x: -3.15, y: h - 0.02, z: -1.91, w: 1.68, d: 0.05, circuitId: 'L5_TRACK', colorHex: 0xfef3c7 });
      createCoveStrip({ x: -3.15, y: h - 0.02, z:  0.31, w: 1.68, d: 0.05, circuitId: 'L5_TRACK', colorHex: 0xfef3c7 });
      createCoveStrip({ x: -3.99, y: h - 0.02, z: -0.80, w: 0.05, d: 2.22, circuitId: 'L5_TRACK', colorHex: 0xfef3c7 });
      createCoveStrip({ x: -2.31, y: h - 0.02, z: -0.80, w: 0.05, d: 2.22, circuitId: 'L5_TRACK', colorHex: 0xfef3c7 });

      // 02 Khe gió điều hòa âm trần P.Khách (150×1200mm) chạy DỌC hai bên trái/phải của ô giật cấp (chuẩn KT-4.06)
      addLinearACSlot(-4.35, h - 0.10, -0.80, 0.16, 1.25);
      addLinearACSlot(-1.95, h - 0.10, -0.80, 0.16, 1.25);

      // Nội thất Phòng Khách
      addBox(-3.15, 0, 0.45, 2.75, 0.44, 0.88, 0x475569); // Sofa băng dài
      addBox(-3.15, 0.44, 0.82, 2.75, 0.42, 0.16, 0x64748b);
      addBox(-4.35, 0, -0.35, 0.85, 0.44, 1.55, 0x475569); // Đôn chữ L dọc tường Tây
      addBox(-3.15, 0, -0.80, 1.30, 0.38, 0.75, 0xd97706); // Bàn trà trung tâm (ngay dưới tâm Quạt trần Lộ 6)
      addBox(-3.15, 0, -2.65, 2.65, 0.46, 0.42, 0x334155); // Kệ Tivi Bắc (đã bịt 2 cửa sổ V2)
      addBox(-3.15, 0.72, -2.82, 1.85, 1.05, 0.06, 0x0f172a); // Smart TV 75"

      // Lộ 3: ĐÚNG 12 BÓNG SPOTLIGHT 12W XẾP KHUNG CHỮ NHẬT 4×4 THẲNG HÀNG CHUẨN CĐ-11 & KT-4.06!
      // - Hàng Bắc (z = -2.45, cách tường trên 300mm): 4 bóng cách đều 1220mm (-4.95, -3.75, -2.55, -1.35)
      // - Hàng Nam (z = +0.85, cách vách sảnh 300mm): 4 bóng cách đều 1220mm (-4.95, -3.75, -2.55, -1.35)
      [-4.95, -3.75, -2.55, -1.35].forEach((xp, idx) => {
        createAimableSpotlight({
          x: xp, y: h - 0.12, z: -2.45,
          circuitId: 'L3', colorHex: 0xfff7ed, watt: 12,
          baseTiltDeg: 15, baseYawDeg: 180, beamDeg: 24, cutoutMm: 75,
          label: idx === 1 ? 'Lộ 3: Khung Chữ Nhật 4×4 (12 Bóng Viền Ngoài 2 Khe Gió Điều Hòa)' : ''
        });
        createAimableSpotlight({
          x: xp, y: h - 0.12, z: 0.85,
          circuitId: 'L3', colorHex: 0xfff7ed, watt: 12,
          baseTiltDeg: 15, baseYawDeg: 0, beamDeg: 24, cutoutMm: 75
        });
      });
      // - Cột Tây (x = -4.95) & Cột Đông (x = -1.35): mỗi cột 2 bóng giữa tại z = -1.35 và z = -0.25 (thẳng tắp với 4 góc!)
      [-1.35, -0.25].forEach((zp) => {
        createAimableSpotlight({ x: -4.95, y: h - 0.12, z: zp, circuitId: 'L3', colorHex: 0xfff7ed, watt: 12, baseTiltDeg: 15, baseYawDeg: -90, beamDeg: 24, cutoutMm: 75 });
        createAimableSpotlight({ x: -1.35, y: h - 0.12, z: zp, circuitId: 'L3', colorHex: 0xfff7ed, watt: 12, baseTiltDeg: 15, baseYawDeg: 90, beamDeg: 24, cutoutMm: 75 });
      });

      // Lộ 6 (Tâm ô trần giật cấp P.Khách x = -3.15, z = -0.80):
      // Chế độ CĐ-11 (!altOptionActive): Quạt trần kèm đèn LED Lộ 6
      // Chế độ KT-4.06 (altOptionActive): 2 cặp Spotlight đôi cách nhau 200mm (985mm từ mép trái/phải ô trần)
      if (!altOptionActive) {
        createCeilingFanWithLight({ x: -3.15, y: h, z: -0.80, circuitId: 'L6', colorHex: 0xffe4b5 });
      } else {
        [-3.65, -2.65].forEach((xp) => {
          createAimableSpotlight({ x: xp, y: h, z: -0.90, circuitId: 'L6', colorHex: 0xfff7ed, watt: 7, baseTiltDeg: 5, baseYawDeg: 0, beamDeg: 24, cutoutMm: 75 });
          createAimableSpotlight({ x: xp, y: h, z: -0.70, circuitId: 'L6', colorHex: 0xfff7ed, watt: 7, baseTiltDeg: 5, baseYawDeg: 0, beamDeg: 24, cutoutMm: 75 });
        });
      }

      // --- 3. PHÒNG ĂN & SẢNH THANG (Khu Giữa: Trục 2–3 | x từ -1.00 đến +2.05) ---
      // Bàn Ăn 8 ghế (x = 0.45, z = -0.65)
      addBox(0.45, 0, -0.65, 2.05, 0.76, 0.98, 0x92400e);
      // Khe gió điều hòa âm trần khu Bàn Ăn (150×1200mm) chạy dọc tại x = 1.42, z = -0.65 (giữa Bàn Ăn & Đảo Bếp chuẩn KT-4.06!)
      addLinearACSlot(1.42, h - 0.12, -0.65, 0.16, 1.25);

      // Lộ 6A (Tâm Bàn Ăn x = 0.45, z = -0.65):
      // Chế độ CĐ-11 (!altOptionActive): Quạt trần kèm đèn LED Lộ 6A
      // Chế độ KT-4.06 (altOptionActive): Cặp 2 Spotlight đôi cách nhau 200mm ngay tâm Bàn Ăn
      if (!altOptionActive) {
        createCeilingFanWithLight({ x: 0.45, y: h - 0.12, z: -0.65, circuitId: 'L6A', colorHex: 0xffd89b });
      } else {
        createAimableSpotlight({ x: 0.35, y: h - 0.12, z: -0.65, circuitId: 'L6A', colorHex: 0xffd89b, watt: 12, baseTiltDeg: 5, baseYawDeg: 0, beamDeg: 24, cutoutMm: 75 });
        createAimableSpotlight({ x: 0.55, y: h - 0.12, z: -0.65, circuitId: 'L6A', colorHex: 0xffd89b, watt: 12, baseTiltDeg: 5, baseYawDeg: 0, beamDeg: 24, cutoutMm: 75 });
      }

      // Lộ 5A: KHỚP 100% ĐƯỜNG DÂY 5A TRÊN BẢN VẼ CĐ-11 & KT-4.06!
      // 1) Cột dọc 3 bóng chạy dọc theo khe gió điều hòa giữa Bàn Ăn & Đảo Bếp (x = 1.72, cách đều 1200mm + 1200mm)
      [-1.95, -0.75, 0.45].forEach((zp, idx) => {
        createAimableSpotlight({
          x: 1.72, y: h - 0.12, z: zp,
          circuitId: 'L5A', colorHex: 0xfffbeb, watt: 12,
          baseTiltDeg: 0, baseYawDeg: 0, beamDeg: 36, cutoutMm: 75,
          label: idx === 1 ? 'Lộ 5A: Cột 3 Bóng Dọc Khe Gió (1200+1200mm) + 2 Bóng Ngang Sảnh Thang (1700mm)' : ''
        });
      });
      // 2) Hàng ngang 2 bóng phía dưới Bàn Ăn (trước Cầu thang & WC1, z = +1.45, cách nhau 1700mm + 1700mm chuẩn CĐ-11 & KT-4.06)
      [-0.95, 0.55].forEach((xp) => {
        createAimableSpotlight({ x: xp, y: h - 0.12, z: 1.45, circuitId: 'L5A', colorHex: 0xfffbeb, watt: 12, baseTiltDeg: 0, baseYawDeg: 0, beamDeg: 36, cutoutMm: 75 });
      });
      // 3) Trên bản vẽ trần KT-4.06 có thêm 2 bóng phía Bắc bàn ăn (800mm + 1200mm)
      if (altOptionActive) {
        [-0.45, 0.55].forEach((xp) => {
          createAimableSpotlight({ x: xp, y: h - 0.12, z: -1.95, circuitId: 'L5A', colorHex: 0xfffbeb, watt: 12, baseTiltDeg: 0, baseYawDeg: 0, beamDeg: 36, cutoutMm: 75 });
        });
      }

      // --- 4. KHU BẾP & ĐẢO BẾP (Bên Phải: Trục 3–4 | x từ +2.10 đến +5.35, z từ -2.85 đến +1.05) ---
      // Đảo Bếp / Bàn Bar dọc theo Trục 3 (x = 2.35, z từ -0.15 đến +0.95)
      addBox(2.35, 0, 0.40, 0.72, 0.88, 1.35, 0x64748b);
      // Hệ Tủ Bếp Chữ L (Cạnh Bắc z = -2.55: Chậu rửa + Bếp từ; Cạnh Đông x = 5.05: Tủ lạnh + Tủ đồ khô)
      addBox(3.75, 0, -2.55, 3.10, 0.86, 0.62, 0x334155); // Tủ bếp dưới Bắc
      addBox(3.75, 1.45, -2.66, 3.10, 0.85, 0.38, 0x475569); // Tủ bếp trên Bắc
      addBox(5.05, 0, -1.05, 0.62, 2.25, 2.40, 0x334155); // Hệ tủ lạnh & tủ khô cạnh Đông

      // 02 Khe gió điều hòa âm trần Khu Bếp (150×1200mm) chạy dọc ở 2 bên vùng đứng nấu (x = 2.95 và x = 4.35 chuẩn KT-4.06!)
      addLinearACSlot(2.95, h - 0.12, -1.05, 0.16, 1.20);
      addLinearACSlot(4.35, h - 0.12, -1.05, 0.16, 1.20);

      // LED thanh nhôm dưới đáy tủ bếp trên (Lộ 10/11 — 550 Lux rọi mặt đá bếp)
      createCoveStrip({ x: 3.75, y: 1.43, z: -2.48, w: 2.95, d: 0.08, circuitId: 'L12', colorHex: 0xf8fafc });

      // Lộ 12 (Phần 1): CỤM 3 BÓNG SPOTLIGHT 7W XẾP DỌC CÁCH NHAU 200mm (200+200mm) TRÊN ĐẢO BẾP / TRỤC 3!
      // Đúng từng milimet trên CĐ-11 & KT-4.06: Nằm dọc theo trục Z tại x = 2.35, z = [+0.18, +0.38, +0.58]!
      [0.18, 0.38, 0.58].forEach((zp, idx) => {
        createAimableSpotlight({
          x: 2.35, y: h - 0.12, z: zp,
          circuitId: 'L12', colorHex: 0xfffbeb, watt: 7,
          baseTiltDeg: 5, baseYawDeg: 0, beamDeg: 24, cutoutMm: 75,
          label: idx === 1 ? 'Cụm 3 Đèn 7W Xếp Dọc Cách 200mm Trên Đảo Bếp (Đúng CĐ-11 & KT-4.06)' : ''
        });
      });

      // Lộ 12 (Phần 2): 5 BÓNG SPOTLIGHT 12W BẾP XẾP HÌNH CHỮ T ĐÚNG BẢN VẼ CĐ-11 & KT-4.06!
      // - 3 bóng hàng ngang phía trên (z = -2.25, cách tường trên 500mm, cách nhau 1200mm + 1200mm + 550mm):
      [2.45, 3.65, 4.85].forEach((xp, idx) => {
        createAimableSpotlight({
          x: xp, y: h - 0.12, z: -2.25,
          circuitId: 'L12', colorHex: 0xf8fafc, watt: 12,
          baseTiltDeg: 8, baseYawDeg: 180, beamDeg: 36, cutoutMm: 75,
          label: idx === 1 ? 'Lộ 12: 3 Đèn Ngang Bàn Bếp Trên (1200+1200mm) + 2 Đèn Dọc Giữa 2 Khe Gió' : ''
        });
      });
      // - 2 bóng thả dọc xuống chính giữa 2 khe gió điều hòa bếp (x = 3.65, tại z = -1.05 và z = +0.15, cách nhau 1200mm + 1200mm):
      [-1.05, 0.15].forEach((zp) => {
        createAimableSpotlight({
          x: 3.65, y: h - 0.12, z: zp,
          circuitId: 'L12', colorHex: 0xf8fafc, watt: 12,
          baseTiltDeg: 0, baseYawDeg: 0, beamDeg: 36, cutoutMm: 75
        });
      });

      // Dialux Heatmap Patches
      createHeatmapPatch(-2.85, 0.03, 2.05, 0.95, 320, 'L1');
      createHeatmapPatch(-3.15, 0.40, -0.80, 1.25, 380, 'L6');
      createHeatmapPatch(0.45, 0.78, -0.65, 1.05, 420, 'L6A');
      createHeatmapPatch(2.35, 0.90, 0.40, 0.75, 460, 'L12');
      createHeatmapPatch(3.65, 0.88, -1.95, 1.15, 550, 'L12');

      labelAnchors = [
        { pos: new THREE.Vector3(-2.85, 2.65, 2.05), text: 'Tiền Sảnh: Đúng 4 Bóng 4 Góc (Lộ 1 — 2090×1125mm)', cls: 'sky' },
        { pos: new THREE.Vector3(-3.15, 2.75, -0.80), text: altOptionActive ? 'KT-4.06: 2 Cặp Đèn Đôi 200mm Giữa P.Khách' : 'CĐ-11 Lộ 6: Quạt Trần Đèn Tâm P.Khách + 12 Đèn Chu Vi 4×4', cls: 'amber' },
        { pos: new THREE.Vector3(0.45, 2.60, -0.65), text: altOptionActive ? 'KT-4.06: Cặp Đèn Đôi 200mm Tâm Bàn Ăn' : 'CĐ-11 Lộ 6A: Quạt Trần Đèn Bàn Ăn + Lộ 5A Dọc Khe Gió', cls: 'emerald' },
        { pos: new THREE.Vector3(2.35, 1.85, 0.40), text: 'Lộ 12: Cụm 3 Đèn 7W Xếp Dọc (200+200mm) Trên Đảo Bếp', cls: 'purple' },
        { pos: new THREE.Vector3(3.65, 2.55, -1.05), text: 'Lộ 12: 5 Đèn 12W Hình Chữ T Giữa 2 Khe Điều Hòa Bếp', cls: 'rose' }
      ];
    }

    // Helper: Draw Barrisol Translucent Moon Dome Ø1.200mm (Vòm Tròn Mặt Trăng Xuyên Sáng Lộ 18A chuẩn thiết kế 980f20f6)
    function addBarrisolMoonDome(x, y, z, radius, circuitId, colorHex = 0xfff3d6) {
      // Dark bronze architectural trim ring
      const rim = new THREE.Mesh(
        new THREE.CylinderGeometry(radius + 0.04, radius + 0.04, 0.06, 48, 1, true),
        new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.4, metalness: 0.5, side: THREE.DoubleSide })
      );
      rim.position.set(x, y - 0.04, z);
      rootGroup.add(rim);

      // Glowing Barrisol stretched membrane disc
      const mat = new THREE.MeshBasicMaterial({
        color: colorHex,
        transparent: true,
        opacity: 0.92,
        side: THREE.DoubleSide
      });
      const mesh = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, 0.03, 48), mat);
      mesh.position.set(x, y - 0.03, z);
      rootGroup.add(mesh);

      // Soft downward volumetric moon-glow cone & ceiling halo
      const glowMat = new THREE.MeshBasicMaterial({
        color: colorHex,
        transparent: true,
        opacity: 0.22,
        side: THREE.DoubleSide,
        depthWrite: false,
        blending: THREE.AdditiveBlending
      });
      const glowMesh = new THREE.Mesh(new THREE.ConeGeometry(radius * 1.45, 2.35, 36, 1, true), glowMat);
      glowMesh.position.set(x, y - 1.20, z);
      rootGroup.add(glowMesh);

      const light = new THREE.PointLight(colorHex, 0.52, 5.2, 1.4);
      light.position.set(x, y - 0.18, z);
      rootGroup.add(light);

      const strip = { mesh, mat, glowMesh, glowMat, light, circuitId, colorHex };
      coveStrips.push(strip);
      return strip;
    }

    // ==================== BUILD ZONE 2: TẦNG 2 — PHÒNG MASTER OPEN-SUITE (CHUẨN THIẾT KẾ 980f20f6 & KT-4.02 / CĐ-12) ====================
    function buildZoneT2() {
      const { w, d, h } = ZONE_CONFIGS.T2.dims;
      buildRoomShell(w, d, h);

      // HỆ TỌA ĐỘ CHUẨN BẮC – NAM (Trục C → Trục B → Trục A, Tổng dài 3.01m + 2.70m + 1.52m = 7.23m):
      // - Phía Bắc (z từ -3.65 đến -0.64, dài 3.01m): KHU GIƯỜNG NGỦ MASTER (Trục B–C) + LOGIA 01 (Tây) + HỐC TỦ ÂM TƯỜNG #3 (Đông)
      // - Ranh giới Trục B (z = -0.64): GHẾ BENCH CAM HERMES (1.25×0.45m) dưới sàn + DÀN LẠNH IN 2.3 (18.000 BTU) & LỖ THĂM TRẦN trên trần
      // - Khu Giữa (z từ -0.64 đến +2.06, dài 2.70m): KHU THAY ĐỒ • VÒM MẶT TRĂNG Ø1.2m • BÀN ĐẢO KÍNH • TỦ #1-#2 • BÀN CỬA SỔ O2
      // - Phía Nam (z từ +2.06 đến +3.58, dài 1.52m): PHÒNG TẮM WC-02 MASTER (+2.40m) chia 3 khoang chuẩn KT-5.03

      // --- VÁCH BAO & PHÂN KHU KIẾN TRÚC ---
      // 1) Tường Tây (Trục 1, x = -1.72) ngăn giữa Khu Ngủ và Logia 01 (mở cửa kính lùa O2 rộng 2.56m)
      addBox(-1.72, 0, -3.45, 0.14, h, 0.40, 0x334155); // Trụ góc Tây-Bắc
      addBox(-1.72, 0, -0.74, 0.14, h, 0.35, 0x334155); // Trụ Trục B Tây
      addBox(-1.72, 0, -2.10, 0.06, 2.55, 2.40, 0x38bdf8, 0.24); // Cửa kính lùa O2 (2.56m) ra Logia 01
      // Sàn & Lan can kính Logia 01 bên Tây (x từ -2.92 đến -1.72, z từ -3.65 đến -0.64)
      addBox(-2.32, 0.01, -2.15, 1.18, 0.04, 3.00, 0x334155); // Sàn gạch chống trơn Logia 01
      addBox(-2.90, 0, -2.15, 0.06, 1.10, 3.00, 0x38bdf8, 0.32); // Lan can kính Logia 01
      addBox(-2.55, 0.05, -3.25, 0.38, 0.65, 0.38, 0x15803d); // Chậu cây xanh Logia 01

      // 2) Tường Đông Khu Ngủ & Khu Thay Đồ (Trục 2, x = +1.72, mở rộng hốc Tủ #3 ra x = +2.32)
      // Vách kính cố định O2 (750mm) ở góc Đông-Bắc nhìn ra Khu Thư Giãn Tầng 2 (z từ -3.55 đến -2.80)
      addBox(1.72, 0, -3.18, 0.06, 2.60, 0.75, 0x38bdf8, 0.28);
      // Tường Đông Khu Thay Đồ (chừa Cửa gỗ chính O1 rộng 900mm tại z từ -0.50 đến +0.40)
      addBox(1.72, 0, -0.05, 0.08, 2.35, 0.88, 0x78350f, 0.55); // Cửa chính O1 (900mm)
      addBox(1.72, 0, 1.25, 0.14, h, 1.65, 0x334155); // Tường Đông đoạn cột BTCT 330mm

      // ==================== KHU 1: KHU GIƯỜNG NGỦ MASTER (PHÍA BẮC — TRỤC B–C, z từ -3.65 đến -0.64) ====================
      // Vách đầu giường Bắc (Trục C, z = -3.56): Ốp gỗ Sồi ghép xương cá + 2 khe LED hắt dọc (Lộ 16)
      addBox(0.0, 0, -3.56, 3.36, 2.85, 0.10, 0x78350f);
      createCoveStrip({ x: -1.18, y: 1.45, z: -3.49, w: 0.06, d: 0.06, circuitId: 'M16', colorHex: 0xffb74d });
      createCoveStrip({ x: 1.18, y: 1.45, z: -3.49, w: 0.06, d: 0.06, circuitId: 'M16', colorHex: 0xffb74d });

      // Giường Ngủ Master King Size (2.00m × 2.20m) tại x = 0, z = -2.42
      addBox(0.0, 0, -2.42, 2.02, 0.44, 2.20, 0x475569); // Khung giường bọc nỉ
      addBox(0.0, 0.44, -2.40, 1.86, 0.12, 2.05, 0xe2e8f0); // Đệm trắng cao cấp
      addBox(-0.48, 0.56, -3.18, 0.68, 0.14, 0.42, 0xf8fafc); // Gối Trái
      addBox(0.48, 0.56, -3.18, 0.68, 0.14, 0.42, 0xf8fafc);  // Gối Phải
      addBox(0.0, 0.57, -1.68, 1.88, 0.04, 0.52, 0xea580c);   // Tấm chăn điểm nhấn Cam Hermes cuối giường

      // 02 Táp Đầu Giường Treo Tường (550×420mm) hai bên giường + Đèn ngủ Táp (Lộ 16)
      addBox(-1.32, 0.32, -3.32, 0.55, 0.24, 0.42, 0x451a03);
      addBox(1.32, 0.32, -3.32, 0.55, 0.24, 0.42, 0x451a03);
      createCoveStrip({ x: -1.32, y: 0.95, z: -3.32, w: 0.20, d: 0.20, circuitId: 'M16', colorHex: 0xffb74d });
      createCoveStrip({ x: 1.32, y: 0.95, z: -3.32, w: 0.20, d: 0.20, circuitId: 'M16', colorHex: 0xffb74d });

      // HỆ TỦ ÁO ÂM TƯỜNG #3 (2.010 × 600mm) NẰM TRONG HỐC TƯỜNG ĐÔNG KHU NGỦ (x từ +1.72 đến +2.32, z từ -2.75 đến -0.74)
      addBox(2.02, 0, -1.75, 0.60, 2.95, 2.01, 0x78350f, 0.85);
      // Cánh kính khói & Thanh LED dọc bên trong Tủ Áo Âm Tường #3 (Lộ 19)
      createCoveStrip({ x: 1.74, y: 2.35, z: -1.75, w: 0.06, d: 1.85, circuitId: 'M19', colorHex: 0xffedd5 });

      // Vùng cảnh báo đỏ trên gối khi để góc chóa 0° (Thẳng đứng gây chói mắt người nằm)
      const glareGeo = new THREE.CylinderGeometry(0.68, 0.88, 0.12, 28);
      const glareMat = new THREE.MeshBasicMaterial({ color: 0xf43f5e, transparent: true, opacity: 0.0, depthWrite: false });
      glareWarningMesh = new THREE.Mesh(glareGeo, glareMat);
      glareWarningMesh.position.set(0.0, 0.68, -2.85);
      rootGroup.add(glareWarningMesh);

      // TRẦN KHU NGỦ (+3.13m): Hộp trần giật cấp bo góc mềm (2.60m × 2.45m) + Khe LED COB 3000K (Lộ 14) + Hốc rèm Tây
      addFourSidedCoffer(0.0, h, -2.15, 2.60, 2.45, 'M14', 0xffcf78);
      createCoveStrip({ x: -1.60, y: h - 0.08, z: -2.15, w: 0.10, d: 2.55, circuitId: 'M14', colorHex: 0xffcf78 }); // Hốc rèm tự động Logia 01

      // 02 KHE GIÓ ĐIỀU HÒA TUYẾN TÍNH SƠN ĐEN KHU NGỦ (SAG & RAG 150×1.000mm) chạy dọc 2 bên Tây/Đông hộp trần!
      addLinearACSlot(-1.44, h - 0.10, -2.15, 0.15, 1.00);
      addLinearACSlot(1.44, h - 0.10, -2.15, 0.15, 1.00);

      // LỘ 15B / LỘ 16-GIỮA: CẶP 02 BÓNG SPOTLIGHT CHÓA SÂU 7W 3000K CÁCH NHAU 200mm TẠI TÂM GIƯỜNG (z = -2.15)
      // BẮT BUỘC BẺ GÓC CHÓA 25° VỀ HƯỚNG NAM (GHẾ BENCH CUỐI GIƯỜNG, Yaw = 0°) ĐỂ NẰM NGỬA KHÔNG CHÓI MẮT!
      [-0.10, 0.10].forEach((xp, idx) => {
        createAimableSpotlight({
          x: xp, y: h, z: -2.15,
          circuitId: 'M15C', colorHex: 0xffd89b, watt: 7,
          baseTiltDeg: 25, baseYawDeg: 0, beamDeg: 24, cutoutMm: 75,
          label: idx === 0 ? 'Lộ 15B (Giữa Giường): 2 Đèn Đôi 7W Cách 200mm (Bẻ 25° Về Ghế Bench — Không Chói Gối!)' : ''
        });
      });

      // LỘ 15A (06 BÓNG SPOTLIGHT 9W 3000K VIỀN KHU NGỦ CHUẨN BẢN VẼ):
      // 1) 02 bóng ở viền Bắc (trên 2 Táp đầu giường, x = [-1.25, +1.25], z = -3.25): Bẻ 15° về hướng Bắc (Yaw = 180°) rửa vách gỗ xương cá
      [-1.25, 1.25].forEach((xp) => {
        createAimableSpotlight({
          x: xp, y: h - 0.10, z: -3.25,
          circuitId: 'M15P', colorHex: 0xffd89b, watt: 9,
          baseTiltDeg: 15, baseYawDeg: 180, beamDeg: 24, cutoutMm: 75
        });
      });
      // 2) 02 bóng ở viền Đông (trước Hốc Tủ Áo Âm Tường #3, x = +1.28, z = [-2.25, -1.25]): Bẻ 18° về hướng Đông (Yaw = +90°) rọi thẳng vào Tủ #3!
      [-2.25, -1.25].forEach((zp, idx) => {
        createAimableSpotlight({
          x: 1.28, y: h - 0.10, z: zp,
          circuitId: 'M15P', colorHex: 0xffd89b, watt: 9,
          baseTiltDeg: 18, baseYawDeg: 90, beamDeg: 24, cutoutMm: 75,
          label: idx === 0 ? 'Lộ 15A (Đông): 2 Spotlight Bẻ 18° Rọi Thẳng Vào Hốc Tủ Áo Âm Tường #3 (2.010mm)' : ''
        });
      });
      // 3) 02 bóng ở viền Tây (dọc lối đi cửa lùa Logia 01, x = -1.28, z = [-2.25, -1.15]): Bẻ 15° về hướng Tây (Yaw = -90°)
      [-2.25, -1.15].forEach((zp) => {
        createAimableSpotlight({
          x: -1.28, y: h - 0.10, z: zp,
          circuitId: 'M15P', colorHex: 0xffd89b, watt: 9,
          baseTiltDeg: 15, baseYawDeg: -90, beamDeg: 24, cutoutMm: 75
        });
      });

      // ==================== RANH GIỚI TRỤC B (z = -0.64: GHẾ BENCH CAM HERMES & DÀN LẠNH IN 2.3) ====================
      if (!altOptionActive) {
        // PHƯƠNG ÁN OPEN-SUITE (Chuẩn 980f20f6): Bỏ vách ngăn Tivi Trục B, đặt Ghế Bench Cam Hermes (1.250 × 450 × Cao 420mm) ngay đuôi giường!
        addBox(0.0, 0.0, -0.95, 1.20, 0.26, 0.40, 0x1e293b);  // Khung chân kim loại sơn đen mảnh
        addBox(0.0, 0.26, -0.95, 1.25, 0.16, 0.45, 0xea580c); // Đệm da bò Cam Hermes bo tròn
      } else {
        // PHƯƠNG ÁN BẢN VẼ GỐC KT-2.08 / CĐ-12: Có xây vách ngăn Tivi (2.840mm) tại Trục B (z = -0.64)
        addBox(-0.30, 0, -0.64, 2.25, h, 0.14, 0x475569, 0.72);
      }

      // Trên trần tại Trục B (y = h - 0.13, z = -0.64): Hộp Dàn lạnh âm trần nối ống gió IN 2.3 (18.000 BTU/H) + Nắp thăm trần 450×450mm chuẩn CĐ-16
      addBox(0.0, h - 0.06, -0.64, 1.10, 0.24, 0.55, 0x0ea5e9, 0.25); // Thân máy lạnh âm trần IN 2.3
      const hatchEdges = new THREE.EdgesGeometry(new THREE.BoxGeometry(0.45, 0.02, 0.45));
      const hatchLine = new THREE.LineSegments(hatchEdges, new THREE.LineBasicMaterial({ color: 0x38bdf8 }));
      hatchLine.position.set(-0.78, h - 0.10, -0.64);
      rootGroup.add(hatchLine);

      // ==================== KHU 2: KHU THAY ĐỒ • BÀN ĐẢO KÍNH • BÀN PHẤN/LV O2 (TRỤC A–B, z từ -0.64 đến +2.06) ====================
      // 1) CHÍNH TÂM KHU THAY ĐỒ (x = 0, z = +0.68): Thảm trải sàn + BÀN ĐẢO MẶT KÍNH GỖ EBONY ĐEN BÓNG (1.150 × 550 × Cao 850mm)
      addBox(0.0, 0.008, 0.68, 2.20, 0.015, 1.65, 0x334155); // Thảm dệt trung tâm Khu Thay Đồ
      addBox(0.0, 0.0, 0.68, 1.15, 0.74, 0.55, 0x0f172a);    // Thân Bàn Đảo gỗ Ebony đen bóng
      addBox(0.0, 0.74, 0.68, 1.15, 0.11, 0.55, 0x38bdf8, 0.42); // Mặt kính cường lực lộ khay trang sức/đồng hồ
      // Đèn LED thanh bên trong ngăn kéo kính Bàn Đảo & 2 hốc sáng bên hông (Lộ 19)
      createCoveStrip({ x: 0.0, y: 0.76, z: 0.68, w: 0.98, d: 0.38, circuitId: 'M19', colorHex: 0xffedd5 });
      createCoveStrip({ x: 0.0, y: 0.06, z: 0.68, w: 1.08, d: 0.48, circuitId: 'M19', colorHex: 0xffcf78 });

      // 2) TƯỜNG NAM KHU THAY ĐỒ (Giáp WC-02, z = +1.76, tổng rộng 3.440mm):
      // - Bên Trái (Tây-Nam, x = -1.13): TỦ ÁO GỖ XƯƠNG CÁ #1 (1.180 × 600mm) kịch trần + LED trong tủ (Lộ 19)
      addBox(-1.13, 0, 1.76, 1.18, 2.95, 0.60, 0x78350f, 0.88);
      createCoveStrip({ x: -1.13, y: 2.35, z: 1.48, w: 1.02, d: 0.06, circuitId: 'M19', colorHex: 0xffedd5 });
      // - Chính Giữa (x = 0, rộng 1.080mm): CỬA KÍNH KHÓI KHUNG NHÔM ĐEN (1.080mm) mở thẳng vào WC-02!
      addBox(0.0, 0, 2.02, 1.08, 2.40, 0.05, 0x0ea5e9, 0.26);
      // - Bên Phải (Đông-Nam, x = +1.13): TỦ ÁO GỖ XƯƠNG CÁ #2 (1.180 × 600mm) kịch trần + LED trong tủ (Lộ 19)
      addBox(1.13, 0, 1.76, 1.18, 2.95, 0.60, 0x78350f, 0.88);
      createCoveStrip({ x: 1.13, y: 2.35, z: 1.48, w: 1.02, d: 0.06, circuitId: 'M19', colorHex: 0xffedd5 });

      // 3) TƯỜNG TÂY KHU THAY ĐỒ (x = -1.72, dài 2.700mm):
      // - Cửa sổ O2 (1.250mm, z từ -0.45 đến +0.80) + Rèm sáo gỗ tối màu
      addBox(-1.70, 0.90, 0.18, 0.06, 1.55, 1.25, 0x38bdf8, 0.28);
      // - BÀN PHẤN & BÀN LÀM VIỆC TREO TƯỜNG (1.330 × 500mm) cốt +0.75m + Gương tròn LED + Đôn tròn da Cam Hermes (Ø380mm)
      addBox(-1.45, 0.68, 0.18, 0.50, 0.10, 1.33, 0x451a03); // Mặt bàn treo tường gỗ tối màu
      addBox(-1.35, 0.0, 0.18, 0.36, 0.42, 0.36, 0xea580c);  // Đôn tròn da Cam Hermes đút gầm bàn
      // - 02 Cột bo tròn ốp gỗ tối màu kèm khe hắt LED dọc kẹp 2 bên cửa sổ O2 (Lộ 19)
      addBox(-1.62, 0, -0.48, 0.18, 2.90, 0.18, 0x1e293b);
      addBox(-1.62, 0, 0.84, 0.18, 2.90, 0.18, 0x1e293b);
      createCoveStrip({ x: -1.52, y: 1.50, z: -0.48, w: 0.05, d: 0.08, circuitId: 'M19', colorHex: 0xffcf78 });
      createCoveStrip({ x: -1.52, y: 1.50, z: 0.84, w: 0.05, d: 0.08, circuitId: 'M19', colorHex: 0xffcf78 });
      // - KỆ TRƯNG BÀY TÚI XÁCH & NƯỚC HOA CÁNH KÍNH ĐEN (440 × 380mm) trên đoạn tường đặc 610mm (z = +1.18) nối với Tủ #1!
      addBox(-1.51, 0, 1.18, 0.38, 2.95, 0.44, 0x0f172a, 0.88);
      createCoveStrip({ x: -1.35, y: 1.65, z: 1.18, w: 0.06, d: 0.38, circuitId: 'M19', colorHex: 0xffedd5 });

      // 4) TƯỜNG ĐÔNG KHU THAY ĐỒ (x = +1.72):
      // - Hệ Vách Bọc Cột 330mm + GƯƠNG SOI TOÀN THÂN HẮT LED VIỀN & Tủ Phụ Kiện Mỏng (960 × 220mm, z = +0.95) nối tới Tủ #2!
      addBox(1.58, 0, 0.95, 0.22, 2.85, 0.96, 0x334155);
      createCoveStrip({ x: 1.46, y: 1.40, z: 0.95, w: 0.04, d: 0.78, circuitId: 'M19', colorHex: 0xfff3d6 });

      // 5) TRẦN & ĐÈN KHU THAY ĐỒ (Chính tâm x = 0, z = +0.68):
      // 02 KHE GIÓ ĐIỀU HÒA TUYẾN TÍNH SƠN ĐEN KHU THAY ĐỒ (SAG & RAG 150×800mm) kẹp 2 bên Vòm Mặt Trăng (thẳng hàng dọc với Khu Ngủ!)
      addLinearACSlot(-1.05, h - 0.10, 0.68, 0.15, 0.80);
      addLinearACSlot(1.05, h - 0.10, 0.68, 0.15, 0.80);

      if (!altOptionActive) {
        // PHƯƠNG ÁN OPEN-SUITE (Chuẩn 980f20f6 & master_ceiling_lighting_ac_2d.png):
        // - Lộ 18A: VÒM TRÒN MẶT TRĂNG XUYÊN SÁNG BARRISOL Ø1.200mm (radius = 0.60m, 60W) ngay trên Bàn Đảo Mặt Kính!
        addBarrisolMoonDome(0.0, h, 0.68, 0.60, 'M18A', 0xfff3d6);

        // - Lộ 18B: 04 BÓNG SPOTLIGHT CHÓA SÂU 9W 4000K CRI≥92:
        //   + 02 bóng phía trước Tủ #1 & Tủ #2 (x = [-1.13, +1.13], z = +1.28, cách mặt tủ 450mm): Bẻ 18° về hướng Nam (Yaw = 0°) rọi sâu vào lòng Tủ #1, #2!
        [-1.13, 1.13].forEach((xp, idx) => {
          createAimableSpotlight({
            x: xp, y: h - 0.10, z: 1.28,
            circuitId: 'M18B', colorHex: 0xf8fafc, watt: 9,
            baseTiltDeg: 18, baseYawDeg: 0, beamDeg: 24, cutoutMm: 75,
            label: idx === 0 ? 'Lộ 18B (Nam): 2 Spotlight CRI≥92 Bẻ 18° Rọi Thẳng Vào Tủ Áo #1 & #2' : ''
          });
        });
        //   + 02 bóng phía trên Bàn Phấn & Bàn Làm Việc cửa sổ O2 (x = -1.25, z = [-0.15, +0.52]): Bẻ 15° về hướng Tây (Yaw = -90°) rọi mặt bàn!
        [-0.15, 0.52].forEach((zp, idx) => {
          createAimableSpotlight({
            x: -1.25, y: h - 0.10, z: zp,
            circuitId: 'M18B', colorHex: 0xf8fafc, watt: 9,
            baseTiltDeg: 15, baseYawDeg: -90, beamDeg: 24, cutoutMm: 75,
            label: idx === 0 ? 'Lộ 18B (Tây): 2 Spotlight Bẻ 15° Rọi Bàn Phấn & Bàn Làm Việc Cửa Sổ O2' : ''
          });
        });
      } else {
        // PHƯƠNG ÁN BẢN VẼ GỐC KT-4.02 & CĐ-12: Ô trần chữ nhật 2370×1340mm + 6 bóng Spotlight Lộ 18 xếp 2 hàng ngang × 3 bóng
        addFourSidedCoffer(0.0, h, 0.68, 2.37, 1.34, 'M18A', 0xffcf78);
        [-0.95, 0.0, 0.95].forEach((xp, idx) => {
          createAimableSpotlight({
            x: xp, y: h - 0.10, z: 0.15,
            circuitId: 'M18B', colorHex: 0xf8fafc, watt: 9,
            baseTiltDeg: 18, baseYawDeg: 180, beamDeg: 24,
            label: idx === 1 ? 'Bản Vẽ Gốc CĐ-12 (Lộ 18): 6 Bóng 9W Xếp 2 Hàng Ngang × 3 Bóng' : ''
          });
          createAimableSpotlight({
            x: xp, y: h - 0.10, z: 1.20,
            circuitId: 'M18B', colorHex: 0xf8fafc, watt: 9,
            baseTiltDeg: 18, baseYawDeg: 0, beamDeg: 24
          });
        });
      }

      // ==================== KHU 3: PHÒNG TẮM WC-02 MASTER (PHÍA NAM CÙNG — TRỤC A, z từ +2.06 đến +3.58, Trần +2.40m) ====================
      const wcCeilH = 2.40;
      const wcCeil = new THREE.Mesh(
        new THREE.PlaneGeometry(3.44, 1.52),
        new THREE.MeshStandardMaterial({ color: 0x0ea5e9, transparent: true, opacity: 0.22, side: THREE.DoubleSide, depthWrite: false })
      );
      wcCeil.rotation.x = Math.PI / 2;
      wcCeil.position.set(0.0, wcCeilH, 2.82);
      rootGroup.add(wcCeil);

      // CHIA ĐÚNG 3 KHOang WC-02 CHUẨN BẢN VẼ KT-5.03 (1.075m Trái + 1.335m Giữa + 1.090m Phải):
      // 1) Khoang Trái (Tây, x = -1.18): BỒN TẮM NẰM (1.500 × 750mm) + Đèn sưởi 2 bóng (Lộ 23) + Spotlight Bồn tắm (Lộ 22)
      addBox(-1.22, 0, 2.82, 0.78, 0.56, 1.42, 0xe2e8f0); // Bồn tắm nằm Acrylic trắng
      addBox(-1.15, wcCeilH - 0.02, 2.65, 0.28, 0.04, 0.45, 0xf59e0b); // Đèn sưởi 2 bóng âm trần (Lộ 23)
      createAimableSpotlight({
        x: -1.18, y: wcCeilH, z: 3.15,
        circuitId: 'M20', colorHex: 0xfffbeb, watt: 9,
        baseTiltDeg: 8, baseYawDeg: -90, beamDeg: 36, cutoutMm: 75
      });

      // 2) Khoang Giữa (x = 0.0, đối diện trực diện cửa kính khói 1.080mm): BÀN ĐÁ LAVABO ĐÔI + GƯƠNG LED (Lộ 21) + Spotlight Lavabo (Lộ 20)
      addBox(0.0, 0, 3.25, 1.28, 0.82, 0.56, 0x475569); // Bàn đá Lavabo đôi
      createCoveStrip({ x: 0.0, y: 1.55, z: 3.52, w: 1.22, d: 0.06, circuitId: 'M20', colorHex: 0xffedd5 }); // Gương LED đôi (Lộ 21)
      createAimableSpotlight({
        x: 0.0, y: wcCeilH, z: 2.95,
        circuitId: 'M20', colorHex: 0xfffbeb, watt: 9,
        baseTiltDeg: 12, baseYawDeg: 0, beamDeg: 24, cutoutMm: 75,
        label: 'Lộ 20–24 (WC-02 +2.40m): Lavabo Đôi (Giữa) • Bồn Tắm Nằm (Trái) • Tắm Đứng (Phải)'
      });

      // 3) Khoang Phải (Đông, x = +1.18): BỒN CẦU ÂM TƯỜNG + VÁCH KÍNH TẮM ĐỨNG + Quạt hút (Lộ 25) + Spotlight Tắm đứng (Lộ 24)
      addBox(0.95, 0, 2.45, 0.42, 0.44, 0.55, 0xf8fafc); // Bồn cầu treo tường âm két
      addBox(1.18, 0, 2.90, 0.95, 2.15, 0.04, 0x38bdf8, 0.28); // Vách kính tắm đứng Slimdoor
      createAimableSpotlight({
        x: 1.18, y: wcCeilH, z: 3.20,
        circuitId: 'M20', colorHex: 0xfffbeb, watt: 9,
        baseTiltDeg: 0, baseYawDeg: 0, beamDeg: 36, cutoutMm: 75
      });

      // 4) Lộ 26: 02 Đèn Downlight chống ẩm 9W 3000K ngoài trần Logia 01 (bên Tây Khu Ngủ, x = -2.32)
      [-2.85, -1.45].forEach((zp) => {
        createAimableSpotlight({
          x: -2.32, y: h - 0.12, z: zp,
          circuitId: 'M20', colorHex: 0xffd89b, watt: 9,
          baseTiltDeg: 0, baseYawDeg: 0, beamDeg: 36, cutoutMm: 75
        });
      });

      // Dialux Heatmap Patches
      createHeatmapPatch(0.0, 0.48, -2.15, 1.15, 150, 'M15C');  // Tâm giường ngủ
      createHeatmapPatch(1.65, 0.02, -1.75, 0.75, 350, 'M15P'); // Trước Tủ Áo Âm Tường #3 (Đông)
      createHeatmapPatch(0.0, 0.86, 0.68, 0.95, 440, 'M18A');   // Mặt Bàn Đảo Kính dưới Vòm Mặt Trăng Ø1.2m
      createHeatmapPatch(-1.35, 0.76, 0.18, 0.70, 400, 'M18B'); // Mặt Bàn Phấn/LV cửa sổ O2
      createHeatmapPatch(0.0, 0.02, 1.35, 0.95, 380, 'M18B');   // Trước Tủ Áo #1 & #2
      createHeatmapPatch(0.0, 0.85, 3.15, 0.75, 380, 'M20');    // Lavabo đôi WC-02

      labelAnchors = [
        { pos: new THREE.Vector3(0.0, 2.75, -2.15), text: 'Khu Ngủ (Bắc): 2 Đèn Đôi 7W Giữa Giường (Lộ 15B — Bẻ 25° Về Ghế Bench)', cls: 'amber' },
        { pos: new THREE.Vector3(1.85, 1.85, -1.75), text: 'Tủ Áo Âm Tường #3 (2.010mm Hốc Đông) + 2 Đèn Lộ 15A Bẻ 18° Rọi Tủ', cls: 'emerald' },
        { pos: new THREE.Vector3(0.0, 0.65, -0.95), text: !altOptionActive ? 'Trục B: Ghế Bench Cam Hermes (1.25m) + Máy Lạnh IN 2.3 Trên Trần' : 'Bản Vẽ Gốc KT-2.08: Vách Ngăn Tivi Tại Trục B', cls: 'rose' },
        { pos: new THREE.Vector3(0.0, 2.65, 0.68), text: !altOptionActive ? 'Lộ 18A: Vòm Tròn Mặt Trăng Barrisol Ø1.2m + Bàn Đảo Mặt Kính' : 'CĐ-12 Lộ 18: 6 Đèn 9W Xếp 2 Hàng × 3 Bóng', cls: 'sky' },
        { pos: new THREE.Vector3(-1.45, 1.35, 0.18), text: 'Tường Tây: Bàn Phấn/LV Cửa Sổ O2 + Kệ Túi Kính Đen + 2 Đèn Lộ 18B Bẻ 15°', cls: 'purple' },
        { pos: new THREE.Vector3(0.0, 1.95, 1.76), text: 'Tường Nam: Tủ Áo #1 & #2 Hai Bên Cửa Kính Khói 1.08m Vào Lavabo Đôi WC-02', cls: 'amber' }
      ];
    }

    // ==================== BUILD ZONE 3: TẦNG 3 (CHUẨN KT-4.08 & PA T3-A: PHÒNG THỜ BẮC – CỬA LÙA TRỤC B – P.LÀM VIỆC NAM) ====================
    function buildZoneT3() {
      const { w, d, h } = ZONE_CONFIGS.T3.dims;
      buildRoomShell(w, d, h);

      // Tường ngăn trục Đông (x = +1.85) tách khối Phòng Thờ + Phòng Làm Việc (bên Tây) với Hành lang & Thông tầng Cầu thang (bên Đông)
      addBox(1.85, 0, -2.20, 0.16, h, 3.60, 0x334155); // Tường Đông Phòng Thờ
      addBox(1.85, 0, 2.35, 0.16, h, 3.10, 0x334155);  // Tường Đông Phòng Làm Việc (chừa cửa O1 ở giữa)

      // HỆ CỬA LÙA 4 CÁNH KÍNH MỜ KHUNG NHÔM SLIM (2400mm) TẠI TRỤC B (z = -0.30) NGĂN PHÒNG THỜ (PHÍA BẮC) & P.LÀM VIỆC ĐÔI (PHÍA NAM)!
      addBox(-2.95, 0, -0.30, 1.30, h, 0.16, 0x334155); // Tường cố định hai bên cửa lùa
      addBox(1.30, 0, -0.30, 1.10, h, 0.16, 0x334155);
      addBox(-0.80, 0, -0.30, 2.60, 2.55, 0.08, 0x38bdf8, 0.30); // Cửa lùa 4 cánh kính mờ tại Trục B

      // --- 1. PHÒNG THỜ GIA TIÊN (Nửa Phía Bắc: Trục B–C | x từ -3.55 đến +1.75, z từ -3.95 đến -0.35) ---
      // Ban Thờ Gỗ Gõ Đỏ tựa lưng vào TƯỜNG TÂY (Bên Trái Trục 1', x = -3.15, z = -2.15) nhìn về hướng Đông — ĐÚNG 100% BẢN VẼ KT-4.08!
      addBox(-3.15, 0, -2.15, 0.78, 1.27, 1.75, 0x78350f); // Án gian thờ
      addBox(-3.52, 0, -2.15, 0.08, 2.85, 2.25, 0xb45309); // Vách hậu CNC & Tranh trúc chỉ tường Tây

      // Ô trần giật cấp Phòng Thờ (1620×2210mm, cao +3.30m) + Khe LED hắt 4 cạnh (Lộ 15) + Khe gió điều hòa
      addFourSidedCoffer(-0.55, h, -2.15, 2.20, 1.65, 'W15', 0xffb74d);
      addLinearACSlot(1.15, h - 0.10, -2.15, 0.16, 1.20); // Khe gió điều hòa Đông Phòng Thờ

      // Lộ 14* (Trước Ban Thờ Tường Tây): ĐÚNG 3 BÓNG SPOTLIGHT 7W XẾP DỌC (500 + 1205 + 1205 + 500mm chuẩn KT-4.08!)
      // Đặt tại x = -2.35 (cách tường Tây 500mm), z = [-3.25, -2.15, -1.05], bẻ nghiêng 28° về hướng Tây (Yaw = -90°) rọi vào Ban thờ!
      [-3.25, -2.15, -1.05].forEach((zp, idx) => {
        createAimableSpotlight({
          x: -2.35, y: h - 0.10, z: zp,
          circuitId: 'W14A', colorHex: 0xffcf78, watt: 7,
          baseTiltDeg: 28, baseYawDeg: -90, beamDeg: 15, cutoutMm: 75,
          label: idx === 1 ? 'Lộ 14* (KT-4.08): 3 Đèn Xếp Dọc Trước Ban Thờ Tường Tây (500+1205+1205mm — Bẻ 28°)' : ''
        });
      });

      // Lộ 14 + Lộ 16 (Trên CĐ-13 & KT-4.08):
      // - 6 bóng Spotlight 9W viền quanh ô trần giật cấp Phòng Thờ (3 bóng hàng Bắc z = -3.45 + 3 bóng hàng Nam z = -0.85, cách đều 1420+1420mm!)
      [-1.75, -0.55, 0.65].forEach((xp, idx) => {
        createAimableSpotlight({
          x: xp, y: h - 0.10, z: -3.45,
          circuitId: 'W14', colorHex: 0xffd89b, watt: 9,
          baseTiltDeg: 15, baseYawDeg: 180, beamDeg: 24,
          label: idx === 1 ? 'Lộ 14 (KT-4.08): 6 Spotlight Viền Ô Trần Phòng Thờ (1420+1420mm)' : ''
        });
        createAimableSpotlight({
          x: xp, y: h - 0.10, z: -0.85,
          circuitId: 'W14', colorHex: 0xffd89b, watt: 9,
          baseTiltDeg: 15, baseYawDeg: 0, beamDeg: 24
        });
      });
      // - Đèn thả / Đèn chùm trung tâm Phòng Thờ (Lộ 16 tại x = -0.55, z = -2.15)
      createAimableSpotlight({
        x: -0.55, y: h, z: -2.15,
        circuitId: 'W14', colorHex: 0xffb74d, watt: 18,
        baseTiltDeg: 0, baseYawDeg: 0, beamDeg: 36
      });

      // --- 2. PHÒNG LÀM VIỆC ĐÔI PA T3-A (Nửa Phía Nam: Trục A–B | x từ -3.55 đến +1.75, z từ -0.25 đến +3.85) ---
      // Ô trần giật cấp P.Làm Việc (1800×2140mm) + Khe LED hắt 4 cạnh & Khe rèm cửa sổ Tây (Lộ S3)
      addFourSidedCoffer(-0.75, h, 1.55, 1.85, 2.10, 'S3', 0xffcf78);
      createCoveStrip({ x: -3.55, y: h - 0.08, z: 1.65, w: 0.10, d: 3.20, circuitId: 'S3', colorHex: 0xffcf78 }); // Khe rèm Tây
      addLinearACSlot(-0.75, h - 0.10, 0.10, 1.25, 0.16); // Khe gió điều hòa ngang ngay sát cửa lùa Trục B (chuẩn KT-4.08!)

      // NỘI THẤT PHÒNG LÀM VIỆC ĐÔI CHUẨN PA T3-A:
      // 1) TƯỜNG TÂY (Bên Trái Trục 1', x = -3.10): 02 Bàn làm việc đôi (1600×600mm) + Tủ máy in ở giữa (300×600mm)
      addBox(-3.10, 0, 0.65, 0.65, 0.75, 1.45, 0x92400e);  // Bàn làm việc 1 (Bắc)
      addBox(-3.15, 0, 1.58, 0.55, 0.82, 0.35, 0x475569);  // Tủ máy in ở giữa 2 cửa sổ V3
      addBox(-3.10, 0, 2.50, 0.65, 0.75, 1.45, 0x92400e);  // Bàn làm việc 2 (Nam)
      addBox(-3.32, 0.75, 0.65, 0.05, 0.38, 0.62, 0x0f172a); // Màn hình 1
      addBox(-3.32, 0.75, 2.50, 0.05, 0.38, 0.62, 0x0f172a); // Màn hình 2

      // 2) TƯỜNG NAM (Cạnh Dưới Trục A, z = +3.55): Hệ Tủ Sách Kịch Trần (2440×500mm) + Hộp kỹ thuật Đông-Nam
      addBox(-0.95, 0, 3.55, 2.45, 2.95, 0.48, 0x78350f); // Hệ Tủ sách kịch trần 2.44m ở tường Nam
      addBox(1.10, 0, 3.55, 0.95, 2.95, 0.48, 0x334155);  // Hộp kỹ thuật góc Đông-Nam

      // 3) TƯỜNG ĐÔNG (Bên Phải Trục 2, x = +1.35): Sofa đọc sách / nghỉ trưa (1570×640mm)
      addBox(1.35, 0, 1.75, 0.68, 0.45, 1.60, 0x475569);

      // HỆ ĐÈN PHÒNG LÀM VIỆC ĐÔI PA T3-A (Chuyển đổi giữa 3 Tuyến Ray Nam Châm 48V ↔ 9 Đèn Spotlight Âm Trần KT-4.08):
      if (!altOptionActive) {
        // 3 Thanh Ray Nam Châm 48V Âm Trần Đen (Tuyến Tây 3.0m • Tuyến Nam 2.0m • Tuyến Đông 2.0m chuẩn tang3_tran_phang_ray_nam_cham_2d.png!)
        addBox(-2.85, h - 0.11, 1.60, 0.06, 0.03, 3.00, 0x020617); // Ray Tây 3.0m trên 2 bàn đôi
        addBox(-0.95, h - 0.11, 2.95, 2.10, 0.03, 0.06, 0x020617); // Ray Nam 2.0m trước Tủ sách
        addBox(0.85, h - 0.11, 1.65, 0.06, 0.03, 2.00, 0x020617);  // Ray Đông 2.0m trên Sofa
      }

      // Lộ S1 (Tuyến Tây dọc trên 2 bàn làm việc đôi, tại x = -2.85): 4 điểm đèn dọc trục Bắc-Nam (450 + 1450 + 1450mm chuẩn KT-4.08)
      [0.35, 1.18, 2.02, 2.85].forEach((zp, idx) => {
        createAimableSpotlight({
          x: -2.85, y: h - 0.10, z: zp,
          circuitId: 'S1', colorHex: 0xf8fafc, watt: 12,
          baseTiltDeg: 5, baseYawDeg: -90, beamDeg: 36,
          label: idx === 1
            ? (!altOptionActive
                ? 'Tuyến Tây Lộ S1: Ray Nam Châm 3.0m Dọc 2 Bàn Đôi (530 Lux)'
                : 'KT-4.08 Lộ S1: 4 Spotlight D90 Dọc 2 Bàn Làm Việc Tường Tây')
            : ''
        });
      });

      // Lộ S2 (Tuyến Nam ngang trước Hệ Tủ Sách 2.44m, tại z = +2.95, cách mặt tủ 350mm):
      // 3 đèn cách nhau 1000mm + 1000mm (x = [-1.85, -0.95, -0.05]) bẻ nghiêng 28° về hướng Nam (Yaw = 0°) rọi thẳng vào Tủ sách!
      [-1.85, -0.95, -0.05].forEach((xp, idx) => {
        createAimableSpotlight({
          x: xp, y: h - 0.10, z: 2.95,
          circuitId: 'S2', colorHex: 0xfffbeb, watt: 12,
          baseTiltDeg: 28, baseYawDeg: 0, beamDeg: 24,
          label: idx === 1 ? 'Tuyến Nam Lộ S2: 3 Đèn Rọi Bẻ 28° Vào Tủ Sách Kịch Trần Tường Nam (1000+1000mm)' : ''
        });
      });

      // Lộ S3 (Tuyến Đông dọc trên Sofa đọc sách, tại x = +0.85, cách tường Đông 800mm):
      // 2 đèn tại z = +1.05 và z = +2.35 (cách nhau 1450mm chuẩn KT-4.08)
      [1.05, 2.35].forEach((zp, idx) => {
        createAimableSpotlight({
          x: 0.85, y: h - 0.10, z: zp,
          circuitId: 'S3', colorHex: 0xfff7ed, watt: 9,
          baseTiltDeg: 10, baseYawDeg: 90, beamDeg: 36,
          label: idx === 0 ? 'Tuyến Đông Lộ S3: Đèn Trên Sofa Đọc Sách Tường Đông' : ''
        });
      });

      // --- 3. GIẾNG TRỜI THÔNG TẦNG CẦU THANG (Bên Phải Tường Đông: x = +2.85, Lộ 27 trên CĐ-13) ---
      [-1.20, 0.20, 1.60].forEach((zp, idx) => {
        createAimableSpotlight({
          x: 2.85, y: h, z: zp,
          circuitId: 'V27', colorHex: 0xffd89b, watt: 12,
          baseTiltDeg: 10, baseYawDeg: 0, beamDeg: 15,
          label: idx === 1 ? 'Lộ 27 (CĐ-13): 3 Spotlight 12W Góc Hẹp 15° Thông Tầng Cầu Thang' : ''
        });
      });

      // Dialux Heatmap Patches
      createHeatmapPatch(-2.95, 1.28, -2.15, 0.85, 410, 'W14A');
      createHeatmapPatch(-3.00, 0.77, 0.65, 0.85, 530, 'S1');
      createHeatmapPatch(-3.00, 0.77, 2.50, 0.85, 530, 'S1');
      createHeatmapPatch(-0.95, 0.02, 3.20, 0.95, 380, 'S2');
      createHeatmapPatch(1.25, 0.46, 1.75, 0.75, 310, 'S3');

      labelAnchors = [
        { pos: new THREE.Vector3(-3.15, 1.75, -2.15), text: 'Phòng Thờ (Phía Bắc): Ban Thờ Tường Tây + 3 Đèn Rọi Dọc (400 Lux)', cls: 'amber' },
        { pos: new THREE.Vector3(-0.80, 1.55, -0.30), text: 'Trục B: Cửa Lùa 4 Cánh Kính Mờ (Ngăn P.Thờ Bắc & P.Làm Việc Nam)', cls: 'sky' },
        { pos: new THREE.Vector3(-3.10, 1.25, 1.60), text: 'Tường Tây (Lộ S1): 02 Bàn Làm Việc Đôi + Tủ Máy In (530 Lux)', cls: 'emerald' },
        { pos: new THREE.Vector3(-0.95, 1.95, 3.45), text: 'Tường Nam (Lộ S2): Hệ Tủ Sách 2.44m (3 Đèn Rọi Bẻ 28°)', cls: 'purple' },
        { pos: new THREE.Vector3(1.35, 1.15, 1.75), text: 'Tường Đông (Lộ S3): Sofa Đọc Sách', cls: 'rose' }
      ];
    }

    // ==================== BUILD ZONE 4: LOẠI 1 — PHÒNG NGỦ TRỤC A–B (P.NGỦ ÔNG BÀ T1 • P.NGỦ 2 T2 • P.NGỦ 4 T3) ====================
    function buildZoneBedAB() {
      const { w, d, h } = ZONE_CONFIGS.BED_AB.dims;
      buildRoomShell(w, d, h);

      // HỆ TỌA ĐỘ CHUẨN BẢN VẼ KT-4.02, CĐ-03, CĐ-04, CĐ-11, CĐ-12 (TRỤC A–B, 3–4):
      // - Chiều rộng lòng phòng Đông–Tây (Trục 3–4): 3.00m (x từ -1.80 đến +1.20) + Ban công Đông rộng 1.20m (x từ +1.20 đến +2.40)
      // - Chiều dài lòng phòng Bắc–Nam (Trục A–B): 4.49m (z từ -2.25 đến +2.25)
      // - Tường Nam (Trục A, z = +2.20): VÁCH ĐẦU GIƯỜNG! Giường đôi (1.80m × 2.00m) tựa đầu vào Tường Nam, nhìn lên hướng Bắc (-Z)!
      // - Tường Bắc (Trục B, z = -2.20): Cửa vào D3 (900mm) ở góc Tây-Bắc + Hệ Tủ Áo kịch trần kết hợp Hốc Tivi (dài 2.10m) + Bàn học góc Đông-Bắc (Lộ 9)
      // - Tường Đông (Trục 4, x = +1.20): Cửa kính lùa D4 (2.925m) mở ra Ban công / Sân vườn Đông + Hốc rèm tự động rộng 200mm
      // - Tường Tây (Trục 3, x = -1.80): Vách tường phẳng + Thanh Ray Nam Châm (Lộ 6 / Lộ 15) chạy dọc sát mép trái ô trần

      // 1) TƯỜNG ĐÔNG (Trục 4, x = +1.20) & BAN CÔNG / SÂN VƯỜN ĐÔNG (x từ +1.20 đến +2.38):
      addBox(1.20, 0, -1.85, 0.14, h, 0.75, 0x334155); // Trụ tường góc Đông-Bắc (chỗ kê bàn học)
      addBox(1.20, 0, 1.95, 0.14, h, 0.55, 0x334155);  // Trụ tường góc Đông-Nam
      addBox(1.20, 0, 0.10, 0.06, 2.55, 2.92, 0x38bdf8, 0.24); // Cửa kính lùa 2 cánh D4 (2.925 × 3.000mm)
      addBox(1.78, 0.01, 0.10, 1.15, 0.04, 3.60, 0x334155);    // Sàn Ban công / Sân vườn Đông
      addBox(2.35, 0, 0.10, 0.06, 1.10, 3.60, 0x38bdf8, 0.30); // Lan can kính Ban công Đông
      addBox(2.05, 0.05, -1.35, 0.38, 0.70, 0.38, 0x15803d);   // Cây xanh Ban công Đông

      // 2) TƯỜNG BẮC (Trục B, z = -2.20): Cửa gỗ D3 (900mm) góc Tây-Bắc + HỆ TỦ ÁO KỊCH TRẦN & HỐC TIVI (2.100 × 600mm) + BÀN HỌC ĐÔNG-BẮC
      addBox(-1.35, 0, -2.20, 0.88, 2.35, 0.08, 0x78350f, 0.55); // Cửa gỗ D3 (900mm) mở vào phòng ở góc Tây-Bắc
      // Hệ Tủ Áo kịch trần kết hợp Hốc Tivi ở giữa (x từ -0.82 đến +0.68, z = -1.92, sâu 600mm)
      addBox(-0.08, 0, -1.92, 1.50, 2.90, 0.58, 0x78350f, 0.88);
      addBox(-0.08, 0.85, -1.62, 0.82, 0.52, 0.05, 0x0f172a); // Màn hình Tivi trong hốc tủ áo Bắc (ổ cắm S1/S2 +0.4M & +1.2M)
      createCoveStrip({ x: -0.08, y: 2.35, z: -1.62, w: 1.38, d: 0.06, circuitId: 'AB_DESK', colorHex: 0xffedd5 }); // Chờ LED Tủ áo +1.6m

      if (!altOptionActive) {
        // P.NGỦ 2 (T2) & P.NGỦ 4 (T3): Bàn học / Bàn trang điểm ở góc Đông-Bắc (x = +0.88, z = -1.85, cạnh cửa lùa D4) + Đèn Lộ 9
        addBox(0.88, 0.68, -1.85, 0.55, 0.08, 0.62, 0x451a03); // Mặt bàn học góc Đông-Bắc
        addBox(0.88, 0.0, -1.38, 0.38, 0.42, 0.38, 0xea580c);  // Ghế ngồi bàn học
        createCoveStrip({ x: 0.88, y: 1.45, z: -2.12, w: 0.45, d: 0.08, circuitId: 'AB_DESK', colorHex: 0xf8fafc }); // Đèn bàn học / gương Lộ 9
      } else {
        // P.NGỦ ÔNG BÀ (T1): Tủ áo kéo dài hết góc Đông-Bắc + Ô cửa kính V3 (1.000×2.400mm) ở góc Tây-Nam nhìn ra Giếng trời xanh mát!
        addBox(0.88, 0, -1.92, 0.55, 2.90, 0.58, 0x78350f, 0.88);
        addBox(-1.78, 0, 1.55, 0.06, 2.40, 1.00, 0x34d399, 0.35); // Ô kính V3 nhìn ra Giếng trời cây xanh Tầng 1
      }

      // 3) TƯỜNG NAM (Trục A, z = +2.20): VÁCH ĐẦU GIƯỜNG + GIƯỜNG ĐÔI (1.80m × 2.00m) + 2 TÁP ĐẦU GIƯỜNG (Ổ cắm S1/S2 +0.7M)
      addBox(-0.25, 0, 2.18, 2.75, 2.65, 0.10, 0x78350f); // Vách gỗ ốp đầu giường Tường Nam (Trục A)
      addBox(-0.25, 0, 1.15, 1.80, 0.44, 2.00, 0x475569); // Giường đôi 1.8m × 2.0m tựa đầu vào Tường Nam (nhìn lên hướng Bắc -Z)
      addBox(-0.25, 0.44, 1.12, 1.68, 0.12, 1.88, 0xe2e8f0); // Đệm trắng
      addBox(-0.65, 0.56, 1.82, 0.58, 0.14, 0.38, 0xf8fafc); // Gối Trái (Tường Nam)
      addBox(0.15, 0.56, 1.82, 0.58, 0.14, 0.38, 0xf8fafc);  // Gối Phải (Tường Nam)
      addBox(-0.25, 0.57, 0.48, 1.70, 0.04, 0.48, 0xd97706); // Chăn điểm nhấn cuối giường (phía Bắc)
      // 02 Táp đầu giường hai bên (cách góc tường 350mm và 400mm chuẩn CĐ-03 & CĐ-04)
      addBox(-1.38, 0, 1.95, 0.44, 0.46, 0.42, 0x334155);
      addBox(0.88, 0, 1.95, 0.44, 0.46, 0.42, 0x334155);

      // Vùng cảnh báo đỏ trên gối khi cụm 3 bóng 7W giữa phòng để 0° thẳng đứng gây chói mắt
      const glareGeo = new THREE.CylinderGeometry(0.62, 0.82, 0.12, 28);
      const glareMat = new THREE.MeshBasicMaterial({ color: 0xf43f5e, transparent: true, opacity: 0.0, depthWrite: false });
      glareWarningMesh = new THREE.Mesh(glareGeo, glareMat);
      glareWarningMesh.position.set(-0.25, 0.68, 1.55);
      rootGroup.add(glareWarningMesh);

      // 4) TRẦN GIẬT CẤP & KHE GIÓ ĐIỀU HÒA CHUẨN KT-4.02 & CĐ-11/12 (Ô trần 2.040 × 3.140mm tại x = -0.25, z = +0.25):
      // Lộ 6 (ở P.Ngủ 2 & 4) / Lộ 15 (ở P.Ngủ Ông Bà): ĐÈN LED DÂY (Ký hiệu —LED—) HẮT 4 CẠNH Ô TRẦN GIẬT CẤP!
      addFourSidedCoffer(-0.25, h, 0.25, 2.04, 3.14, 'AB_COVE', 0xffcf78);
      createCoveStrip({ x: 1.05, y: h - 0.08, z: 0.10, w: 0.10, d: 2.95, circuitId: 'AB_COVE', colorHex: 0xffcf78 }); // Hốc rèm cửa lùa Đông D4 (Chi tiết 02)

      // Đường chỉ âm NẸP U10 ĐEN / P-UT12 (KT: 1.740 × 2.690mm, lùi vào 150mm trong lòng trần +3.130m trên KT-4.06 & KT-4.03 — Chỉ nhựa đen trang trí, KHÔNG có đèn!)
      const nepBlackEdges = new THREE.EdgesGeometry(new THREE.BoxGeometry(1.74, 0.015, 2.69));
      const nepBlackLine = new THREE.LineSegments(nepBlackEdges, new THREE.LineBasicMaterial({ color: 0x0f172a }));
      nepBlackLine.position.set(-0.25, h - 0.01, 0.25);
      rootGroup.add(nepBlackLine);

      // KHE GIÓ ĐIỀU HÒA ÂM TRẦN (150 × 1.100mm): Nằm NGANG (Đông–Tây) ở phần trần hạ +3.00m phía Bắc trước Tủ Áo (chuẩn KT-4.02!)
      addLinearACSlot(-0.15, h - 0.10, -1.45, 1.10, 0.16);

      // 5) HỆ ĐÈN CHIẾU SÁNG CHUẨN KT-4.02 & CĐ-11 / CĐ-12 (TRỤC A–B — HOÀN TOÀN KHÔNG CÓ RAY NAM CHÂM!):
      // - Lộ 7 (PN2/4) / Lộ 16 (Ông Bà) (AB_MID — 05 BÓNG SPOTLIGHT 7W):
      //   a) CỤM 03 BÓNG SPOTLIGHT 7W CÁCH NHAU 200mm (200+200mm) XẾP NGANG TẠI TÂM Ô TRẦN (z = +0.25, x = [-0.45, -0.25, -0.05]):
      //      BẮT BUỘC BẺ GÓC CHÓA 25° VỀ HƯỚNG BẮC (Yaw = 180° — hướng về phía Tủ Áo & Tivi tường Bắc) ĐỂ NẰM NGỬA KHÔNG CHÓI MẮT!
      [-0.45, -0.25, -0.05].forEach((xp, idx) => {
        createAimableSpotlight({
          x: xp, y: h, z: 0.25,
          circuitId: 'AB_MID', colorHex: 0xffd89b, watt: 7,
          baseTiltDeg: 25, baseYawDeg: 180, beamDeg: 24, cutoutMm: 75,
          label: idx === 1 ? 'Lộ 7/16 (Giữa Phòng): Cụm 3 Đèn 7W Cách 200mm (BẮT BUỘC Bẻ 25° Về Hướng Bắc — Cuối Giường!)' : ''
        });
      });
      //   b) 02 BÓNG SPOTLIGHT 7W Ở HÀNG DƯỚI (Trên 2 Táp đầu giường sát Tường Nam, z = +1.92, x = [-1.38, +0.88]):
      //      Bẻ góc chóa 15° về hướng Nam (Yaw = 0°) rửa sáng vách đầu giường!
      [-1.38, 0.88].forEach((xp) => {
        createAimableSpotlight({
          x: xp, y: h - 0.10, z: 1.92,
          circuitId: 'AB_MID', colorHex: 0xffd89b, watt: 7,
          baseTiltDeg: 15, baseYawDeg: 0, beamDeg: 24, cutoutMm: 75
        });
      });

      // - Lộ 5 (PN2/4) / Lộ 14 (Ông Bà) (AB_PERIM — 04 BÓNG SPOTLIGHT 9W VIỀN CHUẨN KT-4.02 & CĐ-11/12):
      //   a) 02 bóng 9W ở 2 góc Trên-Trái & Trên-Phải (trước Hệ Tủ Áo tường Bắc, z = -1.15, x = [-1.10, +0.60]):
      //      Bẻ góc chóa 18° về hướng Bắc (Yaw = 180°) rọi thẳng vào lòng Hệ Tủ Áo & Hốc Tivi!
      [-1.10, 0.60].forEach((xp, idx) => {
        createAimableSpotlight({
          x: xp, y: h - 0.10, z: -1.15,
          circuitId: 'AB_PERIM', colorHex: 0xffd89b, watt: 9,
          baseTiltDeg: 18, baseYawDeg: 180, beamDeg: 24, cutoutMm: 75,
          label: idx === 0 ? 'Lộ 5/14 (Góc Trên): 2 Đèn 9W Bẻ 18° Về Hướng Bắc Rọi Thẳng Vào Hệ Tủ Áo & Tivi' : ''
        });
      });
      //   b) 02 bóng 9W ở 2 mép Giữa-Trái & Giữa-Phải (z = +0.25, x = [-1.42, +0.90] — THẲNG HÀNG NGANG với cụm 3 bóng 7W giữa phòng!):
      createAimableSpotlight({ x: -1.42, y: h - 0.10, z: 0.25, circuitId: 'AB_PERIM', colorHex: 0xffd89b, watt: 9, baseTiltDeg: 12, baseYawDeg: -90, beamDeg: 24, cutoutMm: 75 });
      createAimableSpotlight({ x: 0.90, y: h - 0.10, z: 0.25, circuitId: 'AB_PERIM', colorHex: 0xffd89b, watt: 9, baseTiltDeg: 12, baseYawDeg: 90, beamDeg: 24, cutoutMm: 75 });

      // - Lộ 9 (AB_DESK — 01 BÓNG SPOTLIGHT 7W 4000K TRÊN BÀN HỌC GÓC ĐÔNG-BẮC Ở P.NGỦ 2 & P.NGỦ 4):
      if (!altOptionActive) {
        createAimableSpotlight({
          x: 0.88, y: h - 0.10, z: -1.68,
          circuitId: 'AB_DESK', colorHex: 0xf8fafc, watt: 7,
          baseTiltDeg: 12, baseYawDeg: 180, beamDeg: 24, cutoutMm: 75,
          label: 'Lộ 9 (CĐ-12/13): 01 Bóng Spotlight 7W 4000K Trên Bàn Học Góc Đông-Bắc'
        });
      }

      // - Lộ 8 (PN2/4) / Lộ 13 (Ông Bà) (AB_BALC): 02 Đèn Ống Bơ 12W lắp nổi ngoài Ban công / Sân vườn Đông (x = +1.78, z = [-0.85, +0.95])
      [-0.85, 0.95].forEach((zp) => {
        createAimableSpotlight({
          x: 1.78, y: h - 0.12, z: zp,
          circuitId: 'AB_BALC', colorHex: 0xffd89b, watt: 12,
          baseTiltDeg: 0, baseYawDeg: 0, beamDeg: 36, cutoutMm: 90
        });
      });

      // Dialux Heatmap Patches
      createHeatmapPatch(-0.25, 0.48, 0.15, 0.95, 160, 'AB_MID');
      createHeatmapPatch(-0.08, 0.02, -1.35, 0.85, 360, 'AB_PERIM');
      createHeatmapPatch(0.88, 0.72, -1.85, 0.65, 450, 'AB_DESK');

      labelAnchors = [
        { pos: new THREE.Vector3(-0.25, 1.05, 1.95), text: 'Tường Nam (Trục A): Đầu Giường + 2 Đèn 7W Lộ 7/16 Bẻ 15° (45 Lux Không Chói)', cls: 'emerald' },
        { pos: new THREE.Vector3(-0.25, 2.75, 0.25), text: 'Hàng Giữa: Cụm 3 Đèn 7W Lộ 7/16 Cách 200mm (Bẻ 25° Về Hướng Bắc) + 2 Đèn 9W Lộ 5/14 Hai Bên', cls: 'amber' },
        { pos: new THREE.Vector3(-0.08, 2.05, -1.85), text: 'Tường Bắc (Trục B): Hệ Tủ Áo & Hốc Tivi + Khe Gió Điều Hòa Ngang + 2 Đèn 9W Lộ 5/14 Bẻ 18°', cls: 'sky' },
        { pos: new THREE.Vector3(0.88, 1.35, -1.85), text: !altOptionActive ? 'Góc Đông-Bắc: Bàn Học + 1 Đèn 7W Lộ 9 (P.Ngủ 2 & 4)' : 'P.Ngủ Ông Bà (T1): Tủ Áo Kịch Góc + Ô Kính V3 Nhìn Giếng Trời Tây-Nam', cls: 'purple' },
        { pos: new THREE.Vector3(-1.25, 2.95, 0.25), text: 'Lộ 6 / Lộ 15 (—LED—): LED Dây Hắt 4 Cạnh Ô Trần 2040×3140mm (Không Có Ray Nam Châm!)', cls: 'rose' }
      ];
    }

    // ==================== BUILD ZONE 5: LOẠI 2 — PHÒNG NGỦ TRỤC B–D (P.NGỦ 1 TẦNG 2 • P.NGỦ 3 TẦNG 3) ====================
    function buildZoneBedBD() {
      const { w, d, h } = ZONE_CONFIGS.BED_BD.dims;
      buildRoomShell(w, d, h);

      // HỆ TỌA ĐỘ CHUẨN BẢN VẼ KT-4.02, CĐ-04, CĐ-12, CĐ-13 (TRỤC B–D, 3–4):
      // - Chiều rộng lòng phòng Đông–Tây: 4.95m (x từ -2.65 đến +1.65) + Ban công Đông rộng 1.20m (x từ +1.65 đến +2.85)
      // - Chiều dài lòng phòng Bắc–Nam (Trục B–D): 3.36m (z từ -1.75 đến +1.65)
      // - Tường Bắc (Trục D, z = -1.70): VÁCH ĐẦU GIƯỜNG! Giường đôi (1.80m × 2.00m) tựa đầu vào Tường Bắc, nhìn xuống hướng Nam (+Z)!
      // - Tường Nam (Trục B, z = +1.65): Cửa gỗ D3 (900mm) ở góc Tây-Nam + Hệ Tủ Áo kịch trần kết hợp Kệ Tivi (dài 3.20m) chạy dọc Tường Nam!
      // - Tường Tây (x = -2.60, giáp Khu Thư Giãn T2 / Thông tầng T3): Cửa sổ kính S3 (1.10m) + Bàn học/làm việc chạy dọc Tường Tây!
      // - Tường Đông (Trục 4, x = +1.65): Cửa kính lùa D8 (2.04m) mở ra Ban công Đông + Hốc rèm tự động

      // 1) TƯỜNG ĐÔNG (Trục 4, x = +1.65) & BAN CÔNG ĐÔNG (x từ +1.65 đến +2.82):
      addBox(1.65, 0, -1.40, 0.14, h, 0.68, 0x334155); // Trụ góc Đông-Bắc
      addBox(1.65, 0, 1.35, 0.14, h, 0.65, 0x334155);  // Trụ góc Đông-Nam
      addBox(1.65, 0, -0.02, 0.06, 2.55, 2.04, 0x38bdf8, 0.24); // Cửa kính lùa D8 (2.040 × 3.000mm)
      addBox(2.24, 0.01, -0.02, 1.15, 0.04, 2.65, 0x334155);    // Sàn Ban công Đông
      addBox(2.80, 0, -0.02, 0.06, 1.10, 2.65, 0x38bdf8, 0.30); // Lan can kính Ban công Đông

      // 2) TƯỜNG BẮC (Trục D, z = -1.70): VÁCH ĐẦU GIƯỜNG + GIƯỜNG ĐÔI (1.80m × 2.00m) + 2 TÁP ĐẦU GIƯỜNG (Ổ cắm S2 +0.7M)
      addBox(0.25, 0, -1.68, 2.75, 2.65, 0.10, 0x78350f); // Vách gỗ ốp đầu giường Tường Bắc (Trục D)
      addBox(0.25, 0, -0.65, 1.80, 0.44, 2.00, 0x475569); // Giường đôi 1.8m × 2.0m tựa đầu vào Tường Bắc (nhìn xuống hướng Nam +Z)
      addBox(0.25, 0.44, -0.62, 1.68, 0.12, 1.88, 0xe2e8f0); // Đệm trắng
      addBox(-0.15, 0.56, -1.32, 0.58, 0.14, 0.38, 0xf8fafc); // Gối Trái (Tường Bắc)
      addBox(0.65, 0.56, -1.32, 0.58, 0.14, 0.38, 0xf8fafc);  // Gối Phải (Tường Bắc)
      addBox(0.25, 0.57, 0.02, 1.70, 0.04, 0.48, 0xea580c);   // Chăn điểm nhấn cuối giường (phía Nam)
      // 02 Táp đầu giường hai bên (x = -0.88 và x = +1.35, z = -1.45)
      addBox(-0.88, 0, -1.45, 0.44, 0.46, 0.42, 0x334155);
      addBox(1.35, 0, -1.45, 0.44, 0.46, 0.42, 0x334155);

      // Vùng cảnh báo đỏ trên gối khi cặp 2 bóng đôi 7W giữa phòng (Lộ 11) để 0° thẳng đứng gây chói mắt
      const glareGeo = new THREE.CylinderGeometry(0.62, 0.82, 0.12, 28);
      const glareMat = new THREE.MeshBasicMaterial({ color: 0xf43f5e, transparent: true, opacity: 0.0, depthWrite: false });
      glareWarningMesh = new THREE.Mesh(glareGeo, glareMat);
      glareWarningMesh.position.set(0.25, 0.68, -1.05);
      rootGroup.add(glareWarningMesh);

      // 3) TƯỜNG NAM (Trục B, z = +1.65): Cửa gỗ D3 (900mm) góc Tây-Nam + HỆ TỦ ÁO KỊCH TRẦN & KỆ TIVI DÀI 3.20m!
      addBox(-2.12, 0, 1.65, 0.88, 2.35, 0.08, 0x78350f, 0.55); // Cửa gỗ D3 (900mm) góc Tây-Nam
      addBox(0.05, 0, 1.38, 3.15, 2.90, 0.56, 0x78350f, 0.88);  // Hệ Tủ Áo & Hốc Kệ Tivi chạy dọc Tường Nam (đối diện cuối giường!)
      addBox(0.25, 0.85, 1.08, 0.95, 0.55, 0.05, 0x0f172a);     // Màn hình Tivi đối diện giường ngủ (ổ cắm S2 +0.4M & +1.2M)
      createCoveStrip({ x: 0.05, y: 2.35, z: 1.08, w: 2.85, d: 0.06, circuitId: 'BD_BALC', colorHex: 0xffedd5 }); // Chờ LED Tủ áo +1.6m

      // 4) TƯỜNG TÂY (x = -2.60, giáp Khu Thư Giãn T2 / Thông tầng T3): Cửa sổ kính S3 (1.10m) + BÀN HỌC / BÀN LÀM VIỆC DỌC TƯỜNG TÂY
      addBox(-2.58, 0.85, -0.75, 0.06, 1.75, 1.10, 0x38bdf8, 0.30); // Cửa sổ kính S3 (1.100 × 3.000mm)
      addBox(-2.25, 0.0, -0.35, 0.58, 0.75, 1.95, 0x92400e);        // Bàn học / Bàn làm việc dài chạy dọc Tường Tây
      addBox(-1.78, 0.0, -0.55, 0.42, 0.45, 0.42, 0xea580c);        // Ghế ngồi bàn học

      // 5) TRẦN GIẬT CẤP & KHE GIÓ ĐIỀU HÒA CHUẨN KT-4.02 (Ô trần 2.990 × 2.050mm tại x = +0.18, z = -0.32):
      addFourSidedCoffer(0.18, h, -0.32, 2.99, 2.05, 'BD_COVE', 0xffcf78);
      createCoveStrip({ x: 1.50, y: h - 0.08, z: -0.02, w: 0.10, d: 2.15, circuitId: 'BD_COVE', colorHex: 0xffcf78 }); // Hốc rèm cửa lùa D8

      // KHE GIÓ ĐIỀU HÒA ÂM TRẦN (150 × 1.100mm): Nằm DỌC (Bắc–Nam) ở phần trần hạ +3.00m phía Tây (giữa Bàn học và Giường ngủ chuẩn KT-4.02!)
      addLinearACSlot(-1.52, h - 0.10, -0.32, 0.16, 1.10);

      // 6) HỆ ĐÈN CHIẾU SÁNG CHUẨN KT-4.02 & CĐ-12 / CĐ-13 (TRỤC B–D):
      // - Lộ 11 (BD_MID):
      //   a) CẶP 02 BÓNG SPOTLIGHT ĐÔI 7W CÁCH NHAU 200mm TẠI PHÍA CUỐI GIƯỜNG (z = +0.15, x = [+0.15, +0.35]):
      //      BẮT BUỘC BẺ GÓC CHÓA 25° VỀ HƯỚNG NAM (Yaw = 0° — hướng về phía Hệ Tủ Áo & Kệ Tivi tường Nam) ĐỂ NẰM NGỬA KHÔNG CHÓI MẮT!
      [0.15, 0.35].forEach((xp, idx) => {
        createAimableSpotlight({
          x: xp, y: h, z: 0.15,
          circuitId: 'BD_MID', colorHex: 0xffd89b, watt: 7,
          baseTiltDeg: 25, baseYawDeg: 0, beamDeg: 24, cutoutMm: 75,
          label: idx === 0 ? 'Lộ 11 (Giữa Phòng): Cặp 2 Đèn Đôi 7W Cách 200mm (BẮT BUỘC Bẻ 25° Về Hướng Nam — Phía Tủ Áo/Tivi!)' : ''
        });
      });
      //   b) 02 BÓNG SPOTLIGHT 7W Ở HÀNG TRÊN (Trên 2 Táp đầu giường sát Tường Bắc, z = -1.38, x = [-0.95, +1.35]):
      //      Bẻ góc chóa 15° về hướng Bắc (Yaw = 180°) rửa sáng vách đầu giường!
      [-0.95, 1.35].forEach((xp) => {
        createAimableSpotlight({
          x: xp, y: h - 0.10, z: -1.38,
          circuitId: 'BD_MID', colorHex: 0xffd89b, watt: 7,
          baseTiltDeg: 15, baseYawDeg: 180, beamDeg: 24, cutoutMm: 75
        });
      });

      // - Lộ 10 (BD_PERIM — 5 BÓNG 9W Ở TẦNG 2 CĐ-12 / 6 BÓNG 9W Ở TẦNG 3 CĐ-13 XẾP CHỮ U QUANH GIƯỜNG):
      //   a) Hàng Dưới (3 bóng 9W cách đều 1410+1410mm trước Hệ Tủ Áo & Tivi tường Nam, z = +0.82, x = [-1.15, +0.18, +1.42]):
      //      Bẻ góc chóa 18° về hướng Nam (Yaw = 0°) rọi thẳng vào lòng Hệ Tủ Áo & Kệ Tivi!
      [-1.15, 0.18, 1.42].forEach((xp, idx) => {
        createAimableSpotlight({
          x: xp, y: h - 0.10, z: 0.82,
          circuitId: 'BD_PERIM', colorHex: 0xffd89b, watt: 9,
          baseTiltDeg: 18, baseYawDeg: 0, beamDeg: 24, cutoutMm: 75,
          label: idx === 1 ? 'Lộ 10 (Hàng Dưới Chữ U): 3 Đèn 9W (1410+1410mm) Bẻ 18° Về Hướng Nam Rọi Tủ Áo & Tivi' : ''
        });
      });
      //   b) Cột Trái (x = -1.15, z = -0.32) & Cột Phải (x = +1.42, z = -0.32):
      createAimableSpotlight({ x: -1.15, y: h - 0.10, z: -0.32, circuitId: 'BD_PERIM', colorHex: 0xffd89b, watt: 9, baseTiltDeg: 12, baseYawDeg: -90, beamDeg: 24, cutoutMm: 75 });
      createAimableSpotlight({ x: 1.42, y: h - 0.10, z: -0.32, circuitId: 'BD_PERIM', colorHex: 0xffd89b, watt: 9, baseTiltDeg: 12, baseYawDeg: 90, beamDeg: 24, cutoutMm: 75 });
      //   c) Trên Tầng 3 (P.Ngủ 3 — CĐ-13, khi bật altOptionActive): Có thêm bóng thứ 6 của Lộ 10 ở góc Đông-Bắc!
      if (altOptionActive) {
        createAimableSpotlight({ x: 1.42, y: h - 0.10, z: -1.15, circuitId: 'BD_PERIM', colorHex: 0xffd89b, watt: 9, baseTiltDeg: 15, baseYawDeg: 90, beamDeg: 24, cutoutMm: 75 });
      }

      // - Lộ 12 (BD_TRACK): THANH RAY NAM CHÂM / ĐÈN LED THANH CHẠY DỌC TRÊN BÀN HỌC TƯỜNG TÂY (x = -2.05, dài 2.05m từ z = -1.35 đến +0.70)
      addBox(-2.05, h - 0.09, -0.32, 0.06, 0.03, 2.05, 0x020617);
      [-0.85, 0.20].forEach((zp, idx) => {
        createAimableSpotlight({
          x: -2.05, y: h - 0.09, z: zp,
          circuitId: 'BD_TRACK', colorHex: 0xf8fafc, watt: 12,
          baseTiltDeg: 15, baseYawDeg: -90, beamDeg: 36,
          label: idx === 0 ? 'Lộ 12 (Tường Tây): Thanh Ray Nam Châm Dài 2.05m Ngay Trên Bàn Học & Cửa Sổ S3 (480 Lux)' : ''
        });
      });

      // - Lộ 13 / Lộ 10* (BD_BALC): Đèn Downlight ngoài Ban công Đông (x = +2.24, z = -0.02)
      createAimableSpotlight({
        x: 2.24, y: h - 0.12, z: -0.02,
        circuitId: 'BD_BALC', colorHex: 0xffd89b, watt: 9,
        baseTiltDeg: 0, baseYawDeg: 0, beamDeg: 36, cutoutMm: 75
      });

      // Dialux Heatmap Patches
      createHeatmapPatch(0.25, 0.48, 0.15, 0.95, 160, 'BD_MID');
      createHeatmapPatch(0.18, 0.02, 0.95, 1.05, 380, 'BD_PERIM');
      createHeatmapPatch(-2.15, 0.76, -0.35, 0.85, 480, 'BD_TRACK');

      labelAnchors = [
        { pos: new THREE.Vector3(0.25, 1.05, -1.45), text: 'Tường Bắc (Trục D): Đầu Giường + 2 Đèn 7W Lộ 11 Bẻ 15° (45 Lux)', cls: 'emerald' },
        { pos: new THREE.Vector3(0.25, 2.75, 0.15), text: 'Tâm Phòng (Lộ 11): Cặp 2 Đèn Đôi 7W Cách 200mm (Bẻ 25° Về Hướng Nam — Tủ Áo/Tivi)', cls: 'amber' },
        { pos: new THREE.Vector3(0.18, 2.05, 1.25), text: 'Tường Nam (Trục B): Hệ Tủ Áo & Kệ Tivi 3.2m + 3 Đèn 9W Lộ 10 Bẻ 18° Rọi Tủ', cls: 'sky' },
        { pos: new THREE.Vector3(-2.15, 1.65, -0.35), text: 'Tường Tây: Bàn Học & Cửa Sổ S3 + Ray Nam Châm Lộ 12 + Khe Gió Điều Hòa Dọc', cls: 'purple' }
      ];
    }

    // Rebuild 3D geometry for selected Zone
    function loadZone(zoneId) {
      currentZoneId = zoneId;
      const cfg = ZONE_CONFIGS[zoneId];

      // Clear previous meshes
      while (rootGroup.children.length > 0) {
        const obj = rootGroup.children.pop();
        rootGroup.remove(obj);
      }
      fixtureNodes = [];
      coveStrips = [];
      heatmapMeshes = [];
      labelAnchors = [];
      fanRotors = [];
      glareWarningMesh = null;

      // Reset circuit defaults
      cfg.circuits.forEach(c => { c.on = true; });
      currentSceneId = cfg.scenes[0].id;

      // Build zone geometry
      if (zoneId === 'T1') buildZoneT1();
      else if (zoneId === 'T2') buildZoneT2();
      else if (zoneId === 'T3') buildZoneT3();
      else if (zoneId === 'BED_AB') buildZoneBedAB();
      else buildZoneBedBD();

      // Apply first scene preset
      applyScenePreset(cfg.scenes[0].id, false);
      setCameraPreset('iso');
      renderControlPanels();
      updateSimulationState();
    }

    function setCameraPreset(presetKey) {
      const cfg = ZONE_CONFIGS[currentZoneId];
      const camPreset = cfg.cameras[presetKey] || cfg.cameras.iso;
      syncOrbitFromPos(camPreset.pos, camPreset.target);

      rootEl.querySelectorAll('[data-cam-preset]').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-cam-preset') === presetKey);
      });
    }

    function applyScenePreset(sceneId, shouldRenderUI = true) {
      const cfg = ZONE_CONFIGS[currentZoneId];
      const sc = cfg.scenes.find(s => s.id === sceneId) || cfg.scenes[0];
      currentSceneId = sc.id;

      cfg.circuits.forEach(c => {
        c.on = sc.activeCircuits.includes(c.id);
      });

      if (typeof sc.presetTilt === 'number') {
        masterTiltDeg = sc.presetTilt;
        const tiltSlider = rootEl.querySelector('.opple-slider-tilt');
        if (tiltSlider) tiltSlider.value = String(masterTiltDeg);
      }

      if (shouldRenderUI) {
        renderControlPanels();
      }
      updateSimulationState();
    }

    function toggleCircuit(circuitId) {
      const cfg = ZONE_CONFIGS[currentZoneId];
      const c = cfg.circuits.find(item => item.id === circuitId);
      if (!c) return;
      c.on = !c.on;
      renderControlPanels();
      updateSimulationState();
    }

    function updateSimulationState() {
      const cfg = ZONE_CONFIGS[currentZoneId];
      const circuitMap = {};
      cfg.circuits.forEach(c => { circuitMap[c.id] = c; });

      const halfBeamRad = THREE.MathUtils.degToRad(masterBeamDeg * 0.5);

      // Update Aimable Spotlights
      fixtureNodes.forEach(node => {
        const cir = circuitMap[node.circuitId];
        const isOn = cir ? cir.on : true;

        // Calculate effective tilt & yaw
        const effectiveTiltDeg = (cir && cir.aimable) ? masterTiltDeg : node.baseTiltDeg;
        const effectiveYawDeg = node.baseYawDeg + masterYawDeg;

        const tiltRad = THREE.MathUtils.degToRad(effectiveTiltDeg);
        const yawRad = THREE.MathUtils.degToRad(effectiveYawDeg);

        // In Three.js right-handed coordinates:
        // Negative X rotation (-tiltRad) tilts the downward (-Y) cone towards +Z (when yaw = 0°),
        // matching the floor pool offset (+sin(yaw)*dist, +cos(yaw)*dist)!
        node.gimbalYaw.rotation.y = yawRad;
        node.gimbalTilt.rotation.x = -tiltRad;

        // Scale cone width dynamically according to selected Beam Angle (15° / 24° / 36°)
        const baseHalfRad = THREE.MathUtils.degToRad(node.beamDeg * 0.5);
        const beamScale = Math.tan(halfBeamRad) / Math.max(0.05, Math.tan(baseHalfRad));
        node.coneMesh.scale.set(beamScale, 1, beamScale);

        node.coneMesh.visible = isOn && showCones;
        node.arrowHelper.visible = isOn && showCones;
        node.pointLight.intensity = isOn ? (node.watt >= 12 ? 0.52 : 0.36) : 0;
        node.lensMat.color.setHex(isOn ? node.colorHex : 0x1e293b);

        // Project light pool onto floor/wall based on tilt & yaw
        const hDrop = node.origin.y - 0.02;
        const offsetDist = Math.tan(tiltRad) * hDrop * 0.72;
        const px = node.origin.x + Math.sin(yawRad) * offsetDist;
        const pz = node.origin.z + Math.cos(yawRad) * offsetDist;
        node.poolMesh.position.set(px, 0.016, pz);
        node.poolMesh.scale.setScalar(beamScale * (1 + Math.abs(effectiveTiltDeg) * 0.015));
        node.poolMesh.visible = isOn;
      });

      // Update Cove LED strips
      coveStrips.forEach(strip => {
        const cir = circuitMap[strip.circuitId];
        const isOn = cir ? cir.on : true;
        strip.mesh.visible = isOn;
        strip.glowMesh.visible = isOn;
        strip.light.intensity = isOn ? 0.38 : 0;
      });

      // Update Dialux Heatmap Patches
      heatmapMeshes.forEach(hm => {
        const cir = circuitMap[hm.circuitId];
        const isOn = cir ? cir.on : true;
        hm.mesh.visible = isOn && showHeatmap;
      });

      // Check Bedroom Glare Warning when center lights are ON and Tilt < 12°
      if (glareWarningMesh) {
        const midCircuit = circuitMap['M15C'] || circuitMap['AB_MID'] || circuitMap['BD_MID'];
        const isGlareRisk = midCircuit && midCircuit.on && Math.abs(masterTiltDeg) < 12;
        glareWarningMesh.material.opacity = isGlareRisk ? 0.52 : 0.0;
      }

      // Compute Live Lux, Total Wattage, and UGR Status for HUD
      let totalLux = 0;
      let totalWatt = 0;
      let activeCount = 0;
      cfg.circuits.forEach(c => {
        if (c.on) {
          totalLux += c.luxContrib;
          totalWatt += c.watt;
          activeCount++;
        }
      });

      // Adjust Lux légèrement with beam angle concentration
      if (masterBeamDeg === 15 && totalLux > 0) totalLux = Math.round(totalLux * 1.12);
      else if (masterBeamDeg === 36 && totalLux > 0) totalLux = Math.round(totalLux * 0.92);

      // Determine UGR Glare index
      const midBedOn = (circuitMap['M15C'] && circuitMap['M15C'].on) ||
                       (circuitMap['AB_MID'] && circuitMap['AB_MID'].on) ||
                       (circuitMap['BD_MID'] && circuitMap['BD_MID'].on);
      let ugrText = 'UGR < 15 (Êm mắt)';
      let ugrAlert = false;
      if (midBedOn && Math.abs(masterTiltDeg) < 12) {
        ugrText = '⚠️ UGR 25.8 (CHÓI MẮT TRÊN GIƯỜNG!)';
        ugrAlert = true;
      } else if (totalLux === 0) {
        ugrText = 'Tắt hết đèn (0 Lux)';
      } else if (Math.abs(masterTiltDeg) >= 15) {
        ugrText = `UGR 13.4 (Đã bẻ chóa ${masterTiltDeg}° chống chói)`;
      }

      // Update DOM HUD metrics
      const elLux = rootEl.querySelector('.hud-val-lux');
      const elWatt = rootEl.querySelector('.hud-val-watt');
      const elTilt = rootEl.querySelector('.hud-val-tilt');
      const elUgr = rootEl.querySelector('.hud-val-ugr');
      const elSliderTiltVal = rootEl.querySelector('.slider-tilt-label');
      const elSliderYawVal = rootEl.querySelector('.slider-yaw-label');

      if (elLux) elLux.textContent = `${totalLux} Lux`;
      if (elWatt) elWatt.textContent = `${totalWatt} W (${activeCount}/${cfg.circuits.length} lộ)`;
      if (elTilt) elTilt.textContent = `Nghiêng ${masterTiltDeg}° • Xoay ${masterYawDeg}° • Góc chiếu ${masterBeamDeg}°`;
      if (elUgr) {
        elUgr.textContent = ugrText;
        elUgr.style.color = ugrAlert ? '#fb7185' : '#34d399';
      }
      if (elSliderTiltVal) elSliderTiltVal.textContent = `${masterTiltDeg}°`;
      if (elSliderYawVal) elSliderYawVal.textContent = `${masterYawDeg}°`;
    }

    function renderControlPanels() {
      const cfg = ZONE_CONFIGS[currentZoneId];

      // Zone header info
      const titleEl = rootEl.querySelector('.studio-zone-title');
      const subEl = rootEl.querySelector('.studio-zone-sub');
      const optBtn = rootEl.querySelector('.btn-toggle-alt-option');
      if (titleEl) titleEl.textContent = cfg.title;
      if (subEl) subEl.textContent = cfg.subtitle;
      if (optBtn) {
        optBtn.textContent = `🔄 ${cfg.optionLabel}`;
        optBtn.classList.toggle('active', altOptionActive);
      }

      // Zone Tabs
      rootEl.querySelectorAll('[data-zone-tab]').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-zone-tab') === currentZoneId);
      });

      // Camera Preset Buttons
      const camContainer = rootEl.querySelector('.studio-cam-buttons');
      if (camContainer) {
        camContainer.innerHTML = Object.keys(cfg.cameras).map(k => {
          const c = cfg.cameras[k];
          return `<button type="button" class="studio-chip" data-cam-preset="${k}">${c.name}</button>`;
        }).join('');
        camContainer.querySelectorAll('[data-cam-preset]').forEach(btn => {
          btn.addEventListener('click', () => setCameraPreset(btn.getAttribute('data-cam-preset')));
        });
      }

      // Emotional Scenes List
      const sceneContainer = rootEl.querySelector('.studio-scene-list');
      if (sceneContainer) {
        sceneContainer.innerHTML = cfg.scenes.map(sc => {
          const isAct = sc.id === currentSceneId;
          const isWarn = sc.id.includes('wrong');
          return `
            <button type="button" class="scene-card-btn ${isAct ? 'active' : ''} ${isWarn ? 'warn' : ''}" data-scene-id="${sc.id}">
              <div class="scene-card-top">
                <strong>${sc.name}</strong>
                <span class="scene-lux-pill">${sc.targetLux} Lux</span>
              </div>
              <div class="scene-card-desc">${sc.desc}</div>
            </button>
          `;
        }).join('');
        sceneContainer.querySelectorAll('[data-scene-id]').forEach(btn => {
          btn.addEventListener('click', () => applyScenePreset(btn.getAttribute('data-scene-id'), true));
        });
      }

      // Individual Circuit Toggles (Aqara Switch Simulator)
      const circuitContainer = rootEl.querySelector('.studio-circuit-list');
      if (circuitContainer) {
        circuitContainer.innerHTML = cfg.circuits.map(c => `
          <button type="button" class="circuit-switch-btn ${c.on ? 'on' : 'off'}" data-circuit-id="${c.id}">
            <span class="circuit-dot"></span>
            <div style="text-align:left;flex:1;">
              <div style="font-weight:700;font-size:0.8rem;color:#fff;">${c.code}: ${c.name}</div>
              <div style="font-size:0.72rem;color:#94a3b8;">${c.watt}W • ${c.cct}K • +${c.luxContrib} Lux ${c.aimable ? `• 🎯 Chỉnh góc chóa` : ''}</div>
            </div>
            <span class="circuit-state-tag">${c.on ? 'BẬT' : 'TẮT'}</span>
          </button>
        `).join('');
        circuitContainer.querySelectorAll('[data-circuit-id]').forEach(btn => {
          btn.addEventListener('click', () => toggleCircuit(btn.getAttribute('data-circuit-id')));
        });
      }
    }

    function update3DLabels() {
      if (!hudOverlay) return;
      if (!showLabels) {
        hudOverlay.innerHTML = '';
        return;
      }

      const rect = domCanvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      const htmlParts = [];
      const tempV = new THREE.Vector3();

      labelAnchors.forEach(item => {
        tempV.copy(item.pos);
        tempV.project(camera);
        if (tempV.z > 1) return; // behind camera
        const x = (tempV.x * 0.5 + 0.5) * rect.width;
        const y = (-tempV.y * 0.5 + 0.5) * rect.height;
        if (x < 10 || x > rect.width - 10 || y < 10 || y > rect.height - 10) return;
        htmlParts.push(
          `<div class="label-3d-pin ${item.cls || ''}" style="transform:translate(-50%,-50%);left:${x.toFixed(1)}px;top:${y.toFixed(1)}px;">${item.text}</div>`
        );
      });

      hudOverlay.innerHTML = htmlParts.join('');
    }

    function resizeRenderer() {
      const w = canvasWrap.clientWidth || 800;
      const h = canvasWrap.clientHeight || 520;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    }

    function updateAutoRotateBtn() {
      const btn = rootEl.querySelector('.btn-toggle-autorotate');
      if (btn) btn.classList.toggle('active', autoRotate);
    }

    // Bind UI Event Listeners inside rootEl
    rootEl.querySelectorAll('[data-zone-tab]').forEach(btn => {
      btn.addEventListener('click', () => loadZone(btn.getAttribute('data-zone-tab')));
    });

    const tiltSlider = rootEl.querySelector('.opple-slider-tilt');
    if (tiltSlider) {
      tiltSlider.addEventListener('input', (e) => {
        masterTiltDeg = parseInt(e.target.value, 10) || 0;
        updateSimulationState();
      });
    }

    const yawSlider = rootEl.querySelector('.opple-slider-yaw');
    if (yawSlider) {
      yawSlider.addEventListener('input', (e) => {
        masterYawDeg = parseInt(e.target.value, 10) || 0;
        updateSimulationState();
      });
    }

    rootEl.querySelectorAll('[data-beam-deg]').forEach(btn => {
      btn.addEventListener('click', () => {
        masterBeamDeg = parseInt(btn.getAttribute('data-beam-deg'), 10) || 24;
        rootEl.querySelectorAll('[data-beam-deg]').forEach(b => b.classList.toggle('active', b === btn));
        updateSimulationState();
      });
    });

    const btnAimZero = rootEl.querySelector('.btn-aim-zero');
    if (btnAimZero) {
      btnAimZero.addEventListener('click', () => {
        masterTiltDeg = 0;
        masterYawDeg = 0;
        if (tiltSlider) tiltSlider.value = '0';
        if (yawSlider) yawSlider.value = '0';
        updateSimulationState();
      });
    }

    const btnAimOptimal = rootEl.querySelector('.btn-aim-optimal');
    if (btnAimOptimal) {
      btnAimOptimal.addEventListener('click', () => {
        masterTiltDeg = currentZoneId === 'T1' ? 15 : (currentZoneId === 'T3' ? 28 : 25);
        masterYawDeg = 0;
        if (tiltSlider) tiltSlider.value = String(masterTiltDeg);
        if (yawSlider) yawSlider.value = '0';
        updateSimulationState();
      });
    }

    const btnToggleCones = rootEl.querySelector('.btn-toggle-cones');
    if (btnToggleCones) {
      btnToggleCones.addEventListener('click', () => {
        showCones = !showCones;
        btnToggleCones.classList.toggle('active', showCones);
        updateSimulationState();
      });
    }

    const btnToggleHeatmap = rootEl.querySelector('.btn-toggle-heatmap');
    if (btnToggleHeatmap) {
      btnToggleHeatmap.addEventListener('click', () => {
        showHeatmap = !showHeatmap;
        btnToggleHeatmap.classList.toggle('active', showHeatmap);
        updateSimulationState();
      });
    }

    const btnToggleLabels = rootEl.querySelector('.btn-toggle-labels');
    if (btnToggleLabels) {
      btnToggleLabels.addEventListener('click', () => {
        showLabels = !showLabels;
        btnToggleLabels.classList.toggle('active', showLabels);
        update3DLabels();
      });
    }

    const btnToggleAlt = rootEl.querySelector('.btn-toggle-alt-option');
    if (btnToggleAlt) {
      btnToggleAlt.addEventListener('click', () => {
        altOptionActive = !altOptionActive;
        loadZone(currentZoneId);
      });
    }

    const btnAutoRotate = rootEl.querySelector('.btn-toggle-autorotate');
    if (btnAutoRotate) {
      btnAutoRotate.addEventListener('click', () => {
        autoRotate = !autoRotate;
        updateAutoRotateBtn();
      });
    }

    window.addEventListener('resize', resizeRenderer);

    function animate() {
      if (!isSimulationRunning) return;
      rafId = requestAnimationFrame(animate);

      if (autoRotate && !orbit.isDragging) {
        orbit.theta += 0.0035;
        updateCameraTransform();
      }

      // Spin 3D Ceiling Fan blades when their circuit (L6 / L6A) is ON
      if (fanRotors.length > 0) {
        const cfg = ZONE_CONFIGS[currentZoneId];
        fanRotors.forEach(fr => {
          const cir = cfg.circuits.find(c => c.id === fr.circuitId);
          if (!cir || cir.on) {
            fr.rotorGroup.rotation.y += 0.075;
          }
        });
      }

      renderer.render(scene, camera);
      update3DLabels();
    }

    function startSimulation() {
      if (!isSimulationRunning) {
        isSimulationRunning = true;
        resizeRenderer();
        animate();
      }
    }

    function stopSimulation() {
      isSimulationRunning = false;
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    }

    // Modern Web Guidance: Efficient Background Processing
    // Direct listener on heavy component with content-visibility: auto
    rootEl.addEventListener('contentvisibilityautostatechange', (event) => {
      if (event.skipped) {
        stopSimulation();
      } else {
        startSimulation();
      }
    });

    // Fallback using IntersectionObserver for older browsers without content-visibility
    const isContentVisibilitySupported = 'contentVisibility' in document.documentElement.style;
    if (!isContentVisibilitySupported && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            startSimulation();
          } else {
            stopSimulation();
          }
        });
      }, { rootMargin: '200px' });
      observer.observe(rootEl);
    }

    // Initialize
    resizeRenderer();
    loadZone('T1');
    animate();

    return {
      loadZone,
      setCameraPreset,
      applyScenePreset,
      startSimulation,
      stopSimulation
    };
  }

  window.initOpple3DStudios = function () {
    document.querySelectorAll('.js-opple-3d-studio').forEach(el => {
      if (!el.dataset.studioInitialized) {
        el.dataset.studioInitialized = 'true';
        createStudioInstance(el);
      }
    });

    // Modern Web Guidance: Light-Dismiss Dialog Fallback for browsers without closedBy support
    document.querySelectorAll('dialog[closedby="any"]').forEach(dialog => {
      if (!('closedBy' in HTMLDialogElement.prototype) && !dialog.dataset.fallbackBound) {
        dialog.dataset.fallbackBound = 'true';
        dialog.addEventListener('click', (event) => {
          if (event.target !== dialog) return;
          const rect = dialog.getBoundingClientRect();
          const isDialogContent = (
            rect.top <= event.clientY &&
            event.clientY <= rect.top + rect.height &&
            rect.left <= event.clientX &&
            event.clientX <= rect.left + rect.width
          );
          if (isDialogContent) return;
          dialog.close();
        });
      }
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', window.initOpple3DStudios);
  } else {
    window.initOpple3DStudios();
  }
})();
