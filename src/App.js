import React, {useState} from 'react'
import axios from 'axios'

// Importing SVGs
import arrowDown from './assets/svg/Arrow - Down Square.svg'
import search from './assets/svg/Search.svg'
import hum from './assets/svg/hum.svg'
import windy from './assets/svg/windy.svg'

// Importing Images
import bg1 from './assets/images/bg1.png'
import bg2 from './assets/images/bg2.png'
import bg3 from './assets/images/bg3.png'


function App() {

  const [ data,setData ] = useState( {} )
  const [ location, setLocation ] = useState('')

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=46a94e4ca1c3130f589d617def38bd54`
  
  // for button; to search for data
  const searchLocation = (event) => {
    if ( event.key === 'Enter') {
      axios.get(url).then( (response) => {
        setData(response.data)
        console.log(response.data)
      } )
      setLocation('')
    } 
    
  } 

  const searchLocClick = (event) => {
    axios.get(url).then( (response) => {
        setData(response.data)
        console.log(response.data)
      } )
      setLocation('')
    
  } 

  return (
    <div className="App">

    <section className="header section">
        <div className="header__wrapper">
            <div className="header__content">
                <h1 className="header-title">savvy weather</h1>
            </div>
            <div className="header-scroll">
                <a href="#main">
                    <img src={arrowDown} alt="icon" />
                </a>
            </div>
        </div>
    </section>



    <section className="main section" id="main">
        <div className="main__wrapper">
            <div className="main__content">
                <div className="main-headline">
                    <p>start discover the weather... <br></br> around the world.</p> 
                </div>
                <div className="main-btn">
                    <a href="#detail">GET STARTED</a>
                </div>
            </div>
        </div>
    </section>



    <section className="detail section" id="detail">
        <div className="detail__wrapper">

            <div className="detail__search">
                <input className="text" value={location} onChange={event => setLocation( event.target.value )} onKeyPress={ searchLocation } name="search" 
                placeholder="Enter your location..."/>

                <button className="submit" onClick={ searchLocClick }> <img src={search} alt="" /> </button>
            </div>

            {data.name !== undefined &&
              <div className="detail__content">
              <div className="content__header">
                  <p className="title">Weather in {data.name}</p>
                  {data.weather ? <div className="icon"> <img src={`https://openweathermap.org/img/wn/` + data.weather[0].icon + "@2x.png"} alt="" /> </div> : null}
              </div>
              <div className="content__body">
                  {data.main ? <p className="degree"> {data.main.temp.toFixed()} °C</p> : null}
                  {data.weather ? <p className="description"> {data.weather[0].main} </p> : null}
                  
              </div>
              <div className="content__footer">
                  <div className="details">
                      <div className="details-name">
                          <img className="icon" src={windy} alt=""/>
                          <p className='text'>Wind</p>
                      </div>
                      <div className="details-get">
                          {data.wind ? <p className="text"> {data.wind.speed} MPH </p> : null }
                      </div>
                  </div>
                  <div className="details">
                      <div className="details-name">
                          <img className="icon" src={hum} alt=""/>
                          <p className="text">Humidity</p>
                      </div>
                      <div className="details-get">
                          {data.main ? <p className="text"> {data.main.humidity} % </p> : null }
                      </div>
                  </div>
                </div>
                </div>
            }

            

            <div className="detail__footer">
                <p>savvy weather</p>
            </div>


        </div>
    </section>

    </div>
  );
}

export default App;