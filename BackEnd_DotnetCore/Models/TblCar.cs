using System;
using System.Collections.Generic;

namespace BackEnd_DotnetCore.Models;

public partial class TblCar
{
    public int CarId { get; set; }

    public int? CateId { get; set; }

    public string? Brand { get; set; }

    public string? Model { get; set; }

    public decimal? PricePerDay { get; set; }

    public string? CarStatus { get; set; }

    public string? LicensePlate { get; set; }

    public int? SeatCount { get; set; }

    public string? Color { get; set; }

    public int? CarTypeId { get; set; }

    public int? Active { get; set; }

    public int? DistrictId { get; set; }

    public int? CityId { get; set; }

    public string? Address { get; set; }

    public string? Slug { get; set; }

    public virtual TblCarType? CarType { get; set; }

    public virtual TblCategory? Cate { get; set; }

    public virtual TblCity? City { get; set; }

    public virtual TblDistrict? District { get; set; }

    public virtual ICollection<TblBookingDetail> TblBookingDetails { get; set; } = new List<TblBookingDetail>();

    public virtual ICollection<TblCarImage> TblCarImages { get; set; } = new List<TblCarImage>();
}
