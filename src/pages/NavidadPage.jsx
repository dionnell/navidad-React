import { useEffect, useState } from "react"
import { CarrouselImagen, CarouselTailwind } from "../components/Carrousels"
import { PedirDeseo } from '../components/Regalo'
import { PlaylistMusic } from "../components/PlaylistMusic/PlaylistMusic"
import { Titulo } from "../components/Cabecera/Titulo"
import { Loading } from "../components/Loading/Loading"

export const NavidadPage = () => {

  const [carousel, setCarousel] = useState('Tailwind')
  const [isLoading, setIsLoading] = useState(true);

  const LoadingChange = () => {
    setIsLoading(false)
  }

  useEffect(() => {
        const intervalId = setInterval(LoadingChange, 200); // Cambia de imagen cada 'interval'
        return () => clearInterval(intervalId); // Limpiar el intervalo al desmontar el componente
      }, []);

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
        <div className="grid gap-x-8  grid-cols-2 justify-items-center">
        <div className=" py-11 ms-auto mr-2">
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
        <div className=" py-11 me-auto ml-2">
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
          (isLoading === true) ? <Loading/>
          : (carousel === 'Tailwind') ? <CarouselTailwind interval={2500}/>
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
