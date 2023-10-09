let noteIdCounter = 1;
function addNotes() {
  let noteTitle = $("#note-title").val();
  let noteText = $("#note-text").val();
  let noteColor = $("#note-color").val();

  let noteId = `my-note-${noteIdCounter}`;
  let appendNote = `
        <div class="col-lg-2 col-md-3 col-sm-6 mb-3 mt-5" id="${noteId}" data-note-id="${noteId}">
            <div class="card text-bg-${noteColor}">
              <div class="card-body">
                   <div class="d-flex justify-content-between">
                       <h5 class="card-title" id="cardTitle">${noteTitle}</h5>
                       <button type="button" class="btn-close" onclick="deleteNotes(event, '${noteId}')"></button>
                   </div>
                   <p class="card-text" id="cardText">${noteText}</p>
              </div>
        
            </div>
        </div>
    `;

  let notesContainer;
  if ($(window).width() >= 992) {
    notesContainer = $("#large-notes");
  } else if ($(window).width() >= 768) {
    notesContainer = $("#medium-notes");
  } else {
    notesContainer = $("#small-notes");
  }

  notesContainer.append(appendNote);

  var myNote = $(`#${noteId}`);
  myNote.on("click", function () {
    $("#edit-modal").modal("show");
    $("#edit-modal").data("note-id", noteId);
  });

  $("#note-title").val("");
  $("#note-text").val("");
  $("note-color").val('warning');

  $("#my-modal").modal("hide");

  noteIdCounter++;
}

function deleteNotes(event, noteId) {
  event.stopPropagation();
  $(event.target).closest(`#${noteId}`).remove();
}

function editNotes() {
  let noteTitle = $("#edit-note-title").val();
  let noteText = $("#edit-note-text").val();
  let noteColor = $("#edit-note-color").val();

  let modal = $("#edit-modal");

  let noteId = modal.data("note-id");

  let cardBody = $(`#${noteId} .card-body`);

  cardBody.find("#cardTitle").text(noteTitle);
  cardBody.find("#cardText").text(noteText);

  let card = $(`#${noteId} .card`);
  card.removeClass(card.attr("class"));
  card.addClass(`card text-bg-${noteColor}`);

  $("#edit-note-title").val("");
  $("#edit-note-text").val("");
  modal.modal("hide");
}
