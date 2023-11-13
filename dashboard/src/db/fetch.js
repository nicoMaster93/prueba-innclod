import {config } from "./index.js"

const rest = class service {
    
    constructor() {
        this.myHeaders = new Headers();
        this.url = config.api;
        
    }
    config(method,data,json=true){
        if(json){
            this.myHeaders.append("Content-Type", "application/json");
        }
        var requestOptions = {
            method: method,
            headers: this.myHeaders,
            body: (json ? JSON.stringify(data) : data ),
            withCredentials: true,  
            crossorigin: true,  
        };
        if(method === 'GET'){
            delete requestOptions.body;
        }
        return requestOptions;
    }
    post = async (endPoint,data,json=true)=>{
        const url = this.url + config.endPoint[endPoint];
        const response = await fetch(url, this.config('POST',data,json));
        return response.json();
    }
    delete = async (endPoint,data,json=true)=>{
        const url = this.url + config.endPoint[endPoint];
        const response = await fetch(url, this.config('DELETE',data,json));
        return response.json();
    }
    get = async (endPoint,data)=>{
        const url = this.url + config.endPoint[endPoint] + (data ? `&` + (new URLSearchParams(data)) : '' );
        const response = await fetch(url, this.config('GET',""));
        return response.json();
    }
    load = async (view)=>{
        const response = await fetch(`${view}.html`);
        return response.text();
    }
}
export default rest;