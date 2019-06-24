import { Component, OnInit } from '@angular/core';
import { MonocaService } from './monoca.service';

@Component({
  selector: 'app-monoca',
  templateUrl: './monoca.component.html',
  styleUrls: ['./monoca.component.css']
})
export class MonocaComponent implements OnInit {
  output = {data: ''};

  lang= "javascript";
  theme= 'hc-black';

  editorOptions = {
    theme: this.theme,
    language: this.lang
  };
  code= 'function x() {\nconsole.log("Hello world!");\n}';

  constructor(private monocaService: MonocaService) { }

  ngOnInit() {
    console.log('in editor ');
  }


// Select Lang
selectLang(lang: string) {
  this.lang = lang;
  if (lang == 'csharp') {
    this.editorOptions.language = "csharp";

    this.code =  `
    using System;

    class Program {
        public static void Main() {


        }
    }
       `;

  } else if (lang == 'javascript') {
    this.lang ='javascript';
    this.code = `
    function x() {
      console.log("Hello world!");
  }`;
  } else if (lang == 'c_cpp') {
    this.lang = "cpp";

    this.code = `
    #include <iostream>
    using namespace std;

    int main()
    {

        return 0;
    }
            `  ;
  }

  this.editorOptions = {
    theme: this.theme,
    language: this.lang};



}



  // Change Mode
  changeMode(checked: boolean) {
    if (checked) {

      this.theme = 'hc-black';
    } else {
      this.theme = 'vs';


    }

    this.editorOptions = {
      theme: this.theme,
      language: this.lang
    };
  }


  // RunCode
  runCode() {
    console.log(this.code, ' ', this.lang );
    this.monocaService.runCode(this.code, this.lang).subscribe(

      (data) => {console.log('sucess: ', data);
            // this.output.data = data.data;
          },
      (error) => {console.log('Error'); },
    ); // Service Code
  }
}

