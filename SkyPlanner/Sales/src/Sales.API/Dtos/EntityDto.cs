using System.ComponentModel.DataAnnotations;

namespace Sales.API.Dtos
{
    public abstract class EntityDto<Tkey>
    {
        public Tkey Id { get; set; }
    }
}
