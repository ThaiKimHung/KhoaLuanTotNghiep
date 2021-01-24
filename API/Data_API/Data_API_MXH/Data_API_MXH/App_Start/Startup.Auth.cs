using Microsoft.AspNet.SignalR;
using Microsoft.Owin;
using Microsoft.Owin.Cors;
using Owin;
using System.Web.Http;

[assembly: OwinStartup(typeof(Data_API_MXH.Startup))]
namespace Data_API_MXH
{
    public partial class Startup
    {
        // For more information on configuring authentication, please visit http://go.microsoft.com/fwlink/?LinkId=301864

        //public void Configuration(IAppBuilder app)
        //{
        //    HttpConfiguration config = new HttpConfiguration();
        //    ConfigureAuth(app);

        //    WebApiConfig.Register(config);
        //    app.UseCors(Microsoft.Owin.Cors.CorsOptions.AllowAll);
        //}
        public void Configuration(IAppBuilder app)
        {
            app.UseCors(CorsOptions.AllowAll);

            app.Map("/signalr", map =>
            {
                map.UseCors(CorsOptions.AllowAll);
                //app.UseOAuthBearerAuthentication(new OAuthBearerAuthenticationOptions());

                var hubConfiguration = new HubConfiguration
                {
                    // You can enable JSONP by uncommenting line below.
                    // JSONP requests are insecure but some older browsers (and some
                    // versions of IE) require JSONP to work cross domain
                    EnableJSONP = true, // ho tro trinh duyet cu
                    EnableDetailedErrors = true //
                };
                // Run the SignalR pipeline. We're not using MapSignalR
                // since this branch already runs under the "/signalr"
                // path.
                map.RunSignalR(hubConfiguration);
            });
        }
        
    }
}