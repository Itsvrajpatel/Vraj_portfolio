import { BrowserRouter } from 'react-router-dom';
import { About, Contact, Experience, Hero ,Navbar, Tech, Works, StarsCanvas, CompanySlider, Terminal  } from './components' 

const App = () => {
  return (
    <>
     <BrowserRouter>
     <div className="relative z-0 bg-primary">
      <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center'>
       <Navbar/>
       <Hero/>
      </div>
       <About/>
       <Experience/>
       <Tech/>
       <Works/>
       <CompanySlider/>
       <div className='relative z-0'>
        <Contact/>
        <StarsCanvas/>
        <Terminal />
       </div>
     </div>
     </BrowserRouter>
    </>
  )
}

export default App
