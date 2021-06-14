namespace Sales.API.Dtos.Account
{
    public class ContactDto : NameableDto<int>
    {
        
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }

    }
}
