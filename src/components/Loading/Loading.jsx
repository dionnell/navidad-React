import {PacmanLoader} from "react-spinners";

export const Loading = () => {
  return (
    <div className='max-w-[1800px] h-[480px] w-full m-auto py-8 px-4 relative group' >
        <PacmanLoader
            size={50}
            speedMultiplier={2}
            color="#D94FFF"
            className='mx-auto my-32'
        />
    </div>
  )
}
