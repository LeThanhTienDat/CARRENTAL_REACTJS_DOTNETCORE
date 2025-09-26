using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BackEnd_DotnetCore.Models;

namespace BackEnd_DotnetCore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TblBookingsController : ControllerBase
    {
        private readonly CarRentalApiContext _context;

        public TblBookingsController(CarRentalApiContext context)
        {
            _context = context;
        }

        // GET: api/TblBookings
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TblBooking>>> GetTblBookings()
        {
            return await _context.TblBookings.ToListAsync();
        }

        // GET: api/TblBookings/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TblBooking>> GetTblBooking(int id)
        {
            var tblBooking = await _context.TblBookings.FindAsync(id);

            if (tblBooking == null)
            {
                return NotFound();
            }

            return tblBooking;
        }

        // PUT: api/TblBookings/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTblBooking(int id, TblBooking tblBooking)
        {
            if (id != tblBooking.BookingId)
            {
                return BadRequest();
            }

            _context.Entry(tblBooking).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TblBookingExists(id))
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

        // POST: api/TblBookings
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<TblBooking>> PostTblBooking(TblBooking tblBooking)
        {
            _context.TblBookings.Add(tblBooking);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTblBooking", new { id = tblBooking.BookingId }, tblBooking);
        }

        // DELETE: api/TblBookings/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTblBooking(int id)
        {
            var tblBooking = await _context.TblBookings.FindAsync(id);
            if (tblBooking == null)
            {
                return NotFound();
            }

            _context.TblBookings.Remove(tblBooking);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TblBookingExists(int id)
        {
            return _context.TblBookings.Any(e => e.BookingId == id);
        }
    }
}
