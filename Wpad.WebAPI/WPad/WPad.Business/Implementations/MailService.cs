using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using System;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using WPad.Core.Entities;
using WPad.Core.Interfaces;

namespace WPad.Business.Implementations
{
    public class MailService : IMailService
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly IConfiguration _configuration;

        public MailService(UserManager<AppUser> userManager, IConfiguration configuration)
        {
            _userManager = userManager;
            _configuration = configuration;
        }

        public async Task SendEmail(string htmlTag, string userMail, string subject)
        {
            string from = "valibm@code.edu.az";
            string to = userMail;
            string body = htmlTag;
            MailMessage message = new(from, to, subject, body)
            {
                BodyEncoding = System.Text.Encoding.UTF8,
                IsBodyHtml = true   
            };


            NetworkCredential credential = new(from, "arnodorian002");
            SmtpClient client = new("smtp.gmail.com", 587)
            {
                EnableSsl = true,
                UseDefaultCredentials = false,
                Credentials = credential
            };


            try
            {
                await client.SendMailAsync(message);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task EmailConfirmation(AppUser user)
        {
            string token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
            //var encodedEmailToken = Encoding.UTF8.GetBytes(token);
            //var validEmailToken = WebEncoders.Base64UrlEncode(encodedEmailToken);
            //string redirectionLink = $"{_configuration["AppUrl"]}/api/Authentication/confirmemail/{user.Id}/{validEmailToken}";
            string redirectionLink = "hello";
            string linkTag = $"<a href=\"{redirectionLink}\">Click here to confirm your email</a>";
            await SendEmail(linkTag, user.Email, "Wpad email confirmation");
        }
    }
}
