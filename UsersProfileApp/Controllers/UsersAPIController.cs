using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Drawing;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using UsersProfileApp.Models;

namespace UsersProfileApp.Controllers
{
    public class UsersAPIController : ApiController
    {
        private UsersInfoDBModel db = new UsersInfoDBModel();

        // GET: api/UsersAPI
       
        public IEnumerable<User> GetUsers()
        {
            var users = new List<User>();
            users = db.Users.ToList();
            return users.ToList();
        }

        // GET: api/UsersAPI/5
        [ResponseType(typeof(User))]
        public IHttpActionResult GetUser(int id)
        {
            User user = db.Users.Find(id);
            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        // PUT: api/UsersAPI/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutUser(int id, User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != user.UserId)
            {
                return BadRequest();
            }

            db.Entry(user).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        [Route("api/SaveUser")]
        [ResponseType(typeof(User))]
        public IHttpActionResult PostUser(UserModel userInfo)
        {
            byte[] imgarr = Convert.FromBase64String(userInfo.UserPhoto);
            User user = new User
            {
                UserName = userInfo.UserName,
                UserPhoto = imgarr,
                Hobby = userInfo.Hobby
            };
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            db.Users.Add(user);
           
            try
            {
                
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (UserExists(user.UserId))
                {
                    return Conflict();
                }
               else
                {
                    throw;
                }
            }
            return Ok(user);
            // return CreatedAtRoute("DefaultApi", new { id = user.UserId }, user);
        }

        [Route("api/DeleteUser/{id}")]
        [ResponseType(typeof(User))]
        [HttpDelete] 
        public IHttpActionResult DeleteUser(int id)
        {
            User user = db.Users.Find(id);
            if (user == null)
            {
                return NotFound();
            }

            db.Users.Remove(user);
            db.SaveChanges();

            return Ok(user);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool UserExists(int id)
        {
            return db.Users.Count(e => e.UserId == id) > 0;
        }
    }

    public class UserModel
    {
        public string UserName { get; set; }
        public string Hobby { get; set; }
        public string UserPhoto { get; set; }
    }
    
}