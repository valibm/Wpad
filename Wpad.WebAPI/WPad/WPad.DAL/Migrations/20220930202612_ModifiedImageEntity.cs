using Microsoft.EntityFrameworkCore.Migrations;

namespace WPad.DAL.Migrations
{
    public partial class ModifiedImageEntity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Heading_AspNetUsers_AppUserId",
                table: "Heading");

            migrationBuilder.DropForeignKey(
                name: "FK_Heading_Channels_ChannelId",
                table: "Heading");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Heading",
                table: "Heading");

            migrationBuilder.RenameTable(
                name: "Heading",
                newName: "Headings");

            migrationBuilder.RenameIndex(
                name: "IX_Heading_ChannelId",
                table: "Headings",
                newName: "IX_Headings_ChannelId");

            migrationBuilder.RenameIndex(
                name: "IX_Heading_AppUserId",
                table: "Headings",
                newName: "IX_Headings_AppUserId");

            migrationBuilder.AddColumn<int>(
                name: "HeadingId",
                table: "Images",
                type: "int",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Headings",
                table: "Headings",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_Images_HeadingId",
                table: "Images",
                column: "HeadingId");

            migrationBuilder.AddForeignKey(
                name: "FK_Headings_AspNetUsers_AppUserId",
                table: "Headings",
                column: "AppUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Headings_Channels_ChannelId",
                table: "Headings",
                column: "ChannelId",
                principalTable: "Channels",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Images_Headings_HeadingId",
                table: "Images",
                column: "HeadingId",
                principalTable: "Headings",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Headings_AspNetUsers_AppUserId",
                table: "Headings");

            migrationBuilder.DropForeignKey(
                name: "FK_Headings_Channels_ChannelId",
                table: "Headings");

            migrationBuilder.DropForeignKey(
                name: "FK_Images_Headings_HeadingId",
                table: "Images");

            migrationBuilder.DropIndex(
                name: "IX_Images_HeadingId",
                table: "Images");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Headings",
                table: "Headings");

            migrationBuilder.DropColumn(
                name: "HeadingId",
                table: "Images");

            migrationBuilder.RenameTable(
                name: "Headings",
                newName: "Heading");

            migrationBuilder.RenameIndex(
                name: "IX_Headings_ChannelId",
                table: "Heading",
                newName: "IX_Heading_ChannelId");

            migrationBuilder.RenameIndex(
                name: "IX_Headings_AppUserId",
                table: "Heading",
                newName: "IX_Heading_AppUserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Heading",
                table: "Heading",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Heading_AspNetUsers_AppUserId",
                table: "Heading",
                column: "AppUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Heading_Channels_ChannelId",
                table: "Heading",
                column: "ChannelId",
                principalTable: "Channels",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
