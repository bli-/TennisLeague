using Microsoft.EntityFrameworkCore;
using TennisLeague.API.Config;
using TennisLeague.Data;
using TennisLeague.DataAccess;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddAutoMapper(typeof(TennisLeagueProfile));

var connectionString = builder.Configuration.GetConnectionString("AppDb");

builder.Services.AddDbContext<DataContext>(z => z.UseSqlServer(connectionString));
builder.Services.AddScoped<PlayerRepository>();
builder.Services.AddScoped<FacilityRepository>();
builder.Services.AddScoped<SeasonRepository>();
builder.Services.AddScoped<SessionRepository>();

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "CorsFromConfig", policy =>
    {
        policy.AllowAnyOrigin();

        //string[] allowedOrigins = builder.Configuration["Cors:Origins"].Split(',');

        //if (allowedOrigins.Contains("*"))
        //{
        //    policy.AllowAnyOrigin();
        //}
        //else
        //{
        //    policy.WithOrigins(allowedOrigins);
        //}
        policy.AllowAnyHeader();
        policy.AllowAnyMethod();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
