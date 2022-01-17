using System;
using System.Collections.Generic;
using System.Text;
using UDT.Model.Entities;
using UDT.Model.ViewModels;

namespace UDT.Model.Mappers
{
    public static class TaskCommentMappers
    {
        public static TaskComment toEntity(this TaskCommentViewModel taskCommentViewModel)
        {
            TaskComment user = new TaskComment
            {
                Id = taskCommentViewModel.Id,
                SenderId = taskCommentViewModel.SenderId,
                ReceiverId = taskCommentViewModel.ReceiverId,
                TaskId = taskCommentViewModel.TaskId,
                Message = taskCommentViewModel.Message,
            };

            return user;
        }

        public static TaskCommentViewModel toViewModel(this TaskComment taskComment)
        {
            TaskCommentViewModel taskCommentViewModel = taskComment != null ? new TaskCommentViewModel
            {
                Id = taskComment.Id,
                SenderId = taskComment.SenderId,
                ReceiverId = taskComment.ReceiverId,
                TaskId = taskComment.TaskId,
                Message = taskComment.Message,
            } : null;

            return taskCommentViewModel;
        }

        public static TaskComment toEntity(this TaskCommentUpdateViewModel taskCommentUpdateViewModel)
        {
            TaskComment taskComment = new TaskComment
            {
                Message = taskCommentUpdateViewModel.Message,
            };

            return taskComment;
        }

        public static TaskComment toEntity(this TaskCommentCreationViewModel taskCommentCreationViewModel)
        {
            TaskComment taskComment = new TaskComment
            {
                SenderId = taskCommentCreationViewModel.SenderId,
                ReceiverId = taskCommentCreationViewModel.ReceiverId,
                TaskId = taskCommentCreationViewModel.TaskId,
                Message = taskCommentCreationViewModel.Message,
            };

            return taskComment;
        }
    }
}
