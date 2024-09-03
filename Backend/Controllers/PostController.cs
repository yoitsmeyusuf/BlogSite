using System.Buffers.Text;

namespace WebApi.Controllers;

using System;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Net.Http.Headers;
using WebApi.Entities;
using WebApi.Models.Posts;
using WebApi.Services;
// uuid for unique id



[ApiController]

[Route("[controller]")]
public class PostsController : ControllerBase
{
    private IPostService _PostService;
    private IAuthServices _AuthService;

    public PostsController(IPostService PostService,IAuthServices AuthService)
    {
        _PostService = PostService;
        _AuthService = AuthService;
    }



        [HttpGet("whoami")]
        public async Task<IActionResult> whoami()
        {
            var token = Request.Headers[HeaderNames.Authorization].ToString().Replace("Bearer ", "");
            if (string.IsNullOrEmpty(token))
            {
                return BadRequest();
            }
            var handler = new JwtSecurityTokenHandler();
            if (!handler.CanReadToken(token))
            {
                return BadRequest("Invalid token");
            }
            Console.WriteLine("asdsad");
            User? a = await _PostService.GetByUsername(_AuthService.GetUsernameFromToken(token));

            if (a == null)
            {
                return Unauthorized();
            }
            return Ok(a);
        }
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var Posts = await _PostService.GetAll();
      
        return Ok(Posts);
    }
   
    //GET user by ID
    

    [HttpGet("category/{category}")]
    public async Task<IActionResult> GetByCategory(string category)
    {
        var Posts = await _PostService.GetByCategory(category);
        return Ok(Posts);
    }    

    [HttpGet("tags/{tag}")]
public async Task<IActionResult> GetByTags(string tag)
{
    var posts = await _PostService.GetByTags(tag);
    return Ok(posts);
}


[HttpGet("tags")]
public async Task<IActionResult> GetAllTags()
{
    var tags = await _PostService.GetAllTags();
    return Ok(tags);
}
 
    [HttpGet("User/{id}")]
    public async Task<IActionResult> GetUserById(int id)
    {
        var Post = await _PostService.GetUserById(id);
        return Ok(Post);
    }
    [HttpGet("{id}")]
    public async Task<IActionResult> GeById(int id)
    {
        var Post = await _PostService.GetById(id);

        return Ok(Post);
    }


   
[HttpPost("create")]
public async Task<IActionResult> Create([FromForm]CreateRequest model)
{
 
var token = Request.Headers[HeaderNames.Authorization].ToString().Replace("Bearer ", "");
if (string.IsNullOrEmpty(token))
{
    return BadRequest();    
}
User? a = await _PostService.GetByUsername(_AuthService.GetUsernameFromToken(token));
var imageData = model.Images; 
model.Author = a.UserID.ToString();
Console.WriteLine(model);
if (model.ImageURL != null)
{
    string isim = System.Guid.NewGuid().ToString();
    byte[] imageBytes = Convert.FromBase64String(model.ImageURL);
    var path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images", isim + ".jpg");
    await System.IO.File.WriteAllBytesAsync(path, imageBytes);
    model.ImageURL = Path.Combine("http://devapi.ahmetturanpolat.com", "images", isim + ".jpg");
}


    if (a == null)
    {
        return Unauthorized();
    }
  await _PostService.Create(model);

  // Save images if present
  if (imageData != null)
  {
    for (var i = 0; i < imageData.Count(); i++)
    {
      byte[] imageBytes = Convert.FromBase64String(imageData[i]);
   
      var path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images",model.Names[i]+".jpg");
      await System.IO.File.WriteAllBytesAsync(path, imageBytes);

    }
  }


  return Ok(new { message = "Post created" });
}



    [HttpPost("upload")]
public async Task<IActionResult> Upload([FromBody] UploadModel uploadModel)
{
      var i = -1;
    foreach (var file in uploadModel.Filecode)
    {
    i++;
        
    byte[] fileBytes = Convert.FromBase64String(file);

    var path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", uploadModel.Names[i]+".jpg");
    Console.WriteLine(path);
    await System.IO.File.WriteAllBytesAsync(path, fileBytes);
    }
     return Ok(new { message = "upload successs"});
}

[HttpPost("UpdatethisUser")]
public async Task<IActionResult> UpdatethisUser([FromForm]string username,[FromForm]
string password)
{
    var token = Request.Headers[HeaderNames.Authorization].ToString().Replace("Bearer ", "");
    string usernameold =  _AuthService.GetUsernameFromToken(token);
    
    await _PostService.Updatea(usernameold,username,password);
    return Ok(new { message = "User updated" });
}

    [HttpPost("uploadProfile")]
public async Task<IActionResult> UploadProfile([FromForm]UploadModel uploadModel)
{
   
    
    byte[] fileBytes = Convert.FromBase64String(uploadModel.Filecode[0]);
    

    var path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot","images", "Profile.jpg");
    Console.WriteLine(path);
  
    //if there is a another Profile picture delete it
    if(System.IO.File.Exists(path))
    {
        System.IO.File.Delete(path);
    }
      await System.IO.File.WriteAllBytesAsync(path, fileBytes);
     return Ok(new { message = "upload successs"});
}




    [HttpPut("update/{id}")]
    public async Task<IActionResult> Update(int id, UpdateRequest model)
    {
         if(model.IsValidCategory()){
            return BadRequest(new { message = "Invalid category" });
        }
        await _PostService.Update(id, model);
        return Ok(new { message = "Post updated" });
    }

    [HttpPost("delete")]
    public async Task<IActionResult> Delete([FromForm]int id)
    {
        Console.WriteLine(id);
        
        await _PostService.Delete(id);
        return Ok(new { message = "Post deleted" });
    }
}
public class UploadModel
{
    public string[] Filecode { get; set; }
    public string[] Names { get; set; }
}