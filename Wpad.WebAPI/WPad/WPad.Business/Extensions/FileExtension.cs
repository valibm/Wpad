using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WPad.Business.Extensions
{
    public static class FileExtension
    {
        public static string CreateFileName(this IFormFile file)
        {
            string name = Guid.NewGuid().ToString() + file.FileName;

            if (name.Length > 255)
            {
                name = name.Substring(name.Length - 254);
            }

            return name;
        }

        public static async Task<string> CreateFile(this IFormFile file, IWebHostEnvironment env)
        {
            string baseFolderPath = Path.Combine(env.WebRootPath, "images");
            
            string name = file.CreateFileName();

            string path = Path.Combine(baseFolderPath, name);


            using (FileStream fs = new(path, FileMode.Create))
            {
                await file.CopyToAsync(fs);
            }

            return name;
        }
    }
}
