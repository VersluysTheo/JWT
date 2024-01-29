using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace gestionConcert.Models.Data
{
    public class Avis
    {
        [BsonElement("date")]
        public DateTime? Date { get; set; }

        [BsonElement("note")]
        public int? Note { get; set; }
    }
}