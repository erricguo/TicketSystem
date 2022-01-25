using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TicketSystem.Models
{
    public class SystemMenuVM
    {
        public long Tid { get; set; }
        public DateTime DataChangeLastTime { get; set; }
        public bool? IsActive { get; set; }
        public long ParentTid { get; set; }
        public string Name { get; set; }
        public string Ico { get; set; }
        public string Url { get; set; }
        public int? OrderRule { get; set; }
        public int? Level { get; set; }
        public string Class { get; set; }

        public virtual ICollection<SystemMenuVM> Children { get; set; }
    }
}
