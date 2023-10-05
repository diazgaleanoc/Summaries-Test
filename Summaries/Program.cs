using Summaries.Data;
using Summaries.Data.Services;

// This variable is used to allow the local host to access the API
var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

var builder = WebApplication.CreateBuilder(args);

// The local host can be found the ClientApp>package.json>scripts>start
// AllowAnyMethod() and AllowAnyHeader() are used to allow the local host to access the API, if not, only GET method works
builder.Services.AddCors(options =>
{
    options.AddPolicy(
        name: MyAllowSpecificOrigins,
        policy =>
        {
            policy.WithOrigins("https://localhost:44417").AllowAnyMethod().AllowAnyHeader();
        }
    );
});

// Add services to the container.

builder.Services.AddControllersWithViews();
builder.Services.AddTransient<IBookService, BookService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

// This is used to allow the local host to access the API
app.UseCors(MyAllowSpecificOrigins);

// This is used to allow the local host to access the API
app.UseAuthorization();

app.MapControllerRoute(name: "default", pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");
;

app.Run();
