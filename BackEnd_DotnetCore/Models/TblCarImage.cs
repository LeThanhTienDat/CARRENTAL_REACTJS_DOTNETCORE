using System;
using System.Collections.Generic;

namespace BackEnd_DotnetCore.Models;

public partial class TblCarImage
{
    public int Id { get; set; }

    public string? Image { get; set; }

    public int CarId { get; set; }

    public virtual TblCar Car { get; set; } = null!;
}
