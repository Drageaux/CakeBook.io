export class Cake {
    constructor(
        public _id:number,
        public user:string,
        public name:string,
        public ingredients:string[],
        public steps:string[]
    ) { }
}