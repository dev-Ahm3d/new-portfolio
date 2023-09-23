import PanelForm from "@/components/panelForm/PanelForm"

const page = () => {
    return (
        <PanelForm 
            category="skills" 
            inputFields={[
                {name : 'title' , options : []} ,
                {name : 'priority' ,  type : 'number' ,options : []} , 
                {name : 'disabled' ,  type : 'checkbox' , options:[]} , 
            ]}  
            header="skills" 
            subHeader="skill"
            inputs={[
                {name:'title' , placeholder:'title'} ,
                {name:'priority' , type:'number' , placeholder:'priority'} ,
                {name : 'disabled' ,  type : 'checkbox'} , 
                {name:'image' , type : 'file'} , 
            ]}
            apiUrl="/skills"
        />
    )
}

export default page