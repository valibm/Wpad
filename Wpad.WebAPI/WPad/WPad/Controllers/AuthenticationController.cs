using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using System;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using WPad.Business.DTOs;
using WPad.Business.DTOs.Authentication;
using WPad.Business.DTOs.User;
using WPad.Business.Services.Interfaces;
using WPad.Core.Entities;
using WPad.Core.Interfaces;

namespace WPad.Controllers
{
    public class AuthenticationController : CustomBaseController
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IJwtService _jwtService;
        private readonly IMailService _mailService;

        public AuthenticationController(UserManager<AppUser> userManager,
                                        RoleManager<IdentityRole> roleManager,
                                        IJwtService jwtService,
                                        IMailService mailService)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _jwtService = jwtService;
            _mailService = mailService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto register)
        {
            AppUser EmailCheck = await _userManager.FindByEmailAsync(register.Email);
            AppUser usernameCheck = await _userManager.FindByNameAsync(register.Username);
            if (EmailCheck != null)
            {
                return ActionResultInstance(Response<NoContentDto>.Fail("Email already in use", StatusCodes.Status403Forbidden, true));
            }
            if (usernameCheck != null)
            {
                return ActionResultInstance(Response<NoContentDto>.Fail("Username already in use", StatusCodes.Status403Forbidden, true));
            }
            AppUser user = new()
            {
                Firstname = register.Firstname,
                Lastname = register.Lastname,
                Email = register.Email,
                UserName = register.Username,
                Birthday = register.Birthday
            };
            IdentityResult result = await _userManager.CreateAsync(user, register.Password);
            if (!result.Succeeded)
            {
                foreach (IdentityError error in result.Errors)
                {
                    return ActionResultInstance(Response<NoContentDto>.Fail(error.Description, StatusCodes.Status403Forbidden, true));
                }
            };
            await _userManager.AddToRoleAsync(user, "Member");
            await EmailConfirmation(user);

            return ActionResultInstance(Response<NoContentDto>.Success(200, "Confirmation email is sent"));
        }

        [HttpPost("confirmemail/{userId}/{token}")]
        public async Task<IActionResult> ConfirmEmail(string userId, string token)
        {
            var appUser = await _userManager.FindByIdAsync(userId);
            if (appUser is null)
            {
                return ActionResultInstance(Response<NoContentDto>.Fail("User not found", 400, true));
            }
            //var decodedToken = WebEncoders.Base64UrlDecode(token);
            //string normalToken = Encoding.UTF8.GetString(decodedToken);
            await _userManager.ConfirmEmailAsync(appUser, token);
            return ActionResultInstance(Response<NoContentDto>.Success(200, "Email confirmed succesfully"));
        }

        private async Task EmailConfirmation(AppUser user)
        {
            string token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
            var uriBuilder = new UriBuilder("https://localhost:44330/api/confirmemail");
            var query = HttpUtility.ParseQueryString(uriBuilder.Query);
            query["userId"] = user.Id;
            query["token"] = token;
            uriBuilder.Query = query.ToString();
            var urlString = uriBuilder.ToString();
            //var encodedEmailToken = Encoding.UTF8.GetBytes(token);
            //var validEmailToken = WebEncoders.Base64UrlEncode(encodedEmailToken);
            //string redirectionLink = $"{_configuration["AppUrl"]}/api/Authentication/confirmemail/{user.Id}/{validEmailToken}";
            //string redirectionLink = Url.Action(nameof(ConfirmEmail), controller: "Authentication", new { userId = user.Id, token = validEmailToken }, protocol: HttpContext.Request.Scheme);
            string linkTag = $"<a href=\"{urlString}\">Click here to confirm your email</a>";
            await _mailService.SendEmail(linkTag, user.Email, "Wpad email confirmation");
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto login)
        {
            AppUser user = await _userManager.FindByNameAsync(login.Username);
            if (user == null)
            {
                user = await _userManager.FindByEmailAsync(login.Username);
            }
            if (user == null)
            {
                return ActionResultInstance(Response<NoContentDto>.Fail("Username or password is wrong", 400, true));
            }
            if (!await _userManager.CheckPasswordAsync(user, login.Password)) return ActionResultInstance(Response<NoContentDto>.Fail("Username or password is wrong", 400, true));
            //if (user.EmailConfirmed == false)
            //{
            //    return ActionResultInstance(Response<NoContentDto>.Fail("Please confirm your email", 400, true));
            //}
            var roles = _userManager.GetRolesAsync(user).Result;
            var jwtToken = _jwtService.GetToken(user, roles);
            var userData = new UserLoginData
            {
                Id = user.Id,
                Username = user.UserName,
                Email = user.Email,
                Roles = roles,
                Token = jwtToken,
            };
            return ActionResultInstance(Response<UserLoginData>.Success(userData, 200));
        }

        //[HttpPost("createroles")]
        //public async Task CreateRoles()
        //{
        //    await _roleManager.CreateAsync(new IdentityRole
        //    {
        //        Name = "Member"
        //    });
        //}
    }
}
