using System;
using System.Collections.Generic;

namespace BackEnd_DotnetCore.Models;

public partial class TblPaymentType
{
    public int PaymentTypeId { get; set; }

    public string? Name { get; set; }

    public virtual ICollection<TblBooking> TblBookings { get; set; } = new List<TblBooking>();
}
