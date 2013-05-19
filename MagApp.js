/*
 * Seiten-Umschalter
 * -----------------
 */

//
var $chapters = $('.chapter');
var chapterNames = [].map.call($chapters, function(el){
  return $(el).attr('id');
});

// Kapitel nebeneinander anordnen
$(window).load(function(){
  $chapters.each(function(idx, el){
    $(el).css('transform', 'translateX(' + idx * 100 + '%)');
  });
});

// Gehe zum Kapitel mit der ID `chapterName`
function goTo(chapterName){
  var chapterIndex = chapterNames.indexOf(chapterName);
  console.log(chapterName, chapterIndex);
  if(chapterIndex !== -1){
    $('#Content').css('transform', 'translateX(' + chapterIndex * -100 + '%)');
    history.pushState({}, '', '#' + chapterName);
  }
}

// goTo() via Links auslösen
$('#Nav a').click(function(evt){
  evt.preventDefault();
  var chapterName = $(this).attr('href').substr(1);
  goTo(chapterName);
});


// Unabhängig vom Hash zum Ausgangspunkt scrollen


// goTo beim Laden der Seite auslösen
window.scrollTo(0, 0);
var chapterName = window.location.hash.substr(1);
goTo(chapterName);