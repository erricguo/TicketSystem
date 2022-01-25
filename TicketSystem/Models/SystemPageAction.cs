using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace TicketSystem.Models
{
    public partial class SystemPageAction
    {
        public long Tid { get; set; }
        public long MenuTid { get; set; }
        public string ActionId { get; set; }
        public string ActionName { get; set; }
        public string ActionCommand { get; set; }
        public string ControlName { get; set; }
    }
}
