using gestionConcert.Models.Data;
using gestionConcert.Models.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace gestionConcert.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : Controller
    {
        private readonly UserService _userService;

        public UserController(UserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        public async Task<List<Users>> Get() =>
            await _userService.GetAsync();

        [HttpGet("{id:length(24)}")]
        public async Task<ActionResult<Users>> Get(string id)
        {
            var user = await _userService.GetAsync(id);
            if (user is null)
            {
                return NotFound();
            }

            return user;
        }

        [HttpPost]
        public async Task<IActionResult> Post(Users user)
        {
            await _userService.CreateAsync(user);
            return CreatedAtAction(nameof(Get), new { id = user.Id }, user);
        }
    }
}
