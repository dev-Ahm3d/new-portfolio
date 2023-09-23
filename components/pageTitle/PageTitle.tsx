import './PageTitle.css'
import 'animate.css'
type PageTitleProps = {
    word1 : string , 
    word2 : string , 
    word3 : string
}
const PageTitle = ({word1,word2,word3}:PageTitleProps) => {
    return (
        <div className='page-title-cont animate__animated animate__slideInDown'>
            <h1>{word1}</h1>
            <div className='about-me'>
                <span style={{color:"white" , paddingRight:'5px'}}>{word2}</span>
                <span style={{color:"var(--color2)"}}>{word3}</span>
            </div>
        </div>
    )
}

export default PageTitle

