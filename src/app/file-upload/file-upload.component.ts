import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {
  selectedFile: File | null = null;

  constructor(private http: HttpClient) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
  }

  onUpload() {
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.readAsDataURL(this.selectedFile);
      reader.onload = () => {
        if (reader.result && typeof reader.result === 'string') {
          const base64Data = reader.result.split(',')[1];

          const uploadData = {
            nome_arquivo: this.selectedFile?.name || '', // Uso do operador de coalescência nula (?.)
            conteudo: base64Data
          };

          // Substitua 'URL_DO_SEU_BACKEND' pela URL do seu backend
          this.http.post('http://localhost:3000/uploads', uploadData)
            .subscribe(
              (response) => {
                console.log('Arquivo enviado com sucesso!', response);
                // Adicione aqui a lógica para lidar com a resposta do servidor, se necessário
              },
              (error) => {
                console.error('Erro ao enviar arquivo:', error);
                // Lógica para lidar com erros, se necessário
              }
            );
        }
      };
    } else {
      console.error('Nenhum arquivo selecionado.');
    }
  }
}
