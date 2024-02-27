using System.Buffers.Text;

namespace WebApi.Controllers;

using System;
using Microsoft.AspNetCore.Mvc;
using WebApi.Entities;
using WebApi.Models.Posts;
using WebApi.Services;


[ApiController]

[Route("[controller]")]
public class PostsController : ControllerBase
{
    private IPostService _PostService;

    public PostsController(IPostService PostService)
    {
        _PostService = PostService;
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

   
[HttpPost("create")]
public async Task<IActionResult> Create([FromForm]CreateRequest model)
{
 

  var imageData = model.Images; // Assuming model has image data property

  // Create blog post

  var blog = new Post{
    Title = model.Title,
    Content = model.Content,
    Category = model.Category,
    PublishDate = model.PublishDate,
    ImageURL = model.ImageURL
  };
  

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