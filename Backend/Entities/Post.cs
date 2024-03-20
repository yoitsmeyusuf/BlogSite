namespace WebApi.Entities;

using System.Text.Json.Serialization;


public class Post
{
    public int PostID { get; set; }
    public string Title { get; set; }
    public string Content { get; set; }
    public string Category { get; set; }
    public DateTime PublishDate { get; set; } = DateTime.Now;
    public string ImageURL { get; set; }= "https://via.placeholder.com/150";
}


public class User
{
    public int UserID { get; set; }
    public string Username { get; set; }
    public string Password { get; set; }

     public string ImageURL { get; set; }= "localhost:4000/images/Profile.jpg";

}