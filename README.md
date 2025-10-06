# gs-buttons — Botão reutilizável para Angular 20

Componente **standalone** de botão com dois modos e duas variantes visuais:
- **Default**: `<button>` que emite evento no clique.
- **Link**: link **interno** (`routerLink`) ou **externo** (`href`), nas variantes **Solid** (cheio) ou **Outline** (contorno). Para externos com `_blank`, aplica `rel="noopener noreferrer"` automaticamente.

---

## Tabela de conteúdos

- [Instalação](#instalação)
- [Requisitos](#requisitos)
- [Começo rápido](#começo-rápido)
- [Exemplos de uso](#exemplos-de-uso)
- [API de referência](#api-de-referência)
  - [Selector](#selector)
  - [Inputs](#inputs)
  - [Output](#output)
  - [Enums exportados](#enums-exportados)
- [Comportamento](#comportamento)
- [Acessibilidade](#acessibilidade)
- [Changelog & Contribuição](#changelog--contribuição)
- [Licença](#licença)

---

## Instalação
```bash
npm i gs-buttons bootstrap-icons
```
Inclua **Bootstrap Icons** no projeto (escolha uma):
- **angular.json** (recomendado)
```json
{
  "projects": {
	"app": {
	  "architect": {
		"build": {
		  "options": {
			"styles": [
			  "node_modules/bootstrap-icons/font/bootstrap-icons.css",
			  "src/styles.css" // ou .scss em ambos <^
			]
		  }
		}
	  }
	}
  }
}
```
- **styles.css**
```css
  @import 'bootstrap-icons/font/bootstrap-icons.css';
```
- **styles.scss**
```scss
  @use 'bootstrap-icons';
```

---

## Requisitos

- Angular **20** (componentes standalone).
- Projeto com **roteamento** configurado (para usar `Link` interno via `routerLink`).
- `bootstrap-icons` disponível globalmente (classe base `bi`).

---

## Começo rápido

```ts
// exemplo.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GsButtons, gsTiposBotaoEnum, gsTiposGuiaEnum, gsVariant } from 'gs-buttons';

@Component({
  selector: 'app-exemplo',
  standalone: true,
  imports: [CommonModule, GsButtons],
  templateUrl: './exemplo.component.html'
})
export class ExemploComponent {
  // Expor os enums para o template:
  public gsTiposBotaoEnum = gsTiposBotaoEnum;
  public gsTiposGuiaEnum = gsTiposGuiaEnum;
  public gsVariant = gsVariant;

  public onSalvarClicked(): void {
    // sua lógica aqui
  }
}
```

---

## Exemplos de uso

### 1) Botão padrão (emite evento no clique)
```html
<gs-buttons
  [tipo]="gsTiposBotaoEnum.Default"
  [texto]="'Salvar'"
  [iconeBootstrap]="'bi-floppy2'"
  (modalState)="onSalvarClicked()">
</gs-buttons>
```

### 2) Link interno (`routerLink`)
```html
<gs-buttons
  [tipo]="gsTiposBotaoEnum.Link"
  [texto]="'Voltar para Clientes'"
  [iconeBootstrap]="'bi-arrow-left'"
  [link]="'/clientes'">
</gs-buttons>
```

### 3) Link externo (abre em nova guia com `rel="noopener noreferrer"`)
```html
<gs-buttons
  [tipo]="gsTiposBotaoEnum.Link"
  [texto]="'Documentação Angular'"
  [iconeBootstrap]="'bi-box-arrow-up-right'"
  [link]="'https://angular.dev/'"
  [target]="gsTiposGuiaEnum.NovaGuia">
</gs-buttons>
```

### 4) Variante visual `Outline`
```html
<gs-buttons
  [tipo]="gsTiposBotaoEnum.Link"
  [texto]="'Ver detalhes'"
  [iconeBootstrap]="'bi-eye'"
  [link]="'/detalhes'"
  [variant]="gsVariant.Outline">
</gs-buttons>
```

---

## API de referência

### Selector
- `<gs-buttons>`

### Inputs

| Propriedade      | Tipo               | Obrigatório                   | Descrição                                                                                                                                                              |
| ---------------- | ------------------ | ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `tipo`           | `gsTiposBotaoEnum` | **Sim**                       | Define o **modo** do componente: `Default` (renderiza `<button>` e emite evento) ou `Link` (renderiza `<a>`/`routerLink`). *(Não é o atributo HTML `type`)*.           |
| `texto`          | `string`           | **Sim**                       | Rótulo exibido ao lado do ícone.                                                                                                                                       |
| `iconeBootstrap` | `string`           | Não                           | Classe do Bootstrap Icons (ex.: `'bi-plus'`, `'bi-floppy2'`). A classe base `bi` é aplicada pelo componente. Se omitido, o ícone não é renderizado.                    |
| `link`           | `string`           | **Sim, quando `tipo = Link`** | **Interno:** caminhos sem protocolo (ex.: `'/clientes'`) viram `routerLink`. **Externo:** valores iniciando com `http://`, `https://`, `mailto:`, `tel:` viram `href`. |
| `target`         | `gsTiposGuiaEnum`  | Não *(default: `_self`)*      | `MesmaGuia` → `_self` (padrão); `NovaGuia` → `_blank`. Com `_blank` **e** link externo, adiciona `rel="noopener noreferrer"`.                                          |
| `variant`        | `gsVariant`        | Não *(default: `Solid`)*      | Aparência: `Solid` (cheio) ou `Outline` (contorno).                                                                                                                    |

### Output

| Evento       | Tipo                 | Quando é emitido                                           |
| ------------ | -------------------- | ---------------------------------------------------------- |
| `modalState` | `EventEmitter<void>` | **Apenas** quando `tipo = Default` (clique no `<button>`). |

### Enums exportados
```ts
export enum gsTiposBotaoEnum { Default = 'button', Link = 'link' }
export enum gsTiposGuiaEnum { NovaGuia = '_blank', MesmaGuia = '_self' }
export enum gsVariant { Solid = 'solid', Outline = 'outline' }
```

---

## Comportamento

- `Link` interno usa `routerLink`; externo usa `href` por detecção de protocolo.
- Sem `iconeBootstrap`, apenas o texto é exibido.

---

## Acessibilidade

- `texto` funciona como rótulo visível do botão/link.
- Para navegação por teclado, o elemento `<button>` suporta `Enter`/`Space` nativamente; links `<a>` suportam `Enter`.

---

## Changelog & Contribuição

- Acompanhe **Releases** no GitHub para notas de versão e mudanças.
- Issues e PRs são bem-vindos. 

---

## Licença

Veja o arquivo **LICENSE** no repositório.
