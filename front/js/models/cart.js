class Cart {
    constructor(){
        this.storage = {}
    
    }
    add(id, color, quantity){
        var key = id + "_" + color
        if(this.storage[key]) {
            this.storage[key] += quantity
        }
        else{
            this.storage[key] = quantity
        }
        
    }
    
    set(id, color, quantity){
        var key = id + "_" + color
        this.storage[key] = quantity

    }

    remove(id, color , quantity){
        var key = id + "_" + color
        if(this.storage[key]){
            if(this.storage[key] - quantity <= 0){
                delete this.storage[key]
            }
            else{
                this.storage[key] -= quantity
            }
        }

    }

    save(){
        localStorage.setItem("cart",JSON.stringify(this.storage))  
    }

    load(){
        if(localStorage.getItem("cart")){
            this.storage = JSON.parse(localStorage.getItem("cart"))
        }

    }
}