(function() {
    const arrowLeft = document.querySelector('.prev-button');
    const arrowRight = document.querySelector('.next-button');
    const slider = document.querySelector('.slider-row');
    const sliderContainer = document.querySelector('.slider-container');

    let currentPosition = 0;
    let totalWidth = 0;
    let maxScroll = 0;
    let step = 0;
    let isTransitioning = false;
    let initialized = false;

    function getClicksCount() {
        const w = window.innerWidth;
        if (w > 768) return 3;
        return 6;
    }

    function getPadding() {
        const w = window.innerWidth;
        if (w > 768) return 82;
        return 20;
    }

    function calculateDimensions() {
        const slides = Array.from(slider.children);
        if (slides.length === 0) return;

        totalWidth = 0;
        slides.forEach((slide, i) => {
            totalWidth += slide.offsetWidth;
            if (i < slides.length - 1) totalWidth += 20;
        });

        const containerW = sliderContainer.clientWidth;
        const pad = getPadding();
        const visible = containerW - pad * 2;
        
        maxScroll = Math.max(0, totalWidth - visible);
        
        const clicks = getClicksCount();
        step = clicks > 0 ? maxScroll / clicks : 0;
    }

    function updateSlider() {
        slider.style.transform = `translateX(${currentPosition}px)`;
        
        const atStart = currentPosition >= 0 || maxScroll <= 0;
        const atEnd = currentPosition <= -maxScroll || maxScroll <= 0;
        
        arrowLeft.disabled = atStart;
        arrowRight.disabled = atEnd;
    }

    function onRight() {
        if (isTransitioning || arrowRight.disabled) return;
        isTransitioning = true;
        
        let newPos = currentPosition - step;
        if (newPos < -maxScroll) newPos = -maxScroll;
        
        currentPosition = newPos;
        slider.style.transition = 'transform 0.5s ease-in-out';
        updateSlider();
        
        setTimeout(() => { isTransitioning = false; }, 500);
    }

    function onLeft() {
        if (isTransitioning || arrowLeft.disabled) return;
        isTransitioning = true;
        
        let newPos = currentPosition + step;
        if (newPos > 0) newPos = 0;
        
        currentPosition = newPos;
        slider.style.transition = 'transform 0.5s ease-in-out';
        updateSlider();
        
        setTimeout(() => { isTransitioning = false; }, 500);
    }

    function init() {
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                slider.style.transition = 'none';
                calculateDimensions();
                currentPosition = 0;
                updateSlider();
                
                setTimeout(() => {
                    slider.style.transition = 'transform 0.5s ease-in-out';
                    initialized = true;
                }, 100);
            });
        });
    }

    arrowRight.addEventListener('click', onRight);
    arrowLeft.addEventListener('click', onLeft);
    
    window.addEventListener('resize', () => {
        if (!initialized) return;
        slider.style.transition = 'none';
        currentPosition = 0;
        calculateDimensions();
        updateSlider();
        setTimeout(() => {
            slider.style.transition = 'transform 0.5s ease-in-out';
        }, 50);
    });

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    window.addEventListener('load', () => {
        slider.style.transition = 'none';
        calculateDimensions();
        currentPosition = 0;
        updateSlider();
        setTimeout(() => {
            slider.style.transition = 'transform 0.5s ease-in-out';
        }, 50);
    });
})();
