using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace TicketSystem.Models
{
    public partial class SystemRole
    {
        public long Tid { get; set; }
        public bool? IsActive { get; set; }
        public string MenuRights { get; set; }
        public string ActionList { get; set; }
        public string ActionCommand { get; set; }
        public string CreateUser { get; set; }
        public long CreateRoleTid { get; set; }
        public string RoleName { get; set; }
        public string Description { get; set; }
    }
}
