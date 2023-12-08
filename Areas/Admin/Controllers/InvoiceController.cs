using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using WebApplication5.Models;

namespace WebApplication5.Areas.Admin.Controllers
{
    public class InvoiceController : Controller
    {
        private Hotel_ManagementEntities db = new Hotel_ManagementEntities();

        // GET: Admin/Invoice
        public ActionResult Index()
        {
            var hoaDons = db.HoaDons.Include(h => h.NhanVien).Include(h => h.KhachHang).Include(h => h.PhieuThue);
            return View(hoaDons.ToList());
        }

        // GET: Admin/Invoice/Details/5
        public ActionResult Details(string id)
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

        // GET: Admin/Invoice/Create
        public ActionResult Create()
        {
            ViewBag.MaNhanVien = new SelectList(db.NhanViens, "MaNhanVien", "CCCD");
            ViewBag.MaKhachHang = new SelectList(db.KhachHangs, "MaKhachHang", "CCCD");
            ViewBag.MaPhieu = new SelectList(db.PhieuThues, "MaPhieu", "HienTrang");
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
            ViewBag.MaPhieu = new SelectList(db.PhieuThues, "MaPhieu", "HienTrang", hoaDon.MaPhieu);
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
            ViewBag.MaPhieu = new SelectList(db.PhieuThues, "MaPhieu", "HienTrang", hoaDon.MaPhieu);
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
            ViewBag.MaPhieu = new SelectList(db.PhieuThues, "MaPhieu", "HienTrang", hoaDon.MaPhieu);
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
    }
}
