using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Newtonsoft.Json;
using System.IO;
using System.Text;
using System.Text.Json.Serialization;
using WPad.Business.Extensions;
using WPad.Business.Implementations;
using WPad.Business.Interfaces;
using WPad.Business.Profiles;
using WPad.Business.Services.Implementations;
using WPad.Business.Services.Interfaces;
using WPad.Core.Entities;
using WPad.Core.Interfaces;
using WPad.DAL.Context;
using WPad.DAL.Implementations;

namespace WPad
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors();
            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "WPad", Version = "v1" });
            });

            services.AddDbContext<AppDbContext>(options =>
            {
                options.UseSqlServer(Configuration.GetConnectionString("Default")).EnableSensitiveDataLogging();
            });

            services.AddControllers().AddNewtonsoftJson(options => { options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore; })
                                     .AddFluentValidation(options => { options.RegisterValidatorsFromAssemblyContaining<Startup>(); });

            services.UseCustomValidationResponse();

            services.AddIdentity<AppUser, IdentityRole>(options =>
            {
                options.Password.RequireNonAlphanumeric = false;

                options.Lockout.MaxFailedAccessAttempts = 5;
                options.Lockout.AllowedForNewUsers = false;

                options.User.RequireUniqueEmail = true;
                options.SignIn.RequireConfirmedEmail = false;
            })
                .AddDefaultTokenProviders()
                .AddEntityFrameworkStores<AppDbContext>();
            services.AddAuthentication(options =>
            {
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(option =>
            {
                option.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidAudience = Configuration.GetSection("Jwt:audience").Value,
                    ValidIssuer = Configuration.GetSection("Jwt:issuer").Value,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration.GetSection("Jwt:securityKey").Value)),
                };
            });

            services.AddAutoMapper(typeof(Mapper));

            services.AddScoped<IChannelRepository, ChannelRepository>();
            services.AddScoped<IChannelService, ChannelService>();
            services.AddScoped<IImageRepository, ImageRepository>();
            services.AddScoped<IImageService, ImageService>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IHeadingRepository, HeadingRepository>();
            services.AddScoped<IHeadingService, HeadingService>();
            services.AddScoped<ILikeRepository, LikeRepository>();
            services.AddScoped<ILikeService, LikeService>();
            services.AddScoped<ICommentRepository, CommentRepository>();
            services.AddScoped<ICommentService, CommentService>();
            services.AddScoped<IReplyRepository, ReplyRepository>();
            services.AddScoped<IReplyService, ReplyService>();
            services.AddScoped<IFollowService, FollowService>();
            services.AddScoped<IFollowRepository, FollowRepository>();
            services.AddScoped<IJwtService, JwtService>();
            services.AddScoped<IMailService, MailService>();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseCors(options =>
                options.WithOrigins("http://localhost:3000")
                       .AllowAnyHeader()
                       .AllowAnyMethod()
                       .AllowCredentials()
            );

            app.UseStaticFiles(new StaticFileOptions()
            {
                FileProvider = new PhysicalFileProvider(Path.Combine(env.ContentRootPath, "wwwroot", "images")),
                RequestPath = "/img"
            });

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "WPad v1"));
            }

            app.UseCustomException();

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}