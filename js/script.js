class writer {
    constructor(lang = 'en', iframeId = 'writer-js', boxId = 'editor-box', defaultValue = '', style = '') {
        // iframe and editor box settings
        this.iframe = document.getElementById(iframeId)
        this.box = document.getElementById(boxId)
        this.doc = this.iframe.contentDocument || iframe.contentWindow.document
        this.doc.designMode = "on";
        this.doc.getElementsByTagName('head')[0].innerHTML += `<style>${style}</style>`
        this.doc.getElementsByTagName('body')[0].innerHTML = defaultValue;
        this.ShowSourceCode = false

        // create and select textarea
        this.textarea = document.createElement("textarea");
        this.textarea.id = 'output' + iframeId;
        this.textarea.name = 'output' + iframeId;
        this.textarea.style.display = "none";
        this.box.appendChild(this.textarea);

        // create and select topBar
        this.topBar = document.createElement("div");
        this.topBar.id = "top-bar"
        this.topBar.style.backgroundColor = "rgb(249, 249, 249)";
        this.topBar.style.color = "#333333";
        this.topBar.style.borderRadius = "10px";
        this.topBar.style.padding = "0.5rem";
        this.topBar.style.margin = "0.5rem";
        this.topBar.style.display = "flex";

        // lang setting
        this.lang = lang
        this.fa_keywords = { title: 'عنوان', size: 'اندازهٔ متن', default: 'پیش فرض', type: 'نوع متن', quotation: 'نقل قول' };
        this.en_keywords = { title: 'title', size: 'text size', default: 'default', type: 'type text', quotation: 'quotation' };
        this.keywords;
        if (this.lang == 'en') {
            this.keywords = this.en_keywords;
        } else if (this.lang == 'fa') {
            this.doc.getElementsByTagName('head')[0].innerHTML += `<style>'*{font-family: vazir;text-align: right;direction:rtl;}'</style>`
            this.keywords = this.fa_keywords;
            this.doc.getElementsByTagName('head')[0].innerHTML += "<style>*{text-align: right;direction: rtl;}</style>"
            this.topBar.style.textAlign = 'right'
            this.topBar.style.direction = 'rtl'
        }
        
        // create elemet with createItemBar function
        this.createItemBar('bold', this.doc, '<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-5" viewBox="0 0 16 16"><path d="M8.21 13c2.106 0 3.412-1.087 3.412-2.823 0-1.306-.984-2.283-2.324-2.386v-.055a2.176 2.176 0 0 0 1.852-2.14c0-1.51-1.162-2.46-3.014-2.46H3.843V13H8.21zM5.908 4.674h1.696c.963 0 1.517.451 1.517 1.244 0 .834-.629 1.32-1.73 1.32H5.908V4.673zm0 6.788V8.598h1.73c1.217 0 1.88.492 1.88 1.415 0 .943-.643 1.449-1.832 1.449H5.907z"/></svg>')
        this.createItemBar('italic', this.doc, '<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-5" viewBox="0 0 16 16"><path d="M7.991 11.674 9.53 4.455c.123-.595.246-.71 1.347-.807l.11-.52H7.211l-.11.52c1.06.096 1.128.212 1.005.807L6.57 11.674c-.123.595-.246.71-1.346.806l-.11.52h3.774l.11-.52c-1.06-.095-1.129-.211-1.006-.806z"/></svg>')
        this.createItemBar('underline', this.doc, '<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-5" viewBox="0 0 16 16"><path d="M5.313 3.136h-1.23V9.54c0 2.105 1.47 3.623 3.917 3.623s3.917-1.518 3.917-3.623V3.136h-1.23v6.323c0 1.49-.978 2.57-2.687 2.57-1.709 0-2.687-1.08-2.687-2.57V3.136zM12.5 15h-9v-1h9v1z"/></svg>')
        this.createItemBar('strikeThrough', this.doc, '<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-5" viewBox="0 0 16 16"><path d="M6.333 5.686c0 .31.083.581.27.814H5.166a2.776 2.776 0 0 1-.099-.76c0-1.627 1.436-2.768 3.48-2.768 1.969 0 3.39 1.175 3.445 2.85h-1.23c-.11-1.08-.964-1.743-2.25-1.743-1.23 0-2.18.602-2.18 1.607zm2.194 7.478c-2.153 0-3.589-1.107-3.705-2.81h1.23c.144 1.06 1.129 1.703 2.544 1.703 1.34 0 2.31-.705 2.31-1.675 0-.827-.547-1.374-1.914-1.675L8.046 8.5H1v-1h14v1h-3.504c.468.437.675.994.675 1.697 0 1.826-1.436 2.967-3.644 2.967z"/></svg>')
        this.createItemBar('justifyLeft', this.doc, '<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-5" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M2 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/></svg>')
        this.createItemBar('justifyCenter', this.doc, '<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-5" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M4 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/></svg>')
        this.createItemBar('justifyRight', this.doc, '<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-5" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-4-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm4-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-4-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/></svg>')
        this.createItemBar('insertUnorderedList', this.doc, '<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-5" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm-3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/></svg>')
        this.createItemBar('insertOrderedList', this.doc, '<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-5" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5z"/><path d="M1.713 11.865v-.474H2c.217 0 .363-.137.363-.317 0-.185-.158-.31-.361-.31-.223 0-.367.152-.373.31h-.59c.016-.467.373-.787.986-.787.588-.002.954.291.957.703a.595.595 0 0 1-.492.594v.033a.615.615 0 0 1 .569.631c.003.533-.502.8-1.051.8-.656 0-1-.37-1.008-.794h.582c.008.178.186.306.422.309.254 0 .424-.145.422-.35-.002-.195-.155-.348-.414-.348h-.3zm-.004-4.699h-.604v-.035c0-.408.295-.844.958-.844.583 0 .96.326.96.756 0 .389-.257.617-.476.848l-.537.572v.03h1.054V9H1.143v-.395l.957-.99c.138-.142.293-.304.293-.508 0-.18-.147-.32-.342-.32a.33.33 0 0 0-.342.338v.041zM2.564 5h-.635V2.924h-.031l-.598.42v-.567l.629-.443h.635V5z"/></svg>')
        this.createItemBar('formatBlock', this.doc, `<option value="p">` + this.keywords.type + `</option><option value="p">` + this.keywords.default + `</option><option value="blockquote">` + this.keywords.quotation + `</option><option value="H1">` + this.keywords.title + ` 1</option><option value="H2">` + this.keywords.title + ` 2</option><option value="H3">` + this.keywords.title + ` 3</option><option value="H4">` + this.keywords.title + ` 4</option><option value="H5">` + this.keywords.title + ` 5</option><option value="H6">` + this.keywords.title + ` 6</option>`,'format-block')
        this.createItemBar('fontSize', this.doc, `<option value="3">` + this.keywords.size + `</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option>`,'font-size')
        this.createItemBar('insertHorizontalRule', this.doc, `HR`)
        this.createItemBar('createLink', this.doc, `<svg xmlns="http://www.w3.org/2000/svg" class="w-5" fill="currentColor" class="bi bi-link-45deg" viewBox="0 0 16 16"><path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z"/><path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z"/></svg>`,'span','prompt')
        this.createItemBar('insertImage', this.doc, `<svg xmlns="http://www.w3.org/2000/svg" class="w-5" fill="currentColor" class="bi bi-link-45deg" viewBox="0 0 16 16"><path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/><path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z"/></svg>`,'span','prompt')
        this.createItemBar('foreColor', this.doc, `<svg xmlns="http://www.w3.org/2000/svg" class="w-5" fill="currentColor" class="bi bi-link-45deg" viewBox="0 0 16 16"><path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/><path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z"/></svg>`,'color')
        this.createItemBar('undo', this.doc, '<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-5" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z"/><path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z"/></svg>')
        this.createItemBar('redo', this.doc, '<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-5" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/><path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/></svg>')
        this.toggleSourceCode(this.doc)
        this.fullScreen(this.box)

        this.box.insertBefore(this.topBar, this.iframe);
    }

    createItemBar(name, documenti, content, type='span', value=null){
        if(type == 'span'){
            let barItem = document.createElement("span");
            barItem.classList += 'button'
            barItem.id = 'button-' + name
            barItem.innerHTML = content
            barItem.addEventListener('click', function(){
                if(value == 'prompt'){
                    documenti.execCommand(name, true, prompt('پیوند را وارد کنید:','https:\/\/'));
                }else{
                    documenti.execCommand(name, true, value);
                }
            })
            this.topBar.appendChild(barItem)
        }else if(type == 'font-size'){
            let barItemSize = document.createElement("select");
            barItemSize.classList += 'select'
            barItemSize.id = 'select-' + name
            barItemSize.innerHTML = content
            barItemSize.addEventListener('change', function(){
                documenti.execCommand(name, true, barItemSize.value);
            })
            this.topBar.appendChild(barItemSize) 
        }else if(type == 'format-block'){
            let barItemFormat = document.createElement("select");
            barItemFormat.classList += 'select'
            barItemFormat.id = 'select-' + name
            barItemFormat.innerHTML = content
            barItemFormat.addEventListener('change', function(){
                documenti.execCommand(name, true, barItemFormat.value);
            })
            this.topBar.appendChild(barItemFormat) 
        }else if(type == 'color'){
            let barItemColor = document.createElement("input");
            barItemColor.classList += 'color'
            barItemColor.type = 'color'
            barItemColor.style.margin = '0.25rem'
            barItemColor.id = 'select-' + name
            barItemColor.addEventListener('change', function(){
                documenti.execCommand(name, true, barItemColor.value);
            })
            this.topBar.appendChild(barItemColor) 
        }
    }

    fullScreen(BOX) {
        let fullScreen = document.createElement("span")
        fullScreen.classList += 'button'
        fullScreen.id = 'fullScreenButton'
        fullScreen.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="w-5" fill="currentColor" class="bi bi-link-45deg" viewBox="0 0 16 16"><path d="M1.5 1a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4A1.5 1.5 0 0 1 1.5 0h4a.5.5 0 0 1 0 1h-4zM10 .5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 16 1.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zM.5 10a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 0 14.5v-4a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v4a1.5 1.5 0 0 1-1.5 1.5h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5z"/></svg>'
        fullScreen.addEventListener('click', function(){
            if (!document.fullscreenElement) {
                BOX.requestFullscreen().catch((err) => {
                    alert(`Error attempting to enable fullscreen mode: ${err.message} (${err.name})`);
                });
                fullScreen.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="w-5" fill="currentColor" class="bi bi-link-45deg" viewBox="0 0 16 16"><path d="M5.5 0a.5.5 0 0 1 .5.5v4A1.5 1.5 0 0 1 4.5 6h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5zm5 0a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 10 4.5v-4a.5.5 0 0 1 .5-.5zM0 10.5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 6 11.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zm10 1a1.5 1.5 0 0 1 1.5-1.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4z"/></svg>';
            } else {
                fullScreen.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="w-5" fill="currentColor" class="bi bi-link-45deg" viewBox="0 0 16 16"><path d="M1.5 1a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4A1.5 1.5 0 0 1 1.5 0h4a.5.5 0 0 1 0 1h-4zM10 .5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 16 1.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zM.5 10a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 0 14.5v-4a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v4a1.5 1.5 0 0 1-1.5 1.5h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5z"/></svg>';
                document.exitFullscreen();
            }
        })
        this.topBar.appendChild(fullScreen) 
    }

    toggleSourceCode(documenti) {
        let toggleSource = document.createElement("span");
        toggleSource.classList += 'button'
        toggleSource.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="w-5" fill="currentColor" class="bi bi-link-45deg" viewBox="0 0 16 16"><path d="M10.478 1.647a.5.5 0 1 0-.956-.294l-4 13a.5.5 0 0 0 .956.294l4-13zM4.854 4.146a.5.5 0 0 1 0 .708L1.707 8l3.147 3.146a.5.5 0 0 1-.708.708l-3.5-3.5a.5.5 0 0 1 0-.708l3.5-3.5a.5.5 0 0 1 .708 0zm6.292 0a.5.5 0 0 0 0 .708L14.293 8l-3.147 3.146a.5.5 0 0 0 .708.708l3.5-3.5a.5.5 0 0 0 0-.708l-3.5-3.5a.5.5 0 0 0-.708 0z"/></svg>'
        toggleSource.addEventListener('click', function(){
            if (this.ShowSourceCode) {
                documenti.getElementsByTagName('body')[0].innerHTML = documenti.getElementsByTagName('body')[0].textContent;
                this.ShowSourceCode = false;
            } else {
                this.ShowSourceCode = true;
                documenti.getElementsByTagName('body')[0].textContent = documenti.getElementsByTagName('body')[0].innerHTML;
            }
        })
        this.topBar.appendChild(toggleSource) 
    }

    setOutput() {
        this.textarea.innerHTML = this.doc.getElementsByTagName('body')[0].innerHTML
    }

    getOutput() {
        return this.doc.getElementsByTagName('body')[0].innerHTML
    }
}