using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using HotelManagement;
using iTextSharp.text.pdf;
using iTextSharp.text;
using PagedList;

namespace HotelManagement.Areas.Admin.Controllers
{
    public class InvoiceController : Controller
    {
        private Hotel_ManagementEntities db = new Hotel_ManagementEntities();

        // GET: Admin/Invoice
        public ActionResult Index(int? page)
        {
            int pageSize = 10; // Số lượng hóa đơn trên mỗi trang
            int pageNumber = (page ?? 1); // Số trang hiện tại

            var hoaDons = db.HoaDons.Include(h => h.NhanVien).Include(h => h.KhachHang).Include(h => h.PhieuDangKy)
                            .ToList().ToPagedList(pageNumber, pageSize);

            return View(hoaDons);
        }

        // GET: Admin/Invoice/Details/5
        public ActionResult Details(string id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            ViewBag.IDInvoice = id;
            HoaDon hoaDon = db.HoaDons.Find(id);
            if (hoaDon == null)
            {
                return HttpNotFound();
            }
            return View(hoaDon);
        }

        // GET: Admin/Invoice/Create
        public ActionResult Create()
        {
            ViewBag.MaNhanVien = new SelectList(db.NhanViens, "MaNhanVien", "CCCD");
            ViewBag.MaKhachHang = new SelectList(db.KhachHangs, "MaKhachHang", "CCCD");
            ViewBag.MaPhieu = new SelectList(db.PhieuDangKies, "MaPhieu", "HienTrang");
            return View();
        }

        // POST: Admin/Invoice/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "MaHoaDon,NgayLapHoaDon,TienPhong,TienDichVu,MaKhachHang,MaNhanVien,MaPhieu")] HoaDon hoaDon)
        {
            if (ModelState.IsValid)
            {
                db.HoaDons.Add(hoaDon);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            ViewBag.MaNhanVien = new SelectList(db.NhanViens, "MaNhanVien", "CCCD", hoaDon.MaNhanVien);
            ViewBag.MaKhachHang = new SelectList(db.KhachHangs, "MaKhachHang", "CCCD", hoaDon.MaKhachHang);
            ViewBag.MaPhieu = new SelectList(db.PhieuDangKies, "MaPhieu", "HienTrang", hoaDon.MaPhieu);
            return View(hoaDon);
        }

        // GET: Admin/Invoice/Edit/5
        public ActionResult Edit(string id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            HoaDon hoaDon = db.HoaDons.Find(id);
            if (hoaDon == null)
            {
                return HttpNotFound();
            }
            ViewBag.MaNhanVien = new SelectList(db.NhanViens, "MaNhanVien", "CCCD", hoaDon.MaNhanVien);
            ViewBag.MaKhachHang = new SelectList(db.KhachHangs, "MaKhachHang", "CCCD", hoaDon.MaKhachHang);
            ViewBag.MaPhieu = new SelectList(db.PhieuDangKies, "MaPhieu", "HienTrang", hoaDon.MaPhieu);
            return View(hoaDon);
        }

        // POST: Admin/Invoice/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "MaHoaDon,NgayLapHoaDon,TienPhong,TienDichVu,MaKhachHang,MaNhanVien,MaPhieu")] HoaDon hoaDon)
        {
            if (ModelState.IsValid)
            {
                db.Entry(hoaDon).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.MaNhanVien = new SelectList(db.NhanViens, "MaNhanVien", "CCCD", hoaDon.MaNhanVien);
            ViewBag.MaKhachHang = new SelectList(db.KhachHangs, "MaKhachHang", "CCCD", hoaDon.MaKhachHang);
            ViewBag.MaPhieu = new SelectList(db.PhieuDangKies, "MaPhieu", "HienTrang", hoaDon.MaPhieu);
            return View(hoaDon);
        }

        // GET: Admin/Invoice/Delete/5
        public ActionResult Delete(string id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            HoaDon hoaDon = db.HoaDons.Find(id);
            if (hoaDon == null)
            {
                return HttpNotFound();
            }
            return View(hoaDon);
        }

        // POST: Admin/Invoice/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(string id)
        {
            HoaDon hoaDon = db.HoaDons.Find(id);
            db.HoaDons.Remove(hoaDon);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        [Route("Search")]
        public async Task<ActionResult> Search(DateTime? ngayDau, DateTime? ngayCuoi, int? page)
        {
            int pageSize = 10; // Số lượng hoá đơn trên mỗi trang
            int pageNumber = (page ?? 1); // Số trang hiện tại, mặc định là 1 nếu không có trang được chọn

            IQueryable<HoaDon> query = db.HoaDons;

            if (ngayDau.HasValue)
            {
                query = query.Where(hd => hd.NgayLapHoaDon >= ngayDau.Value);
            }

            if (ngayCuoi.HasValue)
            {
                query = query.Where(hd => hd.NgayLapHoaDon <= ngayCuoi.Value);
            }

            // Trả về danh sách hoá đơn được phân trang
            var ketqua = query.OrderByDescending(h => h.NgayLapHoaDon).ToPagedList(pageNumber, pageSize);

            return View("Index", ketqua);
        }

        public ActionResult GenerateReport(string id)
        {
            string pathToFontFile = Server.MapPath("~/Assets/admin/Fonts/arial.ttf");
            BaseFont baseFont = BaseFont.CreateFont(pathToFontFile, BaseFont.IDENTITY_H, BaseFont.EMBEDDED);
            Font normalFont = new Font(baseFont, 12, Font.NORMAL, BaseColor.BLACK);
            Font boldFont = new Font(baseFont, 20, Font.BOLDITALIC, BaseColor.MAGENTA);
            Font blackBoldFont = new Font(baseFont, 14, Font.BOLD, BaseColor.BLACK);
            Font blueBoldFont = new Font(baseFont, 12, Font.BOLD, BaseColor.BLUE);
            Font darkGrayFont = new Font(baseFont, 12, Font.NORMAL, BaseColor.DARK_GRAY);
            // Tạo một Document mới với iTextSharp
            Document pdfDoc = new Document(PageSize.A4, 25, 25, 25, 15);
            MemoryStream memoryStream = new MemoryStream();
            PdfWriter pdfWriter = PdfWriter.GetInstance(pdfDoc, memoryStream);

            // Mở Document
            pdfDoc.Open();

            // Các thông tin hoá đơn
            var invoice = db.HoaDons.FirstOrDefault(h => h.MaHoaDon == id);
            DateTime invoiceDate = invoice.NgayLapHoaDon;
            string staffName = invoice.NhanVien.TenNhanVien;
            string invoiceCode = invoice.MaHoaDon;
            string guestName = invoice.KhachHang.TenKhachHang;
            DateTime CheckIn = (DateTime)invoice.PhieuDangKy.ThoiGianNhanPhong;
            DateTime CheckOut = (DateTime)invoice.PhieuDangKy.ThoiGianTraPhong;
            string roomPrice = invoice.TienPhong.ToString("#,##0").Replace(",", ".") + " VNĐ";
            string servicePrice = "";
            if (invoice.TienDichVu != null)
            {
                servicePrice = invoice.TienDichVu.Value.ToString("#,##0").Replace(",", ".") + " VNĐ";
            }
            else
            {
                // Nếu giá trị tienDichVu là null, bạn có thể đặt một giá trị mặc định hoặc thông báo khác tùy thuộc vào yêu cầu của bạn.
                 servicePrice = "N/A"; // Hoặc bất kỳ thông báo nào khác bạn muốn hiển thị khi không có giá trị.
            }

            // Lấy thông tin các dịch vụ từ cơ sở dữ liệu
            var danhSachDichVu = (from HD in db.HoaDons
                                  join CTHDDV in db.ChiTietHoaDonDichVus on HD.MaHoaDon equals CTHDDV.MaHoaDon
                                  join DV in db.DichVus on CTHDDV.MaDichVu equals DV.MaDichVu
                                  where HD.MaHoaDon == id
                                  select new
                                  {
                                      TenDichVu = DV.TenDichVu,
                                      SoLuong = CTHDDV.SoLuong,
                                      Gia = DV.GiaDichVu,
                                      Tong = CTHDDV.SoLuong * DV.GiaDichVu
                                  }).ToList();

            var phongInfo = (from HD in db.HoaDons
                             join CTT in db.ChiTietThues on HD.MaPhieu equals CTT.MaPhieu
                             join P in db.Phongs on CTT.MaPhong equals P.MaPhong
                             join LP in db.LoaiPhongs on P.MaLoaiPhong equals LP.MaLoaiPhong
                             join PDK in db.PhieuDangKies on CTT.MaPhieu equals PDK.MaPhieu
                             where HD.MaHoaDon == id
                             select new
                             {
                                 MaPhong = P.MaPhong,
                                 TenLoaiPhong = LP.TenLoaiPhong,
                                 GiaLoaiPhong = LP.GiaLoaiPhong,
                                 ThoiGianNhanPhong = PDK.ThoiGianNhanPhong,
                                 ThoiGianTraPhong = PDK.ThoiGianTraPhong
                             }).ToList();

            // Tạo bảng chứa thông tin
            PdfPTable table = new PdfPTable(2);
            table.WidthPercentage = 100;

            // Cột bên trái
            PdfPCell leftCell = new PdfPCell();
            leftCell.Border = PdfPCell.NO_BORDER;

            Chunk roomChunk = new Chunk($"Invoice {invoiceCode}", boldFont);
            Paragraph roomParagraph = new Paragraph(roomChunk);
            roomParagraph.Alignment = Element.ALIGN_LEFT;
            leftCell.AddElement(roomParagraph);

            Chunk customerInfoChunk = new Chunk($"Customer Name: {guestName}\nCheck-In Date: {CheckIn.ToString("dd-MM-yyyy")}\nCheck-Out Date: {CheckOut.ToString("dd-MM-yyyy")}\nInvoice Date: {invoiceDate.ToString("dd-MM-yyyy")}\nStaff Name: {staffName}", normalFont);
            Paragraph customerInfoParagraph = new Paragraph(customerInfoChunk);
            customerInfoParagraph.Alignment = Element.ALIGN_LEFT;
            customerInfoParagraph.SpacingBefore = 20f;
            leftCell.AddElement(customerInfoParagraph);

            // Cột bên phải
            PdfPCell rightCell = new PdfPCell();
            rightCell.Border = PdfPCell.NO_BORDER;

            rightCell.PaddingTop = 20; // Điều chỉnh khoảng cách phía trên

            Chunk invoiceChunk = new Chunk("Contact", blackBoldFont);
            Paragraph invoiceParagraph = new Paragraph(invoiceChunk);
            invoiceParagraph.Alignment = Element.ALIGN_RIGHT;
            rightCell.AddElement(invoiceParagraph);

            Chunk otherInfoChunk = new Chunk("219 To Ngoc Van\nLinh Dong Ward\nHo Chi Minh City\nPhone: 0901092207\nEmail:phangiadat123@gmail.com", normalFont);
            Paragraph otherInfoParagraph = new Paragraph(otherInfoChunk);
            otherInfoParagraph.Alignment = Element.ALIGN_RIGHT;
            otherInfoParagraph.SpacingBefore = 10f;
            rightCell.AddElement(otherInfoParagraph);

            table.AddCell(leftCell);
            table.AddCell(rightCell);

            pdfDoc.Add(table);

            Paragraph line = new Paragraph(new Chunk(new iTextSharp.text.pdf.draw.LineSeparator(0.0F, 100.0F, BaseColor.BLACK, Element.ALIGN_LEFT, 1)));
            pdfDoc.Add(line);

            if (danhSachDichVu != null && danhSachDichVu.Any())
            {
                Chunk servicesUsedChunk = new Chunk("Services Used", blueBoldFont);
                Paragraph servicesUsedParagraph = new Paragraph(servicesUsedChunk);
                servicesUsedParagraph.SpacingBefore = 20f;
                pdfDoc.Add(servicesUsedParagraph);

                // Tạo bảng và thêm các dòng dữ liệu từ danh sách các dịch vụ vào bảng
                PdfPTable serviceTable = new PdfPTable(4);
                serviceTable.WidthPercentage = 100;
                serviceTable.HorizontalAlignment = 0;
                serviceTable.SpacingBefore = 10f;
                serviceTable.SpacingAfter = 20f;

                // Tạo các ô tiêu đề của bảng với font đã định nghĩa
                PdfPCell cell1 = new PdfPCell(new Phrase("Service Name", normalFont));
                serviceTable.AddCell(cell1);

                PdfPCell cell2 = new PdfPCell(new Phrase("Quantity", normalFont));
                serviceTable.AddCell(cell2);

                PdfPCell cell3 = new PdfPCell(new Phrase("Price", normalFont));
                serviceTable.AddCell(cell3);

                PdfPCell cell4 = new PdfPCell(new Phrase("Total", normalFont));
                serviceTable.AddCell(cell4);

                // Thêm các dòng dữ liệu từ danh sách các dịch vụ vào bảng
                foreach (var dichVu in danhSachDichVu)
                {
                    // Tạo các ô dữ liệu với font đã định nghĩa
                    PdfPCell serviceNameCell = new PdfPCell(new Phrase(dichVu.TenDichVu, normalFont));
                    serviceTable.AddCell(serviceNameCell);

                    PdfPCell quantityCell = new PdfPCell(new Phrase(dichVu.SoLuong.ToString(), normalFont));
                    serviceTable.AddCell(quantityCell);

                    PdfPCell priceCell = new PdfPCell(new Phrase(dichVu.Gia.ToString("#,##0").Replace(",", ".") + " VNĐ", normalFont)); // Định dạng giá tiền
                    serviceTable.AddCell(priceCell);

                    PdfPCell totalSCell = new PdfPCell(new Phrase(dichVu.Tong.ToString("#,##0").Replace(",", ".") + " VNĐ", normalFont));
                    serviceTable.AddCell(totalSCell);
                }
                PdfPCell emptyCell = new PdfPCell(new Phrase("Total", normalFont));
                emptyCell.Colspan = 3; // Sáp nhập 3 cột
                serviceTable.AddCell(emptyCell); // Thêm ô trống

                // Thêm ô chứa giá trị tổng số tiền cho tất cả các dịch vụ
                PdfPCell totalServicesCell = new PdfPCell(new Phrase(servicePrice, normalFont));
                serviceTable.AddCell(totalServicesCell); // Thêm ô chứa tổng số tiền

                pdfDoc.Add(serviceTable);
            }

            Chunk roomUsedChunk = new Chunk("Booked room", blueBoldFont);
            Paragraph roomUsedParagraph = new Paragraph(roomUsedChunk);
            roomUsedParagraph.SpacingBefore = 20f;
            pdfDoc.Add(roomUsedParagraph);

            PdfPTable roomTable = new PdfPTable(5); // Thêm một cột mới
            roomTable.WidthPercentage = 100;
            roomTable.HorizontalAlignment = 0;
            roomTable.SpacingBefore = 10f;
            roomTable.SpacingAfter = 20f;

            // Thêm các ô tiêu đề của bảng
            PdfPCell cell_1 = new PdfPCell(new Phrase("Room ID", normalFont));
            roomTable.AddCell(cell_1);

            PdfPCell cell_2 = new PdfPCell(new Phrase("Room Type", normalFont));
            roomTable.AddCell(cell_2);

            PdfPCell cell_3 = new PdfPCell(new Phrase("Room Price", normalFont));
            roomTable.AddCell(cell_3);

            PdfPCell cell_4 = new PdfPCell(new Phrase("Duration", normalFont)); // Tiêu đề cho cột thời gian thuê phòng
            roomTable.AddCell(cell_4);

            PdfPCell cell_5 = new PdfPCell(new Phrase("Total Price", normalFont)); // Tiêu đề cho cột tổng tiền
            roomTable.AddCell(cell_5);

            // Thêm dữ liệu từ kết quả câu truy vấn vào bảng
            foreach (var phong in phongInfo)
            {
                // Tạo các ô dữ liệu với font đã định nghĩa
                PdfPCell roomIdCell = new PdfPCell(new Phrase(phong.MaPhong, normalFont));
                roomTable.AddCell(roomIdCell);

                PdfPCell roomTypeCell = new PdfPCell(new Phrase(phong.TenLoaiPhong, normalFont));
                roomTable.AddCell(roomTypeCell);

                PdfPCell roomPriceCell = new PdfPCell(new Phrase(phong.GiaLoaiPhong.ToString("#,##0").Replace(",", ".") + " VNĐ", normalFont)); // Định dạng giá tiền
                roomTable.AddCell(roomPriceCell);

                // Tính thời gian thuê phòng
                TimeSpan thoiGianThuePhong = (TimeSpan)(phong.ThoiGianTraPhong - phong.ThoiGianNhanPhong);
                string duration = $"{thoiGianThuePhong.TotalDays} "; // Đổi sang số ngày (có thể thay đổi theo nhu cầu)
                PdfPCell durationCell = new PdfPCell(new Phrase(duration, normalFont));
                roomTable.AddCell(durationCell);

                // Tính tổng tiền của từng phòng
                double totalPrice = (double)phong.GiaLoaiPhong * thoiGianThuePhong.TotalDays;
                PdfPCell totalPriceCell = new PdfPCell(new Phrase(totalPrice.ToString("#,##0").Replace(",", ".") + " VNĐ", normalFont)); // Định dạng tổng tiền
                roomTable.AddCell(totalPriceCell);
            }

            PdfPCell totalCell = new PdfPCell(new Phrase("Total", normalFont));
            totalCell.Colspan = 4; // Sáp nhập 4 cột
            roomTable.AddCell(totalCell); // Thêm ô trống

            PdfPCell totalRoomCell = new PdfPCell(new Phrase(roomPrice, normalFont));
            roomTable.AddCell(totalRoomCell); // Thêm ô chứa tổng số tiền

            pdfDoc.Add(roomTable);


            Paragraph finalPara = new Paragraph($"Hello {guestName},\n\nThank you for being our valuable customer. We hope our letter finds you in the best of health and wealth.\n\nYours Sincerely, \nHotel", normalFont);
            pdfDoc.Add(finalPara);

            pdfWriter.CloseStream = false;
            pdfDoc.Close();

            // Chuẩn bị tệp PDF để tải về
            byte[] bytes = memoryStream.ToArray();
            memoryStream.Close();

            return File(bytes, "application/pdf", $"Invoice-{invoiceCode}.pdf");
            //return File(new FileStream("Invoice.pdf", FileMode.Open), "application/pdf");
        }
    }
}
