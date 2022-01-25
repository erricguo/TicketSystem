﻿using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace TicketSystem.Models
{
    public partial class SystemMenu
    {
        public long Tid { get; set; }
        public bool? IsActive { get; set; }
        public long ParentTid { get; set; }
        public string Name { get; set; }
        public string Ico { get; set; }
        public string Url { get; set; }
        public int? OrderRule { get; set; }
        public int? Level { get; set; }
        public string Class { get; set; }
    }
}
