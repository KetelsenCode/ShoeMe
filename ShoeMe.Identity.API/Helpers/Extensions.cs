using Microsoft.AspNetCore.Http;

namespace ShoeMe.Identity.API.Helpers
{
    public static class Extensions
    {
        public static void AddApplicationError(this HttpResponse response, string message){
            //Adds the message to application-error
            response.Headers.Add("Application-Error", message);

            //Adds application-error to header
            response.Headers.Add("Access-Control-Expose-Headers", "Application-Error");
            response.Headers.Add("Access-Control-Allow-Origin", "*");
        }

    }
}