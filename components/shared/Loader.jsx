import Image from "next/image";

export default function Loader({loading}) {
  return (
    loading?
    <div className="d-flex flex-grow-1 align-items-center justify-content-center position-absolute" style={{zIndex: 10, top: 0, left: 0, width: '100%', height: '100%'}}>
      <Image src='/snake.svg' alt='Loading animation' width={50} height={50}></Image>  
      {/* <Image src='/fountain.svg' alt='Loading animation' width={150} height={30}></Image>   */}
    </div>
    :null
  );
}