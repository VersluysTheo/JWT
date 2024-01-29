using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace gestionConcert.Models.Data
{
    public class Localisation
    {
        [BsonElement("type")]
        public string? Type { get; set; } = null!;

        [BsonElement("coordinates")]
        public List<double>? Coordinates { get; set; } = null!;
    }
}