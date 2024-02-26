const keys = document.querySelectorAll('.key');
const disp_input = document.querySelector('.display .input');
const disp_output = document.querySelector('.display .output');
let records=[];

let input = "";

for (let key of keys) {
	const value = key.dataset.key;

	key.addEventListener('click', () => {
		if (value == "clear") {
			input = "";
			disp_input.innerHTML = "";
			disp_output.innerHTML = "";
		} else if (value == "backspace") {
			input = input.slice(0, -1);
			disp_input.innerHTML = Input(input);
		} else if (value == "=") {
			let result = eval(inchange(input));

			disp_output.innerHTML =Output(result);
			storeHistory(input, result);
		} 
		else if (value == "1/x") {
			calculatebyx();
		}
		else if (value == "sqaure") {
			Square(input);
		}
		else if (value == "root") {
			Root();
		}
		else if (value == "sign") {
			Sign();
		}
		else if (value == "history") {
			showHistory();
		}
			
		else {
			if(inputval(value))
			{
				input += value;
				disp_input.innerHTML = Input(input);
			}
			}
	})
}

function Input(input)
{
	let input_array=input.split("");
	let input_array_lenght=input_array.length;

	for(let i=0;i<input_array_lenght;i++)
	{
		if(input_array[i]=="*")
		{
			input_array[i]=`<span class="operator">x</span>`;
		}
		else if(input_array[i]=="+")
		{
			input_array[i]=`<span class="operator">+</span>`;
		}
		else if(input_array[i]=="-")
		{
			input_array[i]=`<span class="operator">-</span>`;
		}
		else if(input_array[i]=="÷")
		{
			input_array[i]=`<span class="operator">÷</span>`;
		}
		else if(input_array[i]=="%")
		{
			input_array[i]=`<span class="operator">%</span>`;
		}
		
	}
	return input_array.join("");
}

function Output(output)
{
	let output_string=output.toString();
	let decimal=output_string.split(".")[1];
	output_string=output_string.split(".")[0];

	let output_array=output_string.split("");

	if(output_array.length>3)
	{
		for(let i=output_array.length-3;i>0;i-=3)
		{
			output_array.splice(i,0,",");
		}
	}
	if(decimal)
	{
		output_array.push(".");
		output_array.push(decimal);
	}
	return output_array.join("");
}
function inputval(value)
{
	let last_in=input.slice(-1);
	let op=["+","*","-","÷","%"]
	if(value=="." && last_in==".")
	{
		return false;
	}

	if(op.includes(value))
	{
		if(op.includes(last_in))
		{
			return false;
		}
		else{
			return true
		}
	}
	return true;
}
function inchange(input)
{
	let input_array=input.split("")
	for (let i=0;i<input_array.length;i++)
	{
		if(input_array[i]=="%")
		{
			input_array[i]="/100"
		}
	}
	return input_array.join("");
}
function Square(input) {
	const value = parseFloat(input);
	const output= value * value;
	disp_input.innerHTML = Output(output);
	disp_output.innerHTML = Output(output);
	storeHistory(`square(${value})`, input);
  }

  function storeHistory(input, output) {
    records.push({ input: input, output: output });
}

// Function to display the history
function showHistory() {
    if (records.length === 0) {
        alert("No history found.");
    } else {
        let historyString = "History:\n";
        records.forEach((record, index) => {
            historyString += `Operation ${index + 1}: ${record.input} = ${record.output}\n`;
        });
        alert(historyString);
    }
}