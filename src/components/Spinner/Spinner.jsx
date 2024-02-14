import { InfinitySpin 
} from  'react-loader-spinner'


export default function Spinner() {
  return (
    <div    style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}>
      <InfinitySpin 

    height = "280"
    width = "280"
    radius = "129"
    color = '#2784F3  '
    ariaLabel = 'three-dots-loading'     
    wrapperStyle
    wrapperClass
  />
    </div>
  )
}