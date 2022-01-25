using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace TicketSystem.ViewModels
{
    public class UserInfoViewModel
    {
        public Dictionary<string, string> Claims { get; set; } = new Dictionary<string, string>();

        public UserInfoViewModel(IEnumerable<Claim> claims)
        {
            foreach (var claim in claims)
            {
                string type = claim.Type.Split("/").Last();
                string value = claim.Value;

                this.Claims[type] = value;
            }
        }
    }
}
