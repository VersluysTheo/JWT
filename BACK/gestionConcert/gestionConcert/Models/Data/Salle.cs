using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace gestionConcert.Models.Data
{
    public class Salle
    {
        [BsonId]
        [BsonElement("_id")]
        public int Id { get; set; }

        [BsonElement("nom")]
        public string? Nom { get; set; } = null!;

        [BsonElement("adresse")]
        public Adresse? AdresseSalle { get; set; } = null!;

        [BsonElement("styles")]
        public List<string>? Styles { get; set; }

        [BsonElement("avis")]
        public Avis[]? ListeAvis { get; set; } = null!;

        [BsonElement("capacite")]
        public int? Capacite { get; set; }

        [BsonElement("smac")]
        public bool? Smac { get; set; }

        [BsonElement("contact")]
        public Contact[]? ContactSalle { get; set; } = null!;
    }
}