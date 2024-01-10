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
    public class ServiceController : Controller
    {
        private Hotel_ManagementEntities db = new Hotel_ManagementEntities();

        // GET: Admin/Service
        public ActionResult Index(int? page)
        {
            int pageSize = 10; // Số lượng kết quả hiển thị trên mỗi trang
            int pageNumber = (page ?? 1); // Số trang hiện tại, mặc định là 1 nếu không có trang được chọn

            var dichVus = db.DichVus.OrderBy(dv => dv.TenDichVu)
                                     .ToPagedList(pageNumber, pageSize); // Thực hiện phân trang cho dữ liệu

            return View(dichVus);
        }

        // GET: Admin/Service/Details/5
        public ActionResult Details(string id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            DichVu dichVu = db.DichVus.Find(id);
            if (dichVu == null)
            {
                return HttpNotFound();
            }
            return View(dichVu);
        }

        // GET: Admin/Service/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Admin/Service/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "MaDichVu,TenDichVu,GiaDichVu")] DichVu dichVu)
        {
            var existingServiceCode = db.DichVus.FirstOrDefault(dv => dv.MaDichVu == dichVu.MaDichVu);
            var existingServiceName = db.DichVus.FirstOrDefault(dv => dv.TenDichVu == dichVu.TenDichVu);
            if (existingServiceCode != null)
            {
                ModelState.AddModelError("serviceCode", "Mã dịch vụ đã tồn tại");
            }
            if (existingServiceName != null)
            {
                ModelState.AddModelError("serviceName", "Tên dịch vụ đã tồn tại");
            }
            if (ModelState.IsValid)
            {
                db.DichVus.Add(dichVu);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(dichVu);
        }

        // GET: Admin/Service/Edit/5
        public ActionResult Edit(string id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            DichVu dichVu = db.DichVus.Find(id);
            if (dichVu == null)
            {
                return HttpNotFound();
            }
            return View(dichVu);
        }

        // POST: Admin/Service/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "MaDichVu,TenDichVu,GiaDichVu")] DichVu dichVu)
        {
            var existingServiceName = db.DichVus.FirstOrDefault(dv => dv.TenDichVu == dichVu.TenDichVu && dv.MaDichVu != dichVu.MaDichVu);
            if (existingServiceName != null)
            {
                ModelState.AddModelError("TenDichVu", "Tên loại phòng đã tồn tại cho một loại phòng khác");
            }
            if (ModelState.IsValid)
            {
                db.Entry(dichVu).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(dichVu);
        }

        // GET: Admin/Service/Delete/5
        public ActionResult Delete(string id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            DichVu dichVu = db.DichVus.Find(id);
            if (dichVu == null)
            {
                return HttpNotFound();
            }
            return View(dichVu);
        }

        // POST: Admin/Service/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(string id)
        {
            DichVu dichVu = db.DichVus.Find(id);
            db.DichVus.Remove(dichVu);
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
        public async Task<ActionResult> Search(int? page, string tenDV)
        {
            int pageSize = 10; // Số lượng kết quả hiển thị trên mỗi trang
            int pageNumber = (page ?? 1); // Số trang hiện tại, mặc định là 1 nếu không có trang được chọn

            IQueryable<DichVu> query = db.DichVus;

            if (!string.IsNullOrEmpty(tenDV))
            {
                query = query.Where(dv => dv.TenDichVu.ToLower().Contains(tenDV.ToLower()));
            }

            var ketqua = query.OrderBy(dv => dv.TenDichVu)
                                    .ToPagedList(pageNumber, pageSize); // Thực hiện phân trang cho kết quả tìm kiếm

            return View("Index", ketqua);
        }
    }
}
