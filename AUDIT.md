# AUDIT — index.html (mobile) · 07/08/2026

> **Cập nhật 07/08 (đợt "sync đoạn thoại" + data thật):** các finding sau ĐÃ XỬ LÝ ở bản mobile — quảng cáo mã JUL nhưng chỉ nhận JUNE (map giờ nhận cả 2); TUMI còn sót ở 4 PDP + cart (đã gỡ, title đổi "(5)"→"(3)"); 7 vs 14 ngày đổi trả (chốt 7); typo "Thay doi/Giao hang nhanh/Chuyển khoảng/Lavancaza"; nhãn tóm tắt ship "Chuyển phát nhanh" sai với option đã chọn; badge "Đang giao" vs timeline steps:2 (→3); GHN vs TIKINOW (→TKN); ngày promo/đơn hàng quá hạn (→08/2026); 'Sản phẩm (2)' thiếu bản (1); các cặp I18N_REV trùng value (Phương thức vận chuyển, Phí vận chuyển, Chọn size, Đăng ký nhận thông báo, Xuất xứ, Mức giảm, Ưu đãi, Bảo quản sản phẩm); 12/18 SP sai PDP **chưa** sửa routing nhưng data/ảnh đã thật; quick add beauty rơi về size giày (hết — beauty giờ có dung tích thật). Các finding hành vi (validation, cart động, wire() double-bind, scroll/back...) vẫn nguyên — xem kế hoạch Đợt 1–4.

Ket qua ra soat toan bo luong cua demo mobile, moi phat hien deu duoc mot agent phan bien doc lai code de xac nhan (tag `confirmed` / `adjusted`; cum journey doi chieu bang grep, tag `no-verify`). So dong tinh tai thoi diem audit — co the xe dich sau khi sua.

Ky hieu: **[high/medium/low]** muc do de "be" khi demo · [kind] loai gap · [KNOWN] = README da ghi nhan tu truoc.

## PLP + Search + khung trang (header/menu/footer)

> Cụm PLP/Search có bộ khung tốt: 3 chế độ PLP (brand/category/search) với empty-state được thiết kế riêng, sort dropdown lọc lại grid thật, search có đủ 4 trạng thái Figma kèm xóa lịch sử có animation, menu drawer 2 cấp điều hướng được, footer 3 link chính sách hoạt động. Tuy nhiên có 3 lỗi dễ "bể" khi demo: filter sheet hoàn toàn trang trí (Áp dụng chỉ toast), nút Show more re-wire toàn màn làm chết sort dropdown và nhân bản sản phẩm lũy tiến, và 12/18 sản phẩm (SP#7–10 + toàn bộ hàng beauty) bấm vào mở sai PDP của SP#1 (đầm lụa).

**Da chay tot (10):**
- PLP brand: promo bar tự trượt 4s, hero + brand block Xem thêm/Thu gọn, rail danh mục -> PLP category
- PLP category/search: breadcrumb + tiêu đề, empty-state search không kết quả được thiết kế riêng (2918:45172)
- Sắp xếp: dropdown 5 lựa chọn, chọn xong render lại grid thật (relevance/newest/bestseller/price asc-desc)
- Chuyển grid 1/2 cột hoạt động
- Bộ lọc: mở/đóng sheet, accordion 3 tầng rail đúng Figma, tick cha-con đồng bộ, facet đổi theo ngành hàng (fashion/beauty)
- Search: 4 trạng thái (trending/suggest/no-result/history), highlight từ khóa, Enter + click suggestion ra PLP search mode, xóa từng dòng lịch sử có animation + cập nhật tiêu đề trending
- Đổi màu swatch ngay trên card PLP, quick add mở đúng màu; SP dropdown-size mở thẳng size sheet
- Menu drawer: 3 tab Nam/Nữ/Làm đẹp, 2 cấp, hàng danh mục điều hướng PLP category với breadcrumb; vùng tiện ích login/account; đổi ngôn ngữ ENG/VIE trong menu
- Footer: accordion 3 nhóm, 3 link chính sách (privacy/terms/returns) điều hướng thật; dữ liệu công ty đã sửa theo site thật
- Cart badge sync cartQty ở mọi navBar render + hiệu ứng pop khi thêm giỏ

### [high][dead-end][confirmed] Bộ lọc hoàn toàn trang trí — Áp dụng không lọc sản phẩm nào

Không tồn tại state bộ lọc nào nối vào plpProducts()/sortedProducts(). Nút Áp dụng chỉ đếm số ô tick rồi toast (demo stub); grid giữ nguyên. Kéo theo: slider khoảng giá là span tĩnh không kéo được, nút Đặt lại chỉ gỡ .chk/.fsize — màu đã chọn (fcolor) và 2 input giá không reset, tiêu đề section hardcode 'Thương hiệu (2)' vẫn giữ '(2)' sau khi bỏ tick 2 brand mặc định.

*Evidence:* Dòng 3417-3420: sh.querySelector('#filterApply').addEventListener('click', () => { const n = ...; closeFilter(); toast(n ? `Áp dụng ${n} bộ lọc` : 'Đã bỏ hết bộ lọc'); }); — không gọi renderPlpGrid. Reset dòng 3422-3425 chỉ xóa '.chk.on'/'.fsize.on'.

### [high][bug][confirmed] Show more gọi lại wire(root) toàn màn — sort dropdown chết, sản phẩm nhân bản lũy tiến

Handler #showMore sau khi append 4 card gọi wire(root) trên TOÀN màn: mọi element bị gắn listener lần 2. Hậu quả: (a) #sortBtn có 2 listener cùng toggle 'hidden' → toggle chẵn lần, menu Sắp xếp không bao giờ mở được nữa sau 1 lần bấm Show more; (b) chính #showMore cũng nhận thêm listener → bấm lần 2 chạy 2 handler (8 SP), lần 3 chạy 4 handler... tăng theo cấp số nhân. Ngoài ra luôn append PRODUCTS.slice(0,4) — 4 SP thời trang đầu tiên, trùng với card sẵn có, kể cả đang ở PLP Làm đẹp hay kết quả tìm kiếm 1 SP; số đếm 'N sản phẩm' không cập nhật và đổi sort thì các card append biến mất.

*Evidence:* Dòng 5057-5061: PRODUCTS.slice(0, 4).forEach(...); sm.innerHTML = 'Show more'; wire(root); — wire() dòng 5105-5107 gắn lại sortBtn.addEventListener(... sortMenu.classList.toggle('hidden')).

### [high][bug][confirmed] 12/18 sản phẩm mở sai PDP — SP#7–10 và cả 8 SP beauty đều ra PDP đầm lụa (SP#1)

Router card chỉ map index 1-5 sang pdp2..pdp6, mọi index khác rơi về 'pdp' (screenPDP hardcode PRODUCTS[0]). PLP brand có 10 SP thời trang và PLP Làm đẹp có 8 SP beauty: khách bấm 'Túi da Lou mini' hay 'Nước hoa Eros Eau de Parfum' đều mở trang chi tiết 'Đầm lụa mini Broken Jewels'. Nút 'Xem chi tiết' trong quick add cũng dùng đúng ternary này nên sai y hệt. Search quét cả 2 ngành nên kết quả tìm 'nước hoa' cũng dẫn về đầm.

*Evidence:* Dòng 3744: go(el.dataset.product === '1' ? 'pdp2' : ... === '5' ? 'pdp6' : 'pdp') — PRODUCTS có 18 phần tử (dòng 342-370); quick add lặp lại ở dòng 5817.

### [medium][bug][confirmed] PLP brand đếm '18 sản phẩm' nhưng grid chỉ hiển thị 10

Dòng đếm dùng PRODUCTS.length (18 = 10 thời trang + 8 beauty) trong khi grid render plpProducts() đã lọc bỏ dept 'beauty' (còn 10). screenPLPList (category/search) dùng list.length đúng — chỉ màn brand sai.

*Evidence:* Dòng 1010: `${PRODUCTS.length} sản phẩm` vs dòng 1032-1033: sortedProducts() ← plpProducts() filter `(p.dept === 'beauty') === beauty` (dòng 868).

### [medium][bug][confirmed] Back vật lý giữa 2 chế độ PLP bị nuốt — go() skip khi cùng route, plpMode không được khôi phục

Đi PLP brand → menu → PLP category (cùng route 'plp', goPlp ép render bằng cách null current). Nhưng popstate gọi thẳng go('plp', {back}) → dòng 4287 `if (name === current) return;` nuốt luôn: bấm back vật lý/vuốt back, history entry bị tiêu nhưng màn không đổi, người dùng kẹt ở category view. plpMode cũng là biến toàn cục không lưu theo history nên dù có render lại cũng ra mode hiện tại chứ không phải mode trước.

*Evidence:* Dòng 4287: 'if (name === current) return;' + dòng 4320-4323 popstate gọi go(target, { back: true, fromPopstate: true }) không qua goPlp; goPlp chỉ ép render ở dòng 851.

### [medium][dead-end][confirmed] Tab Nam/Nữ/Làm đẹp ở màn Search chỉ đổi style, không đổi nội dung

Click tab chỉ đổi border/màu chữ và gán searchTab, nhưng searchSuggestions() và searchTrendingHTML() luôn quét toàn bộ PRODUCTS — gợi ý, trending, lịch sử không đổi theo tab. Demo stub thuần thị giác: chọn tab 'Làm đẹp' vẫn trending 4 SP thời trang.

*Evidence:* Dòng 4404-4415 handler chỉ toggle class; dòng 1062-1067 searchSuggestions dùng PRODUCTS.forEach không đọc searchTab; searchTab (dòng 1052) không được đọc ở bất kỳ hàm render nào.

### [medium][inconsistency][confirmed] Menu Thương hiệu: 25 brand đều dẫn về cùng trang Versace; PLP danh mục nào cũng cùng 10 sản phẩm

Submenu Thương hiệu gắn data-nav='plp' trần (không plp-title) nên Burberry/BALMAIN/TUMI... đều mở PLP brand hardcode Versace (hero, logo, mô tả, breadcrumb 'Versace'). Hàng 'Trang chủ nam/nữ' cũng về trang Versace (riêng 'Trang chủ làm đẹp' đi đúng PLP beauty). Các danh mục lá ('Áo polo', 'Giày sneaker'...) mở PLP category tiêu đề đúng nhưng danh sách chỉ lọc theo dept nên trang 'Áo polo' hiển thị cả đầm, túi, giày. Hạn chế data demo nhưng khách bấm brand khác thấy nguyên trang Versace là dễ hiểu nhầm.

*Evidence:* Dòng 5475: menuSub.items.map(it => row(it, menuSub.login ? 'data-nav="plp"' : catAttrs(...))) — MENU_BRAND_SUB có login:true (dòng 594); plpProducts dòng 868 chỉ filter dept.

### [medium][i18n][confirmed] Cụm PLP/filter sót nhiều chuỗi ngoài I18N; 'Show more'/'Trending item' hardcode tiếng Anh trong UI Việt

Không có trong I18N: 5 nhãn SORT_OPTIONS ('Phù hợp nhất', 'Bán chạy nhất', 'Giá: Thấp đến cao'...), 3 dòng PROMO_MESSAGES của promo bar, chữ 'Đang tải' khi Show more, toast bộ lọc ('Áp dụng N bộ lọc'/'Đã bỏ hết bộ lọc'/'Đã đặt lại bộ lọc') → bật EN các chỗ này vẫn tiếng Việt. Ngược chiều: nút #showMore và tiêu đề 'Trending item' hardcode tiếng Anh ở giao diện mặc định VI; do từ điển 2 chiều, sau khi toggle sang EN rồi quay lại VI, 'Show more' bị dịch thành 'Xem thêm' — trước/sau toggle không nhất quán.

*Evidence:* Dòng 3650-3656 SORT_OPTIONS và 531-535 PROMO_MESSAGES không có key trong I18N (grep 'Phù hợp nhất' chỉ ra dòng 3651); dòng 924: <button id="showMore" ...>Show more</button>; dòng 4275: localizeNew chỉ chạy khi LANG==='en'.

### [low][missing-edge-case][confirmed] Newsletter footer: đăng ký không validate email — bỏ trống vẫn 'Đăng ký thành công'

Nút Đăng ký là toast stub data-toast, không kiểm tra input email rỗng/sai định dạng, không có UI báo lỗi. Trong demo click liền tay dễ lộ (bấm không nhập gì vẫn success).

*Evidence:* Dòng 737-738: <input type="email" ...> + <button data-toast="Đăng ký thành công" ...>Đăng ký</button>; handler data-toast dòng 4612 chỉ toast.

### [low][missing-edge-case][confirmed] Quick add SP beauty không có 'sizes' rơi về size giày 39–44

'Nến thơm Medusa Signature' và 'Set quà tặng Discovery' không có mảng sizes nên quick add hiển thị nhãn 'Kích thước' + chip 39–44 (kèm 43/44 gạch hết hàng) — vô nghĩa với nến/set quà. Code comment thừa nhận fallback này nhưng README chưa ghi.

*Evidence:* Dòng 5744-5750: `${p.sizes ? 'Dung tích' : 'Kích thước'}` và `(p.sizes || SIZES)` với DISABLED; dòng 368-369 hai SP beauty không có sizes.

### [low][missing-flow][confirmed][KNOWN] Footer: 14/17 link vẫn là chữ tĩnh không điều hướng

Chỉ 3 link có route (privacy/terms/returns); 14 link còn lại ('Chính sách vận chuyển', 'Chính sách thanh toán', 'Tuyển dụng'...) render span tĩnh không bấm được — trong đó 2 trang Vận chuyển/Thanh toán có tab trong Figma strip nhưng chưa có frame nội dung. README đã ghi nhận ở mục '2 điểm còn hở'.

*Evidence:* Dòng 723-727 FOOTER_ROUTES chỉ 3 entry + dòng 761-763: FOOTER_ROUTES[l] ? <button data-nav> : <span ...>${l}</span>.

## 6 bien the PDP + size picker + notify

> Cụm 6 PDP nhìn chung sống tốt: chọn màu đổi gallery đúng, luồng hết hàng 2 tầng trên chip (pdp/pdp4) chạy trọn (43 → Tạm hết hàng disable, 44 → notify sheet → done), size picker của pdp2/3/5/6 hoạt động và mọi đường add-to-cart đều đổ về #cartConfirm; 3 quy ước đồng bộ trong README đều đạt ở cả 6 bản. Gap nặng nhất: PDP dropdown cho bấm "Thêm vào giỏ hàng" khi CHƯA chọn size (không validate, không mở picker) — dễ bể khi demo; ngoài ra picker gộp mất tầng "Tạm hết hàng" (43 cũng thành "Nhận thông báo"), link "Bảng kích thước" ở cả 6 PDP chỉ là toast stub, và các nhãn CTA đổi lúc runtime không được dịch khi đang ở chế độ EN.

**Da chay tot (8):**
- Chọn màu → đổi slide gallery + tên màu: data-sw handler (dòng 4826-4833) scrollTo theo index, mapping đúng vì gallery và swatch cùng slice từ PRODUCT_GALLERY; pdp6 không có swatch là đúng thiết kế
- Hết hàng 2 tầng trên chip (pdp/pdp4): size 43 → CTA 'Tạm hết hàng' disabled, size 44 → CTA 'Nhận thông báo khi có hàng' → #notifySheet → 'Đã đăng ký nhận thông báo' (setCta dòng 4782-4824), chọn lại size thường thì CTA hồi phục
- Size picker #sizeSheet (pdp2/3/5/6): chọn hàng highlight, CTA disabled khi chưa chọn, hàng oos gạch ngang + 'Nhận thông báo', CTA đổi mode add/notify, low-stock '42' hiện 'Còn 1 sản phẩm' (dòng 6035-6072); onPick cập nhật label trigger (4722-4734)
- Add to cart từ cả 6 PDP đều qua flyToCart + badge pop + #cartConfirm với đủ ảnh/brand/tên/variant/giá (4590-4608, 6106-6127) — cơ chế nhất quán
- 3 quy ước README đạt ở cả 6 bản: info tab đều là accordion .acc (không sheet), không còn dòng trả góp cấp sản phẩm nào, nhãn size guide thống nhất 'Bảng kích thước' (1221/1488/1620/1738/2212/2341/6016)
- Khuyến mãi: pdp extend tại chỗ bằng .acc (promoCardsSplit 1393), pdp2 mở #infoSheet chi tiết qua [data-promo] với asHTML (4848-4866) — cả 2 chạy
- i18n phần tĩnh của cụm đầy đủ: 'Đặt trước', 'Chọn kích thước', 'Chỉ còn 01 sản phẩm', bộ chuỗi notify sheet, regex 'Còn N sản phẩm'/'Giỏ hàng hiện có N sản phẩm' đều có trong I18N
- Nhấn 'Nhận thông báo' trong picker đi đúng đích: closeSZ → #notifySheet, submit có check rỗng + toast xác nhận (6099-6104, 5648-5657)

### [high][missing-edge-case][confirmed] PDP dropdown cho thêm vào giỏ khi CHƯA chọn size — không validate, không mở picker

Ở pdp2/pdp3/pdp5/pdp6, nút 'Thêm vào giỏ hàng' (cả in-flow lẫn sticky) add thẳng vào giỏ dù trigger vẫn đang 'Chọn kích thước': handler [data-add] chỉ chặn oosState, còn size rỗng thì vẫn đi tiếp, #cartConfirm hiện variant thiếu size (pdp6 thì variant trống hoàn toàn vì cũng không có màu). Trong khi đó cùng sản phẩm ở PLP lại bị ép mở #sizeSheet trước (SIZE_SHEET_BY_PRODUCT, dòng 5995-6000) — hai đường vào cùng 1 SP hành xử ngược nhau. Đây là thao tác đầu tiên khách demo hay bấm nên rất dễ lộ. Fix gợi ý: nếu size-trigger-label còn text-muted-foreground thì mở __openSizeSheet thay vì add.

*Evidence:* Dòng 4590-4602: `if (btn.dataset.oosState) return;` là guard duy nhất; `const size = sizeChip ? ... : (sizeLbl && !sizeLbl.classList.contains('text-muted-foreground') ? ... : '')` — size='' vẫn add và mở __openCartConfirm (4604)

### [medium][inconsistency][confirmed] Picker gộp mất tầng 1 của luồng hết hàng: size 43 ở pdp5/pdp6 cũng thành 'Nhận thông báo'

Trên chip (pdp/pdp4) size 43 và 44 là 2 trạng thái khác nhau theo OOS_MODE ('43':'oos' → CTA 'Tạm hết hàng' disable hẳn; '44':'notify'). Nhưng SIZE_SHEET_OPTIONS cho pdp5/pdp6 chỉ map `oos: DISABLED.includes(s)` — mất thông tin mode, nên trong picker MỌI size hết hàng (kể cả 43) đều hiện 'Nhận thông báo' và CTA thành 'Nhận thông báo khi có hàng'. Cùng 1 size 43, chip bảo 'hết hẳn không làm gì được', dropdown lại mời đăng ký báo hàng — luồng '2 tầng' README nói áp cho cả 2 kiểu thực tế chỉ tồn tại ở chip. Ngoài ra pdp2/pdp3 không có option oos nào nên 2 màn đó không demo được luồng hết hàng.

*Evidence:* Dòng 517 `OOS_MODE = { '43': 'oos', '44': 'notify' }` vs dòng 526-527 `oos: DISABLED.includes(s)`; dòng 6037 `o.oos ? 'Nhận thông báo' : ...` và 6065-6067 CTA oos luôn = mode notify

### [medium][dead-end][confirmed] Link 'Bảng kích thước' ở cả 6 PDP chỉ là toast demo stub, trong khi picker có sheet thật

Cả 6 PDP đều có nút 'Bảng kích thước' cạnh nhãn Kích thước nhưng tất cả là `data-toast="Mở bảng kích thước"` — bấm chỉ hiện toast, không có nội dung (demo stub). Trong khi đó nút #szGuide cùng nhãn trong #sizeSheet lại mở #infoSheet với hướng dẫn đo size thật (6096-6098). Nội dung có sẵn, chỉ cần trỏ 6 nút PDP vào __openInfoSheet như szGuide là hết dead-end và đồng nhất hành vi.

*Evidence:* Dòng 1221/1488/1620/1738/2212/2341: `<button data-toast="Mở bảng kích thước">Bảng kích thước</button>` vs dòng 6096-6098: `#szGuide → window.__openInfoSheet('Bảng kích thước', 'Đo vòng chân/vòng tay...')`

### [medium][inconsistency][confirmed][KNOWN] Pre-order pdp v1: ngày giao hardcode 15/08/2026 + 'Chỉ còn 01 sản phẩm' mâu thuẫn

CTA 'Đặt trước · Dự kiến giao hàng vào ngày 15/08/2026' hardcode (nay 07/08/2026 — chỉ còn 8 ngày nữa là sai), đồng thời khối size vẫn hiện '#lowStock Chỉ còn 01 sản phẩm' — hàng pre-order mà lại báo tồn kho sắp hết là mâu thuẫn logic. README đã ghi nhận cả 2 ý này ở mục 'Vấn đề tồn đọng'.

*Evidence:* Dòng 1239-1240: `<span>Đặt trước</span><span>Dự kiến giao hàng vào ngày 15/08/2026</span>`; dòng 1230-1232: `<p id="lowStock" ...>Chỉ còn 01 sản phẩm</p>`

### [medium][inconsistency][confirmed] Bấm 'Đặt trước' nhưng sheet xác nhận lại nói 'Đã thêm vào giỏ hàng', không còn dấu vết pre-order

pdp v1 dùng chung handler [data-add] với 5 bản kia nên sau khi bấm 'Đặt trước', #cartConfirm mở với tiêu đề cố định 'Đã thêm vào giỏ hàng', không nhắc pre-order/ngày giao dự kiến; xuôi dòng (cart/checkout) cũng không phân biệt hàng đặt trước với hàng thường. Khách demo sẽ thấy 'Đặt trước' và 'Thêm vào giỏ' cho ra cùng một kết quả y hệt.

*Evidence:* Dòng 1238 `data-add="pdp"` trên nút Đặt trước → handler chung 4604 mở __openCartConfirm; tiêu đề sheet cố định dòng 5924: 'Đã thêm vào giỏ hàng'

### [medium][inconsistency][confirmed][KNOWN] Chương trình TUMI (sai thương hiệu) còn ở pdp3/pdp5/pdp6, không chỉ pdp4 như README ghi

README nói đã bỏ TUMI khỏi catalogue PROMOS 'vì sai thương hiệu trên trang Versace' và chỉ ghi chú PDP4 còn khối bullet cũ. Thực tế mảng promos hardcode kèm dòng 'TUMI - [08/07 - 06/09] Quà tặng Sổ tay da...' còn ở CẢ pdp3 (trong tab 'Ưu đãi khuyến mãi' mở sẵn mặc định — đập vào mắt ngay), pdp4, pdp5 và pdp6. Kèm theo: các mốc thời gian '[16/07 - 02/08]' (buymore) và 'Từ 20/07 đến 31/07' (voucher JUL ở pdp) đều đã QUA HẠN so với ngày demo 07/08/2026.

*Evidence:* Dòng 1556 (pdp3), 1675 (pdp4), 2145 (pdp5), 2287 (pdp6): `['TUMI',' - [08/07 - 06/09] Quà tặng Sổ tay da...']`; pdp3 dòng 1639 accordion 'Ưu đãi khuyến mãi' có class ' open' mặc định

### [medium][i18n][confirmed] Nhãn CTA đổi lúc runtime (hết hàng / picker) không được dịch khi đang ở EN

setCta gán thẳng `mainBtn.innerHTML = LABEL[state]` ('Tạm hết hàng' / 'Nhận thông báo khi có hàng' / 'Đã đăng ký nhận thông báo') và updateCta của #sizeSheet gán `cta.textContent = 'Thêm vào giỏ hàng' | 'Nhận thông báo khi có hàng'` — đều không qua localizeNew/tr, trong khi các chuỗi này CÓ trong I18N. Hệ quả: đang xem bản EN, bấm size 43/44 trên pdp/pdp4 hoặc chọn size trong picker pdp5/pdp6 thì nút chính nhảy về tiếng Việt giữa trang tiếng Anh (renderList của picker thì có gọi localizeNew(list) nên các HÀNG vẫn được dịch — càng lộ lệch).

*Evidence:* Dòng 4784-4788: `mainBtn.innerHTML = LABEL[state]` không localizeNew; dòng 6059/6066/6069: `cta.textContent = 'Thêm vào giỏ hàng' / 'Nhận thông báo khi có hàng'`; đối chiếu 6051 renderList có `localizeNew(list)`

### [medium][inconsistency][confirmed][KNOWN] PRODUCT_INFO có features/sku/specs nhưng 5/6 PDP không render (chỉ pdp2 có bảng specs)

Data thật từ DAFC gồm features (bullet), sku và specs đủ cho cả 6 SP nhưng markup chỉ pdp2 dựng bảng specs trong accordion 'Mô tả sản phẩm'; pdp/pdp3/pdp4/pdp5/pdp6 có data mà không hiển thị, sku không xuất hiện ở đâu. Cùng 1 loại nội dung, khách demo mở pdp2 thấy bảng thông số còn 5 màn kia thì không — dễ bị hỏi 'sao thiếu'. README đã ghi nhận ở mục 'Mô tả sản phẩm'.

*Evidence:* Dòng 396-399 (comment data): 'features... và sku... markup 6 PDP hiện chưa có chỗ hiển thị... Chỉ pdp2 đang render bảng specs'; pdp2 render specs dòng 1517-1521

### [low][missing-flow][confirmed] Không có wishlist/heart, share hay breadcrumb ở bất kỳ PDP nào

Cả 6 PDP dùng navBar() chung (burger/search/logo/user/cart) — không nút back, không heart/wishlist, không share, không breadcrumb (PLP có breadcrumb, PDP thì không). Grep toàn file không có icon heart/share nào nên đây là thiếu cấp app, nhưng PDP là chỗ chuẩn e-commerce luxury hay đặt wishlist/share nhất; comment mô tả Figma của pdp6 (dòng 2278) còn nhắc 'nút back "Quay lại"' mà code không dựng.

*Evidence:* navBar() dòng 644-671 chỉ có burger/search/logo/user/cart; grep 'heart|wishlist|share|fav' không có kết quả trong markup PDP

### [low][bug][adjusted] Dots gallery pdp5/pdp6 bị đổi style sau lần swipe đầu tiên

pdp5/pdp6 render dash `rounded-xs` + active `bg-foreground` (kiểu Slick dash theo Figma), nhưng handler scroll của gallery ghi đè toàn bộ className thành `rounded-full ... bg-primary` — swipe 1 cái là dash r2 biến thành viên nang bo tròn hẳn, lệch spec đã chú thích ngay trong markup. Handler dùng chung 1 chuỗi class cho cả 6 PDP nên không tôn trọng biến thể.

*Evidence:* Dòng 2172/2314: `rounded-xs ... bg-foreground` vs dòng 4839-4841: `d.className = \`h-1 rounded-full ... ${j===i ? 'w-6 bg-primary' : 'w-4 bg-border-3'}\``

*Dieu chinh sau phan bien:* Override class là có thật (2172/2314 render 'rounded-xs ... bg-foreground', handler 4839-4841 ghi đè thành 'rounded-full ... bg-primary') NHƯNG kết quả hiển thị KHÔNG đổi: tokens.css có --general-primary = --general-foreground = #0a0a0a (cùng màu), và rounded-full (9999px) trên dash h-1 = 4px bị CSS clamp về đúng 2px = rounded-xs (--radius-2: 2px). Dash 24×4 bo 9999px và bo 2px render giống hệt nhau; class inactive (w-4 bg-border-3) hai bên trùng nhau sẵn. Không có chuyện 'dash biến thành viên nang bo tròn hẳn' — chỉ là inconsistency tiềm ẩn ở mức code (sẽ lộ nếu token đổi), không phải bug nhìn thấy được.

### [low][bug][confirmed] Badge gallery pdp4 ghi 'Lavancaza' — sai chính tả so với 'La Vacanza' ở pdp/pdp2

Cùng 1 badge chiến dịch nhưng pdp (1182) và pdp2 (1447) ghi 'La Vacanza' còn pdp4 ghi 'Lavancaza' (dính chữ + đảo ký tự). Typo này còn lặp ở pillBadges của PLP (875/944/3790) nên sửa thì nên sửa cả cụm. Tên campaign thật của Versace là 'La Vacanza'.

*Evidence:* Dòng 1699: `>Lavancaza</span>` vs dòng 1182/1447: `>La Vacanza</span>`

### [low][missing-edge-case][confirmed] #notifySheet chỉ check bỏ trống, không validate format email/SĐT

Form 'Nhận thông báo khi có hàng' có UI lỗi (#nsErr) nhưng chỉ bắn khi CẢ 2 field rỗng; nhập 'abc' vào ô Email hay '1' vào ô SĐT vẫn qua và toast 'Đã đăng ký'. Với demo UX thì nên có ít nhất 1 nhánh lỗi format để show validation (các form auth khác trong app cũng chỉ mô phỏng, nhưng đây là form duy nhất của cụm PDP có sẵn error UI mà lại chỉ dùng 1 case).

*Evidence:* Dòng 5648-5652: `if (!em && !ph) { err.classList.remove('hidden'); return; }` — không có check format nào khác

## Cart + Quick add

> Luồng chính của cụm giỏ hàng chạy được khá đầy đủ: stepper, xóa item có animation + empty state, DAFC Rewards gate đúng theo đăng nhập, voucher JUNE hợp lệ/sai đều có phản hồi, popup Đặt hàng 3 nhánh đều đi tiếp được, quick add mở đúng bộ ảnh/màu/size và có sheet xác nhận. Tuy nhiên phần "mô phỏng trạng thái" hở nặng ở chỗ tiền và dữ liệu giỏ hoàn toàn tĩnh (thêm/xóa/đổi qty không đổi con số nào), mã giảm giá được quảng cáo ngay trên màn cart lại không dùng được, và một loạt control chết hoặc bind sai (gift picker, Chọn tất cả, thumbnail item).

**Da chay tot (8):**
- Xem giỏ 4 item: stepper qty 1-99, xóa item (animation + toast), xóa hết ra empty state trong #cartList
- DAFC Rewards: radio member/points chỉ hiện khi đăng nhập, đổi lựa chọn cập nhật summary + toast; khách chưa đăng nhập thấy CTA 'Đăng nhập... để nhận 98 điểm'
- Voucher: JUNE500/900/2000 áp thành chip + dòng giảm giá riêng, gỡ được; mã sai có toast 'Mã không hợp lệ'; nút Áp dụng gate theo input rỗng
- Phiếu mua hàng: nhiều mã cộng dồn, chip gỡ từng mã, dòng riêng trong summary
- Đặt hàng: đã đăng nhập đi thẳng checkout; khách mở popup 2858:42899 — cả 3 nhánh chạy (Đăng nhập giả lập 700ms -> ckAuth + checkout; Mua hàng không đăng nhập -> checkout guest; Quên mật khẩu -> màn forgot)
- Quick add từ PLP: gallery đúng PRODUCT_GALLERY, chọn màu/size, Thêm vào giỏ -> đóng sheet -> mở #cartConfirm (Xem giỏ hàng / Tiếp tục mua sắm đều chạy); SP dropdown (pdp2/3/5/6) mở #sizeSheet thay quick add nên không có sheet đè sheet
- Gift picker chỉ render khi ckAuth (gate đúng)
- Sticky CTA Đặt hàng hiện/ẩn theo scroll, dùng chung handler data-checkout

### [high][bug][confirmed] Thêm vào giỏ không thật sự thêm sản phẩm — giỏ luôn là 4 item cứng, badge lệch với màn cart

Quick add / PDP chỉ tăng biến đếm cartQty và badge, không đụng vào mảng CART. Sheet xác nhận báo 'Giỏ hàng hiện có 5 sản phẩm', nhưng bấm 'Xem giỏ hàng' thì header vẫn 'Giỏ hàng (4)' và sản phẩm vừa thêm không có trong danh sách — điểm rất dễ 'bể' khi demo cho khách vì đây là hành vi mô phỏng cốt lõi, không cần backend vẫn làm được (push vào CART rồi re-render).

*Evidence:* Dòng 5802: `cartQty++;` (qaAdd chỉ tăng đếm); dòng 506: `const CART = [` 4 item cứng; dòng 2652 header hardcode `(4)`; dòng 5971: `Giỏ hàng hiện có ${cartQty} sản phẩm`

### [high][bug][confirmed] Toàn bộ số tiền trong cart tĩnh: stepper qty, xóa item, bỏ chọn checkbox đều không đổi Tạm tính/Tổng cộng

CART_SUBTOTAL là hằng 21.250.000; stepper chỉ đổi text số lượng (clamp 1–99, giảm về 0 không xóa item, chạm max không có phản hồi), xóa item chỉ gọi refreshCartCount (không gọi refreshCartSummary), checkbox chọn/bỏ item không được tính vào tổng. User demo bấm + ngay cạnh giá sẽ thấy Tổng cộng đứng im. Qty đổi cũng chỉ ở DOM — rời màn quay lại là về 01.

*Evidence:* Dòng 2418: `const CART_SUBTOTAL = 21250000;`; dòng 4920-4921: `v = Math.max(1, Math.min(99, v)); el.textContent = ...` (không đụng tiền); dòng 4937: `setTimeout(() => { row.remove(); refreshCartCount(root); }, 330)` — không refreshCartSummary

### [high][inconsistency][confirmed] Card 'Chương trình khuyến mãi' quảng cáo mã JUL nhưng ô voucher chỉ nhận JUNE — khách làm theo hướng dẫn sẽ bị 'Mã không hợp lệ'

Card promo nằm ngay trên ô nhập mã dặn 'Nhập mã JUL1500/JUL1000/JUL500', PDP cũng dặn 'Nhập mã JUL500/JUL1000/JUL1500 ở bước thanh toán' (dòng 1356), nhưng map mã hợp lệ chỉ có JUNE500/JUNE900/JUNE2000. Kèm 2 lệch nhỏ cùng card: tiêu đề '(5)' + nút 'Xem tất cả 5 chương trình' nhưng chỉ render 4 mục promoRule (2680-2695); chương trình TUMI vẫn nằm trong cart (2685) dù README đã quyết bỏ TUMI vì sai thương hiệu trên trang Versace (mới chỉ ghi nhận PDP4 còn sót).

*Evidence:* Dòng 2682: 'Nhập mã JUL1500 - giảm 1.5 triệu...' vs dòng 5035: `const map = { JUNE500: 500000, JUNE900: 900000, JUNE2000: 2000000 };`

### [high][missing-edge-case][confirmed] Giỏ rỗng chỉ thay danh sách item — nút Đặt hàng vẫn bấm được, summary vẫn 21.250.000đ, promo/gift/Chọn tất cả còn nguyên

Xóa hết item thì #cartList có empty state ('Giỏ hàng trống' + nút Tiếp tục mua sắm) nhưng phần còn lại của màn không đổi: Tạm tính/Tổng cộng giữ nguyên 21,25tr, cả 2 nút Đặt hàng (inline + sticky) vẫn hoạt động và đưa sang checkout với giỏ rỗng (checkout lại hiện đủ 4 item vì đọc CART hằng), voucher/phiếu mua hàng vẫn áp được. Điều hướng đi rồi quay lại cart là 4 item 'hồi sinh'.

*Evidence:* Dòng 5217-5222: `if (n === 0) { list.innerHTML = ...'Giỏ hàng trống'... }` chỉ đụng #cartList; dòng 4957-4959: handler data-checkout không kiểm tra số item

### [medium][bug][confirmed] Sau khi giỏ rỗng, refreshCartCount gọi wire(root) lần 2 → handler nhân đôi: áp voucher ĐÚNG vẫn toast 'Mã không hợp lệ', nút promo toggle bị liệt

wire(root) chạy lại trên toàn root gắn trùng listener cho mọi element còn lại. Handler applyVoucher không có guard input rỗng: lần chạy 1 áp mã + xóa input, lần chạy 2 đọc chuỗi rỗng → map[''] undefined → toast 'Mã không hợp lệ' đè lên toast thành công (chip vẫn hiện — rất khó hiểu). promoToggle bị toggle 2 lần nên bấm không thấy gì đổi.

*Evidence:* Dòng 5223: `wire(root);` trong refreshCartCount; dòng 5034-5036: `const code = ...; if (!map[code]) { toast('Mã không hợp lệ'); return; }` — không có `if (!code) return`

### [medium][dead-end][confirmed] Gift picker (thành viên): 2 radio chọn quà không có handler — bấm quà thứ 2 không chọn được; nút 'Thay đổi' là demo stub

Nút quà dùng data-opt="gift0/gift1" nhưng khối wiring radio chỉ quét `#shipOpts, #payOpts` (dòng 4742), không có handler nào khác cho #giftOpts (grep toàn file chỉ ra markup 2443). Quà #1 luôn 'on' cứng từ markup. Nút 'Thay đổi' chỉ là data-toast stub. Gate hiển thị theo ckAuth thì đúng (2666).

*Evidence:* Dòng 2445: `data-opt="gift${i}"` vs dòng 4742: `root.querySelectorAll('#shipOpts, #payOpts')`; dòng 2441: `data-toast="Đổi quà tặng"`

### [medium][bug][confirmed] 'Chọn tất cả' không bao giờ bỏ chọn được; 'Xóa sản phẩm đã chọn' chỉ hiện khi CHƯA đăng nhập; xóa item không confirm/undo

Handler #selectAll đọc trạng thái chk của chính nó rồi ép các row theo — nhưng span đó không có data-check và không được toggle ở đâu nên luôn 'on' → chỉ có thể chọn-tất-cả, không thể bỏ-chọn-tất-cả. Nút xóa-đã-chọn bị gate ngược (thành viên đăng nhập mất tính năng, label '( 4 sản phẩm )' hardcode không đổi khi xóa bớt). Xóa item (lẻ hoặc hàng loạt) thực thi ngay, không confirm/undo — với hàng 45tr/món dễ thao tác nhầm khi demo.

*Evidence:* Dòng 4945-4946: `const on = selAll.querySelector('.chk').classList.contains('on'); ...toggle('on', on)` — không toggle chính nó; dòng 2660: `${ckAuth ? '' : '<button id="delSelected"...'}`

### [medium][missing-edge-case][confirmed] Phiếu mua hàng: mọi chuỗi nhập vào đều thành mã hợp lệ được giảm 50k–1tr, không có nhánh mã sai, cộng dồn vô hạn về 0đ

pbhAmount hash chuỗi ra số tiền nên gõ 'abc' cũng được giảm; handler áp mã không có case từ chối (trái ngược voucher có 'Mã không hợp lệ'). Không giới hạn số mã nên stack đủ mã đưa Tổng cộng về 0đ (Math.max clamp). Là demo stub cố ý (comment 2509) nhưng thiếu hẳn trạng thái lỗi để demo validation, và lệch quy ước với ô voucher ngay phía trên.

*Evidence:* Dòng 2513-2516: `function pbhAmount(code){...return 50000 + (h % 20) * 50000;}`; dòng 4999-5009: apply đẩy thẳng `cartPbh.push({ code: v, ... })` không kiểm tra

### [medium][bug][confirmed] Bấm ảnh bất kỳ item nào trong giỏ đều mở PDP SP#1 (đầm lụa) — cả 4 row hardcode data-product="7"

Cả 4 thumbnail cart (túi Lou, loafer Manu, thắt lưng Medusa, khăn lụa) đều gắn data-product="7", mà wireProductCards map mọi giá trị ngoài 1-5 về route 'pdp' → user bấm ảnh 'Giày loafer da Manu' (vốn có pdp5 riêng) lại ra trang đầm lụa Broken Jewels. Cùng gốc: 'Xem chi tiết' trong quick add của SP idx>5 (Vivian, Lou, Rivière, belt, hàng beauty) cũng fallback về 'pdp' sai sản phẩm.

*Evidence:* Dòng 2614: `data-product="7"` (lặp cho mọi row); dòng 3744 + 5817: mapping `... : 'pdp'` fallback

### [medium][missing-edge-case][confirmed] Popup đăng nhập từ nút Đặt hàng: không validate gì — SĐT/mật khẩu bỏ trống vẫn 'Đăng nhập thành công'

Cả 3 nhánh của popup đều chạy được (Đăng nhập giả lập 700ms → ckAuth + checkout; Mua hàng không đăng nhập → checkout guest; Quên mật khẩu → màn forgot) nhưng nhánh Đăng nhập không kiểm tra field rỗng/không có UI báo lỗi — bấm nút với form trống vẫn spinner rồi vào checkout như đã đăng nhập. Không demo được trạng thái sai mật khẩu/thiếu thông tin.

*Evidence:* Dòng 5892-5902: handler #lpLogin đọc thẳng `ckAuth = true; ckStep = 1; ... go('checkout')` sau setTimeout 700ms, không đọc giá trị #lpPhone/#lpPass

### [medium][inconsistency][confirmed] Quick add tự chọn sẵn size đầu tiên (không tồn tại trạng thái 'chưa chọn size'), và sản phẩm không có size bị gán size giày 39–44

Chip đầu tiên auto 'on' nên bấm 'Thêm vào giỏ hàng' ngay lập tức là thêm size 39 mà user không hề chọn — lệch với #sizeSheet (CTA disabled opacity .4 cho tới khi chọn, dòng 6018) của cùng flow PLP. Nặng hơn: hàng beauty không có `sizes` (Nến thơm, Set quà tặng dòng 368-369) fallback về SIZES giày → quick add hiện 'Kích thước' 39–44 với 43/44 gạch hết hàng cho... cây nến.

*Evidence:* Dòng 5750: `${(si === 0 && !off) ? 'on border-primary' : ...}`; dòng 5748: `${(p.sizes || SIZES).map(...)}`

### [low][i18n][confirmed] Empty state giỏ hàng và toàn bộ toast của cụm cart không có trong I18N — bật EN vẫn hiện tiếng Việt

'Giỏ hàng trống' / 'Hãy khám phá bộ sưu tập mới nhất.' không có entry trong từ điển và refreshCartCount cũng không gọi localizeNew sau khi innerHTML. Các toast: 'Đã xóa sản phẩm', 'Mã không hợp lệ', 'Áp dụng mã X', 'Đã thêm X', 'Đã gỡ X', 'Đã gỡ mã giảm giá', 'Đã áp dụng: Điểm thưởng' — toast() có gọi tr() nhưng dict/regex không có các key này nên giữ nguyên VI. 'Chọn tất cả ( 4 sản phẩm )' cũng thiếu (chỉ có 'Chọn tất cả'). Ngược lại 'Giỏ hàng hiện có N sản phẩm' đã có regex (4206) — lệch độ phủ ngay trong cùng cụm.

*Evidence:* Dòng 5220-5221 chuỗi empty state (grep I18N không có entry); dòng 4938/5036/5043: toast VI thuần; dòng 5273: toast chỉ dịch được khi `tr()` tìm thấy key

## Auth (login / register OTP / forgot)

> Cụm auth chạy thông suốt cả 3 luồng (login, register OTP-first, forgot password): điều hướng back đúng từng bước, "thay đổi số điện thoại" giữ số đã nhập, đếm ngược 60s xong bấm gửi lại được, đăng nhập/đăng ký xong quay đúng màn gọi (loginFrom), guest checkout từ popup giỏ vào thẳng checkout. Điểm yếu tập trung ở chỗ gần như KHÔNG có trạng thái lỗi mô phỏng: login (cả màn full lẫn popup) bấm với field trống vẫn thành công, OTP nhập mã nào cũng qua, reginfo/setpass không validate gì; ngoài ra icon user trên navbar vẫn dẫn về màn Đăng nhập kể cả khi đã đăng nhập.

**Da chay tot (9):**
- Login full-screen: SĐT + mật khẩu -> spinner 700ms -> quay về màn gọi (loginFrom) hoặc checkout, toast phân ngữ cảnh (dòng 4576-4584)
- Register OTP-first: nhập SĐT -> 'Gửi mã OTP' (check rỗng, toast 'Vui lòng nhập số điện thoại') -> OTP 6 ô tự nhảy ô kế + Backspace lùi ô -> reginfo -> 'TẠO TÀI KHOẢN' -> ckAuth=true, về màn gọi + toast 'Đăng ký thành công'
- Forgot: login/'Quên mật khẩu?' hoặc popup giỏ -> nhập SĐT -> OTP (chung màn, phân nhánh authFlow) -> setpass có thanh độ mạnh mật khẩu live -> 'CẬP NHẬT MẬT KHẨU' -> đăng nhập luôn, về màn gọi
- Nút 'Nhận lại mã (60s)': đếm ngược chạy đúng, hết 60s enable lại, bấm -> toast 'Đã gửi lại mã OTP' + restart đếm ngược (4526-4540)
- 'thay đổi số điện thoại' từ OTP quay về đúng màn của luồng (register/forgot) và GIỮ số đã nhập (input value=authPhone, dòng 2807/2823)
- Back chain đúng: otp->màn nhập SĐT của luồng, reginfo->register, setpass->otp, login->màn gọi (4483-4490); vào login từ ngoài luôn reset về view login trừ khi có authViewIntent (4290)
- Guest checkout: popup giỏ 'Mua hàng không đăng nhập' -> go('checkout') (5905), checkout hiện đúng notice 'Bạn đang thanh toán không đăng nhập' + nút Đăng nhập (2970-2972)
- Popup login từ giỏ: Đăng nhập nhanh -> ckAuth + sang checkout; 'Quên mật khẩu?' -> đóng popup, mở màn forgot (5892-5910)
- i18n: phần lớn chuỗi auth có trong I18N, kể cả mảnh text tách node 'Nhận lại mã (' (3929-3960)

### [high][missing-edge-case][confirmed] Đăng nhập không validate gì, không có trạng thái sai mật khẩu — cả màn full lẫn popup giỏ

Handler data-login-submit không hề đọc input: bỏ trống cả SĐT lẫn mật khẩu, hoặc gõ mật khẩu bất kỳ, bấm 'Đăng nhập' vẫn spinner rồi 'Đăng nhập thành công'. Ô mật khẩu ở viewLogin thậm chí không có id để đọc (dòng 2786). Popup #lpLogin từ giỏ cũng vậy: #lpPhone/#lpPass được dựng (5853, 5858) nhưng handler 5892-5903 không đọc, không check. Không có bất kỳ UI báo lỗi 'sai mật khẩu' / 'vui lòng nhập...' nào để demo — trong khi luồng OTP cùng cụm CÓ check rỗng, nên đây là lỗ hổng dễ bể mặt nhất khi khách thử bấm login tay không.

*Evidence:* Dòng 4576-4578: `root.querySelectorAll('[data-login-submit]').forEach(btn => { btn.addEventListener('click', () => { ckAuth = true; ckStep = 1;` — set luôn ckAuth, không đọc field nào; dòng 5892-5898 (#lpLogin) tương tự.

### [high][bug][confirmed] Đã đăng nhập rồi nhưng icon user trên navbar vẫn dẫn về màn Đăng nhập

Icon user trong navBar() hardcode data-nav="login" (dòng 666) và handler [data-nav] (4438-4453) go thẳng không phân nhánh theo ckAuth. Sau khi đăng nhập thành công, bấm icon tài khoản trên header lại ra form 'Đăng nhập' trắng — muốn vào Account phải mở menu drawer (nơi loginRow() ĐÃ phân nhánh đúng ckAuth ? 'Tài khoản' : 'Đăng ký / đăng nhập', dòng 5427-5429). Lệch ngay giữa 2 lối vào cùng chức năng, và là bước rất tự nhiên khi demo (login xong bấm icon user xem tài khoản).

*Evidence:* Dòng 666: `${ico(I.user, 'data-nav="login"')}` vs dòng 5427-5428: `const loginRow = () => ckAuth ? utilRow(I.user, 'Tài khoản', 'data-nav="account"')`

### [medium][missing-edge-case][confirmed] OTP nhập SAI mã không có trạng thái lỗi — mã 6 số nào cũng pass

data-auth-verify chỉ check độ dài: thiếu số thì toast 'Vui lòng nhập đủ 6 số' (có xử lý), nhưng đủ 6 số thì mã nào cũng đi tiếp sang reginfo/setpass. Không có mã demo 'đúng' và trạng thái ô OTP viền đỏ / thông báo 'Mã không đúng' để trình diễn nhánh lỗi — trong khi Figma auth flow thường có state error cho OTP.

*Evidence:* Dòng 4559-4562: `const code = otpCells.map(c => c.value).join(''); if (code.length < 6) { toast('Vui lòng nhập đủ 6 số'); return; } ... setTimeout(() => { authView = authFlow === 'register' ? 'reginfo' : 'setpass'; ... })` — không so mã.

### [medium][missing-edge-case][confirmed] reginfo (Hoàn tất đăng ký) không validate field nào

data-reg-done không đọc bất kỳ input nào: Họ tên trống, mật khẩu trống, 'Xác nhận mật khẩu' không khớp, email sai định dạng — bấm 'TẠO TÀI KHOẢN' đều thành công. Checkbox 'Tôi đồng ý với Điều khoản...' mặc định checked nhưng bỏ tick vẫn tạo được tài khoản. Cũng không có thang đo độ mạnh mật khẩu ở đây dù đây mới là chỗ user TẠO mật khẩu lần đầu (thanh độ mạnh chỉ có ở setpass — lệch nội bộ cụm).

*Evidence:* Dòng 4567-4569: `root.querySelectorAll('[data-reg-done]').forEach(btn => { btn.addEventListener('click', () => { ckAuth = true; ckStep = 1;` — không querySelector input nào; form ở 2860-2868.

### [medium][missing-edge-case][confirmed] setpass không validate mật khẩu mới + toast sai ngữ cảnh 'Đã đăng nhập · UserOne'

Màn 'Đặt mật khẩu mới' ghi rõ yêu cầu 'ít nhất 8 ký tự, gồm chữ hoa, chữ thường và số' (2879) nhưng nút 'CẬP NHẬT MẬT KHẨU' tái dùng handler data-login-submit nên: mật khẩu trống / yếu / 2 ô không khớp đều qua; và toast kết thúc là 'Đã đăng nhập · UserOne' (hoặc 'Đăng nhập thành công' nếu về checkout) chứ không có thông báo kiểu 'Đặt lại mật khẩu thành công'. Thanh độ mạnh chỉ là hiển thị, không chặn. Ngoài ra state khởi tạo của bar là w-2/5 + hint 'Trung bình...' dù ô mật khẩu còn trống (2887-2889).

*Evidence:* Dòng 2891: `${abtn('CẬP NHẬT MẬT KHẨU', 'data-login-submit')}` dùng chung handler 4576-4584 với toast `back === 'checkout' ? 'Đăng nhập thành công' : 'Đã đăng nhập · UserOne'`.

### [low][missing-edge-case][confirmed] SĐT gửi OTP chỉ check khác rỗng, không check định dạng

Ở register/forgot, nhập chuỗi bất kỳ (vd 'abc') vẫn gửi OTP được, và màn OTP hiển thị nguyên văn 'Mã xác thực đã được gửi đến abc' (authPhone render bold, dòng 2835). Nên có validate tối thiểu dạng số/độ dài để nhánh lỗi demo được.

*Evidence:* Dòng 4502-4503: `authPhone = inp && inp.value.trim() ? inp.value.trim() : ''; if (!authPhone) { toast('Vui lòng nhập số điện thoại'); ... }` — chỉ check rỗng.

### [low][inconsistency][confirmed] Nút 'Nhận lại mã (60s)' khi disabled không có style mờ như quy ước app

Trong 60 giây đếm ngược, #otpResend có attribute disabled nhưng không đổi opacity/pointer — nhìn y hệt nút bấm được, tap vào im lặng không phản hồi. Các nút disabled khác trong app đều mờ .4 (#applyVoucher dòng 2569, #szAdd dòng 6018 có style="opacity:.4"). Chức năng đếm ngược và bấm lại sau 60s thì hoạt động đúng.

*Evidence:* Dòng 2841: `<button id="otpResend" class="w-full h-10 rounded-xs bg-secondary border border-border ... press" disabled>` — không có opacity, so với 2569 `disabled ... style="opacity:.4"`.

### [low][missing-edge-case][confirmed] Ô OTP không hỗ trợ paste/autofill SMS — dán mã 6 số chỉ vào được 1 ô

Handler input cắt về 1 ký tự (`slice(0, 1)`) nên paste cả mã 6 số chỉ giữ số đầu; các input cũng thiếu autocomplete="one-time-code" nên bàn phím iOS/Android không gợi ý mã từ SMS. Demo trên điện thoại thật sẽ phải gõ tay từng số.

*Evidence:* Dòng 4520-4522: `c.addEventListener('input', () => { c.value = c.value.replace(/[^0-9]/g, '').slice(0, 1); ... })`; markup ô OTP 2837 không có autocomplete.

### [low][dead-end][confirmed] 'Điều khoản sử dụng' / 'Chính sách bảo mật' ở reginfo là demo stub dù app đã có trang thật

2 nút này chỉ chạy data-toast (hiện toast tên nút — demo stub, không chết hẳn) trong khi app ĐÃ có route terms/privacy thật (screenPOLICY, FOOTER_ROUTES). Lưu ý nếu đổi sang data-nav thì điều hướng đi sẽ mất state form reginfo do router re-render toàn bộ — cần cân nhắc mở bằng sheet/tab thay vì go().

*Evidence:* Dòng 2867: `<button data-toast="Điều khoản sử dụng" ...>Điều khoản sử dụng</button> và <button data-toast="Chính sách bảo mật" ...>` — trong khi FLOW dòng 537 đã có 'privacy','terms'.

### [low][i18n][confirmed] Gợi ý độ mạnh mật khẩu không được dịch khi gõ ở bản EN

3/4 chuỗi hint ('Yếu - Cần ít nhất 8 ký tự', 'Khá - Thêm ký tự đặc biệt để mạnh hơn', 'Mạnh - Mật khẩu tốt') không có trong I18N (chỉ 'Trung bình...' có, dòng 3949), và handler set thẳng bằng textContent không qua localizeNew — nên ở ngôn ngữ EN, vừa gõ vào ô mật khẩu là hint nhảy về tiếng Việt (kể cả chuỗi 'Trung bình' đã có bản dịch).

*Evidence:* Dòng 4552: `pwHint.textContent = sc <= 1 ? 'Yếu - Cần ít nhất 8 ký tự' : ...` — không gọi localizeNew(pwHint) và 3 chuỗi không có entry I18N.

### [low][bug][confirmed] Popup đăng nhập từ giỏ giữ nguyên SĐT/mật khẩu đã gõ giữa các lần mở, kể cả sau logout

#loginPop là DOM tĩnh append 1 lần vào body; openLP/closeLP chỉ toggle class, không reset #lpPhone/#lpPass. Gõ dở rồi đóng, hoặc đăng nhập xong đăng xuất, mở lại popup vẫn thấy mật khẩu cũ nằm trong ô. State leak nhỏ nhưng nhìn thấy được khi demo lặp lại flow.

*Evidence:* Dòng 5874-5880 (openLP) và 5881-5887 (closeLP) chỉ thao tác class/aria, không có dòng nào gán `.value = ''` cho #lpPhone (5853) / #lpPass (5858).

### [low][missing-flow][confirmed] Không có social login (Google/Facebook/Apple) ở bất kỳ view auth nào

viewLogin chỉ có SĐT + mật khẩu + link đăng ký/quên mật khẩu; grep toàn file không có nút Google/Facebook/Apple trong cụm auth (chỉ có icon fb/ig/zalo trang trí ở footer). Không phải nút chết vì không tồn tại — nhưng nếu kịch bản pitch có nhắc social login thì đang thiếu hẳn nhánh này (kể cả dạng stub).

*Evidence:* Dòng 2776-2795 (viewLogin) không có block social; grep 'Google|Facebook|Apple' chỉ ra fonts.googleapis (dòng 9-11) và social footer (771).

## Checkout + Done

> Luồng checkout 3 section tự đóng/mở và màn done chạy mượt về mặt trình diễn: cart → login popup (đăng nhập/khách) → checkout → done đều thông, VAT toggle và đổi tab field hoạt động, browser back được wire qua popstate. Tuy nhiên toàn bộ dữ liệu là trang trí: không có bất kỳ validation nào (đặt hàng được với form trống), tóm tắt địa chỉ và tổng tiền hardcode nên bỏ qua mọi thứ user nhập và mọi voucher/reward đã áp ở cart, kèm một cụm lỗi chính tả/i18n dễ lộ khi demo (Thay doi, Chuyển khoảng, Giao hang nhanh).

**Da chay tot (9):**
- Cart → Đặt hàng: khách mở popup đăng nhập nhanh (đăng nhập / quên mật khẩu / 'Mua hàng không đăng nhập'), member đi thẳng checkout (dòng 4957-4960, 5892-5910)
- Checkout 1 trang 3 section tự đóng/mở: xong section thu thành tóm tắt + nút 'Thay doi' mở lại, section kế tự mở + auto scroll (ckSection 2949, paintCheckout 3118, wire 4615-4634)
- Chọn phương thức vận chuyển 2 lựa chọn radio, cập nhật nhãn tóm tắt #shipDoneLabel (3000-3010, 4665-4670)
- Chọn 4 phương thức thanh toán bằng rich radio (cc/qr/atm/trả góp 0%) (3013-3026, 4742-4759)
- Xuất hóa đơn VAT: toggle hiện/ẩn field + tab Cá nhân/Công ty đổi bộ field (Công ty thêm Mã số thuế) (3028-3046, 4636-4662)
- Đăng nhập từ notice trong checkout → quay lại đúng checkout ở step 1 với thông báo member (2968-2972, 4576-4584)
- Đặt hàng → màn done: confetti, tick animation, bảng tóm tắt đơn, khối 98 điểm thưởng (3056, 3133-3170)
- Done → 'Tiếp tục mua sắm' reset demo (cart 4, history rỗng) về PLP; back vật lý hoạt động qua popstate/pushState (3165, 4320-4324)
- Mini-cart 'Giỏ hàng của bạn' đầu trang checkout dạng accordion xổ 4 item + tạm tính (3068-3100)

### [high][missing-edge-case][confirmed] Không có validation nào: đặt hàng thành công với toàn bộ form trống

Nút 'Xác nhận' của section địa chỉ và vận chuyển chỉ set ckStep = data-next rồi vẽ lại, không kiểm tra field nào; nút 'Đặt hàng' là data-nav='done' đi thẳng sang màn done. Khách vãng lai bỏ trống Tên/Họ/SĐT/Địa chỉ vẫn hoàn tất đơn, không có UI báo lỗi (khác hẳn OTP đã có check 'Vui lòng nhập đủ 6 số' ở dòng 4560 — tức pattern báo lỗi đã tồn tại trong app mà checkout không dùng).

*Evidence:* Dòng 4622-4624: btn.addEventListener('click', () => { ckStep = +btn.dataset.next; paintCheckout(root); ... }) — không đọc input nào; dòng 3056: <button data-nav="done" ...>Đặt hàng</button>

### [high][bug][confirmed] Tóm tắt 'Thông tin giao hàng' hardcode — nhập gì cũng hiện 'User name - 0 1234 5678'

Sau khi bấm Xác nhận, section 0 thu gọn thành s0done là chuỗi tĩnh 'User name - 0 1234 5678' + '123 Nam Kỳ Khởi Nghĩa, Phường 1, TP.HCM', hoàn toàn bỏ qua dữ liệu user vừa gõ. Khi demo, khách gõ tên thật của họ rồi thấy 'User name' là bể ngay. Section vận chuyển cùng pattern nhưng ít nhất có cập nhật nhãn.

*Evidence:* Dòng 2991-2995: s0done = `...<p ...>User name - 0 1234 5678</p><p ...>123 Nam Kỳ Khởi Nghĩa, Phường 1, Thành phố Hồ Chí Minh</p>`

### [high][inconsistency][confirmed] Checkout/Done không đồng bộ giỏ hàng: mất voucher/reward/phiếu mua hàng, phí ship nhanh không cộng, item list tĩnh

Cart tính tổng động (CART_SUBTOTAL − reward − voucher − pbh, dòng 2604-2606) nhưng checkout hardcode '21,250,000đ' ở 3 chỗ (mini-cart 3073, Tạm tính 3048, Tổng cộng 3052) và done hardcode tiếp (3134). Áp mã JUNE2000 ở cart xong sang checkout tổng vẫn 21,250,000đ. Chọn 'Giao hang nhanh - 25,000đ' thì dòng Giao hàng vẫn 'Free', tổng không đổi, done vẫn ghi 'Vận chuyển: Miễn phí'. Tiêu đề 'Thanh toán (4)' và list item trong 'Giỏ hàng của bạn' render từ hằng CART nên xóa bớt/đổi số lượng/xóa sạch giỏ (empty state) xong vẫn checkout được đúng 4 món cũ.

*Evidence:* Dòng 3048-3052: ${row('Tạm tính','21,250,000đ')} ${row('Giao hàng','Free')} ... 21,250,000đ; dòng 5205 (cart): Math.max(0, CART_SUBTOTAL - reward - cartVoucherDiscount - cartPbhTotal())

### [medium][missing-flow][confirmed] Tỉnh/Thành phố và Phường xã là input text stub, không có picker

Hai field dùng chung helper field() = <input> thường với placeholder 'Chọn tỉnh / thành phố' / 'Chọn phường / xã' — placeholder hứa hẹn dropdown nhưng bấm vào chỉ gõ chữ tự do, không có select/bottom sheet danh sách nào (app đã có sẵn pattern size picker có thể tái dùng). Ghi chú: form chỉ có Tỉnh + Phường (không Quận/Huyện) là ĐÚNG mô hình địa giới 2 cấp sau 7/2025, không phải thiếu field.

*Evidence:* Dòng 2979-2980: ${field('Tỉnh , thành phố','Chọn tỉnh / thành phố')} ${field('Phường xã','Chọn phường / xã')} — field() dòng 2962-2966 chỉ render <input>

### [medium][bug][confirmed] Tóm tắt vận chuyển sai nhãn: chọn 'Giao hàng thông thường' lại hiện 'Chuyển phát nhanh'

Handler map option 'std' → 'Chuyển phát nhanh' (và default của s1done cũng là 'Chuyển phát nhanh') nên nhãn 'Giao hàng thông thường' không bao giờ xuất hiện trong tóm tắt. Tệ hơn ở bản EN: I18N dịch 'Chuyển phát nhanh' → 'Express delivery' (dòng 3906), tức user chọn 'Standard delivery — Free' mà tóm tắt ghi 'Express delivery'.

*Evidence:* Dòng 4668: lbl.textContent = o.dataset.opt === 'fast' ? 'Giao hang nhanh' : 'Chuyển phát nhanh'; dòng 3008: <p id="shipDoneLabel" ...>Chuyển phát nhanh</p>

### [medium][missing-flow][adjusted] Phương thức thanh toán không có UI chi tiết: chọn thẻ tín dụng/trả góp 0% không hiện gì thêm, handler .pay-detail mồ côi

Chọn 'Thẻ tín dụng/Ghi nợ' không hiện field số thẻ (dù I18N có sẵn key 'Thẻ tín dụng · **** 4829' dòng 3907 gợi ý từng định làm saved card), 'Thanh toán trả góp 0%' không hiện kỳ hạn/ngân hàng, không có COD. Handler radio group tìm phần tử .pay-detail để xổ chi tiết (max-h-40) nhưng markup không có .pay-detail nào trong toàn file — code chết, xác nhận bằng grep chỉ khớp đúng 2 dòng handler.

*Evidence:* Dòng 4749/4755: const d = x.parentElement.querySelector('.pay-detail') — grep '.pay-detail' toàn file chỉ ra 2 dòng này; pays chỉ có 4 entry radio trơn (3013-3018)

*Dieu chinh sau phan bien:* Phần cốt lõi đúng: grep '.pay-detail' toàn file chỉ ra 2 dòng handler 4749/4755, markup không có phần tử .pay-detail nào, pays chỉ 4 radio trơn (3013-3018), không COD, không field thẻ/kỳ hạn. Nhưng chi tiết suy diễn sai: key I18N 'Thẻ tín dụng · **** 4829' (3907) tồn tại để dịch dữ liệu màn Chi tiết đơn hàng (payment ở dòng 1883/1891), không phải dấu vết 'từng định làm saved card' cho checkout.

### [medium][missing-edge-case][confirmed] VAT: đổi tab Cá nhân ↔ Công ty xóa trắng toàn bộ dữ liệu đã nhập

Đổi tab thay innerHTML của #vatFieldRows bằng bộ field mới nên mọi input đã gõ (kể cả field trùng nhau giữa 2 tab như 'Email nhận hóa đơn VAT') mất sạch; lỡ tay bấm 'Công ty' rồi bấm lại 'Cá nhân' là phải gõ lại từ đầu, không có cảnh báo.

*Evidence:* Dòng 4659-4660: const rows = root.querySelector('#vatFieldRows'); if (rows) { rows.innerHTML = vatFieldRows(vatType); ... }

### [medium][bug][confirmed] State leak ckStep: khách chưa từng nhập địa chỉ vẫn thấy section địa chỉ 'đã xác nhận'

ckStep là biến module chỉ reset ở data-reset/data-auth. Logout (dòng 4477) set ckAuth=false nhưng KHÔNG reset ckStep; nút 'Mua hàng không đăng nhập' (5905) cũng không. Kịch bản: đăng nhập từ cart (ckStep=1) → logout ở Account → cart → Đặt hàng → 'Mua hàng không đăng nhập' → checkout mở với section 'Thông tin giao hàng' đã thu gọn hiển thị địa chỉ hardcode của user cũ, khách bấm thẳng được sang thanh toán mà chưa từng điền gì.

*Evidence:* Dòng 4477: ckAuth = false; go('plp') — thiếu ckStep = 0; dòng 5905: lp.querySelector('#lpGuest')... { closeLP(); go('checkout'); }; dòng 3121: state = i < ckStep ? 'done' : ...

### [medium][missing-edge-case][confirmed] Sau khi đặt hàng: back quay lại checkout nguyên trạng (đặt lại được đơn), giỏ không bị xóa, còn 'Tiếp tục mua sắm' thì âm thầm đăng xuất

go('done') có pushState nên back vật lý từ màn done quay về checkout với ckStep=2 nguyên vẹn — bấm 'Đặt hàng' lần nữa ra đơn thứ 2, không có guard/không cảnh báo. Giỏ hàng không bao giờ được làm rỗng sau khi đặt (cartQty giữ 4, CART tĩnh) nên vào lại cart vẫn thấy đủ 4 món 'vừa mua'. Riêng nút 'Tiếp tục mua sắm' mang data-reset set luôn ckAuth=false — user đang đăng nhập hoàn tất đơn xong bị logout ngầm (icon account mở ra màn login, cart mất bản member). Reset toàn cục để lặp demo là hợp lý, nhưng nên tách phần logout khỏi nút này.

*Evidence:* Dòng 4442: if (el.hasAttribute('data-reset')) { cartQty = 4; history = []; ckAuth = false; ckStep = 0; }; dòng 4320-4324: popstate → go(target, { back: true, ... })

### [medium][bug][confirmed] Lỗi chính tả tiếng Việt hiện ngay trên UI checkout: 'Thay doi', 'Giao hang nhanh', 'Chuyển khoảng'

3 chuỗi thiếu dấu/sai chính tả hiển thị trực tiếp ở bản VI: nút 'Thay doi' (đúng: Thay đổi) lặp ở cả 3 section header; option 'Giao hang nhanh - 25,000đ' (đúng: Giao hàng nhanh) và nhãn tóm tắt tương ứng ở 4668; 'Chuyển khoảng/ QR code' (đúng: Chuyển khoản). Demo cho khách Việt đọc là thấy ngay.

*Evidence:* Dòng 2954: >Thay doi</button>; dòng 3001: richRadio('fast','Giao hang nhanh - 25,000đ',...); dòng 3016: ['qr','Chuyển khoảng/ QR code', false]

### [low][dead-end][confirmed] 'Theo dõi đơn hàng' ở màn done chỉ là demo stub toast, dù màn Chi tiết đơn hàng có sẵn

Nút chỉ bắn toast 'Đang mở trang theo dõi' (demo stub — đã grep data-toast, handler chung ở 4612 chỉ toast). Trong khi đó route 'order' + screenORDER (dòng 2012) với timeline theo dõi đơn tồn tại sẵn và Account đang link tới được qua data-order — nút này hoàn toàn có thể trỏ vào đó thay vì cụt.

*Evidence:* Dòng 3166: <button data-toast="Đang mở trang theo dõi" ...>Theo dõi đơn hàng</button>; dòng 4612: [data-toast] → toast(b.dataset.toast)

### [low][i18n][confirmed] Màn done và vài nhãn checkout thiếu key I18N — bật EN vẫn hiện tiếng Việt

Không có trong từ điển I18N: 'Mã đơn hàng', 'Dự kiến giao' (bảng tóm tắt done, dòng 3134), 'Đơn hàng đang được xử lý. Cảm ơn bạn đã tin tưởng mua sắm.' (3149), câu 'Bạn nhận được ... từ đơn hàng này' (3161), 'Đang mở trang theo dõi' (3166), nhãn 'Phường xã' (2980 — chỉ có placeholder 'Chọn phường / xã' được dịch ở 3918), và 'Thay doi' (2954). Các chuỗi checkout còn lại phủ khá đủ ('Thanh toán (4)', field địa chỉ, phương thức ship/pay, VAT đều có key).

*Evidence:* Grep các key trên trong khối I18N (3800-4060) không có kết quả; dòng 3134: [['Mã đơn hàng','#MG-2026-0714'],...,['Dự kiến giao','14 – 18/07']] — mã đơn hàng cũng là chuỗi tĩnh

## Account + Order detail

> Cụm Account + Order detail đi được trọn journey xem: 5 tab đổi tại chỗ, danh sách đơn → chi tiết đơn với timeline/địa chỉ/tổng kết, logout hoạt động và i18n phủ khá đầy đủ. Tuy nhiên mọi hành động ghi (sửa thông tin, CRUD địa chỉ, huỷ/mua lại đơn) đều là toast stub, các trạng thái Empty/Error theo 9 màn Figma gốc chưa có (README đã ghi nhận), và có 2 lỗi mới đáng chú ý nhất: handler đổi tab gọi wire(root) toàn màn làm listener nhân đôi mỗi click (nguy cơ treo khi demo) và icon tài khoản trên navbar luôn dẫn về màn đăng nhập kể cả khi đã đăng nhập; kèm lỗ hổng guard (back sau logout vẫn vào lại account) và một mâu thuẫn dữ liệu badge 'Đang giao' vs timeline dừng ở 'Đã xác nhận'.

**Da chay tot (6):**
- Menu drawer (khi ckAuth) → 'Tài khoản' → screenACCOUNT với 5 tab Thông tin/Đơn hàng/Địa chỉ/Thành viên/Điểm thưởng, đổi tab tại chỗ qua data-atab (không chuyển trang)
- Tab Đơn hàng: 3 đơn tĩnh → nút 'Chi tiết' (data-order, handler dòng 4459) → screenORDER đầy đủ: badge trạng thái, timeline 4 bước, box mã vận đơn (đơn đang giao), địa chỉ, danh sách SP, phương thức, tổng kết, hành động theo trạng thái
- Quay lại từ Order detail (data-nav='account') giữ nguyên tab đang mở vì accountTab là biến module-level
- Đăng xuất: data-logout (dòng 4477) reset ckAuth=false → go('plp') + toast 'Đã đăng xuất'; menu drawer đổi lại thành 'Đăng ký / đăng nhập'
- Thành viên: thẻ hạng Vàng + đặc quyền + progress lên hạng; Điểm thưởng: số dư + lịch sử 4 dòng (+/− điểm có regex i18n riêng)
- i18n phủ khá tốt cụm này: nguyên section '── Trang tài khoản ──' trong I18N (3962-3978) + regex 'Đặt ngày…', 'Đơn hàng #…', '± N điểm' (4199-4219)

### [high][bug][confirmed] Đổi tab Account nhân đôi listener mỗi lần bấm — nguy cơ treo dần khi demo

Handler data-atab thay innerHTML của #accBody rồi gọi wire(root) trên TOÀN màn hình, trong khi các nút tab / nút back / nút Đăng xuất nằm NGOÀI #accBody nên không bị huỷ — mỗi lần wire lại được gắn thêm 1 listener mới. Số listener nhân đôi sau mỗi click (1→2→4→8…): sau ~10 lần đổi tab là hơn 1000 lần render #accBody cho 1 click, demo lag rồi treo; kèm side-effect Đăng xuất bắn toast nhiều lần. Cần wire riêng phần body hoặc chặn re-bind.

*Evidence:* Dòng 4473: `if (body) { body.innerHTML = accountBody(); wire(root); }` — wire(root) quét lại cả `[data-atab]` (4464) và `[data-logout]` (4477) đang tồn tại sẵn

### [high][missing-flow][confirmed] Đã đăng nhập nhưng icon tài khoản trên navbar vẫn dẫn về màn Đăng nhập

Icon user ở header luôn gắn data-nav='login' bất kể ckAuth; handler data-nav không có nhánh nào kiểm tra ckAuth để rẽ sang 'account'. Kịch bản demo: đăng nhập xong, bấm icon tài khoản → bị đưa lại form đăng nhập như chưa từng đăng nhập. Đường duy nhất vào Account là burger menu → 'Tài khoản' (dòng 5428). screenLOGIN cũng không kiểm tra ckAuth để redirect.

*Evidence:* Dòng 666: `${ico(I.user, 'data-nav="login"')}`; handler 4438-4452 gọi thẳng `go(t)` không xét ckAuth

### [medium][missing-edge-case][confirmed] Không có guard auth cho route account: logout xong bấm back trình duyệt quay lại trang Tài khoản

screenACCOUNT render 'UserOne / Hạng Vàng' hardcode, không kiểm tra ckAuth. Sau khi Đăng xuất (về PLP), bấm nút back vật lý/vuốt back → popstate render lại màn 'account' đầy đủ thông tin user dù ckAuth=false. Tương tự sau data-reset ở màn done (4442).

*Evidence:* Popstate 4320-4324: `go(target, { back: true, fromPopstate: true })` không xét ckAuth; screenACCOUNT 1812 không có check nào

### [medium][missing-flow][confirmed][KNOWN] Empty/Error states của 9 màn Figma gốc chưa có — data hardcode nên không thể trigger

Figma có Info-Error / Address-Empty / Orders-Empty / Points-Empty nhưng code không có nhánh empty/error nào: accOrders map hằng ORDERS (luôn 3 đơn), accAddress hardcode 2 địa chỉ, accPoints hardcode 4 dòng lịch sử — 0 item là bất khả thi, cũng không có markup empty dự phòng. Info-Error không thể demo vì không có form (xem gap riêng). Nhân tiện: README/task gọi 'Account 6 tab' nhưng ACCOUNT_TABS (1803-1809) chỉ có 5 tab.

*Evidence:* ORDERS 1875-1903 (const, 3 đơn); accAddress 1933-1941 (2 card tĩnh); accPoints history 1978-1983 (mảng tĩnh) — không nhánh nào render khi rỗng

### [medium][dead-end][confirmed] 'Chỉnh sửa thông tin' là demo stub — không có form sửa, không lưu, không validate

Nút duy nhất của tab Thông tin chỉ bắn toast lặp lại nhãn nút, không mở form/sheet nào. Vì không có form nên trạng thái Info-Error (validate lỗi) trong Figma cũng không có chỗ để dựng. 5 field (họ tên, SĐT, email, giới tính, ngày sinh) là text tĩnh.

*Evidence:* Dòng 1870: `<button data-toast="Chỉnh sửa thông tin" …>Chỉnh sửa thông tin</button>` — data-toast chỉ gọi toast() (handler 4612)

### [medium][dead-end][confirmed] Địa chỉ: 'Thêm địa chỉ mới' là toast stub; hoàn toàn không có sửa / xoá / đặt mặc định

'+ Thêm địa chỉ mới' chỉ bắn toast, không có form. Hai card địa chỉ không có bất kỳ nút hành động nào (không sửa, không xoá, không chuyển 'Mặc định' sang địa chỉ kia) — cả CRUD địa chỉ là màn chết dù đây là tab được thiết kế riêng trong Figma (Address + Address-Empty).

*Evidence:* Dòng 1942: `<button data-toast="Thêm địa chỉ mới" …>+ Thêm địa chỉ mới</button>`; card 1933-1941 chỉ có text, badge 'Mặc định' tĩnh

### [medium][dead-end][confirmed] Toàn bộ hành động ở Order detail là toast stub; 'Mua lại' báo đã thêm giỏ nhưng giỏ không đổi

'Theo dõi đơn hàng', 'Huỷ đơn hàng', 'Mua lại', 'Xuất hoá đơn', 'Liên hệ CSKH' đều là data-toast (demo stub). Đáng chú ý 2 điểm dễ bể khi demo: (1) 'Mua lại' toast 'Đã thêm lại vào giỏ' nhưng cart-badge và giỏ không thay đổi — trong khi Add to cart ở PDP có tăng badge thật, khách demo mở giỏ sẽ thấy mâu thuẫn; (2) 'Huỷ đơn hàng' toast 'Đã gửi yêu cầu huỷ' nhưng status vẫn 'Đang giao', và hệ thống không có trạng thái 'Đã huỷ' (ORDER_STEPS chỉ 4 bước xuôi).

*Evidence:* Dòng 2117-2122: cả 5 nút đều `data-toast="…"`; handler 4612 chỉ `toast(b.dataset.toast)`

### [medium][inconsistency][confirmed] Đơn DAFC102938: badge 'Đang giao' nhưng timeline đang dừng ở 'Đã xác nhận'

Đơn có status 'Đang giao' (badge warning + box 'Dự kiến giao ngày 18/07 · Mã vận đơn') nhưng steps: 2 → done=2, bước hiện tại (isCur = done-1 = index 1) là 'Đã xác nhận', còn bước 'Đang giao' trên timeline vẫn xám/chưa reached. Hai khối cách nhau vài chục px nói hai điều khác nhau; steps phải là 3.

*Evidence:* Dòng 1877 `status: 'Đang giao'` + dòng 1886 `steps: 2`; render 2036-2045: `const reached = i < done; const isCur = i === done - 1;` với ORDER_STEPS[1]='Đã xác nhận'

### [medium][i18n][confirmed] Đổi tab Account không gọi localizeNew — ở chế độ EN nội dung tab mới hiện tiếng Việt

go() và rerenderLogin() đều gọi localizeNew sau khi render, nhưng handler data-atab bơm accountBody() vào #accBody rồi chỉ gọi wire(root). Demo EN: mở Account (tab đầu được dịch do go()), bấm sang Đơn hàng/Địa chỉ/… → toàn bộ nội dung tab hiện nguyên tiếng Việt. Đây là lỗi máy móc, không phải thiếu key (key các chuỗi này đều có ở 3962-3978).

*Evidence:* Dòng 4473: `body.innerHTML = accountBody(); wire(root);` — không có localizeNew(body), so với rerenderLogin dòng 4283 có `localizeNew(el)`

### [low][i18n][confirmed] Thiếu key/regex lẻ trong cụm: 'Sản phẩm (1)', 'Giao hàng nhanh', 'SL: n', dòng quy đổi điểm, toast logout/mua lại

Dict chỉ có 'Sản phẩm (2)' (3974) trong khi order detail render `Sản phẩm (${o.items.length})` — 2 đơn 1-sản-phẩm sẽ hiện 'Sản phẩm (1)' không dịch. Tương tự không có key: 'Giao hàng nhanh' (method đơn 2, dòng 1891 — 'Giao hàng tiêu chuẩn' thì có), 'SL: ${qty}' (2076), '≈ 1.240.000 ₫ giá trị quy đổi' (1989), '0909 *** 123 · Hạng Vàng' (1826/1953 — key 'Hạng Vàng' rời không khớp vì tr() so cả chuỗi), toast 'Đã đăng xuất' (4477) và 'Đã thêm lại vào giỏ' (2120) — toast() có dịch (5273) nhưng không tìm thấy key.

*Evidence:* Dòng 2065 `Sản phẩm (${o.items.length})` vs I18N 3974 chỉ có 'Sản phẩm (2)':'Items (2)'; grep 'Giao hàng nhanh' / 'Đã đăng xuất' không có trong I18N

### [low][inconsistency][confirmed] Mã vận đơn GHN trong Order detail mâu thuẫn với việc đã sửa đối tác vận chuyển thành TIKINOW

README ghi rõ đã sửa data sai 'đối tác vận chuyển GHN → TIKINOW' ở footer (dữ liệu thật của shop.dafc.com.vn), nhưng order detail vẫn hiện 'Mã vận đơn GHN284917' và toast 'Theo dõi đơn GHN284917' — hai chỗ trong cùng app nói 2 đơn vị vận chuyển khác nhau.

*Evidence:* Dòng 2052: `Mã vận đơn <b class="font-medium">GHN284917</b>`; dòng 2118: `data-toast="Theo dõi đơn GHN284917"`

### [low][missing-flow][confirmed] Không có 'Đổi mật khẩu' từ trang Tài khoản

Tab Thông tin không có mục đổi mật khẩu; luồng đặt lại mật khẩu (setpass) chỉ vào được qua 'Quên mật khẩu' từ màn login — user đã đăng nhập muốn đổi mật khẩu phải logout trước. Với demo pitch đây là polish, nhưng là câu hỏi khách hay soi ở trang account chuẩn e-commerce.

*Evidence:* accInfo 1857-1872 chỉ có 5 row + 1 nút 'Chỉnh sửa thông tin'; authFlow 'forgot' chỉ được set từ [data-auth-otp] khi authView='forgot' (4504)

## Trang chinh sach + ha tang chung (router/i18n/sheet)

> Cụm trang chính sách dựng chắc: 3 trang đủ nội dung, tab + dropdown + mục lục đều hoạt động, popstate có xử lý nên back trình duyệt không thoát demo. Gãy nặng nhất nằm ở hạ tầng điều hướng dùng chung: mọi lần back đều mất vị trí cuộn (go() luôn scrollTo(0,0)), và bấm back trình duyệt/nút back Android khi đang mở sheet/menu không đóng sheet mà đổi luôn màn phía dưới kèm kẹt scroll-lock. i18n có 2 lỗi hệ thống: đổi VI→EN→VI làm biến dạng một số nhãn (I18N_REV trùng value), và các chỗ set textContent bằng JS không gọi localizeNew nên ở chế độ EN vẫn hiện tiếng Việt (CTA size sheet, nhãn vận chuyển ở checkout).

**Da chay tot (8):**
- Footer → 3 trang chính sách (FOOTER_ROUTES, 3 link gạch chân, 14 link còn lại là chữ tĩnh)
- Chuyển qua lại 3 tab chính sách + dropdown #policyMore (z-index đã xử lý đúng, mũi tên xoay 180°, item trang hiện tại có tick và chỉ đóng menu)
- Mục lục bấm → scrollIntoView tới section (scroll-mt-64px trừ navbar, hoạt động tốt)
- Browser back/forward có xử lý popstate thật (pushState mỗi lần go(), replaceState plp lúc boot) — back trình duyệt KHÔNG thoát demo giữa chừng
- Settings FAB đổi ngôn ngữ VI↔EN (applyLang toàn body, dịch cả sheet đang mở, toast tự dịch) + đổi 3 font; FAB bottom:96px KHÔNG che nút CTA sticky (CTA cao ~84px, chỉ chớm phần gradient trên máy có safe-area)
- i18n phần khung trang chính sách đầy đủ: tab, tiêu đề, mốc cập nhật, heading + mục lục đều dịch được (đã verify runtime)
- Cookie gate 2 view (đồng ý tất cả / tuỳ chọn từng nhóm), link Chính sách Bảo mật trong gate đi tới trang privacy thật
- Toast + lockBodyScroll có đếm lồng sheet (2 sheet chồng nhau unlock đúng)

### [high][missing-edge-case][confirmed] Back về màn trước luôn mất vị trí cuộn (PLP→PDP→back nhảy về đầu trang)

go() luôn window.scrollTo(0,0) cho mọi điều hướng, kể cả khi popstate render lại màn cũ; không lưu/khôi phục scrollY theo màn. Đã verify runtime: cuộn PLP xuống 1200px, vào PDP, back trình duyệt → PLP về scrollY=0. Trên journey mua hàng (lướt grid, xem sản phẩm, quay lại lướt tiếp) khách demo thấy ngay. Cần map name→scrollY, lưu trước khi rời màn và restore khi opts.back.

*Evidence:* index.html:4301 — trong go(): `window.scrollTo(0, 0);` (không có nhánh restore cho opts.back); handler popstate 4320-4324 cũng chỉ gọi go(target,{back:true})

### [high][bug][confirmed] Back trình duyệt / nút back Android khi sheet đang mở: không đóng sheet mà đổi màn phía dưới + kẹt scroll-lock

Các sheet (menuSheet, filterSheet, quickAdd, sizeSheet, infoSheet, cookieGate...) nằm ở body ngoài #viewport và popstate không biết tới chúng. Đã verify runtime: đang ở pdp2 mở menu drawer → window.history.back() → màn dưới đổi thành plp nhưng menu vẫn mở (aria-hidden=false) và body vẫn position:fixed (scroll lock). Khi đóng sheet, unlockBodyScroll còn restore scrollY của màn CŨ lên màn mới (dòng 4343). Trên Android, back vật lý là thao tác mặc định để đóng sheet — demo trên điện thoại sẽ dính ngay. Cần: popstate kiểm tra sheet đang mở thì đóng sheet thay vì điều hướng (hoặc pushState 1 entry khi mở sheet).

*Evidence:* index.html:4320-4324 — `window.addEventListener('popstate', (e) => { const target = ...; go(target, { back: true, fromPopstate: true }); })` không có nhánh đóng sheet; test runtime: {screen:'plp', menuHidden:'false', bodyPos:'fixed'}

### [medium][i18n][confirmed] Đổi ngôn ngữ VI→EN→VI làm biến dạng nhãn (I18N_REV trùng value, entry sau đè entry trước)

I18N có nhiều cặp key khác nhau cùng 1 bản dịch EN; I18N_REV build bằng Object.fromEntries nên value trùng → key sau thắng. Đã verify runtime ở checkout: 'Phương thức vận chuyển' sau VI→EN→VI thành 'Phương thức giao hàng'. Các cặp tiềm ẩn khác: 'Phí vận chuyển'/'Vận chuyển'→'Shipping', 'Nhận thông báo'/'Đăng ký nhận thông báo'→'Notify me', 'Chọn kích thước'/'Chọn size'→'Select size', 'Xuất xứ'/'Sản xuất tại'→'Made in'. Người demo hay bấm qua lại 2 ngôn ngữ nên dễ lộ.

*Evidence:* index.html:4242 — `const I18N_REV = Object.fromEntries(Object.entries(I18N).map(([k, v]) => [v, k]));`; 3903-3904 hai key cùng value 'Delivery method'; test runtime changed: [['Phương thức vận chuyển','Phương thức giao hàng']]

### [medium][i18n][confirmed] Ở chế độ EN, text set bằng JS không qua localizeNew — CTA size sheet và nhãn vận chuyển checkout hiện tiếng Việt

updateCta() của size sheet (sheet dùng chung cho pdp2/3/5/6 + quick add từ PLP) set thẳng cta.textContent='Thêm vào giỏ hàng'/'Nhận thông báo khi có hàng' không gọi localizeNew — đã verify: LANG=en, mở size sheet, CTA vẫn 'Thêm vào giỏ hàng' trong khi 'Size guide' cạnh đó đã dịch. Tương tự checkout: chọn phương thức giao hàng set lbl.textContent='Giao hang nhanh'/'Chuyển phát nhanh' (VI) không dịch. Lệch quy ước với quick add sheet vốn đã gọi localizeNew(body)/localizeNew(ctaBox) sau khi render (5819).

*Evidence:* index.html:6059-6069 — `cta.textContent = 'Thêm vào giỏ hàng';` / `'Nhận thông báo khi có hàng'` (không localizeNew); 4668 — `lbl.textContent = o.dataset.opt === 'fast' ? 'Giao hang nhanh' : 'Chuyển phát nhanh';`

### [medium][inconsistency][confirmed] Trang Chính sách đổi trả nói 7 ngày, khối cam kết và 4/6 PDP nói 14 ngày

POLICY_DATA.returns: 'đổi trả sản phẩm trong vòng 7 ngày' (cả điều kiện lẫn mục không được đổi trả). Nhưng camKetSection (hiện ở nhiều màn) ghi 'Dịch vụ đổi trả miễn phí trong 14 ngày', và info-tab của pdp2/pdp3/pdp5/pdp6 ghi 'Đổi trả trong 14 ngày' (pdp/pdp4 ghi 7 ngày, pdp2 khối lưu ý cũng 14 ngày). Khách xem PDP rồi mở trang chính sách sẽ thấy 2 con số mâu thuẫn. Cần chốt 1 con số (site DAFC thật dùng 7 ngày) và sửa đồng loạt.

*Evidence:* index.html:3546 — 'chấp nhận đổi trả sản phẩm trong vòng 7 ngày'; 680 — 'Dịch vụ đổi trả miễn phí trong 14 ngày'; 1564/2151/2293 — 'Đổi trả trong 14 ngày với sản phẩm còn nguyên tem mác.' vs 1164/1681 — 'Đổi trả trong 7 ngày...'

### [low][missing-flow][confirmed][KNOWN] Thiếu 2 trang chính sách Vận chuyển + Thanh toán (Figma tab strip có 5 tab, code có 3)

POLICY_TABS chỉ có privacy/terms/returns; 2 nhãn 'Chính sách vận chuyển'/'Chính sách thanh toán' trong footer là chữ tĩnh không bấm được. README đã ghi nhận: Figma chỉ thiết kế 3 frame, cố ý không render tab chết — cần thiết kế thêm 2 frame rồi bổ sung POLICY_DATA + POLICY_TABS + FOOTER_ROUTES.

*Evidence:* index.html:3511-3515 — POLICY_TABS 3 entry; 3507-3509 comment 'tab strip trong Figma có 5 tab... file chỉ thiết kế 3 trang'

### [low][i18n][confirmed][KNOWN] Body văn bản pháp lý 3 trang chính sách không dịch EN (cố ý, chờ bản EN chính thức)

Ở chế độ EN, tab/tiêu đề/mục lục/heading dịch đủ nhưng toàn bộ đoạn nội dung vẫn tiếng Việt (đã verify runtime: h2 'Information we collect' nhưng body 'Khi bạn mua sắm tại DAFC...'). README ghi rõ đây là quyết định nội dung/pháp lý — không dịch máy điều khoản. Vẫn nêu vì khi demo bằng EN trang trông 'nửa nạc nửa mỡ'.

*Evidence:* index.html:3993-3997 — comment 'CHỈ dịch phần khung... Phần body văn bản pháp lý CỐ Ý để nguyên tiếng Việt'

### [low][i18n][confirmed] aria-label nút #policyMore không có trong I18N

applyLang có duyệt [aria-label] nhưng 'Xem tất cả trang chính sách' không có key trong I18N nên ở EN vẫn là tiếng Việt (verify runtime: more='Xem tất cả trang chính sách' khi LANG=en). Ảnh hưởng screen reader / audit accessibility khi demo EN.

*Evidence:* index.html:3595 — `aria-label="Xem tất cả trang chính sách"`; không có entry tương ứng trong I18N (4269-4271 có xử lý aria-label)

### [low][bug][confirmed] Toast bị cookie gate che (z-200 < z-400) — bấm switch 'Cookie cần thiết' không thấy phản hồi

Trong view tuỳ chọn cookie, bấm switch nhóm bị khoá bắn toast('Cookie cần thiết không thể tắt') nhưng #toast z-[200] đặt ở bottom-88px, còn cookie gate z-400 với panel phủ đáy màn + backdrop full-screen → toast render sau lưng gate, user không thấy gì. Cookie gate là thứ đầu tiên mọi người xem demo đụng vào. Nên nâng z-index toast trên mọi sheet (>400).

*Evidence:* index.html:329 — `<div id="toast" class="fixed ... z-[200] hidden">`; 150 — `#cookieGate { ... z-index: 400; }`; 6205 — `toast('Cookie cần thiết không thể tắt')` khi gate đang mở

### [low][inconsistency][confirmed] Nút back của app không dùng history: Account back cứng về PLP brand (mất ngữ cảnh), nhánh 'back' trong wire() là dead code

Mũi tên back ở màn Tài khoản là data-nav="plp" → handler ép goPlp({type:'brand'}): nếu vào Account từ PLP category/search thì back về PLP brand mặc định, mất bộ lọc/từ khoá; đồng thời tạo entry lịch sử mới thay vì history.back() nên back trình duyệt sau đó quay lại Account (ping-pong). Nhánh `if (t === 'back') window.history.back()` trong wire() không có phần tử nào dùng (grep data-nav="back" = 0 kết quả).

*Evidence:* index.html:1817 — `<button data-nav="plp" ...>${I.chevL}</button>` (nav Tài khoản); 4451 — `if (t === 'plp') { goPlp({ type: 'brand' }); return; }`; 4444 — nhánh 'back' không có caller

### [low][missing-edge-case][confirmed] Không có deep-link/hash route — không thể gửi link thẳng tới 1 màn, hash trên URL bị bỏ qua

Router chỉ sync qua pushState với state object, không đọc/ghi location.hash: mở index.html#privacy vẫn ra PLP; refresh giữa chừng luôn quay về PLP (replaceState 'plp' + go('plp') lúc boot) dù các entry lịch sử cũ vẫn pop lại được. Với demo pitch, không share được link trực tiếp tới PDP/chính sách cho khách xem trước.

*Evidence:* index.html:6228-6229 — `window.history.replaceState({ screen: 'plp' }, ''); go('plp');`; không có listener hashchange / đọc location.hash trong toàn file

### [low][dead-end][confirmed] 3 icon social ở footer (FB/IG/Zalo) là thẻ <a> không href, không handler

Demo stub: có class press (hiệu ứng nhấn) nên trông bấm được nhưng không đi đâu, không toast. Cùng khối footer, nút newsletter 'Đăng ký' đã có data-toast — nên tối thiểu thêm data-toast hoặc href thật (fb.com/DAFC...) cho đồng bộ. 14 link footer chữ tĩnh là cố ý (README/comment đã ghi) nhưng social icon không nằm trong ghi chú đó.

*Evidence:* index.html:771 — `<a class="press">${I.fb}</a><a class="press">${I.ig}</a><a class="press">${I.zalo}</a>` (không href/handler)

## Gap analysis journey (so voi chuan luxury e-commerce)

> Trục mua hàng chính (PLP → 6 PDP → quick add/size picker → cart có Rewards/voucher/quà tặng → auth OTP-first → checkout 3 bước → done) và cụm account/order/policy đã khá đầy đủ cho một demo clickable. Tuy nhiên toàn bộ lớp "ngoài trục mua hàng" của một site luxury đang vắng: không có trang chủ (FLOW mở thẳng vào PLP), không có wishlist, store locator/liên hệ chỉ là chữ tĩnh ở footer, và một số điểm chạm ngay trên journey (bảng size, gói quà tặng đã hứa trong promo) là stub/không tồn tại — đây là những chỗ khách DAFC dễ bấm thử và hỏi "sao không thấy" trong buổi pitch.

**Da chay tot (14):**
- PLP 3 chế độ: brand (Versace) / category qua menu / search kết quả
- Search với gợi ý + lịch sử
- 6 biến thể PDP (pdp..pdp6) + gallery/lightbox + accordion info
- Quick add to cart (#quickAddSheet) + xác nhận thêm giỏ (#cartConfirm)
- Size picker (#sizeSheet) kèm luồng hết hàng 2 tầng + đăng ký nhận thông báo khi có hàng (#notifySheet)
- Cart: stepper/xoá, DAFC Rewards (giảm 4% HOẶC dùng điểm thưởng tối đa 10%), mã giảm giá, phiếu mua hàng, chọn quà tặng khi đã đăng nhập
- Auth 6 view: login / register OTP-first / otp / reginfo / setpass / forgot
- Account 5 tab: Thông tin / Đơn hàng / Địa chỉ / Thành viên / Điểm thưởng
- Order detail: timeline 4 bước, địa chỉ, thanh toán, tổng kết
- Checkout 3 section tự đóng/mở + xuất hoá đơn VAT + guest checkout
- Done + cross-sell
- 3 trang chính sách (privacy/terms/returns) vào từ footer
- Menu full-screen 3 ngành + submenu thương hiệu
- i18n VI/EN + settings FAB đổi font

### [high][missing-flow][no-verify] Không có trang chủ (homepage) — demo mở thẳng vào PLP Versace

FLOW bắt đầu bằng 'plp', không có route 'home'. Mọi lối 'Trang chủ' đều trỏ về PLP: hàng 'Trang chủ nam/nữ/làm đẹp' trong menu dùng data-nav="plp", breadcrumb 'Trang chủ' ở PLP là <span> tĩnh không bấm được. Với buổi pitch redesign cho DAFC, homepage là màn khách hỏi đầu tiên (hero banner, editorial, brand grid — ngôn ngữ thị giác luxury thể hiện rõ nhất ở đây); mở demo bằng PLP dễ bị hiểu là 'chưa làm xong'. Cần Figma design MỚI (hero/editorial/brand showcase) — không tự dựng được từ pattern có sẵn, chỉ tái dùng được navBar/footer/productCard rail.

*Evidence:* Dòng 537: const FLOW = ['plp','search','pdp',...] — không có 'home'; dòng 5413-5414 headRow: <button data-nav="plp"...>${label}; dòng 963: <span>Trang chủ</span> (breadcrumb tĩnh)

### [high][missing-flow][no-verify] Wishlist / Yêu thích hoàn toàn vắng — không icon heart, không trang, không tab

Grep 'wishlist|yêu thích|heart' ra 0 kết quả trên toàn bộ 5776 dòng. productCard không có nút heart, menu và Account (ACCOUNT_TABS dòng 1803) không có mục Yêu thích, FLOW không có route. Đây là tính năng chuẩn ở mọi site luxury tham chiếu (Versace, Gucci, Net-a-Porter đều có) và là câu hỏi gần như chắc chắn từ khách DAFC khi xem demo PLP/PDP. Icon heart trên card + tab trong Account có thể TỰ DỰNG theo pattern productCard/accTabs có sẵn; riêng trang wishlist đầy đủ (empty state, move-to-cart) nên có frame Figma riêng cho đúng chất luxury.

*Evidence:* Grep 'wishlist|yêu thích|heart' → No matches found; dòng 537 FLOW không có route wishlist; dòng 1803-1805 ACCOUNT_TABS chỉ có info/orders/address/loyalty/points

### [medium][missing-flow][no-verify] Store locator + trang Liên hệ không tồn tại — 4 link footer nhóm 'Liên hệ với chúng tôi' đều là chữ tĩnh

Footer có nhóm 'Thông tin về DAFC / Tuyển dụng / Liên hệ / Danh sách cửa hàng' nhưng FOOTER_ROUTES chỉ map 3 trang chính sách nên cả 4 link này render thành chữ tĩnh không bấm được. I18N thậm chí đã có sẵn key 'Danh sách cửa hàng':'Store locator' (dòng 3817). DAFC là nhà bán lẻ luxury offline chủ lực (boutique Rex, Union Square...) — store locator là luồng khách hàng thật rất quan tâm và khách DAFC dễ hỏi. Trang danh sách cửa hàng dạng text (tên/địa chỉ/giờ mở) TỰ DỰNG được theo pattern screenPOLICY + POLICY_DATA; nếu muốn có bản đồ/ảnh boutique thì cần Figma mới.

*Evidence:* Dòng 704: 'Thông tin về DAFC', 'Tuyển dụng', 'Liên hệ', 'Danh sách cửa hàng' (không nằm trong FOOTER_ROUTES); dòng 3817: 'Danh sách cửa hàng':'Store locator'

### [medium][dead-end][no-verify] 'Bảng kích thước' trên cả 6 PDP chỉ là toast stub; nội dung size guide trong picker lại chung chung và lệch nhau

Nút 'Bảng kích thước' ở cả 6 PDP là demo stub: data-toast="Mở bảng kích thước" (dòng 1221/1488/1620/1738/2212/2341) — bấm chỉ hiện toast. Trong khi đó nút #szGuide trong size picker (dòng 6016) lại mở #infoSheet với đoạn text đo 'vòng chân/vòng tay' (dòng 6097) — không phải bảng số đo, và còn sai ngữ cảnh với đầm/giày. Nút này nằm ngay trên journey chọn size mua hàng, rất dễ bị khách bấm thử khi demo. TỰ DỰNG được không cần Figma: dùng lại __openInfoSheet(title, body, asHTML) + pattern bảng specs của pdp2 để render bảng size thật, và trỏ 6 nút PDP vào cùng handler với #szGuide cho nhất quán.

*Evidence:* Dòng 1221: <button data-toast="Mở bảng kích thước"...>Bảng kích thước</button>; dòng 6097: __openInfoSheet('Bảng kích thước', 'Đo vòng chân/vòng tay tương ứng...')

### [medium][inconsistency][no-verify] Promo 'Gói quà cao cấp' hướng dẫn chọn 'Gói quà tặng' ở checkout — nhưng checkout không có option gói quà

PROMOS.gift5m (hiện trên pdp2) ghi rõ cách nhận: 'Chọn "Gói quà tặng" ở bước thanh toán và ghi nội dung thiệp nếu cần' (dòng 1318), nhưng screenCHECKOUT (2961-3115) chỉ có 3 section địa chỉ/vận chuyển/thanh toán + toggle VAT — không có checkbox gói quà hay ô ghi thiệp nào. Khách xem demo đọc promo rồi đi checkout sẽ thấy hụt; gift wrapping cũng là điểm bán đặc trưng của luxury. TỰ DỰNG được không cần Figma: thêm khối 'Gói quà tặng' theo đúng pattern toggle #vatToggle + textarea (dòng 3029-3046) trong section Thanh toán.

*Evidence:* Dòng 1318: ['Cách nhận', 'Chọn "Gói quà tặng" ở bước thanh toán và ghi nội dung thiệp nếu cần.'] — grep 'Gói quà' trong screenCHECKOUT (2961-3115) không có kết quả

### [medium][missing-flow][no-verify] Account self-service là stub và không nối với checkout: không sửa được thông tin/địa chỉ, checkout đã đăng nhập vẫn bắt nhập địa chỉ tay

Tab Thông tin: nút 'Chỉnh sửa thông tin' chỉ toast (dòng 1870). Tab Địa chỉ: '+ Thêm địa chỉ mới' chỉ toast (dòng 1942), 2 địa chỉ có sẵn không có nút sửa/xoá/đặt mặc định. Nghiêm trọng hơn về journey: khi ckAuth=true, section 'Thông tin giao hàng' ở checkout vẫn render form trống (field 'Nhập tên', 'Nhập họ'... dòng 2976-2981) thay vì cho chọn từ 2 địa chỉ đã lưu ở accAddress — tức là tab Địa chỉ tồn tại nhưng không phục vụ gì cho luồng mua. Bổ sung dropdown/danh sách chọn địa chỉ đã lưu ở checkout TỰ DỰNG được theo pattern card địa chỉ accAddress + richRadio; form thêm/sửa địa chỉ nên có frame Figma (Figma gốc có màn Address riêng theo README). README chỉ note thiếu Empty/Error state cho Account, chưa note các stub này.

*Evidence:* Dòng 1870: data-toast="Chỉnh sửa thông tin"; dòng 1942: data-toast="Thêm địa chỉ mới"; dòng 2976-2981: field('Tên','Nhập tên')... render trống kể cả khi ckAuth

### [low][dead-end][no-verify] Toàn bộ hành động hậu mãi ở Order detail là toast stub; không có luồng đổi/trả online từ đơn hàng

5 nút ở cuối Order detail đều là demo stub data-toast: 'Theo dõi đơn GHN284917' (2118), 'Đã gửi yêu cầu huỷ' (2119), 'Đã thêm lại vào giỏ' — Mua lại (2120), Xuất hoá đơn (2121), 'Liên hệ CSKH 1900 2666' (2122); màn done cũng có 'Đang mở trang theo dõi' (3166). Chấp nhận được cho demo vì timeline ORDER_STEPS 4 bước đã mô phỏng tracking trực quan. Riêng đơn 'Hoàn tất' không có lối 'Yêu cầu đổi/trả' — chính sách đổi trả (dòng 3549) mô tả quy trình qua email/hotline nên khớp thực tế DAFC, nhưng nếu pitch muốn bán ý tưởng self-service return thì cần Figma mới; còn giữ nguyên thì chỉ cần biết trước các nút này là stub khi demo cho khách.

*Evidence:* Dòng 2118-2122: data-toast="Theo dõi đơn GHN284917" / "Đã gửi yêu cầu huỷ" / "Đã thêm lại vào giỏ" / ... / "Liên hệ CSKH 1900 2666"; dòng 3166: data-toast="Đang mở trang theo dõi"

### [low][missing-flow][no-verify][KNOWN] 2 trang chính sách Vận chuyển / Thanh toán chưa dựng (Figma tab strip có 5, code có 3)

README mục '2 điểm còn hở' đã nêu: Figma tab strip 5 tab nhưng chỉ có 3 frame nội dung, code cố ý chỉ render 3 tab; 2 nhãn 'Chính sách Vận chuyển'/'Chính sách Thanh toán' trong FOOTER_LINKS đang là chữ tĩnh. Đường đi đã rõ (README ghi: cần thiết kế 2 frame rồi bổ sung POLICY_DATA + POLICY_TABS + FOOTER_ROUTES) — cần Figma design mới cho nội dung, còn code TỰ DỰNG theo pattern screenPOLICY có sẵn. Ưu tiên thấp vì nằm ở footer, ít bị bấm khi demo.

*Evidence:* README dòng 207: 'Tab strip trong Figma có 5 tab... nhưng file chỉ thiết kế 3 frame... 2 nhãn này cũng nằm trong FOOTER_LINKS nên đang là chữ tĩnh'

### [low][missing-flow][no-verify] Không có đánh giá sản phẩm (reviews/rating) trên cả 6 PDP

Grep 'đánh giá|review|rating' không có kết quả nào trong UI (chỉ 1 match trong comment không liên quan). Tuy nhiên đây là quy ước NGÀNH: các site luxury tham chiếu (Versace.com, Gucci, cả shop.dafc.com.vn hiện tại) đều không hiển thị review — thiếu nó không làm demo 'bể mặt', thậm chí đúng chất luxury hơn. Chỉ cần chốt trước với khách rằng đây là lựa chọn có chủ ý; nếu khách vẫn muốn thì cần Figma design mới (khối rating + list review), không có pattern sẵn để tự dựng.

*Evidence:* Grep 'đánh giá|review|rating' → chỉ 1 match dòng 325 là comment '<!-- Preview chrome -->', không có UI review nào

### [low][missing-flow][no-verify] 'Đã xem gần đây' (recently viewed) có key i18n nhưng không được render ở đâu

I18N có sẵn cặp 'Đã xem gần đây':'Recently viewed' (dòng 3854, nằm cạnh 2 rail đang dùng thật 'Gợi ý mua kèm'/'Sản phẩm tương tự') nhưng grep toàn file không có chỗ nào render chuỗi này — dấu hiệu rail từng được dự định rồi bỏ, giờ là entry chết. TỰ DỰNG được hoàn toàn không cần Figma: thêm 1 rail theo đúng pattern rail 'Gợi ý mua kèm' (dòng 1259) ở PDP/cart, track sản phẩm đã mở bằng 1 mảng state như plpMode. Giá trị demo: thể hiện chiều sâu cá nhân hoá, nhưng khách ít khi hỏi.

*Evidence:* Dòng 3854: 'Gợi ý mua kèm':'Complete the look', 'Sản phẩm tương tự':'You may also like', 'Đã xem gần đây':'Recently viewed' — chuỗi 'Đã xem gần đây' không xuất hiện ở bất kỳ hàm screen* nào

### [low][missing-flow][no-verify] Không có notification center / chat hỗ trợ trực tuyến

Chuỗi 'thông báo' trong file chỉ thuộc luồng 'Nhận thông báo khi có hàng' (#notifySheet dòng 5596) và dòng pháp lý footer — không có icon chuông, inbox thông báo, hay widget chat/concierge nào. Với mobile WEB (không phải app) luxury, notification center thường không tồn tại nên bỏ qua được; live chat/WhatsApp concierge là điểm cộng phổ biến ở luxury (Gucci có chat, DAFC thật có nút liên hệ Zalo/hotline) — nếu muốn thêm nút chat nổi thì TỰ DỰNG được theo pattern Settings FAB có sẵn, nội dung sheet theo pattern #infoSheet; không bắt buộc Figma.

*Evidence:* Grep 'thông báo|Thông báo' → toàn bộ match thuộc notify-stock (5596, 5600, 5620, 6037...) và footer; không có bell icon trong const I (543-574) hay navBar

### [low][missing-flow][no-verify] Không có quản lý thẻ thanh toán đã lưu — dữ liệu đơn hàng có '**** 4829' nhưng checkout/account không nơi nào quản lý

ORDERS hiển thị payment: 'Thẻ tín dụng · **** 4829' (dòng 1883, 1891) tạo cảm giác hệ thống có lưu thẻ, nhưng checkout chỉ có 4 radio phương thức chung chung (cc/qr/atm/trả góp — dòng 3013-3018, không có 'thẻ đã lưu **** 4829') và Account không có tab phương thức thanh toán. Lệch nhẹ về câu chuyện dữ liệu khi khách soi kỹ. Với demo clickable, thêm 1 radio 'Thẻ đã lưu **** 4829' ở checkout là TỰ DỰNG được ngay theo richRadio; trang quản lý thẻ đầy đủ cần Figma mới nhưng giá trị demo thấp, bỏ qua được.

*Evidence:* Dòng 1883: payment: 'Thẻ tín dụng · **** 4829' — trong khi dòng 3013-3018 pays chỉ có ['cc','Thẻ tín dụng/Ghi nợ'...] không tham chiếu thẻ đã lưu
