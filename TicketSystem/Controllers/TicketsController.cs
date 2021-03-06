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
    public class TicketsController : ControllerBase
    {
        private readonly TicketSystemContext _context;

        public TicketsController(TicketSystemContext context)
        {
            _context = context;
        }

        // GET: api/Tickets
        [HttpGet]
        public async Task<ActionResult> GetSystemTickets()
        {
            var tickets = await _context.SystemTickets.ToListAsync();
            var selectType = await _context.SystemOptions.Where(x=>x.Option == "TicketType").ToListAsync();
            var selectStatus = await _context.SystemOptions.Where(x => x.Option == "TicketStatus").ToListAsync();
            var selectSevere = await _context.SystemOptions.Where(x => x.Option == "TicketSevere").ToListAsync();
            var selectPriority = await _context.SystemOptions.Where(x => x.Option == "TicketPriority").ToListAsync();
            return Ok(new
            {
                code = 20000,
                data = new
                {
                    tickets,
                    selectType,
                    selectStatus,
                    selectSevere,
                    selectPriority,
                }
            });            
        }

        // GET: api/Tickets/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SystemTickets>> GetSystemTickets(long id)
        {
            var systemTickets = await _context.SystemTickets.FindAsync(id);

            if (systemTickets == null)
            {
                return NotFound();
            }

            return systemTickets;
        }

        // PUT: api/Tickets/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSystemTickets(long id, SystemTickets systemTickets)
        {
            if (id != systemTickets.Tid)
            {
                return BadRequest();
            }

            _context.Entry(systemTickets).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SystemTicketsExists(id))
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

        // POST: api/Tickets
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<SystemTickets>> PostSystemTickets(SystemTickets systemTickets)
        {
            var ticketid = _context.SystemTickets.Max(x => x.TicketId);
            if(ticketid == null)
            {
                ticketid = "1";
            }
            else
            {
                ticketid = (int.Parse(ticketid) + 1).ToString();
            }

            systemTickets.TicketId = ticketid;
            _context.SystemTickets.Add(systemTickets);
            await _context.SaveChangesAsync();

            return Ok(new { code = 20000});
        }

        // DELETE: api/Tickets/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<SystemTickets>> DeleteSystemTickets(long id)
        {
            var systemTickets = await _context.SystemTickets.FindAsync(id);
            if (systemTickets == null)
            {
                return NotFound();
            }

            _context.SystemTickets.Remove(systemTickets);
            await _context.SaveChangesAsync();

            return systemTickets;
        }

        private bool SystemTicketsExists(long id)
        {
            return _context.SystemTickets.Any(e => e.Tid == id);
        }
    }
}
