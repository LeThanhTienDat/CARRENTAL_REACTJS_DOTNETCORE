using System;
using System.Linq;
using System.Text.RegularExpressions;



namespace BackEnd_DotnetCore.Helpers
{
    public class SlugHelper
    {
        private static readonly Random _random = new Random();
        public static string GenerateSlug(string model, int randomLength = 6)
        {
            string text = model.ToLower();
            text = Regex.Replace(text, @"\s+", "-");
            text = Regex.Replace(text, @"[^a-z0-9\-]", "");
            text = Regex.Replace(text, "-{2,}", "-").Trim('-');
            string randomString = GenerateRandomString(randomLength);
            return text+"/"+randomString;
        }

        public static string GenerateRandomString(int length)
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            return new string(Enumerable.Repeat(chars, length).Select(s => s[_random.Next(s.Length)]).ToArray() );
        }
    }
}
