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
    public class DistrictController : ControllerBase
    {
        private readonly CarRentalApiContext _context;

        public DistrictController(CarRentalApiContext context)
        {
            _context = context;
        }

        // GET: api/District
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TblDistrict>>> GetTblDistricts()
        {
            return await _context.TblDistricts.ToListAsync();
        }

        // GET: api/District/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TblDistrict>> GetTblDistrict(int id)
        {
            var tblDistrict = await _context.TblDistricts.FindAsync(id);

            if (tblDistrict == null)
            {
                return NotFound();
            }

            return tblDistrict;
        }
        //get by CityId
        [HttpGet("get-by-cityid/{id}")]
        public async Task<ActionResult<IEnumerable<TblDistrict>>> GetByCityId(int id)
        {
            var tblDistrict = await _context.TblDistricts
                    .Where(d => d.CityId.Equals(id))
                    .ToListAsync();                              
            return tblDistrict;
        }

        // PUT: api/District/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTblDistrict(int id, TblDistrict tblDistrict)
        {
            if (id != tblDistrict.DistrictId)
            {
                return BadRequest();
            }

            _context.Entry(tblDistrict).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TblDistrictExists(id))
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

        // POST: api/District
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<TblDistrict>> PostTblDistrict(TblDistrict tblDistrict)
        {
            _context.TblDistricts.Add(tblDistrict);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTblDistrict", new { id = tblDistrict.DistrictId }, tblDistrict);
        }

        // DELETE: api/District/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTblDistrict(int id)
        {
            var tblDistrict = await _context.TblDistricts.FindAsync(id);
            if (tblDistrict == null)
            {
                return NotFound();
            }

            _context.TblDistricts.Remove(tblDistrict);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TblDistrictExists(int id)
        {
            return _context.TblDistricts.Any(e => e.DistrictId == id);
        }
    }
}
