using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Runtime.Remoting.Messaging;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using HotelManagement;
using PagedList;

namespace HotelManagement.Areas.Admin.Controllers
{
    public class RegistrationFormController : Controller
    {
        private Hotel_ManagementEntities db = new Hotel_ManagementEntities();

        // GET: Admin/RegistrationForm
        //public ActionResult Index(int? page)
        //{
        //    int pageSize = 10; // Số lượng phiếu đăng ký trên mỗi trang
        //    int pageNumber = (page ?? 1); // Số trang hiện tại, mặc định là 1 nếu không có trang được chọn

        //    var phieuThues = db.PhieuDangKies.Include(p => p.KhachHang)
        //        .OrderByDescending(p => p.HienTrang == "Chưa nhận phòng")
        //        .ThenByDescending(p => p.HienTrang == "Đã nhận phòng")
        //        .ToPagedList(pageNumber, pageSize); // Thực hiện phân trang cho danh sách phiếu đăng ký

        //    return View(phieuThues);
        //}

        public ActionResult Index(int? page, string filter)
        {
            int pageSize = 10;
            int pageNumber = (page ?? 1);

            IQueryable<PhieuDangKy> query = db.PhieuDangKies.Include(p => p.KhachHang).OrderByDescending(p => p.NgayLap);

            if (!string.IsNullOrEmpty(filter))
            {
                // Lọc theo giá trị của filter
                switch (filter)
                {
                    case "ChuaNhanPhong":
                        query = query.Where(p => p.HienTrang == "Chưa nhận phòng");
                        break;
                    case "DaNhanPhong":
                        query = query.Where(p => p.HienTrang == "Đã nhận phòng");
                        break;
                    case "DaHuyPhong":
                        query = query.Where(p => p.HienTrang == "Đã hủy phòng");
                        break;
                    case "DaTraPhong":
                        query = query.Where(p => p.HienTrang == "Đã trả phòng");
                        break;
                    default:
                        break;
                }
            }
            else
            {
                query = query.Where(p => p.HienTrang == "Chưa nhận phòng");
            }

            ViewBag.Filter = filter;

            var phieuThues = query.ToPagedList(pageNumber, pageSize);

            return View(phieuThues);
        }



        // GET: Admin/RegistrationForm/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            PhieuDangKy phieuDangKy = db.PhieuDangKies.Find(id);
            if (phieuDangKy == null)
            {
                return HttpNotFound();
            }
            return View(phieuDangKy);
        }

        // GET: Admin/RegistrationForm/Create
        public ActionResult Create()
        {
            ViewBag.MaLoaiPhong = new SelectList(db.LoaiPhongs, "MaLoaiPhong", "TenLoaiPhong");
            ViewBag.DSPhong = new SelectList(db.Phongs, "MaPhong", "MaPhong");

            return View();
        }

        // POST: Admin/RegistrationForm/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "MaPhieu,NgayLap,ThoiGianNhanPhong,ThoiGianTraPhong,HienTrang,MaKhachHang")] PhieuDangKy phieuDangKy, string phoneNumber)
        {
            var existingGuest = db.KhachHangs.Where(kh => kh.SoDienThoai == phoneNumber).FirstOrDefault();
            if (existingGuest == null)
            {
                ModelState.AddModelError("phoneNumber", "Không tồn tại khác hàng có số điện thoại này");
            }
            if (ModelState.IsValid)
            {
                phieuDangKy.MaKhachHang = db.KhachHangs.Where(kh => kh.SoDienThoai == phoneNumber).Select(kh => kh.MaKhachHang).FirstOrDefault();
                phieuDangKy.NgayLap = DateTime.Now.Date;
                phieuDangKy.HienTrang = "Chưa nhận phòng";

                db.PhieuDangKies.Add(phieuDangKy);
                var listPhong = Session["listPhong"] as List<ChiTietThue>;
                if(listPhong == null)
                {
                    ModelState.AddModelError("CustomError", "Hãy thêm phòng cần đặt!");
                    ViewBag.MaLoaiPhong = new SelectList(db.LoaiPhongs, "MaLoaiPhong", "TenLoaiPhong");
                    ViewBag.DSPhong = new SelectList(db.Phongs, "MaPhong", "MaPhong");
                    return View(phieuDangKy); 
                } 
                else {
                    foreach (var phong in listPhong)
                    {
                        var newChiTietThue = new ChiTietThue
                        {
                            MaPhieu = phieuDangKy.MaPhieu,
                            MaPhong = phong.MaPhong,
                            SoNguoiO = phong.SoNguoiO
                        };

                        db.ChiTietThues.Add(newChiTietThue);
                    }

                    db.SaveChanges();
                    return RedirectToAction("Index");
                }
                
            }
            ViewBag.MaLoaiPhong = new SelectList(db.LoaiPhongs, "MaLoaiPhong", "TenLoaiPhong");
            ViewBag.DSPhong = new SelectList(db.Phongs, "MaPhong", "MaPhong");
            ViewBag.MaKhachHang = new SelectList(db.KhachHangs, "MaKhachHang", "CCCD", phieuDangKy.MaKhachHang);
            return View(phieuDangKy);
        }

        // GET: Admin/RegistrationForm/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            PhieuDangKy phieuDangKy = db.PhieuDangKies.Find(id);
            if (phieuDangKy == null)
            {
                return HttpNotFound();
            }
            ViewBag.MaKhachHang = new SelectList(db.KhachHangs, "MaKhachHang", "CCCD", phieuDangKy.MaKhachHang);
            ViewBag.DichVu = new SelectList(db.DichVus, "MaDichVu", "TenDichVu");
            return View(phieuDangKy);
        }

        // POST: Admin/RegistrationForm/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(int MaPhieu, string HienTrang)
        {
            PhieuDangKy phieuDangKy = db.PhieuDangKies.Find(MaPhieu);

            if (phieuDangKy == null)
            {
                return HttpNotFound();
            }
            if (HienTrang == "Đã nhận phòng")
            {
                if (phieuDangKy.ThoiGianNhanPhong > DateTime.Today)
                {
                    ModelState.AddModelError("CustomError", "Không thể nhận phòng vì chưa tới ngày nhận phòng!");
                    return View(phieuDangKy); // Trả về view để hiển thị thông báo lỗi
                }
            }
            if (HienTrang == "Đã trả phòng")
            {
                HoaDon hoaDon = phieuDangKy.HoaDons.FirstOrDefault();

                if (hoaDon != null)
                {
                    // Thực hiện các thao tác cần thiết với hoaDon
                    hoaDon.MaNhanVien = Convert.ToInt32(Session["MaNV"]);
                    db.HoaDons.Attach(hoaDon);
                    db.Entry(hoaDon).Property(x => x.MaNhanVien).IsModified = true;
                    db.SaveChanges();
                }
            }
            var listService = Session["listService"] as List<ChiTietHoaDonDichVu>;
            if (listService != null)
            {
                foreach (var service in listService)
                {
                    var newService = new ChiTietHoaDonDichVu
                    {
                        MaHoaDon = phieuDangKy.HoaDons.FirstOrDefault().MaHoaDon,
                        MaDichVu = service.MaDichVu,
                        SoLuong = service.SoLuong
                    };
                    db.ChiTietHoaDonDichVus.Add(newService);
                    db.SaveChanges();
                }
            }

            phieuDangKy.HienTrang = HienTrang;
            db.PhieuDangKies.Attach(phieuDangKy);
            db.Entry(phieuDangKy).Property(x => x.HienTrang).IsModified = true;

            db.SaveChanges();
            ViewBag.DichVu = new SelectList(db.DichVus, "MaDichVu", "TenDichVu");
            return RedirectToAction("Index");
        }

        // GET: Admin/RegistrationForm/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            PhieuDangKy phieuDangKy = db.PhieuDangKies.Find(id);
            if (phieuDangKy == null)
            {
                return HttpNotFound();
            }
            return View(phieuDangKy);
        }

        // POST: Admin/RegistrationForm/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            PhieuDangKy phieuDangKy = db.PhieuDangKies.Find(id);
            db.PhieuDangKies.Remove(phieuDangKy);
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
        public async Task<ActionResult> Search(string sdt, int? page)
        {
            int pageSize = 10; // Số lượng kết quả tìm kiếm trên mỗi trang
            int pageNumber = (page ?? 1); // Số trang hiện tại, mặc định là 1 nếu không có trang được chọn

            IQueryable<PhieuDangKy> query = db.PhieuDangKies;

            if (!string.IsNullOrEmpty(sdt))
            {
                query = query.Where(pt => pt.KhachHang.SoDienThoai.ToLower().Contains(sdt.ToLower()));
            }

            var ketqua = query.OrderByDescending(p => p.HienTrang == "Chưa nhận phòng")
                                    .ThenByDescending(p => p.HienTrang == "Đã nhận phòng")
                                    .ToPagedList(pageNumber, pageSize); // Thực hiện phân trang cho kết quả tìm kiếm

            return View("Index", ketqua);
        }

        [HttpPost]
        public ActionResult AddBookRoom(string maPhong, byte soNguoiO)
        {
            // Lấy danh sách sách đã mượn từ Session hoặc tạo danh sách mới nếu chưa tồn tại
            List<ChiTietThue> listPhong;

            if (Session["listPhong"] == null)
            {
                listPhong = new List<ChiTietThue>();
            }
            else
            {
                listPhong = (List<ChiTietThue>)Session["listPhong"];
            }

            // Nếu chưa tồn tại, thêm sách mới vào danh sách
            var phongMoi = new ChiTietThue
            {
                MaPhong = maPhong,
                SoNguoiO = soNguoiO
            };

            listPhong.Add(phongMoi);
            // Lưu danh sách đã cập nhật vào Session
            Session["listPhong"] = listPhong;

            // Trả về một JsonResult chứa danh sách sách đã cập nhật
            return Json(listPhong);
        }

        [HttpPost]
        public ActionResult DeleteBookRoom(string maPhong)
        {
            // Lấy danh sách sách đã mượn từ Session hoặc tạo danh sách mới nếu chưa tồn tại
            List<ChiTietThue> listPhong = Session["listPhong"] as List<ChiTietThue> ?? new List<ChiTietThue>();

            // Tìm và xóa sách khỏi danh sách dựa trên mã sách
            var room = listPhong.FirstOrDefault(s => s.MaPhong == maPhong);
            if (room != null)
            {
                listPhong.Remove(room);
                Session["listPhong"] = listPhong;
                return Json(new { success = true });
            }

            return Json(new { success = false });
        }

        public ActionResult GetRoomsByRoomTypeID(string maLoaiPhong, DateTime? checkIn, DateTime? checkOut)
        {
            // Lấy danh sách các phòng thuộc loại phòng maLoaiPhong và không trùng với ngày check-in và check-out
            var roomList = db.Phongs.Where(p => p.MaLoaiPhong == maLoaiPhong).Select(p => p.MaPhong).ToList();
            var bookedRoomList = db.ChiTietThues
    .Where(pt => pt.PhieuDangKy.ThoiGianNhanPhong != null && pt.PhieuDangKy.ThoiGianTraPhong != null && (pt.PhieuDangKy.HienTrang == "Chưa nhận phòng" || pt.PhieuDangKy.HienTrang == "Đã nhận phòng") &&
                  !(checkIn >= pt.PhieuDangKy.ThoiGianTraPhong || checkOut <= pt.PhieuDangKy.ThoiGianNhanPhong))
    .Select(pt => pt.MaPhong)
    .ToList();
            List<ChiTietThue> listPhong = Session["listPhong"] as List<ChiTietThue>;
            var availableRoomList = roomList.Except(bookedRoomList);
            if (listPhong != null)
                // Lọc danh sách phòng để chừa những phòng không có trong danh sách đã đặt
                availableRoomList = availableRoomList.Except(listPhong.Select(p => p.MaPhong)).ToList();
            else
                availableRoomList = availableRoomList.ToList();
            return Json(availableRoomList, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetSoNguoiToiDaByRoomTypeID(string maLoaiPhong)
        {
            var soNguoiToiDa = db.LoaiPhongs.Where(lp => lp.MaLoaiPhong == maLoaiPhong).Select(lp => lp.SoNguoiToiDa).FirstOrDefault();

            return Json(soNguoiToiDa, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetMaPhongByIndex(int index)
        {
            List<ChiTietThue> listPhong = Session["listPhong"] as List<ChiTietThue>;

            if (listPhong != null && index >= 0 && index < listPhong.Count)
            {
                return Json(new { maPhong = listPhong[index].MaPhong }, JsonRequestBehavior.AllowGet);
            }

            return Json(new { maPhong = "" }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult ResetListPhong()
        {
            Session["listPhong"] = null;
            return Json(new { success = true });
        }

        [HttpPost]
        public ActionResult AddService(string maDichVu, byte soLuong)
        {
            // Lấy danh sách sách đã mượn từ Session hoặc tạo danh sách mới nếu chưa tồn tại
            List<ChiTietHoaDonDichVu> listService;

            if (Session["listService"] == null)
            {
                listService = new List<ChiTietHoaDonDichVu>();
            }
            else
            {
                listService = (List<ChiTietHoaDonDichVu>)Session["listService"];
            }

            // Tìm xem sách có MaSach trong danh sách chưa
            var existingService = listService.FirstOrDefault(s => s.MaDichVu == maDichVu);

            if (existingService != null)
            {
                // Nếu đã tồn tại, tăng số lượng
                existingService.SoLuong += soLuong;
            }
            else
            {
                // Nếu chưa tồn tại, thêm sách mới vào danh sách
                var newService = new ChiTietHoaDonDichVu
                {
                    MaDichVu = maDichVu,
                    SoLuong = soLuong
                };

                listService.Add(newService);
            }

            // Lưu danh sách đã cập nhật vào Session
            Session["listService"] = listService;

            // Trả về một JsonResult chứa danh sách sách đã cập nhật
            return Json(listService);
        }

        public ActionResult GetMaDichVuByIndex(int index)
        {
            List<ChiTietHoaDonDichVu> listService = Session["listService"] as List<ChiTietHoaDonDichVu>;

            if (listService != null && index >= 0 && index < listService.Count)
            {
                return Json(new { maDichVu = listService[index].MaDichVu }, JsonRequestBehavior.AllowGet);
            }

            return Json(new { maDichVu = "" }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult DeleteService(string maDichVu)
        {
            // Lấy danh sách sách đã mượn từ Session hoặc tạo danh sách mới nếu chưa tồn tại
            List<ChiTietHoaDonDichVu> listService = Session["listService"] as List<ChiTietHoaDonDichVu> ?? new List<ChiTietHoaDonDichVu>();

            // Tìm và xóa sách khỏi danh sách dựa trên mã sách
            var service = listService.FirstOrDefault(s => s.MaDichVu == maDichVu);
            if (service != null)
            {
                listService.Remove(service);
                Session["listService"] = listService;
                return Json(new { success = true, data = listService });
            }

            return Json(new { success = false });
        }

        [HttpPost]
        public ActionResult ResetListService()
        {
            Session["listService"] = null;
            return Json(new { success = true });
        }
    }
}