ace.require("ace/ext/language_tools");

let editor = ace.edit("editor"),
    beautify = ace.require("ace/ext/beautify");

// AutoComplete
editor.setOptions({
    enableBasicAutocompletion: true,
    enableSnippets: true,
    enableLiveAutocompletion: true
});


editor.setTheme("ace/theme/dreamweaver");
editor.session.setMode("ace/mode/csharp");
beautify.beautify(editor.session);

//
editor.getSession().setValue(
    `
using System;  

class Program {  
    public static void Main() {  
    
           
    }  
}  
   `
);





function changeMode() {
    // If the checkbox is checked, display the output text
    if (document.getElementById("switchMode").checked) {
        editor.setTheme("ace/theme/dreamweaver");
    } else {

        editor.setTheme("ace/theme/dracula");
    }
}


//Start Select Language

function selectLang() {
    let selectLang = document.getElementById("selectLang");
    if (selectLang.value == "c_cpp") {
        console.log("C++");
        editor.session.setMode("ace/mode/c_cpp");
        editor.getSession().setValue(
            `
#include <iostream>
using namespace std;

int main() 
{

    return 0;
}
        `
        );

    } else if (selectLang.value == "csharp") {
        console.log("c#")
        editor.session.setMode("ace/mode/csharp");



        editor.getSession().setValue(
            `
using System;  

class Program {  
    public static void Main() {  
             
                    
    }  
}  
            `
        );



    } else if (selectLang.value == "javascript") {
        console.log("js");

        editor.session.setMode("ace/mode/javascript");
        editor.getSession().setValue("");

    }
}
// End Select Language



// Start Run Code

function runCode() {
    let code = editor.getSession().getValue();
    console.log(code);

}


// Beatufy Code

function beautyCode() {
    beautify.beautify(editor.session);

}