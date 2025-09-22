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
    public class CityController : ControllerBase
    {
        private readonly CarRentalApiContext _context;

        public CityController(CarRentalApiContext context)
        {
            _context = context;
        }

        // GET: api/City
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TblCity>>> GetTblCities()
        {
            return await _context.TblCities.ToListAsync();
        }

        // GET: api/City/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TblCity>> GetTblCity(int id)
        {
            var tblCity = await _context.TblCities.FindAsync(id);

            if (tblCity == null)
            {
                return NotFound();
            }

            return tblCity;
        }

        // PUT: api/City/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTblCity(int id, TblCity tblCity)
        {
            if (id != tblCity.CityId)
            {
                return BadRequest();
            }

            _context.Entry(tblCity).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TblCityExists(id))
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

        // POST: api/City
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<TblCity>> PostTblCity(TblCity tblCity)
        {
            _context.TblCities.Add(tblCity);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTblCity", new { id = tblCity.CityId }, tblCity);
        }

        // DELETE: api/City/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTblCity(int id)
        {
            var tblCity = await _context.TblCities.FindAsync(id);
            if (tblCity == null)
            {
                return NotFound();
            }

            _context.TblCities.Remove(tblCity);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TblCityExists(int id)
        {
            return _context.TblCities.Any(e => e.CityId == id);
        }
    }
}
