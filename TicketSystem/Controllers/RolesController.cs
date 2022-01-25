using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using TicketSystem.Models;

namespace TicketSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RolesController : ControllerBase
    {
        private readonly TicketSystemContext _context;

        public RolesController(TicketSystemContext context)
        {
            _context = context;
        }

        // GET: api/Roles
        [HttpGet]
        public async Task<IActionResult> GetSystemRole()
        {
            return Ok(new
            {
                code = 20000,
                data = await _context.SystemRole.ToListAsync()
            });
        }

        // GET: api/Roles/5
        [HttpGet("{id}")]
        public IActionResult GetSystemRole(long id)
        {
            var systemRole = _context.SystemRole.Find(id);

            if (systemRole == null)
            {
                return NotFound();
            }

            return Ok(new { code = 20000, data = systemRole });
        }

        // PUT: api/Roles/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSystemRole(long id, SystemRole systemRole)
        {
            if (id != systemRole.Tid)
            {
                return BadRequest();
            }

            systemRole.MenuRights = systemRole.ActionList;
            var actionList = convertActionList(systemRole.ActionList);
            systemRole.ActionList = JsonConvert.SerializeObject(actionList);

            _context.Entry(systemRole).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SystemRoleExists(id))
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

        // PUT: api/Roles/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPatch("{id}")]
        public async Task<IActionResult> PatchSystemRole(long id, SystemRole systemRole)
        {
            var entity = _context.SystemRole.FirstOrDefault(x => x.Tid == id);
            if (entity == null)
            {
                return NotFound();
            }
            
            var actionList = convertActionList(systemRole.ActionList);

            var jsonPatch = new JsonPatchDocument<SystemRole>()
                .Replace(x => x.RoleName, systemRole.RoleName)
                .Replace(x => x.Description, systemRole.Description)
                .Replace(x => x.ActionList, actionList)
                .Replace(x => x.MenuRights, systemRole.ActionList);

            jsonPatch.ApplyTo(entity, ModelState); 

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SystemRoleExists(id))
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

        // POST: api/Roles
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<IActionResult> PostSystemRole(SystemRole systemRole)
        {
            //[{"title":"首頁","route":"/home","icon":"HomeIcon"},{"title":"功能表管理","route":"menu","icon":"MenuIcon"},{"title":"角色管理","route":"role","icon":"UserIcon"},{"title":"使用者管理","route":"user","icon":"UsersIcon"}]
            systemRole.MenuRights = systemRole.ActionList;
            var actionList = convertActionList(systemRole.ActionList);
            systemRole.ActionList = JsonConvert.SerializeObject(actionList);
            _context.SystemRole.Add(systemRole);
            await _context.SaveChangesAsync();

            //return CreatedAtAction("GetSystemRole", new { id = systemRole.Tid }, systemRole);


            return Ok(new
            {
                code = 20000,
                data = await _context.SystemRole.ToListAsync()
            });
        }

        private string convertActionList(string actionList)
        {
            var arrAction = JsonConvert.DeserializeObject<string[]>(actionList);
            var menus = _context.SystemMenu.ToList();
            var result = menus
                .Where(e => (e.ParentTid == 0 && e.IsActive == true))
                .Select(e => new SystemMenuVM
                {
                    Tid = e.Tid,
                    ParentTid = e.ParentTid,
                    Name = e.Name,
                    Ico = e.Ico,
                    Url = e.Url,
                    OrderRule = e.OrderRule,
                    Level = e.Level,
                    Children = GetChildren(menus, e.Tid, arrAction)
                }).ToList();

            var menu = new List<object>();
            foreach (var item in result)
            {
                
                var mchild = new List<object>();
                foreach (var child in item.Children)
                {
                    mchild.Add((new { title = child.Name, route = child.Url, icon = child.Ico }));
                }

                menu.Add((new { title = item.Name, route = item.Url, icon = item.Ico, children = mchild }));

            }

            return JsonConvert.SerializeObject(menu);
        }

        private List<SystemMenuVM> GetChildren(List<SystemMenu> menus, long parentId, string[] arrAction)
        {
            if (arrAction.Contains(parentId.ToString()))
            {
                return menus
                 .Where(x => x.ParentTid == parentId && x.IsActive == true)
                 .Select(e => new SystemMenuVM
                 {
                     Tid = e.Tid,
                     ParentTid = e.ParentTid,
                     Name = e.Name,
                     Ico = e.Ico,
                     Url = e.Url,
                     OrderRule = e.OrderRule,
                     Level = e.Level,
                     Children = GetChildren(menus, e.Tid, arrAction)
                 }).ToList();

            }

            return menus
                .Where(x => x.ParentTid == parentId && x.IsActive == true && arrAction.Contains(x.Tid.ToString()))
                .Select(e => new SystemMenuVM
                {
                    Tid = e.Tid,
                    ParentTid = e.ParentTid,
                    Name = e.Name,
                    Ico = e.Ico,
                    Url = e.Url,
                    OrderRule = e.OrderRule,
                    Level = e.Level,
                    Children = GetChildren(menus, e.Tid, arrAction)
                }).ToList();
        }


        // DELETE: api/Roles/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<SystemRole>> DeleteSystemRole(long id)
        {
            var systemRole = await _context.SystemRole.FindAsync(id);
            if (systemRole == null)
            {
                return NotFound();
            }

            _context.SystemRole.Remove(systemRole);
            await _context.SaveChangesAsync();

            return systemRole;
        }

        private bool SystemRoleExists(long id)
        {
            return _context.SystemRole.Any(e => e.Tid == id);
        }
    }
}
