namespace WebApi.Repositories;

using Dapper;
using WebApi.Entities;
using WebApi.Helpers;

public interface IPostRepository
{
    Task<IEnumerable<Post>> GetAll();
    Task<Post> GetById(int id);
    Task<Post> GetByTitle(string email);
    Task<Post> GetByCategory(string Category);
    Task Create(Post Post);
    Task Update(Post Post);
    Task Delete(int id);
    
    Task<User> GetByUsername(string username);
    Task<User> GetUserById(int id);
    Task Create(User user);
      Task Update(string usernameold,string username,string password);
    Task Deleteu(int id);

}

public class PostRepository : IPostRepository
{
    private DataContext _context;

    public PostRepository(DataContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Post>> GetAll()
    {
        using var connection = _context.CreateConnection();
        var sql = """
            SELECT * FROM Posts
        """;
        return await connection.QueryAsync<Post>(sql);
    }

    public async Task<Post> GetById(int id)
    {
        using var connection = _context.CreateConnection();
        var sql = """
            SELECT * FROM Posts 
            WHERE PostID = @id
        """;
        return await connection.QuerySingleOrDefaultAsync<Post>(sql, new { id });
    }

    public async Task<Post> GetByTitle(string Title)
    {
        using var connection = _context.CreateConnection();
        var sql = """
            SELECT * FROM Posts 
            WHERE Title = @Title
        """;
        return await connection.QuerySingleOrDefaultAsync<Post>(sql, new { Title });
    }

     public async Task<Post> GetByCategory(string Category)
    {
        using var connection = _context.CreateConnection();
        var sql = """
            SELECT * FROM Posts 
            WHERE Category = @Category
        """;
        return await connection.QuerySingleOrDefaultAsync<Post>(sql, new { Category });
    }


    public async Task Create(Post Post)
    {
        using var connection = _context.CreateConnection();
        var sql = """
           INSERT INTO Posts (Title, Content, PublishDate, ImageURL,Category,AuthorID,Tags) VALUES (@Title, @Content, @PublishDate, @ImageURL,@Category,@Author,@Tags)
        """;
        await connection.ExecuteAsync(sql, Post);
    }


    public async Task Update(Post post)
{
  using var connection = _context.CreateConnection();
    var sql = """
            UPDATE Posts 
            SET Title = @Title,
            Category = @Category,
            Content = @Content,
            ImageURL = @ImageURL,
            AuthorID = @Author,
            Tags = @Tags,
            Views = @Views
            WHERE PostID = @PostID
        """;

   await connection.ExecuteAsync(sql, post);
}

    public async Task Delete(int id)
    {
        using var connection = _context.CreateConnection();
        var sql = """
            DELETE FROM Posts 
            WHERE PostId = @id
        """;
        await connection.ExecuteAsync(sql, new { id });
    }

  // write samething but for user
    public async Task<User> GetByUsername(string username)
    {
        using var connection = _context.CreateConnection();
        var sql = """
            SELECT * FROM Users 
            WHERE Username = @username
        """;
        return await connection.QuerySingleOrDefaultAsync<User>(sql, new { username });
    }

    public async Task<User> GetUserById(int id)
    {
        using var connection = _context.CreateConnection();
        var sql = @"
            SELECT * FROM Users 
            WHERE UserID = @id
        ";
        return await connection.QuerySingleOrDefaultAsync<User>(sql, new { id });
    }

    public async Task Create(User user)
    {
        using var connection = _context.CreateConnection();
        var sql = """
           INSERT INTO Users (Username, Password) VALUES (@Username, @Password)
        """;
        await connection.ExecuteAsync(sql, user);
    }

    public async Task Update(string usernameold, string Username, string Password)
    {
        using var connection = _context.CreateConnection();

        var sql = @"
            UPDATE Users 
            SET Username = @Username,
            Password = @Password
            WHERE Username = @usernameold
        ";

        await connection.ExecuteAsync(sql, new { usernameold, Username, Password });
    }

    public async Task Deleteu(int id)
    {
        using var connection = _context.CreateConnection();
        var sql = """
            DELETE FROM Users 
            WHERE UserID = @id
        """;
        await connection.ExecuteAsync(sql, new { id });
    }





    
}