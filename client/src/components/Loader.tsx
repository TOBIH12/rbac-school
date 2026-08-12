import { ThreeDots } from 'react-loader-spinner'

const Loader = () => {
  return (
    <div>
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="#0d1d3b"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
      <p className='loader-text'>Loading...</p>
      
    </div>
  )
}

export default Loader;