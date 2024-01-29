using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace gestionConcert.Models.Data
{
    public class Contact
    {
        [BsonElement("telephone")]
        public string? Telephone { get; set; } = null!;
    }
}