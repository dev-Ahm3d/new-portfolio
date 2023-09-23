import PanelForm from '@/components/panelForm/PanelForm'
import './Ach.css'
const page = () => {
    return (
        <PanelForm
            category="achievements" 
            inputFields={[
                {name : 'position' , options : []} ,
                {name : 'company', options : []} , 
                {name : 'period' , options : []} ,
                {name : 'description' , options : []} , 
                {name : 'disabled' ,  type:'checkbox' , options:[]} , 
            ]}  
            header="achievements" 
            subHeader="achievement"
            inputs={[
                {name:'position' , placeholder:'position'} ,
                {name:'company' , placeholder:'company'} ,
                {name : 'period' ,  placeholder:'period'} , 
                {name : 'description' ,  placeholder:'description'} , 
                {name : 'disabled' ,  type:'checkbox'} , 
            ]}
            apiUrl="/ach"
        />
    )
}

export default page