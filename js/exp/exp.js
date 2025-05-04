import { listTechs } from "../admin/fns.js";
export {getData} from '../admin/api/api.js'

export default class Exp {


  createLink(classList, href, target) {
    const link = document.createElement("a");
    classList && link.classList.add(classList);
    if (href) {
      link.href = href;
    } else if (target) {
      link.target = target;
    }

    return link;
  }

  createTitle(tag, classList, text) {
    const title = document.createElement(tag);
    classList && title.classList.add(classList);
    if (text) {
      title.innerText = text;
    }

    return title;
  }

  createItemlist(classList, text) {
    const itemList = document.createElement("li");
    classList && itemList.classList.add(classList);
    itemList.innerText = text;

    return itemList;
  }

  createSpan(classList, text) {
    const span = document.createElement("span");
    classList && span.classList.add(classList);
    if (text) {
      span.innerText = text;
    }

    return span;
  }

  createList(classList) {
    const ul = document.createElement("ul");
    classList && ul.classList.add(classList);

    return ul;
  }

  createParagraph(classList, text) {
    const p = document.createElement("p");
    classList && p.classList.add(classList);
    if (text) {
      p.innerText = text;
    }

    return p;
  }

  project(item) {
    return ` 
        <a class="exp-lista-item" href="${item.url}" target="_blank">
            <span class="ano">${item.year}</span>
            <h2 class="titulo1">${item.title}</h2>
            <p class="exp-p">${item.description}</p>
            <h2 class="titulo2">Desenvolvedor ${item.area.title}</h2>
            <ul class="lista-habilidades">
                ${(listTechs(item.technologies)).join("")}
            </ul>
        </a>`;
  }
}
