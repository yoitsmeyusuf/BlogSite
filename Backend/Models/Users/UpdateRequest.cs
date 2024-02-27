namespace WebApi.Models.Posts;

using System.ComponentModel.DataAnnotations;
using WebApi.Entities;

public class UpdateRequest
{
    

 public string Title { get; set; }
    public string Content { get; set; }
    public DateTime PublishDate { get; set; }

    [EnumDataType(typeof(CategoryType))]
    public string Category { get; set; }
    public bool IsValidCategory()
    {
        return Enum.IsDefined(typeof(CategoryType), this.Category);
    }
    // Category is a string, but we want to limit the possible values to a specific set of strings
    // We can use the EnumDataType attribute to specify the enum type to use for validation
    

    
    public string ImageURL { get; set; }= "https://via.placeholder.com/150";
}
