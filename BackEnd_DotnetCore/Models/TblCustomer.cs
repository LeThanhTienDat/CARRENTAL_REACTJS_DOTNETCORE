using System;
using System.Collections.Generic;

namespace BackEnd_DotnetCore.Models;

public partial class TblCustomer
{
    public int CusId { get; set; }

    public string? Email { get; set; }

    public string? Password { get; set; }

    public string? Phone { get; set; }

    public string? Address { get; set; }

    public int? CityId { get; set; }

    public int? Active { get; set; }

    public string? CusIdCard { get; set; }

    public DateOnly? CreateDate { get; set; }

    public string? Name { get; set; }

    public int? DistrictId { get; set; }

    public virtual TblCity? City { get; set; }

    public virtual TblDistrict? District { get; set; }

    public virtual ICollection<TblBooking> TblBookings { get; set; } = new List<TblBooking>();
}
