using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TicketSystem.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using TicketSystem.Middleware;
using Microsoft.OpenApi.Models;
using NSwag.Generation.Processors.Security;

namespace TicketSystem
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
            services.AddControllers();

            services.Configure<CookiePolicyOptions>(options =>
            {
                // This lambda determines whether user consent for non-essential cookies is needed for a given request.
                options.CheckConsentNeeded = context => true;
                options.MinimumSameSitePolicy = SameSiteMode.None;
            });
            //指定功能變數名稱  允許任何來源的主機訪問 builder.AllowAnyOrigin()
            services.AddCors(options =>
            {
                options.AddPolicy("allow_all", builder =>
                {
                    builder.SetIsOriginAllowed(_ => true)
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials();//指定處理cookie
                });
            });

            services.Configure<JwtSettings>(Configuration.GetSection("Jwt"));
            var jwt = new JwtSettings();
            //綁定jwtSeetings
            Configuration.Bind("Jwt", jwt);

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;

            })
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ValidateLifetime = false,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = jwt.Issuer,
                    ValidAudience = jwt.Audience,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwt.Key))
                };
            });


            //以上是註冊jwt


            #region  // 連結資料庫才會用到這一段（DB連結字串）
            //********************************************************************            
            services.AddDbContext<TicketSystemContext>(options =>
                      options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));
            // 這裡需要新增兩個命名空間，請使用「顯示可能的修正」讓系統自己加上。
            //********************************************************************
            #endregion

            services.AddMvc();

            
            services.AddOpenApiDocument(settings =>
            {
                settings.Title = "Ticket System";
                settings.AddSecurity("輸入身份認證Token", Enumerable.Empty<string>(), new NSwag.OpenApiSecurityScheme()
                {
                    Description = "JWT認證 請輸入Bearer {token}",
                    Name = "Authorization",
                    In = NSwag.OpenApiSecurityApiKeyLocation.Header,
                    Type = NSwag.OpenApiSecuritySchemeType.ApiKey
                });

                settings.OperationProcessors.Add(
                    new AspNetCoreOperationSecurityScopeProcessor("JWT Token"));
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            app.UseOpenApi();    // 啟動 OpenAPI 文件
            app.UseSwaggerUi3(); // 啟動 Swagger UI

            app.Use(async (context, next) =>
            {
                await next();

                // 判斷是否是要存取網頁，而不是發送 API 需求
                if (context.Response.StatusCode == 404 &&                       // 該資源不存在
                    !System.IO.Path.HasExtension(context.Request.Path.Value) && // 網址最後沒有帶副檔名
                    !context.Request.Path.Value.StartsWith("/api"))             // 網址不是 /api 開頭
                {
                    context.Request.Path = "/index.html";                       // 將網址改成 /index.html
                    context.Response.StatusCode = 200;                          // 並將 HTTP 狀態碼修改為 200 成功
                    await next();
                }
            });


            app.UseDefaultFiles();
            app.UseStaticFiles();
            app.UseCookiePolicy();
            app.UseRouting();
            app.UseCors("allow_all");
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseMiddleware<JWTMiddleware>();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });


        }
    }
}


