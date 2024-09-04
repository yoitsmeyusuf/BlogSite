namespace WebApi.Entities;

using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;


public class Post
{
    public int PostID { get; set; }
    public string Title { get; set; }
    public string Content { get; set; }
    public string Category { get; set; }
    public DateTime PublishDate { get; set; } = DateTime.Now;
    public int Author { get; set; }
    public string ImageURL { get; set; }= "https://via.placeholder.com/150";

    public int Views { get; set; } = 0;
    
    public string Tags { get; set; } = "";
    [NotMapped]    
    public List<string> TagsList
    {
        get { return Tags.Split(',').ToList(); }
        set { Tags = String.Join(",", value); }
    }
}


public class User
{
    public int UserID { get; set; }
  
    public string Username { get; set; }
    public string Password { get; set; }

     public string ImageURL { get; set; }= "https://devapi.ahmetturanpolat.com/images/Profile.jpg";

}