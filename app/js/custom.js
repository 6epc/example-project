//preloader
jQuery(window).load(function () {
  jQuery('#preloader').fadeOut('slow', function () {
    jQuery(this).remove();

  });
});

jQuery(document).ready(function ($) {

  /// light Gallery
  $(".photo_list").lightGallery({
    thumbnail: true,
    animateThumb: true
  });

  //delete comment item
  $(".comment_close").click(function () {
    $(this).closest('.comment_item').remove();
    return false;
  });

  //delete wall item
  $(".post_close").click(function () {
    $(this).closest('.wall_item ').remove();
    return false;
  });

  // top menu active state
  $('.top_menu > li a').click(function () {
    $('.top_menu > li').siblings().removeClass('active');
    $(this).closest(".top_menu > li").addClass('active');
  });

  // tooltip
  $('[data-toggle="tooltip"]').tooltip({
    title: "Обсуждают на форуме. Непрочитанных - 5 сообщений",
    html: true
  });

  //Check to see if the window is top if not then display button
  jQuery(window).scroll(function () {
    if (jQuery(this).scrollTop() > 400) {
      jQuery('.scrollToTop').fadeIn();
    } else {
      jQuery('.scrollToTop').fadeOut();
    }
  });

  // Click event to scroll to top
  jQuery('.scrollToTop').click(function () {
    jQuery('html, body').animate({ scrollTop: 0 }, 800);
    return false;
  });

});

//custom video play btn
function playPause(btn, vid) {
  var vid = document.getElementById(vid);
  if (vid.paused) {
    vid.play();
    btn.innerHTML = "<i class=\"fa fa-pause-circle\"></i>";
  } else {
    vid.pause();
    btn.innerHTML = "<i class = \"fa fa-play-circle\"> </i>";
  }
}