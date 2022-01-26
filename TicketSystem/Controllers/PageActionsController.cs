using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TicketSystem.Models;

namespace TicketSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PageActionsController : ControllerBase
    {
        private readonly TicketSystemContext _context;

        public PageActionsController(TicketSystemContext context)
        {
            _context = context;
        }

        // GET: api/PageActions
        [HttpGet]
        public ActionResult GetSystemPageAction()
        {
            var r = _context.SystemPageAction
                .AsEnumerable()
                .Join(_context.SystemMenu,
                        a => a.MenuTid,
                        b => b.Tid,
                        (a, b) => new { MenuTid = a.MenuTid, MenuName = b.Name })
                .GroupBy(e => e.MenuTid)
                .Select(x => x.Key)
                .ToList();

            var o = _context.SystemPageAction.ToList();


            var result = r
                        .Join(_context.SystemMenu,
                        a => a,
                        b => b.Tid,
                        (a, b) => new { MenuTid = a, MenuName = b.Name })
                        .Select(x => new SystemPageActionVM
                        {
                            MenuTid = x.MenuTid,
                            MenuName = x.MenuName,
                            Children = GetChildren(o, x.MenuTid)
                        }).ToList();

            return Ok(new
            {
                code = 20000,
                data = result
            });            
        }


        private static List<SystemPageActionVM> GetChildren(List<SystemPageAction> items, long MenuTid)
        {
            var result = items
                .Where(x => x.MenuTid == MenuTid)
                .OrderBy(e => e.ActionId)
                .Select(a => new SystemPageActionVM
                {
                    Tid = a.Tid,
                    MenuTid = a.MenuTid,
                    ActionId = a.ActionId,
                    ActionName = a.ActionName,
                    ActionCommand = a.ActionCommand,
                    ControlName = a.ControlName,                    
                    Children = GetChildren(items, a.Tid)
                }).ToList();

            return result;
        }


        // GET: api/PageActions/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SystemPageAction>> GetSystemPageAction(long id)
        {
            var systemPageAction = await _context.SystemPageAction.FindAsync(id);

            if (systemPageAction == null)
            {
                return NotFound();
            }

            return systemPageAction;
        }

        // PUT: api/PageActions/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSystemPageAction(long id, SystemPageAction systemPageAction)
        {
            if (id != systemPageAction.Tid)
            {
                return BadRequest();
            }

            _context.Entry(systemPageAction).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SystemPageActionExists(id))
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

        // POST: api/PageActions
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<SystemPageAction>> PostSystemPageAction(SystemPageAction systemPageAction)
        {
            _context.SystemPageAction.Add(systemPageAction);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSystemPageAction", new { id = systemPageAction.Tid }, systemPageAction);
        }

        // DELETE: api/PageActions/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<SystemPageAction>> DeleteSystemPageAction(long id)
        {
            var systemPageAction = await _context.SystemPageAction.FindAsync(id);
            if (systemPageAction == null)
            {
                return NotFound();
            }

            _context.SystemPageAction.Remove(systemPageAction);
            await _context.SaveChangesAsync();

            return systemPageAction;
        }

        private bool SystemPageActionExists(long id)
        {
            return _context.SystemPageAction.Any(e => e.Tid == id);
        }
    }
}
