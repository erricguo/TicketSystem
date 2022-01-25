using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace TicketSystem.Models
{
    public partial class SystemUsers
    {
        public long Tid { get; set; }
        public bool? IsActive { get; set; }
        public string Eid { get; set; }
        public string Email { get; set; }
        public string UserName { get; set; }
        public string Pwd { get; set; }
        public long RoleTid { get; set; }
    }
}
