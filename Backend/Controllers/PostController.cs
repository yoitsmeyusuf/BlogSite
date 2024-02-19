namespace WebApi.Controllers;

using System.Configuration;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
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
    public async Task<IActionResult> Create(CreateRequest model)
    {
        if(model.IsValidCategory()){
            return BadRequest(new { message = "Invalid category" });
        }

        await _PostService.Create(model);
        return Ok(new { message = "Post created" });
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