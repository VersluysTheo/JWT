using gestionConcert.Models.Data;
using Microsoft.AspNetCore.JsonPatch.Internal;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Driver;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace gestionConcert.Models.Services
{
    public class UserService
    {
        private readonly IMongoCollection<Users> users;
        private readonly string? key;

        public UserService(IOptions<DatabaseSettings> userdatabaseSettings)
        {
            var mongoClient = new MongoClient(userdatabaseSettings.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(userdatabaseSettings.Value.DatabaseName);
            users = mongoDatabase.GetCollection<Users>(userdatabaseSettings.Value.CollectionName);

            this.key = Configuration.GetSection("JwtKey").ToString();
        }

        public async Task<List<Users>> GetAsync() =>
            await users.Find(_ => true).ToListAsync();

        public async Task<Users?> GetAsync(string id) =>
            await users.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task CreateAsync(Users newUser) =>
            await users.InsertOneAsync(newUser);

        public string? Authenticate(string email, string password)
        {
            var user = this.users.Find(x => x.Email == email && x.Password == password).FirstOrDefault();

            if (user == null)
                return null;

            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenKey = Encoding.ASCII.GetBytes(key);
            var tokenDescriptor = new SecurityTokenDescriptor()
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Email, email),
                }),
                Expires = DateTime.UtcNow.AddHours(1),

                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(tokenKey),
                SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
    }
}
