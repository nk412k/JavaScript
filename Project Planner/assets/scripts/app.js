class Tooltip {}

class ProjectItem {
    constructor(id,updateProjectListsfunction){
        this.id=id;
        this.updateProjectListsHandler=updateProjectListsfunction;
        this.connectSwithButton();
    }

    connectSwithButton(){
        const projectItemElemnet=document.getElementById(this.id);
        const switchBtn=projectItemElemnet.querySelector('button:last-of-type')
        switchBtn.addEventListener('click',this.updateProjectListsHandler);
    }
    
}

class ProjectLists{
    projects=[];
    constructor(type){
        const prjItems=document.querySelectorAll(`#${type}-projects li`);
        for(const prjItem of prjItems){
            this.projects.push(new ProjectItem(prjItem.id,this.switchProject.bind(this)));
        }
        console.log(this.projects);
    }
    setSwitchHandlerFunction(switchHandlerFunction){
        this.switchHandler=switchHandlerFunction;
}

    addProject(){
        console.log(this);
    }
    switchProject(projectId){
        this.switchHandler(this.projects.find(p => p.id === projectId));
        this.projects=this.projects.filter(p => p!== projectId);
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