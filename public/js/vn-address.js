// Dữ liệu hành chính Việt Nam 2025 (34 tỉnh/thành sau sáp nhập)
const VN_ADDRESS = {
  "Hà Nội": {
    "Hoàn Kiếm": ["Hàng Bạc","Hàng Bồ","Hàng Buồm","Hàng Đào","Hàng Gai","Hàng Mã","Lý Thái Tổ","Phan Chu Trinh","Tràng Tiền"],
    "Ba Đình": ["Cống Vị","Điện Biên","Đội Cấn","Giảng Võ","Kim Mã","Liễu Giai","Ngọc Hà","Nguyễn Trung Trực","Phúc Xá","Quán Thánh","Thành Công","Trúc Bạch","Vĩnh Phúc"],
    "Đống Đa": ["Cát Linh","Hàng Bột","Khâm Thiên","Kim Liên","Láng Hạ","Láng Thượng","Nam Đồng","Ngã Tư Sở","Ô Chợ Dừa","Phương Liên","Phương Mai","Quốc Tử Giám","Thịnh Quang","Thổ Quan","Trung Liệt","Trung Phụng","Trung Tự","Văn Chương","Văn Miếu"],
    "Hai Bà Trưng": ["Bạch Đằng","Bách Khoa","Bùi Thị Xuân","Đồng Nhân","Đồng Tâm","Lê Đại Hành","Minh Khai","Nguyễn Du","Phạm Đình Hổ","Phố Huế","Quỳnh Lôi","Quỳnh Mai","Thanh Lương","Thanh Nhàn","Trương Định","Vĩnh Tuy"],
    "Cầu Giấy": ["Dịch Vọng","Dịch Vọng Hậu","Mai Dịch","Nghĩa Đô","Nghĩa Tân","Quan Hoa","Trung Hoà","Yên Hoà"],
    "Thanh Xuân": ["Hạ Đình","Khương Đình","Khương Mai","Khương Trung","Kim Giang","Nhân Chính","Phương Liệt","Thanh Xuân Bắc","Thanh Xuân Nam","Thanh Xuân Trung","Thượng Đình"],
    "Hoàng Mai": ["Định Công","Đại Kim","Giáp Bát","Hoàng Liệt","Hoàng Văn Thụ","Lĩnh Nam","Mai Động","Tân Mai","Thanh Trì","Thịnh Liệt","Tương Mai","Trần Phú","Vĩnh Hưng","Yên Sở"],
    "Long Biên": ["Bồ Đề","Cự Khối","Đức Giang","Gia Thụy","Giang Biên","Long Biên","Ngọc Lâm","Ngọc Thụy","Phúc Đồng","Phúc Lợi","Sài Đồng","Thạch Bàn","Thượng Thanh","Việt Hưng"],
    "Nam Từ Liêm": ["Cầu Diễn","Đại Mỗ","Mễ Trì","Mỹ Đình 1","Mỹ Đình 2","Phú Đô","Phương Canh","Tây Mỗ","Trung Văn","Xuân Phương"],
    "Bắc Từ Liêm": ["Cổ Nhuế 1","Cổ Nhuế 2","Đông Ngạc","Đức Thắng","Liên Mạc","Minh Khai","Phú Diễn","Phúc Diễn","Tây Tựu","Thượng Cát","Thụy Phương","Xuân Đỉnh","Xuân Tảo"],
    "Hà Đông": ["Biên Giang","Dương Nội","Đồng Mai","Hà Cầu","Kiến Hưng","La Khê","Mộ Lao","Nguyễn Trãi","Phú La","Phú Lãm","Phú Lương","Phúc La","Quang Trung","Vạn Phúc","Văn Quán","Yên Nghĩa","Yết Kiêu"],
    "Gia Lâm": ["Bát Tràng","Cổ Bi","Đa Tốn","Dương Xá","Đình Xuyên","Đông Dư","Kim Lan","Kim Sơn","Lệ Chi","Ninh Hiệp","Phù Đổng","Phú Thị","Trâu Quỳ","Trung Mầu","Văn Đức","Yên Thường","Yên Viên"],
    "Đông Anh": ["Bắc Hồng","Cổ Loa","Đại Mạch","Đông Hội","Dục Tú","Hải Bối","Kim Chung","Kim Nỗ","Liên Hà","Mai Lâm","Nam Hồng","Nguyên Khê","Tàm Xá","Thụy Lâm","Tiên Dương","Uy Nỗ","Vân Hà","Vân Nội","Việt Hùng","Vĩnh Ngọc","Xuân Canh","Xuân Nộn"],
    "Sóc Sơn": ["Bắc Phú","Đông Xuân","Đức Hoà","Hiền Ninh","Hồng Kỳ","Kim Lũ","Mai Đình","Minh Phú","Minh Trí","Nam Sơn","Phù Lỗ","Phù Linh","Phú Cường","Phú Minh","Quang Tiến","Tân Dân","Tân Hưng","Tiên Dược","Trung Giã","Việt Long","Xuân Giang","Xuân Thu"]
  },
  "TP. Hồ Chí Minh": {
    "Quận 1": ["Bến Nghé","Bến Thành","Cầu Kho","Cầu Ông Lãnh","Cô Giang","Đa Kao","Nguyễn Cư Trinh","Nguyễn Thái Bình","Phạm Ngũ Lão","Tân Định"],
    "Quận 3": ["Phường 1","Phường 2","Phường 3","Phường 4","Phường 5","Phường 6","Phường 7","Phường 8","Phường 9","Phường 10","Phường 11","Phường 12","Phường 13","Phường 14","Võ Thị Sáu"],
    "Quận 5": ["Phường 1","Phường 2","Phường 3","Phường 4","Phường 5","Phường 6","Phường 7","Phường 8","Phường 9","Phường 10","Phường 11","Phường 12","Phường 13","Phường 14","Phường 15"],
    "Quận 7": ["Bình Thuận","Phú Mỹ","Phú Thuận","Tân Hưng","Tân Kiểng","Tân Phong","Tân Phú","Tân Quy","Tân Thuận Đông","Tân Thuận Tây"],
    "Quận 10": ["Phường 1","Phường 2","Phường 3","Phường 4","Phường 5","Phường 6","Phường 7","Phường 8","Phường 9","Phường 10","Phường 11","Phường 12","Phường 13","Phường 14","Phường 15"],
    "Quận 12": ["An Phú Đông","Đông Hưng Thuận","Hiệp Thành","Tân Chánh Hiệp","Tân Hưng Thuận","Tân Thới Hiệp","Tân Thới Nhất","Thạnh Lộc","Thạnh Xuân","Thới An","Trung Mỹ Tây"],
    "Bình Thạnh": ["Phường 1","Phường 2","Phường 3","Phường 5","Phường 6","Phường 7","Phường 11","Phường 12","Phường 13","Phường 14","Phường 15","Phường 17","Phường 19","Phường 21","Phường 22","Phường 24","Phường 25","Phường 26","Phường 27","Phường 28"],
    "Gò Vấp": ["Phường 1","Phường 3","Phường 4","Phường 5","Phường 6","Phường 7","Phường 8","Phường 9","Phường 10","Phường 11","Phường 12","Phường 13","Phường 14","Phường 15","Phường 16","Phường 17"],
    "Tân Bình": ["Phường 1","Phường 2","Phường 3","Phường 4","Phường 5","Phường 6","Phường 7","Phường 8","Phường 9","Phường 10","Phường 11","Phường 12","Phường 13","Phường 14","Phường 15"],
    "Tân Phú": ["Hiệp Tân","Hoà Thạnh","Hoà Thanh","Phú Thạnh","Phú Thọ Hoà","Phú Trung","Sơn Kỳ","Tân Quý","Tân Sơn Nhì","Tân Thành","Tân Thới Hoà"],
    "Bình Tân": ["An Lạc","An Lạc A","Bình Hưng Hoà","Bình Hưng Hoà A","Bình Hưng Hoà B","Bình Trị Đông","Bình Trị Đông A","Bình Trị Đông B","Tân Tạo","Tân Tạo A"],
    "Thủ Đức": ["An Khánh","An Lợi Đông","An Phú","Bình Chiểu","Bình Thọ","Bình Trưng Đông","Bình Trưng Tây","Cát Lái","Hiệp Bình Chánh","Hiệp Bình Phước","Hiệp Phú","Linh Chiểu","Linh Đông","Linh Tây","Linh Trung","Linh Xuân","Long Bình","Long Phước","Long Thạnh Mỹ","Long Trường","Phú Hữu","Phước Bình","Phước Long A","Phước Long B","Tam Bình","Tam Phú","Tân Phú","Tăng Nhơn Phú A","Tăng Nhơn Phú B","Thảo Điền","Trường Thạnh","Trường Thọ"]
  },
  "Đà Nẵng": {
    "Hải Châu": ["Bình Hiên","Bình Thuận","Hải Châu 1","Hải Châu 2","Hoà Cường Bắc","Hoà Cường Nam","Hoà Thuận Đông","Hoà Thuận Tây","Nam Dương","Phước Ninh","Thạch Thang","Thanh Bình","Thuận Phước"],
    "Thanh Khê": ["An Khê","Chính Gián","Hoà Khê","Tam Thuận","Tân Chính","Thanh Khê Đông","Thanh Khê Tây","Thạc Gián","Vĩnh Trung","Xuân Hà"],
    "Sơn Trà": ["An Hải Bắc","An Hải Đông","An Hải Tây","Mân Thái","Nại Hiên Đông","Phước Mỹ","Thọ Quang"],
    "Ngũ Hành Sơn": ["Hoà Hải","Hoà Quý","Khuê Mỹ","Mỹ An"],
    "Liên Chiểu": ["Hoà Hiệp Bắc","Hoà Hiệp Nam","Hoà Khánh Bắc","Hoà Khánh Nam","Hoà Minh"],
    "Cẩm Lệ": ["Hoà An","Hoà Phát","Hoà Thọ Đông","Hoà Thọ Tây","Hoà Xuân","Khuê Trung"],
    "Hòa Vang": ["Hoà Bắc","Hoà Châu","Hoà Khương","Hoà Liên","Hoà Nhơn","Hoà Ninh","Hoà Phong","Hoà Phú","Hoà Phước","Hoà Sơn","Hoà Tiến","Hoà Trung"]
  },
  "Hải Phòng": {
    "Hồng Bàng": ["Hoàng Văn Thụ","Minh Khai","Phan Bội Châu","Quán Toan","Sở Dầu","Thượng Lý","Trại Cau","Trần Nguyên Hãn"],
    "Ngô Quyền": ["Cầu Đất","Cầu Tre","Đằng Giang","Đằng Lâm","Đông Khê","Gia Viên","Lạc Viên","Lê Lợi","Máy Chai","Máy Tơ","Vạn Mỹ"],
    "Lê Chân": ["An Biên","An Dương","Cát Dài","Đông Hải","Hàng Kênh","Lam Sơn","Nam Hải","Nghĩa Xá","Niệm Nghĩa","Trần Nguyên Hãn","Vĩnh Niệm"],
    "Hải An": ["Đằng Hải","Đằng Lâm","Đông Hải 1","Đông Hải 2","Nam Hải","Thành Tô","Tràng Cát"],
    "Kiến An": ["Bắc Sơn","Đồng Hoà","Lãm Hoà","Nam Sơn","Ngọc Sơn","Phù Liễu","Tràng Minh","Trần Thành Ngọ"],
    "Đồ Sơn": ["Bàng La","Hợp Đức","Minh Đức","Ngọc Hải","Ngọc Xuyên","Vạn Hương","Vạn Sơn"],
    "Dương Kinh": ["Anh Dũng","Đa Phúc","Hải Thành","Hoà Nghĩa","Tân Thành"]
  },
  "Cần Thơ": {
    "Ninh Kiều": ["An Bình","An Cư","An Hội","An Khánh","An Lạc","An Nghiệp","An Phú","Cái Khế","Hưng Lợi","Tân An","Thới Bình","Xuân Khánh"],
    "Ô Môn": ["Long Hưng","Phước Thới","Thới An","Thới Hoà","Thới Long","Trường Lạc"],
    "Bình Thuỷ": ["An Thới","Bình Thuỷ","Long Hoà","Long Tuyền","Thới An Đông","Trà An","Trà Nóc"],
    "Cái Răng": ["Ba Láng","Hưng Phú","Hưng Thạnh","Lê Bình","Phú Thứ","Tân Phú","Thường Thạnh"],
    "Thốt Nốt": ["Tân Lộc","Thới Thuận","Thốt Nốt","Thuận An","Trung Kiên","Trung Nhứt"]
  },
  "Bình Dương": {
    "Thủ Dầu Một": ["Chánh Mỹ","Chánh Nghĩa","Định Hoà","Hiệp An","Hiệp Thành","Hoà Phú","Phú Cường","Phú Hoà","Phú Lợi","Phú Mỹ","Phú Thọ","Tân An","Tương Bình Hiệp"],
    "Thuận An": ["An Phú","An Thạnh","Bình Chuẩn","Bình Hoà","Bình Nhâm","Hưng Định","Lái Thiêu","Thuận Giao","Vĩnh Phú"],
    "Dĩ An": ["Bình An","Bình Thắng","Dĩ An","Đông Hoà","Tân Bình","Tân Đông Hiệp","Tân Hoà"],
    "Bến Cát": ["An Điền","An Tây","Chánh Phú Hoà","Hoà Lợi","Mỹ Phước","Phú An","Thới Hoà"],
    "Tân Uyên": ["Bạch Đằng","Hoà Lợi","Khánh Bình","Phú Chánh","Tân Hiệp","Tân Phước Khánh","Tân Vĩnh Hiệp","Thái Hoà","Vĩnh Tân"]
  },
  "Đồng Nai": {
    "Biên Hoà": ["An Bình","An Hoà","Bình Đa","Bửu Hoà","Bửu Long","Hiệp Hoà","Hoà Bình","Hoá An","Long Bình","Long Bình Tân","Phước Tân","Quyết Thắng","Tam Hiệp","Tam Hoà","Tân Biên","Tân Hoá","Tân Mai","Tân Phong","Tân Tiến","Thống Nhất","Trảng Dài","Trung Dũng"],
    "Long Khánh": ["Bảo Quang","Bảo Vinh","Bình Lộc","Phú Bình","Suối Tre","Xuân An","Xuân Bình","Xuân Hoà","Xuân Lập","Xuân Tân","Xuân Thanh"],
    "Long Thành": ["An Phước","Bình An","Bình Sơn","Long An","Long Phước","Phước Bình","Phước Thái","Tân Hiệp","Tam An"],
    "Nhơn Trạch": ["Đại Phước","Hiệp Phước","Long Tân","Long Thọ","Phú Đông","Phú Hữu","Phú Thạnh","Phước An","Phước Khánh","Phước Thiền","Vĩnh Thanh"]
  },
  "Nghệ An - Hà Tĩnh": {
    "Vinh": ["Bến Thuỷ","Cửa Nam","Đông Vĩnh","Hà Huy Tập","Hưng Bình","Hưng Dũng","Hưng Phúc","Lê Lợi","Lê Mao","Quán Bàu","Quang Trung","Trung Đô","Trường Thi","Vinh Tân"],
    "Cửa Lò": ["Nghi Hoà","Nghi Hương","Nghi Thu","Nghi Thuỷ","Thu Thuỷ"],
    "Hà Tĩnh": ["Bắc Hà","Đại Nài","Nam Hà","Nguyễn Du","Thạch Linh","Thạch Quý","Tân Giang","Trần Phú","Văn Yên"]
  },
  "Thanh Hoá - Ninh Bình": {
    "Thanh Hoá": ["An Hoạch","Ba Đình","Điện Biên","Đông Hải","Đông Sơn","Đông Thọ","Hàm Rồng","Lam Sơn","Nam Ngạn","Ngọc Trạo","Phú Sơn","Quảng Hưng","Quảng Thắng","Quảng Thành","Tân Sơn","Thiệu Dương","Thiệu Khánh","Trường Thi"],
    "Sầm Sơn": ["Bắc Sơn","Quảng Châu","Quảng Cư","Quảng Tiến","Trung Sơn","Trường Sơn"],
    "Ninh Bình": ["Bích Đào","Đông Thành","Nam Bình","Nam Thành","Ninh Khánh","Ninh Phong","Ninh Sơn","Phúc Thành","Tân Thành","Thanh Bình"]
  },
  "Huế": {
    "Huế": ["An Cựu","An Đông","An Hoà","An Tây","Hương Long","Hương Sơ","Kim Long","Phú Bình","Phú Cát","Phú Hiệp","Phú Hoà","Phú Hội","Phú Nhuận","Phú Thuận","Phước Vĩnh","Tây Lộc","Thuận Hoà","Thuận Lộc","Thuận Thành","Trường An","Vĩ Dạ","Vĩnh Ninh","Xuân Phú"],
    "Hương Thuỷ": ["Phú Bài","Thuỷ Châu","Thuỷ Dương","Thuỷ Lương","Thuỷ Phù","Thuỷ Phương"],
    "Hương Trà": ["Hương An","Hương Chữ","Hương Hồ","Hương Toàn","Hương Vân","Hương Vinh","Tứ Hạ"]
  },
  "Quảng Nam - Quảng Ngãi": {
    "Tam Kỳ": ["An Mỹ","An Phú","An Sơn","An Xuân","Hoà Hương","Hoà Thuận","Phước Hoà","Tân Thạnh","Trường Xuân"],
    "Hội An": ["Cẩm An","Cẩm Châu","Cẩm Kim","Cẩm Nam","Cẩm Phô","Cẩm Thanh","Cẩm Thuỷ","Cẩm Tú","Hoà Hương","Minh An","Sơn Phong","Tân An","Thanh Hà"],
    "Quảng Ngãi": ["Chánh Lộ","Lê Hồng Phong","Nghĩa Chánh","Nghĩa Dũng","Nghĩa Lộ","Nguyễn Nghiêm","Quảng Phú","Trần Hưng Đạo","Trần Phú"]
  },
  "Bình Định - Phú Yên": {
    "Quy Nhơn": ["Bùi Thị Xuân","Đống Đa","Ghềnh Ráng","Hải Cảng","Lê Hồng Phong","Lê Lợi","Lý Thường Kiệt","Ngô Mây","Nguyễn Văn Cừ","Nhơn Bình","Nhơn Lý","Nhơn Phú","Thị Nại","Trần Hưng Đạo","Trần Phú"],
    "Tuy Hoà": ["1","2","3","4","5","6","7","8","9","Phú Đông","Phú Lâm","Phú Thạnh"]
  },
  "Khánh Hoà - Ninh Thuận": {
    "Nha Trang": ["Lộc Thọ","Ngọc Hiệp","Phương Sài","Phương Sơn","Phước Hoà","Phước Long","Phước Tân","Phước Tiến","Tân Lập","Vĩnh Hải","Vĩnh Hoà","Vĩnh Nguyên","Vĩnh Phước","Vĩnh Thọ","Vĩnh Trường","Xương Huân"],
    "Cam Ranh": ["Ba Ngòi","Cam Linh","Cam Lộc","Cam Long","Cam Nghĩa","Cam Phú","Cam Phúc Bắc","Cam Phúc Nam","Cam Thuận","Cam Thịnh Đông","Cam Thịnh Tây"],
    "Phan Rang - Tháp Chàm": ["Bảo An","Đài Sơn","Đông Hải","Đô Vinh","Kinh Dinh","Mỹ Bình","Mỹ Đông","Mỹ Hải","Phủ Hà","Phước Mỹ","Tấn Tài","Thanh Sơn"]
  },
  "Lâm Đồng": {
    "Đà Lạt": ["1","2","3","4","5","6","7","8","9","10","11","12","Tà Nung","Xuân Thọ","Xuân Trường"],
    "Bảo Lộc": ["B'Lao","Đại Lào","Lộc Châu","Lộc Phát","Lộc Sơn","Lộc Tiến","Lộc Thanh","Lộc Thành"]
  },
  "Bình Phước - Tây Ninh": {
    "Đồng Xoài": ["Tân Bình","Tân Đồng","Tân Phú","Tân Thiện","Tiến Hưng","Tiến Thành"],
    "Tây Ninh": ["1","2","3","4","Hiệp Ninh","Long Hoa","Long Thành Bắc","Long Thành Nam","Long Thành Trung","Ninh Sơn","Ninh Thạnh"]
  },
  "Long An - Tiền Giang": {
    "Tân An": ["1","2","3","4","5","6","7","Bình Tâm","Khánh Hậu","Lợi Bình Nhơn","Tân Khánh","Tân Phước","Thạnh Đức"],
    "Mỹ Tho": ["1","2","3","4","5","6","7","8","9","10","Đạo Thạnh","Mỹ Phong","Phước Thạnh","Tân Long","Trung An"]
  },
  "Vĩnh Long - Trà Vinh - Bến Tre": {
    "Vĩnh Long": ["1","2","3","4","5","8","9","Tân Hoà","Tân Ngãi","Tân Hội","Trường An"],
    "Trà Vinh": ["1","2","3","4","5","6","7","8","9"],
    "Bến Tre": ["An Hội","Phú Khương","Phú Tân","Phú Tiên","Sơn Đông"]
  },
  "Đồng Tháp - An Giang": {
    "Cao Lãnh": ["1","2","3","4","6","11","Mỹ Phú","Mỹ Tân","Tịnh Thới"],
    "Long Xuyên": ["Bình Đức","Bình Khánh","Đông Xuyên","Mỹ Bình","Mỹ Hoà","Mỹ Long","Mỹ Phước","Mỹ Quý","Mỹ Thạnh","Mỹ Xuyên"],
    "Châu Đốc": ["Châu Phú A","Châu Phú B","Núi Sam","Vĩnh Mỹ","Vĩnh Ngươn"]
  },
  "Kiên Giang - Cà Mau": {
    "Rạch Giá": ["An Bình","An Hoà","Rạch Sỏi","Vĩnh Bảo","Vĩnh Hiệp","Vĩnh Hoà","Vĩnh Lạc","Vĩnh Lợi","Vĩnh Quang","Vĩnh Thanh","Vĩnh Thông"],
    "Cà Mau": ["1","2","4","5","6","7","8","9","An Xuyên","Lý Văn Lâm","Tân Thành","Tân Xuyên"]
  },
  "Hậu Giang - Sóc Trăng": {
    "Vị Thanh": ["1","3","5","7","Hoả Lựu","Hoả Tiến","Tân Tiến","Vị Tân"],
    "Sóc Trăng": ["1","2","3","4","5","6","7","8","9","10"]
  },
  "Bắc Ninh - Bắc Giang": {
    "Bắc Ninh": ["Đáp Cầu","Hoà Long","Kinh Bắc","Ninh Xá","Suối Hoa","Tiền An","Vũ Ninh","Vân Dương"],
    "Bắc Giang": ["Dĩnh Kế","Hoàng Văn Thụ","Lê Lợi","Mỹ Độ","Ngô Quyền","Song Mai","Thọ Xương","Tân Mỹ","Trần Nguyên Hãn","Xương Giang"]
  },
  "Hưng Yên - Thái Bình": {
    "Hưng Yên": ["An Tảo","Hiến Nam","Hồng Châu","Lam Sơn","Lê Lợi","Minh Khai","Phú Cường","Quảng Châu"],
    "Thái Bình": ["Bồ Xuyên","Đề Thám","Hoàng Diệu","Kỳ Bá","Lê Hồng Phong","Phú Khánh","Quang Trung","Tiền Phong","Trần Hưng Đạo","Trần Lãm"]
  },
  "Nam Định - Ninh Bình": {
    "Nam Định": ["Bà Triệu","Cửa Bắc","Cửa Nam","Hạ Long","Lê Hồng Phong","Lộc Hạ","Lộc Hoà","Lộc Vượng","Mỹ Xá","Năng Tĩnh","Ngô Quyền","Nguyễn Du","Quang Trung","Thống Nhất","Trần Đăng Ninh","Trần Tế Xương","Trường Thi","Văn Miếu","Vị Hoàng","Vị Xuyên"]
  },
  "Hải Dương - Hưng Yên": {
    "Hải Dương": ["Ái Quốc","Bình Hàn","Cẩm Thượng","Cẩm Thượng","Hải Tân","Lê Thanh Nghị","Nam Đồng","Ngọc Châu","Nguyễn Trãi","Nhị Châu","Phạm Ngũ Lão","Thanh Bình","Tứ Minh","Việt Hoà"]
  },
  "Phú Thọ - Yên Bái - Lào Cai": {
    "Việt Trì": ["Bạch Hạc","Bến Gót","Dữu Lâu","Gia Cẩm","Minh Phương","Nông Trang","Phượng Lâu","Tân Dân","Thanh Miếu","Thọ Sơn","Tiên Cát","Vân Cơ","Vân Phú"],
    "Yên Bái": ["Đồng Tâm","Hồng Hà","Minh Tân","Nam Cường","Nguyễn Phúc","Nguyễn Thái Học","Tân Thịnh","Yên Ninh","Yên Thịnh"],
    "Lào Cai": ["Bắc Cường","Bắc Lệnh","Cốc Lếu","Duyên Hải","Kim Tân","Lào Cai","Nam Cường","Phố Mới","Pom Hán","Thống Nhất","Xuân Tăng"]
  },
  "Sơn La - Điện Biên - Lai Châu": {
    "Sơn La": ["Chiềng An","Chiềng Cơi","Chiềng Lề","Chiềng Ngần","Chiềng Sinh","Quyết Tâm","Quyết Thắng"],
    "Điện Biên Phủ": ["Him Lam","Mường Thanh","Nam Thanh","Noong Bua","Noong Thanh","Tân Thanh","Thanh Bình","Thanh Trường"]
  },
  "Thái Nguyên - Bắc Kạn": {
    "Thái Nguyên": ["Cam Giá","Đồng Quang","Gia Sàng","Hoàng Văn Thụ","Hương Sơn","Phan Đình Phùng","Phú Xá","Quang Trung","Tân Long","Tân Thịnh","Thịnh Đán","Tích Lương","Trung Thành","Túc Duyên"]
  },
  "Quảng Ninh": {
    "Hạ Long": ["Bãi Cháy","Bạch Đằng","Cao Thắng","Cao Xanh","Đại Yên","Giếng Đáy","Hà Khánh","Hà Khẩu","Hà Lầm","Hà Phong","Hà Trung","Hà Tu","Hồng Gai","Hồng Hà","Hùng Thắng","Tuần Châu","Trần Hưng Đạo","Việt Hưng","Yết Kiêu"],
    "Móng Cái": ["Bình Ngọc","Hải Hoà","Hải Xuân","Hoà Lạc","Ka Long","Ninh Dương","Trà Cổ","Trần Phú"],
    "Cẩm Phả": ["Cẩm Bình","Cẩm Đông","Cẩm Phú","Cẩm Sơn","Cẩm Tây","Cẩm Thạch","Cẩm Thành","Cẩm Thịnh","Cẩm Thuỷ","Cẩm Trung","Cửa Ông","Mông Dương","Quang Hanh"],
    "Uông Bí": ["Phương Đông","Phương Nam","Quang Trung","Thanh Sơn","Trưng Vương","Vàng Danh","Yên Thanh"]
  },
  "Vĩnh Phúc - Phú Thọ": {
    "Vĩnh Yên": ["Định Trung","Đống Đa","Hội Hợp","Khai Quang","Liên Bảo","Ngô Quyền","Tích Sơn"],
    "Phúc Yên": ["Nam Viêm","Ngọc Thanh","Phúc Thắng","Trưng Trắc","Xuân Hoà"]
  },
  "Hà Nam - Nam Định": {
    "Phủ Lý": ["Châu Sơn","Hai Bà Trưng","Lam Hạ","Lê Hồng Phong","Liêm Chính","Liêm Tiết","Minh Khai","Phù Vân","Quang Trung","Thanh Châu","Thanh Tuyền","Tiên Hiệp","Tiên Tân","Trần Hưng Đạo"]
  },
  "Bình Thuận": {
    "Phan Thiết": ["Bình Hưng","Đức Long","Đức Nghĩa","Đức Thắng","Hàm Tiến","Hưng Long","Lạc Đạo","Mũi Né","Phú Hài","Phú Tài","Phú Thuỷ","Phú Trinh","Thanh Hải","Tiến Lợi","Tiến Thành"]
  },
  "Gia Lai - Kon Tum - Đắk Lắk": {
    "Pleiku": ["An Phú","Biển Hồ","Chư Á","Diên Phú","Đống Đa","Hoa Lư","Ia Grai","Ia Kênh","Phù Đổng","Tây Sơn","Thắng Lợi","Thống Nhất","Trà Đa","Trần Hưng Đạo","Yên Đổ","Yên Thế"],
    "Kon Tum": ["Duy Tân","Đắk Blà","Đắk Rơ Wa","Lê Lợi","Ngô Mây","Nguyễn Trãi","Quang Trung","Thắng Lợi","Trần Hưng Đạo","Vinh Quang","Xương Huân"],
    "Buôn Ma Thuột": ["An Lạc","Ea Tam","Hiệp Thắng","Hoà Khánh","Hoà Phú","Hoà Thắng","Hoà Thuận","Khánh Xuân","Tân An","Tân Hoà","Tân Lập","Tân Lợi","Tân Thành","Thắng Lợi","Thành Công","Thành Nhất","Thống Nhất","Tự An"]
  },
  "Đắk Nông - Lâm Đồng": {
    "Gia Nghĩa": ["Đắk Nia","Nghĩa Phú","Nghĩa Tân","Nghĩa Thành","Nghĩa Trung","Quảng Thành","Quảng Thịnh"]
  }
};

window.VN_ADDRESS = VN_ADDRESS;
