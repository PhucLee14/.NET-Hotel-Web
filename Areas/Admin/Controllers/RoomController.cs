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
    public class RoomController : Controller
    {
        private Hotel_ManagementEntities db = new Hotel_ManagementEntities();

        // GET: Admin/Room
        public ActionResult Index(int? page)
        {
            int pageNumber = (page ?? 1); // Số trang hiện tại, mặc định là 1 nếu không có
            int PageSize = 12;

            var phongs = db.Phongs.Include(p => p.LoaiPhong).OrderBy(p => p.MaPhong);
            var pagedPhongs = phongs.ToPagedList(pageNumber, PageSize);

            return View(pagedPhongs);
        }

        // GET: Admin/Room/Details/5
        public ActionResult Details(string id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }

            ViewBag.ID = id;
            Phong phong = db.Phongs.Find(id);
            if (phong == null)
            {
                return HttpNotFound();
            }
            return View(phong);
        }

        // GET: Admin/Room/Create
        public ActionResult Create()
        {
            ViewBag.MaLoaiPhong = new SelectList(db.LoaiPhongs, "MaLoaiPhong", "TenLoaiPhong");
            return View();
        }

        // POST: Admin/Room/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        //public ActionResult Create([Bind(Include = "MaPhong/*,HienTrang*/,MaLoaiPhong")] Phong phong)
        public ActionResult Create([Bind(Include = "MaPhong,MaLoaiPhong")] Phong phong)
        {
            var existingRoom = db.Phongs.FirstOrDefault(p => p.MaPhong == phong.MaPhong);
            if (existingRoom != null)
            {
                ModelState.AddModelError("roomCode", "Mã phòng đã tồn tại.");
            }
            if (ModelState.IsValid)
            {
                db.Phongs.Add(phong);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            ViewBag.MaLoaiPhong = new SelectList(db.LoaiPhongs, "MaLoaiPhong", "TenLoaiPhong", phong.MaLoaiPhong);
            return View(phong);
        }

        // GET: Admin/Room/Edit/5
        public ActionResult Edit(string id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Phong phong = db.Phongs.Find(id);
            if (phong == null)
            {
                return HttpNotFound();
            }
            ViewBag.MaLoaiPhong = new SelectList(db.LoaiPhongs, "MaLoaiPhong", "TenLoaiPhong", phong.MaLoaiPhong);
            return View(phong);
        }

        // POST: Admin/Room/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        //public ActionResult Edit([Bind(Include = "MaPhong/*,HienTrang*/,MaLoaiPhong")] Phong phong)
        public ActionResult Edit([Bind(Include = "MaPhong,HienTrang,MaLoaiPhong")] Phong phong)
        {
            if (ModelState.IsValid)
            {
                db.Entry(phong).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.MaLoaiPhong = new SelectList(db.LoaiPhongs, "MaLoaiPhong", "TenLoaiPhong", phong.MaLoaiPhong);
            return View(phong);
        }

        // GET: Admin/Room/Delete/5
        public ActionResult Delete(string id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Phong phong = db.Phongs.Find(id);
            if (phong == null)
            {
                return HttpNotFound();
            }
            return View(phong);
        }

        // POST: Admin/Room/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(string id)
        {
            Phong phong = db.Phongs.Find(id);
            db.Phongs.Remove(phong);
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
        public async Task<ActionResult> Search(string maPhong, int? page)
        {
            int pageNumber = (page ?? 1); // Số trang hiện tại, mặc định là 1 nếu không có
            int PageSize = 12;

            IQueryable<Phong> query = db.Phongs;

            if (!string.IsNullOrEmpty(maPhong))
            {
                query = query.Where(p => p.MaPhong.ToLower().Contains(maPhong.ToLower()));
            }

            var phongs = query.OrderBy(p => p.MaPhong).ToPagedList(pageNumber, PageSize);

            return View("Index", phongs);
        }
    }
}
