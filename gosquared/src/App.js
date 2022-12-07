import './App.css';
import { useEffect, useState, useRef } from 'react'
import { Dashboard } from './components/Dashboard';


function App() {

  const api = 'http://localhost:3001'

  const [officeData, setOfficeData] = useState([])
  const [plantWateringDays, setPlantWateringDays] = useState(0)

  let interval = useRef()

  useEffect(() => {

    const fetchData = async () => {
      const result = await fetch(`${api}/office`)
      const resultJson = await result.json()
      setOfficeData(resultJson)
    }

    fetchData()

  }, [])


  if (officeData.length) {
    const dataTimer = () => {
      const countdownDate = new Date(officeData[0].plantWatering).getTime()

      interval = setInterval(() => {
        const now = new Date().getTime();
        const distance = countdownDate - now
        const days = Math.floor(distance / (1000 * 60 * 60 * 24))

        if (distance < 0) {
          clearInterval(interval)
        } else {
          setPlantWateringDays(days)
        }
      }, 1000)
    }
    dataTimer()
  }

  return (
    <div className="App">
      <Dashboard title='Office Dashboard'>
        {officeData.map((data, i) => (
          <div className='dashboard-content' key={i}>
            <section className='child-container'>
              <h2>{data.onlineVisitors}</h2>
              <h3>online visitors</h3>
            </section>
            <div className='child-container-2'>
              <section className='outside-temp box'>
                <h4>{data.outsideTemperature}°C</h4>
                <h3>outside</h3>
              </section>
              <section className='office-temp box'>
                <h4>{data.officeTemperature}°C</h4>
                <h3>office</h3>
              </section>
              <section className='plants box'>
                <h4>{plantWateringDays}</h4>
                <h3>until plant watering</h3>
              </section>
              <section className='drinks box'>
                <h4>{data.drinksInFridge}</h4>
                {data.drinksInFridge == 1
                  ? <h3>drink left</h3> : <h3>drinks left</h3>
                }
              </section>
            </div>
          </div>
        ))}
      </Dashboard>
    </div>
  );
}

export default App;
