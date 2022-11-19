using Microsoft.EntityFrameworkCore.Migrations;

namespace WPad.DAL.Migrations
{
    public partial class AddedLikeAndHeadingLikes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Likes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AppUserId = table.Column<int>(type: "int", nullable: false),
                    AppUserId1 = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Likes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Likes_AspNetUsers_AppUserId1",
                        column: x => x.AppUserId1,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

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
                name: "IX_HeadingLikes_HeadingId",
                table: "HeadingLikes",
                column: "HeadingId");

            migrationBuilder.CreateIndex(
                name: "IX_HeadingLikes_LikeId",
                table: "HeadingLikes",
                column: "LikeId");

            migrationBuilder.CreateIndex(
                name: "IX_Likes_AppUserId1",
                table: "Likes",
                column: "AppUserId1");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "HeadingLikes");

            migrationBuilder.DropTable(
                name: "Likes");
        }
    }
}
