﻿using System;

namespace UDT.Model.ViewModels
{
    public class TaskViewModel
    {
        public int Id { get; set; }
        public string Title { set; get; }
        public string Subtitle { set; get; }
        public string Description { set; get; }
        public int SubjectId { set; get; }
        public DateTime Deadline { set; get; }
        public double Penalty { get; set; }
    }
}
