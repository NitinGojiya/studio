import { useEffect, useState } from 'react';
import { personsImgs } from '../../utils/images';
import { navigationLinks } from '../../data/data';
import "./Sidebar.css";
import { useContext } from 'react';
import { SidebarContext } from '../../context/sidebarContext';
import logouti from '../../assets/icons/logout.svg'
const Sidebar = () => {

  const [activeLinkIdx] = useState(1);
  const [sidebarClass, setSidebarClass] = useState("");
  const { isSidebarOpen } = useContext(SidebarContext);

  useEffect(() => {
    if(isSidebarOpen){
      setSidebarClass('sidebar-change');
    } else {
      setSidebarClass('');
    }
  }, [isSidebarOpen]);
const logout=()=>{
  localStorage.setItem("adminlogin","false")
  localStorage.setItem("admin",null)
}
const [studio,setStudio]=useState();
const userId=localStorage.getItem("admin")
 useEffect(() => {
        fetch(`http://localhost:8080/api/studio/fetchstudio1/${userId}`)
            .then((res) => res.json())
            .then((data) => {
                setStudio(data)
                
                 console.log(data)

            })
            .catch((err) => {
                console.error("fetch in error", err);
            })

    }, []);
  return (
    <div className={ `sidebar ${sidebarClass}` }>
      <div className="user-info">
          <div className="info-img img-fit-cover">
              <img src={`http://localhost:8080${studio?.imageUrl}`} alt="profile image" />
          </div>
          <span className="info-name">{studio?.name}</span>
      </div>

      <nav className="navigation">
          <ul className="nav-list">
            {
              navigationLinks.map((navigationLink) => (
                <li className="nav-item" key = { navigationLink.id }>
                  <a href={navigationLink.title} className={ `nav-link ${ navigationLink.id === activeLinkIdx ? 'active' : null }` }>
                      <img src={ navigationLink.image } className="nav-link-icon" alt = { navigationLink.title } />
                      <span className="nav-link-text">{ navigationLink.title }</span>
                  </a>
                </li>
              ))
            }
            <li className="nav-item">
            <a  className='nav-link' href='/' onClick={logout}>
                      <img src={logouti} className="nav-link-icon" alt ="logout" />
                      <span className="nav-link-text">Logout</span>
                  </a>
            </li>
          </ul>
      </nav>
    </div>
  )
}

export default Sidebar
