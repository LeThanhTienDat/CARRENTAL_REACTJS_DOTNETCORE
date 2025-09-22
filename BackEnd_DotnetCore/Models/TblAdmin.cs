using System;
using System.Collections.Generic;

namespace BackEnd_DotnetCore.Models;

public partial class TblAdmin
{
    public int AdminId { get; set; }

    public string? Name { get; set; }

    public string? Email { get; set; }

    public string? Password { get; set; }

    public int? Active { get; set; }

    public string Salt { get; set; } = null!;

    public string? Phone { get; set; }
}
