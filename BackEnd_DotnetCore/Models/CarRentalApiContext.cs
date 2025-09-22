using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace BackEnd_DotnetCore.Models;

public partial class CarRentalApiContext : DbContext
{
    public CarRentalApiContext()
    {
    }

    public CarRentalApiContext(DbContextOptions<CarRentalApiContext> options)
        : base(options)
    {
    }

    public virtual DbSet<TblAdmin> TblAdmins { get; set; }

    public virtual DbSet<TblBooking> TblBookings { get; set; }

    public virtual DbSet<TblBookingDetail> TblBookingDetails { get; set; }

    public virtual DbSet<TblCar> TblCars { get; set; }

    public virtual DbSet<TblCarType> TblCarTypes { get; set; }

    public virtual DbSet<TblCategory> TblCategories { get; set; }

    public virtual DbSet<TblCity> TblCities { get; set; }

    public virtual DbSet<TblCustomer> TblCustomers { get; set; }

    public virtual DbSet<TblDistrict> TblDistricts { get; set; }

    public virtual DbSet<TblPaymentType> TblPaymentTypes { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=localhost;Database=CAR_RENTAL_API;User Id=sa;Password=123456;TrustServerCertificate=True");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<TblAdmin>(entity =>
        {
            entity.HasKey(e => e.AdminId).HasName("pk_Admin_admin_id");

            entity.ToTable("tbl_Admin");

            entity.Property(e => e.AdminId).HasColumnName("admin_id");
            entity.Property(e => e.Active)
                .HasDefaultValue(1)
                .HasColumnName("active");
            entity.Property(e => e.Email)
                .HasMaxLength(50)
                .HasColumnName("email");
            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .HasColumnName("name");
            entity.Property(e => e.Password)
                .HasMaxLength(100)
                .HasColumnName("password");
            entity.Property(e => e.Phone)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("phone");
            entity.Property(e => e.Salt)
                .HasMaxLength(255)
                .HasColumnName("salt");
        });

        modelBuilder.Entity<TblBooking>(entity =>
        {
            entity.HasKey(e => e.BookingId).HasName("pk_Booking_booking_id");

            entity.ToTable("tbl_Booking");

            entity.Property(e => e.BookingId).HasColumnName("booking_id");
            entity.Property(e => e.BookingStatus)
                .HasMaxLength(50)
                .HasDefaultValue("Waiting")
                .HasColumnName("booking_status");
            entity.Property(e => e.CancelDate).HasColumnName("cancel_date");
            entity.Property(e => e.CompleteDate).HasColumnName("complete_date");
            entity.Property(e => e.CusId).HasColumnName("cus_id");
            entity.Property(e => e.Deposit)
                .HasColumnType("decimal(18, 0)")
                .HasColumnName("deposit");
            entity.Property(e => e.DepositCash)
                .HasDefaultValue(0m)
                .HasColumnType("decimal(18, 0)")
                .HasColumnName("deposit_cash");
            entity.Property(e => e.DepositCashHasPaid)
                .HasDefaultValue(0)
                .HasColumnName("deposit_cash_has_paid");
            entity.Property(e => e.Discount)
                .HasColumnType("decimal(18, 0)")
                .HasColumnName("discount");
            entity.Property(e => e.IsCancel)
                .HasDefaultValue(0)
                .HasColumnName("is_cancel");
            entity.Property(e => e.OrderDate).HasColumnName("order_date");
            entity.Property(e => e.Paid)
                .HasDefaultValue(0)
                .HasColumnName("paid");
            entity.Property(e => e.PaymentConfirm)
                .HasDefaultValue(0)
                .HasColumnName("payment_confirm");
            entity.Property(e => e.PaymentTypeId).HasColumnName("payment_type_id");
            entity.Property(e => e.PickupMethod).HasColumnName("pickup_method");
            entity.Property(e => e.ReasonCancel)
                .HasMaxLength(200)
                .HasColumnName("reason_cancel");
            entity.Property(e => e.TotalPrice)
                .HasColumnType("decimal(18, 0)")
                .HasColumnName("total_price");

            entity.HasOne(d => d.Cus).WithMany(p => p.TblBookings)
                .HasForeignKey(d => d.CusId)
                .HasConstraintName("fk_Booking_Customer_cus_id");

            entity.HasOne(d => d.PaymentType).WithMany(p => p.TblBookings)
                .HasForeignKey(d => d.PaymentTypeId)
                .HasConstraintName("fk_Booking_Payment_type_payment_type_id");
        });

        modelBuilder.Entity<TblBookingDetail>(entity =>
        {
            entity.HasKey(e => e.BookingDetailsId).HasName("pk_Booking_details_booking_details_id");

            entity.ToTable("tbl_Booking_details");

            entity.Property(e => e.BookingDetailsId).HasColumnName("booking_details_id");
            entity.Property(e => e.ActualReturnDate).HasColumnName("actual_return_date");
            entity.Property(e => e.BookingDate).HasColumnName("booking_date");
            entity.Property(e => e.BookingDetailsStatus)
                .HasMaxLength(50)
                .HasDefaultValue("Waiting")
                .HasColumnName("booking_details_status");
            entity.Property(e => e.BookingId).HasColumnName("booking_id");
            entity.Property(e => e.CarId).HasColumnName("car_id");
            entity.Property(e => e.EndDate).HasColumnName("end_date");
            entity.Property(e => e.Fine)
                .HasColumnType("decimal(18, 0)")
                .HasColumnName("fine");
            entity.Property(e => e.PricePerCar)
                .HasColumnType("decimal(18, 0)")
                .HasColumnName("price_per_car");
            entity.Property(e => e.Refund)
                .HasColumnType("decimal(18, 0)")
                .HasColumnName("refund");
            entity.Property(e => e.StartDate).HasColumnName("start_date");
            entity.Property(e => e.StatusReturn)
                .HasDefaultValue(0)
                .HasColumnName("status_return");

            entity.HasOne(d => d.Booking).WithMany(p => p.TblBookingDetails)
                .HasForeignKey(d => d.BookingId)
                .HasConstraintName("fk_Booking_details_Booking_booking_id");

            entity.HasOne(d => d.Car).WithMany(p => p.TblBookingDetails)
                .HasForeignKey(d => d.CarId)
                .HasConstraintName("fk_Booking_details_Car_car_id");
        });

        modelBuilder.Entity<TblCar>(entity =>
        {
            entity.HasKey(e => e.CarId).HasName("pk_Car_car_id");

            entity.ToTable("tbl_Car");

            entity.Property(e => e.CarId).HasColumnName("car_id");
            entity.Property(e => e.Active)
                .HasDefaultValue(1)
                .HasColumnName("active");
            entity.Property(e => e.Address)
                .HasMaxLength(200)
                .HasColumnName("address");
            entity.Property(e => e.Brand)
                .HasMaxLength(50)
                .HasColumnName("brand");
            entity.Property(e => e.CarStatus)
                .HasMaxLength(50)
                .HasDefaultValue("Available")
                .HasColumnName("car_status");
            entity.Property(e => e.CarTypeId).HasColumnName("car_type_id");
            entity.Property(e => e.CateId).HasColumnName("cate_id");
            entity.Property(e => e.CityId).HasColumnName("city_id");
            entity.Property(e => e.Color)
                .HasMaxLength(20)
                .HasColumnName("color");
            entity.Property(e => e.DistrictId).HasColumnName("district_id");
            entity.Property(e => e.Image)
                .HasMaxLength(200)
                .HasColumnName("image");
            entity.Property(e => e.LicensePlate)
                .HasMaxLength(50)
                .HasColumnName("license_plate");
            entity.Property(e => e.Model)
                .HasMaxLength(50)
                .HasColumnName("model");
            entity.Property(e => e.PricePerDay)
                .HasColumnType("decimal(18, 0)")
                .HasColumnName("price_per_day");
            entity.Property(e => e.SeatCount).HasColumnName("seat_count");

            entity.HasOne(d => d.CarType).WithMany(p => p.TblCars)
                .HasForeignKey(d => d.CarTypeId)
                .HasConstraintName("fk_Car_Car_type_car_type_id");

            entity.HasOne(d => d.Cate).WithMany(p => p.TblCars)
                .HasForeignKey(d => d.CateId)
                .HasConstraintName("fk_Car_Category_cate_id");

            entity.HasOne(d => d.City).WithMany(p => p.TblCars)
                .HasForeignKey(d => d.CityId)
                .HasConstraintName("fk_tbl_Car_City_city_id");

            entity.HasOne(d => d.District).WithMany(p => p.TblCars)
                .HasForeignKey(d => d.DistrictId)
                .HasConstraintName("fk_tbl_Car_District_district_id");
        });

        modelBuilder.Entity<TblCarType>(entity =>
        {
            entity.HasKey(e => e.CarTypeId).HasName("pk_Car_type_car_type_id");

            entity.ToTable("tbl_Car_type");

            entity.Property(e => e.CarTypeId).HasColumnName("car_type_id");
            entity.Property(e => e.CarTypeName)
                .HasMaxLength(100)
                .HasColumnName("car_type_name");
        });

        modelBuilder.Entity<TblCategory>(entity =>
        {
            entity.HasKey(e => e.CateId).HasName("pk_Category_cate_id");

            entity.ToTable("tbl_Category");

            entity.Property(e => e.CateId).HasColumnName("cate_id");
            entity.Property(e => e.Active).HasColumnName("active");
            entity.Property(e => e.Description)
                .HasColumnType("text")
                .HasColumnName("description");
            entity.Property(e => e.Title)
                .HasMaxLength(100)
                .HasColumnName("title");
        });

        modelBuilder.Entity<TblCity>(entity =>
        {
            entity.HasKey(e => e.CityId).HasName("pk_City_city_id");

            entity.ToTable("tbl_City");

            entity.Property(e => e.CityId).HasColumnName("city_id");
            entity.Property(e => e.CityName)
                .HasMaxLength(100)
                .HasColumnName("city_name");
        });

        modelBuilder.Entity<TblCustomer>(entity =>
        {
            entity.HasKey(e => e.CusId).HasName("pk_Customer_cus_id");

            entity.ToTable("tbl_Customer");

            entity.Property(e => e.CusId).HasColumnName("cus_id");
            entity.Property(e => e.Active)
                .HasDefaultValue(1)
                .HasColumnName("active");
            entity.Property(e => e.Address)
                .HasMaxLength(150)
                .HasColumnName("address");
            entity.Property(e => e.CityId).HasColumnName("city_id");
            entity.Property(e => e.CreateDate).HasColumnName("create_date");
            entity.Property(e => e.CusIdCard)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("cus_id_card");
            entity.Property(e => e.DistrictId).HasColumnName("district_id");
            entity.Property(e => e.Email)
                .HasMaxLength(50)
                .HasColumnName("email");
            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .HasColumnName("name");
            entity.Property(e => e.Password)
                .HasMaxLength(100)
                .HasColumnName("password");
            entity.Property(e => e.Phone)
                .HasMaxLength(15)
                .IsUnicode(false)
                .HasColumnName("phone");

            entity.HasOne(d => d.City).WithMany(p => p.TblCustomers)
                .HasForeignKey(d => d.CityId)
                .HasConstraintName("fk_Customer_City_city_id");

            entity.HasOne(d => d.District).WithMany(p => p.TblCustomers)
                .HasForeignKey(d => d.DistrictId)
                .HasConstraintName("fk_Customer_District_district_id");
        });

        modelBuilder.Entity<TblDistrict>(entity =>
        {
            entity.HasKey(e => e.DistrictId).HasName("pk_District_district_id");

            entity.ToTable("tbl_District");

            entity.Property(e => e.DistrictId).HasColumnName("district_id");
            entity.Property(e => e.CityId).HasColumnName("city_id");
            entity.Property(e => e.DistrictName)
                .HasMaxLength(100)
                .HasColumnName("district_name");
        });

        modelBuilder.Entity<TblPaymentType>(entity =>
        {
            entity.HasKey(e => e.PaymentTypeId).HasName("pk_Payment_type_payment_type_id");

            entity.ToTable("tbl_Payment_type");

            entity.Property(e => e.PaymentTypeId).HasColumnName("payment_type_id");
            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .HasColumnName("name");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
