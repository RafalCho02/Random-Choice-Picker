$(document).ready(function () {
  const $tagsEl = $("#tags");
  const $textarea = $("#textarea");

  $textarea.focus();

  $textarea.on("keyup", function (e) {
    createTags(e.target.value);

    if (e.key === "Enter") {
      setTimeout(() => {
        e.target.value = "";
      }, 10);

      randomSelect();
    }
  });

  function createTags(input) {
    const tags = input
      .split(",")
      .filter((tag) => tag.trim() !== "")
      .map((tag) => tag.trim());

    $tagsEl.html("");

    tags.forEach((tag) => {
      const $tagEl = $("<span></span>").addClass("tag").text(tag);
      $tagsEl.append($tagEl);
    });
  }

  function randomSelect() {
    const times = 30;

    const interval = setInterval(() => {
      const randomTag = pickRandomTag();

      highlightTag(randomTag);

      setTimeout(() => {
        unHighlightTag(randomTag);
      }, 100);
    }, 100);

    setTimeout(() => {
      clearInterval(interval);

      setTimeout(() => {
        const randomTag = pickRandomTag();
        highlightTag(randomTag);
      }, 100);
    }, times * 100);
  }

  function pickRandomTag() {
    const $tags = $(".tag");
    return $($tags[Math.floor(Math.random() * $tags.length)]);
  }

  function highlightTag($tag) {
    $tag.addClass("highlight");
  }

  function unHighlightTag($tag) {
    $tag.removeClass("highlight");
  }
});
