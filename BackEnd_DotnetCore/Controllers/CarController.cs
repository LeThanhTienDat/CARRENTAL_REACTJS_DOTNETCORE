using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BackEnd_DotnetCore.Models;
using BackEnd_DotnetCore.DTOs;
using BackEnd_DotnetCore.Helpers;

namespace BackEnd_DotnetCore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarController : ControllerBase
    {
        private readonly CarRentalApi2Context _context;

        public CarController(CarRentalApi2Context context)
        {
            _context = context;
        }
        public async Task<ActionResult<IEnumerable<CarDTO>>> GetFullCar(int? size = null)
        {
            var query = _context.TblCars
                .Include(c => c.Cate)
                .Include(c => c.CarType)
                .Include(c => c.District)
                .Include(c => c.City)
                .Include(c => c.TblCarImages)              
                .AsQueryable();       
            query = query.OrderByDescending(c => c.CarId);
            if (size.HasValue)
            {
                query = query.Take(size.Value);
            }
            
            var cars = await query
                .Select(c => new CarDTO
                {

                    CarId = c.CarId,
                    CateId = c.Cate != null ? c.Cate.CateId : null,
                    CateName = c.Cate != null ? c.Cate.Title : null,
                    Active = c.Active,
                    Brand = c.Brand,
                    Model = c.Model,
                    PricePerDay = c.PricePerDay,
                    CarStatus = c.CarStatus,
                    LicensePlate = c.LicensePlate,
                    SeatCount = c.SeatCount,
                    Color = c.Color,
                    CarTypeId = c.CarType != null ? c.CarType.CarTypeId : null,
                    CarTypeName = c.CarType != null ? c.CarType.CarTypeName : null,
                    DistrictId = c.District != null ? c.District.DistrictId : null,
                    DistrictName = c.District != null ? c.District.DistrictName : null,
                    CityId = c.City != null ? c.City.CityId : null,
                    CityName = c.City != null ? c.City.CityName : null,
                    Address = c.Address != null ? c.Address : null,
                    Slug = c.Slug != null ? c.Slug : null,
                    CarImages = c.TblCarImages.Select(img => new CarImageDTO
                    {
                        Id = img.Id,
                        Image = img.Image != null ? img.Image : null,
                        CarId = img.CarId
                    }).ToList()
                }).ToListAsync();
            var carWithIndex = cars.Select((car, index) =>
            {
                car.OrderNumber = index + 1;
                return car;
            }).ToList();
            return carWithIndex;
        }
        public async Task<ActionResult<CarDTO>> GetFullCarById(int? id = null, string? slug = null)
        {
            var query = _context.TblCars
                    .Include(c => c.Cate)
                    .Include(c => c.CarType)
                    .Include(c => c.District)
                    .Include(c => c.City)
                    .Include(c => c.TblCarImages)
                    .AsQueryable();
            if (id.HasValue)
            {
                query = query.Where(c => c.CarId == id);
            }
            if (!string.IsNullOrEmpty(slug))
            {
                query = query.Where(c => c.Slug == slug);
            }
                
            var car = await query
                .Select(c => new CarDTO
                {

                    CarId = c.CarId,
                    CateId = c.Cate != null ? c.Cate.CateId : null,
                    CateName = c.Cate != null ? c.Cate.Title : null,
                    Active = c.Active,
                    Brand = c.Brand,
                    Model = c.Model,
                    PricePerDay = c.PricePerDay,
                    CarStatus = c.CarStatus,
                    LicensePlate = c.LicensePlate,
                    SeatCount = c.SeatCount,
                    Color = c.Color,
                    CarTypeId = c.CarType != null ? c.CarType.CarTypeId : null,
                    CarTypeName = c.CarType != null ? c.CarType.CarTypeName : null,
                    DistrictId = c.District != null ? c.District.DistrictId : null,
                    DistrictName = c.District != null ? c.District.DistrictName : null,
                    CityId = c.City != null ? c.City.CityId : null,
                    CityName = c.City != null ? c.City.CityName : null,
                    Address = c.Address != null ? c.Address : null,
                    Slug = c.Slug != null ? c.Slug : null,
                    CarImages = c.TblCarImages.Select(img => new CarImageDTO
                    {
                        Id = img.Id,
                        Image = img.Image != null ? img.Image : null,
                        CarId = img.CarId
                    }).ToList()
                }).FirstOrDefaultAsync();
            if(car == null)
            {
                return NotFound();
            }
            return car;
        }
        // GET: api/Car
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CarDTO>>> GetTblCars()
        {
            var cars = GetFullCar();
            return await cars;
        }

        // GET: api/TopCar
        [HttpGet("TopCar")]
        public async Task<ActionResult<IEnumerable<CarDTO>>> GetTopCars()
        {
            var cars = GetFullCar(8);
            return await cars;
        }

        // GET: api/Car/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CarDTO>> GetTblCar(int id)
        {
            var car = await GetFullCarById(id);
            if(car == null)
            {
                return NotFound();
            }
            return car;
        }
        // GET: api/Car/{slug}
        [HttpGet("slug/{*slug}")]
        public async Task<ActionResult<CarDTO>> GetTblCar(string slug)
        {
            var car = await GetFullCarById(null, slug);
            if (car == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(car);
            }
        }
        private async Task<CarDTO?> GetCarDtoById(int id)
        {
            return await _context.TblCars
                .Include(c => c.Cate)
                .Include(c => c.CarType)
                .Include(c => c.District)
                .Include(c => c.City)
                .Where(c => c.CarId == id)
                .Select(c => new CarDTO
                {
                    CarId = c.CarId,
                    CateId = c.Cate != null ? c.Cate.CateId : null,
                    CateName = c.Cate != null ? c.Cate.Title : null,
                    Active = c.Active,
                    Brand = c.Brand,
                    Model = c.Model,
                    PricePerDay = c.PricePerDay,
                    CarStatus = c.CarStatus,   
                    LicensePlate = c.LicensePlate,
                    SeatCount = c.SeatCount,
                    Color = c.Color,
                    CarTypeId = c.CarType != null ? c.CarType.CarTypeId : null,
                    CarTypeName = c.CarType != null ? c.CarType.CarTypeName : null,
                    DistrictId = c.District != null ? c.District.DistrictId : null,
                    DistrictName = c.District != null ? c.District.DistrictName : null,
                    CityId = c.City != null ? c.City.CityId : null,
                    CityName = c.City != null ? c.City.CityName : null,
                    Address = c.Address,
                    Slug = c.Slug != null ? c.Slug : null
                }).FirstOrDefaultAsync();
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
        
            try
            {
                var car = await _context.TblCars.FindAsync(id);
                if(car == null) return NotFound();
                car.CateId = tblCar.CateId;
                car.Brand = tblCar.Brand;
                car.Model = tblCar.Model;
                car.PricePerDay = tblCar.PricePerDay;
                car.CarStatus = tblCar.CarStatus;           
                car.LicensePlate = tblCar.LicensePlate;
                car.SeatCount = tblCar.SeatCount;   
                car.Color = tblCar.Color;
                car.CarTypeId = tblCar.CarTypeId;
                car.Active = tblCar.Active;
                car.DistrictId = tblCar.DistrictId;
                car.Address = tblCar.Address;
                car.CityId = tblCar.CityId;

                await _context.SaveChangesAsync();            
                //var editedCar = await GetCarDtoById(id);
                //if (editedCar == null) return NotFound();
                return Ok(car);
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

            
        }

        // POST: api/Car
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<TblCar>> PostTblCar(TblCar tblCar)
        {
            if(tblCar.Model != null)
            {
                tblCar.Slug = SlugHelper.GenerateSlug(tblCar.Model);
            }
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
