

export default class Exp {
    async getData(url) {
        const {data} = await axios.get(url)
        return data
    }

    createLink(classList, href, target) {
        const link = document.createElement('a')
        classList && link.classList.add(classList)
        if(href) {
            link.href = href
        } else if(target) {
            link.target = target
        }

        return link
        
    }

    createTitle(tag, classList, text) {
        const title = document.createElement(tag)
        classList && title.classList.add(classList)
        if(text) {
            title.innerText = text
        }

        return title
        
    }

    createItemlist(classList, text) {
        const itemList = document.createElement('li')
        classList && itemList.classList.add(classList)
        itemList.innerText = text

        return itemList
    }

    createSpan(classList, text) {
        const span = document.createElement('span')
        classList && span.classList.add(classList)
        if(text) {
            span.innerText = text
        }

        return span
    }

    createList(classList) {
        const ul = document.createElement('ul')
        classList && ul.classList.add(classList)

        return ul
    }

    createParagraph (classList, text){
        const p = document.createElement('p')
        classList && p.classList.add(classList)
        if(text) {
            p.innerText = text
        }

        return p
    }

    async project(item) {
        const listExp = document.querySelector('.experiencia-lista')
            const itemList = this.createItemlist(null, null)
            const linkItem = this.createLink('exp-lista-item', item.href, "_blank")
            const title1 = this.createTitle('h2', 'titulo1', item.title)
            const inProgress = this.createSpan(null, 'Em andamento')
            const year = this.createSpan('ano', item.year)
            const p1 = this.createParagraph('exp-p', item.description)
            const title2 = this.createTitle('h2', 'titulo2', `Desenvolvedor ${item.area.name}`)
            const techList = this.createList('lista-habilidades')

            listExp.appendChild(itemList)
            itemList.appendChild(linkItem)
            linkItem.appendChild(year)
            linkItem.appendChild(title1)
            linkItem.appendChild(p1)
            linkItem.appendChild(title2)
            if(item.inProgress) {
                title1.appendChild(inProgress)
            }
            linkItem.appendChild(techList)

            item.technologies.forEach(tech => {
                const li = this.createItemlist(null, tech.name)
                techList.appendChild(li)
            }); 
    }
}