import './page.css'
import CustomButton from '@/components/cutomButton/CustomButton'
import { apiBaseUrl } from '@/utils/callApi'
import 'animate.css'
import { redirect } from 'next/navigation'
const getInfo = async ()=>{
    try {
      const resp = await fetch(`${apiBaseUrl}/user`,{
          next : {
              revalidate : 30
          }
      })
      const data = await resp.json()
      return data.info
    } catch (error) {
        console.log(error)  
        //redirect('/error')
    }
}

export default async function Home() {
  const info = await getInfo()
  return (
    <div className="home-page animate__animated animate__slideInDown">
        <div className='first-half'></div>
        <div className='second-half'></div>
        <div className='home-content'>
          <div className='img-cont animate__animated' style={{backgroundImage:`url('${info?.image}')`}}></div>
          <div className='home-text animate__animated animate__fadeIn animate__slower'>
            <h1>I'm {info?.name}.</h1>
            <h2>{info?.title}</h2>
            <p>{info?.description}</p>
            <div className='cus-btn'> <CustomButton to='/about' text='more about me' page='home'/></div>
          </div>
        </div>
    </div>
  )
}



