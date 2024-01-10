using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using HotelManagement;
using PagedList;

namespace HotelManagement.Areas.Admin.Controllers
{
    public class StaffController : Controller
    {
        private Hotel_ManagementEntities db = new Hotel_ManagementEntities();

        // GET: Admin/Staff
        public ActionResult Index(int? page)
        {
            int pageSize = 10; // Số lượng kết quả hiển thị trên mỗi trang
            int pageNumber = (page ?? 1); // Số trang hiện tại, mặc định là 1 nếu không có trang được chọn

            var nhanViens = db.NhanViens.Include(nv => nv.TaiKhoanNVs)
                                        .OrderBy(nv => nv.TenNhanVien)
                                        .ToPagedList(pageNumber, pageSize); // Thực hiện phân trang cho dữ liệu

            return View(nhanViens);
        }

        // GET: Admin/Staff/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            NhanVien nhanVien = db.NhanViens.Include(nv => nv.TaiKhoanNVs).Where(nv => nv.MaNhanVien == id).FirstOrDefault();
            if (nhanVien == null)
            {
                return HttpNotFound();
            }
            return View(nhanVien);
        }

        // GET: Admin/Staff/Create
        public ActionResult Create()
        {
            ViewBag.ChucDanh = new SelectList(db.TaiKhoanNVs, "TenTaiKhoan", "ChucDanh");
            ViewBag.TenTaiKhoan = new SelectList(db.TaiKhoanNVs, "TenTaiKhoan", "MatKhau");
            return View();
        }

        // POST: Admin/Staff/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "MaNhanVien,CCCD,SoDienThoai,TenNhanVien,NgaySinh,ChucDanh")] NhanVien nhanVien, [Bind(Include = "TenTaiKhoan,MatKhau")] TaiKhoanNV taiKhoannv)
        {
            var existingEmployeeCCCD = db.NhanViens.FirstOrDefault(e => e.CCCD == nhanVien.CCCD);
            var existingEmployeePhone = db.NhanViens.FirstOrDefault(e => e.SoDienThoai == nhanVien.SoDienThoai);
            if (existingEmployeeCCCD != null)
            {
                ModelState.AddModelError("CCCD", "CCCD đã tồn tại.");
            }

            if (existingEmployeePhone != null)
            {
                ModelState.AddModelError("SoDienThoai", "Số điện thoại đã tồn tại.");
            }
            if (ModelState.IsValid)
            {
                db.NhanViens.Add(nhanVien);

                taiKhoannv.MaNhanVien = nhanVien.MaNhanVien;

                db.TaiKhoanNVs.Add(taiKhoannv);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            ViewBag.ChucDanh = new List<string> { "Nhân viên lễ tân", "Nhân viên phục vụ", "Nhân viên kế toán" };
            //ViewBag.TenTaiKhoan = new SelectList(db.TaiKhoanNVs, "TenTaiKhoan", "MatKhau", nhanVien.TenTaiKhoan);
            return View(nhanVien);
        }

        // GET: Admin/Staff/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            NhanVien nhanVien = db.NhanViens.Find(id);
            if (nhanVien == null)
            {
                return HttpNotFound();
            }

            return View(nhanVien);
        }

        // POST: Admin/Staff/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "MaNhanVien,CCCD,SoDienThoai,TenNhanVien,NgaySinh,ChucDanh")] NhanVien nhanVien, [Bind(Include = "TenTaiKhoan,MatKhau,MaNhanVien")] TaiKhoanNV taiKhoannv)
        {
            var existingEmployeePhone = db.NhanViens.FirstOrDefault(e => e.SoDienThoai == nhanVien.SoDienThoai && e.MaNhanVien != nhanVien.MaNhanVien);
            if (existingEmployeePhone != null)
            {
                ModelState.AddModelError("SoDienThoai", "Số điện thoại đã tồn tại cho một nhân viên khác.");
            }

            var existingEmployeeCCCD = db.NhanViens.FirstOrDefault(e => e.CCCD == nhanVien.CCCD && e.MaNhanVien != nhanVien.MaNhanVien);
            if (existingEmployeeCCCD != null)
            {
                ModelState.AddModelError("CCCD", "CCCD đã tồn tại cho một nhân viên khác.");
            }
            if (ModelState.IsValid)
            {
                db.Entry(taiKhoannv).State = EntityState.Modified;
                db.SaveChanges();

                db.Entry(nhanVien).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(nhanVien);
        }

        // GET: Admin/Staff/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            NhanVien nhanVien = db.NhanViens.Find(id);
            if (nhanVien == null)
            {
                return HttpNotFound();
            }
            return View(nhanVien);
        }

        // POST: Admin/Staff/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            NhanVien nhanVien = db.NhanViens.Find(id);
            db.NhanViens.Remove(nhanVien);
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
        public async Task<ActionResult> Search(int? page, string name)
        {
            int pageSize = 10; // Số lượng kết quả hiển thị trên mỗi trang
            int pageNumber = (page ?? 1); // Số trang hiện tại, mặc định là 1 nếu không có trang được chọn

            IQueryable<NhanVien> query = db.NhanViens; // Bắt đầu với tất cả các nhân viên

            if (!string.IsNullOrEmpty(name))
            {
                // Nếu 'name' không rỗng, thêm điều kiện tìm kiếm vào truy vấn
                query = query.Where(nv => nv.TenNhanVien.ToLower().Contains(name.ToLower()));
            }

            var ketqua = query.OrderBy(nv => nv.TenNhanVien)
                                    .ToPagedList(pageNumber, pageSize); // Thực hiện phân trang cho kết quả tìm kiếm

            return View("Index", ketqua);
        }
    }
}
