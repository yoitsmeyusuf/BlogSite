namespace WebApi.Models.Posts;

using System.ComponentModel.DataAnnotations;
using Org.BouncyCastle.Utilities;
using WebApi.Entities;

public class CreateRequest
{
    [Required]
       public string Title { get; set; }
    [Required]
    public string Content { get; set; }
    
    [EnumDataType(typeof(CategoryType))]
    public string Category { get; set; }
    public bool IsValidCategory()
    {
        return Enum.IsDefined(typeof(CategoryType), this.Category);
    }
     public DateTime PublishDate { get; set; } = DateTime.Now;
    [Required]
    public string ImageURL { get; set; }

    public string Author { get; set; }
     public string[]? Images { get; set; }
    public string[]? Names { get; set; }
    public  List<string> TagsList { get; set; }
 
}


public enum CategoryType
{
    Teknoloji,
    Bilim,
    İşletme
    // Add more categories as needed
}