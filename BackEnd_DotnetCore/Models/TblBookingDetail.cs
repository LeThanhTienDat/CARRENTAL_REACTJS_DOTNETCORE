using System;
using System.Collections.Generic;

namespace BackEnd_DotnetCore.Models;

public partial class TblBookingDetail
{
    public int BookingDetailsId { get; set; }

    public int? BookingId { get; set; }

    public int? CarId { get; set; }

    public string? BookingDetailsStatus { get; set; }

    public DateOnly? BookingDate { get; set; }

    public DateOnly? StartDate { get; set; }

    public DateOnly? EndDate { get; set; }

    public DateOnly? ActualReturnDate { get; set; }

    public decimal? PricePerCar { get; set; }

    public decimal? Fine { get; set; }

    public decimal? Refund { get; set; }

    public int? StatusReturn { get; set; }

    public virtual TblBooking? Booking { get; set; }

    public virtual TblCar? Car { get; set; }
}
