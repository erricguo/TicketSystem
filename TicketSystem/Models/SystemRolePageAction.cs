using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace TicketSystem.Models
{
    public partial class SystemRolePageAction
    {
        public long RoleTid { get; set; }
        public long MenuTid { get; set; }
        public int ActionId { get; set; }
    }
}
