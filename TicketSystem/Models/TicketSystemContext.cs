using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace TicketSystem.Models
{
    public partial class TicketSystemContext : DbContext
    {
        public TicketSystemContext()
        {
        }

        public TicketSystemContext(DbContextOptions<TicketSystemContext> options)
            : base(options)
        {
        }

        public virtual DbSet<SystemMenu> SystemMenu { get; set; }
        public virtual DbSet<SystemOptions> SystemOptions { get; set; }
        public virtual DbSet<SystemPageAction> SystemPageAction { get; set; }
        public virtual DbSet<SystemRole> SystemRole { get; set; }
        public virtual DbSet<SystemRolePageAction> SystemRolePageAction { get; set; }
        public virtual DbSet<SystemTickets> SystemTickets { get; set; }
        public virtual DbSet<SystemUsers> SystemUsers { get; set; }

//        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
//        {
//            if (!optionsBuilder.IsConfigured)
//            {
//#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
//                optionsBuilder.UseSqlServer("Server=.\\sqlexpress;Database=TicketSystem;Trusted_Connection=True;MultipleActiveResultSets=true");
//            }
//        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<SystemMenu>(entity =>
            {
                entity.HasKey(e => e.Tid);

                entity.ToTable("system_menu");

                entity.HasComment("系統功能表表");

                entity.Property(e => e.Tid).HasComment("MenuId");

                entity.Property(e => e.Class)
                    .HasMaxLength(100)
                    .HasComment("樣式");

                entity.Property(e => e.Ico)
                    .HasMaxLength(100)
                    .HasComment("展示的圖示");

                entity.Property(e => e.IsActive)
                    .IsRequired()
                    .HasDefaultValueSql("((1))")
                    .HasComment("是否可用");

                entity.Property(e => e.Level).HasComment("等級");

                entity.Property(e => e.Name)
                    .HasMaxLength(50)
                    .HasComment("名稱");

                entity.Property(e => e.OrderRule).HasComment("排序");

                entity.Property(e => e.ParentTid).HasComment("父節點Id");

                entity.Property(e => e.Url)
                    .HasMaxLength(200)
                    .HasComment("連接位址");
            });

            modelBuilder.Entity<SystemOptions>(entity =>
            {
                entity.HasKey(e => e.Tid);

                entity.ToTable("system_options");

                entity.Property(e => e.Key)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Option)
                    .IsRequired()
                    .HasColumnName("option")
                    .HasMaxLength(50);

                entity.Property(e => e.Value)
                    .HasMaxLength(500)
                    .HasDefaultValueSql("('')");
            });

            modelBuilder.Entity<SystemPageAction>(entity =>
            {
                entity.HasKey(e => e.Tid);

                entity.ToTable("system_page_action");

                entity.HasComment("功能表按鈕");

                entity.Property(e => e.Tid).HasComment("主鍵");

                entity.Property(e => e.ActionCommand)
                    .HasMaxLength(255)
                    .HasDefaultValueSql("('')");

                entity.Property(e => e.ActionId)
                    .HasMaxLength(100)
                    .HasComment("ActionId");

                entity.Property(e => e.ActionName)
                    .HasMaxLength(255)
                    .HasComment("ActionName");

                entity.Property(e => e.ControlName)
                    .HasMaxLength(255)
                    .HasComment("ControlName");

                entity.Property(e => e.MenuTid).HasComment("訪問路徑");
            });

            modelBuilder.Entity<SystemRole>(entity =>
            {
                entity.HasKey(e => e.Tid);

                entity.ToTable("system_role");

                entity.HasComment("角色表");

                entity.Property(e => e.Tid).HasComment("主鍵");

                entity.Property(e => e.ActionCommand)
                    .HasColumnType("ntext")
                    .HasDefaultValueSql("('')");

                entity.Property(e => e.ActionList)
                    .HasColumnType("ntext")
                    .HasComment("按鈕等許可權");

                entity.Property(e => e.CreateRoleTid).HasComment("創建者的角色Tid");

                entity.Property(e => e.CreateUser)
                    .HasMaxLength(20)
                    .HasComment("創建者");

                entity.Property(e => e.Description)
                    .HasMaxLength(200)
                    .HasComment("描述");

                entity.Property(e => e.IsActive)
                    .IsRequired()
                    .HasDefaultValueSql("((1))")
                    .HasComment("是否可用");

                entity.Property(e => e.MenuRights)
                    .HasMaxLength(150)
                    .HasComment("菜單許可權");

                entity.Property(e => e.RoleName)
                    .HasMaxLength(100)
                    .HasComment("角色名稱");
            });

            modelBuilder.Entity<SystemRolePageAction>(entity =>
            {
                entity.HasKey(e => new { e.RoleTid, e.MenuTid, e.ActionId });

                entity.ToTable("system_role_page_action");
            });

            modelBuilder.Entity<SystemTickets>(entity =>
            {
                entity.HasKey(e => e.Tid);

                entity.ToTable("system_tickets");

                entity.Property(e => e.CreateDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Creator)
                    .HasMaxLength(50)
                    .HasDefaultValueSql("('')");

                entity.Property(e => e.Description).HasDefaultValueSql("('')");

                entity.Property(e => e.IsActive)
                    .IsRequired()
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.Summary)
                    .IsRequired()
                    .HasMaxLength(50)
                    .HasDefaultValueSql("('')");

                entity.Property(e => e.TicketId).HasMaxLength(50);

                entity.Property(e => e.TicketPriority)
                    .HasMaxLength(2)
                    .HasDefaultValueSql("('0')");

                entity.Property(e => e.TicketSevere)
                    .HasMaxLength(2)
                    .HasDefaultValueSql("('0')");

                entity.Property(e => e.TicketStatus)
                    .HasMaxLength(2)
                    .HasDefaultValueSql("('0')");

                entity.Property(e => e.TicketType)
                    .HasMaxLength(2)
                    .HasDefaultValueSql("('0')");
            });

            modelBuilder.Entity<SystemUsers>(entity =>
            {
                entity.HasKey(e => e.Tid);

                entity.ToTable("system_users");

                entity.HasComment("後臺系統使用者表");

                entity.Property(e => e.Tid).HasComment("主鍵");

                entity.Property(e => e.Eid)
                    .HasMaxLength(36)
                    .HasComment("登陸名");

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(150)
                    .HasDefaultValueSql("('')");

                entity.Property(e => e.IsActive)
                    .IsRequired()
                    .HasDefaultValueSql("((1))")
                    .HasComment("是否可用");

                entity.Property(e => e.Pwd)
                    .IsRequired()
                    .HasMaxLength(50)
                    .HasComment("密碼");

                entity.Property(e => e.RoleTid).HasComment("角色Tid(一個人只有一個角色)");

                entity.Property(e => e.UserName)
                    .HasMaxLength(50)
                    .HasComment("用戶名");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
