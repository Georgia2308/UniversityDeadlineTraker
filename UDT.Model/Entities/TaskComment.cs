using System;
using System.Collections.Generic;
using System.Text;

namespace UDT.Model.Entities
{
    public class TaskComment
    {
        public int Id { get; set; }
        public User Sender { get; set; }
        public int SenderId { get; set; }
        public User Receiver { get; set; }
        public int ReceiverId { get; set; }
        public Task Task { get; set; }
        public int TaskId { get; set; }
        public string Message { get; set; }
    }
}
