// Define showSlide function first
function showSlide(n, slides, totalSlides) {
    slides.removeClass('active-slide');
    const currentSlide = (n + totalSlides) % totalSlides;
    slides.eq(currentSlide).addClass('active-slide');
    return currentSlide;
}

$(document).ready(function() {
    let currentSlide = 0;
    const slides = $('.slide');
    const totalSlides = slides.length;

    // Add click handlers to thumbnails
    $('.thumbnail-list li').each(function(index) {
        $(this).click(function() {
            currentSlide = showSlide(index, slides, totalSlides);
        });
    });

    // Change slide
    window.changeSlide = function(direction) {
        currentSlide = showSlide(currentSlide + direction, slides, totalSlides);
    };

    // Keyboard navigation
    $(document).keydown(function(e) {
        if (e.key === 'ArrowLeft') {
            changeSlide(-1);
        } else if (e.key === 'ArrowRight') {
            changeSlide(1);
        }
    });

    // Show initial slide
    currentSlide = showSlide(0, slides, totalSlides);

    // Auto advance slides every 5 seconds
    setInterval(function() {
        currentSlide = showSlide(currentSlide + 1, slides, totalSlides);
    }, 5000);
});
