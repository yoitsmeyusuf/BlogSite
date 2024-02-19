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