USE [master]
GO
/****** Object:  Database [NewCo]    Script Date: 3/15/2020 9:35:29 PM ******/
CREATE DATABASE [NewCo]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'NewCo', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\NewCo.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'NewCo_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\NewCo_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [NewCo] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [NewCo].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [NewCo] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [NewCo] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [NewCo] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [NewCo] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [NewCo] SET ARITHABORT OFF 
GO
ALTER DATABASE [NewCo] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [NewCo] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [NewCo] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [NewCo] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [NewCo] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [NewCo] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [NewCo] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [NewCo] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [NewCo] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [NewCo] SET  ENABLE_BROKER 
GO
ALTER DATABASE [NewCo] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [NewCo] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [NewCo] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [NewCo] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [NewCo] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [NewCo] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [NewCo] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [NewCo] SET RECOVERY FULL 
GO
ALTER DATABASE [NewCo] SET  MULTI_USER 
GO
ALTER DATABASE [NewCo] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [NewCo] SET DB_CHAINING OFF 
GO
ALTER DATABASE [NewCo] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [NewCo] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [NewCo] SET DELAYED_DURABILITY = DISABLED 
GO
EXEC sys.sp_db_vardecimal_storage_format N'NewCo', N'ON'
GO
ALTER DATABASE [NewCo] SET QUERY_STORE = OFF
GO
USE [NewCo]
GO
/****** Object:  Table [dbo].[Customer]    Script Date: 3/15/2020 9:35:29 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Customer](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [nvarchar](20) NOT NULL,
	[surname] [nvarchar](20) NOT NULL,
	[address] [nvarchar](40) NOT NULL,
	[phone] [nvarchar](15) NOT NULL,
 CONSTRAINT [PK_Customer] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Product]    Script Date: 3/15/2020 9:35:29 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Product](
	[p_id] [int] IDENTITY(1,1) NOT NULL,
	[description] [nvarchar](50) NOT NULL,
	[validity] [datetime] NOT NULL,
	[state] [nvarchar](50) NOT NULL,
	[quantity] [int] NOT NULL,
	[name] [nvarchar](20) NOT NULL,
	[sh_id] [int] NULL,
 CONSTRAINT [PK_Product] PRIMARY KEY CLUSTERED 
(
	[p_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Product-Service]    Script Date: 3/15/2020 9:35:29 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Product-Service](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[p_id] [int] NOT NULL,
	[s_id] [int] NOT NULL,
 CONSTRAINT [PK_Product-Service] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Role]    Script Date: 3/15/2020 9:35:29 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Role](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [nvarchar](20) NOT NULL,
 CONSTRAINT [PK_Role] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Service]    Script Date: 3/15/2020 9:35:29 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Service](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[description] [nvarchar](50) NOT NULL,
	[price] [float] NOT NULL,
	[status] [bit] NOT NULL,
	[name] [nvarchar](20) NOT NULL,
 CONSTRAINT [PK_Service] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Shop]    Script Date: 3/15/2020 9:35:29 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Shop](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[address] [nvarchar](40) NOT NULL,
	[ass_id] [int] NOT NULL,
	[name] [nvarchar](20) NOT NULL,
 CONSTRAINT [PK_Shop] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Sold]    Script Date: 3/15/2020 9:35:29 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sold](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[p_id] [int] NOT NULL,
	[sh_id] [int] NOT NULL,
	[ass_id] [int] NOT NULL,
	[c_id] [int] NOT NULL,
 CONSTRAINT [PK_Sold] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[User]    Script Date: 3/15/2020 9:35:29 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[User](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [nvarchar](20) NOT NULL,
	[surname] [nvarchar](20) NOT NULL,
	[address] [nvarchar](30) NOT NULL,
	[phone] [nvarchar](15) NOT NULL,
	[email] [nvarchar](20) NOT NULL,
	[password] [nvarchar](20) NOT NULL,
	[roleId] [int] NOT NULL,
 CONSTRAINT [PK_User] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Product]  WITH CHECK ADD  CONSTRAINT [FK_Product_Shop] FOREIGN KEY([sh_id])
REFERENCES [dbo].[Shop] ([id])
GO
ALTER TABLE [dbo].[Product] CHECK CONSTRAINT [FK_Product_Shop]
GO
ALTER TABLE [dbo].[Product-Service]  WITH CHECK ADD  CONSTRAINT [FK_Product-Service_Product] FOREIGN KEY([p_id])
REFERENCES [dbo].[Product] ([p_id])
GO
ALTER TABLE [dbo].[Product-Service] CHECK CONSTRAINT [FK_Product-Service_Product]
GO
ALTER TABLE [dbo].[Product-Service]  WITH CHECK ADD  CONSTRAINT [FK_Product-Service_Service] FOREIGN KEY([s_id])
REFERENCES [dbo].[Service] ([id])
GO
ALTER TABLE [dbo].[Product-Service] CHECK CONSTRAINT [FK_Product-Service_Service]
GO
ALTER TABLE [dbo].[Shop]  WITH CHECK ADD  CONSTRAINT [FK_Shop_User] FOREIGN KEY([ass_id])
REFERENCES [dbo].[User] ([id])
GO
ALTER TABLE [dbo].[Shop] CHECK CONSTRAINT [FK_Shop_User]
GO
ALTER TABLE [dbo].[Sold]  WITH CHECK ADD  CONSTRAINT [FK_Sold_Customer] FOREIGN KEY([c_id])
REFERENCES [dbo].[Customer] ([id])
GO
ALTER TABLE [dbo].[Sold] CHECK CONSTRAINT [FK_Sold_Customer]
GO
ALTER TABLE [dbo].[Sold]  WITH CHECK ADD  CONSTRAINT [FK_Sold_Product] FOREIGN KEY([p_id])
REFERENCES [dbo].[Product] ([p_id])
GO
ALTER TABLE [dbo].[Sold] CHECK CONSTRAINT [FK_Sold_Product]
GO
ALTER TABLE [dbo].[Sold]  WITH CHECK ADD  CONSTRAINT [FK_Sold_Shop] FOREIGN KEY([sh_id])
REFERENCES [dbo].[Shop] ([id])
GO
ALTER TABLE [dbo].[Sold] CHECK CONSTRAINT [FK_Sold_Shop]
GO
ALTER TABLE [dbo].[Sold]  WITH CHECK ADD  CONSTRAINT [FK_Sold_User1] FOREIGN KEY([ass_id])
REFERENCES [dbo].[User] ([id])
GO
ALTER TABLE [dbo].[Sold] CHECK CONSTRAINT [FK_Sold_User1]
GO
ALTER TABLE [dbo].[User]  WITH CHECK ADD  CONSTRAINT [FK_User_Role] FOREIGN KEY([roleId])
REFERENCES [dbo].[Role] ([id])
GO
ALTER TABLE [dbo].[User] CHECK CONSTRAINT [FK_User_Role]
GO
/****** Object:  StoredProcedure [dbo].[AddCustomer]    Script Date: 3/15/2020 9:35:29 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[AddCustomer] @name nvarchar(20),@surname nvarchar(20), @address nvarchar(40), @phone nvarchar(15)
AS
INSERT INTO [Customer] (name,surname,address,phone) VALUES (@name,@surname,@address,@phone)
GO
/****** Object:  StoredProcedure [dbo].[AddNewShopAssistent]    Script Date: 3/15/2020 9:35:29 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[AddNewShopAssistent] @name nvarchar(20),@surname nvarchar(20), @address nvarchar(30),@phone nvarchar(15),@email nvarchar(20),@password nvarchar(20), @roleId int
AS
INSERT INTO [User] (name,surname,address,phone,email,password,roleId) VALUES (@name,@surname,@address,@phone,@email,@password,@roleId)
GO
/****** Object:  StoredProcedure [dbo].[AddProduct]    Script Date: 3/15/2020 9:35:29 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[AddProduct] @description nvarchar(50),@validity datetime, @state nvarchar(50),@quantity int,@name nvarchar(20),@sh_id int
AS
INSERT INTO [Product] (description,validity,state,quantity,name,sh_id) 
OUTPUT inserted.p_id
VALUES (@description,@validity,@state,@quantity,@name,@sh_id) 
GO
/****** Object:  StoredProcedure [dbo].[AddSale]    Script Date: 3/15/2020 9:35:29 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[AddSale] @p_id int,@sh_id int ,@ass_id int ,@c_id int 
AS
INSERT INTO [Sold] (p_id,sh_id,ass_id,c_id) VALUES (@p_id,@sh_id,@ass_id,@c_id) 
GO
/****** Object:  StoredProcedure [dbo].[AddService]    Script Date: 3/15/2020 9:35:29 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[AddService] @description nvarchar(50),@price float, @status bit,@name nvarchar(20)
AS
INSERT INTO [Service] (description,price,status,name) VALUES (@description,@price,@status,@name) 
GO
/****** Object:  StoredProcedure [dbo].[ChangeProductState]    Script Date: 3/15/2020 9:35:29 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[ChangeProductState] @state nvarchar(50),@name nvarchar(20)
AS
UPDATE [Product] SET state = @state WHERE name = @name
GO
/****** Object:  StoredProcedure [dbo].[CreateShop]    Script Date: 3/15/2020 9:35:29 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[CreateShop] @address nvarchar(40),@ass_id int,@name nvarchar(20) 
AS
INSERT INTO Shop (address,ass_id,name) VALUES (@address,@ass_id,@name) 
GO
/****** Object:  StoredProcedure [dbo].[EnableDesableService]    Script Date: 3/15/2020 9:35:29 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[EnableDesableService] @status bit, @name nvarchar(20)
AS
UPDATE [Service] SET status = @status WHERE name = @name
GO
/****** Object:  StoredProcedure [dbo].[GetProductServicesById]    Script Date: 3/15/2020 9:35:29 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[GetProductServicesById] @p_id int
AS
SELECT * FROM [Product-Service]  WHERE p_id= @p_id
GO
/****** Object:  StoredProcedure [dbo].[GetSercivesById]    Script Date: 3/15/2020 9:35:29 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[GetSercivesById] @s_id int
AS
SELECT * FROM Service  WHERE id = @s_id
GO
/****** Object:  StoredProcedure [dbo].[RemoveService]    Script Date: 3/15/2020 9:35:29 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[RemoveService] @id int
AS
DELETE FROM [Service] where id = @id
GO
USE [master]
GO
ALTER DATABASE [NewCo] SET  READ_WRITE 
GO
