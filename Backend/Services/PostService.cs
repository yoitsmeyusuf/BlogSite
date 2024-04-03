namespace WebApi.Services;

using AutoMapper;
using BCrypt.Net;
using WebApi.Entities;
using WebApi.Helpers;
using WebApi.Models.Posts;
using WebApi.Repositories;

public interface  IPostService
{
    Task<IEnumerable<Post>> GetAll();
    // add a add view function
   
    Task<Post> GetById(int id);
    Task Create(CreateRequest model);
    Task Update(int id, UpdateRequest model);
    Task Delete(int id);
    Task<Post> GetByCategory(string category);
    Task<User> GetByUsername(string username);

    Task<User> GetUserById(int id);
    // user get by id
    Task Create(User user);
    Task Deleteu(int id);

     Task Updatea(string usernameold,string username, string password);
     Task<IEnumerable<Post>> GetByTags(string tag);
     Task<IEnumerable<string>> GetAllTags();
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

   //add a view function
  
    public async Task<Post> GetById(int id)
    {
        var Post = await _PostRepository.GetById(id);
        
        
        if (Post == null)
            throw new KeyNotFoundException("Post not found");


        Post.Views++;
        await _PostRepository.Update(Post);
        return Post;
    }
    public async Task<Post> GetByCategory(string category)
    {
            var Post = await _PostRepository.GetByCategory(category);
        
        
        if (Post == null)
            throw new KeyNotFoundException("Post not found");


        return Post;
    }
public async Task<IEnumerable<Post>> GetByTags(string tag)
{
    // get all posts
    var posts = await _PostRepository.GetAll();

    // filter posts by tag
    var postsWithTag = posts.Where(p => p.Tags.Split(',').Contains(tag));

    return postsWithTag;
}

public async Task<IEnumerable<string>> GetAllTags()
{
    // get all posts
    var posts = await _PostRepository.GetAll();

    // get all tags
    var allTags = posts.SelectMany(p => p.Tags.Split(','));

  Console.WriteLine(allTags.ToString());
    var uniqueTags = allTags.Distinct();

    return uniqueTags;
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

    public async Task<User> GetByUsername(string username)
    {
        return await _PostRepository.GetByUsername(username);
    }

    public async Task Create(User user)
    {
        // validate
        if (string.IsNullOrWhiteSpace(user.Password))
            throw new AppException("Password is required");

        // hash password

        // save user
        await _PostRepository.Create(user);
    }

    public async Task Updatea(string usernameold,string username, string password)
    {
        // validate


        // hash password

        // save user
        await _PostRepository.Update(usernameold,username,password);
    }

    public async Task Deleteu(int id)
    {
        await _PostRepository.Deleteu(id);
    }
    

  //user get by id
    public async Task<User> GetUserById(int id)
    {
        var user = await _PostRepository.GetUserById(id);
        if (user == null) throw new KeyNotFoundException("User not found");
        return user;
    }

}