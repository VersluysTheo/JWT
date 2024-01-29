using gestionConcert.Models.Data;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace gestionConcert.Models.Services
{
    public class SallesService
    {
        private readonly IMongoCollection<Salle> _salleCollection;

        public SallesService(
            IOptions<DatabaseSettings> salleStoreDatabaseSettings)
        {
            var mongoClient = new MongoClient(
                salleStoreDatabaseSettings.Value.ConnectionString);

            var mongoDatabase = mongoClient.GetDatabase(
                salleStoreDatabaseSettings.Value.DatabaseName);

            _salleCollection = mongoDatabase.GetCollection<Salle>(
                salleStoreDatabaseSettings.Value.CollectionName);
        }

        public async Task<List<Salle>> GetAsync() =>
            await _salleCollection.Find(_ => true).ToListAsync();

        public async Task<Salle?> GetAsync(int id) =>
            await _salleCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task CreateAsync(Salle newBook) =>
            await _salleCollection.InsertOneAsync(newBook);

        public async Task UpdateAsync(int id, Salle updateSalle) =>
            await _salleCollection.ReplaceOneAsync(x => x.Id == id, updateSalle);

        public async Task RemoveAsync(int id) =>
            await _salleCollection.DeleteOneAsync(x => x.Id == id);
    }
}