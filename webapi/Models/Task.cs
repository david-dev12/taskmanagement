using System.ComponentModel.DataAnnotations;

namespace webapi.Models
{
    public enum Priority
    {
        Low,
        Medium,
        High
    }
    public enum Status
    {
        Pending,
        InProgress,
        Completed,
        Archived
    }
    public class Task
    {
        public int Id { get; set; }

        [Required]
        public string Title { get; set; }

        public string Description { get; set; }

        public Priority Priority { get; set; }

        public DateTime DueDate { get; set; }

        public Status Status { get; set; }
    }
}
