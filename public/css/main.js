$(document).ready(function(){
  searchBars();
  $('#profile').hover(
    function(){
      $('#logOut').css('display' , 'inline');
  },function(){
      $('#logOut').css('display' , 'none');
  }
);

var leaveBool = 0;


  $('#searchForm').keypress(function (e) {
    if (e.which == 13) {
      searchBars();
    }
  });

  function searchBars(){
    $('.dineObj').remove();
    $.post( "/search", {searchLoc : $('#searchBar').val()} , function(bars){
      bars.forEach(function(bar){
        var cloneDine = $('#dineOrig').clone(true).appendTo('.dineListGroup').addClass('dineObj').css('display' , 'block');
        cloneDine.find('.dineName').text(bar.name);
        cloneDine.find('.dineQuote').text('"' + bar.snippet_text + '"');
        cloneDine.find('.dineImg').attr('src' , bar.image_url);
        $.post('/getBarModel',function(BarObjects){
          BarObjects.forEach(function(BarObject){
            if(cloneDine.find('.dineName').text() == BarObject.name){
              cloneDine.find('.going').text(BarObject.peepsGoing + ' Coming');
            }
          })
        });
      });
    });
  }

  $('.goingBtn').click(function(){
    var barName = $(this).parent().find('.dineName').text();
    var thisGoingBtn = $(this);
    $.post('/addPeep' , {barName : barName , leaveBool : leaveBool} , function(data){
        thisGoingBtn.text(data.peepsGoing + ' Coming');
    });
    leaveBool = 1;
    $(this).parent().find('.leave').css('display' , 'block');
    $('.goingBtn').css('pointer-events' , 'none');
  });

  $('.leave').click(function(){
    var barName = $(this).parent().find('.dineName').text();
    var thisGoingBtn = $(this).parent().find('.goingBtn');
    $.post('/addPeep' , {barName : barName , leaveBool : leaveBool} , function(data){
        thisGoingBtn.text(data.peepsGoing + ' Coming');
    });
    leaveBool = 0;
    $(this).parent().find('.leave').css('display' , 'none');
    $('.goingBtn').css('pointer-events' , 'all');
  })

  $('.goingBtnAuth').click(function(){
    $.post('/letsAuth' , {searchTerm : $('#searchBar').val()}, function(data){
      window.location.href = "/auth/google";
    });
});

});
