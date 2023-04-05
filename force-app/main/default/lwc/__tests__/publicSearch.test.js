import {createElement} from 'lwc'
import PublicSearch from 'c/publicSearch'

describe('c-public-search component test suite',() =>{

    beforeEach(() => {
        const element = createElement('c-public-search',{
            is:PublicSearch
        })
        document.body.appendChild(element)
    })
    // To Test the display message
    it('display label message',()=> {
        const element = document.querySelector('c-public-search')
        const displaymessage = element.shadowRoot.querySelector('lightning-formatted-text')
        expect(displaymessage.value).toBe('Enter South African ID');

    })

    // To test the text box invalida message
    test('display text box Placeholder',()=>{
        const element = document.querySelector('c-public-search')
        const displaymessage = element.shadowRoot.querySelector('lightning-input')
        expect(displaymessage.placeholder).toBe('Type 13 digit id here...');

    })

     // To test the button Label message
     test('display button text',()=>{
        const element = document.querySelector('c-public-search')
        const displaymessage = element.shadowRoot.querySelector('lightning-button')
        expect(displaymessage.label).toBe('Search');

    })

     // To test the default button not clicable when the Page Load
     test('display button not clickable',()=>{
        const element = document.querySelector('c-public-search')
        const displaymessage = element.shadowRoot.querySelector('lightning-button')
        expect(displaymessage.disabled).toBe(true);

    })

    // To test the button not clicable when the Page Load
    test('display button is clickable',()=>{
        const element = document.querySelector('c-public-search')
        const inputElement = element.shadowRoot.querySelector('lightning-input')
        inputElement.value='2312345678912'
        inputElement.dispatchEvent(new CustomEvent('change'))
        return Promise.resolve().then(() =>{
            const displaymessage = element.shadowRoot.querySelector('lightning-button')
            expect(displaymessage.disabled).toBe(false);
        })
    })
    
    // To test the button not clicable when we provide invalid input
    test('display button is clickable',()=>{
        const element = document.querySelector('c-public-search')
        const inputElement = element.shadowRoot.querySelector('lightning-input')
        inputElement.value='231234567891g'
        inputElement.dispatchEvent(new CustomEvent('change'))
        return Promise.resolve().then(() =>{
            const displaymessage = element.shadowRoot.querySelector('lightning-button')
            expect(displaymessage.disabled).toBe(true);
        })
    })


    // To test the invalid message
    test('To test the invalid input',()=>{
        const element = document.querySelector('c-public-search')
        const inputElement = element.shadowRoot.querySelector('lightning-input')
        inputElement.value='2312345678912'
        inputElement.dispatchEvent(new CustomEvent('change'))
        return Promise.resolve().then(() =>{
            const displaymessage = element.shadowRoot.querySelector('lightning-button')
            expect(displaymessage.disabled).toBe(false);
        })

    })

    // To test the valid input
    test('To test the valid input',()=>{
        const element = document.querySelector('c-public-search')
        const inputElement = element.shadowRoot.querySelector('lightning-input')
        inputElement.value='invalidinput'
        inputElement.dispatchEvent(new CustomEvent('true'))
        return Promise.resolve().then(() =>{
            const displaymessage = element.shadowRoot.querySelector('lightning-button')
            expect(displaymessage.disabled).toBe(false);
        })
    })
})