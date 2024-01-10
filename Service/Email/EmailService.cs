
using System.IO;
using System.Threading.Tasks;
using System;
using HotelManagement;
using Google.Apis.Auth.OAuth2;
using Google.Apis.Gmail.v1;
using Google.Apis.Auth.OAuth2.Flows;
using Google.Apis.Auth.OAuth2.Responses;
using Google.Apis.Services;
using HotelManagement.Models;
using RazorEngine;
using RazorEngine.Templating;
using Google.Apis.Gmail.v1.Data;
using HotelManagement.Services.Email.Models;

namespace HotelManagement.Services.Email

{
    public class EmailService
    {
        private readonly string _clientId;
        private readonly string _clientSecret;
        private readonly string _refreshToken;
        private readonly UserCredential _credential;
        private readonly GmailService _service;

        public EmailService()
        {
            _clientId = "1071896281442-2sbiblavo24n8554gdl95mgk4ie5p14v.apps.googleusercontent.com";
            _clientSecret = "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";
            _refreshToken = "1//04Taua2NjGmjiCgYIARAAGAQSNwF-L9IrxDDFIiNdyJ8DVf6-aWEZqEX0o6SrP6gxigBhMTVHxJX-YAaNQfyjj_3oPA-dkNACbVw";

            _credential = new UserCredential(
                new GoogleAuthorizationCodeFlow(new GoogleAuthorizationCodeFlow.Initializer
                {
                    ClientSecrets = new ClientSecrets
                    {
                        ClientId = _clientId,
                        ClientSecret = _clientSecret
                    }
                }),
            "user",
            new TokenResponse
            {
                RefreshToken = _refreshToken
            });

            _service = new GmailService(new BaseClientService.Initializer
            {
                HttpClientInitializer = _credential,
                ApplicationName = "EmailService",
            });
        }

        public async Task SendEmailAsync(EmailMessage emailMessage)
        {
            string htmlBody = RenderEmailFromTemplate(emailMessage.TemplateName, emailMessage.Model);

            string rawEmail = $"To: {emailMessage.To}\r\n" +
                              $"Subject: {emailMessage.Subject}\r\n" +
                              "Content-Type: text/html; charset=UTF-8\r\n\r\n" +
                              $"{htmlBody}";

            var message = new Message { Raw = Base64UrlEncode(rawEmail) };

            var request = _service.Users.Messages.Send(message, "me");
            await request.ExecuteAsync();
        }

        private string RenderEmailFromTemplate(string templateName, object model)
        {
            string templateFilePath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Service/Email/Templates", templateName + ".cshtml");
            string templateContent = File.ReadAllText(templateFilePath);

            string emailBody = Engine.Razor.RunCompile(templateContent, "templateKey", null, model);

            return emailBody;
        }

        private string Base64UrlEncode(string input)
        {
            byte[] inputBytes = System.Text.Encoding.UTF8.GetBytes(input);
            return Convert.ToBase64String(inputBytes).Replace('+', '-').Replace('/', '_');
        }
    }
}
