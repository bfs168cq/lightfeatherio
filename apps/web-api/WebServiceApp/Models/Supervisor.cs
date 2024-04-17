namespace WebServiceApp.Models
{
    public class Supervisor
    {
        public long Id { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Jurisdiction { get; set; }
        public string? IdentificationNumber { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }

    public class SupervisorNotification : Supervisor
    {
        public bool ByEmail { get; set; }
        public bool ByPhone { get; set; }
        public string? Status { get; set; }
    }
}
