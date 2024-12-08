import { useRef } from "react";
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";
import { IoGiftOutline } from "react-icons/io5";


export const Formulario = () => {
  const form = useRef();
  const navigate = useNavigate()

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_csypx9q', 'template_9cqco3p', form.current, {
        publicKey: 'fBNMi6BmPfdO7NNJN',
      })
      .then(
        () => {
          Swal.fire({
            title: "Correo Enviado con la peticion de regalo",
            width: 500,
            padding: "3em",
            color: "#716add",
            background: "#fff url(/trees.png)",
            backdrop: `
              rgba(0,0,123,0.4)
              url("/nyan-cat.gif")
              left top
              no-repeat
            `
          })
          navigate('/navidad',{
            replace: true
          })

        },
        (error) => {
          Swal.fire({
            icon: "error",
            title: "Hubo un Error",
            text: "No se pudo enviar el correo",
          });
        },
      );
  };

  return (
    <>
      <div className="formulario p-5 rounded-3xl">
          <form
            ref={form}
            onSubmit={sendEmail} 
            className=" py-3 px-3 bg-white rounded-xl GlassmorphismForm"
          >
            <div className="grid gap-x-10 gap-y-4 grid-cols-1 justify-items-center mb-5">
              <div className=" me-auto ms-auto ">
                <h1 className="text-3xl font-bold text-gray-700">Formulario</h1>
              </div>
            </div>
            <p className="text-base mt-3 text-gray-700">*Rellene los datos para pedir Regalo</p>

            <div className="mb-5 text-gray-700 grid">
              <label className="mb-2 text-gray-900 ">Tu nombre</label>
              <input 
                type="text" 
                name="name"
                className="bg-white h-10 w-auto rounded-lg text-gray-700 placeholder-transparent ring-2 px-2 ring-gray-500 focus:ring-indigo-500 focus:outline-none focus:border-indigo-500" 
                placeholder="Paquita la del barrio" 
                required />
            </div>

            <div className="mb-5 text-gray-700 grid">
              <label className="block mb-2  text-gray-900 ">Regalo Deseado</label>
              <textarea 
                type="text" 
                name="regalo"
                className="bg-white h-40 w-auto rounded-lg text-gray-700 placeholder-transparent ring-2 px-2 ring-gray-500 focus:ring-indigo-500 focus:outline-none focus:border-indigo-500" 
                placeholder="Quiero Un helicoptero de regalo" 
                required />
            </div>

            <div className="mb-5 text-gray-700 grid ">
              <label  className="block mb-2 text-gray-900 text-wrap">
                Nombre y Correo de la persona que desea que le de el regalo
              </label>
              <div class="bg-white my-4 rounded-lg w-[295px]">
                <div class="relative bg-inherit">
                  <input type="text" id="username" name="Nombre2" className="peer bg-transparent h-[25px] w-[295px] rounded-lg text-gray-700 placeholder-transparent ring-2 px-2 ring-gray-500 focus:ring-indigo-500 focus:outline-none focus:border-indigo-500" placeholder="Nombre"/>
                  <label for="username" className="absolute cursor-text left-0 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all">Nombre</label>
                </div>
              </div>

              <div class="bg-white my-4 rounded-lg w-[295px]">
                <div class="relative bg-inherit ">
                  <input type="correo" id="correo" name="correo" className="peer bg-transparent h-[25px] w-[295px] rounded-lg text-gray-700 placeholder-transparent ring-2 px-2 ring-gray-500 focus:ring-indigo-500 focus:outline-none focus:border-indigo-500" placeholder="correo"/>
                  <label for="correo" className="absolute cursor-text left-0 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all">correo</label>
                </div>
              </div>

            </div>

            <div className="grid gap-x-10 gap-y-4 grid-cols-1 justify-items-center mb-5">
              <div className=" me-auto ms-auto ">
                <button 
                  type="submit" 
                  className="botonModal"
                >
                  <IoGiftOutline className="spanModal" />
                  <span className="spanModal">Pedir Regalo</span>  
                  <IoGiftOutline className="spanModal" />
                </button>
              </div>
            </div>

          </form>
      </div>
    </>
  )
}
