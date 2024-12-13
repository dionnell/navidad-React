import { useEffect, useState } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { RxDotFilled, RxDot } from 'react-icons/rx';

export const CarouselTailwind = ({interval = 3000}) => {

    const slides = [
        {
            url: '/116.jpg',
        },
        {
            url: '/arbol.jpg',
        },
        {
            url: '/blonde-anime.jpg',
        },
        {
            url: '/nueva-york-navidad.jpg',
        },
        {
            url: '/santa.jpg',
        },
        {
            url: '/sternermarkt.jpg',
        }
    ]

    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
      const isFirstSlide = currentIndex === 0;
      const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
      setCurrentIndex(newIndex);
    };

    const nextSlide = () => {
      const isLastSlide = currentIndex === slides.length - 1;
      const newIndex = isLastSlide ? 0 : currentIndex + 1;
      setCurrentIndex(newIndex);
    };

    const goToSlide = (slideIndex) => {
      setCurrentIndex(slideIndex);
    };

    // UseEffect para el autoplay 
    useEffect(() => {
      const intervalId = setInterval(nextSlide, interval); // Cambia de imagen cada 'interval'
      return () => clearInterval(intervalId); // Limpiar el intervalo al desmontar el componente
    }, [nextSlide]);

  return (
    <div className='GlassmorphismCarrousel'>
        <h1 className='text-center text-3xl font-semibold font-sans py-3'> Carousel Tailwind </h1>
        <div 
            className='max-w-[1800px] h-[480px] w-full m-auto py-8 px-4 relative group'
        >
            <div
                style={{backgroundImage: `url(${slides[currentIndex].url})`}}
                className="w-full h-full rounded-2xl bg-center bg-cover duration-500"
            ></div>

            {/* Left Arrow */}
            <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
              <BsChevronCompactLeft onClick={prevSlide} size={30} />
            </div>

            {/* Right Arrow */}
            <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
              <BsChevronCompactRight onClick={nextSlide} size={30} />
            </div>

            {/* Dots */}
            <div className='mx-auto  w-48 flex top-4 justify-center py-1 translate-y-[-100%] GlassmorphismDots'>
              {slides.map((slide, slideIndex) => (
                    (slideIndex === currentIndex ) ? 
                        <div
                            key={slideIndex}
                            onClick={() => goToSlide(slideIndex)}
                            className='text-2xl cursor-pointer translate-y-[-5%]'
                        >
                            <RxDot size={20}/>
                        </div> 
                    :
                        <div
                          key={slideIndex}
                          onClick={() => goToSlide(slideIndex)}
                          className='text-2xl cursor-pointer '
                        >
                          <RxDotFilled size={20}/>
                        </div>
              ))}
            </div>

        </div>
        
    </div>
  )
}
