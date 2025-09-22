using System;
using System.Collections.Generic;

namespace BackEnd_DotnetCore.Models;

public partial class TblCategory
{
    public int CateId { get; set; }

    public string? Title { get; set; }

    public string? Description { get; set; }

    public int? Active { get; set; }

    public virtual ICollection<TblCar> TblCars { get; set; } = new List<TblCar>();
}
