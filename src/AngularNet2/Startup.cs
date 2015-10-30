using System;
using System.Linq;
using Microsoft.AspNet.Builder;
using Microsoft.AspNet.Hosting;
using Microsoft.AspNet.Mvc.Formatters;
using Microsoft.Framework.DependencyInjection;
using Microsoft.Framework.Logging;
using Newtonsoft.Json.Serialization;

namespace AngularNet2
{
    public class Startup
    {
        // For more information on how to configure your application, visit http://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services
                .AddMvc()
                .AddMvcOptions(options =>
                    {
                        options.OutputFormatters
                               .OfType<JsonOutputFormatter>()
                               .First()
                               .SerializerSettings
                               .ContractResolver = new CamelCasePropertyNamesContractResolver();


                    });

            services.AddLogging();
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            // Add the platform handler to the request pipeline.
            app.UseIISPlatformHandler();

            loggerFactory.AddConsole(LogLevel.Information);

            //app.UseErrorPage(ErrorPageOptions.ShowAll);

            app.UseStaticFiles();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action}",
                    defaults: new { controller = "Home", action = "Index" }
                );
            });
        }
    }
}
