namespace BackEnd_DotnetCore.DTOs
{
    public class CarDTO
    {
        public int CarId { get; set; }

        public int? CateId { get; set; }
        public string? CateName { get; set; }

        public string? Brand { get; set; }

        public string? Model { get; set; }

        public decimal? PricePerDay { get; set; }

        public string? CarStatus { get; set; }

        public string? Image { get; set; }

        public string? LicensePlate { get; set; }

        public int? SeatCount { get; set; }

        public string? Color { get; set; }

        public int? CarTypeId { get; set; }
        public string? CarTypeName {  get; set; }   

        public int? Active { get; set; }

        public int? DistrictId { get; set; }
        public string? DistrictName { get; set; }   

        public int? CityId { get; set; }
        public string? CityName {  get; set; }

        public string? Address { get; set; }
        public int OrderNumber { get; set; }
    }
}
