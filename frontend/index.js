import { backend } from "declarations/backend";

const plugConnection = {
    whitelist: ['YOUR_CANISTER_ID'],
    host: 'https://mainnet.dfinity.network'
};

class WalletManager {
    constructor() {
        this.isConnected = false;
        this.principalId = null;
        this.initializeElements();
        this.attachEventListeners();
        this.checkPlugInstallation();
    }

    initializeElements() {
        this.loginButton = document.getElementById('loginButton');
        this.logoutButton = document.getElementById('logoutButton');
        this.plugNotInstalled = document.getElementById('plugNotInstalled');
        this.userInfo = document.getElementById('userInfo');
        this.principalIdElement = document.getElementById('principalId');
        this.greetingElement = document.getElementById('greeting');
        this.loginSpinner = document.getElementById('loginSpinner');
    }

    attachEventListeners() {
        this.loginButton.addEventListener('click', () => this.connect());
        this.logoutButton.addEventListener('click', () => this.disconnect());
    }

    async checkPlugInstallation() {
        const isPlugInstalled = window?.ic?.plug;
        if (!isPlugInstalled) {
            this.plugNotInstalled.classList.remove('d-none');
            this.loginButton.disabled = true;
        }
    }

    async connect() {
        try {
            this.loginSpinner.classList.remove('d-none');
            this.loginButton.disabled = true;

            const result = await window.ic.plug.requestConnect(plugConnection);
            if (result) {
                const principal = await window.ic.plug.agent.getPrincipal();
                this.principalId = principal.toText();
                
                // Get greeting from backend
                const greeting = await backend.greet(principal);
                
                this.updateUIAfterLogin(greeting);
            }
        } catch (error) {
            console.error('Connection error:', error);
            alert('Failed to connect to Plug wallet');
        } finally {
            this.loginSpinner.classList.add('d-none');
            this.loginButton.disabled = false;
        }
    }

    disconnect() {
        this.isConnected = false;
        this.principalId = null;
        this.updateUIAfterLogout();
    }

    updateUIAfterLogin(greeting) {
        this.isConnected = true;
        this.loginButton.classList.add('d-none');
        this.logoutButton.classList.remove('d-none');
        this.userInfo.classList.remove('d-none');
        this.principalIdElement.textContent = this.principalId;
        this.greetingElement.textContent = greeting;
    }

    updateUIAfterLogout() {
        this.loginButton.classList.remove('d-none');
        this.logoutButton.classList.add('d-none');
        this.userInfo.classList.add('d-none');
        this.principalIdElement.textContent = '';
        this.greetingElement.textContent = '';
    }
}

// Initialize the wallet manager when the page loads
window.addEventListener('load', () => {
    new WalletManager();
});
