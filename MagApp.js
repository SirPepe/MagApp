// Alle Kapitel
var $chapters = $('.chapter');

// IDs aller Kapitel
var chapterNames = [].map.call($chapters, function(el){
  return $(el).attr('id');
});




/*
 * Seiten-Umschalter
 * -----------------
 */

// Aktuell aktives Kapitel
var currentChapter = 0;

// Gehe zum Kapitel mit der ID chapterName
function goTo(chapterName){
  var chapterIndex = chapterNames.indexOf(chapterName);
  if(chapterIndex !== -1){
    currentChapter = chapterIndex;
    $('.chapter.current').removeClass('current');
    var element = $chapters[chapterIndex];
    $(element).addClass('current');
    history.pushState({}, '', '#' + chapterName); // Adresszeile aktualisieren
  }
}

// goTo() via Navigations-Links auslösen
$('#Nav a').click(function(evt){
  evt.preventDefault();
  var chapterName = $(this).attr('href').substr(1);
  goTo(chapterName);
});

// goTo() beim Laden der Seite auslösen
$(window).load(function(){
  var start = window.location.hash.substr(1) || 'Mercury';
  goTo(start);
});


/*
 * Touch-Steuerung
 * ---------------
 */

// Dank Hammer.js ganz einfach
var touchRoot = Hammer(document);

touchRoot.on('swipeleft', function(){
  var nextChapterName = chapterNames[currentChapter + 1];
  goTo(nextChapterName);
});

touchRoot.on('swiperight', function(){
  var prevChapterName = chapterNames[currentChapter - 1];
  goTo(prevChapterName);
});