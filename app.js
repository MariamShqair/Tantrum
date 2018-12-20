var fs=require("fs")
var assert = require("assert")
class StorageManager{
    constructor(fileName){
        assert(fs.existsSync(fileName),"file name not exist")
        this.data =  fs.readFileSync(fileName).toString();
    }
    word(){
        return this.data.split(" ");
    }
}

class StopWordsManager{
    constructor(){
        assert(fs.existsSync('stopwords.txt'),"file name not exist")

        this.data =  fs.readFileSync('stopwords.txt').toString().split(",");
        //assert(!Array.isArray(this.data),"file not exist")
        this.wordAfterRemoveStopWords =[]
    }
    isStopWord(word){
        assert(typeof(word) == "string", "not a string")
        if(!this.data.includes(word)){
            this.wordAfterRemoveStopWords.push(word)
        } 
        return this.wordAfterRemoveStopWords;

    }
}
class WordFreqManager{
    constructor(){
        this.storyAfterFreq=[]
    }
    incrementCount(word){
        assert(typeof(word) == "string", "not a string")
       
        if(this.storyAfterFreq.find(x => x.key === word)){
            this.storyAfterFreq.find(x => x.key === word).count++
        }else{
            this.storyAfterFreq.push({key:word,count:1})
        }
    }
    sort(){
      return  this.storyAfterFreq.sort((a,b) =>  b.count - a.count)
    }
    
}

class WordFrequencyController{
    constructor(fileName){
        this._storageManager = new StorageManager(fileName)
        this._stopWordsManager = new StopWordsManager()
        this._wordFreqManager = new WordFreqManager()
    }
    run(){
        let words = this._storageManager.word();
        for(let i in words){
            if(this._stopWordsManager.isStopWord(words[i]===undefined)){
                this._wordFreqManager.incrementCount(words[i]);
            }
        }
        console.log(this._wordFreqManager.sort())
       
    }
}
let WFC = new WordFrequencyController("story.txt");
WFC.run();
