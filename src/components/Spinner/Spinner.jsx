import { Puff } from 'react-loader-spinner';

export default function Spinner() {
  return (
    <div style={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    }}>
      <Puff
        color="green"
        height={80}
        width={80}
        timeout={3000} // Specify a timeout in milliseconds (e.g., 3000 for 3 seconds)
      />
    </div>
  );
}