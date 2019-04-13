using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace UsersProfileApp.Controllers
{
    public class EditUserProfileController : Controller
    {
        // GET: EditUserProfile

        public ActionResult AddProfile()
        {
            return View();
        }

        public ActionResult UserProfile()
        {
            return View();
        }
    }
}