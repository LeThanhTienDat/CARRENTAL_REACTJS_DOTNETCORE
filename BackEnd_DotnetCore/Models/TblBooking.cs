using System;
using System.Collections.Generic;

namespace BackEnd_DotnetCore.Models;

public partial class TblBooking
{
    public int BookingId { get; set; }

    public int? CusId { get; set; }

    public string? BookingStatus { get; set; }

    public decimal? Discount { get; set; }

    public decimal? Deposit { get; set; }

    public int? PaymentTypeId { get; set; }

    public decimal? TotalPrice { get; set; }

    public DateOnly? OrderDate { get; set; }

    public int? Paid { get; set; }

    public decimal? DepositCash { get; set; }

    public int? DepositCashHasPaid { get; set; }

    public int? PaymentConfirm { get; set; }

    public int? IsCancel { get; set; }

    public string? ReasonCancel { get; set; }

    public DateOnly? CompleteDate { get; set; }

    public DateOnly? CancelDate { get; set; }

    public int? PickupMethod { get; set; }

    public virtual TblCustomer? Cus { get; set; }

    public virtual TblPaymentType? PaymentType { get; set; }

    public virtual ICollection<TblBookingDetail> TblBookingDetails { get; set; } = new List<TblBookingDetail>();
}
