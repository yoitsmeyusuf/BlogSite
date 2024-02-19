using System.Text.Json.Serialization;
using WebApi.Helpers;
using WebApi.Middleware;
using WebApi.Repositories;
using WebApi.Services;


var builder = WebApplication.CreateBuilder(args);

// add services to DI container
{
    var services = builder.Services;
    var env = builder.Environment;
 
    services.AddCors();
    services.AddControllers().AddJsonOptions(x =>
    {
        // serialize enums as strings in api responses (e.g. Role)
        x.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());

        // ignore omitted parameters on models to enable optional params (e.g. Post update)
        x.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
    });
    services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

    // configure strongly typed settings object
    services.Configure<DbSettings>(builder.Configuration.GetSection("DbSettings"));

    // configure DI for application services

    services.AddSingleton<DataContext>();
    services.AddTransient<TokenAuthenticationMiddleware>();
    services.AddScoped<IPostRepository, PostRepository>();
    services.AddScoped<IAuthServices, AuthServices>();
    services.AddScoped<IPostService, PostService>();
}
// use swagger for api documentation


var app = builder.Build();

// ensure database and tables exist
{
    using var scope = app.Services.CreateScope();
    var context = scope.ServiceProvider.GetRequiredService<DataContext>();
    await context.Init();
}

// configure HTTP request pipeline
{
    // global cors policy
    app.UseCors(x => x
        .AllowAnyOrigin()
        .AllowAnyMethod()
        .AllowAnyHeader());

    // global error handler
    app.UseMiddleware<ErrorHandlerMiddleware>();
    app.UseMiddleware<TokenAuthenticationMiddleware>();

    app.MapControllers();
}

app.Run("http://localhost:4000");