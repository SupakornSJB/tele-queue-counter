import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  showModal(title: string, content: string, callback: (input: string) => void) {
    const titleEl = document.getElementById("title");
    const contentEl = document.getElementById("content");
    const buttonEl = document.getElementById("confirmButton") as HTMLButtonElement;
    const modalEl = document.getElementById("my_modal_1") as HTMLDialogElement;

    if (!!titleEl) {
      titleEl.textContent = title;
    }
    if (!!contentEl) {
      contentEl.textContent = content;
    }

    const temp = () => {
      buttonEl.removeEventListener("onclick", temp)
      const inputEl = document.getElementById("input") as HTMLInputElement;
      callback(!!inputEl ? inputEl.value : "");
    }

    if (!!buttonEl) {
      buttonEl.onclick = temp;
    }

    modalEl.showModal();
  }
}
