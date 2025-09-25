namespace BackEnd_DotnetCore.Helpers
{
    public class CloudinaryHelper
    {
        public static string GetPublicId(string url)
        {
            if (string.IsNullOrEmpty(url)) return null;

            var parts = url.Split("/upload/");
            if (parts.Length < 2) return null;
            
            var afterUpload = parts[1];
            var withoutExtension = afterUpload.Substring(0, afterUpload.LastIndexOf("."));
            var segment = withoutExtension.Split("/");
            if (segment[0].StartsWith("v") && int.TryParse(segment[0].Substring(1), out _))
            {
                return string.Join("/", segment.Skip(1));
            }
            return withoutExtension;
        }
    }
}
