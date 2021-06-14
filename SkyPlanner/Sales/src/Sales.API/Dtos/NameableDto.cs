namespace Sales.API.Dtos
{
    public abstract class NameableDto<Tkey>:EntityDto<Tkey>
    {
        public string Name { get; set; }
    }
}
