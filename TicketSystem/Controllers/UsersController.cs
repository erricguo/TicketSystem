using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TicketSystem.Infrastructure.StaticExt;
using TicketSystem.Models;

namespace TicketSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly TicketSystemContext _context;

        public UsersController(TicketSystemContext context)
        {
            _context = context;
        }

        // GET: api/Users
        [HttpGet]
        //public async Task<ActionResult<IEnumerable<UsersVM>>> GetSystemUsers()
        public async Task<IActionResult> GetSystemUsers()
        {
            var result = _context.SystemUsers
                .Join(_context.SystemRole,
                a=>a.RoleTid,
                r=>r.Tid,
                (a,r) => new UsersVM { Users = a, Roles = r });
            var roles = await _context.SystemRole.OrderBy(x => x.Tid).ToListAsync();
            return Ok(new { code = 20000, data = new { uvm = await result.ToListAsync(), roles = roles } });
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SystemUsers>> GetSystemUsers(long id)
        {
            var systemUsers = await _context.SystemUsers.FindAsync(id);

            if (systemUsers == null)
            {
                return NotFound();
            }

            return systemUsers;
        }

        // PUT: api/Users/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSystemUsers(long id, SystemUsers systemUsers)
        {
            if (id != systemUsers.Tid)
            {
                return BadRequest();
            }

            systemUsers.IsActive = true;
            _context.Entry(systemUsers).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SystemUsersExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(new { code = 20000 });
        }


        // POST: api/Users
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<IActionResult> PostSystemUsers(SystemUsers systemUsers)
        {
            var pwd = CodingUtils.MD5(systemUsers.Pwd);
            systemUsers.Pwd = pwd;
            _context.SystemUsers.Add(systemUsers);
            await _context.SaveChangesAsync();

            return Ok(new { code = 20000, data = new { id = systemUsers.Tid, systemUsers = systemUsers }});
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<SystemUsers>> DeleteSystemUsers(long id)
        {
            var systemUsers = await _context.SystemUsers.FindAsync(id);
            if (systemUsers == null)
            {
                return NotFound();
            }

            _context.SystemUsers.Remove(systemUsers);
            await _context.SaveChangesAsync();

            return systemUsers;
        }

        private bool SystemUsersExists(long id)
        {
            return _context.SystemUsers.Any(e => e.Tid == id);
        }
    }
}
