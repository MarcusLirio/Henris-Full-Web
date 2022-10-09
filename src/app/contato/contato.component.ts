import { Component, OnInit, AfterViewInit, ElementRef, ViewChildren} from '@angular/core';
import { ContatoModel } from './contato.model';
import { ContatoService } from './contato.service';
import { FormGroup, FormBuilder, Validators, FormControl, FormControlName } from '@angular/forms';
import { ValidationMessages, GenericValidator, DisplayMessage } from './generic-form-validation';
import { Observable,fromEvent, merge } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'spa-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit, AfterViewInit {
  cadastroForm!: FormGroup;
  formResult: string = '';
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements!: ElementRef[];
  
  validationMessages: ValidationMessages;
  genericValidator: GenericValidator;
  displayMessage: DisplayMessage = {};
  contato: ContatoModel = new ContatoModel();
  contatos:  Array<any> = new Array();
  constructor(private contatoServices: ContatoService, private fb: FormBuilder) { 
        this.validationMessages = {
      nome: {
        required: 'O Nome é requerido',
        minlength: 'O Nome precisa ter no mínimo 2 caracteres',
        maxlength: 'O Nome precisa ter no máximo 150 caracteres'
      },
      sobrenome: {
        required: 'Informe seu sobrenome',
      },
      email: {
        required: 'Informe o e-mail',
        email: 'Email inválido'
      },
      telefone: {
        required: 'Informe seu telefone',
        telefone:'formato de telefone inválido'
      }
    };

    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    this.cadastroForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      sobrenome: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  ngAfterViewInit(): void {
    let controlBlurs: Observable<any>[] = this.formInputElements
    .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(() => {
      this.displayMessage = this.genericValidator.processarMensagens(this.cadastroForm);
    });
  }

  Cadastrar(){
    if(this.cadastroForm.dirty && this.cadastroForm.valid){
      this.contatoServices.CadastrarContato(this.contato).subscribe(contato =>{
        this.contato = new ContatoModel();
        Swal.fire('Cadastrado com sucesso')
      },
        err => { Swal.fire('Não foi possivel cadastrar', err)})
    }
    else
    {
      return console.log("olha dnv")
    }
  }

}
