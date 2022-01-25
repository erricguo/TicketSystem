using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TicketSystem.Models;

namespace TicketSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MenusController : ControllerBase
    {
        private readonly TicketSystemContext _context;

        public MenusController(TicketSystemContext context)
        {
            _context = context;
        }

        // GET: api/Menus
        [HttpGet]
        public IActionResult GetSystemMenu()
        {
            var r = _context.SystemMenu.ToList();
            var result = r
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
                    Children = GetChildren(r, e.Tid)
                })                                                
                .ToList();
            
            return  Ok(new
            {
                code = 20000,
                //data = _context.SystemMenu.Where(x => x.Level == 2).ToList()
                data = result
            });
        }

        [HttpGet("Parent")]
        public IActionResult GetSystemMenuParent()
        {
            var r = _context.SystemMenu.ToList();
            var result = r
                .Where(e => (e.ParentTid == 0 && e.IsActive == true))
                .ToList();

            return Ok(new
            {
                code = 20000,                
                data = result
            });
        }

        private static List<SystemMenuVM> GetChildren(List<SystemMenu> items, long parentId)
        {
            var result = items
                .Where(x => x.ParentTid == parentId && x.IsActive == true)
                .OrderBy(e => e.OrderRule)
                .Select(e => new SystemMenuVM
                {
                    Tid = e.Tid,
                    ParentTid = e.ParentTid,
                    Name = e.Name,
                    Ico = e.Ico,
                    Url = e.Url,
                    OrderRule = e.OrderRule,
                    Level = e.Level,
                    Children = GetChildren(items, e.Tid)
                }).ToList();

            return result;
        }

        // GET: api/Menus/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SystemMenu>> GetSystemMenu(long id)
        {
            var systemMenu = await _context.SystemMenu.FindAsync(id);

            if (systemMenu == null)
            {
                return NotFound();
            }

            return systemMenu;
        }

        // PUT: api/Menus/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSystemMenu(long id, SystemMenu systemMenu)
        {
            if (id != systemMenu.Tid)
            {
                return BadRequest();
            }

            _context.Entry(systemMenu).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SystemMenuExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpPatch("{id}")]
        public async Task<IActionResult> PatchSystemMenu(long id, SystemMenu systemMenu)
        {
            var entity = _context.SystemMenu.FirstOrDefault(x => x.Tid == id);
            if (entity == null)
            {
                return NotFound();
            }

            var jsonPatch = new JsonPatchDocument<SystemMenu>()
                .Replace(x => x.ParentTid, systemMenu.ParentTid)
                .Replace(x => x.Ico, systemMenu.Ico)
                .Replace(x => x.Url, systemMenu.Url)
                .Replace(x => x.OrderRule, systemMenu.OrderRule)
                .Replace(x => x.Level, systemMenu.ParentTid == 0 ? 1 : 2)
                .Replace(x => x.Name, systemMenu.Name);

            jsonPatch.ApplyTo(entity, ModelState);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SystemMenuExists(id))
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

        // POST: api/Menus
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<SystemMenu>> PostSystemMenu(SystemMenu systemMenu)
        {
            _context.SystemMenu.Add(systemMenu);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSystemMenu", new { id = systemMenu.Tid }, systemMenu);
        }

        // DELETE: api/Menus/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<SystemMenu>> DeleteSystemMenu(long id)
        {
            var systemMenu = await _context.SystemMenu.FindAsync(id);
            if (systemMenu == null)
            {
                return NotFound();
            }

            _context.SystemMenu.Remove(systemMenu);
            await _context.SaveChangesAsync();

            return systemMenu;
        }

        private bool SystemMenuExists(long id)
        {
            return _context.SystemMenu.Any(e => e.Tid == id);
        }
    }
}
