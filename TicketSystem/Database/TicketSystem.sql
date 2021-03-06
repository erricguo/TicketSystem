USE [TicketSystem]
GO
/****** Object:  Table [dbo].[system_menu]    Script Date: 2022/01/26 23:23:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[system_menu](
	[Tid] [bigint] IDENTITY(1,1) NOT NULL,
	[IsActive] [bit] NOT NULL,
	[ParentTid] [bigint] NOT NULL,
	[Name] [nvarchar](50) NULL,
	[Ico] [nvarchar](100) NULL,
	[Url] [nvarchar](200) NULL,
	[OrderRule] [int] NULL,
	[Level] [int] NULL,
	[Class] [nvarchar](100) NULL,
 CONSTRAINT [PK_system_menu] PRIMARY KEY CLUSTERED 
(
	[Tid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[system_options]    Script Date: 2022/01/26 23:23:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[system_options](
	[Tid] [bigint] IDENTITY(1,1) NOT NULL,
	[option] [nvarchar](50) NOT NULL,
	[Key] [nvarchar](50) NOT NULL,
	[Value] [nvarchar](500) NULL,
 CONSTRAINT [PK_system_options] PRIMARY KEY CLUSTERED 
(
	[Tid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[system_page_action]    Script Date: 2022/01/26 23:23:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[system_page_action](
	[Tid] [bigint] IDENTITY(1,1) NOT NULL,
	[MenuTid] [bigint] NOT NULL,
	[ActionId] [nvarchar](100) NULL,
	[ActionName] [nvarchar](255) NULL,
	[ActionCommand] [nvarchar](255) NULL,
	[ControlName] [nvarchar](255) NULL,
 CONSTRAINT [PK_system_page_action] PRIMARY KEY CLUSTERED 
(
	[Tid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[system_role]    Script Date: 2022/01/26 23:23:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[system_role](
	[Tid] [bigint] IDENTITY(1,1) NOT NULL,
	[IsActive] [bit] NOT NULL,
	[MenuRights] [nvarchar](150) NULL,
	[ActionList] [ntext] NULL,
	[ActionCommand] [ntext] NULL,
	[CreateUser] [nvarchar](20) NULL,
	[CreateRoleTid] [bigint] NOT NULL,
	[RoleName] [nvarchar](100) NULL,
	[Description] [nvarchar](200) NULL,
 CONSTRAINT [PK_system_role] PRIMARY KEY CLUSTERED 
(
	[Tid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[system_role_page_action]    Script Date: 2022/01/26 23:23:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[system_role_page_action](
	[RoleTid] [bigint] NOT NULL,
	[MenuTid] [bigint] NOT NULL,
	[ActionId] [int] NOT NULL,
 CONSTRAINT [PK_system_role_page_action] PRIMARY KEY CLUSTERED 
(
	[RoleTid] ASC,
	[MenuTid] ASC,
	[ActionId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[system_tickets]    Script Date: 2022/01/26 23:23:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[system_tickets](
	[Tid] [bigint] IDENTITY(1,1) NOT NULL,
	[IsActive] [bit] NOT NULL,
	[TicketId] [nvarchar](50) NULL,
	[CreateDate] [datetime] NOT NULL,
	[TicketStatus] [nvarchar](2) NULL,
	[TicketType] [nvarchar](2) NULL,
	[TicketSevere] [nvarchar](2) NULL,
	[TicketPriority] [nvarchar](2) NULL,
	[Summary] [nvarchar](50) NOT NULL,
	[Description] [nvarchar](max) NULL,
	[Creator] [nvarchar](50) NULL,
 CONSTRAINT [PK_system_tickets] PRIMARY KEY CLUSTERED 
(
	[Tid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[system_users]    Script Date: 2022/01/26 23:23:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[system_users](
	[Tid] [bigint] IDENTITY(1,1) NOT NULL,
	[IsActive] [bit] NOT NULL,
	[Eid] [nvarchar](36) NULL,
	[Email] [nvarchar](150) NOT NULL,
	[UserName] [nvarchar](50) NULL,
	[Pwd] [nvarchar](50) NOT NULL,
	[RoleTid] [bigint] NOT NULL,
 CONSTRAINT [PK_system_users] PRIMARY KEY CLUSTERED 
(
	[Tid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[system_menu] ON 

INSERT [dbo].[system_menu] ([Tid], [IsActive], [ParentTid], [Name], [Ico], [Url], [OrderRule], [Level], [Class]) VALUES (1, 1, 0, N'系統管理', NULL, N'#', 1, 1, N'glyphicon glyphicon-cog')
INSERT [dbo].[system_menu] ([Tid], [IsActive], [ParentTid], [Name], [Ico], [Url], [OrderRule], [Level], [Class]) VALUES (2, 1, 1, N'功能表管理', N'MenuIcon', N'menu', 1, 2, N'fa fa-reorder')
INSERT [dbo].[system_menu] ([Tid], [IsActive], [ParentTid], [Name], [Ico], [Url], [OrderRule], [Level], [Class]) VALUES (3, 1, 1, N'權限管理', NULL, N'roleaction', 4, 2, N'fa fa-shield')
INSERT [dbo].[system_menu] ([Tid], [IsActive], [ParentTid], [Name], [Ico], [Url], [OrderRule], [Level], [Class]) VALUES (4, 1, 1, N'角色管理', N'UserIcon', N'role', 3, 2, N'fa fa-th-large')
INSERT [dbo].[system_menu] ([Tid], [IsActive], [ParentTid], [Name], [Ico], [Url], [OrderRule], [Level], [Class]) VALUES (5, 1, 1, N'系統使用者', NULL, N'user', 2, 2, N'fa fa-users')
INSERT [dbo].[system_menu] ([Tid], [IsActive], [ParentTid], [Name], [Ico], [Url], [OrderRule], [Level], [Class]) VALUES (6, 0, 1, N'使用者資訊', NULL, N'userdeatil', 5, 2, N'fa fa-users')
INSERT [dbo].[system_menu] ([Tid], [IsActive], [ParentTid], [Name], [Ico], [Url], [OrderRule], [Level], [Class]) VALUES (7, 0, 1, N'代碼生成', NULL, N'codegen', 6, 3, N'fa fa-clone')
INSERT [dbo].[system_menu] ([Tid], [IsActive], [ParentTid], [Name], [Ico], [Url], [OrderRule], [Level], [Class]) VALUES (8, 0, 1, N'SQL工具', NULL, N'common/sql', 6, 3, N'glyphicon glyphicon-zoom-in')
INSERT [dbo].[system_menu] ([Tid], [IsActive], [ParentTid], [Name], [Ico], [Url], [OrderRule], [Level], [Class]) VALUES (17, 1, 1, N'案件管理', NULL, N'ticket', 5, 2, NULL)
SET IDENTITY_INSERT [dbo].[system_menu] OFF
GO
SET IDENTITY_INSERT [dbo].[system_options] ON 

INSERT [dbo].[system_options] ([Tid], [option], [Key], [Value]) VALUES (4, N'TicketStatus', N'0', N'新建')
INSERT [dbo].[system_options] ([Tid], [option], [Key], [Value]) VALUES (5, N'TicketStatus', N'1', N'處理中')
INSERT [dbo].[system_options] ([Tid], [option], [Key], [Value]) VALUES (6, N'TicketStatus', N'2', N'已解決')
INSERT [dbo].[system_options] ([Tid], [option], [Key], [Value]) VALUES (7, N'TicketSevere', N'0', N'一般')
INSERT [dbo].[system_options] ([Tid], [option], [Key], [Value]) VALUES (8, N'TicketSevere', N'1', N'中度')
INSERT [dbo].[system_options] ([Tid], [option], [Key], [Value]) VALUES (9, N'TicketSevere', N'2', N'嚴重')
INSERT [dbo].[system_options] ([Tid], [option], [Key], [Value]) VALUES (10, N'TicketPriority', N'0', N'一般')
INSERT [dbo].[system_options] ([Tid], [option], [Key], [Value]) VALUES (11, N'TicketPriority', N'1', N'緊急')
INSERT [dbo].[system_options] ([Tid], [option], [Key], [Value]) VALUES (13, N'TicketPriority', N'2', N'非常緊急')
INSERT [dbo].[system_options] ([Tid], [option], [Key], [Value]) VALUES (14, N'TicketType', N'0', N'Bug')
INSERT [dbo].[system_options] ([Tid], [option], [Key], [Value]) VALUES (15, N'TicketType', N'1', N'Features')
INSERT [dbo].[system_options] ([Tid], [option], [Key], [Value]) VALUES (18, N'TicketType', N'2', N'Test')
SET IDENTITY_INSERT [dbo].[system_options] OFF
GO
SET IDENTITY_INSERT [dbo].[system_page_action] ON 

INSERT [dbo].[system_page_action] ([Tid], [MenuTid], [ActionId], [ActionName], [ActionCommand], [ControlName]) VALUES (1, 17, N'1', N'新增', N'ac-add', NULL)
INSERT [dbo].[system_page_action] ([Tid], [MenuTid], [ActionId], [ActionName], [ActionCommand], [ControlName]) VALUES (2, 17, N'2', N'修改', N'ac-edit', NULL)
INSERT [dbo].[system_page_action] ([Tid], [MenuTid], [ActionId], [ActionName], [ActionCommand], [ControlName]) VALUES (3, 17, N'3', N'刪除', N'ac-delete', NULL)
INSERT [dbo].[system_page_action] ([Tid], [MenuTid], [ActionId], [ActionName], [ActionCommand], [ControlName]) VALUES (4, 17, N'4', N'明細', N'ac-read', NULL)
INSERT [dbo].[system_page_action] ([Tid], [MenuTid], [ActionId], [ActionName], [ActionCommand], [ControlName]) VALUES (5, 17, N'5', N'接單', N'ac-handle', NULL)
INSERT [dbo].[system_page_action] ([Tid], [MenuTid], [ActionId], [ActionName], [ActionCommand], [ControlName]) VALUES (6, 17, N'6', N'結案', N'ac-finish', NULL)
SET IDENTITY_INSERT [dbo].[system_page_action] OFF
GO
SET IDENTITY_INSERT [dbo].[system_role] ON 

INSERT [dbo].[system_role] ([Tid], [IsActive], [MenuRights], [ActionList], [ActionCommand], [CreateUser], [CreateRoleTid], [RoleName], [Description]) VALUES (1, 1, N'[17]', N'[{"title":"系統管理","route":"#","icon":null,"children":[{"title":"案件管理","route":"ticket","icon":null}]}]', N'', NULL, 0, N'QA', N'QA')
INSERT [dbo].[system_role] ([Tid], [IsActive], [MenuRights], [ActionList], [ActionCommand], [CreateUser], [CreateRoleTid], [RoleName], [Description]) VALUES (2, 1, N'[17]', N'[{"title":"系統管理","route":"#","icon":null,"children":[{"title":"案件管理","route":"ticket","icon":null}]}]', N'', NULL, 0, N'RD', N'RD')
INSERT [dbo].[system_role] ([Tid], [IsActive], [MenuRights], [ActionList], [ActionCommand], [CreateUser], [CreateRoleTid], [RoleName], [Description]) VALUES (8, 1, N'[1]', N'[{"title":"系統管理","route":"#","icon":null,"children":[{"title":"功能表管理","route":"menu","icon":"MenuIcon"},{"title":"權限管理","route":"roleaction","icon":null},{"title":"角色管理","route":"role","icon":"UserIcon"},{"title":"系統使用者","route":"user","icon":null},{"title":"案件管理","route":"ticket","icon":null}]}]', N'', NULL, 0, N'Administrator', N'超級管理員')
SET IDENTITY_INSERT [dbo].[system_role] OFF
GO
INSERT [dbo].[system_role_page_action] ([RoleTid], [MenuTid], [ActionId]) VALUES (1, 17, 1)
INSERT [dbo].[system_role_page_action] ([RoleTid], [MenuTid], [ActionId]) VALUES (1, 17, 2)
INSERT [dbo].[system_role_page_action] ([RoleTid], [MenuTid], [ActionId]) VALUES (1, 17, 3)
INSERT [dbo].[system_role_page_action] ([RoleTid], [MenuTid], [ActionId]) VALUES (1, 17, 4)
INSERT [dbo].[system_role_page_action] ([RoleTid], [MenuTid], [ActionId]) VALUES (2, 17, 4)
INSERT [dbo].[system_role_page_action] ([RoleTid], [MenuTid], [ActionId]) VALUES (2, 17, 5)
INSERT [dbo].[system_role_page_action] ([RoleTid], [MenuTid], [ActionId]) VALUES (2, 17, 6)
INSERT [dbo].[system_role_page_action] ([RoleTid], [MenuTid], [ActionId]) VALUES (3, 17, 1)
INSERT [dbo].[system_role_page_action] ([RoleTid], [MenuTid], [ActionId]) VALUES (3, 17, 2)
INSERT [dbo].[system_role_page_action] ([RoleTid], [MenuTid], [ActionId]) VALUES (3, 17, 3)
INSERT [dbo].[system_role_page_action] ([RoleTid], [MenuTid], [ActionId]) VALUES (3, 17, 4)
INSERT [dbo].[system_role_page_action] ([RoleTid], [MenuTid], [ActionId]) VALUES (3, 17, 5)
INSERT [dbo].[system_role_page_action] ([RoleTid], [MenuTid], [ActionId]) VALUES (3, 17, 6)
GO
SET IDENTITY_INSERT [dbo].[system_tickets] ON 

INSERT [dbo].[system_tickets] ([Tid], [IsActive], [TicketId], [CreateDate], [TicketStatus], [TicketType], [TicketSevere], [TicketPriority], [Summary], [Description], [Creator]) VALUES (2, 1, N'1', CAST(N'2022-01-26T15:34:32.520' AS DateTime), N'4', N'14', N'7', N'10', N'test', N'test1', N'郭育宏')
INSERT [dbo].[system_tickets] ([Tid], [IsActive], [TicketId], [CreateDate], [TicketStatus], [TicketType], [TicketSevere], [TicketPriority], [Summary], [Description], [Creator]) VALUES (3, 1, N'2', CAST(N'2022-01-26T15:40:56.520' AS DateTime), N'5', N'14', N'7', N'10', N'1', N'1', N'郭育宏')
SET IDENTITY_INSERT [dbo].[system_tickets] OFF
GO
SET IDENTITY_INSERT [dbo].[system_users] ON 

INSERT [dbo].[system_users] ([Tid], [IsActive], [Eid], [Email], [UserName], [Pwd], [RoleTid]) VALUES (2, 1, N'qa', N'qa@123.com', N'測試員一號', N'202cb962ac59075b964b07152d234b70', 1)
INSERT [dbo].[system_users] ([Tid], [IsActive], [Eid], [Email], [UserName], [Pwd], [RoleTid]) VALUES (3, 1, N'rd', N'rd@123.com', N'開發者一號', N'202cb962ac59075b964b07152d234b70', 2)
INSERT [dbo].[system_users] ([Tid], [IsActive], [Eid], [Email], [UserName], [Pwd], [RoleTid]) VALUES (13, 1, N'admin', N'admin@123.com', N'郭育宏', N'21232f297a57a5a743894a0e4a801fc3', 8)
SET IDENTITY_INSERT [dbo].[system_users] OFF
GO
ALTER TABLE [dbo].[system_menu] ADD  CONSTRAINT [DF_system_menu_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[system_menu] ADD  CONSTRAINT [DF_system_menu_ParentTid]  DEFAULT ((0)) FOR [ParentTid]
GO
ALTER TABLE [dbo].[system_options] ADD  CONSTRAINT [DF_system_options_Value]  DEFAULT ('') FOR [Value]
GO
ALTER TABLE [dbo].[system_page_action] ADD  CONSTRAINT [DF_system_page_action_MenuTid]  DEFAULT ((0)) FOR [MenuTid]
GO
ALTER TABLE [dbo].[system_page_action] ADD  CONSTRAINT [DF_system_page_action_ActionCommand]  DEFAULT ('') FOR [ActionCommand]
GO
ALTER TABLE [dbo].[system_role] ADD  CONSTRAINT [DF_system_role_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[system_role] ADD  CONSTRAINT [DF_system_role_ActionCommand]  DEFAULT ('') FOR [ActionCommand]
GO
ALTER TABLE [dbo].[system_role] ADD  CONSTRAINT [DF_system_role_CreateRoleTid]  DEFAULT ((0)) FOR [CreateRoleTid]
GO
ALTER TABLE [dbo].[system_tickets] ADD  CONSTRAINT [DF_system_tickets_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[system_tickets] ADD  CONSTRAINT [DF_system_tickets_CreateDate]  DEFAULT (getdate()) FOR [CreateDate]
GO
ALTER TABLE [dbo].[system_tickets] ADD  CONSTRAINT [DF_system_tickets_Status]  DEFAULT ('0') FOR [TicketStatus]
GO
ALTER TABLE [dbo].[system_tickets] ADD  CONSTRAINT [DF_system_tickets_Type]  DEFAULT ('0') FOR [TicketType]
GO
ALTER TABLE [dbo].[system_tickets] ADD  CONSTRAINT [DF_system_tickets_Severe]  DEFAULT ('0') FOR [TicketSevere]
GO
ALTER TABLE [dbo].[system_tickets] ADD  CONSTRAINT [DF_system_tickets_Priority]  DEFAULT ('0') FOR [TicketPriority]
GO
ALTER TABLE [dbo].[system_tickets] ADD  CONSTRAINT [DF_system_tickets_Summary]  DEFAULT ('') FOR [Summary]
GO
ALTER TABLE [dbo].[system_tickets] ADD  CONSTRAINT [DF_system_tickets_Description]  DEFAULT ('') FOR [Description]
GO
ALTER TABLE [dbo].[system_tickets] ADD  CONSTRAINT [DF_system_tickets_Creator]  DEFAULT ('') FOR [Creator]
GO
ALTER TABLE [dbo].[system_users] ADD  CONSTRAINT [DF_system_users_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[system_users] ADD  CONSTRAINT [DF_system_users_Email]  DEFAULT ('') FOR [Email]
GO
ALTER TABLE [dbo].[system_users] ADD  CONSTRAINT [DF_system_users_RoleTid]  DEFAULT ((0)) FOR [RoleTid]
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'MenuId' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'system_menu', @level2type=N'COLUMN',@level2name=N'Tid'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'是否可用' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'system_menu', @level2type=N'COLUMN',@level2name=N'IsActive'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'父節點Id' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'system_menu', @level2type=N'COLUMN',@level2name=N'ParentTid'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'名稱' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'system_menu', @level2type=N'COLUMN',@level2name=N'Name'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'展示的圖示' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'system_menu', @level2type=N'COLUMN',@level2name=N'Ico'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'連接位址' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'system_menu', @level2type=N'COLUMN',@level2name=N'Url'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'排序' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'system_menu', @level2type=N'COLUMN',@level2name=N'OrderRule'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'等級' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'system_menu', @level2type=N'COLUMN',@level2name=N'Level'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'樣式' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'system_menu', @level2type=N'COLUMN',@level2name=N'Class'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'系統功能表表' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'system_menu'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'主鍵' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'system_page_action', @level2type=N'COLUMN',@level2name=N'Tid'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'訪問路徑' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'system_page_action', @level2type=N'COLUMN',@level2name=N'MenuTid'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'ActionId' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'system_page_action', @level2type=N'COLUMN',@level2name=N'ActionId'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'ActionName' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'system_page_action', @level2type=N'COLUMN',@level2name=N'ActionName'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'ControlName' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'system_page_action', @level2type=N'COLUMN',@level2name=N'ControlName'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'功能表按鈕' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'system_page_action'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'主鍵' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'system_role', @level2type=N'COLUMN',@level2name=N'Tid'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'是否可用' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'system_role', @level2type=N'COLUMN',@level2name=N'IsActive'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'菜單許可權' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'system_role', @level2type=N'COLUMN',@level2name=N'MenuRights'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'按鈕等許可權' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'system_role', @level2type=N'COLUMN',@level2name=N'ActionList'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'創建者' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'system_role', @level2type=N'COLUMN',@level2name=N'CreateUser'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'創建者的角色Tid' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'system_role', @level2type=N'COLUMN',@level2name=N'CreateRoleTid'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'角色名稱' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'system_role', @level2type=N'COLUMN',@level2name=N'RoleName'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'描述' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'system_role', @level2type=N'COLUMN',@level2name=N'Description'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'角色表' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'system_role'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'主鍵' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'system_users', @level2type=N'COLUMN',@level2name=N'Tid'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'是否可用' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'system_users', @level2type=N'COLUMN',@level2name=N'IsActive'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'登陸名' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'system_users', @level2type=N'COLUMN',@level2name=N'Eid'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'用戶名' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'system_users', @level2type=N'COLUMN',@level2name=N'UserName'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'密碼' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'system_users', @level2type=N'COLUMN',@level2name=N'Pwd'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'角色Tid(一個人只有一個角色)' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'system_users', @level2type=N'COLUMN',@level2name=N'RoleTid'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'後臺系統使用者表' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'system_users'
GO
