let result=0;
let logEntries=[];

function userEnteredNumber() {
	return parseInt(userInput.value);
}

function output(operator,initialresult,calcnumber){
	const resultDescription=`${initialresult} ${operator} ${calcnumber}`;
	outputResult(result,resultDescription);
}

function writeToLog(operation,initialresult,calcnumber) {
	const entry={
		number:calcnumber,
		operation:operation,
		previousResult:initialresult,
		newResult:result,
	};
	logEntries.push(entry);
	console.log(logEntries);
}
function calculateResult(operationName){
	const enterednumber=userEnteredNumber();
	const initialresult=result;
	let operator;
	if(operationName=='ADD'){
		result+=enterednumber;
		operator='+';
	}
	else if(operationName=='DIVIDE'){
		result/=enterednumber;
		operator='/';
	}
	else if(operationName=='SUBTRACT'){
		result-=enterednumber;
		operator='-';
	}
	else if(operationName=='MULTIPLY'){
		result*=enterednumber;
		operator='*'
	}

	output(operator,initialresult,enterednumber);
	//userInput.value='';
	writeToLog(operationName,initialresult,enterednumber);
}

/*function add(){
	calculateResult("ADD");
}

function subtract(){
	calculateResult("SUBTRACT");
}

function multiply(){
	calculateResult("MULTIPLY");
}

function divide(){
	calculateResult("DIVIDE");
}
*/
addBtn.addEventListener('click',calculateResult.bind(this,'ADD'));
subtractBtn.addEventListener('click',calculateResult.bind(this,'SUBTRACT'));
multiplyBtn.addEventListener('click',calculateResult.bind(this,'MULTIPLY'));
divideBtn.addEventListener('click',calculateResult.bind(this,'DIVIDE'));

