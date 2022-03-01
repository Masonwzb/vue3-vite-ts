class PersonaSwitch extends HTMLElement {
    Input: HTMLInputElement | null = null
    Label: HTMLLabelElement | null = null

    constructor() {
        // Always call super first in constructor
        super()

        // Create a shadow root
        const shadow = this.attachShadow({ mode: 'open' })

        // create input
        this.Input = document.createElement('input')
        this.Input.setAttribute('id', 'toggle')
        this.Input.setAttribute('type', 'checkbox')
        this.Input.setAttribute('class', 'offscreen')

        // create label
        this.Label = document.createElement('label')
        this.Label.setAttribute('for', 'toggle')
        this.Label.setAttribute('class', 'switch')

        // create some CSS to apply to the shadow dom
        const Style = document.createElement('style')
        Style.textContent = `
            .switch {
                position: relative;
                display: inline-block;
                width: 40px;
                height: 20px;
                background-color: rgba(0, 0, 0, 0.25);
                border-radius: 20px;
                transition: all 0.3s;
                cursor: pointer;
            }
            
            .switch:after {
                content: '';
                position: absolute;
                width: 18px;
                height: 18px;
                border-radius: 18px;
                background-color: white;
                top: 1px;
                left: 1px;
                transition: all 0.3s;
            }
            
            input[type='checkbox']:checked + .switch:after {
                transform: translateX(20px);
            }
            
            input[type='checkbox']:checked + .switch {
                background-color: #7983ff;
            }
            
            .offscreen {
                position: absolute;
                left: -9999px;
            }
        `
        console.log('Style.isConnected - ', Style.isConnected)

        // Attach the created elements to the shadow dom
        shadow.appendChild(Style)
        console.log('Style.isConnected - ', Style.isConnected)
        shadow.appendChild(this.Input)
        shadow.appendChild(this.Label)
    }

    inputChange(e: Event) {
        const theTarget = e.target as HTMLInputElement
        console.log('the input checked ? ~', theTarget.checked)

        const getEvent = new Event('get', {
            bubbles: true,
            composed: true,
        })

        this.shadowRoot?.firstElementChild?.dispatchEvent(getEvent)
    }

    connectedCallback() {
        console.log('Custom element added to page.')
        const myInput =  this.shadowRoot?.getElementById('toggle')

        console.log('my Input ? ', myInput)

        myInput?.addEventListener('change', this.inputChange.bind(this))
    }

    disconnectedCallback() {
        console.log('Custom element removed from page.')

        const myInput =  this.shadowRoot?.getElementById('toggle')

        console.log('my Input ? ', myInput)

        myInput?.removeEventListener('change', this.inputChange.bind(this))

    }

    adoptedCallback() {
        console.log('Custom element moved to new page.')
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        console.log('Custom element attributes changed.', name, oldValue, newValue);
    }
}

window.customElements.define('persona-switch', PersonaSwitch)
