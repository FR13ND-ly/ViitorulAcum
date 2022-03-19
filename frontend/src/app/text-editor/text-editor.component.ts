import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss']
})
export class TextEditorComponent implements OnInit {

  @Input() text: any

  @Output()
  textChange = new EventEmitter<string>();
  constructor(private domSanitizer: DomSanitizer) { }
  content : any =''
  code = false
  textEditor : any
  ngOnInit(){
    setTimeout(() => {
      this.textEditor = document.getElementById('text-editor')
      this.content = this.domSanitizer.bypassSecurityTrustHtml(this.text)
    }, 500)
  }

  format(style : any, value : any = '') {
    document.execCommand(style, false, value);
    this.textEditor.focus()
  }

  onChangeCode() {
    this.code = !this.code
    this.content = this.domSanitizer.bypassSecurityTrustHtml(this.text)
  }
}
