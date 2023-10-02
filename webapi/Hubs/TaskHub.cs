using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
using webapi.Models;

namespace webapi.Hubs
{
    [Authorize]
    public class TaskHub: Hub
    {
    }
}