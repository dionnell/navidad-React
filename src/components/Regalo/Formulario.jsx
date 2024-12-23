import { useRef } from "react";
import { useForm } from '../../hooks/useForm'
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2'
import { IoGiftOutline } from "react-icons/io5";
import { FaMicrophoneSlash, FaMicrophoneAlt } from "react-icons/fa";


export const Formulario = () => {
  const form = useRef();

  const onStartListening = () => SpeechRecognition.startListening({ continuous: true, language: 'es-ES' });
  const { transcript, listening, browserSupportsSpeechRecognition } = useSpeechRecognition();

  const formdata = {
    name: '',
    regalo: '',
    Nombre2: '',
    correo: ''
  }
  const { name, regalo, Nombre2, correo, onInputChange } = useForm(formdata)

 
  const sendEmail = (e) => {
    e.preventDefault();
 
    emailjs
      .sendForm(import.meta.env.VITE_SERVICE_ID, import.meta.env.VITE_TEMPLATE_ID, form.current, {
        publicKey: import.meta.env.VITE_PUBLIC_KEY,
      })
      .then(
        () => {
          Swal.fire({
            title: "Correo Enviado con la peticion de regalo",
            text: 'El correo puede llegar a la carpeta de Spam!!',
            width: 500,
            padding: "3em",
            color: "#716add",
            background: "#fff url(/trees.png)",
            backdrop: `
              rgba(0,0,123,0.4)
              url("/nyan-cat.gif")
              left top
              no-repeat
            `,
            preConfirm: () => {
              window.location.reload(false);
            },
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
      <div className="formulario p-5 rounded-3xl font-medium"> 
          <form
            id="contact_form"
            ref={form}
            onSubmit={sendEmail} 
            className=" py-3 px-3 bg-white rounded-xl GlassmorphismForm"
          >
            <div className="grid gap-x-10 gap-y-4 grid-cols-1 justify-items-center mb-5">
              <div className=" me-auto ms-auto ">
                <h1 className="text-3xl font-bold text-gray-700 max-md:text-4xl">Formulario</h1>
              </div>
            </div>
            <p className="text-base mt-3 text-gray-700 max-md:text-2xl">*Rellene los datos para pedir Regalo</p>

            <div className="mb-5 text-gray-700 grid">
              <label className="mb-2 text-gray-900 max-md:text-3xl">Tu nombre</label>
              <input 
                type="text" 
                name="name"
                className="bg-white h-10 w-auto rounded-lg text-gray-700 placeholder-transparent ring-2 px-2 ring-gray-500 focus:ring-indigo-500 focus:outline-none focus:border-indigo-500" 
                placeholder="Paquita la del barrio" 
                onChange={onInputChange}
                required />
            </div>

            <div className="mb-5 text-gray-700 grid">
              {
                (!browserSupportsSpeechRecognition) ? 
                <>
                  <label className="block mb-2  text-gray-900 max-md:text-3xl">Regalo Deseado</label>
                  <textarea 
                    type="text" 
                    name="regalo"
                    className="bg-white h-40 w-auto rounded-lg text-gray-700 placeholder-transparent ring-2 px-2 ring-gray-500 focus:ring-indigo-500 focus:outline-none focus:border-indigo-500" 
                    placeholder="Quiero Un helicoptero de regalo" 
                    onChange={onInputChange}
                    required />
                </> :
                <>
                <div className="grid grid-cols-[130px_minmax(00px,_1fr)_100px]">
                  <label className="block mb-2 w-[130px] text-gray-900 max-md:text-3xl">Regalo Deseado</label>
                    {
                      (listening) ? <div className="mr-auto w-[23px] h-[23px] " onClick={SpeechRecognition.stopListening}> <FaMicrophoneSlash className="w-[20px] h-[20px] rounded-full border-3  hover:text-red-700 hover:border-red-700"/> </div>
                      : <div className="mr-auto w-[23px] h-[23px] " onClick={onStartListening}> <FaMicrophoneAlt className="w-[20px] h-[20px] rounded-full border-3  hover:text-red-700 hover:border-red-700"/> </div>
                    }
                </div>
                <textarea 
                  type="text" 
                  name="regalo"
                  className="bg-white h-40 w-auto rounded-lg text-gray-700 placeholder-transparent ring-2 px-2 ring-gray-500 focus:ring-indigo-500 focus:outline-none focus:border-indigo-500" 
                  placeholder="Quiero Un helicoptero de regalo" 
                  value={ regalo || transcript } 
                  onChange={onInputChange}
                  required />
              </>
              }
              
            </div>

            <div className="mb-5 text-gray-700 grid ">
              <label  className="block mb-2 text-gray-900 text-wrap max-md:text-4xl">
                Nombre y Correo de la persona que desea que le de el regalo
              </label>
              <div className="bg-white my-4 rounded-lg w-[295px]">
                <div className="relative bg-inherit">
                  <input type="text" id="username" name="Nombre2" className="peer bg-transparent h-[25px] w-[295px] rounded-lg text-gray-700 placeholder-transparent ring-2 px-2 ring-gray-500 focus:ring-indigo-500 focus:outline-none focus:border-indigo-500" placeholder="Nombre" onChange={onInputChange} required/>
                  <label for="username" className="absolute cursor-text left-0 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all max-md:text-3xl">Nombre</label>
                </div>
              </div>

              <div className="bg-white my-4 rounded-lg w-[295px]">
                <div className="relative bg-inherit ">
                  <input type="correo" id="correo" name="correo" className="peer bg-transparent h-[25px] w-[295px] rounded-lg text-gray-700 placeholder-transparent ring-2 px-2 ring-gray-500 focus:ring-indigo-500 focus:outline-none focus:border-indigo-500 " placeholder="correo" onChange={onInputChange} required/>
                  <label for="correo" className="absolute cursor-text left-0 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all max-md:text-3xl">correo</label>
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
