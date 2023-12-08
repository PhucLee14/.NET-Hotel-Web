using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web;
using System.Web.ModelBinding;
using System.Web.Mvc;
using WebApplication5.Models;

namespace WebApplication5.Areas.Admin.Controllers
{
    public class GuestController : Controller
    {
        private Hotel_ManagementEntities db = new Hotel_ManagementEntities();

        // GET: Admin/Guest
        public ActionResult Index()
        {
            var khachHangs = db.KhachHangs.Include(k => k.TaiKhoanKH);
            return View(khachHangs.ToList());
        }

        // GET: Admin/Guest/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            KhachHang khachHang = db.KhachHangs.Find(id);
            if (khachHang == null)
            {
                return HttpNotFound();
            }
            return View(khachHang);
        }

        // GET: Admin/Guest/Create
        public ActionResult Create()
        {
            ViewBag.TenTaiKhoan = new SelectList(db.TaiKhoanKHs, "TenTaiKhoan", "MatKhau");
            return View();
        }

        // POST: Admin/Guest/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "MaKhachHang,CCCD,TenKhachHang,LoaiKhachHang,NgaySinh,SoDienThoai,TenTaiKhoan")] KhachHang khachHang)
        {
            if (ModelState.IsValid)
            {
                db.KhachHangs.Add(khachHang);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            ViewBag.TenTaiKhoan = new SelectList(db.TaiKhoanKHs, "TenTaiKhoan", "MatKhau", khachHang.TenTaiKhoan);
            return View(khachHang);
        }

        // GET: Admin/Guest/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            KhachHang khachHang = db.KhachHangs.Find(id);
            if (khachHang == null)
            {
                return HttpNotFound();
            }
            ViewBag.TenTaiKhoan = new SelectList(db.TaiKhoanKHs, "TenTaiKhoan", "MatKhau", khachHang.TenTaiKhoan);
            return View(khachHang);
        }

        // POST: Admin/Guest/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "MaKhachHang,CCCD,TenKhachHang,LoaiKhachHang,NgaySinh,SoDienThoai,TenTaiKhoan")] KhachHang khachHang)
        {
            if (ModelState.IsValid)
            {
                db.Entry(khachHang).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.TenTaiKhoan = new SelectList(db.TaiKhoanKHs, "TenTaiKhoan", "MatKhau", khachHang.TenTaiKhoan);
            return View(khachHang);
        }

        // GET: Admin/Guest/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            KhachHang khachHang = db.KhachHangs.Find(id);
            if (khachHang == null)
            {
                return HttpNotFound();
            }
            return View(khachHang);
        }

        // POST: Admin/Guest/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            KhachHang khachHang = db.KhachHangs.Find(id);
            db.KhachHangs.Remove(khachHang);
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
        public async Task<ActionResult> Search(string name)
        {
            var ketqua = await db.KhachHangs.Where(kh => kh.TenKhachHang.ToLower().Contains(name.ToLower())).ToListAsync();

            return View("Index", ketqua);
        }
    }
}
