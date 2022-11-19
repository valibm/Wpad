using Microsoft.EntityFrameworkCore.Migrations;

namespace WPad.DAL.Migrations
{
    public partial class ModifiedLikeEntity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Likes_AspNetUsers_AppUserId1",
                table: "Likes");

            migrationBuilder.DropTable(
                name: "HeadingLikes");

            migrationBuilder.DropIndex(
                name: "IX_Likes_AppUserId1",
                table: "Likes");

            migrationBuilder.DropColumn(
                name: "AppUserId1",
                table: "Likes");

            migrationBuilder.AlterColumn<string>(
                name: "AppUserId",
                table: "Likes",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<int>(
                name: "HeadingId",
                table: "Likes",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<int>(
                name: "LikeCount",
                table: "Headings",
                type: "int",
                nullable: true,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Likes_AppUserId",
                table: "Likes",
                column: "AppUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Likes_HeadingId",
                table: "Likes",
                column: "HeadingId");

            migrationBuilder.AddForeignKey(
                name: "FK_Likes_AspNetUsers_AppUserId",
                table: "Likes",
                column: "AppUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Likes_Headings_HeadingId",
                table: "Likes",
                column: "HeadingId",
                principalTable: "Headings",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Likes_AspNetUsers_AppUserId",
                table: "Likes");

            migrationBuilder.DropForeignKey(
                name: "FK_Likes_Headings_HeadingId",
                table: "Likes");

            migrationBuilder.DropIndex(
                name: "IX_Likes_AppUserId",
                table: "Likes");

            migrationBuilder.DropIndex(
                name: "IX_Likes_HeadingId",
                table: "Likes");

            migrationBuilder.DropColumn(
                name: "HeadingId",
                table: "Likes");

            migrationBuilder.AlterColumn<int>(
                name: "AppUserId",
                table: "Likes",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "AppUserId1",
                table: "Likes",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "LikeCount",
                table: "Headings",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true,
                oldDefaultValue: 0);

            migrationBuilder.CreateTable(
                name: "HeadingLikes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    HeadingId = table.Column<int>(type: "int", nullable: false),
                    LikeId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HeadingLikes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_HeadingLikes_Headings_HeadingId",
                        column: x => x.HeadingId,
                        principalTable: "Headings",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_HeadingLikes_Likes_LikeId",
                        column: x => x.LikeId,
                        principalTable: "Likes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Likes_AppUserId1",
                table: "Likes",
                column: "AppUserId1");

            migrationBuilder.CreateIndex(
                name: "IX_HeadingLikes_HeadingId",
                table: "HeadingLikes",
                column: "HeadingId");

            migrationBuilder.CreateIndex(
                name: "IX_HeadingLikes_LikeId",
                table: "HeadingLikes",
                column: "LikeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Likes_AspNetUsers_AppUserId1",
                table: "Likes",
                column: "AppUserId1",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
