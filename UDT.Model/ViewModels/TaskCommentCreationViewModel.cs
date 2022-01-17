using System;
using System.Collections.Generic;
using System.Text;

namespace UDT.Model.ViewModels
{
    public class TaskCommentCreationViewModel
    {
        public int SenderId { get; set; }
        public int ReceiverId { get; set; }
        public int TaskId { get; set; }
        public string Message { get; set; }
    }
}
