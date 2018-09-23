export class Vocabulary{
    constructor(
        public _id: string,
        public name: string,
        public synonyms: string,
        public translate: string,
        public examples: string,
        public meanings: string,
        public type: string
    ){}
}