using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using TicketSystem.Infrastructure.StaticExt;
using TicketSystem.Models;
using TicketSystem.ViewModels;
using Newtonsoft.Json;
using Microsoft.Extensions.Options;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;

namespace TicketSystem.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly TicketSystemContext _db;
        private JwtSettings _jwtSeetings;

        public AccountController(IOptions<JwtSettings> option, TicketSystemContext context)
        {
            _jwtSeetings = option.Value;
            _db = context;
        }

        [HttpGet]
        public bool IsLogin()
        {
            return User.Identity.IsAuthenticated;
        }

        [HttpPost]
        //[ValidateAntiForgeryToken]
        public IActionResult Login(CredentialsViewModel _User)
        {
            var pwd = CodingUtils.MD5(_User.Password);
            SystemUsers user = _db.SystemUsers.Where(x => x.Email == _User.Email && x.Pwd == pwd).FirstOrDefault();

            if (user == null)
            {
                return Ok("帳號與密碼有錯!");
            }
            else
            {
                var claims = new List<Claim>()
                {
                    new Claim("UserName" , user.UserName),
                    new Claim("UserID",user.Tid.ToString()),
                    new Claim("Role", user.RoleTid.ToString()),
                    new Claim("RoleName", _db.SystemRole.Find(user.RoleTid).RoleName),
                    new Claim("ActionList", _db.SystemRole.Find(user.RoleTid).ActionList)
                };

                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSeetings.Key));
                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                var jwtToken = new JwtSecurityToken(
                    _jwtSeetings.Issuer,
                    _jwtSeetings.Audience,
                    claims,
                    DateTime.Now,
                    DateTime.Now.AddMinutes(30),
                    creds
                    );
                var token = new JwtSecurityTokenHandler().WriteToken(jwtToken);


                var userIdentity = new ClaimsIdentity(claims, "User Identity");
                var userPrincipal = new ClaimsPrincipal(new[] { userIdentity });
                HttpContext.SignInAsync(userPrincipal);

                return Ok(new { Code = 20000, token = token });

            }

        }

        [HttpPost]
        //[Authorize]
        //[ValidateAntiForgeryToken]
        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);

            return Ok("ok");
        }

        [HttpGet]
        //[Authorize]
        public UserInfoViewModel GetUserInfo()
        {
            var userInfo = new UserInfoViewModel(User.Claims.ToList());
            return userInfo;

        }
    }
}

