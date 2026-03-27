import { BrowserRouter } from 'react-router-dom';
import { About, Contact, Experience, Hero ,Navbar, Tech, Works, StarsCanvas, CompanySlider, Terminal, Github  } from './components' 

const App = () => {
  return (
    <>
     <BrowserRouter>
     <div className="relative z-0 bg-primary">
      <div>
       <Navbar/>
       <Hero/>
      </div>
       <About/>
       <Experience/>
       <Tech/>
       <Works/>
       {/* <Github/> */}
       <CompanySlider/>
       <div className='relative z-0'>
        <Contact/>
        <StarsCanvas/>
       </div>
       <Terminal />
     </div>
     </BrowserRouter>
    </>
  )
}

export default App
