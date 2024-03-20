using System.Buffers.Text;

namespace WebApi.Controllers;

using System;
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

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var Posts = await _PostService.GetAll();
        return Ok(Posts);
    }

    [HttpGet("category/{category}")]
    public async Task<IActionResult> GetByCategory(string category)
    {
        var Posts = await _PostService.GetByCategory(category);
        return Ok(Posts);
    }    
 
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
     
        var Post = await _PostService.GetById(id);
        return Ok(Post);
    }
//update user

   
[HttpPost("create")]
public async Task<IActionResult> Create([FromForm]CreateRequest model)
{
 
  var imageData = model.Images; // Assuming model has image data property
  if(model.ImageURL != null)
  {
    string isim = System.Guid.NewGuid().ToString();
    byte[] imageBytes = Convert.FromBase64String(model.ImageURL);
    var path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images",isim+".jpg");
    await System.IO.File.WriteAllBytesAsync(path, imageBytes);
    model.ImageURL = Path.Combine("http://localhost:4000","images",isim+".jpg");
    
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
public async Task<IActionResult> UpdatethisUser([FromForm]User a)
{
    var token = Request.Headers[HeaderNames.Authorization].ToString().Replace("Bearer ", "");
    string usernameold =  _AuthService.GetUsernameFromToken(token);
    
    await _PostService.Updatea(usernameold,a.Username,a.Password);
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

    [HttpDelete("delete/{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        await _PostService.Delete(id);
        return Ok(new { message = "Post deleted" });
    }
}
public class UploadModel
{
    public string[] Filecode { get; set; }
    public string[] Names { get; set; }
}