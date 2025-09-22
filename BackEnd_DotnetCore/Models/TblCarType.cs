using System;
using System.Collections.Generic;

namespace BackEnd_DotnetCore.Models;

public partial class TblCarType
{
    public int CarTypeId { get; set; }

    public string? CarTypeName { get; set; }

    public virtual ICollection<TblCar> TblCars { get; set; } = new List<TblCar>();
}
