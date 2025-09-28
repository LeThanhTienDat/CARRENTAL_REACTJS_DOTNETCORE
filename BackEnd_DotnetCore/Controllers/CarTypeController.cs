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
    public class CarTypeController : ControllerBase
    {
        private readonly CarRentalApi2Context _context;

        public CarTypeController(CarRentalApi2Context context)
        {
            _context = context;
        }

        // GET: api/CarType
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TblCarType>>> GetTblCarTypes()
        {
            return await _context.TblCarTypes.ToListAsync();
        }

        // GET: api/CarType/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TblCarType>> GetTblCarType(int id)
        {
            var tblCarType = await _context.TblCarTypes.FindAsync(id);

            if (tblCarType == null)
            {
                return NotFound();
            }

            return tblCarType;
        }

        // PUT: api/CarType/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTblCarType(int id, TblCarType tblCarType)
        {
            if (id != tblCarType.CarTypeId)
            {
                return BadRequest();
            }

            _context.Entry(tblCarType).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TblCarTypeExists(id))
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

        // POST: api/CarType
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<TblCarType>> PostTblCarType(TblCarType tblCarType)
        {
            _context.TblCarTypes.Add(tblCarType);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTblCarType", new { id = tblCarType.CarTypeId }, tblCarType);
        }

        // DELETE: api/CarType/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTblCarType(int id)
        {
            var tblCarType = await _context.TblCarTypes.FindAsync(id);
            if (tblCarType == null)
            {
                return NotFound();
            }

            _context.TblCarTypes.Remove(tblCarType);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TblCarTypeExists(int id)
        {
            return _context.TblCarTypes.Any(e => e.CarTypeId == id);
        }
    }
}
