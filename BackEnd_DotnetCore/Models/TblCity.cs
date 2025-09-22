using System;
using System.Collections.Generic;

namespace BackEnd_DotnetCore.Models;

public partial class TblCity
{
    public int CityId { get; set; }

    public string? CityName { get; set; }

    public virtual ICollection<TblCar> TblCars { get; set; } = new List<TblCar>();

    public virtual ICollection<TblCustomer> TblCustomers { get; set; } = new List<TblCustomer>();
}
