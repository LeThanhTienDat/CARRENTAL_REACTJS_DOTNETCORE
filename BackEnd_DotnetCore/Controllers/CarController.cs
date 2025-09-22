using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BackEnd_DotnetCore.Models;
using BackEnd_DotnetCore.DTOs;

namespace BackEnd_DotnetCore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarController : ControllerBase
    {
        private readonly CarRentalApiContext _context;

        public CarController(CarRentalApiContext context)
        {
            _context = context;
        }

        // GET: api/Car
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CarDTO>>> GetTblCars()
        {
            return await _context.TblCars
                .Include(c => c.Cate)
                .Include(c => c.CarType)
                .Include(c => c.District)
                .Include(c => c.City)
                .Select(c => new CarDTO
                {
                    CarId = c.CarId,
                    CateId = c.Cate != null ? c.Cate.CateId : null,
                    CateName = c.Cate != null ? c.Cate.Title : null,
                    Active =c.Active,
                    Brand = c.Brand,
                    Model = c.Model,
                    PricePerDay = c.PricePerDay,
                    CarStatus = c.CarStatus,
                    Image = c.Image,
                    LicensePlate = c.LicensePlate,
                    SeatCount = c.SeatCount,
                    Color = c.Color,
                    CarTypeId = c.CarType != null ? c.CarType.CarTypeId : null,
                    CarTypeName = c.CarType != null ? c.CarType.CarTypeName : null,
                    DistrictId = c.District != null ? c.District.DistrictId : null,
                    DistrictName = c.District != null ? c.District.DistrictName : null,
                    Address = c.Address != null ? c.Address : null
                }).ToListAsync();
        }

        // GET: api/Car/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TblCar>> GetTblCar(int id)
        {
            var tblCar = await _context.TblCars.FindAsync(id);

            if (tblCar == null)
            {
                return NotFound();
            }

            return tblCar;
        }

        // PUT: api/Car/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTblCar(int id, TblCar tblCar)
        {
            if (id != tblCar.CarId)
            {
                return BadRequest();
            }

            _context.Entry(tblCar).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TblCarExists(id))
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

        // POST: api/Car
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<TblCar>> PostTblCar(TblCar tblCar)
        {
            _context.TblCars.Add(tblCar);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTblCar", new { id = tblCar.CarId }, tblCar);
        }

        // DELETE: api/Car/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTblCar(int id)
        {
            var tblCar = await _context.TblCars.FindAsync(id);
            if (tblCar == null)
            {
                return NotFound();
            }

            _context.TblCars.Remove(tblCar);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TblCarExists(int id)
        {
            return _context.TblCars.Any(e => e.CarId == id);
        }
    }
}
