using Microsoft.EntityFrameworkCore.Migrations;

namespace WPad.DAL.Migrations
{
    public partial class UpdatedFollowEntity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Follows_AspNetUsers_AppUserId",
                table: "Follows");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Follows",
                table: "Follows");

            migrationBuilder.DropIndex(
                name: "IX_Follows_AppUserId",
                table: "Follows");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "Follows");

            migrationBuilder.DropColumn(
                name: "AppUserId",
                table: "Follows");

            migrationBuilder.AlterColumn<string>(
                name: "FolloweeId",
                table: "Follows",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FollowerId",
                table: "Follows",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Follows",
                table: "Follows",
                columns: new[] { "FollowerId", "FolloweeId" });

            migrationBuilder.AddForeignKey(
                name: "FK_Follows_AspNetUsers_FollowerId",
                table: "Follows",
                column: "FollowerId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Follows_AspNetUsers_FollowerId",
                table: "Follows");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Follows",
                table: "Follows");

            migrationBuilder.DropColumn(
                name: "FollowerId",
                table: "Follows");

            migrationBuilder.AlterColumn<string>(
                name: "FolloweeId",
                table: "Follows",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "Follows",
                type: "int",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddColumn<string>(
                name: "AppUserId",
                table: "Follows",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Follows",
                table: "Follows",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_Follows_AppUserId",
                table: "Follows",
                column: "AppUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Follows_AspNetUsers_AppUserId",
                table: "Follows",
                column: "AppUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
