export class Cake {
    constructor(
        public _id:number,
        public isPublic:boolean,
        public user:string,
        public name:string,
        public image:string,
        public croppedImage:string,
        public description:string,
        public ingredients:Object[],
        public steps:Object[]
    ) { }
}