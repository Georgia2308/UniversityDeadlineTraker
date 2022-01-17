using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using UDT.Business.Interfaces;
using UDT.Model.Mappers;
using UDT.Model.ViewModels;
using UniversityDeadlineTracker.Filters;

namespace UniversityDeadlineTracker.Controllers
{
    [ApiController]
    [Route("api/task-comments")]
    [AuthorizationFilter]
    public class TaskCommentController : ControllerBase
    {
        private readonly ITaskCommentService _taskCommentService;

        public TaskCommentController(
            ITaskCommentService taskCommentService,
            IAuthorizationHelper authorizationHelper)
        {
            _taskCommentService = taskCommentService;
        }

        [HttpGet]
        [Route("{id:int}")]
        [AuthorizationFilter]
        public async Task<IActionResult> GetByIdAsync(
            [FromRoute] int id)
        {
            var taskComment = await _taskCommentService.GetByIdAsync(id);

            if (taskComment == null)
                return NotFound();

            var userIdFromContext = (int)HttpContext.Items["UserId"];
            if (userIdFromContext != taskComment.ReceiverId && userIdFromContext != taskComment.SenderId)
                return Unauthorized();

            return Ok(taskComment.toViewModel());
        }

        [HttpGet]
        [Route("tasks/{taskId}/users/{userId}")]
        [AuthorizationFilter]
        public async Task<IActionResult> GetByTaskAndUserAsync(
            [FromRoute] int taskId, [FromRoute] int userId)
        {
            var userIdFromContext = (int)HttpContext.Items["UserId"];
            if (userIdFromContext != userId && userIdFromContext != userId)
                return Unauthorized();

            return Ok(
                (await _taskCommentService.GetByTaskAndUserAsync(taskId, userId))
                    .Select(user => user.toViewModel())
            );
        }

        [HttpPost]
        public async Task<IActionResult> AddAsync(
            [FromBody] TaskCommentCreationViewModel taskCommentCreationViewModel)
        {
            var taskComment = taskCommentCreationViewModel.toEntity();

            var userIdFromContext = (int)HttpContext.Items["UserId"];
            if (userIdFromContext != taskComment.SenderId)
                return Unauthorized();

            return Ok(
                (await _taskCommentService.AddAsync(taskComment)).toViewModel()
            );
        }

        [HttpPut]
        [Route("{id:int}")]
        [AuthorizationFilter]
        public async Task<IActionResult> UpdateAsync([FromRoute] int id,
            [FromBody] TaskCommentUpdateViewModel taskCommentUpdateViewModel)
        {
            var taskComment = taskCommentUpdateViewModel.toEntity();
            taskComment.Id = id;

            var comment = await _taskCommentService.GetByIdAsync(id);
            if (comment == null)
                return NotFound();

            var userIdFromContext = (int)HttpContext.Items["UserId"];
            if (userIdFromContext != comment.SenderId)
                return Unauthorized();

            taskComment = await _taskCommentService.UpdateAsync(taskComment);

            if (taskComment == null)
                return NotFound();

            return Ok(taskComment.toViewModel());
        }

        [HttpDelete]
        [Route("{id:int}")]
        [AuthorizationFilter]
        public async Task<IActionResult> DeleteAsync([FromRoute] int id)
        {
            var comment = await _taskCommentService.GetByIdAsync(id);
            if (comment == null)
                return NotFound();

            var userIdFromContext = (int)HttpContext.Items["UserId"];
            if (userIdFromContext != comment.SenderId)
                return Unauthorized();

            return Ok(await _taskCommentService.DeleteAsync(id));
        }
    }
}