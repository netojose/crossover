class Api {

    constructor () {
        this.onSuccessCB = null
        this.onErrorCB = null
    }

    onSuccess(callback){
        this.onSuccessCB = callback
        return this
    }
    
    onError(callback){
        this.onErrorCB = callback
        return this
    }

    get(url){
        var request = new XMLHttpRequest()
        request.open('GET', url, true)
        request.onload = () => {
            if (request.status >= 200 && request.status < 400) {
                let json = JSON.parse(request.responseText)
                //========= EMULATING SERVER LATENCY =========//
                window.setTimeout(() => {
                    if(this.onSuccessCB && json){
                        this.onSuccessCB(json)
                    }
                }, Math.floor(Math.random() * 2500) + 1000)
                //========= EMULATING SERVER LATENCY =========//
                
            } else {
                // Response error
                if(this.onErrorCB){
                    this.onErrorCB(request)
                }
            }
        }

        request.onerror = function() {
            // Internet fail
            if(this.onErrorCB){
                this.onErrorCB(null)
            }
        }

        request.send()
    }

}

export default new Api