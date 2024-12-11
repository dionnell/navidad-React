import { useState } from "react"
import { CarrouselImagen, CarouselTailwind } from "../components/Carrousels"
import { PedirDeseo } from '../components/Regalo'
import { PlaylistMusic } from "../components/PlaylistMusic/PlaylistMusic"
import { Titulo } from "../components/Cabecera/Titulo"

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
      <Titulo/>
      <div className="gradient">
        <div className="grid gap-x-10  grid-cols-2 justify-items-center">
        <div className="p-11 ms-auto">
          <button 
            className="button border-2"
            onClick={onSwiper}
          >
            Carousel Swiper
            <div className="hoverEffect">
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
            <div className="hoverEffect">
              <div></div>
            </div>
          </button>
        </div>
        </div>
        {
          (carousel === 'Tailwind') ? <CarouselTailwind interval={2500}/>
          : <CarrouselImagen/>
        }

        <div className="grid gap-x-10  grid-cols-1 justify-items-center mb-5">
          <PedirDeseo/>
        </div>
        <div className="grid gap-x-10 gap-y-4 grid-cols-1 justify-items-center ">
          <PlaylistMusic/>
        </div>
      </div>
    </>
  )
}
