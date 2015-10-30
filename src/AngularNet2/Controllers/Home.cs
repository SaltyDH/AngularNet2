using System;
using Microsoft.AspNet.Mvc;

namespace AngularNet2.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
