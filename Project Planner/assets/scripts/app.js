class Tooltip {
    constructor(closeNotifierFunc){
        this.closeNotifier=closeNotifierFunc;
    }
    clooseTooltip = () => {
        this.detach();
        this.closeNotifier();
    }
    detach(){
        this.element.remove();
    }
    attach(){
        const newElement=document.createElement('div')
        newElement.className='card';
        newElement.textContent='Dummy';
        newElement.addEventListener('click',this.clooseTooltip)
        this.element=newElement;
        document.body.append(newElement);
    }
}

class ProjectItem {
    hasActiveTooltip=false;
    constructor(id,updateProjectListsfunction,type){
        this.id=id;
        this.updateProjectListsHandler=updateProjectListsfunction;
        this.connectSwithButton(type);
        this.connectMoreInfo();
    }
    showMoreInfoHandler(){
        if(this.hasActiveTooltip){
            return;
        }
        const tooltip=new Tooltip(() =>{
            this.hasActiveTooltip=false;
        });
        tooltip.attach();
        this.hasActiveTooltip=true;
    }

    connectMoreInfo(){
        const projectItemElemnet=document.getElementById(this.id);
        const moreinfoBtn=projectItemElemnet.querySelector('button:first-of-type');
        moreinfoBtn.addEventListener('click',this.showMoreInfoHandler);
    }

    connectSwithButton(type){
        const projectItemElemnet=document.getElementById(this.id);
        const switchBtn=projectItemElemnet.querySelector('button:last-of-type');
        switchBtn.textContent= type==='active'?'Finish':'Activate';
        switchBtn.addEventListener('click',this.updateProjectListsHandler.bind(null,this.id));
        switchBtn.removeEventListener('click',this.updateProjectListsHandler.bind(null,this.id));
    }

    update(updateProjectListfunc,type){
        this.updateProjectListsHandler=updateProjectListfunc;
        this.connectSwithButton(type);
    }
    
}

class ProjectLists{
    projects=[];
    constructor(type){
        this.type=type;
        const prjItems=document.querySelectorAll(`#${type}-projects li`);
        for(const prjItem of prjItems){
            this.projects.push(new ProjectItem(prjItem.id,this.switchProject.bind(this),this.type));
        }
        console.log(this.projects);
    }
    setSwitchHandlerFunction(switchHandlerFunction){
        this.switchHandler=switchHandlerFunction;
}

    addProject(project){
        this.projects.push(project);
        DOMHelper.moveElement(project.id,`#${this.type}-projects ul`);
        project.update(this.switchProject.bind(this),this.type)  

    }
    switchProject(projectId){
        this.switchHandler(this.projects.find(p => p.id === projectId));
        this.projects=this.projects.filter(p => p!== projectId);
    }
}

class DOMHelper{
    static moveElement(projectId,newDestination){
        const element=document.getElementById(projectId);
        const destination=document.querySelector(newDestination);
        destination.append(element);
    }
}

class App {
    static init(){
        const activeProjectList=new ProjectLists('active');
        const finishedProjectList=new ProjectLists('finished');
        activeProjectList.setSwitchHandlerFunction(finishedProjectList.addProject.bind(finishedProjectList));
        finishedProjectList.setSwitchHandlerFunction(activeProjectList.addProject.bind(activeProjectList));
    }
}

App.init();