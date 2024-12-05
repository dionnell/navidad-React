import { useState } from "react"
import { CarrouselImagen, CarouselTailwind } from "../components/Carrousels"
import { PedirDeseo } from '../components/Regalo'

export const NavidadPage = () => {

  const [carousel, setCarousel] = useState('Tailwind')

  const onSwiper = () =>{
    setCarousel( 'Swiper' ); 
}
const onTailwind = () =>{
  setCarousel( 'Tailwind' ); 
}

  return (
    <>
      <div className="grid gap-x-10 gap-y-4 grid-cols-2 justify-items-center">
        <div className="p-11 ms-auto">
          <button 
            className="button border-2"
            onClick={onSwiper}
          >
            Carousel Swiper
            <div class="hoverEffect">
              <div></div>
            </div>
          </button>
        </div>
        <div className="p-11 me-auto">
          <button 
            className="button border-2"
            onClick={onTailwind}
          >
            Carousel Tailwind
            <div class="hoverEffect">
              <div></div>
            </div>
          </button>
        </div>
      </div>
      {
        (carousel === 'Tailwind') ? <CarouselTailwind interval={2500}/>
        : <CarrouselImagen/>
      }
      
      <PedirDeseo/>

    </>
  )
}
