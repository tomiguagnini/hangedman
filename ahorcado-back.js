class Ahorcado{
    constructor(word){
        this.word =word.toUpperCase().trim()
    }
    letter_valid(letter){
        letter = letter.toUpperCase()
        if(letter == ''|| letter == undefined ){
            return [-1]
        }
        let index = this.word.search(letter)
        let aux = this.word.slice(index + 1)
        let array = new Array(this.word.length);
        while(index != -1 ){
            //guarda la letra que encontro
            array[index] = this.word[index]
            //busca en el resto de la palabra
            let encontrado = aux.search(letter)
            
            if(encontrado == -1){
                index = -1
            }else{
                index += aux.search(letter) + 1
            }

            //actualizo el resto de la palabra
            aux = aux.slice(index + 1 )
        }
        return array
        
    }
    getLength(){
        return this.word.length
    }
}

module.exports = Ahorcado;



