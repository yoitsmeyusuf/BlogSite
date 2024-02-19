namespace WebApi.Services;

using AutoMapper;
using BCrypt.Net;
using WebApi.Entities;
using WebApi.Helpers;
using WebApi.Models.Posts;
using WebApi.Repositories;

public interface IPostService
{
    Task<IEnumerable<Post>> GetAll();
    Task<Post> GetById(int id);
    Task Create(CreateRequest model);
    Task Update(int id, UpdateRequest model);
    Task Delete(int id);
    Task<Post> GetByCategory(string category);
}

public class PostService : IPostService
{
    private IPostRepository _PostRepository;
    private readonly IMapper _mapper;

    public PostService(
        IPostRepository PostRepository,
        IMapper mapper)
    {
        _PostRepository = PostRepository;
        _mapper = mapper;
    }

    public async Task<IEnumerable<Post>> GetAll()
    {
       
        return await _PostRepository.GetAll();
    }

    public async Task<Post> GetById(int id)
    {
        var Post = await _PostRepository.GetById(id);
        
        
        if (Post == null)
            throw new KeyNotFoundException("Post not found");


        return Post;
    }
    public async Task<Post> GetByCategory(string category)
    {
            var Post = await _PostRepository.GetByCategory(category);
        
        
        if (Post == null)
            throw new KeyNotFoundException("Post not found");


        return Post;
    }

    public async Task Create(CreateRequest model)
    {
        // validate
       

        // map model to new Post object
        var Post = _mapper.Map<Post>(model);

        // hash password
        
        // save Post
        await _PostRepository.Create(Post);
    }

    public async Task Update(int id, UpdateRequest model)
    {
        var Post = await _PostRepository.GetById(id);

        if (Post == null)
            throw new KeyNotFoundException("Post not found");

        // validate
   
        // copy model props to Post
        _mapper.Map(model, Post);

        // save Post
        await _PostRepository.Update(Post);
    }

    public async Task Delete(int id)
    {
        await _PostRepository.Delete(id);
    }
}