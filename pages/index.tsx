import Image from "next/image";
import Todo from "./component/Todo";
import header from "./component/header";
import Header from "./component/header";


export default function Home(){
  return(
    <div>
      <Header/>
      <Todo/>

    </div>
  );   
}
