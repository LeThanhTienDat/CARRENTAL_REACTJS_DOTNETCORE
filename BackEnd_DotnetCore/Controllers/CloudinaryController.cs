using BackEnd_DotnetCore.Helpers;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using BackEnd_DotnetCore.Models;


namespace BackEnd_DotnetCore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CloudinaryController : ControllerBase
    {
        private readonly Cloudinary _cloudinary;

        public CloudinaryController(IOptions<CloudinarySettings> config)
        {
            var account = new Account(
                config.Value.CloudName,
                config.Value.ApiKey,
                config.Value.ApiSecret
            );
            _cloudinary = new Cloudinary(account);
        }

        [HttpPost("delete")]
        public async Task<IActionResult> DeleteImage([FromBody] string imageUrl)
        {
            var publicId = CloudinaryHelper.GetPublicId(imageUrl);
            if (string.IsNullOrEmpty(publicId))
                return BadRequest("Invalid image URL");

            var deletionParams = new DeletionParams(publicId);
            var result = await _cloudinary.DestroyAsync(deletionParams);

            if (result.Result == "ok")
                return Ok(new { message = "Image deleted", publicId });

            return BadRequest(new { message = "Failed to delete", result.Result });
        }
    }
}
