using System.Collections.Generic;
using UDT.Model.Enums;

namespace UDT.Model.Entities
{
    public class Subject
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public SubjectType Type { get; set; }
        public int Year { get; set; }
        public List<User> Users { get; set; }
        public string Link { get; set; }
    }
}
