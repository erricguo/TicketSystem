using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TicketSystem.Models
{
    public class SystemPageActionVM
    {
        public long Tid { get; set; }
        public long MenuTid { get; set; }
        public string ActionId { get; set; }
        public string ActionName { get; set; }
        public string ActionCommand { get; set; }
        public string ControlName { get; set; }
        public string MenuName { get; set; }

        public virtual ICollection<SystemPageActionVM> Children { get; set; }
    }
}
