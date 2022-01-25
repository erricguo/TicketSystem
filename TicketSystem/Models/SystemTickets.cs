using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace TicketSystem.Models
{
    public partial class SystemTickets
    {
        public long Tid { get; set; }
        public bool? IsActive { get; set; }
        public string TicketId { get; set; }
        public DateTime CreateDate { get; set; }
        public string TicketStatus { get; set; }
        public string TicketType { get; set; }
        public string TicketSevere { get; set; }
        public string TicketPriority { get; set; }
        public string Summary { get; set; }
        public string Description { get; set; }
        public string Creator { get; set; }
    }
}
