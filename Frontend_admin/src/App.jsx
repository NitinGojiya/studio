import './App.css';
import Sidebar from './layout/Sidebar/Sidebar';
import Content from './layout/Content/Content';

function App() {


  const admin = localStorage.getItem("adminlogin")
  if(admin.match("false"))
  {
    window.location.href="http://localhost:3000/"

  }
  return (

    <>
      


       
        <div className='app'>
          <Sidebar  />
          <Content />
        </div>
      
      
    </>
  )
}

export default App
