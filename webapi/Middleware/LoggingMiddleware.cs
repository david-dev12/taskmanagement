using Serilog;
using System.Text;

namespace webapi.Middleware
{
    public class LoggingMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly Serilog.ILogger _logger;
        public LoggingMiddleware(RequestDelegate next)
        {
            _next = next;
            _logger = Log.Logger;

        }
        public async Task Invoke(HttpContext context)
        {
            context.Request.EnableBuffering();

            string bodyStr = "";
            var req = context.Request;
            req.Body.Seek(0, SeekOrigin.Begin);

            using (var reader = new StreamReader(req.Body, Encoding.UTF8, true, 1024, true))
            {
                bodyStr = await reader.ReadToEndAsync();
            }

            _logger.Information($"Request Information:{Environment.NewLine}" +
                               $"Schema:{req.Scheme} " +
                               $"Host: {req.Host} " +
                               $"Path: {req.Path} " +
                               $"QueryString: {req.QueryString} " +
                               $"Request Body: {bodyStr}");

            req.Body.Position = 0;

            await _next(context);
        }
    }
}
