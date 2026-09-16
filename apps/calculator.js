const display = document.getElementById('display');

function appendtodisplay(input) {
    if (display.value.includes('Error')) { 
    display.value = display.value.replace('Error', ''); 
    }
    if (display.value.includes('undefined')) { 
    display.value = display.value.replace('undefined', ''); 
    }
    display.style.color = '#1cd880';
    display.value += input;
}
function calculate() { 
    if (display.value === 'Error') {
        display.style.color = '#1cd880';
        display.value = '';
    }
    try {   
    display.style.color = '#1cd880';
    display.value = eval(display.value);
    } catch (error) {
        display.style.color = 'red';
        display.value = 'Error';
    }
}
function clearDisplay() {
    display.style.color = '#1cd880';
    display.value = '';
}
